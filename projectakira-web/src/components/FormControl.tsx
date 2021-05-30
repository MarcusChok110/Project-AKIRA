import React from 'react';

interface FormControlProps {
  id: string;
  label: string;
}

const FormControl: React.FC<FormControlProps> = ({ children, id, label }) => {
  return (
    <div className="my-3">
      <label className="form-label" htmlFor={id}>
        {label}
      </label>
      {children}
    </div>
  );
};

export default FormControl;
