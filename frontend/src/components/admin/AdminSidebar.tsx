import React from 'react';
import { LayoutDashboard, Globe, Zap, Server, Users, ArrowLeft } from 'lucide-react';
import { Link } from '@tanstack/react-router';

export const AdminSidebar: React.FC = () => {
  const links = [
    { icon: LayoutDashboard, label: 'Overview', path: '/admin' },
    { icon: Globe, label: 'Markets', path: '/admin/markets' },
    { icon: Zap, label: 'Signals', path: '/admin/signals' },
    { icon: Server, label: 'System Health', path: '/admin/system' },
    { icon: Users, label: 'Users', path: '/admin/users', disabled: true },
  ];

  return (
    <aside className="w-60 fixed left-0 top-14 bottom-0 bg-prism-navy border-r border-prism-navy-3 hidden md:flex flex-col py-6">
      <nav className="flex-1 px-4 space-y-1.5">
        {links.map((link) => {
          const Icon = link.icon;
          return (
            <Link
              key={link.label}
              disabled={link.disabled}
              to={link.disabled ? undefined : link.path}
              activeProps={link.disabled ? {} : { className: 'bg-prism-navy-2 text-prism-text-1' }}
              inactiveProps={link.disabled ? {} : { className: 'text-prism-text-2 hover:bg-prism-navy-2 hover:text-prism-text-1' }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-sans transition-all ${
                link.disabled ? 'opacity-40 cursor-not-allowed' : ''
              }`}
            >
              <Icon size={18} />
              <span className="font-medium">{link.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="px-4 mt-auto border-t border-prism-navy-3 pt-6">
        <Link to="/dashboard" className="flex items-center gap-2 text-xs font-mono text-prism-text-3 hover:text-prism-text-1 transition-colors uppercase tracking-widest pl-3">
          <ArrowLeft size={14} />
          Back to App
        </Link>
      </div>
    </aside>
  );
};
