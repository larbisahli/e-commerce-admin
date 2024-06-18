import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import ClientReducer from '@store/client';
import FilesReducer from '@store/files';
import SettingsReducer from '@store/settings';
import TableReducer from '@store/table';
import UIReducer from '@store/ui';
import { PRODUCTION_ENV } from '@utils/utils';

export function createStore() {
  return configureStore({
    reducer: {
      settings: SettingsReducer,
      client: ClientReducer,
      files: FilesReducer,
      tables: TableReducer,
      ui: UIReducer
    },
    devTools: !PRODUCTION_ENV
  });
}

const store = createStore();

export type AppStore = ReturnType<typeof createStore>;

export type AppState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action<string>
>;

export default store;
