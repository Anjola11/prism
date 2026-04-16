import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface ClassificationChipProps {
  classification: 'INFORMED_MOVE' | 'UNCERTAIN' | 'NOISE';
  className?: string;
}

export const ClassificationChip: React.FC<ClassificationChipProps> = ({ 
  classification,
  className 
}) => {
  const getTheme = () => {
    switch (classification) {
      case 'INFORMED_MOVE':
        return 'bg-signal-green-bg border-signal-green-muted text-signal-green';
      case 'UNCERTAIN':
        return 'bg-signal-amber-bg border-signal-amber-muted text-signal-amber';
      case 'NOISE':
        return 'bg-signal-red-bg border-signal-red-muted text-signal-red';
    }
  };

  return (
    <div className={cn(
      "font-mono text-[10px] uppercase tracking-wide px-2.5 py-1 rounded-full border border-opacity-50 select-none",
      getTheme(),
      className
    )}>
      {classification.replace('_', ' ')}
    </div>
  );
};
