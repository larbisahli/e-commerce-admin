import { useMutation, useQuery } from '@apollo/client';
import Card from '@components/common/card';
import { SaveIcon } from '@components/icons/save-icon';
import Button from '@components/ui/button';
import Checkbox from '@components/ui/checkbox';
import Description from '@components/ui/description';
import Input from '@components/ui/input';
import Label from '@components/ui/label';
import SelectInput from '@components/ui/select-input';
import {
  COUNTRIES,
  CREATE_SHIPPING,
  UPDATE_SHIPPING
} from '@graphql/shipping-zone';
import { yupResolver } from '@hookform/resolvers/yup';
import { useErrorLogger, useWarnIfUnsavedChanges } from '@hooks/index';
import { notify } from '@lib/notify';
import { Nullable } from '@ts-types/custom.types';
import type { CountriesType, ShippingZoneType } from '@ts-types/generated';
import { ROUTES } from '@utils/routes';
import clone from 'lodash/clone';
import isEmpty from 'lodash/isEmpty';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { useEffect, useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';

import RateComponent from './rate-component';
import shippingRatesValidation from './shipping-rates-validation';
import { shippingValidationSchema } from './shipping-validation-schema';

const defaultValues = {
  shippingZone: {
    name: '',
    display_name: '',
    active: false,
    free_shipping: false,
    rate_type: { id: 1, name: 'Weight', type: 'weight' }
  },
  zones: [],
  shipping_rates: []
};

type FormValues = ShippingZoneType;

type TCountries = {
  countries: CountriesType[];
};

type IProps = {
  initialValues?: Nullable<ShippingZoneType>;
};

export default function CreateOrUpdateShippingForm({ initialValues }: IProps) {
  const router = useRouter();
  const { t } = useTranslation();

  const [error, setError] = useState(null);
  const [unsavedChanges, setUnsavedChanges] = useState(true);

  console.log('initialValues', initialValues);

  const {
    data,
    loading: loadingCountries,
    error: queryError
  } = useQuery<TCountries>(COUNTRIES, {
    fetchPolicy: 'cache-and-network'
  });

  const countries = data?.countries;

  const {
    register,
    handleSubmit,
    control,
    watch,
    reset,
    setValue,
    formState: { errors }
  } = useForm<FormValues>({
    shouldUnregister: true,
    resolver: yupResolver(shippingValidationSchema),
    defaultValues: isEmpty(initialValues)
      ? defaultValues
      : {
          ...initialValues,
          shippingZone: {
            ...initialValues?.shippingZone,
            rate_type:
              initialValues?.shippingZone?.rate_type === 'weight'
                ? { id: 1, name: 'Weight', type: 'weight' }
                : { id: 0, name: 'Price', type: 'price' }
          },
          shippingRates: clone(initialValues?.shippingRates)
            ?.sort((a, b) =>
              a.min_value > b.min_value ? 1 : b.min_value > a.min_value ? -1 : 0
            )
            ?.map((rate, index) => {
              return {
                ...rate,
                index
              };
            })
        }
  });

  const [
    createShippingZone,
    { loading: creating, reset: resetCreateMutation }
  ] = useMutation(CREATE_SHIPPING, {
    onCompleted: (data: { createShippingZone: ShippingZoneType }) => {
      if (!isEmpty(data)) {
        reset();
        notify(t('common:successfully-created'), 'success');
        router.push(ROUTES.SHIPPING_ZONES);
      }
    }
  });

  const [
    updateShippingZone,
    { loading: updating, reset: resetUpdateMutation }
  ] = useMutation(UPDATE_SHIPPING, {
    onCompleted: (data: { updateShippingZone: ShippingZoneType }) => {
      if (!isEmpty(data)) {
        notify(t('common:successfully-updated'), 'success');
        router.push(ROUTES.SHIPPING_ZONES);
      }
    }
  });

  useErrorLogger(error);
  useErrorLogger(queryError);

  const onSubmit = async (values: ShippingZoneType) => {
    const checkFailed = shippingRatesValidation(values.shippingRates, false);

    if (checkFailed) return;

    const { shippingRates, shippingZone, zones } = values;

    const variables = {
      name: shippingZone?.name,
      display_name: shippingZone?.display_name,
      active: shippingZone?.active,
      free_shipping: shippingZone?.free_shipping,
      rate_type: shippingZone?.rate_type?.type,
      shipping_rates: shippingRates?.map((rate) => {
        return {
          min_value: Number(rate?.min_value),
          max_value: rate?.no_max ? null : Number(rate?.max_value),
          no_max: rate?.no_max,
          price: Number(rate?.price)
        };
      }),
      zones: zones?.map((zone) => {
        return { id: zone.id };
      })
    };

    console.log('variables :>> ', variables);

    setUnsavedChanges(false);
    if (isEmpty(initialValues)) {
      createShippingZone({ variables }).catch((err) => {
        setError(err);
        resetCreateMutation();
      });
    } else {
      // updateShippingZone({
      //   variables: { id: initialValues?.id, ...variables }
      // }).catch((err) => {
      //   setError(err);
      //   resetUpdateMutation()
      // });
    }
  };

  useWarnIfUnsavedChanges(unsavedChanges, () => {
    return confirm(t('common:UNSAVED_CHANGES'));
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'shippingRates',
    keyName: 'key'
  });

  const shipping_rates = watch('shippingRates');
  const zones = watch('zones');
  const free_shipping = watch('shippingZone.free_shipping');

  useEffect(() => {
    const exist = zones?.find((c) => c.name === 'Everywhere');
    if (isEmpty(zones)) {
      setValue('zones', [{ id: '0', name: 'Everywhere', iso: 'XX' }]);
    } else if (zones.length > 1 && exist) {
      setValue(
        'zones',
        zones.filter((c) => c.name !== 'Everywhere')
      );
    }
  }, [zones]);

  const handleRateAppend = () => {
    const hasFields = !isEmpty(shipping_rates);

    const MaxMaxValueField = hasFields
      ? shipping_rates?.reduce((acc, val) => {
          return Number(acc.max_value) >= Number(val.max_value)
            ? { max_value: Number(acc.max_value) }
            : { max_value: Number(val.max_value) };
        })
      : { max_value: 0 };

    const MaxPriceValueField = hasFields
      ? shipping_rates?.reduce((acc, val) => {
          return Number(acc.price) > Number(val.price)
            ? { price: Number(acc.price), index: acc.index }
            : { price: Number(val.price), index: val.index };
        })
      : { price: 0, index: 0 };

    const checkFailed = shippingRatesValidation(shipping_rates);

    if (!checkFailed) {
      append({
        min_value: hasFields
          ? Number((Number(MaxMaxValueField.max_value) + 0.1).toFixed(1))
          : 0,
        max_value: null,
        no_max: hasFields,
        price: hasFields
          ? Number((Number(MaxPriceValueField.price) + 0.1).toFixed(1))
          : 0,
        index: shipping_rates?.length
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-wrap my-5 sm:my-8">
        <Description
          title={t('form:item-shipping-information')}
          details={
            initialValues
              ? t('form:item-shipping-information-desc-update')
              : t('form:item-shipping-information-desc-create')
          }
          className="w-full px-0 sm:pe-4 md:pe-5 pb-5 sm:w-4/12 md:w-1/3 sm:py-8"
        />
        <Card className="w-full sm:w-8/12 md:w-2/3">
          <div className="mb-5 flex items-center justify-between lg:flex-nowrap flex-wrap">
            <Input
              label={`${t('form:input-label-name')}*`}
              {...register('shippingZone.name', {
                required: 'Name is required'
              })}
              error={t(errors.shippingZone?.name?.message!)}
              placeholder="Name ( The name you'll remember )"
              variant="outline"
              className="w-full lg:mr-5 mr-0"
            />
            <Input
              label={`${t('form:input-label-display-name')}*`}
              {...register('shippingZone.display_name', {
                required: 'Display name is required'
              })}
              error={t(errors.shippingZone?.display_name?.message!)}
              placeholder="Name ( Name to be displayed to customers )"
              variant="outline"
              className="w-full"
            />
          </div>
          <div className="mt-2">
            <Label>{t('form:input-label-status')}</Label>
            <Checkbox
              {...register('shippingZone.free_shipping')}
              className="mb-4"
              label={t('form:input-label-free-shipping')}
            />
            <Checkbox
              {...register('shippingZone.active')}
              label={t('form:input-label-activate-shipping')}
            />
          </div>
        </Card>
      </div>
      {/* ZONES */}
      <div className="flex flex-wrap my-5 sm:my-8">
        <Description
          title={t('form:item-shipping-zones-info')}
          details={
            initialValues
              ? t('form:item-shipping-zones-info-update')
              : t('form:item-shipping-zones-info-create')
          }
          className="w-full px-0 sm:pe-4 md:pe-5 pb-5 sm:w-4/12 md:w-1/3 sm:py-8"
        />
        <Card className="w-full sm:w-8/12 md:w-2/3">
          <div>
            <Label>{t('form:input-label-countries')}</Label>
            <SelectInput
              name="zones"
              control={control}
              isMulti
              getOptionLabel={(option: any) => option.name}
              getOptionValue={(option: any) => option.name}
              options={countries}
              isLoading={loadingCountries}
              closeMenuOnSelect={false}
              hideSelectedOptions={false}
            />
          </div>
        </Card>
      </div>
      {/* TYPES */}
      {!free_shipping && (
        <div className="flex flex-wrap my-5 sm:my-8">
          <Description
            title={t('form:item-shipping-rate-type')}
            details={
              initialValues
                ? t('form:item-shipping-rate-type-update')
                : t('form:item-shipping-rate-type-create')
            }
            className="w-full px-0 sm:pe-4 md:pe-5 pb-5 sm:w-4/12 md:w-1/3 sm:py-8"
          />
          <Card className="w-full sm:w-8/12 md:w-2/3">
            <div>
              <Label>{t('form:input-label-type')}</Label>
              <SelectInput
                name="shippingZone.rate_type"
                control={control}
                getOptionLabel={(option: any) => option.name}
                getOptionValue={(option: any) => option.type}
                options={[
                  { id: 1, name: 'Price', type: 'price' },
                  { id: 1, name: 'Weight', type: 'weight' }
                ]}
              />
            </div>
          </Card>
        </div>
      )}
      {/* RATES */}
      {!free_shipping && (
        <div className="flex flex-wrap my-5 sm:my-8">
          <Description
            title={t('form:item-shipping-rates')}
            details={
              initialValues
                ? t('form:item-shipping-rates-update')
                : t('form:item-shipping-rates-create')
            }
            className="w-full px-0 sm:pe-4 md:pe-5 pb-5 sm:w-4/12 md:w-1/3 sm:py-8"
          />
          <Card className="w-full sm:w-8/12 md:w-2/3">
            <div>
              <Label>{t('form:input-label-rates')}</Label>
              {fields.map((item) => {
                return (
                  <RateComponent
                    register={register}
                    item={item}
                    key={item.key}
                    fields={fields}
                    remove={remove}
                    watch={watch}
                  />
                );
              })}
              <Button
                type="button"
                onClick={handleRateAppend}
                className="w-full sm:w-auto mt-3"
              >
                {t('form:button-label-add-rate')}
              </Button>
            </div>
          </Card>
        </div>
      )}

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

        <Button loading={creating || updating} disabled={creating || updating}>
          <div className="mr-1">
            <SaveIcon width="1.3rem" height="1.3rem" />
          </div>
          <div>{t('form:button-label-save')}</div>
        </Button>
      </div>
    </form>
  );
}
