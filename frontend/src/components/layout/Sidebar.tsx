import React from 'react';
import { Activity, TrendingUp, BookOpen } from 'lucide-react';
import { Link } from '@tanstack/react-router';

export const Sidebar: React.FC = () => {
  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: Activity },
    { name: 'Performance', path: '/performance', icon: TrendingUp },
    { name: 'Methodology', path: '/methodology', icon: BookOpen },
  ];

  return (
    <aside className="fixed left-0 top-14 bottom-0 w-60 border-r border-prism-navy-3 bg-prism-navy hidden md:flex flex-col p-4 overflow-y-auto">
      <nav className="flex-1 space-y-1">
        {navItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            activeProps={{ className: 'bg-prism-navy-3 text-prism-text-1 border-l-2 border-prism-accent' }}
            inactiveProps={{ className: 'text-prism-text-2 hover:bg-prism-navy-2 hover:text-prism-text-1 border-l-2 border-transparent' }}
            className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-sans rounded-md transition-colors"
          >
            <item.icon size={18} />
            {item.name}
          </Link>
        ))}
      </nav>

      <div className="mt-auto pt-6">
        <div className="bg-prism-navy-2 border border-prism-navy-3 rounded-lg p-4">
          <h4 className="font-mono text-[10px] uppercase tracking-widest text-prism-text-3 mb-3">
            TODAY'S SIGNALS
          </h4>
          
          <div className="flex items-baseline gap-2 mb-1">
            <span className="font-mono text-2xl font-bold text-prism-text-1">24</span>
            <span className="text-xs text-prism-text-3">total</span>
          </div>
          
          <div className="w-full h-1 bg-prism-navy-3 rounded-full overflow-hidden mb-4">
            <div className="h-full bg-prism-accent w-[60%]"></div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="text-signal-green">10 informed</span>
              <span className="text-prism-text-3">42%</span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="text-signal-amber">8 uncertain</span>
              <span className="text-prism-text-3">33%</span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="text-signal-red">6 noise</span>
              <span className="text-prism-text-3">25%</span>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};
