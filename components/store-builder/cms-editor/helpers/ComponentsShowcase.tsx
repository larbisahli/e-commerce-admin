import cn from 'classnames';
import Image from 'next/image';
import { useTranslation } from 'next-i18next';
import { memo, useEffect, useState } from 'react';
import { CheckMark } from '@components/icons/checkmark';
import { componentsThumbnail } from '../add-section/helpers/data/components-showcase-data';
import { useMutation } from '@apollo/client';
import { UPDATE_LAYOUT_COMPONENT_MODULE_NAME } from '@graphql/content';
import { useGetUser } from '@hooks/useGetUser';
import { StoreLayoutComponentType } from '@ts-types/generated';
import { isEmpty } from 'lodash';
import { notify } from '@lib/notify';
import Loader from '@components/ui/loader/loader';
import { useErrorLogger } from '@hooks/useErrorLogger';
import { NoComponentIcon } from '@components/icons/builder/no-component';

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
  const [error, setError] = useState(null);

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
        }
      }
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
            <p className="text-sm text-gray-500">
              There is no components available for this module
            </p>
          </div>
        </div>
      );
    }
    return null;
  };

  const renderPlugins = () => {
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
                    <div key={component.id} className="relative">
                      {loading &&
                        selectedLoadingModuleName === component.moduleName && (
                          <div className="absolute top-0 right-0 left-0 bottom-0 z-50 flex items-center justify-center">
                            <Loader special />
                          </div>
                        )}
                      <span className="mb-2 font-medium">
                        {component.title}
                      </span>
                      <button
                        onClick={() => handleClick(component)}
                        className={cn(
                          'relative mb-5 cursor-pointer rounded-sm border-2 border-dashed border-white transition-transform duration-500 ease-in-out me-2 hover:border-black hover:opacity-70 hover:shadow',
                          selectedComponent?.moduleName ===
                            component.moduleName && '!border-blue-500 shadow',
                          loading && 'blur-[2px]'
                        )}
                      >
                        {selectedComponent?.moduleName ===
                          component.moduleName && (
                          <div className="absolute top-0 right-0 rounded-bl-full border border-green-600 bg-green-500 p-1 pb-2 pl-2 text-white">
                            <CheckMark width={16} height={16} />
                          </div>
                        )}
                        <Image
                          alt=""
                          src={component.thumbnail}
                          width={500}
                          height={300}
                        />
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
      {renderPlugins()}
    </div>
  );
};

export default memo(ComponentsShowcase);
