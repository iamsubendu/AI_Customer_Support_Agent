import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);

    // If it's a syntax error or other critical error, redirect to login
    if (error.name === "SyntaxError" || error.name === "ReferenceError") {
      localStorage.removeItem("token");
      window.location.href = "/auth";
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary">
          <div className="error-content">
            <h2>Something went wrong</h2>
            <p>An error occurred while loading the application.</p>
            <button
              onClick={() => {
                localStorage.removeItem("token");
                window.location.href = "/auth";
              }}
              className="btn btn-primary"
            >
              Go to Login
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
