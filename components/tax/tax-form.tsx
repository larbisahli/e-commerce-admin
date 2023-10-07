/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useMutation } from '@apollo/client';
import Card from '@components/common/card';
import { LanguageDefaultDescInfo } from '@components/common/commonComponents';
import FormActions from '@components/common/FormActions';
import Button from '@components/ui/button';
import Checkbox from '@components/ui/checkbox';
import Description from '@components/ui/description';
import Input from '@components/ui/input';
import Label from '@components/ui/label';
import { useModalAction } from '@components/ui/modal/modal.context';
import { CREATE_HERO_SLIDE, UPDATE_HERO_SLIDE } from '@graphql/hero-banner';
import {
  useErrorLogger,
  useGetUser,
  useWarnIfUnsavedChanges
} from '@hooks/index';
import { useSettings } from '@hooks/useSettings';
import { notify } from '@lib/index';
import { TAX_MODAL } from '@ts-types/constants';
import type { TaxType } from '@ts-types/generated';
import { SaveOptions } from '@ts-types/generated';
import { ROUTES } from '@utils/routes';
import { translationFallback } from '@utils/utils';
import cloneDeep from 'lodash/cloneDeep';
import isEmpty from 'lodash/isEmpty';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { useEffect, useState } from 'react';
import React from 'react';
import { useForm } from 'react-hook-form';

import CountryTaxModal from './country-tax-modal';
import TaxCountryList from './tax-country-list';

type FormValues = TaxType;

const defaultValues = {
  name: null,
  rate: 0,
  isDefault: false
};

type IProps = {
  initialValues?: TaxType | any;
};

export default function CreateOrUpdateTaxForm({ initialValues }: IProps) {
  const router = useRouter();
  const { t } = useTranslation();

  const [error, setError] = useState(null);
  const [unsavedChanges, setUnsavedChanges] = useState(true);
  const [countries, setCountries] = useState([]);

  const [saveMode, setSaveMode] = useState<SaveOptions>(SaveOptions.Default);

  const { selectedLanguage } = useSettings();

  const {
    control,
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormValues>({
    defaultValues: !isEmpty(initialValues)
      ? cloneDeep({
          ...initialValues
        })
      : (defaultValues as TaxType)
  });

  const { openModal } = useModalAction();

  const { userInfo } = useGetUser();
  const csrfToken = userInfo?.csrfToken;

  const taxedCountries = [];

  const [createHeroSlider, { loading: creating, reset: resetCreateMutation }] =
    useMutation(CREATE_HERO_SLIDE, {
      context: {
        headers: {
          'x-csrf-token': csrfToken
        }
      },
      onCompleted: (data: { createTax: TaxType }) => {
        const { id } = data.createTax;
        if (!id) {
          return;
        }
        if (saveMode === SaveOptions.Default) {
          notify(t('common:successfully-created'), 'success');
          router.push(`${ROUTES.HERO_BANNER}/edit/${id}`);
        } else if (saveMode === SaveOptions.SaveClose) {
          notify(t('common:successfully-created'), 'success');
          router.push(ROUTES.HERO_BANNER);
        } else if (saveMode === SaveOptions.SaveNew) {
          notify(t('common:successfully-created'), 'success');
          router.push(`${ROUTES.HERO_BANNER}/create`);
        } else if (saveMode === SaveOptions.SaveDuplicate) {
          notify(t('common:successfully-created'), 'success');
          router.push(`${ROUTES.HERO_BANNER}/fork/${id}`);
        }

        setSaveMode(SaveOptions.Default);
      }
    });
  const [updateHeroSlider, { loading: updating, reset: resetUpdateMutation }] =
    useMutation(UPDATE_HERO_SLIDE, {
      context: {
        headers: {
          'x-csrf-token': csrfToken
        }
      },
      onCompleted: (data: { UpdateTax: TaxType }) => {
        if (!isEmpty(data)) {
          notify(t('common:successfully-updated'), 'success');
        }
      }
    });

  useErrorLogger(error);

  const onSubmit = async (values: FormValues) => {
    const variables = { ...values, language: selectedLanguage };

    setUnsavedChanges(false);
    if (isEmpty(initialValues)) {
      createHeroSlider({ variables }).catch((err) => {
        setError(err);
        resetCreateMutation();
      });
    } else {
      const { id = null } = initialValues as TaxType;
      updateHeroSlider({
        variables: { id, ...variables }
      }).catch((err) => {
        setError(err);
        resetUpdateMutation();
      });
    }
  };

  useWarnIfUnsavedChanges(unsavedChanges, () => {
    return confirm(t('common:UNSAVED_CHANGES'));
  });

  // Get Countries
  useEffect(() => {
    async function getCountries() {
      const { Countries } = await import('@utils/countries');
      setCountries(Countries);
    }
    getCountries();
  }, []);

  const handleClick = (e) => {
    e.preventDefault();
    openModal(TAX_MODAL, TAX_MODAL, { test: 1 });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <CountryTaxModal
        control={control}
        register={register}
        countries={countries}
      />
      <FormActions
        backLink={ROUTES.TAX}
        forceSystemLang={isEmpty(initialValues)}
        title={
          isEmpty(initialValues)
            ? t('form:form-title-new-tax')
            : t('form:form-title-edit-tax')
        }
        loading={creating || updating}
        disabled={creating || updating}
      />
      <LanguageDefaultDescInfo
        label="New Tax"
        isVisible={isEmpty(initialValues)}
      />
      <div className="my-5 flex flex-wrap sm:my-8">
        <Description
          title={t('form:input-label-description')}
          details={`${
            initialValues
              ? t('form:item-description-edit')
              : t('form:item-description-add')
          } ${t('form:hero-slider-description-helper-text')}`}
          className="w-full px-0 pb-5 sm:w-4/12 sm:py-8 sm:pe-4 md:w-1/3 md:pe-5"
        />

        <Card className="w-full sm:w-8/12 md:w-2/3">
          <Input
            label={t('form:input-label-name')}
            isRequiredLabel
            {...register('name')}
            variant="outline"
            className="mb-5"
            placeholder={translationFallback(
              initialValues,
              'name',
              'Enter a title'
            )}
          />

          <Input
            label={`${t('form:input-label-tax-rate')} (%)`}
            isRequiredLabel
            type="number"
            min={0}
            max={100}
            {...register('rate')}
            error={t(errors.rate?.message!)}
            variant="outline"
            className="mb-5"
          />
          <div>
            <Checkbox
              {...register('isDefault')}
              label={t('form:input-label-use-as-default')}
              className="mb-2"
            />
          </div>
        </Card>
      </div>
      <div className="my-5 flex flex-wrap sm:my-8">
        <Description
          title={t('form:input-label-countries')}
          details={`${
            initialValues
              ? t('form:item-description-edit')
              : t('form:item-description-add')
          } ${t('form:hero-slider-description-helper-text')}`}
          className="w-full px-0 pb-5 sm:w-4/12 sm:py-8 sm:pe-4 md:w-1/3 md:pe-5"
        />
        <Card className="w-full sm:w-8/12 md:w-2/3">
          <div className="my-5 flex flex-col items-center justify-center">
            <Label className="mb-3 text-gray-500">
              Add individual tax rates for different countries.
            </Label>
            <Button onClick={handleClick}>Add country</Button>
          </div>

          {isEmpty(taxedCountries) && (
            <div className="mt-5">
              <TaxCountryList taxes={taxedCountries} />
            </div>
          )}
        </Card>
      </div>
    </form>
  );
}
