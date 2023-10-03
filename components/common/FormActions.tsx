import { ArrowDown } from '@components/icons/arrow-down';
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
  forceSystemLang?: boolean;
  backLink?: string;
  title?: string;
  showSelectLanguage?: boolean;
  isCustom?: boolean;
  children?: JSX.Element[] | JSX.Element;
  hideBackLink?: boolean;
  showCancel?: boolean;
  saveOptions?: {
    onClick: (e: any) => void;
    name: string;
  }[];
  onSubmit?: (e: any) => Promise<void>;
  showSaveButton?: boolean;
}

const FormActions = ({
  loading,
  title,
  disabled,
  backLink,
  forceSystemLang = false,
  showSelectLanguage = true,
  hideBackLink = false,
  showCancel = true,
  isCustom = false,
  showSaveButton = true,
  saveOptions = [],
  onSubmit,
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
    systemLanguage,
    languages = [],
    isLoading,
    selectedLanguage
  } = useSettings();

  const dispatch = useAppDispatch();

  const onLanguageChange = (language: LanguageType) => {
    dispatch(setCurrentLanguage({ language }));
  };

  useEffect(() => {
    if (forceSystemLang) {
      dispatch(setCurrentLanguage({ language: systemLanguage }));
    }
  }, [systemLanguage, dispatch, forceSystemLang]);

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
              isDisabled={forceSystemLang}
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
          {saveButton()}
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
        {saveButton()}
      </div>
    );
  };

  const saveButton = () => {
    if (!showSaveButton) {
      return null;
    }
    if (onSubmit instanceof Function) {
      return (
        <div className={cn('relative flex justify-end ms-4 md:ms-6')}>
          <Button
            onClick={onSubmit}
            loading={loading}
            disabled={disabled}
            renderIcon={<SaveIcon width="1.3rem" height="1.3rem" />}
          >
            <div className="text-lg">{t('form:button-label-save')}</div>
          </Button>
          {!isEmpty(saveOptions) && (
            <RenderSaveOptionsDropDown
              onSubmit={onSubmit}
              saveOptions={saveOptions}
            />
          )}
        </div>
      );
    }

    return (
      <Button
        loading={loading}
        disabled={disabled}
        renderIcon={<SaveIcon width="1.3rem" height="1.3rem" />}
      >
        <div className="text-lg">{t('form:button-label-save')}</div>
      </Button>
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
          'nlg:ps-20 nxl:ps-20 fixed left-0 right-0 top-[75px] z-30 bg-gray-100 pr-8 md:ps-20 lg:ps-64 xl:ps-64',
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

const RenderSaveOptionsDropDown = ({ onSubmit, saveOptions }) => {
  const [openParamDropdown, setOpenParamDropdown] = useState(false);

  const handleClickOutside = (e) => {
    e.preventDefault();
    setOpenParamDropdown(false);
  };

  const handleButtonClick = (e) => {
    e.preventDefault();
    setOpenParamDropdown((prev) => !prev);
  };

  return (
    <div
      className={cn(
        'cursor-pointer bg-accent',
        'border border-transparent text-light hover:bg-accent-hover',
        'border !border-l border-r-0 border-b-0 border-t-0 border-white'
      )}
    >
      <button
        onClick={handleButtonClick}
        className="flex h-full items-center justify-center px-2"
      >
        <div
          className={cn('transition-all', {
            '!rotate-180 ': openParamDropdown
          })}
        >
          <ArrowDown width="22px" height="22px" />
        </div>
      </button>
      <div
        className={cn(
          'absolute right-0 left-0 top-full border bg-white shadow-md transition-all',
          { hidden: !openParamDropdown }
        )}
      >
        <div className="flex flex-col">
          {saveOptions?.map(({ name, onClick }) => {
            return (
              <button
                onClick={(e) => {
                  onClick(e);
                  onSubmit(e);
                  handleClickOutside(e);
                }}
                key={name}
                className="w-full cursor-pointer border-b p-3 text-left text-[13px] font-medium text-gray-600 hover:bg-gray-200"
              >
                {name}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default memo(FormActions);
