import { ArrowPrev } from '@components/icons/arrow-prev';
import { SaveIcon } from '@components/icons/save-icon';
import Button from '@components/ui/button';
import Select from '@components/ui/select/select';
import { useAppDispatch } from '@hooks/useGetUser';
import { useSettings } from '@hooks/useSettings';
import { useUI } from '@hooks/useUI';
import { setCurrentLanguage } from '@store/settings';
import { LanguageType } from '@ts-types/generated';
import cn from 'classnames';
import { isEmpty } from 'lodash';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { memo, useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

interface Props {
  loading: boolean;
  disabled: boolean;
  forceDefaultLang: boolean;
  title: string;
}

const FormActions = ({
  loading,
  title,
  disabled,
  forceDefaultLang = false
}: Props) => {
  const router = useRouter();

  const { t } = useTranslation();

  const [stickyReady, setStickyReady] = useState(false);

  const {
    ui: { displayMiniSidebar }
  } = useUI();

  const { ref, inView } = useInView({
    /* Optional options */
    threshold: 1
  });

  const {
    defaultLanguage,
    languages = [],
    isLoading,
    selectedLanguage
  } = useSettings();

  const dispatch = useAppDispatch();

  const onLanguageChange = (language: LanguageType) => {
    dispatch(setCurrentLanguage({ language }));
  };

  useEffect(() => {
    if (forceDefaultLang) {
      dispatch(setCurrentLanguage({ language: defaultLanguage }));
    }
  }, [defaultLanguage, dispatch, forceDefaultLang]);

  useEffect(() => {
    setTimeout(() => {
      setStickyReady(true);
    }, 500);
  }, []);

  const renderActions = () => {
    return (
      <div className="flex w-full items-center justify-between md:w-fit md:justify-start">
        <div className="relative mr-4 flex  h-[45px] w-[220px] items-center justify-end">
          <Select
            options={languages}
            value={selectedLanguage}
            name="language"
            getOptionLabel={(option: any) => option.name}
            getOptionValue={(option: any) => option.id}
            onChange={onLanguageChange}
            isDisabled={forceDefaultLang}
            isLoading={isLoading}
            className="w-full"
          />
        </div>
        <Button loading={loading} disabled={disabled}>
          <div className="mr-1">
            <SaveIcon width="1.3rem" height="1.3rem" />
          </div>
          <div className="text-lg">{t('form:button-label-save')}</div>
        </Button>
      </div>
    );
  };

  const renderBackButton = () => {
    return (
      <div className="mb-2 flex w-full items-center md:mb-0 md:w-fit">
        <Button variant="outline" onClick={router.back} type="button">
          <ArrowPrev />
          {t('form:button-label-back')}
        </Button>
      </div>
    );
  };

  const renderSticky = () => {
    if (!isEmpty(languages) && stickyReady) {
      return (
        <div
          className={cn(
            'border-y border-t-0 border-gray-300 opacity-100 transition-all duration-100 ease-linear',
            'nlg:ps-20 nxl:ps-20 fixed left-0 right-0 top-[75px] z-40 bg-gray-100 pr-8 md:ps-20 lg:ps-64 xl:ps-64',
            {
              '!ps-0 md:!ps-20': displayMiniSidebar,
              'invisible !opacity-0': inView
            }
          )}
        >
          <div className="flex flex-wrap items-center justify-center p-3 px-0 pl-4 md:justify-between md:pl-8">
            {renderBackButton()}
            {renderActions()}
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <>
      <div ref={ref}>
        <h1 className="mb-3 text-xl font-semibold text-heading">{title}</h1>
        <div className="mb-3 flex flex-wrap items-center justify-center border-y border-gray-300 p-3 px-0 md:justify-between">
          {renderBackButton()}
          {renderActions()}
        </div>
      </div>
      {renderSticky()}
    </>
  );
};

export default memo(FormActions);
