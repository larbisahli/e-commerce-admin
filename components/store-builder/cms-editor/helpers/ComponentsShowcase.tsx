import { useMutation } from '@apollo/client';
import { NoComponentIcon } from '@components/icons/builder/no-component';
import { CheckMark } from '@components/icons/checkmark';
import Loader from '@components/ui/loader/loader';
import {
  STORE_LAYOUT_COMPONENT_CONTENT,
  STORE_LAYOUTS,
  UPDATE_LAYOUT_COMPONENT_MODULE_NAME
} from '@graphql/content';
import { useErrorLogger } from '@hooks/useErrorLogger';
import { useGetUser } from '@hooks/useGetUser';
import { useUI } from '@hooks/useUI';
import { notify } from '@lib/notify';
import { StoreLayoutComponentType } from '@ts-types/generated';
import cn from 'classnames';
import { isEmpty } from 'lodash';
import Image from 'next/image';
import { useTranslation } from 'next-i18next';
import { memo, useEffect, useState } from 'react';

import { componentsThumbnail } from '../add-section/helpers/data/components-showcase-data';

interface Props {
  moduleName: string;
  componentId: string;
  moduleGroup: string;
}

const ComponentsShowcase = ({
  componentId,
  moduleGroup,
  moduleName
}: Props) => {
  const { t } = useTranslation();

  const [selectedComponent, setSelectedComponent] = useState({
    moduleName: null
  });
  const [selectedLoadingModuleName, setSelectedLoadingModuleName] =
    useState(null);
  const [hoveredModuleName, setHoveredModuleName] = useState(null);
  const [error, setError] = useState(null);

  const { updateBuilderInfo } = useUI();

  const { userInfo } = useGetUser();
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
          updateBuilderInfo({ isReloadIframe: true });
        }
      },
      refetchQueries: [
        STORE_LAYOUTS,
        'StoreLayouts',
        STORE_LAYOUT_COMPONENT_CONTENT,
        'StoreLayoutComponentContent'
      ]
    }
  );

  const components = componentsThumbnail[moduleGroup];
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

  const onMouseEnterHandler = (moduleName: string) => {
    setHoveredModuleName(moduleName);
  };

  const onMouseLeaveHandler = () => {
    setHoveredModuleName(null);
  };

  const renderComponents = () => {
    if (isEmpty(components)) return null;
    return (
      <div className="relative">
        <h3 className="py-[18px] text-lg font-medium">Available Components</h3>
        <div className="relative">
          <div className="h-full">
            <div className="flex w-full flex-col">
              <div className="relative h-full w-full pt-3">
                {components?.map((component) => {
                  return (
                    <div
                      key={component.moduleName}
                      className="relative"
                      onMouseEnter={() =>
                        onMouseEnterHandler(component.moduleName)
                      }
                      onMouseLeave={onMouseLeaveHandler}
                    >
                      {component.moduleName === hoveredModuleName && (
                        <ShowCaseTool {...component} />
                      )}
                      {loading &&
                        selectedLoadingModuleName === component.moduleName && (
                          <div className="absolute top-0 right-0 left-0 bottom-0 z-50 flex items-center justify-center">
                            <Loader special />
                          </div>
                        )}
                      <div className="mb-2 flex items-center font-medium">
                        <span>{component.title}</span>
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
                          'relative mb-5 cursor-pointer border border-gray-200',
                          'group max-w-[410px] overflow-hidden rounded-md border-solid shadow transition-transform duration-500 ease-in-out me-2 hover:border-gray-300 hover:opacity-70',
                          selectedComponent?.moduleName ===
                            component.moduleName &&
                            '!border-2 !border-blue-500 shadow',
                          loading && 'blur-[2px]'
                        )}
                      >
                        <Image
                          alt="thumbnail"
                          className="rounded-md bg-gray-100 transition-all duration-300 group-hover:scale-110"
                          src={component.thumbnail?.image}
                          width={450}
                          height={300}
                        />
                        {/* <ImageComponent
                          src={component.thumbnail?.image}
                          customPlaceholder={component.thumbnail?.placeholder}
                          width={450}
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
    <div className="h-full">
      {renderEmpty()}
      {renderComponents()}
    </div>
  );
};

const ShowCaseTool = ({ title, thumbnail }) => {
  return (
    <div className="fixed top-[90px] left-[475px] z-50 rounded-md border bg-white p-3 shadow">
      <h3 className="pb-1 text-lg font-medium text-black">{title}</h3>
      <Image
        alt="thumbnail"
        src={thumbnail?.image}
        width={800}
        height={400}
        className="rounded-md border"
      />
    </div>
  );
};

export default memo(ComponentsShowcase);
