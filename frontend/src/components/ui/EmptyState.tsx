import React from 'react';
import type { LucideIcon } from 'lucide-react';

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ 
  icon: Icon, 
  title, 
  description 
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-6 text-center">
      <div className="bg-prism-navy-2 border border-prism-navy-3 p-5 rounded-full mb-6">
        <Icon size={32} className="text-prism-text-3" />
      </div>
      <h3 className="font-sans text-sm font-semibold text-prism-text-2">{title}</h3>
      <p className="font-sans text-xs text-prism-text-3 mt-2 max-w-xs leading-relaxed">
        {description}
      </p>
    </div>
  );
};
