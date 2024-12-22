export interface FormData {
    personal: {
      firstName: string;
      lastName: string;
      email: string;
      phone: string;
      address: string;
      birthDate: string;
      occupation: string;
      company: string;
    };
    investment: {
      investmentAmount: number;
      selectedBank: string;
      currencies: Record<string, boolean>;
      purposes: Record<string, boolean>;
      otherPurpose?: string;
    };
    risk: {
      mainGoal: string;
      investmentPeriod: string;
      investmentPercentage: string;
    };
    declarations: {
      readSections: Record<number, boolean>;
      finalConfirmation: boolean;
      signature?: string;
    };
  }
  
  export interface ComponentProps {
    onDataChange?: (data: any) => void;
    onSubmit?: () => void;
  }