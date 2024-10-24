import { EditorAddIcon } from '@components/icons/builder/add-icon';
import { EditorDeleteIcon } from '@components/icons/builder/delete-icon';
import { EditorDuplicateIcon } from '@components/icons/builder/duplicate-icon';
import { EditorEditIcon } from '@components/icons/builder/edit-icon';
import { EditorLibraryIcon } from '@components/icons/builder/library-icon';
import Loader from '@components/ui/loader/loader';
import {
  useModalAction,
  useModalState
} from '@components/ui/modal/modal.context';
import { useGetClient } from '@hooks/useGetClient';
import { useSettings } from '@hooks/useSettings';
import { useUI } from '@hooks/useUI';
import {
  ADD_SECTION_MODAL,
  CMS_BUILDER_MODAL,
  DELETE_COMPONENT,
  LIBRARY_SECTION_MODAL
} from '@ts-types/constants';
import { DEVICE_VIEWS, StoreBuilderActions } from '@ts-types/enums';
import { getBuilderSrc } from '@utils/utils';
import cn from 'classnames';
import React, { useEffect, useRef, useState } from 'react';
import { Tooltip } from 'react-tooltip';

export default function StoreViewComponents() {
  const [overlayHoverStyle, setOverlayHoverStyle] = useState<any>({
    display: 'none'
  });
  const [overlayClickStyle, setOverlayClickStyle] = useState<any>({
    display: 'none'
  });
  const [cachedModalData, setCachedModalData] = useState<any>(null);
  const [builderSrc, setBuilderSrc] = useState<any>(null);

  const iframeRef = useRef(null);
  const modal = useModalState();

  const { maintenancePassword, maintenanceMode } = useSettings();

  useEffect(() => {
    if (maintenanceMode) {
      setBuilderSrc(getBuilderSrc(alias, null, maintenancePassword));
    }
  }, [maintenanceMode]);

  const {
    ui: {
      builder: { deviceView, isReloadIframe, iframeSrc, iframeLoading },
      modalData
    },
    updateBuilderInfo,
    setModalData
  } = useUI();

  const { userInfo } = useGetClient();
  const { openModal } = useModalAction();

  const alias = userInfo?.store?.alias;

  const reload = () => {
    updateBuilderInfo({ iframeLoading: true });
    let src = getBuilderSrc(alias);
    if (iframeSrc) {
      src = iframeSrc;
    }
    iframeRef.current.contentWindow.location.href = src;
    updateBuilderInfo({ isReloadIframe: false });
  };

  useEffect(() => {
    if (isReloadIframe) {
      reload();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isReloadIframe]);

  function handleElementOverflowingIframe(element) {
    if (!element) return {};
    const iframe = document.getElementById('storefront-iframe');
    const iframeRect = iframe.getBoundingClientRect(); // iframe boundary relative to the viewport
    const elementRect = element.getBoundingClientRect(); // div boundary relative to the viewport
    // Compare element's boundaries with iframe's content area
    const isOverflowing = {
      top: elementRect.top < iframeRect.top,
      left: elementRect.left < iframeRect.left,
      bottom: elementRect.bottom > iframeRect.bottom,
      right: elementRect.right > iframeRect.right
    };
    if (isOverflowing.top) {
      element.classList.add('!top-[0]');
    } else {
      element.classList.remove('!top-[0]');
    }
    if (isOverflowing.bottom) {
      element.classList.add('!bottom-[0]');
    } else {
      element.classList.remove('!bottom-[0]');
    }
    console.log({ isOverflowing, element, elementRect, iframeRect });
    return isOverflowing;
  }

  useEffect(() => {
    const rect = modalData?.rect;
    const isHover = modalData?.isHover;
    const isClick = modalData?.isClick;
    if (rect && isHover && modalData?.componentId) {
      setOverlayHoverStyle({
        position: 'absolute',
        top: `${rect.top + window.scrollY}px`,
        left: `${rect.left + window.scrollX}px`,
        width: `${rect.width}px`,
        height: `${rect.height}px`,
        border: '2px dashed rgb(24, 160, 223)',
        borderRadius: '2px',
        pointerEvents: 'none',
        zIndex: 1000,
        display: 'block'
      });
    } else if (rect && isClick && modalData?.componentId) {
      setOverlayClickStyle({
        position: 'absolute',
        top: `${rect.top + window.scrollY}px`,
        left: `${rect.left + window.scrollX}px`,
        width: `${rect.width}px`,
        height: `${rect.height}px`,
        border: '1px solid rgb(24, 160, 223)',
        backgroundColor: 'rgba(24, 160, 223, 0.1411764706)',
        borderRadius: '2px',
        pointerEvents: 'none',
        zIndex: 1000,
        display: 'block'
      });
      setCachedModalData(modalData);
      setOverlayHoverStyle({ display: 'none' });
      const editElement = document.getElementById('builder-edit-btn');
      handleElementOverflowingIframe(editElement);
      const deleteElement = document.getElementById('builder-delete-btn');
      handleElementOverflowingIframe(deleteElement);
      const addBeforeElement = document.getElementById(
        'builder-add-before-btn'
      );
      handleElementOverflowingIframe(addBeforeElement);
      const addAfterElement = document.getElementById('builder-add-after-btn');
      handleElementOverflowingIframe(addAfterElement);
      const addDuplicateElement = document.getElementById(
        'builder-add-duplicate-btn'
      );
      handleElementOverflowingIframe(addDuplicateElement);
    } else if (
      isHover &&
      !modalData?.componentId &&
      overlayClickStyle.position
    ) {
      setOverlayHoverStyle({ display: 'none' });
    } else {
      setOverlayHoverStyle({ display: 'none' });
      setOverlayClickStyle({ display: 'none' });
      setCachedModalData(null);
    }
  }, [modalData, overlayClickStyle.position]);

  useEffect(() => {
    if (modal.meta?.componentId && !modal.isOpen) {
      setModalData({ data: null });
    }
  }, [modal]);

  const handleActionClick = (actionType) => {
    switch (actionType) {
      case StoreBuilderActions.EDIT_ACTION:
        openModal(CMS_BUILDER_MODAL, null, cachedModalData);
        break;
      case StoreBuilderActions.ADD_NEW_AFTER:
        openModal(ADD_SECTION_MODAL, null, {
          afterComponentId: cachedModalData.componentId,
          moduleName: cachedModalData.moduleName,
          position: cachedModalData.position,
          layoutName: cachedModalData.layoutName
        });
        break;
      case StoreBuilderActions.ADD_NEW_BEFORE:
        openModal(ADD_SECTION_MODAL, null, {
          beforeComponentId: cachedModalData.componentId,
          moduleName: cachedModalData.moduleName,
          position: cachedModalData.position,
          layoutName: cachedModalData.layoutName
        });
        break;
      case StoreBuilderActions.DELETE_ACTION:
        openModal(DELETE_COMPONENT, cachedModalData.componentId, {});
        break;
      case StoreBuilderActions.LIBRARY_ACTION:
        openModal(LIBRARY_SECTION_MODAL, null, {
          componentId: cachedModalData.componentId,
          moduleName: cachedModalData.moduleName,
          moduleGroup: cachedModalData.moduleGroup,
          layoutName: cachedModalData.layoutName
        });
        break;
      default:
        break;
    }
  };

  return (
    <div className="relative flex h-full items-center justify-center">
      <div
        className={cn('builder-container rounded-sm', {
          'builder-container--desktop': deviceView === DEVICE_VIEWS.DESKTOP,
          'builder-container--mobile': deviceView === DEVICE_VIEWS.MOBILE,
          'builder-container--tablet': deviceView === DEVICE_VIEWS.TABLET
        })}
      >
        <div
          id="builder-iframe-container"
          className="absolute top-0 left-0 z-10 h-full w-full overflow-auto"
        >
          {(!builderSrc || iframeLoading) && (
            <div className="flex h-full items-center justify-center">
              <Loader special />
            </div>
          )}
          {/* On Hover */}
          <div
            id="selector-hover"
            style={overlayHoverStyle ?? { display: 'none' }}
          ></div>
          {/* On Click */}
          <div id="selector-click" style={overlayClickStyle}>
            {cachedModalData?.isEdit && (
              <EditButton handleActionClick={handleActionClick} />
            )}
            {cachedModalData?.isDelete && (
              <RemoveButton handleActionClick={handleActionClick} />
            )}
            {cachedModalData?.isAddBefore && (
              <AddBeforeButton handleActionClick={handleActionClick} />
            )}
            {cachedModalData?.isAddAfter && (
              <AddAfterButton handleActionClick={handleActionClick} />
            )}
            {cachedModalData?.isDuplicate && (
              <DuplicateButton handleActionClick={handleActionClick} />
            )}
            {cachedModalData?.isLibrary && (
              <LibraryButton handleActionClick={handleActionClick} />
            )}
          </div>
          <iframe
            ref={iframeRef}
            title="Shop preview"
            src={builderSrc}
            width="100%"
            height="100%"
            className="w-fill h-full"
            onLoad={() => updateBuilderInfo({ iframeLoading: false })}
            id="storefront-iframe"
          ></iframe>
        </div>
      </div>
    </div>
  );
}

const EditButton = ({ handleActionClick }) => {
  return (
    <>
      <Tooltip id="edit-value-tooltip" className="custom-tooltip z-[2000]">
        <div className="flex flex-col items-center">
          <span className="max-w-[200px]">Edit Component</span>
        </div>
      </Tooltip>
      <button
        id="builder-edit-btn"
        data-tooltip-id="edit-value-tooltip"
        onClick={() => handleActionClick(StoreBuilderActions.EDIT_ACTION)}
        className="pointer-events-auto absolute top-[-25px] z-[1020] block"
      >
        <div className="flex h-6 w-6 items-center justify-center rounded-sm border border-white bg-[#1e83ff] text-white hover:bg-[#388ffb]">
          <EditorEditIcon width={16} height={16} />
        </div>
      </button>
    </>
  );
};

const RemoveButton = ({ handleActionClick }) => {
  return (
    <>
      <Tooltip id="delete-value-tooltip" className="custom-tooltip z-[2000]">
        <div className="flex flex-col items-center">
          <span className="max-w-[200px]">Delete Component</span>
        </div>
      </Tooltip>
      <button
        id="builder-delete-btn"
        data-tooltip-id="delete-value-tooltip"
        onClick={() => handleActionClick(StoreBuilderActions.DELETE_ACTION)}
        className="pointer-events-auto absolute right-0 top-[-25px] z-[1020] block"
      >
        <div className="flex h-6 w-6 items-center justify-center rounded-sm border border-white bg-[#1e83ff] text-white hover:bg-[#388ffb]">
          <EditorDeleteIcon width={16} height={16} />
        </div>
      </button>
    </>
  );
};
const AddBeforeButton = ({ handleActionClick }) => {
  return (
    <>
      <Tooltip
        id="add-before-value-tooltip"
        className="custom-tooltip z-[2000]"
      >
        <div className="flex flex-col items-center">
          <span className="max-w-[200px]">Add component above</span>
        </div>
      </Tooltip>
      <button
        id="builder-add-before-btn"
        data-tooltip-id="add-before-value-tooltip"
        onClick={() => handleActionClick(StoreBuilderActions.ADD_NEW_BEFORE)}
        className="pointer-events-auto absolute left-1/2 top-[-25px] z-[1020] block -translate-x-1/2 transform pb-2"
      >
        <div className="flex h-6 w-6 items-center justify-center rounded-sm border border-white bg-[#1e83ff] text-white hover:bg-[#388ffb]">
          <EditorAddIcon width={16} height={16} />
        </div>
      </button>
    </>
  );
};
const AddAfterButton = ({ handleActionClick }) => {
  return (
    <>
      <Tooltip id="add-after-value-tooltip" className="custom-tooltip z-[2000]">
        <div className="flex flex-col items-center">
          <span className="max-w-[200px]">Add component bellow</span>
        </div>
      </Tooltip>
      <button
        id="builder-add-after-btn"
        data-tooltip-id="add-after-value-tooltip"
        onClick={() => handleActionClick(StoreBuilderActions.ADD_NEW_AFTER)}
        className="pointer-events-auto absolute left-1/2 bottom-[-25px] z-[1020] block -translate-x-1/2 transform pt-2"
      >
        <div className="flex h-6 w-6 items-center justify-center rounded-sm border border-white bg-[#1e83ff] text-white hover:bg-[#388ffb]">
          <EditorAddIcon width={16} height={16} />
        </div>
      </button>
    </>
  );
};
const DuplicateButton = ({ handleActionClick }) => {
  return (
    <>
      <Tooltip id="duplicate-value-tooltip" className="custom-tooltip z-[2000]">
        <div className="flex flex-col items-center">
          <span className="max-w-[200px]">Duplicate component</span>
        </div>
      </Tooltip>
      <button
        id="builder-add-duplicate-btn"
        data-tooltip-id="duplicate-value-tooltip"
        onClick={() => handleActionClick(StoreBuilderActions.DUPLICATE_BLOCK)}
        className="pointer-events-auto absolute right-0 bottom-[-25px] z-[1020] block pt-2"
      >
        <div className="flex h-6 w-6 items-center justify-center rounded-sm border border-white bg-[#1e83ff] text-white hover:bg-[#388ffb]">
          <EditorDuplicateIcon width={16} height={16} />
        </div>
      </button>
    </>
  );
};
const LibraryButton = ({ handleActionClick }) => {
  return (
    <>
      <Tooltip id="library-value-tooltip" className="custom-tooltip z-[1050]">
        <div className="flex flex-col items-center">
          <span className="max-w-[200px]">Component library</span>
        </div>
      </Tooltip>
      <button
        id="builder-add-duplicate-btn"
        onClick={() => handleActionClick(StoreBuilderActions.LIBRARY_ACTION)}
        className="pointer-events-auto absolute top-[-25px] z-[1020] block"
        data-tooltip-id="library-value-tooltip"
      >
        <div className="flex h-6 w-6 items-center justify-center rounded-sm border border-white bg-[#1e83ff] text-white hover:bg-[#388ffb]">
          <EditorLibraryIcon width={16} height={16} />
        </div>
      </button>
    </>
  );
};
