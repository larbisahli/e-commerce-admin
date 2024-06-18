import { useMutation } from '@apollo/client';
import Card from '@components/common/card';
import FormActions from '@components/common/FormActions';
import Button from '@components/ui/button';
import Checkbox from '@components/ui/checkbox';
import Description from '@components/ui/description';
import Input from '@components/ui/input';
import Label from '@components/ui/label';
import { useModalAction } from '@components/ui/modal/modal.context';
import { CREATE_TAX, UPDATE_TAX } from '@graphql/tax';
import {
  useErrorLogger,
  useGetClient,
  useWarnIfUnsavedChanges
} from '@hooks/index';
import { notify } from '@lib/index';
import { TAX_MODAL } from '@ts-types/constants';
import type { TaxType } from '@ts-types/generated';
import { ROUTES } from '@utils/routes';
import { translationFallback } from '@utils/utils';
import isEmpty from 'lodash/isEmpty';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { ChangeEvent, useEffect, useState } from 'react';
import React from 'react';

import CountryTaxModal from './country-tax-modal';
import TaxCountryList from './tax-country-list';
import { RenderTooltipTaxName } from './ToolTips';

type IProps = {
  initialValues?: TaxType | any;
};

export default function CreateOrUpdateTaxForm({ initialValues }: IProps) {
  const router = useRouter();
  const { t } = useTranslation();

  const [error, setError] = useState(null);
  const [unsavedChanges, setUnsavedChanges] = useState(true);
  const [countries, setCountries] = useState([]);

  const [state, setState] = useState({
    name: null,
    rate: 0,
    countries: []
  });

  const { openModal } = useModalAction();

  const { userInfo } = useGetClient();
  const csrfToken = userInfo?.csrfToken;

  useEffect(() => {
    if (!isEmpty(initialValues)) {
      setState(initialValues);
    }
  }, [initialValues]);

  const [createTaxRate, { loading: creating }] = useMutation(CREATE_TAX, {
    context: {
      headers: {
        'x-csrf-token': csrfToken
      }
    },
    onCompleted: (data: { createTax: TaxType }) => {
      if (!isEmpty(data.createTax)) {
        notify(t('common:successfully-created'), 'success');
        router.push(ROUTES.TAX);
      }
    }
  });
  const [updateTaxRate, { loading: updating }] = useMutation(UPDATE_TAX, {
    context: {
      headers: {
        'x-csrf-token': csrfToken
      }
    },
    onCompleted: (data: { UpdateTax: TaxType }) => {
      if (!isEmpty(data)) {
        notify(t('common:successfully-updated'), 'success');
        router.push(ROUTES.TAX);
      }
    }
  });

  useErrorLogger(error);

  const onSubmit = async (e) => {
    e.preventDefault();
    const variables = {
      ...state,
      rate: Number(state?.rate ?? 0),
      countries: state?.countries?.map((country) => {
        return {
          iso2: country.iso2,
          name: country.name,
          rate: country.rate,
          appliesTo: country.appliesTo
        };
      })
    };

    setUnsavedChanges(false);
    if (isEmpty(initialValues)) {
      createTaxRate({ variables }).catch((err) => {
        setError(err);
      });
    } else {
      const { id = null } = initialValues as TaxType;
      updateTaxRate({
        variables: { id, ...variables }
      }).catch((err) => {
        setError(err);
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
    openModal(TAX_MODAL, TAX_MODAL, {});
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    const inputValue =
      type === 'checkbox' ? (e.target as HTMLInputElement)?.checked : value;

    setState((prev) => {
      return {
        ...prev,
        [name]: inputValue
      };
    });
  };

  return (
    <form onSubmit={onSubmit}>
      <CountryTaxModal
        state={state}
        setState={setState}
        countries={countries}
      />
      <FormActions
        backLink={ROUTES.TAX}
        showSelectLanguage={false}
        title={
          isEmpty(initialValues)
            ? t('form:form-title-new-tax')
            : t('form:form-title-edit-tax')
        }
        loading={creating || updating}
        disabled={creating || updating}
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
            name="name"
            value={state.name}
            onChange={handleChange}
            variant="outline"
            className="mb-5"
            placeholder={translationFallback(
              initialValues,
              'name',
              'Enter a title'
            )}
            renderTooltip={<RenderTooltipTaxName />}
          />
          <Input
            label={`${t('form:input-label-tax-rate')} (%)`}
            isRequiredLabel
            name="rate"
            value={state.rate}
            type="number"
            min={0}
            max={100}
            onChange={handleChange}
            variant="outline"
            className="mb-5"
          />
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

          {!isEmpty(state.countries) && (
            <div className="mt-5">
              <TaxCountryList
                taxedCountries={state.countries}
                setState={setState}
              />
            </div>
          )}
        </Card>
      </div>
    </form>
  );
}
