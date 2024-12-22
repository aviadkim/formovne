import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface AccordionItemProps {
  title: string;
  content: React.ReactNode;
  isRead?: boolean;
  onRead?: () => void;
}

interface AccordionProps {
  items: AccordionItemProps[];
}

const AccordionItem: React.FC<AccordionItemProps> = ({
  title,
  content,
  isRead,
  onRead
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
    if (!isRead && onRead) {
      onRead();
    }
  };

  return (
    <div className="border-2 border-gray-200 rounded-xl overflow-hidden">
      <div 
        onClick={handleToggle}
        className="bg-gray-50 p-4 flex items-center justify-between cursor-pointer"
      >
        <div className="flex items-center gap-3">
          <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
          {isRead && (
            <span className="bg-green-100 text-green-600 text-sm px-3 py-1 rounded-full">
              נקרא
            </span>
          )}
        </div>
        {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
      </div>
      
      {isOpen && (
        <div className="p-4 bg-white">
          {content}
        </div>
      )}
    </div>
  );
};

const Accordion: React.FC<AccordionProps> = ({ items }) => {
  return (
    <div className="space-y-4">
      {items.map((item, index) => (
        <AccordionItem key={index} {...item} />
      ))}
    </div>
  );
};

export default Accordion;