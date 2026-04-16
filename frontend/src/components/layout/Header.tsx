import React from 'react';
import { Logo } from '../ui/Logo';
import { Link } from '@tanstack/react-router';

export const Header: React.FC = () => {
  return (
    <header className="h-14 fixed top-0 left-0 right-0 z-50 border-b border-prism-navy-3 bg-prism-navy/95 backdrop-blur-sm flex items-center justify-between px-6">
      <div className="flex items-center gap-4">
        <Link to="/dashboard">
          <Logo variant="full" className="hidden md:flex" />
          <Logo variant="mark" className="md:hidden" />
        </Link>
        <div className="hidden md:flex flex-col">
          <span className="text-[9px] uppercase tracking-[0.2em] bg-prism-navy-3 text-prism-text-3 px-1.5 py-0.5 rounded w-fit leading-none">BETA</span>
        </div>
      </div>

      <div className="hidden md:flex items-center gap-6">
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-signal-green animate-pulse"></div>
          <span className="font-mono text-[10px] text-prism-text-3 uppercase tracking-tighter">
            LIVE · last updated 12s ago
          </span>
        </div>
        
        <nav className="flex items-center gap-4">
          <Link to="/dashboard" activeProps={{ className: 'text-prism-text-1 border-b' }} inactiveProps={{ className: 'text-prism-text-2 hover:text-prism-text-1 border-b border-transparent' }} className="text-sm border-prism-accent px-1 py-1 transition-colors">Dashboard</Link>
          <Link to="/performance" activeProps={{ className: 'text-prism-text-1 border-b' }} inactiveProps={{ className: 'text-prism-text-2 hover:text-prism-text-1 border-b border-transparent' }} className="text-sm border-prism-accent px-1 py-1 transition-colors">Performance</Link>
          <Link to="/methodology" activeProps={{ className: 'text-prism-text-1 border-b' }} inactiveProps={{ className: 'text-prism-text-2 hover:text-prism-text-1 border-b border-transparent' }} className="text-sm border-prism-accent px-1 py-1 transition-colors">Methodology</Link>
        </nav>
      </div>

      <div className="flex items-center gap-3">
        <div className="hidden md:flex items-center bg-prism-navy-3 border border-prism-steel px-2 py-0.5 rounded-full">
           <span className="font-mono text-[9px] uppercase text-prism-text-2">ADMIN</span>
        </div>
        <button className="w-8 h-8 rounded-full bg-prism-navy-3 border border-prism-steel flex items-center justify-center font-mono text-xs text-prism-text-1 hover:border-prism-text-2 transition-colors">
          JD
        </button>
      </div>
    </header>
  );
};
