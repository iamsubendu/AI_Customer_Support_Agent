import React from "react";

const Button = ({
  children,
  variant = "primary",
  size = "medium",
  disabled = false,
  loading = false,
  onClick,
  type = "button",
  className = "",
  ...props
}) => {
  const getButtonClass = () => {
    let baseClass = "btn";

    if (variant === "primary") baseClass += " btn-primary";
    else if (variant === "secondary") baseClass += " btn-secondary";
    else if (variant === "link") baseClass += " btn-link";

    if (size === "small") baseClass += " btn-sm";
    else if (size === "large") baseClass += " btn-lg";

    if (disabled || loading) baseClass += " disabled";

    return `${baseClass} ${className}`;
  };

  return (
    <button
      type={type}
      className={getButtonClass()}
      disabled={disabled || loading}
      onClick={onClick}
      {...props}
    >
      {loading && <span className="loading-spinner">⏳</span>}
      {children}
    </button>
  );
};

export default Button;
