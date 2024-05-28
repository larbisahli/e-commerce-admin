import { ArrowNext } from '@components/icons/arrow-next';
import { ArrowPrev } from '@components/icons/arrow-prev';
import { TwoArrowPrev } from '@components/icons/two-arrow';
import Navbar from '@components/store-builder/navbar';
import Sidebar from '@components/store-builder/sidebar';
import { useModalAction } from '@components/ui/modal/modal.context';
import { useAppDispatch } from '@hooks/useGetUser';
import { useSettings } from '@hooks/useSettings';
import { fetchStoreSettings, setCurrentLanguage } from '@store/settings';
import {
  ADD_SECTION_MODAL,
  CMS_BUILDER_MODAL,
  DELETE_COMPONENT
} from '@ts-types/constants';
import { StoreBuilder, StoreBuilderActions } from '@ts-types/enums';
import cn from 'classnames';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import React, { useEffect, useMemo, useRef, useState } from 'react';

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
  const layoutName = useRef(null);
  const { query } = useRouter();

  const dispatch = useAppDispatch();
  const { openModal } = useModalAction();
  const { languages = [] } = useSettings();
  const [showSlider, setShowSlider] = useState(true);

  const layoutNameQuery = query.layoutName as string;

  console.log({ query });

  // Fetch store settings
  useEffect(() => {
    layoutName.current = layoutNameQuery;
  }, [layoutNameQuery]);

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
            console.log('message ::>', data, layoutName.current);
            if (data.actionType === StoreBuilderActions.EDIT_ACTION) {
              openModal(CMS_BUILDER_MODAL, null, data);
            } else if (data.actionType === StoreBuilderActions.ADD_NEW_AFTER) {
              openModal(ADD_SECTION_MODAL, null, {
                afterComponentId: data.componentId,
                moduleName: data.moduleName,
                position: data.position,
                layoutName: layoutName.current
              });
            } else if (data.actionType === StoreBuilderActions.ADD_NEW_BEFORE) {
              openModal(ADD_SECTION_MODAL, null, {
                beforeComponentId: data.componentId,
                moduleName: data.moduleName,
                position: data.position,
                layoutName: layoutName.current
              });
            } else if (data.actionType === StoreBuilderActions.DELETE_ACTION) {
              openModal(DELETE_COMPONENT, data.componentId, {});
            }
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
        <Sidebar showSlider={showSlider} setShowSlider={setShowSlider}>
          {children}
        </Sidebar>
        {!showSlider && (
          <button
            onClick={() => setShowSlider((prev) => !prev)}
            className={cn(
              '!fixed top-0 left-0 z-[999] mt-[65px] ml-2 flex cursor-pointer justify-end border p-1 shadow hover:bg-gray-100',
              !showSlider && 'rotate-180'
            )}
          >
            <TwoArrowPrev width={18} height={18} />
          </button>
        )}
        <div
          className={cn(
            showSlider && 'lg:pl-[300px]',
            !showSlider && 'lg:pl-[30px]',
            'nxl:ps-20 h-full w-full'
          )}
        >
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
