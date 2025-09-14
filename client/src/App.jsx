import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Provider, useDispatch, useSelector } from "react-redux";
import { store } from "./store";
import { useAuth } from "./hooks/useAuth";
import { useToast } from "./hooks/useToast";
import ToastContainer from "./components/custom/Toast";
import AuthPage from "./components/auth/AuthPage";
import ChatPage from "./components/chat/ChatPage";
import LoadingSpinner from "./components/custom/LoadingSpinner";
import "./index.css";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, checkAuth, loading } = useAuth();
  const { showError } = useToast();

  useEffect(() => {
    checkAuth().then((result) => {
      if (result.type.endsWith("/rejected")) {
        showError("Please log in to continue");
      }
    });
  }, [checkAuth, showError]);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  return isAuthenticated ? children : <Navigate to="/auth" replace />;
};

const AppContent = () => {
  return (
    <div className="App">
      <ToastContainer />
      <Routes>
        <Route path="/auth" element={<AuthPage />} />
        <Route
          path="/chat"
          element={
            <ProtectedRoute>
              <ChatPage />
            </ProtectedRoute>
          }
        />
        <Route path="/" element={<Navigate to="/chat" replace />} />
      </Routes>
    </div>
  );
};

function App() {
  return (
    <Provider store={store}>
      <Router>
        <AppContent />
      </Router>
    </Provider>
  );
}

export default App;
