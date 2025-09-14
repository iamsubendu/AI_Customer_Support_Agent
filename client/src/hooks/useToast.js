import { useSelector, useDispatch } from "react-redux";
import { useCallback } from "react";
import { addToast, removeToast, clearToasts } from "../store/slices/uiSlice";

export const useToast = () => {
  const dispatch = useDispatch();
  const toasts = useSelector((state) => state.ui.toasts);

  const showToast = useCallback(
    (message, type = "info", duration = 4000) => {
      dispatch(addToast({ message, type, duration }));
    },
    [dispatch]
  );

  const showSuccess = useCallback(
    (message, duration = 4000) => {
      showToast(message, "success", duration);
    },
    [showToast]
  );

  const showError = useCallback(
    (message, duration = 4000) => {
      showToast(message, "error", duration);
    },
    [showToast]
  );

  const showInfo = useCallback(
    (message, duration = 4000) => {
      showToast(message, "info", duration);
    },
    [showToast]
  );

  const showWarning = useCallback(
    (message, duration = 4000) => {
      showToast(message, "warning", duration);
    },
    [showToast]
  );

  const hideToast = useCallback(
    (id) => {
      dispatch(removeToast(id));
    },
    [dispatch]
  );

  const hideAllToasts = useCallback(() => {
    dispatch(clearToasts());
  }, [dispatch]);

  return {
    toasts,
    showToast,
    showSuccess,
    showError,
    showInfo,
    showWarning,
    hideToast,
    hideAllToasts,
  };
};
