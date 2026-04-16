import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface LogoProps {
  variant?: 'full' | 'mark' | 'compact';
  theme?: 'dark' | 'light';
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ 
  variant = 'full', 
  theme = 'dark', 
  className 
}) => {
  const isDark = theme === 'dark';
  
  // Sizes mapping
  const sizeMap = {
    full: 32,
    mark: 24,
    compact: 16
  };
  
  const size = sizeMap[variant];
  
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="flex-shrink-0"
      >
        {/* The Prism Icon (Isometric) */}
        {/* Isometric projection of a triangular prism */}
        
        {/* Left Face */}
        <path
          d="M16 8L8 12.5V21.5L16 17V8Z"
          fill="#0D2137"
          stroke="#2D4A6B"
          strokeWidth="1"
        />
        
        {/* Top Face */}
        <path
          d="M16 8L24 12.5L16 17L8 12.5L16 8Z"
          fill="#1E3A5F"
          stroke="#2D4A6B"
          strokeWidth="1"
        />
        
        {/* Right Face */}
        <path
          d="M16 17L24 12.5V21.5L16 26V17Z"
          fill="#152D4A"
          stroke="#2D4A6B"
          strokeWidth="1"
        />

        {/* Refraction Rays (from the right vertex of the top face/right face intersection) */}
        {/* Vertex at (24, 12.5) approx */}
        <g className="refraction-rays">
          {/* Green Ray (Top) */}
          <line
            x1="24" y1="12.5" x2="32" y2="10"
            stroke="#16A34A"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          {/* Amber Ray (Middle) */}
          <line
            x1="24" y1="12.5" x2="32" y2="12.5"
            stroke="#F59E0B"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          {/* Red Ray (Bottom) */}
          <line
            x1="24" y1="12.5" x2="32" y2="15"
            stroke="#DC2626"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </g>
      </svg>
      
      {variant === 'full' && (
        <span 
          className={cn(
            "font-mono font-bold uppercase tracking-[0.2em] text-xl select-none",
            isDark ? "text-prism-text-1" : "text-prism-navy"
          )}
        >
          PRISM
        </span>
      )}
    </div>
  );
};
