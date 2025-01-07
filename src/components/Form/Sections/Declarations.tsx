import React, { useState, useRef } from 'react';
import { FileText, Check, AlertCircle } from 'lucide-react';
import SignaturePad from '../Common/SignaturePad';
import SectionHeader from '../../SectionHeader';
import type { DeclarationsData } from '../../../types/form';

interface DeclarationsProps {
  data?: Partial<DeclarationsData>;
  onDataChange: (data: Partial<DeclarationsData>) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
}

// המשך הקוד נשאר בדיוק כמו שהוא...
