import React, { forwardRef } from "react";

const Textarea = forwardRef(
  (
    { label, error, helperText, className = "", labelClassName = "", ...props },
    ref
  ) => {
    const getTextareaClass = () => {
      let textareaClass = "form-input message-input";
      if (error) textareaClass += " error";
      if (props.disabled) textareaClass += " disabled";
      return `${textareaClass} ${className}`;
    };

    return (
      <div className="form-group">
        {label && (
          <label className={`form-label ${labelClassName}`} htmlFor={props.id}>
            {label}
          </label>
        )}
        <textarea ref={ref} className={getTextareaClass()} {...props} />
        {error && <p className="error-text">{error}</p>}
        {helperText && !error && <p className="helper-text">{helperText}</p>}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";

export default Textarea;
