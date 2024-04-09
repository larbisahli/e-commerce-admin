import Navbar from '@components/store-builder/navbar';
import Sidebar from '@components/store-builder/sidebar';
import { useAppDispatch } from '@hooks/useGetUser';
import { useSettings } from '@hooks/useSettings';
import { fetchStoreSettings, setCurrentLanguage } from '@store/settings';
import cn from 'classnames';
import dynamic from 'next/dynamic';
import React, { useEffect, useMemo } from 'react';

const StoreViewComponents = dynamic(
  () => import('@components/store-builder/StoreView'),
  {
    ssr: true
  }
);

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
      <div className=" fixed top-0 left-0 right-0 z-[9999] flex items-center justify-center bg-blue-700 px-2 py-5 text-center lg:hidden">
        <div className="font-semibold text-white">
          We recommend using desktop for a full Dropgala experience.
        </div>
      </div>
      <div className="flex flex-1">
        <Sidebar>{children}</Sidebar>
        <div className={cn('nxl:ps-20 lg:pl-[350px]', 'h-full w-full')}>
          <Navbar />
          <div className="h-full pl-6 pr-4 pb-4 pt-[66px]">
            <StoreViewComponents />
          </div>
        </div>
      </div>
    </main>
  );
};
export default AppLayout;
