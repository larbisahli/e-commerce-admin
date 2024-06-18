import { useMutation } from '@apollo/client';
import { AddSectionIcon } from '@components/icons/builder/add-section';
import { FooterIcon } from '@components/icons/builder/footer';
import { GrabIcon } from '@components/icons/builder/grab';
import { HeaderIcon } from '@components/icons/builder/header';
import { NewPageIcon } from '@components/icons/builder/new-page';
import { PageSettingsIcon } from '@components/icons/builder/page-settings';
import * as IconModules from '@components/icons/builder/sections';
import { Eye } from '@components/icons/eye-icon';
import { EyeOff } from '@components/icons/eye-off-icon';
import Trash from '@components/icons/trash';
import Accordion from '@components/ui/accordion';
import Loader from '@components/ui/loader/loader';
import { useModalAction } from '@components/ui/modal/modal.context';
import Select from '@components/ui/select/select';
import {
  STORE_LAYOUTS_COMPONENTS,
  UPDATE_LAYOUT_COMPONENT_VISIBILITY,
  UPDATE_LAYOUT_COMPONENTS_POSITION
} from '@graphql/content';
import { useErrorLogger } from '@hooks/useErrorLogger';
import { useGetClient } from '@hooks/useGetClient';
import { useUI } from '@hooks/useUI';
import { notify } from '@lib/notify';
import {
  ADD_SECTION_MODAL,
  CMS_BUILDER_MODAL,
  DELETE_COMPONENT,
  NEW_PAGE_MODAL
} from '@ts-types/constants';
import { ModuleGroups, StoreBuilder, StoreLayoutNames } from '@ts-types/enums';
import { ROUTES } from '@utils/routes';
import { getBuilderSrc } from '@utils/utils';
import classNames from 'classnames';
import { clone, isEmpty, sortBy } from 'lodash';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import React, { useEffect, useMemo, useState } from 'react';

import { moduleNameMap } from './cms-editor/add-section/helpers/data/section-data';
import LayoutSectionLoader from './cms-editor/add-section/helpers/LayoutSectionLoader';

const CustomOption = ({ innerProps, data }) => {
  const layoutName = data?.name;
  return (
    <Link
      href={{
        pathname: `${ROUTES.BUILDER_LAYOUT}/[layoutName]`,
        query: { layoutName }
      }}
    >
      <div
        {...innerProps}
        className={classNames(
          'z-50 flex cursor-pointer items-center p-2 px-4 hover:bg-gray-100',
          { 'border-t py-3': data?.name === 'CUSTOM' }
        )}
      >
        <span className="text-sm font-normal capitalize">{data?.title}</span>
      </div>
    </Link>
  );
};

