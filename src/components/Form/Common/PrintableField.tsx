import React from 'react';
import { PrintableFieldProps } from '../../../types/props';

export const PrintableField: React.FC<PrintableFieldProps> = ({
  label,
  value,
  onChange,
  type = 'text',
  required = false
}) => {
  return (
    <div className="relative">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
        {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type={type}
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
        required={required}
      />
    </div>
  );
};