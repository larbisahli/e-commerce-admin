import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppState } from '@store/index';
import isEmpty from 'lodash/isEmpty';

import { initialState } from './data';

interface TableColumns {
  [key: string]: { columns: string[] | [] };
}

const isObjectLiked = (value) =>
  value.constructor.name === 'Array' || value.constructor.name === 'Object';

const hydrate = (value) => {
  if (!isObjectLiked(value)) {
    return value;
  }
  return JSON.stringify(value);
};

export const TableSlice = createSlice({
  name: 'files',
  initialState: initialState as TableColumns,
  reducers: {
    appendColumn: (
      state: TableColumns,
      action: PayloadAction<{
        tableName: string;
        column: { label: string; key: string };
      }>
    ) => {
      const tableName = action.payload.tableName;
      const column = action.payload.column;
      const newState = {
        ...state,
        [tableName]: {
          columns: [...(state[tableName]?.columns ?? []), column?.key]
        }
      };
      window?.localStorage.setItem('@echo-tables', hydrate(newState));
      return newState;
    },
    removeColumn: (
      state: TableColumns,
      action: PayloadAction<{ tableName: string; id: string }>
    ) => {
      const tableName = action.payload.tableName;
      const id = action.payload.id;
      const newState = {
        ...state,
        [tableName]: {
          columns: [
            ...(state[tableName]?.columns?.filter(
              (columnKey) => columnKey !== id
            ) ?? [])
          ]
        }
      };
      window?.localStorage.setItem('@echo-tables', hydrate(newState));
      return newState;
    },
    resetColumn: (
      state: TableColumns,
      action: PayloadAction<{ tableName: string }>
    ) => {
      const tableName = action.payload.tableName;
      const { columns } = initialState[tableName];
      const newState = {
        ...state,
        [tableName]: {
          columns
        }
      };
      window?.localStorage.setItem('@echo-tables', hydrate(newState));
      return newState;
    },
    rehydrate: (state: TableColumns, action: PayloadAction<TableColumns>) => {
      console.log({ state });
      if (!isEmpty(action.payload)) {
        return (state = action.payload);
      }
      return state;
    }
  }
});

export const { appendColumn, removeColumn, resetColumn, rehydrate } =
  TableSlice.actions;

export const tables = (state: AppState) => state.tables;

export default TableSlice.reducer;
