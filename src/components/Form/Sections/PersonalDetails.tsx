import React, { useState } from 'react';
import { User, Mail, Phone, Home, Calendar, UserCheck, Building } from 'lucide-react';

interface PersonalDetailsProps {
  onDataChange?: (data: any) => void;
}

const PersonalDetails: React.FC<PersonalDetailsProps> = ({ onDataChange }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    birthDate: '',
    occupation: '',
    company: ''
  });

  const handleChange = (field: string, value: string) => {
    const newData = { ...formData, [field]: value };
    setFormData(newData);
    onDataChange?.(newData);
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden" dir="rtl">
      <div className="p-8">
        {/* Header Section */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
              <User className="w-6 h-6 text-blue-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800">פרטים אישיים</h2>
          </div>
        </div>

        <div className="space-y-8">
          {/* Basic Details */}
          <div className="p-6 bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                  <UserCheck className="w-4 h-4" />
                  שם פרטי
                </label>
                <input
                  type="text"
                  value={formData.firstName}
                  onChange={(e) => handleChange('firstName', e.target.value)}
                  className="w-full p-3 border-2 border-gray-200 rounded-lg
                           focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                           transition-all duration-300"
                  placeholder="הכנס שם פרטי"
                />
              </div>
              
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                  <UserCheck className="w-4 h-4" />
                  שם משפחה
                </label>
                <input
                  type="text"
                  value={formData.lastName}
                  onChange={(e) => handleChange('lastName', e.target.value)}
                  className="w-full p-3 border-2 border-gray-200 rounded-lg
                           focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                           transition-all duration-300"
                  placeholder="הכנס שם משפחה"
                />
              </div>
            </div>
          </div>

          {/* Contact Details */}
          <div className="p-6 bg-gradient-to-br from-gray-50 to-green-50 rounded-xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                  <Mail className="w-4 h-4" />
                  דואר אלקטרוני
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  className="w-full p-3 border-2 border-gray-200 rounded-lg
                           focus:ring-2 focus:ring-green-500 focus:border-green-500
                           transition-all duration-300"
                  placeholder="הכנס כתובת מייל"
                  dir="ltr"
                />
              </div>
              
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                  <Phone className="w-4 h-4" />
                  טלפון נייד
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleChange('phone', e.target.value)}
                  className="w-full p-3 border-2 border-gray-200 rounded-lg
                           focus:ring-2 focus:ring-green-500 focus:border-green-500
                           transition-all duration-300"
                  placeholder="הכנס מספר טלפון"
                  dir="ltr"
                />
              </div>
            </div>
          </div>

          {/* Additional Details */}
          <div className="p-6 bg-gradient-to-br from-gray-50 to-purple-50 rounded-xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                  <Home className="w-4 h-4" />
                  כתובת מגורים
                </label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => handleChange('address', e.target.value)}
                  className="w-full p-3 border-2 border-gray-200 rounded-lg
                           focus:ring-2 focus:ring-purple-500 focus:border-purple-500
                           transition-all duration-300"
                  placeholder="הכנס כתובת מלאה"
                />
              </div>
              
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                  <Calendar className="w-4 h-4" />
                  תאריך לידה
                </label>
                <input
                  type="date"
                  value={formData.birthDate}
                  onChange={(e) => handleChange('birthDate', e.target.value)}
                  className="w-full p-3 border-2 border-gray-200 rounded-lg
                           focus:ring-2 focus:ring-purple-500 focus:border-purple-500
                           transition-all duration-300"
                  dir="ltr"
                />
              </div>
            </div>
          </div>

          {/* Employment Details */}
          <div className="p-6 bg-gradient-to-br from-gray-50 to-orange-50 rounded-xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                  <UserCheck className="w-4 h-4" />
                  עיסוק / מקצוע
                </label>
                <input
                  type="text"
                  value={formData.occupation}
                  onChange={(e) => handleChange('occupation', e.target.value)}
                  className="w-full p-3 border-2 border-gray-200 rounded-lg
                           focus:ring-2 focus:ring-orange-500 focus:border-orange-500
                           transition-all duration-300"
                  placeholder="הכנס עיסוק"
                />
              </div>
              
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                  <Building className="w-4 h-4" />
                  מקום עבודה
                </label>
                <input
                  type="text"
                  value={formData.company}
                  onChange={(e) => handleChange('company', e.target.value)}
                  className="w-full p-3 border-2 border-gray-200 rounded-lg
                           focus:ring-2 focus:ring-orange-500 focus:border-orange-500
                           transition-all duration-300"
                  placeholder="הכנס מקום עבודה"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalDetails;
