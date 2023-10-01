import AdminFooter from '@components/common/admin-footer';
import SublevelNavigation from '@components/navigation/sublevel-navigation';
import { useAppDispatch } from '@hooks/useGetUser';
import { useSettings } from '@hooks/useSettings';
import { useUI } from '@hooks/useUI';
import { fetchStoreSettings, setCurrentLanguage } from '@store/settings';
import cn from 'classnames';
import React, { useEffect, useMemo } from 'react';

import { Navbar, Sidebar, SidebarMini } from '../navigation/index';
import MobileNavigation from '../navigation/mobile-navigation';

type Props = {
  children: React.ReactNode;
};

const AppLayout: React.FC = ({ children }: Props) => {
  const {
    ui: { displayMiniSidebar }
  } = useUI();

  const dispatch = useAppDispatch();

  const { languages = [] } = useSettings();

  // Fetch store settings
  useEffect(() => {
    dispatch(fetchStoreSettings());
  }, [dispatch]);

  const systemLanguage = useMemo(
    () => languages?.find((lang) => lang.isSystem),
    [languages]
  );

  useEffect(() => {
    dispatch(setCurrentLanguage({ language: systemLanguage }));
  }, [systemLanguage, dispatch]);

  return (
    <main className="flex h-fit min-h-screen flex-col bg-gray-100 transition-colors duration-150">
      <MobileNavigation />
      <SublevelNavigation />
      <div className="flex flex-1 pt-5 pb-16">
        <SidebarMini />
        <Sidebar />
        <div
          className={cn(
            'nlg:ps-20 nxl:ps-20 pt-20 md:ps-20 lg:ps-64 xl:ps-64',
            'h-full w-full',
            {
              '!ps-0 md:!ps-20': displayMiniSidebar
            }
          )}
        >
          <Navbar />
          <div className="h-full overflow-y-auto p-4 md:p-8">{children}</div>
        </div>
      </div>
      <AdminFooter />
    </main>
  );
};
export default AppLayout;
