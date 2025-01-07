import { PersonalData, InvestmentData, RiskData, DeclarationsData } from './form';

export interface PersonalDetailsProps {
  data: Partial<PersonalData>;
  onDataChange: (data: Partial<PersonalData>) => void;
}

export interface InvestmentDetailsProps {
  data: Partial<InvestmentData>;
  onDataChange: (data: Partial<InvestmentData>) => void;
}

export interface RiskAssessmentProps {
  data: Partial<RiskData>;
  onDataChange: (data: Partial<RiskData>) => void;
}

export interface DeclarationsProps {
  data: Partial<DeclarationsData>;
  onDataChange: (data: Partial<DeclarationsData>) => void;
}

export interface PrintableFieldProps {
  label: string;
  value?: string | number;
  onChange: (value: string) => void;
  type?: string;
  required?: boolean;
}

export interface SectionHeaderProps {
  title: string;
  subtitle?: string;
}