/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useMutation } from '@apollo/client';
import Card from '@components/common/card';
import Alert from '@components/ui/alert';
import Button from '@components/ui/button';
import Description from '@components/ui/description';
import Input from '@components/ui/input';
import InputPhoneNumber from '@components/ui/input-phone-number';
import Label from '@components/ui/label';
import SelectInput from '@components/ui/select-input';
import TextArea from '@components/ui/text-area';
import { CREATE_SUPPLIER, UPDATE_SUPPLIER } from '@graphql/supplier';
import { useErrorLogger } from '@hooks/useErrorLogger';
import { notify } from '@lib/index';
import type { DialCodeType } from '@ts-types/custom.types';
import { Nullable } from '@ts-types/custom.types';
import { Suppliers } from '@ts-types/generated';
import { ROUTES } from '@utils/routes';
import isEmpty from 'lodash/isEmpty';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { useEffect, useState } from 'react';
import React from 'react';
import { useForm } from 'react-hook-form';

type FormValues = Suppliers;

type IProps = {
  initialValues?: Nullable<Suppliers>;
};

const defaultValues = {
  supplier_name: '',
  company: null,
  phone_number: null,
  dial_code: null,
  address_line1: '',
  address_line2: null,
  country: null,
  city: null,
  note: null
};

export default function CreateOrUpdateSupplierForm({ initialValues }: IProps) {
  const router = useRouter();

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [dialCode, setDialCode] = useState<DialCodeType[]>([]);
  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);
  const [citiesLoading, setCitiesLoading] = useState(false);

  // Get Dial code
  useEffect(() => {
    async function getDialCode() {
      const { DIAL_CODE } = await import('@utils/countries-dial');
      setDialCode(DIAL_CODE);
    }
    getDialCode();
  }, []);

  // Get Countries
  useEffect(() => {
    async function getCountries() {
      const { Countries } = await import('@utils/countries');
      setCountries(Countries);
    }
    getCountries();
  }, []);

  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    control,
    watch,
    reset,
    formState: { errors }
  } = useForm<FormValues>({
    defaultValues: initialValues
      ? {
          ...initialValues,
          country: { name: initialValues?.country } as { name: string },
          dial_code: { dial_code: initialValues?.dial_code } as {
            dial_code: string;
          },
          city: { name: initialValues?.city } as { name: string }
        }
      : defaultValues
  });

  const [createSupplier, { loading: creating, error: createSupplierError }] =
    useMutation(CREATE_SUPPLIER, {
      onCompleted: (data: { createSupplier: Suppliers }) => {
        if (!isEmpty(data)) {
          notify(t('common:successfully-created'), 'success');
          reset();
          router.push(ROUTES.SUPPLIERS);
        }
      }
    });

  const [updateSupplier, { loading: updating, error: updateSupplierError }] =
    useMutation(UPDATE_SUPPLIER, {
      onCompleted: (data: { updateSupplier: Suppliers }) => {
        if (!isEmpty(data)) {
          notify(t('common:successfully-updated'), 'success');
          router.push(ROUTES.SUPPLIERS);
        }
      }
    });

  useErrorLogger(createSupplierError);
  useErrorLogger(updateSupplierError);

  const country = watch('country');

  useEffect(() => {
    async function getCity() {
      const response = await fetch('/api/cities', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ country })
      });
      const city_ = await response.json();
      const formattedCities =
        city_?.cities?.map((c) => {
          return { name: c };
        }) ?? [];
      setCities(formattedCities);
      setCitiesLoading(false);
    }
    if (country) {
      setCitiesLoading(true);
      getCity();
    }
  }, [country]);

  const onSubmit = (values: FormValues) => {
    const variables = {
      ...values,
      dial_code: (values?.dial_code as { dial_code: string })?.dial_code,
      country: (values?.country as { name: string })?.name,
      city: (values?.city as { name: string })?.name
    };

    if (isEmpty(initialValues)) {
      createSupplier({ variables });
    } else {
      updateSupplier({ variables: { ...variables, id: initialValues.id } });
    }
  };

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
                {...register('supplier_name', { required: 'Name is required' })}
                error={t(errors.supplier_name?.message!)}
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
                {...register('address_line1', {
                  required: 'address 1 is required'
                })}
                error={t(errors.address_line1?.message!)}
                variant="outline"
                className="mb-5"
              />
              <Input
                label={t('form:input-label-address-2')}
                {...register('address_line2')}
                error={t(errors.address_line2?.message!)}
                variant="outline"
                className="mb-5"
              />
              <InputPhoneNumber
                label={t('form:input-label-phone-number')}
                {...register('phone_number')}
                type="number"
                placeholder="619080915..."
                variant="outline"
                className="mb-4"
                error={t(errors?.phone_number?.message!)}
              >
                <SelectInput
                  name="dial_code"
                  control={control}
                  getOptionLabel={(option: any) => option.dial_code}
                  getOptionValue={(option: any) => option.dial_code}
                  options={dialCode}
                />
              </InputPhoneNumber>
              <div>
                <Label>{t('form:input-label-country')}</Label>
                <SelectInput
                  name="country"
                  control={control}
                  getOptionLabel={(option: any) => option.name}
                  getOptionValue={(option: any) => option.name}
                  options={countries}
                />
              </div>
              <div>
                <Label>{t('form:input-label-city')}</Label>
                <SelectInput
                  name="city"
                  control={control}
                  getOptionLabel={(option: any) => option.name}
                  getOptionValue={(option: any) => option.name}
                  options={cities}
                  isLoading={citiesLoading}
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

        <div className="mb-4 text-end">
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
            loading={
              (creating && isEmpty(createSupplierError)) ||
              (updating && isEmpty(updateSupplierError))
            }
            disabled={creating || updating}
          >
            {initialValues
              ? t('form:item-description-update')
              : t('form:item-description-add')}{' '}
            {t('common:Supplier')}
          </Button>
        </div>
      </form>
    </>
  );
}
