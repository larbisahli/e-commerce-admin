import { useMutation } from '@apollo/client';
import { NoComponentIcon } from '@components/icons/builder/no-component';
import { CheckMark } from '@components/icons/checkmark';
import Loader from '@components/ui/loader/loader';
import { useModalAction } from '@components/ui/modal/modal.context';
import {
  STORE_LAYOUT_COMPONENT_CONTENT,
  STORE_LAYOUTS_COMPONENTS,
  UPDATE_LAYOUT_COMPONENT_MODULE_NAME
} from '@graphql/content';
import { useErrorLogger } from '@hooks/useErrorLogger';
import { useAppDispatch, useGetClient } from '@hooks/useGetClient';
import { useUI } from '@hooks/useUI';
import { notify } from '@lib/notify';
import { setEtag } from '@store/client';
import { LIBRARY_SECTION_MODAL } from '@ts-types/constants';
import { StoreLayoutComponentType } from '@ts-types/generated';
import cn from 'classnames';
import { isEmpty } from 'lodash';
import Image from 'next/image';
import { useTranslation } from 'next-i18next';
import { memo, useEffect, useState } from 'react';

import { componentsLibrary } from './data';

interface Props {
  moduleName: string;
  componentId: string;
  moduleGroup: string;
}

const ComponentsShowcase = ({
  moduleGroup,
  componentId,
  moduleName,
  ...props
}: Props) => {
  const { t } = useTranslation();

  const { closeModal } = useModalAction();

  const [selectedComponent, setSelectedComponent] = useState({
    moduleName: null
  });
  const [selectedLoadingModuleName, setSelectedLoadingModuleName] =
    useState(null);
  const [error, setError] = useState(null);

  const { updateBuilderInfo } = useUI();
  const dispatch = useAppDispatch();

  const { userInfo } = useGetClient();
  const csrfToken = userInfo?.csrfToken;

  const [updateComponentModuleName, { loading }] = useMutation(
    UPDATE_LAYOUT_COMPONENT_MODULE_NAME,
    {
      context: {
        headers: {
          'x-csrf-token': csrfToken
        }
      },
      onCompleted: (data: {
        updateComponentModuleName: StoreLayoutComponentType;
      }) => {
        if (!isEmpty(data.updateComponentModuleName)) {
          const { componentId, etag: newEtag } =
            data?.updateComponentModuleName ?? {};
          dispatch(setEtag({ etag: newEtag }));
          notify(t('common:successfully-updated'), 'success', {
            position: 'top-center',
            autoClose: 2000
          });
          setSelectedLoadingModuleName(null);
          setSelectedComponent(
            components.find(
              (c) => c.moduleName === data.updateComponentModuleName.moduleName
            )
          );
          closeModal(LIBRARY_SECTION_MODAL, null, { sectionId: componentId });
          updateBuilderInfo({ isReloadIframe: true });
        }
      },
      refetchQueries: [
        STORE_LAYOUTS_COMPONENTS,
        'StoreLayoutComponents',
        STORE_LAYOUT_COMPONENT_CONTENT,
        'StoreLayoutComponentContent'
      ]
    }
  );

  const components = componentsLibrary[moduleGroup];
  useErrorLogger(error);

  useEffect(() => {
    if (components) {
      setSelectedComponent(components.find((c) => c.moduleName === moduleName));
    }
  }, [components]);

  const handleClick = (component) => {
    setSelectedLoadingModuleName(component.moduleName);
    updateComponentModuleName({
      variables: {
        componentId,
        moduleName: component.moduleName
      }
    }).catch((err) => {
      setError(err);
      setSelectedLoadingModuleName(null);
    });
  };

  const renderEmpty = () => {
    if (isEmpty(components)) {
      return (
        <div className="flex h-full w-full items-center justify-center py-11">
          <div className="flex flex-col items-center justify-center">
            <div className="mb-3 flex h-20 w-20 items-center justify-center rounded-full bg-blue-100 text-blue-500">
              <NoComponentIcon height={45} width={45} />
            </div>
            <div className="text-lg font-medium">No components available</div>
            <p className="text-center text-sm text-gray-500">
              There is no components available for this module
            </p>
          </div>
        </div>
      );
    }
    return null;
  };

  const renderComponents = () => {
    if (isEmpty(components)) return null;
    return (
      <div className={cn('relative')}>
        <div className="relative w-full">
          <div className="h-full w-full">
            <div className="flex w-full flex-col">
              <div className="relative mb-8 grid w-full grid-cols-2 gap-4 pt-3">
                {components?.map((component) => {
                  return (
                    <div
                      key={component.moduleName}
                      className="relative my-4 flex flex-col border-b"
                    >
                      {loading &&
                        selectedLoadingModuleName === component.moduleName && (
                          <div className="absolute top-0 right-0 left-0 bottom-0 z-50 flex items-center justify-center">
                            <Loader special />
                          </div>
                        )}
                      <div className="mb-2 flex items-center font-medium text-gray-800 underline">
                        <span className="whitespace-nowrap">
                          {component.title}
                        </span>
                        {selectedComponent?.moduleName ===
                          component.moduleName && (
                          <div className="mx-2 flex h-[18px] w-[18px] items-center justify-center rounded-full border bg-green-600 text-white">
                            <CheckMark width={10} height={10} />
                          </div>
                        )}
                      </div>
                      <button
                        onClick={() => handleClick(component)}
                        className={cn(
                          'relative mb-5 h-[400px] cursor-pointer border border-gray-200 bg-white',
                          'group overflow-hidden rounded-md border-solid shadow transition-transform duration-500 ease-in-out me-2 hover:border-gray-300 hover:opacity-90',
                          selectedComponent?.moduleName ===
                            component.moduleName &&
                            '!border-2 !border-blue-500 shadow',
                          loading && 'blur-[2px]'
                        )}
                      >
                        <div className="">
                          <Image
                            alt="thumbnail"
                            src={component.thumbnail?.image}
                            objectFit="contain"
                            layout="fill"
                          />
                        </div>
                        {/* <ImageComponent
                          src={component.thumbnail?.image}
                          customPlaceholder={component.thumbnail?.placeholder}
                          width={500}
                          height={300}
                          objectFit="cover"
                        /> */}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="h-full w-full">
      {renderEmpty()}
      {renderComponents()}
    </div>
  );
};

export default memo(ComponentsShowcase);
