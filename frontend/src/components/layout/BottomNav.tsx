import React from 'react';
import { Activity, TrendingUp, BookOpen, Settings } from 'lucide-react';
import { Link } from '@tanstack/react-router';

export const BottomNav: React.FC = () => {
  const items = [
    { name: 'Dashboard', path: '/dashboard', icon: Activity },
    { name: 'Performance', path: '/performance', icon: TrendingUp },
    { name: 'Docs', path: '/methodology', icon: BookOpen },
    { name: 'Settings', path: '/admin', icon: Settings },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 h-14 bg-prism-navy/95 backdrop-blur-sm border-t border-prism-navy-3 flex md:hidden items-center justify-around z-50">
      {items.map((item) => (
        <Link
          key={item.name}
          to={item.path}
          activeProps={{ className: 'text-prism-accent [&>span]:text-prism-text-1' }}
          inactiveProps={{ className: 'text-prism-text-3' }}
          className="flex flex-col items-center gap-1 transition-colors"
        >
          <item.icon size={20} />
          <span className="text-[10px] font-sans">
            {item.name}
          </span>
        </Link>
      ))}
    </nav>
  );
};
