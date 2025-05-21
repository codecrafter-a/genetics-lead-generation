
import React from 'react';
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

export type VisaOption = {
  id: string;
  label: string;
};

interface VisaOptionsSelectorProps {
  options: VisaOption[];
  selectedOptions: string[];
  onChange: (optionId: string) => void;
}

const VisaOptionsSelector: React.FC<VisaOptionsSelectorProps> = ({
  options,
  selectedOptions,
  onChange
}) => {
  return (
    <div>
      <h3 className="text-lg md:text-xl font-bold mb-4 text-gray-800">Visa categories of interest:</h3>
      <div className="grid gap-4">
        {options.map((option) => (
          <div key={option.id} className="items-center space-x-2">
            <Checkbox 
              id={option.id}
              checked={selectedOptions.includes(option.id)} 
              onCheckedChange={() => onChange(option.id)}
              className="text-indigo-600 focus:ring-indigo-500"
            />
            <Label htmlFor={option.id} className="text-gray-700 cursor-pointer">{option.label}</Label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VisaOptionsSelector;
