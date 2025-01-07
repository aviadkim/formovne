import { PersonalData, InvestmentData, RiskData, DeclarationsData } from './form';

export interface PersonalDetailsProps {
  data: PersonalData;
  onDataChange: (data: Partial<PersonalData>) => void;
}

export interface InvestmentDetailsProps {
  data: InvestmentData;
  onDataChange: (data: any) => void;
}

export interface RiskAssessmentProps {
  data: RiskData;
  onDataChange: (data: any) => void;
}

export interface DeclarationsProps {
  data: DeclarationsData;
  onDataChange: (data: Record<string, unknown>) => void;
}