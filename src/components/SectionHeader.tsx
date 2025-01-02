import React from 'react';
import { LucideIcon } from 'lucide-react';

interface SectionHeaderProps {
  icon: LucideIcon;
  title: string;
  color?: 'blue' | 'green' | 'purple' | 'orange' | 'indigo';
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ icon: Icon, title, color = 'blue' }) => {
  const colorMap = {
    blue: 'bg-blue-100 text-blue-600',
    green: 'bg-green-100 text-green-600',
    purple: 'bg-purple-100 text-purple-600',
    orange: 'bg-orange-100 text-orange-600',
    indigo: 'bg-indigo-100 text-indigo-600'
  };

  const colorClasses = colorMap[color];

  return (
    <div className="flex items-center justify-between mb-8" dir="rtl">
      <div className="flex items-center gap-4">
        <div className={`w-12 h-12 rounded-full ${colorClasses.split(' ')[0]} flex items-center justify-center`}>
          <Icon className={`w-6 h-6 ${colorClasses.split(' ')[1]}`} />
        </div>
        <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
      </div>
      <img 
        src="./movne-logo.png"
        alt="מובנה"
        className="h-10 w-auto object-contain"
      />
    </div>
  );
};

export default SectionHeader;