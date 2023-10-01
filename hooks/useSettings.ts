import type { AppDispatch, AppState } from '@store/index';
import { useMemo } from 'react';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;

export const useSettings = () => {
  const settings = useAppSelector((state) => state.settings);

  const defaultLanguage = useMemo(
    () => settings?.languages?.find((lang) => lang.isDefault),
    [settings?.languages]
  );

  const systemLanguage = useMemo(
    () => settings?.languages?.find((lang) => lang.isSystem),
    [settings?.languages]
  );

  return { ...settings, defaultLanguage, systemLanguage };
};
