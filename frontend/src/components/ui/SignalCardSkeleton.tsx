import React from 'react';

export const SignalCardSkeleton: React.FC = () => {
  return (
    <div className="bg-prism-navy-2 border border-prism-navy-3 border-l-[3px] border-l-prism-navy-3 rounded-lg p-5 animate-pulse">
      <div className="flex justify-between items-start gap-4">
        <div className="w-11 h-11 rounded-full bg-prism-navy-3 flex-shrink-0" />
        <div className="flex-1 space-y-3">
          <div className="h-4 w-48 bg-prism-navy-3 rounded" />
          <div className="flex items-center gap-3">
            <div className="h-5 w-24 bg-prism-navy-3 rounded-full" />
            <div className="h-4 w-16 bg-prism-navy-3 rounded" />
          </div>
        </div>
        <div className="h-2 w-12 bg-prism-navy-3 rounded" />
      </div>

      <div className="mt-8 flex gap-8 border-b border-prism-navy-3/30 pb-5">
         <div className="space-y-2">
           <div className="h-2 w-12 bg-prism-navy-3 rounded" />
           <div className="h-3 w-16 bg-prism-navy-3 rounded" />
         </div>
         <div className="space-y-2">
           <div className="h-2 w-12 bg-prism-navy-3 rounded" />
           <div className="h-3 w-16 bg-prism-navy-3 rounded" />
         </div>
         <div className="space-y-2">
           <div className="h-2 w-12 bg-prism-navy-3 rounded" />
           <div className="h-3 w-16 bg-prism-navy-3 rounded" />
         </div>
      </div>

      <div className="mt-6 space-y-2.5">
         <div className="h-2.5 w-full bg-prism-navy-3 rounded" />
         <div className="h-2.5 w-3/4 bg-prism-navy-3 rounded" />
      </div>
    </div>
  );
};
