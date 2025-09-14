import { useSelector, useDispatch } from "react-redux";
import { useCallback } from "react";
import {
  loginUser,
  signupUser,
  getCurrentUser,
  logout,
  clearError,
} from "../store/slices/authSlice";

export const useAuth = () => {
  const dispatch = useDispatch();
  const { user, token, loading, error } = useSelector((state) => state.auth);

  const login = useCallback(
    async (email, password) => {
      const result = await dispatch(loginUser({ email, password }));
      return result;
    },
    [dispatch]
  );

  const signup = useCallback(
    async (name, email, password) => {
      const result = await dispatch(signupUser({ name, email, password }));
      return result;
    },
    [dispatch]
  );

  const checkAuth = useCallback(async () => {
    if (token) {
      const result = await dispatch(getCurrentUser());
      return result;
    }
    return { type: "auth/getCurrentUser/rejected" };
  }, [dispatch, token]);

  const logoutUser = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);

  const clearAuthError = useCallback(() => {
    dispatch(clearError());
  }, [dispatch]);

  return {
    user,
    token,
    loading,
    error,
    login,
    signup,
    checkAuth,
    logout: logoutUser,
    clearError: clearAuthError,
    isAuthenticated: !!user,
  };
};
