import AdminFooter from '@components/common/admin-footer';
import Navbar from '@components/store-builder/navbar';
import Sidebar from '@components/store-builder/sidebar';
import { useAppDispatch } from '@hooks/useGetUser';
import { useSettings } from '@hooks/useSettings';
import { useUI } from '@hooks/useUI';
import { fetchStoreSettings, setCurrentLanguage } from '@store/settings';
import cn from 'classnames';
import React, { useEffect, useMemo } from 'react';

type Props = {
  children: React.ReactNode;
};

const AppLayout: React.FC = ({ children }: Props) => {
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
    <main className="flex h-fit min-h-screen flex-col bg-white transition-colors duration-150">
      <div className="flex flex-1">
        <Sidebar />
        <div className={cn('nxl:ps-20 lg:ps-64 xl:ps-64', 'h-full w-full')}>
          <Navbar />
          <div className="h-full p-4 pt-[65px]">{children}</div>
        </div>
      </div>
    </main>
  );
};
export default AppLayout;
