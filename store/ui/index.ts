import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface State {
  displaySidebar: boolean;
  displaySublevelSidebar: boolean;
  SublevelSidebarId: string;
  displayModal: boolean;
  modalData: any;
  modalView: string;
}

const initialState = {
  displaySidebar: false,
  displaySublevelSidebar: false,
  SublevelSidebarId: null,
  displayModal: false,
  modalView: 'LOGIN_VIEW',
  modalData: null
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
      action: PayloadAction<{ display: boolean }>
    ) => {
      return {
        ...state,
        displaySidebar: action.payload.display
      };
    },
    toggleSidebar: (state: State) => {
      return {
        ...state,
        displaySidebar: !state.displaySidebar
      };
    },
    openSublevelSidebar: (
      state: State,
      action: PayloadAction<{ id: string }>
    ) => {
      return {
        ...state,
        displaySublevelSidebar: true,
        SublevelSidebarId: action.payload.id
      };
    },
    closeSublevelSidebar: (state: State) => {
      return {
        ...state,
        displaySublevelSidebar: false
      };
    },
    closeSidebarIfPresent: (state: State) => {
      if (!state.displaySidebar) return state;
      return {
        ...state,
        displaySidebar: false
      };
    },
    handleModal: (
      state: State,
      action: PayloadAction<{ display: boolean }>
    ) => {
      return {
        ...state,
        displayModal: action.payload.display
      };
    },
    setModalView: (
      state: State,
      action: PayloadAction<{ view: MODAL_VIEWS }>
    ) => {
      return {
        ...state,
        modalView: action.payload.view
      };
    },
    setModalData: (
      state: State,
      action: PayloadAction<{ data: MODAL_DATA }>
    ) => {
      return {
        ...state,
        modalData: action.payload.data
      };
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
  setModalData
} = UISlice.actions;

export default UISlice.reducer;
