import React, { forwardRef } from "react";

const Input = forwardRef(
  (
    { label, error, helperText, className = "", labelClassName = "", ...props },
    ref
  ) => {
    const getInputClass = () => {
      let inputClass = "form-input";
      if (error) inputClass += " error";
      if (props.disabled) inputClass += " disabled";
      return `${inputClass} ${className}`;
    };

    return (
      <div className="form-group">
        {label && (
          <label className={`form-label ${labelClassName}`} htmlFor={props.id}>
            {label}
          </label>
        )}
        <input ref={ref} className={getInputClass()} {...props} />
        {error && <p className="error-text">{error}</p>}
        {helperText && !error && <p className="helper-text">{helperText}</p>}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
