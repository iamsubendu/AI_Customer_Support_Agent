import React, { useEffect, useRef } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Provider, useDispatch, useSelector } from "react-redux";
import { Toaster } from "react-hot-toast";
import { store } from "./store";
import { useAuth } from "./hooks/useAuth";
import AuthPage from "./components/auth/AuthPage";
import ChatPage from "./components/chat/ChatPage";
import HomePage from "./components/HomePage";
import LoadingSpinner from "./components/custom/LoadingSpinner";
import GlobalLoader from "./components/GlobalLoader";
import ErrorBoundary from "./components/ErrorBoundary";
import "./index.css";

const ProtectedRoute = ({ children, isAuthenticated }) => {
  return isAuthenticated ? children : <Navigate to="/auth" replace />;
};

const AppContent = () => {
  const { checkAuth, loading, isAuthenticated } = useAuth();
  const hasCheckedAuth = useRef(false);

  useEffect(() => {
    if (!hasCheckedAuth.current) {
      hasCheckedAuth.current = true;
      checkAuth();
    }
  }, [checkAuth]);

  return (
    <ErrorBoundary>
      <div className="App">
        <GlobalLoader />
        <Toaster />
        <Routes>
          <Route
            path="/"
            element={
              isAuthenticated ? <Navigate to="/chat" replace /> : <HomePage />
            }
          />
          <Route path="/auth" element={<AuthPage />} />
          <Route
            path="/chat"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <ChatPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </ErrorBoundary>
  );
};

function App() {
  return (
    <Provider store={store}>
      <Router
        future={{
          v7_startTransition: true,
          v7_relativeSplatPath: true,
        }}
      >
        <AppContent />
      </Router>
    </Provider>
  );
}

export default App;
