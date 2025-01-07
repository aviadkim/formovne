import React, { useState } from 'react';
import { Briefcase, CreditCard, Building2, ArrowUpRight } from 'lucide-react';
import SectionHeader from '../../SectionHeader';
import type { InvestmentData } from '../../../types/form';

interface InvestmentDetailsProps {
  data?: Partial<InvestmentData>;
  onDataChange: (data: Partial<InvestmentData>) => void;
}

// המשך הקוד נשאר בדיוק כמו שהוא...
