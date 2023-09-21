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
  loading?: boolean;
  disabled?: boolean;
  forceDefaultLang?: boolean;
  backLink?: string;
  title?: string;
  showSelectLanguage?: boolean;
  isCustom?: boolean;
  children?: JSX.Element[] | JSX.Element;
  hideBackLink?: boolean;
  showCancel?: boolean;
}

const FormActions = ({
  loading,
  title,
  disabled,
  backLink,
  forceDefaultLang = false,
  showSelectLanguage = true,
  hideBackLink = false,
  showCancel = true,
  isCustom = false,
  children
}: Props) => {
  const router = useRouter();

  const { t } = useTranslation();

  const [stickyReady, setStickyReady] = useState(false);

  const {
    ui: { displayMiniSidebar }
  } = useUI();

  const { ref, inView } = useInView({
    /* Optional options */
    threshold: 1,
    rootMargin: '-40px 0px 0px 0px'
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
    }, 800);
  }, []);

  const renderActions = () => {
    if (isCustom) {
      return children;
    }

    if (showSelectLanguage) {
      return (
        <div className="flex w-full items-center justify-between md:w-fit md:justify-start">
          <div className="relative mr-4 ml-4 flex h-[40px] w-[220px] items-center justify-end">
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
          {showCancel && (
            <Button
              className="mr-4"
              variant="outline"
              onClick={handleGoBack}
              disabled={disabled}
            >
              <div className="text-lg">{t('form:button-label-cancel')}</div>
            </Button>
          )}
          <Button loading={loading} disabled={disabled}>
            <div className="mr-1">
              <SaveIcon width="1.3rem" height="1.3rem" />
            </div>
            <div className="text-lg">{t('form:button-label-save')}</div>
          </Button>
        </div>
      );
    }
    return (
      <div className="flex w-full items-center justify-between md:w-fit md:justify-start">
        {showCancel && (
          <Button
            className="mr-4"
            variant="outline"
            onClick={handleGoBack}
            disabled={disabled}
          >
            <div className="text-lg">{t('form:button-label-cancel')}</div>
          </Button>
        )}
        <Button loading={loading} disabled={disabled}>
          <div className="mr-1">
            <SaveIcon width="1.3rem" height="1.3rem" />
          </div>
          <div className="text-lg">{t('form:button-label-save')}</div>
        </Button>
      </div>
    );
  };

  const handleGoBack = (e) => {
    e.preventDefault();

    if (backLink) {
      router.push(backLink);
    } else {
      router.back();
    }
  };

  const renderBackButton = () => {
    if (isCustom) {
      return null;
    }

    return (
      <div className={cn('mb-2 flex w-full items-center md:mb-0 md:w-fit')}>
        <Button
          variant="outline"
          onClick={handleGoBack}
          type="button"
          className={cn({
            hidden: hideBackLink
          })}
        >
          <ArrowPrev />
        </Button>
        {!inView && (
          <h1
            className={cn('text-base font-semibold text-heading', {
              'ml-8': !hideBackLink
            })}
          >
            {title}
          </h1>
        )}
      </div>
    );
  };

  const renderSticky = () => {
    if (!stickyReady) {
      return null;
    }

    if (isCustom) {
      return children;
    }

    if (!isEmpty(languages)) {
      return (
        <div
          className="flex w-full flex-wrap items-center justify-center
       p-3 px-0 md:justify-between"
        >
          {renderBackButton()}
          {renderActions()}
        </div>
      );
    }
    return null;
  };

  return (
    <>
      <div ref={ref}>
        <h1 className="mb-3 text-xl font-semibold text-heading">{title}</h1>
        <div
          className="mb-3 flex flex-wrap items-center justify-center
        border-y border-gray-300 p-3 px-0 md:justify-between"
        >
          {renderBackButton()}
          {renderActions()}
        </div>
      </div>
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
        <div
          className="flex flex-wrap items-center justify-center p-3
         px-0 pl-4 md:justify-between md:pl-8"
        >
          {renderSticky()}
        </div>
      </div>
    </>
  );
};

export default memo(FormActions);
