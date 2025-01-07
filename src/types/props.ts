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