import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import Button from "./custom/Button";

const HomePage = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();

  const handleGetStarted = () => {
    if (isAuthenticated) {
      navigate("/chat");
    } else {
      navigate("/auth");
    }
  };

  return (
    <div className="homepage">
      <div className="homepage-container">
        <div className="homepage-content">
          <div className="homepage-header">
            <h1 className="homepage-title">AI Customer Support</h1>
            <p className="homepage-subtitle">
              Get instant help with our intelligent AI assistant. Ask questions,
              get support, and find solutions quickly.
            </p>
          </div>

          <div className="homepage-features">
            <div className="feature">
              <div className="feature-icon">🤖</div>
              <h3>AI-Powered</h3>
              <p>Advanced AI technology for accurate responses</p>
            </div>
            <div className="feature">
              <div className="feature-icon">⚡</div>
              <h3>Instant Support</h3>
              <p>Get help immediately, 24/7 availability</p>
            </div>
            <div className="feature">
              <div className="feature-icon">💬</div>
              <h3>Natural Chat</h3>
              <p>Conversational interface that understands you</p>
            </div>
          </div>

          <div className="homepage-actions">
            <Button
              onClick={handleGetStarted}
              className="homepage-cta"
              size="large"
            >
              {isAuthenticated
                ? `Welcome back, ${user?.name || "User"}!`
                : "Get Started"}
            </Button>
            {isAuthenticated && (
              <Button
                onClick={() => navigate("/chat")}
                variant="outline"
                size="large"
                className="homepage-secondary"
              >
                Go to Chat
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
