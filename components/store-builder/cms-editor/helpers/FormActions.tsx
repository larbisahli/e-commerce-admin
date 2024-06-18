import { ArrowPrev } from '@components/icons/arrow-prev';
import { SaveIcon } from '@components/icons/save-icon';
import Button from '@components/ui/button';
import { useModalAction } from '@components/ui/modal/modal.context';
import Select from '@components/ui/select/select';
import { useAppDispatch } from '@hooks/useGetClient';
import { useSettings } from '@hooks/useSettings';
import { setCurrentLanguage } from '@store/settings';
import { CMS_BUILDER_MODAL } from '@ts-types/constants';
import { LanguageType } from '@ts-types/generated';
import { useTranslation } from 'next-i18next';
import { memo, useEffect } from 'react';

interface Props {
  loading?: boolean;
  disabled?: boolean;
  isLang?: boolean;
  forceSystemLang?: boolean;
  title: string;
  handleBack?: () => void;
  btnLabel: string;
}

const FormActions = ({
  loading,
  disabled,
  isLang = true,
  forceSystemLang,
  handleBack,
  title,
  btnLabel
}: Props) => {
  const { t } = useTranslation();
  const { closeModal } = useModalAction();

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

  const renderActions = () => {
    return (
      <div className="flex w-full items-center justify-between md:w-fit md:justify-start">
        {isLang && (
          <div className="relative mr-4 ml-4 flex h-[40px] w-[220px] items-center justify-end">
            <Select
              options={languages}
              value={selectedLanguage}
              name="language"
              getOptionLabel={(option: any) => option.name}
              getOptionValue={(option: any) => option.id}
              onChange={onLanguageChange}
              isDisabled={forceSystemLang || disabled}
              isLoading={isLoading}
              className="w-full"
            />
          </div>
        )}
        <Button
          className="mr-4"
          variant="outline"
          onClick={() => closeModal(CMS_BUILDER_MODAL)}
          disabled={disabled}
        >
          <div>{t('form:button-label-cancel')}</div>
        </Button>
        {saveButton()}
      </div>
    );
  };

  const saveButton = () => {
    return (
      <Button
        loading={loading}
        disabled={disabled}
        renderIcon={<SaveIcon width="1.3rem" height="1.3rem" />}
      >
        <div>{btnLabel}</div>
      </Button>
    );
  };

  return (
    <>
      <div>
        <div
          className="mb-3 flex items-center
        justify-between border-b border-gray-300 p-3 px-0 pt-0"
        >
          {handleBack instanceof Function ? (
            <Button variant="outline" onClick={handleBack} type="button">
              <ArrowPrev />
            </Button>
          ) : (
            <h3 className="font-medium">{title}</h3>
          )}
          {renderActions()}
        </div>
      </div>
    </>
  );
};

export default memo(FormActions);
