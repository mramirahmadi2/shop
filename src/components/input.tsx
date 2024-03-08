import React from 'react';

interface InputProps {
  ClassName: string;
  id: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
}

const Input: React.FC<InputProps> = ({ ClassName, id, type, value, onChange, placeholder }) => {
  return (
    <input
      className={ClassName}
      id={id}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
  );
}

export default Input;
