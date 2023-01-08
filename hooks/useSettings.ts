import type { AppDispatch, AppState } from '@store/index';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;

export const useSettings = () => {
  const settings = useAppSelector((state) => state.settings);
  return settings;
};
