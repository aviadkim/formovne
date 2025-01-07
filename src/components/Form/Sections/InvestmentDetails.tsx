import React from 'react';
import { InvestmentDetailsProps } from '../../../types/props';
import { SectionHeader } from '../Common/SectionHeader';

const InvestmentDetails: React.FC<InvestmentDetailsProps> = ({ data, onDataChange }) => {
  return (
    <section className="space-y-4">
      <SectionHeader
        title="פרטי השקעה"
        subtitle="אנא מלא את פרטי ההשקעה"
      />
      {/* Your existing JSX */}
    </section>
  );
};

export default InvestmentDetails;