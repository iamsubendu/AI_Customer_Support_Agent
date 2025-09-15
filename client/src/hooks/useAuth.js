import { useSelector, useDispatch } from "react-redux";
import { useCallback } from "react";
import {
  loginUser,
  signupUser,
  getCurrentUser,
  logout,
  clearError,
} from "../store/slices/authSlice";
import { resetChatState } from "../store/slices/chatSlice";

export const useAuth = () => {
  const dispatch = useDispatch();
  const { user, token, loading, error, authChecked } = useSelector(
    (state) => state.auth
  );

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
    if (authChecked) {
      return { type: "auth/getCurrentUser/skipped" };
    }

    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    // If we have both token and user data, we're already authenticated
    if (storedToken && storedUser) {
      return { type: "auth/getCurrentUser/skipped" };
    }

    // If we have token but no user data, fetch user data
    if (storedToken && !storedUser) {
      const result = await dispatch(getCurrentUser());
      return result;
    }

    return { type: "auth/getCurrentUser/rejected" };
  }, [dispatch, authChecked]);

  const logoutUser = useCallback(() => {
    dispatch(logout());
    dispatch(resetChatState());
    // Redirect to login page after logout
    window.location.href = "/auth";
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
    isAuthenticated: !!(user && token),
  };
};
