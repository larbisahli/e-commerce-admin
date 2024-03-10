import { Add } from '@components/icons/add';
import LinkButton from '@components/ui/link-button';
import Select from '@components/ui/select/select';
import { useAppDispatch } from '@hooks/useGetUser';
import { useSettings } from '@hooks/useSettings';
import { useUI } from '@hooks/useUI';
import { setCurrentLanguage } from '@store/settings';
import { LanguageType } from '@ts-types/generated';
import cn from 'classnames';
import { isEmpty } from 'lodash';
import { useTranslation } from 'next-i18next';
import { memo, useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

interface Props {
  href?: string;
  title: string;
  label: string;
  showSelectLanguage?: boolean;
  hideBorder?: boolean;
  onClick?: (e: any) => void;
  RenderIcon?: () => any;
  params?: {
    name: string;
    param: string;
  }[];
}

const PageMainAction = ({
  href,
  title,
  label,
  onClick,
  RenderIcon,
  hideBorder = false,
  showSelectLanguage = true,
  params
}: Props) => {
  const { t } = useTranslation();

  const {
    ui: { displayMiniSidebar }
  } = useUI();

  const [stickyReady, setStickyReady] = useState(false);

  const { languages = [], isLoading, selectedLanguage } = useSettings();

  const { ref, inView } = useInView({
    /* Optional options */
    threshold: 1,
    rootMargin: '-50px 0px 0px 0px'
  });

  const dispatch = useAppDispatch();

  const onLanguageChange = (language: LanguageType) => {
    dispatch(setCurrentLanguage({ language }));
  };

  useEffect(() => {
    setTimeout(() => {
      setStickyReady(true);
    }, 500);
  }, []);

  const renderLanguageSelect = () => {
    if (!showSelectLanguage) {
      return null;
    }

    return (
      <div className="relative flex h-[40px] w-fit items-center justify-end">
        <span className="mr-2 block text-sm font-semibold leading-none text-gray-700">
          Language:
        </span>
        <Select
          options={languages}
          value={selectedLanguage}
          name="language"
          getOptionLabel={(option: any) => option.name}
          getOptionValue={(option: any) => option.id}
          onChange={onLanguageChange}
          isLoading={isLoading}
          className="w-full"
        />
      </div>
    );
  };

  const renderSticky = () => {
    if (!isEmpty(languages) && stickyReady) {
      return (
        <div
          className={cn(
            'mb-5 flex items-center pl-4 opacity-100 transition-all duration-100 ease-linear md:pl-8 ',
            'fixed left-0 right-0 top-[75px] justify-end border-y border-t-0 border-gray-300 p-3 px-0',
            'nlg:ps-20 nxl:ps-20 z-30 bg-gray-100 pr-8 md:ps-20 lg:ps-64 xl:ps-64',
            {
              '!ps-0 md:!ps-20': displayMiniSidebar,
              'invisible !opacity-0': inView
            }
          )}
        >
          <h1 className="flex flex-1 pl-4 text-2xl font-bold text-gray-700 md:pl-8">
            {title}
          </h1>
          {renderLanguageSelect()}
          {renderActionButton()}
        </div>
      );
    }
    return null;
  };

  const renderActionButton = () => {
    if (href) {
      return (
        <LinkButton
          href={href}
          onClick={onClick}
          className="h-[40px]"
          params={params}
        >
          <div className="flex w-full items-center justify-center">
            <div className="hidden items-center justify-center md:flex">
              {RenderIcon ? <RenderIcon /> : <Add width="1rem" height="1rem" />}
              <span className="m-1">{label}</span>
            </div>
            <div className="flex items-center justify-center md:hidden">
              {RenderIcon ? <RenderIcon /> : <Add width="1rem" height="1rem" />}
              <span className="m-1">{t('form:button-label-add')}</span>
            </div>
          </div>
        </LinkButton>
      );
    }
    return null;
  };

  return (
    <>
      <h1 className="mb-4 text-xl font-bold text-gray-700">{title}</h1>
      <div
        ref={ref}
        className={cn(
          'mb-5 flex items-center justify-end border-y border-gray-300 p-3 px-0',
          {
            'border-t border-b-0': hideBorder
          }
        )}
      >
        {renderLanguageSelect()}
        {renderActionButton()}
      </div>
      {renderSticky()}
    </>
  );
};

export default memo(PageMainAction);
