import React from 'react';
import { PersonalDetailsProps } from '../../../types/props';
import { SectionHeader } from '../Common/SectionHeader';
import { PrintableField } from '../Common/PrintableField';

const PersonalDetails: React.FC<PersonalDetailsProps> = ({ data, onDataChange }) => {
  const handleChange = (field: string, value: string) => {
    onDataChange({ [field]: value });
  };

  return (
    <section className="space-y-4">
      <SectionHeader 
        title="פרטים אישיים" 
        subtitle="אנא מלא את הפרטים האישיים שלך"
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <PrintableField
          label="שם משפחה"
          value={data.lastName}
          onChange={(value) => handleChange('lastName', value)}
        />
        <PrintableField
          label="שם פרטי"
          value={data.firstName}
          onChange={(value) => handleChange('firstName', value)}
        />
        <PrintableField
          label="דוא״ל"
          value={data.email}
          onChange={(value) => handleChange('email', value)}
          type="email"
        />
        <PrintableField
          label="טלפון"
          value={data.phone}
          onChange={(value) => handleChange('phone', value)}
          type="tel"
        />
        <PrintableField
          label="כתובת"
          value={data.address}
          onChange={(value) => handleChange('address', value)}
        />
        <PrintableField
          label="תאריך לידה"
          value={data.birthDate}
          onChange={(value) => handleChange('birthDate', value)}
          type="date"
        />
        <PrintableField
          label="תעסוקה"
          value={data.occupation}
          onChange={(value) => handleChange('occupation', value)}
        />
        <PrintableField
          label="חברה"
          value={data.company}
          onChange={(value) => handleChange('company', value)}
        />
      </div>
    </section>
  );
};

export default PersonalDetails;