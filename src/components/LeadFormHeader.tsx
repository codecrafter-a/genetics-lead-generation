
import React, { ReactNode } from 'react';

interface LeadFormHeaderProps {
  title?: ReactNode;
  subtitle?: ReactNode;
  description?: ReactNode;
}

const LeadFormHeader: React.FC<LeadFormHeaderProps> = ({
  title,
  subtitle,
  description
}) => {
  return (
    <div className="mb-8 md:mb-10">
      {subtitle && <h2 className="text-lg md:text-xl font-bold mb-2 text-gray-800">{subtitle}</h2>}
      {title && <h1 className="text-3xl md:text-[42px] font-bold mb-4 text-black md:leading-[54px]">{title}</h1>}
      {description && <p className="text-gray-600 leading-relaxed font-semibold">{description}</p>}
    </div>
  );
};

export default LeadFormHeader;
