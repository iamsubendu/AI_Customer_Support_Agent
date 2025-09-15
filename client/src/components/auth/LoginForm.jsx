import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../../hooks/useAuth";
import Button from "../custom/Button";
import Input from "../custom/Input";

const LoginForm = ({ onToggleMode }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const { login, loading, isAuthenticated } = useAuth();

  // Redirect when authentication state changes
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/chat", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const result = await login(formData.email, formData.password);

    if (result.type.endsWith("/fulfilled")) {
      toast.success("Login successful!");
      // Redirect will be handled by useEffect when isAuthenticated becomes true
    } else {
      toast.error(result.payload || "Login failed");
    }
  };

  return (
    <div className="auth-form-container">
      <h1 className="auth-title">Welcome Back</h1>

      <form onSubmit={handleSubmit} className="auth-form" autoComplete="off">
        {/* Hidden fields to prevent autofill */}
        <input
          type="text"
          style={{ display: "none" }}
          tabIndex="-1"
          autoComplete="off"
        />
        <input
          type="password"
          style={{ display: "none" }}
          tabIndex="-1"
          autoComplete="off"
        />

        <Input
          label="Email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
          placeholder="Enter your email"
          required
          autoComplete="off"
          data-lpignore="true"
          data-form-type="other"
        />

        <Input
          label="Password"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          error={errors.password}
          placeholder="Enter your password"
          required
          autoComplete="new-password"
          data-lpignore="true"
          data-form-type="other"
        />

        <Button
          type="submit"
          loading={loading}
          disabled={loading}
          className="w-full"
        >
          {loading ? "Signing in..." : "Sign In"}
        </Button>
      </form>

      <div className="auth-switch">
        <button type="button" onClick={onToggleMode} className="btn-link">
          Don't have an account? Sign up
        </button>
      </div>
    </div>
  );
};

export default LoginForm;
