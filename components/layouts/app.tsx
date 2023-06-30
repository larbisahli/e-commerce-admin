import AdminFooter from '@components/common/admin-footer';
import SublevelNavigation from '@components/navigation/sublevel-navigation';
import React from 'react';

import { Navbar, Sidebar, SidebarMini } from '../navigation/index';
import MobileNavigation from '../navigation/mobile-navigation';

type Props = {
  children: React.ReactNode;
};

const AppLayout: React.FC = ({ children }: Props) => {
  return (
    <div className="min-h-screen bg-gray-100 h-fit flex flex-col transition-colors duration-150">
      <MobileNavigation />
      <SublevelNavigation />
      <div className="flex flex-1 pt-5 pb-16">
        <SidebarMini />
        <Sidebar />
        <main className="w-full h-full md:ps-20 nlg:ps-20 nxl:ps-20 lg:ps-64 xl:ps-64">
          <Navbar />
          <div className="p-4 md:p-8 overflow-y-auto h-full">{children}</div>
        </main>
      </div>
      <AdminFooter />
    </div>
  );
};
export default AppLayout;
