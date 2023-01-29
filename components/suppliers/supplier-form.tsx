/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import 'react-phone-input-2/lib/style.css';

import { useMutation } from '@apollo/client';
import Card from '@components/common/card';
import { SaveIcon } from '@components/icons/save-icon';
import Alert from '@components/ui/alert';
import Button from '@components/ui/button';
import Description from '@components/ui/description';
import Input from '@components/ui/input';
import Label from '@components/ui/label';
import SelectInput from '@components/ui/select-input';
import TextArea from '@components/ui/text-area';
import { CREATE_SUPPLIER, UPDATE_SUPPLIER } from '@graphql/supplier';
import { useErrorLogger } from '@hooks/useErrorLogger';
import { useGetStaff } from '@hooks/useGetStaff';
import { notify } from '@lib/index';
import type { Nullable } from '@ts-types/custom.types';
import type { Suppliers } from '@ts-types/generated';
import { ROUTES } from '@utils/routes';
import { isValidPhoneNumber } from 'libphonenumber-js';
import isEmpty from 'lodash/isEmpty';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { useState } from 'react';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import PhoneInput from 'react-phone-input-2';

type FormValues = Suppliers;

type IProps = {
  initialValues?: Suppliers | any;
};

const defaultValues = {
  name: '',
  company: null,
  phoneNumber: null,
  addressLine1: '',
  addressLine2: null,
  country: null,
  city: null,
  note: null
};

export default function CreateOrUpdateSupplierForm({ initialValues }: IProps) {
  const router = useRouter();

  const [error, setError] = useState(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [countries, setCountries] = useState([]);

  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    reset,
    formState: { errors }
  } = useForm<FormValues>({
    defaultValues: initialValues ? { ...initialValues } : defaultValues
  });

  // Get Countries
  useEffect(() => {
    async function getCountries() {
      const { Countries } = await import('@utils/countries');
      setCountries(Countries);
      setValue(
        'country',
        Countries?.find(({ iso2 }) => iso2 == 'US')
      );
    }
    getCountries();
  }, []);

  const { staffInfo } = useGetStaff();
  const csrfToken = staffInfo?.csrfToken;

  const [createSupplier, { loading: creating }] = useMutation(CREATE_SUPPLIER, {
    context: {
      headers: {
        'x-csrf-token': csrfToken
      }
    },
    onCompleted: (data: { createSupplier: Suppliers }) => {
      if (!isEmpty(data)) {
        notify(t('common:successfully-created'), 'success');
        reset();
        router.push(ROUTES.SUPPLIERS);
      }
    }
  });

  const [updateSupplier, { loading: updating }] = useMutation(UPDATE_SUPPLIER, {
    context: {
      headers: {
        'x-csrf-token': csrfToken
      }
    },
    onCompleted: (data: { updateSupplier: Suppliers }) => {
      if (!isEmpty(data)) {
        notify(t('common:successfully-updated'), 'success');
        router.push(ROUTES.SUPPLIERS);
      }
    }
  });

  useErrorLogger(error);

  const country = watch('country');

  const onSubmit = (values: FormValues) => {
    const variables = {
      ...values
    };

    if (isEmpty(initialValues)) {
      createSupplier({ variables }).catch((err) => {
        setError(err);
      });
    } else {
      updateSupplier({
        variables: { ...variables, id: initialValues.id }
      }).catch((err) => {
        setError(err);
      });
    }
  };

  const phoneNumber = watch('phoneNumber');

  return (
    <>
      {errorMessage ? (
        <Alert
          message={t(`common:${errorMessage}`)}
          variant="error"
          closeable={true}
          className="mt-5"
          onClose={() => setErrorMessage(null)}
        />
      ) : null}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-wrap pb-8 border-b border-dashed border-border-base my-5 sm:my-8">
          <Description
            title={t('common:supplier')}
            details={`${
              initialValues
                ? t('form:item-description-update')
                : t('form:item-description-add')
            } ${t('form:form-description-supplier-name')}`}
            className="w-full px-0 sm:pe-4 md:pe-5 pb-5 sm:w-4/12 md:w-1/3 sm:py-8"
          />

          <Card className="w-full sm:w-8/12 md:w-2/3">
            <div className="grid grid-cols-2 gap-5">
              <Input
                label={`${t('form:input-label-supplier-name')}*`}
                {...register('name', { required: 'Name is required' })}
                error={t(errors.name?.message!)}
                variant="outline"
                className="mb-5"
              />
              <Input
                label={t('form:input-label-company')}
                {...register('company')}
                error={t(errors.company?.message!)}
                variant="outline"
                className="mb-5"
              />
              <Input
                label={`${t('form:input-label-address-1')}*`}
                {...register('addressLine1', {
                  required: 'address 1 is required'
                })}
                error={t(errors.addressLine1?.message!)}
                variant="outline"
                className="mb-5"
              />
              <Input
                label={t('form:input-label-address-2')}
                {...register('addressLine2')}
                error={t(errors.addressLine2?.message!)}
                variant="outline"
                className="mb-5"
              />

              <div className="mb-5">
                <Label>{t('form:input-label-country')}</Label>
                <SelectInput
                  name="country"
                  control={control}
                  getOptionLabel={(option: any) => option.name}
                  getOptionValue={(option: any) => option.id}
                  options={countries}
                  isLoading={isEmpty(countries)}
                />
              </div>
              <Input
                label={t('form:input-label-city')}
                {...register('city')}
                error={t(errors.addressLine2?.message!)}
                variant="outline"
                className="mb-5"
              />
              <div>
                <Label>{t('form:input-label-phone')}</Label>
                <PhoneInput
                  country={country?.iso2?.toLowerCase()}
                  inputProps={{
                    name: 'phone',
                    required: true,
                    autoFocus: false
                  }}
                  disableSearchIcon
                  enableSearch
                  inputClass="phone-number-class py-5"
                  value={`+${phoneNumber}`}
                  isValid={(value, country: { dialCode: string }) => {
                    if (country?.dialCode != value) {
                      return isValidPhoneNumber(`+${value}`);
                    }
                    return true;
                  }}
                  onChange={(phone) => {
                    setValue('phoneNumber', phone);
                  }}
                />
              </div>
            </div>
            <TextArea
              label={t('form:item-short-note')}
              {...register('note')}
              error={t(errors.note?.message!)}
              variant="outline"
              className="mt-5"
            />
          </Card>
        </div>

        <div className="mb-4 flex justify-end">
          {initialValues && (
            <Button
              variant="outline"
              onClick={router.back}
              className="me-4"
              type="button"
            >
              {t('form:button-label-back')}
            </Button>
          )}

          <Button
            loading={creating || updating}
            disabled={creating || updating}
          >
            <div className="mr-1">
              <SaveIcon width="1.3rem" height="1.3rem" />
            </div>
            <div>{t('form:button-label-save')}</div>
          </Button>
        </div>
      </form>
    </>
  );
}
