import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Mock t function
export const t = (key: string, params?: any) => {
  if (key === 'key.with.params') {
    return `key.with.params.${params.param}`;
  }

  return key;
};

// Mock react-i18next
i18n.use(initReactI18next).init({
  lng: 'en',
  fallbackLng: 'en',
  ns: ['common'],
  defaultNS: 'common',
  resources: {
    en: {
      common: {}
    }
  }
});

// Mock your i18n
jest.mock('~/i18n', () => {
  return {
    useTranslation: () => {
      return {
        t,
        i18n: {
          language: 'en',
          changeLanguage: jest
            .fn()
            .mockImplementation((lang: string) => console.log(lang))
        }
      };
    },
    withTranslation: () => (Component: any) => {
      Component.defaultProps = { ...Component.defaultProps, t };
      return Component;
    }
  };
});

// https://github.com/isaachinman/next-i18next/issues/377
