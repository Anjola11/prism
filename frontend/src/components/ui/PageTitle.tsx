import React from 'react';

interface PageTitleProps {
  title: string;
  subtitle?: string;
  className?: string;
}

export const PageTitle: React.FC<PageTitleProps> = ({ 
  title, 
  subtitle,
  className 
}) => {
  return (
    <div className={`mb-8 ${className}`}>
      <h1 className="font-display text-2xl font-bold text-prism-text-1">{title}</h1>
      {subtitle && (
        <p className="font-sans text-sm text-prism-text-3 mt-1.5">{subtitle}</p>
      )}
    </div>
  );
};
