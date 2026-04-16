import React from 'react';
import { Logo } from '../ui/Logo';
import { Link } from '@tanstack/react-router';
import { useAuth } from '../../context/AuthContext';
import { ChevronRight, LogOut } from 'lucide-react';

export const AdminHeader: React.FC = () => {
  const { user, logout } = useAuth();


  return (
    <header className="h-14 fixed top-0 left-0 right-0 z-[60] bg-prism-navy/95 backdrop-blur-sm border-b border-prism-navy-3 flex items-center px-6 justify-between">
      <div className="flex items-center gap-6">
        <Link to="/admin">
          <Logo variant="full" className="scale-90 origin-left" />
        </Link>
        
        <div className="hidden md:flex items-center gap-4 border-l border-prism-navy-3 pl-6">
           <span className="font-mono text-[10px] uppercase tracking-widest text-prism-text-3">Admin Console</span>
           <div className="flex items-center gap-1.5 text-prism-text-3 font-mono text-[10px]">
              <ChevronRight size={10} />
              <span className="text-prism-text-2 uppercase tracking-widest">Dashboard</span>
           </div>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="hidden sm:flex flex-col items-end">
          <span className="text-xs font-semibold text-prism-text-1">{user?.name}</span>
          <span className="text-[10px] font-mono text-signal-amber uppercase tracking-widest">System Admin</span>
        </div>
        <button 
          onClick={logout}
          className="p-2 text-prism-text-3 hover:text-signal-red transition-colors"
        >
          <LogOut size={18} />
        </button>
      </div>
    </header>
  );
};
