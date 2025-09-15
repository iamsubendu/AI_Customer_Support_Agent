import React from "react";

const LoadingSpinner = ({
  size = "medium",
  color = "blue",
  className = "",
}) => {
  const getSpinnerClass = () => {
    let spinnerClass = "loading-spinner";
    if (size === "small") spinnerClass += " small";
    else if (size === "large") spinnerClass += " large";
    if (color === "white") spinnerClass += " white";
    else if (color === "gray") spinnerClass += " gray";
    return `${spinnerClass} ${className}`;
  };

  return (
    <div className={getSpinnerClass()}>
      <div className="spinner"></div>
    </div>
  );
};

export default LoadingSpinner;
