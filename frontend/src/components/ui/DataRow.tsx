import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface DataRowProps {
  label: string;
  value: string | number;
  mono?: boolean;
  className?: string;
}

export const DataRow: React.FC<DataRowProps> = ({ 
  label, 
  value, 
  mono = true,
  className 
}) => {
  return (
    <div className={cn(
      "flex justify-between items-center py-1.5 border-b border-prism-navy-3/30",
      className
    )}>
      <span className="font-sans text-xs text-prism-text-3 font-medium uppercase tracking-wider">{label}</span>
      <span className={cn(
        "text-xs",
        mono ? "font-mono text-prism-text-mono font-bold" : "font-sans text-prism-text-2"
      )}>
        {value}
      </span>
    </div>
  );
};
