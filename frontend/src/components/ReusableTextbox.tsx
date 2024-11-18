import React from 'react';
import { TextField } from '@mui/material';

interface ReusableTextboxProps {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  minLength?: number;
  maxLength?: number;
  required?: boolean;
}

const ReusableTextbox: React.FC<ReusableTextboxProps> = ({ label, value, onChange, minLength, maxLength, required }) => {
  return (
    <TextField
      label={label}
      value={value}
      onChange={onChange}
      inputProps={{ minLength, maxLength }}
      required={required}
      fullWidth
      margin="normal"
    />
  );
};

export default ReusableTextbox;