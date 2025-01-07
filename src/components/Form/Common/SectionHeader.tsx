import React from 'react';
import { SectionHeaderProps } from '../../../types/props';

export const SectionHeader: React.FC<SectionHeaderProps> = ({ title, subtitle }) => {
  return (
    <div className="mb-6">
      <h2 className="text-2xl font-bold">{title}</h2>
      {subtitle && <p className="text-gray-600 mt-1">{subtitle}</p>}
    </div>
  );
};