import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface State {
  displayMobileSidebar: boolean;
  displayMiniSidebar: boolean;
  displaySublevelSidebar: boolean;
  SublevelSidebarId: string;
  displayModal: boolean;
  modalData: any;
  modalView: string;
  builder: {
    isMobileView: boolean;
  };
}

const initialState = {
  displayMobileSidebar: false,
  displayMiniSidebar: false,
  displaySublevelSidebar: false,
  SublevelSidebarId: null,
  displayModal: false,
  modalView: 'LOGIN_VIEW',
  modalData: null,
  builder: {
    isMobileView: false
  }
};

export type MODAL_VIEWS =
  | 'SIGNUP_VIEW'
  | 'LOGIN_VIEW'
  | 'FORGOT_VIEW'
  | 'DELETE_PRODUCT'
  | 'BAN_CUSTOMER';

export type MODAL_DATA = any;

export const UISlice = createSlice({
  name: 'UI',
  initialState: initialState,
  reducers: {
    handleSidebar: (
      state: State,
      action: PayloadAction<{
        field: 'displayMiniSidebar' | 'displayMobileSidebar';
        display: boolean;
      }>
    ) => {
      state[action.payload.field] = action.payload.display;
    },
    toggleSidebar: (
      state: State,
      action: PayloadAction<{
        field: 'displayMiniSidebar' | 'displayMobileSidebar';
      }>
    ) => {
      state[action.payload.field] = !state[action.payload.field];
    },
    openSublevelSidebar: (
      state: State,
      action: PayloadAction<{ id: string }>
    ) => {
      (state.displaySublevelSidebar = true),
        (state.SublevelSidebarId = action.payload.id);
    },
    closeSublevelSidebar: (state: State) => {
      state.displaySublevelSidebar = false;
    },
    closeSidebarIfPresent: (state: State) => {
      if (!state.displayMobileSidebar) return state;
      state.displayMobileSidebar = false;
    },
    handleModal: (
      state: State,
      action: PayloadAction<{ display: boolean }>
    ) => {
      state.displayModal = action.payload.display;
    },
    setModalView: (
      state: State,
      action: PayloadAction<{ view: MODAL_VIEWS }>
    ) => {
      state.modalView = action.payload.view;
    },
    setModalData: (
      state: State,
      action: PayloadAction<{ data: MODAL_DATA }>
    ) => {
      state.modalData = action.payload.data;
    },
    setBuilderDeviceView: (
      state: State,
      action: PayloadAction<{ isMobileView: boolean }>
    ) => {
      state.builder.isMobileView = action.payload.isMobileView;
    }
  }
});

export const {
  handleSidebar,
  openSublevelSidebar,
  closeSublevelSidebar,
  toggleSidebar,
  closeSidebarIfPresent,
  handleModal,
  setModalView,
  setModalData,
  setBuilderDeviceView
} = UISlice.actions;

export default UISlice.reducer;
