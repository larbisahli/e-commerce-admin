import { createSlice } from '@reduxjs/toolkit';
import { AppState } from '@store/index';

export interface SettingsState {}

const initialState = {
  siteTitle: 'DropGala',
  siteSubtitle: '',
  currency: {
    symbol: '$',
    name: 'US Dollar',
    symbol_native: '$',
    decimal_digits: 2,
    rounding: 0,
    code: 'USD',
    name_plural: 'US dollars'
  },
  logo: {
    thumbnail: '/logo.svg',
    original: '/logo.svg'
  },
  seo: {}
};

export const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    updateValue: (state: any) => {
      return state;
    }
  }
});

export const { updateValue } = settingsSlice.actions;

export const settings = (state: AppState) => state.settings;

export default settingsSlice.reducer;
