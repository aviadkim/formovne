import React, { useState } from 'react';
import { User, Mail, Phone, MapPin, Calendar, Briefcase } from 'lucide-react';
import SectionHeader from '../../SectionHeader';
import type { PersonalData } from '../../../types/form';

interface PersonalDetailsProps {
  data?: Partial<PersonalData>;
  onDataChange: (data: Partial<PersonalData>) => void;
}

// המשך הקוד נשאר בדיוק כמו שהוא...
