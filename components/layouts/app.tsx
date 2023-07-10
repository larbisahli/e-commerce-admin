import AdminFooter from '@components/common/admin-footer';
import SublevelNavigation from '@components/navigation/sublevel-navigation';
import { useUI } from '@hooks/useUI';
import cn from 'classnames';
import React from 'react';

import { Navbar, Sidebar, SidebarMini } from '../navigation/index';
import MobileNavigation from '../navigation/mobile-navigation';

type Props = {
  children: React.ReactNode;
};

const AppLayout: React.FC = ({ children }: Props) => {
  const {
    ui: { displayMiniSidebar }
  } = useUI();

  return (
    <main className="min-h-screen bg-gray-100 h-fit flex flex-col transition-colors duration-150">
      <MobileNavigation />
      <SublevelNavigation />
      <div className="flex flex-1 pt-5 pb-16">
        <SidebarMini />
        <Sidebar />
        <div
          className={cn(
            'md:ps-20 nlg:ps-20 nxl:ps-20 lg:ps-64 xl:ps-64 pt-20',
            'w-full h-full',
            {
              'md:!ps-20 !ps-0': displayMiniSidebar
            }
          )}
        >
          <Navbar />
          <div className="p-4 md:p-8 overflow-y-auto h-full">{children}</div>
        </div>
      </div>
      <AdminFooter />
    </main>
  );
};
export default AppLayout;
