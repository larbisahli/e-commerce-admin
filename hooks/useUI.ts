import {
  closeSidebarIfPresent,
  closeSublevelSidebar,
  handleModal,
  handleSidebar,
  MODAL_DATA,
  MODAL_VIEWS,
  openSublevelSidebar,
  setModalData,
  setModalView,
  toggleSidebar,
  updateBuilderInfo
} from '@store/ui';

import { useAppDispatch, useAppSelector } from './useGetUser';

export const useUI = () => {
  const ui = useAppSelector((state) => state.ui);
  const dispatch = useAppDispatch();
  return {
    ui,
    closeSidebarIfPresent: () => dispatch(closeSidebarIfPresent()),
    closeSublevelSidebar: () => dispatch(closeSublevelSidebar()),
    handleModal: ({ display }: { display: boolean }) =>
      dispatch(handleModal({ display })),
    handleSidebar: ({
      field,
      display
    }: {
      field: 'displayMiniSidebar' | 'displayMobileSidebar';
      display: boolean;
    }) => dispatch(handleSidebar({ field, display })),
    openSublevelSidebar: ({ id }: { id: string }) =>
      dispatch(openSublevelSidebar({ id })),
    setModalData: ({ data }: { data: MODAL_DATA }) =>
      dispatch(setModalData({ data })),
    setModalView: ({ view }: { view: MODAL_VIEWS }) =>
      dispatch(setModalView({ view })),
    toggleSidebar: ({ field }) => dispatch(toggleSidebar({ field })),
    updateBuilderInfo: (data) => dispatch(updateBuilderInfo(data))
  };
};
