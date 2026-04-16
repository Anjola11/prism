import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface ScoreBadgeProps {
  score: number;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const ScoreBadge: React.FC<ScoreBadgeProps> = ({ 
  score, 
  size = 'md',
  className 
}) => {
  const counterRef = useRef<HTMLSpanElement>(null);
  
  const sizeClasses = {
    sm: 'w-8 h-8 text-[11px] border',
    md: 'w-11 h-11 text-sm border-2',
    lg: 'w-16 h-16 text-xl border-2',
  };

  const getTheme = () => {
    if (score >= 70) return 'bg-signal-green-bg border-signal-green text-signal-green';
    if (score >= 40) return 'bg-signal-amber-bg border-signal-amber text-signal-amber';
    return 'bg-signal-red-bg border-signal-red text-signal-red';
  };

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(counterRef.current, 
        { innerText: 0 },
        { 
          innerText: Math.round(score),
          duration: 0.6,
          ease: "power2.out",
          snap: { innerText: 1 },
          onUpdate: function() {
            if (counterRef.current) {
              counterRef.current.innerText = Math.round(Number(this.targets()[0].innerText)).toString();
            }
          }
        }
      );
    });
    return () => ctx.revert();
  }, [score]);

  return (
    <div className={cn(
      "rounded-full flex items-center justify-center font-mono font-bold select-none",
      sizeClasses[size],
      getTheme(),
      className
    )}>
      <span ref={counterRef}>{score}</span>
    </div>
  );
};
