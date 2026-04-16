import React from 'react';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { BottomNav } from './BottomNav';
import { AdminHeader } from '../admin/AdminHeader';
import { AdminSidebar } from '../admin/AdminSidebar';
import { useAuth } from '../../context/AuthContext';
import { SplashLoader } from '../ui/SplashLoader';

interface LayoutProps {
  children: React.ReactNode;
  isAdmin?: boolean;
}

export const Layout: React.FC<LayoutProps> = ({ children, isAdmin = false }) => {
  const { isLoading } = useAuth();

  if (isLoading) {
    return <SplashLoader onComplete={() => {}} />;
  }

  if (isAdmin) {
    return (
      <div className="min-h-screen bg-prism-navy transition-opacity duration-700 opacity-100">
        <AdminHeader />
        <div className="flex pt-14">
          <AdminSidebar />
          <main className="flex-1 md:ml-60 min-h-[calc(100vh-56px)] p-0">
            {children}
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-prism-navy transition-opacity duration-700 opacity-100">
      <Header />
      <div className="flex pt-14">
        <Sidebar />
        <main className="flex-1 md:ml-60 min-h-[calc(100vh-56px)] pb-20 md:pb-6">
          {children}
        </main>
      </div>
      <BottomNav />
    </div>
  );
};
