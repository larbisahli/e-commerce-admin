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
  onClick?: (e: any) => void;
  RenderIcon?: () => any;
}

const PageMainAction = ({ href, title, label, onClick, RenderIcon }: Props) => {
  const { t } = useTranslation();

  const {
    ui: { displayMiniSidebar }
  } = useUI();

  const [stickyReady, setStickyReady] = useState(false);

  const { languages = [], isLoading, selectedLanguage } = useSettings();

  const { ref, inView } = useInView({
    /* Optional options */
    threshold: 0
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
    return (
      <div className="h-[45px] flex items-center relative w-[220px] justify-end">
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
            'flex items-center pl-4 md:pl-8 transition-all duration-100 ease-linear opacity-100 mb-5 ',
            'justify-end border-y border-t-0 border-gray-300 p-3 px-0 fixed left-0 right-0 top-[75px]',
            'z-40 pr-8 bg-gray-100 md:ps-20 nlg:ps-20 nxl:ps-20 lg:ps-64 xl:ps-64',
            {
              'md:!ps-20 !ps-0': displayMiniSidebar,
              'invisible !opacity-0': inView
            }
          )}
        >
          <h1 className="pl-4 md:pl-8 text-2xl flex-1 flex text-gray-700 font-bold">
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
          className="h-[45px] ms-4 md:ms-6"
        >
          <div className="w-full flex items-center justify-center">
            <div className="hidden md:flex items-center justify-center">
              {RenderIcon ? <RenderIcon /> : <Add width="1rem" height="1rem" />}
              <span className="m-1">{label}</span>
            </div>
            <div className="md:hidden flex items-center justify-center">
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
      <h1 className="text-2xl text-gray-700 font-bold mb-4">{title}</h1>
      <div
        ref={ref}
        className={
          'flex items-center mb-5 justify-end border-y border-gray-300 p-3 px-0'
        }
      >
        {renderLanguageSelect()}
        {renderActionButton()}
      </div>
      {renderSticky()}
    </>
  );
};

export default memo(PageMainAction);

{
  /* <Tooltip id="actions-selectors" className="custom-tooltip">
        <div className="flex flex-col items-center">
          <span>Select language for translation</span>
          <span>{`You can create '${title}' with different languages`}</span>
        </div>
      </Tooltip>
      <div
              data-tooltip-id="actions-selectors"
              // data-tooltip-content={'Select your language for translation'}
              className="h-full flex items-center pb-1 mr-1 cursor-pointer"
            >
              <QuestionMark width="20" height="20" />
            </div> */
}
