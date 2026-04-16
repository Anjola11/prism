import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScoreBadge } from './ScoreBadge';
import { ClassificationChip } from './ClassificationChip';
import type { Signal } from '../../types/signal';
import { clsx, type ClassValue } from 'clsx';
import { useNavigate } from '@tanstack/react-router';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface SignalCardProps {
  signal: Signal;
  mode?: 'full' | 'preview';
  isAuth?: boolean;
}

export const SignalCard: React.FC<SignalCardProps> = ({ 
  signal, 
  mode = 'full',
  isAuth = true
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const handleNavigate = () => {
    if (signal.marketId) {
      navigate({ to: '/market/$id', params: { id: signal.marketId } });
    }
  };

  const getAccentColor = () => {
    switch (signal.classification) {
      case 'INFORMED_MOVE': return 'border-l-signal-green';
      case 'UNCERTAIN': return 'border-l-signal-amber';
      case 'NOISE': return 'border-l-signal-red';
    }
  };

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(cardRef.current, {
        opacity: 0,
        y: 16,
        duration: 0.3,
        ease: "power2.out"
      });
    }, cardRef);
    return () => ctx.revert();
  }, []);

  return (
    <div 
      ref={cardRef}
      onClick={handleNavigate}
      className={cn(
        "signal-card group relative bg-prism-navy-2 border border-prism-navy-3 border-l-[3px] rounded-lg p-5 transition-all cursor-pointer hover:bg-prism-navy-3 hover:shadow-[0_2px_16px_rgba(0,0,0,0.3)] hover:border-prism-steel",
        getAccentColor()
      )}
    >
      <div className="flex justify-between items-start gap-4">
        <ScoreBadge score={signal.score} size="md" className="flex-shrink-0" />
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-prism-text-1 truncate group-hover:text-prism-accent transition-colors">
            {signal.marketTitle}
          </h3>
          <div className="flex items-center gap-3 mt-1.5">
            <ClassificationChip classification={signal.classification} />
            <span className="font-mono text-sm text-prism-text-mono font-bold">
              {signal.priceDelta}
            </span>
          </div>
        </div>
        <span className="font-mono text-[10px] text-prism-text-3 uppercase mt-1">
          {signal.timestamp}
        </span>
      </div>

      <div className="mt-6 flex flex-wrap gap-x-8 gap-y-3 font-mono text-xs text-prism-text-3 border-b border-prism-navy-3/30 pb-5">
         <div>
           <p className="uppercase tracking-widest text-[9px] mb-1">Liquidity</p>
           <span className="text-prism-text-mono font-medium">{signal.liquidity}</span>
         </div>
         <div>
           <p className="uppercase tracking-widest text-[9px] mb-1">Orders</p>
           <span className="text-prism-text-mono font-medium">{signal.orders}</span>
         </div>
         <div>
           <p className="uppercase tracking-widest text-[9px] mb-1">Vol Ratio</p>
           <span className="text-prism-text-mono font-medium">{signal.volRatio}x</span>
         </div>
      </div>

      {signal.aiInsight && (
        <div className="mt-5 pt-3 border-t border-prism-navy-3/30">
          <p className="font-mono text-[9px] text-prism-text-3 uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-sm bg-prism-accent"></span>
            Gemini Analysis
          </p>
          <div className={cn("text-xs leading-relaxed italic text-prism-text-2 transition-all", !isAuth && "blur-[2px] select-none")}>
             "{signal.aiInsight}"
          </div>
        </div>
      )}

      {mode === 'full' && (
        <div className="mt-4 flex justify-end">
          <span className="text-[10px] font-sans font-medium text-prism-accent uppercase tracking-widest group-hover:underline">View Market →</span>
        </div>
      )}
    </div>
  );
};
