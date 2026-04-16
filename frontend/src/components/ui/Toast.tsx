import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { CheckCircle, AlertCircle, Info, X } from 'lucide-react';
import { useToast } from '../../context/ToastContext';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const ToastContainer: React.FC = () => {
  const { toasts } = useToast();

  return (
    <div className="fixed bottom-4 right-4 z-[100] flex flex-col gap-3 pointer-events-none">
      {toasts.map((toast) => (
        <Toast key={toast.id} toast={toast} />
      ))}
    </div>
  );
};

const Toast: React.FC<{ toast: any }> = ({ toast }) => {
  const { removeToast } = useToast();
  const elRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(elRef.current,
        { x: 40, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.4, ease: "power2.out" }
      );
    }, elRef);
    return () => ctx.revert();
  }, []);

  const handleClose = () => {
    gsap.to(elRef.current, {
      x: 40,
      opacity: 0,
      duration: 0.3,
      onComplete: () => removeToast(toast.id)
    });
  };

  const getIcon = () => {
    switch (toast.type) {
      case 'success': return <CheckCircle size={18} className="text-signal-green" />;
      case 'error': return <AlertCircle size={18} className="text-signal-red" />;
      default: return <Info size={18} className="text-prism-accent" />;
    }
  };

  return (
    <div 
      ref={elRef}
      className={cn(
        "bg-prism-navy-2 border border-prism-steel rounded-lg px-4 py-3 flex items-center gap-3 shadow-[0_4px_24px_rgba(0,0,0,0.5)] pointer-events-auto",
        "min-w-[280px] max-w-sm"
      )}
    >
      {getIcon()}
      <p className="flex-1 font-sans text-sm text-prism-text-1">
        {toast.message}
      </p>
      <button 
        onClick={handleClose}
        className="text-prism-text-3 hover:text-prism-text-2 transition-colors"
      >
        <X size={16} />
      </button>
    </div>
  );
};
