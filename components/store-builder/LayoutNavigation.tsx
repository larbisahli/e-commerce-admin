import { useMutation } from '@apollo/client';
import { FooterIcon } from '@components/icons/builder/footer';
import { GrabIcon } from '@components/icons/builder/grab';
import { HeaderIcon } from '@components/icons/builder/header';
import * as IconModules from '@components/icons/builder/sections';
import { Eye } from '@components/icons/eye-icon';
import { EyeOff } from '@components/icons/eye-off-icon';
import { AddIcon } from '@components/icons/sidebar';
import { AddFillIcon } from '@components/icons/sidebar/addFillIcon';
import Trash from '@components/icons/trash';
import Loader from '@components/ui/loader/loader';
import { useModalAction } from '@components/ui/modal/modal.context';
import Select from '@components/ui/select/select';
import {
  STORE_LAYOUTS,
  UPDATE_LAYOUT_COMPONENT_VISIBILITY,
  UPDATE_LAYOUT_COMPONENTS_POSITION
} from '@graphql/content';
import { useErrorLogger } from '@hooks/useErrorLogger';
import { useGetUser } from '@hooks/useGetUser';
import { notify } from '@lib/notify';
import {
  ADD_SECTION_MODAL,
  CMS_BUILDER_MODAL,
  DELETE_COMPONENT
} from '@ts-types/constants';
import { StoreBuilder, StoreLayoutNames } from '@ts-types/enums';
import { ROUTES } from '@utils/routes';
import classNames from 'classnames';
import { clone, isEmpty, sortBy } from 'lodash';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import React, { useEffect, useState } from 'react';

import LayoutSectionLoader from './cms-editor/add-section/helpers/LayoutSectionLoader';
import { useUI } from '@hooks/useUI';
import { moduleNameMap } from './cms-editor/add-section/helpers/data/section-data';

const pages = [
  {
    id: StoreLayoutNames.HOMEPAGE,
    label: 'Home page'
  },
  {
    id: StoreLayoutNames.PRODUCT_PAGE,
    label: 'Product page'
  },
  {
    id: StoreLayoutNames.CONTACT,
    label: 'Contact'
  },
  {
    id: StoreLayoutNames.PRIVACY_POLICY,
    label: 'Privacy Policy'
  },
  {
    id: StoreLayoutNames.RETURN_FAQ,
    label: 'Return & FAQ'
  },
  {
    id: StoreLayoutNames.TERMS_OF_SERVICES,
    label: 'Terms of Services'
  },
  {
    id: 'CUSTOM',
    label: 'New Page'
  }
];

const CustomOption = ({ innerProps, data, isSelected }) => {
  return (
    <Link
      href={{
        pathname: `${ROUTES.BUILDER_LAYOUT}/[layoutName]`,
        query: { layoutName: data?.id }
      }}
    >
      <div
        {...innerProps}
        className={classNames(
          'z-50 flex cursor-pointer items-center p-2 px-4 hover:bg-gray-100',
          { 'border-t py-3': data?.id === 'CUSTOM' }
        )}
      >
        {data?.id === 'CUSTOM' && (
          <span className="mr-2 rounded-full bg-accent text-white">
            <AddIcon width={18} height={18} />
          </span>
        )}
        <span className="text-sm font-normal">{data?.label}</span>
      </div>
    </Link>
  );
};

export default function LayoutNavigation({
  storeLayoutComponents,
  loading,
  storeLayouts
}) {
  const { t } = useTranslation();
  const { query } = useRouter();
  const layoutName = query.layoutName as string;

  const { openModal } = useModalAction();

  const [selectedPage, setSelectedPage] = useState({
    id: StoreLayoutNames.HOMEPAGE,
    label: 'Home page'
  });
  const [layoutBlocks, setLayoutBlocks] = useState([]);
  const [draggedItemId, setDraggedItemId] = useState(null);

  const [error, setError] = useState(null);

  const { userInfo } = useGetUser();
  const { updateBuilderInfo } = useUI();

  const csrfToken = userInfo?.csrfToken;

  const [updateLayoutComponentVisibility, { loading: visibilityLoading }] =
    useMutation(UPDATE_LAYOUT_COMPONENT_VISIBILITY, {
      context: {
        headers: {
          'x-csrf-token': csrfToken
        }
      },
      refetchQueries: [STORE_LAYOUTS, 'StoreLayouts'],
      onCompleted: (data: { updateLayoutComponentVisibility: any }) => {
        if (!isEmpty(data.updateLayoutComponentVisibility)) {
          updateBuilderInfo({ isReloadStoreFront: true });
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
      refetchQueries: [STORE_LAYOUTS, 'StoreLayouts'],
      onCompleted: (data: {
        updateLayoutComponentsPosition: { success: boolean };
      }) => {
        if (data.updateLayoutComponentsPosition.success) {
          updateBuilderInfo({ isReloadStoreFront: true });
          notify(t('common:successfully-updated'), 'success', {
            position: 'top-center',
            autoClose: 1000
          });
        }
      }
    });

  useErrorLogger(error);

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
    var iframeWin = document.getElementById('storefront-iframe').contentWindow;
    iframeWin.postMessage(
      {
        source: StoreBuilder.GALA_CMS_BUILDER,
        moduleName: block?.moduleName,
        componentId: block?.componentId
      },
      'http://localhost:3000'
    );
  };

  const handleHover = (block: any) => {
    handleStoreComponentSelect(block);
  };

  const handleHoverOut = () => {
    handleStoreComponentSelect(null);
  };

  const isLoading =
    isEmpty(layoutBlocks) || loading || positionLoading || visibilityLoading;

  return (
    <div>
      <div className="z-50 my-5 px-5">
        <Select
          options={pages}
          value={selectedPage}
          name="page"
          getOptionLabel={(option: any) => `Page: ${option.label}`}
          getOptionValue={(option: any) => option.id}
          onChange={setSelectedPage}
          components={{ Option: CustomOption }}
          className="z-50"
        />
      </div>
      <div className="relative">
        {isLoading && (
          <div className="absolute top-0 right-0 left-0 bottom-0 z-30 flex items-center justify-center">
            <Loader special />
          </div>
        )}
        <div className={classNames(isLoading && 'blur-[2px]')}>
          {/* HEADER */}
          <div
            role="button"
            tabIndex={0}
            onKeyDown={(e) => handleKeyDown(e, { moduleName: 'Header' })}
            onClick={() => handleClick({ moduleName: 'Header' })}
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
            {isEmpty(layoutBlocks) && <LayoutSectionLoader />}
            {layoutBlocks?.map((block) => {
              const Icon = IconModules[block.moduleGroup];
              return (
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
                <AddFillIcon width={20} height={20} />
              </div>
              <div className="text-blue-700">Add section</div>
            </button>
          </div>
          <div className="mx-auto my-2 h-[1px] w-[90%] bg-gray-300"></div>
          {/* HEADER */}
          <div
            role="button"
            tabIndex={0}
            onKeyDown={(e) => handleKeyDown(e, { moduleName: 'Header' })}
            onClick={() => handleClick({ moduleName: 'Header' })}
            className="mx-2 flex cursor-pointer items-center rounded-sm px-3 py-4 hover:bg-gray-200"
          >
            <div className="mr-2">
              <FooterIcon />
            </div>
            <div className="text-gray-700">Footer</div>
          </div>
        </div>
      </div>
    </div>
  );
}
