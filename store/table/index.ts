import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppState } from '@store/index';
import { COLUMNS } from '@utils/data/table-columns';
import isEmpty from 'lodash/isEmpty';
import merge from 'lodash/merge';

var merged = (arr: any[]) => merge.apply(null, [{}].concat(arr));

const initialState = (): TableColumns => {
  return merged(
    Object.keys(COLUMNS)?.map((tableName) => {
      return {
        [tableName]: {
          columns: COLUMNS[tableName]?.map(({ key }) => key)
        }
      };
    })
  );
};

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
  name: 'tables',
  initialState: initialState(),
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
      state[tableName].columns = [
        ...(state[tableName]?.columns ?? []),
        column?.key
      ];
      window?.localStorage.setItem('@dropgala-tables', hydrate(state));
    },
    removeColumn: (
      state: TableColumns,
      action: PayloadAction<{ tableName: string; id: string }>
    ) => {
      const tableName = action.payload.tableName;
      const id = action.payload.id;
      state[tableName].columns =
        state[tableName]?.columns?.filter((columnKey) => columnKey !== id) ??
        [];
      window?.localStorage.setItem('@dropgala-tables', hydrate(state));
    },
    resetColumn: (
      state: TableColumns,
      action: PayloadAction<{ tableName: string }>
    ) => {
      const tableName = action.payload.tableName;
      const { columns } = initialState[tableName];
      state[tableName].columns = columns;
      window?.localStorage.setItem('@dropgala-tables', hydrate(state));
    },
    rehydrate: (state: TableColumns, action: PayloadAction<TableColumns>) => {
      console.log({ state });
      if (!isEmpty(action.payload)) {
        return action.payload;
      }
      return state;
    }
  }
});

export const { appendColumn, removeColumn, resetColumn, rehydrate } =
  TableSlice.actions;

export const tables = (state: AppState) => state.tables;

export default TableSlice.reducer;
