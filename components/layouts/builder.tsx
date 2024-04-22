import Navbar from '@components/store-builder/navbar';
import Sidebar from '@components/store-builder/sidebar';
import { useModalAction } from '@components/ui/modal/modal.context';
import { useAppDispatch } from '@hooks/useGetUser';
import { useSettings } from '@hooks/useSettings';
import { fetchStoreSettings, setCurrentLanguage } from '@store/settings';
import { CMS_BUILDER_MODAL } from '@ts-types/constants';
import { StoreBuilder } from '@ts-types/enums';
import cn from 'classnames';
import dynamic from 'next/dynamic';
import React, { useEffect, useMemo, useRef } from 'react';

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
  const initPostMessage = useRef(true);
  const dispatch = useAppDispatch();
  const { openModal } = useModalAction();
  const { languages = [] } = useSettings();

  // Fetch store settings
  useEffect(() => {
    dispatch(fetchStoreSettings());
  }, [dispatch]);

  const systemLanguage = useMemo(
    () => languages?.find((lang) => lang.isSystem),
    [languages]
  );

  /**
   * BUILDER EVENT LISTENER
   */
  useEffect(() => {
    // For some reason this renders twice
    if (initPostMessage.current) {
      initPostMessage.current = false;
      window.addEventListener(
        'message',
        function (e) {
          if (e.data?.source === StoreBuilder.GALA_CMS_BUILDER) {
            const data = e.data;
            console.log('message ::>', data);
            openModal(CMS_BUILDER_MODAL, data.moduleName, data);
          }
        },
        false
      );
    }
  }, []);

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
