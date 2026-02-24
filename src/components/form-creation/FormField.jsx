import React from 'react';
import './formField.scss';

const FormField = ({
  id,
  label,
  type = 'text',
  as = 'input',
  value,
  onChange,
  error,
  required = false,
  placeholder = '',
  name,
  children
}) => {
  const Component = as;

  return (
    <div className="form-field">
      <label htmlFor={id}>{label}</label>
      <Component
        id={id}
        name={name}
        type={as === 'input' ? type : undefined}
        value={value}
        onChange={onChange}
        required={required}
        placeholder={as === 'input' ? placeholder : undefined}
        className={error ? 'error' : ''}
      >
        {children}
      </Component>
      {error && <span className="error-message">{error}</span>}
    </div>
  );
};

export default FormField; 