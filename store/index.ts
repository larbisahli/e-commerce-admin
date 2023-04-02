import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import FilesReducer from '@store/files';
import SettingsReducer from '@store/settings';
import TableReducer from '@store/table';
import UIReducer from '@store/ui';
import UserReducer from '@store/user';
import { PRODUCTION_ENV } from '@utils/utils';

export function makeStore() {
  return configureStore({
    reducer: {
      settings: SettingsReducer,
      userInfo: UserReducer,
      files: FilesReducer,
      tables: TableReducer,
      ui: UIReducer
    },
    devTools: !PRODUCTION_ENV
  });
}

const store = makeStore();

export type AppState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action<string>
>;

export default store;
