import { STORE_CONFIG } from '@graphql/store';
import apolloClient from '@lib/apollo-client';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AppState } from '@store/index';
import {
  EtagGroupsType,
  LanguageType,
  SettingsType
} from '@ts-types/generated';

export interface SettingsState extends SettingsType {
  isLoading?: boolean;
  selectedLanguage?: LanguageType;
}

// Create the thunk
export const fetchStoreSettings = createAsyncThunk(
  'settings/fetchStoreSettings',
  async (args: { configEtag: EtagGroupsType['configEtag'] }) => {
    const { data } = await apolloClient.query<{
      getStoreAdminConfig: SettingsType;
      getStoreSubscription: any;
    }>({
      query: STORE_CONFIG,
      variables: {
        etag: args.configEtag
      },
      fetchPolicy: 'no-cache'
    });

    const { getStoreAdminConfig, getStoreSubscription } = data ?? {};

    return { ...getStoreAdminConfig, subscription: getStoreSubscription };
  }
);

const initialState: SettingsState = {
  languages: [],
  storeEmail: '',
  systemCurrency: {
    symbol: '$',
    name: 'US Dollar',
    symbol_native: '$',
    decimal_digits: 2,
    rounding: 0,
    code: 'USD',
    name_plural: 'US dollars'
  },
  isLoading: true,
  selectedLanguage: {} as LanguageType
};

export const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setCurrentLanguage: (
      state: SettingsState,
      { payload }: { payload: { language: LanguageType } }
    ) => {
      state.selectedLanguage = payload.language;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(
      fetchStoreSettings.pending,
      (state: SettingsState, { payload }) => {
        // both `state` and `action` are now correctly typed
        // based on the slice state and the `pending` action creator
        console.log('Store Setting pending :>', { payload });
        state.isLoading = true;
      }
    );
    builder.addCase(
      fetchStoreSettings.fulfilled,
      (state: SettingsState, { payload }) => {
        // state.entities[payload.id] = payload
        state.isLoading = false;
        state.systemCurrency = payload.systemCurrency;
        state.storeEmail = payload.storeEmail;
        state.languages = payload.languages;
        state.storeName = payload.storeName;
        state.storeEmail = payload.storeEmail;
        state.status = payload.status;
        state.published = payload.published;
        state.createdAt = payload.createdAt;
        state.subscription = payload.subscription;
        state.maintenanceMode = payload.maintenanceMode;
        state.maintenancePassword = payload.maintenancePassword;
      }
    );
    builder.addCase(
      fetchStoreSettings.rejected,
      (state: SettingsState, action) => {
        console.log('Store Setting rejected :>', action.payload);
        state.isLoading = false;
        if (action.payload) {
          // state.error = action.payload.errorMessage
        } else {
          // state.error = action.error
        }
      }
    );
  }
});

export const { setCurrentLanguage } = settingsSlice.actions;

export const settings = (state: AppState) => state.settings;

export default settingsSlice.reducer;
