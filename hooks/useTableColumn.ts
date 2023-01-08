import type { AppDispatch, AppState } from '@store/index';
import { appendColumn, rehydrate, removeColumn } from '@store/table';
import { useEffect, useMemo } from 'react';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;

interface fn {
  id: string;
  append: boolean;
  remove: boolean;
  column: { label: string; key: string };
}

const isObjectLiked = (value) =>
  value.constructor.name === 'Array' || value.constructor.name === 'Object';

const _rehydrate_ = (value: any, defaultValue?: any) => {
  if (!value) return defaultValue;
  if (isObjectLiked(value)) {
    return value;
  }
  try {
    const parse = JSON.parse(value);
    return parse;
  } catch (err) {
    return defaultValue;
  }
};

export function useTableColumn(tableName: string) {
  const tables = useAppSelector((state) => state.tables);

  const dispatch = useAppDispatch();

  const selectedTableColumns = useMemo(
    () => tables[tableName]?.columns,
    [tables, tableName]
  );

  useEffect(() => {
    const tables = window?.localStorage.getItem('@echo-tables');
    const restoredValue = _rehydrate_(tables, {});
    dispatch(rehydrate(restoredValue));
  }, []);

  function handleColumnChange({ id, append, remove, column }: fn) {
    if (append) {
      dispatch(appendColumn({ column, tableName }));
    } else if (remove) {
      dispatch(removeColumn({ tableName, id }));
    }
  }

  return {
    selectedTableColumns,
    handleColumnChange
  };
}
