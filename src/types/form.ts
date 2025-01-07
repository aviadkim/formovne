export interface PersonalData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  birthDate: string;
  occupation: string;
  company: string;
}

export interface InvestmentData {
  investmentAmount: number;
  selectedBank: string;
  currencies: Record<string, boolean>;
  purposes: Record<string, boolean>;
}

export interface RiskData {
  mainGoal: string;
  investmentPeriod: string;
  investmentPercentage: string;
}

export interface DeclarationsData {
  readSections: Record<number, boolean>;
  finalConfirmation: boolean;
  signature?: string;
}

export interface FormData {
  personal: Partial<PersonalData>;
  investment: Partial<InvestmentData>;
  risk: Partial<RiskData>;
  declarations: Partial<DeclarationsData>;
}