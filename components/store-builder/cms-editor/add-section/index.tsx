import { useMutation } from '@apollo/client';
import Loader from '@components/ui/loader/loader';
import {
  useModalAction,
  useModalState
} from '@components/ui/modal/modal.context';
import {
  ADD_LAYOUT_COMPONENT,
  STORE_LAYOUTS_COMPONENTS
} from '@graphql/content';
import { useErrorLogger } from '@hooks/useErrorLogger';
import { useAppDispatch, useGetClient } from '@hooks/useGetClient';
import { useUI } from '@hooks/useUI';
import { notify } from '@lib/notify';
import { setEtag } from '@store/client';
import { ADD_SECTION_MODAL } from '@ts-types/constants';
import { LanguageType, StoreLayoutComponentType } from '@ts-types/generated';
import classNames from 'classnames';
import { isEmpty } from 'lodash';
import { useTranslation } from 'next-i18next';
import { memo, useState } from 'react';

import {
  sectionsLayout,
  sectionsOthers,
  sectionsShop
} from './helpers/data/section-data';

export interface OptionsVariable {
  componentId: string;
  language: LanguageType;
}
export interface TComponent {
  storeLayoutComponentContent: StoreLayoutComponentType;
}

const AddSectionModal = () => {
  const { t } = useTranslation();

  const { meta } = useModalState();
  const { closeModal } = useModalAction();

  const { updateBuilderInfo } = useUI();

  const [error, setError] = useState(null);

  const { userInfo } = useGetClient();
  const dispatch = useAppDispatch();
  const csrfToken = userInfo?.csrfToken;

  const [addLayoutComponent, { loading }] = useMutation(ADD_LAYOUT_COMPONENT, {
    context: {
      headers: {
        'x-csrf-token': csrfToken
      }
    },
    refetchQueries: [STORE_LAYOUTS_COMPONENTS, 'StoreLayoutComponents'],
    onCompleted: (data: { addLayoutComponent: any }) => {
      if (!isEmpty(data.addLayoutComponent)) {
        const { componentId, etag: newEtag } = data?.addLayoutComponent ?? {};
        dispatch(setEtag({ etag: newEtag }));
        closeModal(ADD_SECTION_MODAL, null, { componentId });
        updateBuilderInfo({ isReloadIframe: true });
        notify(t('common:successfully-added'), 'success', {
          position: 'top-center',
          autoClose: 1000
        });
      }
    }
  });

  useErrorLogger(error);

  const handleAddSection = (section) => {
    let position = 0;
    if (meta?.position >= 0) {
      if (meta?.afterComponentId) {
        position = meta?.position + 1;
      } else if (meta?.beforeComponentId) {
        position = meta?.position - 1;
      }
    } else {
      const max = Math.max(
        ...(meta?.layoutBlocks?.map((o) => o.position) ?? [])
      ) as number;
      position = max + 1;
    }

    if (position < 0) position = 0;

    addLayoutComponent({
      variables: {
        layoutName: meta.layoutName,
        moduleName: section.moduleName,
        beforeComponentId: meta?.beforeComponentId,
        afterComponentId: meta?.afterComponentId,
        data: section.data,
        styles: section.styles,
        children: section.children,
        position
      }
    }).catch((err) => {
      setError(err);
    });
  };

  return (
    <div className="relative flex h-[90vh] w-[95vw] flex-col overflow-hidden lg:w-[65vw]">
      <div className="border-b border-gray-200 bg-gray-100 p-4 text-lg font-semibold capitalize text-gray-800">
        Add section
      </div>
      {loading && (
        <div className="absolute top-0 right-0 left-0 bottom-0 z-40 flex items-center justify-center bg-white bg-opacity-10">
          <Loader special />
        </div>
      )}
      <div
        className={classNames(
          'w-full overflow-y-auto p-8',
          loading && 'blur-[2px]'
        )}
      >
        {/* LAYOUT */}
        <div className="">
          <h2 className="mb-3 font-semibold">Layout</h2>
          <div className="grid grid-cols-1 gap-x-12 border-b sm:grid-cols-2">
            {sectionsLayout?.map((section, idx) => {
              return (
                <div key={idx} className="flex items-center border-t py-5">
                  <div className="mr-4 flex h-[55px] w-[55px] items-center justify-center rounded-md border text-gray-800 shadow">
                    <div>{section.icon()}</div>
                  </div>
                  <div className="flex-1">
                    <span className="font-medium">{section.title}</span>
                    <p className="text-sm text-gray-500">
                      {section.description}
                    </p>
                  </div>
                  <button
                    onClick={() => handleAddSection(section)}
                    className="rounded-sm border bg-accent px-2 py-1 font-semibold text-white hover:bg-blue-800"
                  >
                    Add
                  </button>
                </div>
              );
            })}
          </div>
        </div>
        {/* SHOP */}
        <div className="mt-8">
          <h2 className="mb-3 font-semibold">Shop</h2>
          <div className="grid grid-cols-1 gap-x-12 border-b sm:grid-cols-2">
            {sectionsShop?.map((section, idx) => {
              return (
                <div
                  key={idx}
                  className="flex max-w-[390px] items-center border-t py-5"
                >
                  <div className="mr-4 flex h-[55px] w-[55px] items-center justify-center rounded-md border text-gray-800 shadow">
                    <div>{section.icon()}</div>
                  </div>
                  <div className="flex-1">
                    <span className="font-medium">{section.title}</span>
                    <p className="max-w-[98%] text-sm text-gray-500">
                      {section.description}
                    </p>
                  </div>
                  <button
                    onClick={() => handleAddSection(section)}
                    className="rounded-sm border bg-accent px-2 py-1 font-semibold text-white hover:bg-blue-800"
                  >
                    Add
                  </button>
                </div>
              );
            })}
          </div>
        </div>
        {/* OTHERS */}
        <div className="my-8">
          <h2 className="mb-3 font-semibold">Others</h2>
          <div className="grid grid-cols-1 gap-x-12 border-b sm:grid-cols-2">
            {sectionsOthers?.map((section, idx) => {
              return (
                <div
                  key={idx}
                  className="flex max-w-[390px] items-center border-y py-5"
                >
                  <div className="mr-4 flex h-[55px] w-[55px] items-center justify-center rounded-md border text-gray-800 shadow">
                    <div>{section.icon()}</div>
                  </div>
                  <div className="flex-1">
                    <span className="font-medium">{section.title}</span>
                    <p className="text-sm text-gray-500">
                      {section.description}
                    </p>
                  </div>
                  <button
                    onClick={() => handleAddSection(section)}
                    className="rounded-sm border bg-accent px-2 py-1 font-semibold text-white hover:bg-blue-800"
                  >
                    Add
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(AddSectionModal);
