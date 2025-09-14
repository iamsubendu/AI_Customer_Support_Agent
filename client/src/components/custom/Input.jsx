import React, { forwardRef } from "react";

const Input = forwardRef(
  (
    { label, error, helperText, className = "", labelClassName = "", ...props },
    ref
  ) => {
    const baseClasses =
      "w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200";
    const errorClasses = error
      ? "border-red-500 focus:ring-red-500"
      : "border-gray-300";
    const disabledClasses = props.disabled
      ? "bg-gray-100 cursor-not-allowed"
      : "bg-white";

    return (
      <div className="w-full">
        {label && (
          <label
            className={`block text-sm font-medium text-gray-700 mb-1 ${labelClassName}`}
            htmlFor={props.id}
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={`${baseClasses} ${errorClasses} ${disabledClasses} ${className}`}
          {...props}
        />
        {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
        {helperText && !error && (
          <p className="mt-1 text-sm text-gray-500">{helperText}</p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
