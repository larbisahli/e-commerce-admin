import SublevelNavigation from '@components/navigation/sublevel-navigation';
import React from 'react';

import { Navbar, SidebarMini } from '../navigation/index';
import MobileNavigation from '../navigation/mobile-navigation';

type Props = {
  children: React.ReactNode;
};

const AppLayout: React.FC = ({ children }: Props) => {
  return (
    <div className="min-h-screen bg-gray-100 h-fit flex flex-col transition-colors duration-150">
      <MobileNavigation />
      <SublevelNavigation />
      <div className="flex flex-1 pt-5">
        <SidebarMini />
        <main className="w-full h-full md:ps-20 lg:ps-20 xl:ps-20">
          <Navbar />
          <div className="p-5 md:p-8 overflow-y-auto h-full">{children}</div>
        </main>
      </div>
    </div>
  );
};
export default AppLayout;
