import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../../hooks/useAuth";
import Button from "../custom/Button";
import Input from "../custom/Input";

const SignupForm = ({ onToggleMode }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const { signup, loading, isAuthenticated } = useAuth();

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

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const result = await signup(
      formData.name,
      formData.email,
      formData.password
    );

    if (result.type.endsWith("/fulfilled")) {
      toast.success("Account created successfully!");
      // Redirect will be handled by useEffect when isAuthenticated becomes true
    } else {
      toast.error(result.payload || "Signup failed");
    }
  };

  return (
    <div className="auth-form-container">
      <h1 className="auth-title">Create Account</h1>

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
          label="Full Name"
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          error={errors.name}
          placeholder="Enter your full name"
          required
          autoComplete="off"
          data-lpignore="true"
          data-form-type="other"
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
          placeholder="Create a password"
          required
          autoComplete="new-password"
          data-lpignore="true"
          data-form-type="other"
        />

        <Input
          label="Confirm Password"
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          error={errors.confirmPassword}
          placeholder="Confirm your password"
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
          {loading ? "Creating account..." : "Create Account"}
        </Button>
      </form>

      <div className="auth-switch">
        <button type="button" onClick={onToggleMode} className="btn-link">
          Already have an account? Sign in
        </button>
      </div>
    </div>
  );
};

export default SignupForm;
