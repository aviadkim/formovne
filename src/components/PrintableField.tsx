import React from 'react';

interface PrintableFieldProps {
  label: string;
  value: string | number;
  icon?: React.ReactNode;
  className?: string;
}

const PrintableField: React.FC<PrintableFieldProps> = ({
  label,
  value,
  icon,
  className = ''
}) => {
  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      <div className="flex items-center justify-between">
        <label className="text-gray-600 text-sm font-medium">{label}</label>
        {icon && <span className="text-gray-400">{icon}</span>}
      </div>
      <div className="print-form-field min-h-[40px] w-full bg-white rounded-lg border border-gray-200">
        <span className="print-form-value block px-3 py-2">{value}</span>
      </div>
    </div>
  );
};

export default PrintableField;