export default function LayoutNavigation({
  storeLayoutComponents,
  storeLayoutCommonComponents,
  loading,
  storeLayouts
}) {
  const { t } = useTranslation();
  const { query } = useRouter();
  const layoutName = query.layoutName as string;

  const isCategoryPage = layoutName === StoreLayoutNames.CATEGORY;
  const isCartPage = layoutName === StoreLayoutNames.CART;
  const isCheckoutPage = layoutName === StoreLayoutNames.CHECKOUT;
  const isProductPage = layoutName === StoreLayoutNames.PRODUCT;

  const { openModal } = useModalAction();

  const [selectedPage, setSelectedPage] = useState({
    name: StoreLayoutNames.HOMEPAGE,
    title: 'Home page',
    isCustom: false
  });

  const [layoutBlocks, setLayoutBlocks] = useState([]);
  const [draggedItemId, setDraggedItemId] = useState(null);

  const [error, setError] = useState(null);

  const { userInfo } = useGetClient();

  const { updateBuilderInfo } = useUI();

  const csrfToken = userInfo?.csrfToken;
  const alias = userInfo?.store?.alias;

  const [updateLayoutComponentVisibility, { loading: visibilityLoading }] =
    useMutation(UPDATE_LAYOUT_COMPONENT_VISIBILITY, {
      context: {
        headers: {
          'x-csrf-token': csrfToken
        }
      },
      refetchQueries: [STORE_LAYOUTS_COMPONENTS, 'StoreLayoutComponents'],
      onCompleted: (data: { updateLayoutComponentVisibility: any }) => {
        if (!isEmpty(data.updateLayoutComponentVisibility)) {
          updateBuilderInfo({ isReloadIframe: true });
          notify(t('common:successfully-updated'), 'success', {
            position: 'top-center',
            autoClose: 1000
          });
        }
      }
    });

  const [updateLayoutComponentsPosition, { loading: positionLoading }] =
    useMutation(UPDATE_LAYOUT_COMPONENTS_POSITION, {
      context: {
        headers: {
          'x-csrf-token': csrfToken
        }
      },
      refetchQueries: [STORE_LAYOUTS_COMPONENTS, 'StoreLayoutComponents'],
      onCompleted: (data: {
        updateLayoutComponentsPosition: { success: boolean };
      }) => {
        if (data.updateLayoutComponentsPosition.success) {
          updateBuilderInfo({ isReloadIframe: true });
          notify(t('common:successfully-updated'), 'success', {
            position: 'top-center',
            autoClose: 1000
          });
        }
      }
    });

  useErrorLogger(error);

  useEffect(() => {
    if (layoutName) {
      const value = storeLayouts?.find((layout) => layout.name === layoutName);
      setSelectedPage(value);
    }
  }, [layoutName, storeLayouts]);

  useEffect(() => {
    const blocks = clone(storeLayoutComponents);
    const sortedBlocks = sortBy(blocks.sort(), [
      function (o) {
        return o.position;
      }
    ]);
    setLayoutBlocks(sortedBlocks);
  }, [storeLayoutComponents]);

  const handleVisibility = (id) => {
    updateLayoutComponentVisibility({
      variables: { componentId: id }
    }).catch((err) => {
      setError(err);
    });
  };

  const handleDragStart = (e, componentId) => {
    e.dataTransfer.setData('id', componentId);
    setDraggedItemId(componentId);
  };

  const handleDragOver = (e, componentId) => {
    e.preventDefault();
    const draggedOverItem = layoutBlocks.find(
      (task) => task.componentId === componentId
    );
    if (draggedItemId === draggedOverItem?.componentId) {
      return;
    }
    let blocks = layoutBlocks.filter(
      (task) => task.componentId !== draggedItemId
    );
    let index = layoutBlocks
      .map((x) => x.componentId)
      .indexOf(draggedOverItem.componentId);
    blocks.splice(
      index,
      0,
      layoutBlocks.find((task) => task.componentId === draggedItemId)
    );
    setLayoutBlocks(blocks);
  };

  const handleDragEnd = () => {
    setDraggedItemId(null);
    const components = layoutBlocks?.map((x, idx) => ({
      componentId: x.componentId,
      position: idx
    }));
    updateLayoutComponentsPosition({
      variables: { components }
    }).catch((err) => {
      setError(err);
    });
  };

  const handleClick = (block: any) => {
    openModal(CMS_BUILDER_MODAL, null, {
      closeOnClickOutside: false,
      ...block
    });
  };

  const handleKeyDown = (e, block: any) => {
    e.preventDefault();
    if (e.key === 'Enter') {
      handleClick(block);
    }
  };

  const handleStoreComponentSelect = (block: {
    moduleName: string;
    componentId: string;
  }) => {
    // @ts-ignore
    var iframeWin = document.getElementById('storefront-iframe').contentWindow;
    iframeWin.postMessage(
      {
        source: StoreBuilder.GALA_CMS_BUILDER,
        moduleName: block?.moduleName,
        componentId: block?.componentId
      },
      getBuilderSrc(alias)
    );
  };

  const handleStoreLayoutSelect = (layout) => {
    setSelectedPage(layout);
    let layoutName = layout.name;
    let iframeSrc = layout?.isCustom
      ? getBuilderSrc(alias, `pages/${layoutName}`)
      : getBuilderSrc(alias, layoutName);
    if (layout.name === StoreLayoutNames.CATEGORY) {
      iframeSrc = getBuilderSrc(
        alias,
        'category/edb2cd3b74c999af70f0b7054990f2072dc6e10a847af6ed05954b8994b730fe'
      );
    }
    if (layout.name === StoreLayoutNames.PRODUCT) {
      iframeSrc = getBuilderSrc(
        alias,
        'product/a8792157cb4f27fb949c035f45518c61e884bb86e6f420204379c2baa8beb66e'
      );
    }
    updateBuilderInfo({ isReloadIframe: true, iframeSrc });
  };

  const handleHover = (block: any) => {
    handleStoreComponentSelect(block);
  };

  const handleHoverOut = () => {
    handleStoreComponentSelect(null);
  };

  const headerComponent = useMemo(
    () =>
      storeLayoutCommonComponents?.find(
        (component) => component?.moduleGroup === ModuleGroups.HEADER
      ),
    [storeLayoutCommonComponents]
  );
  const footerComponent = useMemo(
    () =>
      storeLayoutCommonComponents?.find(
        (component) => component?.moduleGroup === ModuleGroups.FOOTER
      ),
    [storeLayoutCommonComponents]
  );
  const commonComponent = useMemo(
    () =>
      storeLayoutCommonComponents?.filter(
        (component) =>
          component?.moduleGroup !== ModuleGroups.FOOTER &&
          component?.moduleGroup !== ModuleGroups.HEADER
      ),
    [storeLayoutCommonComponents]
  );

  const isLoading =
    (isEmpty(layoutBlocks) && loading) ||
    loading ||
    positionLoading ||
    visibilityLoading;

  const renderLayouts = () => {
    if (isCategoryPage || isCartPage || isCheckoutPage || isProductPage)
      return null;
    return (
      <div className={classNames(isLoading && 'blur-[2px]')}>
        {/* HEADER */}
        <div
          role="button"
          tabIndex={0}
          onKeyDown={(e) => handleKeyDown(e, headerComponent)}
          onClick={() => handleClick(headerComponent)}
          className="mx-2 flex cursor-pointer items-center rounded-sm px-3 py-4 hover:bg-gray-200"
        >
          <div className="mr-2">
            <HeaderIcon />
          </div>
          <div className="text-gray-700">Header</div>
        </div>
        {/* MAIN */}
        <div className="mx-auto my-2 h-[1px] w-[90%] bg-gray-300"></div>
        <div className="mx-2">
          {isLoading && <LayoutSectionLoader />}
          {layoutBlocks?.map((block) => {
            const Icon = IconModules[block.moduleGroup];
            return (
              // eslint-disable-next-line jsx-a11y/mouse-events-have-key-events
              <div
                role="button"
                tabIndex={0}
                onKeyDown={(e) => handleKeyDown(e, block)}
                onClick={() => handleClick(block)}
                onMouseOver={() => handleHover(block)}
                onMouseOut={handleHoverOut}
                key={block.componentId}
                draggable
                onDragStart={(e) => handleDragStart(e, block.componentId)}
                onDragOver={(e) => handleDragOver(e, block.componentId)}
                onDragEnd={handleDragEnd}
                className={classNames(
                  'group flex cursor-pointer items-center rounded-sm py-4 pl-3 pr-1 text-gray-700 hover:bg-gray-100',
                  { 'opacity-50': block.componentId === draggedItemId }
                )}
              >
                <div className="mr-2 w-6">
                  {Icon && <Icon width={20} height={20} />}
                </div>
                <div className="cut-line-1 flex-1 text-base">
                  {moduleNameMap[block.moduleGroup]}
                </div>
                <div className="flex h-7">
                  <button
                    onClick={(e) => {
                      if (e && e.stopPropagation) e.stopPropagation();
                      openModal(DELETE_COMPONENT, block.componentId, {});
                    }}
                    className="mx-1 hidden h-7 w-7 items-center justify-center rounded-sm border border-gray-300 bg-white text-base text-gray-500 transition duration-200 hover:text-red-600 hover:shadow-xl group-hover:flex"
                  >
                    <Trash width={16} height={16} />
                  </button>
                  <button
                    onClick={(e) => {
                      if (e && e.stopPropagation) e.stopPropagation();
                      handleVisibility(block.componentId);
                    }}
                    className={classNames(
                      'mr-1 h-7 w-7 items-center justify-center rounded-sm border border-gray-300 bg-white text-base text-gray-500 transition duration-200 hover:text-blue-600 hover:shadow-xl',
                      {
                        'hidden group-hover:flex': block.isVisible,
                        'flex text-blue-400': !block.isVisible
                      }
                    )}
                  >
                    {block.isVisible ? (
                      <Eye width={20} height={20} />
                    ) : (
                      <EyeOff width={20} height={20} />
                    )}
                  </button>
                  <button
                    onClick={(e) => {
                      if (e && e.stopPropagation) e.stopPropagation();
                    }}
                    className="hidden cursor-grab group-hover:block"
                  >
                    <GrabIcon width={20} height={20} />
                  </button>
                </div>
              </div>
            );
          })}
          <button
            onClick={() => {
              openModal(ADD_SECTION_MODAL, null, {
                layoutBlocks,
                layoutName
              });
            }}
            className="flex w-full cursor-pointer items-center rounded-sm px-3 py-4 hover:bg-gray-200"
          >
            <div className="mr-2 w-6 text-blue-700">
              <AddSectionIcon width={18} height={18} />
            </div>
            <div className="text-blue-700">Add section</div>
          </button>
        </div>
        <div className="mx-auto my-2 h-[1px] w-[90%] bg-gray-300"></div>
        {/* FOOTER */}
        <div
          role="button"
          tabIndex={0}
          onKeyDown={(e) => handleKeyDown(e, footerComponent)}
          onClick={() => handleClick(footerComponent)}
          className="mx-2 flex cursor-pointer items-center rounded-sm px-3 py-4 hover:bg-gray-200"
        >
          <div className="mr-2">
            <FooterIcon />
          </div>
          <div className="text-gray-700">Footer</div>
        </div>
        <div className="mx-auto my-2 h-[1px] w-[90%] bg-gray-200"></div>
        {/* COMMON */}
        <div className="mx-5">
          <Accordion
            Title={() => (
              <h3 className="text-sm text-gray-500">Common Components</h3>
            )}
          >
            {commonComponent?.map((block) => {
              const Icon = IconModules[block.moduleGroup];
              return (
                <div
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => handleKeyDown(e, block)}
                  onClick={() => handleClick(block)}
                  key={block.componentId}
                  className={classNames(
                    'group flex cursor-pointer items-center rounded-sm py-4 text-gray-700 hover:bg-gray-100',
                    { 'opacity-50': block.componentId === draggedItemId }
                  )}
                >
                  <div className="mr-2 w-6">
                    {Icon && <Icon width={20} height={20} />}
                  </div>
                  <div className="cut-line-1 flex-1 text-base">
                    {moduleNameMap[block.moduleGroup]}
                  </div>
                </div>
              );
            })}
          </Accordion>
        </div>
      </div>
    );
  };

  return (
    <div>
      <div className="z-50 mx-4 mt-5 mb-1 pb-3">
        <Select
          options={storeLayouts}
          value={selectedPage}
          name="page"
          getOptionLabel={(option: any) => `Page: ${option.title}`}
          getOptionValue={(option: any) => option.name}
          onChange={handleStoreLayoutSelect}
          components={{ Option: CustomOption }}
          className="z-50"
        />
        <button
          className={classNames(
            'group z-50 flex cursor-pointer items-center pt-2 hover:text-blue-700'
          )}
          onClick={() => {
            openModal(NEW_PAGE_MODAL, null, {});
          }}
        >
          <NewPageIcon width={18} height={18} />
          <span className="px-2 text-sm font-normal text-gray-600 group-hover:text-gray-900">
            Create New Page
          </span>
        </button>
        <button
          className={classNames(
            'group z-50 hidden cursor-pointer items-center py-1 hover:text-blue-700',
            selectedPage?.isCustom && '!flex'
          )}
          onClick={() => {
            openModal(NEW_PAGE_MODAL, null, { layout: selectedPage });
          }}
        >
          <PageSettingsIcon width={18} height={18} />
          <span className="px-2 text-sm font-normal text-gray-600 group-hover:text-gray-900">
            Page Settings
          </span>
        </button>
      </div>
      <div className="relative min-h-[300px]">
        {isLoading && (
          <div className="absolute top-0 right-0 left-0 bottom-0 z-30 flex items-center justify-center">
            <Loader special />
          </div>
        )}
        {renderLayouts()}
      </div>
    </div>
  );
}
