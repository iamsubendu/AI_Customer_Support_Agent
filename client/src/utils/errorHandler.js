import { store } from "../store";
import { addToast } from "../store/slices/uiSlice";

class ErrorHandler {
  static handle(error, context = "") {
    let message = "An unexpected error occurred";

    if (error.response) {
      message =
        error.response.data?.message || error.response.statusText || message;
    } else if (error.message) {
      message = error.message;
    }

    store.dispatch(
      addToast({
        message: `${context ? `${context}: ` : ""}${message}`,
        type: "error",
        duration: 5000,
      })
    );
  }

  static handleNetworkError() {
    store.dispatch(
      addToast({
        message: "Network error. Please check your connection.",
        type: "error",
        duration: 5000,
      })
    );
  }

  static handleAuthError() {
    store.dispatch(
      addToast({
        message: "Authentication failed. Please log in again.",
        type: "error",
        duration: 5000,
      })
    );
  }

  static handleValidationError(errors) {
    const errorMessages = Object.values(errors).join(", ");
    store.dispatch(
      addToast({
        message: `Validation error: ${errorMessages}`,
        type: "warning",
        duration: 4000,
      })
    );
  }
}

export default ErrorHandler;
