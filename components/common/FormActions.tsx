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
import { memo, useEffect, useMemo, useState } from 'react';
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

  const { languages = [], isLoading, selectedLanguage } = useSettings();

  const defaultLanguage = useMemo(
    () => languages?.find((lang) => lang.isDefault),
    [languages]
  );

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
      <div className="flex items-center md:w-fit md:justify-start justify-between w-full">
        <div className="h-[45px] flex items-center  relative w-[220px] justify-end mr-4">
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
      <div className="flex items-center w-full md:w-fit md:mb-0 mb-2">
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
            'transition-all border-y border-t-0 border-gray-300 duration-100 ease-linear opacity-100',
            'fixed left-0 right-0 top-[75px] z-40 pr-8 bg-gray-100 md:ps-20 nlg:ps-20 nxl:ps-20 lg:ps-64 xl:ps-64',
            {
              'md:!ps-20 !ps-0': displayMiniSidebar,
              'invisible !opacity-0': inView
            }
          )}
        >
          <div className="pl-4 md:pl-8 flex items-center md:justify-between p-3 px-0 flex-wrap justify-center">
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
        <h1 className="text-xl mb-3 font-semibold text-heading">{title}</h1>
        <div className="mb-3 flex items-center md:justify-between border-y border-gray-300 p-3 px-0 flex-wrap justify-center">
          {renderBackButton()}
          {renderActions()}
        </div>
      </div>
      {renderSticky()}
    </>
  );
};

export default memo(FormActions);
