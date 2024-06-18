import { useMutation, useQuery } from '@apollo/client';
import Card from '@components/common/card';
import FormActions from '@components/common/FormActions';
import ImageModal from '@components/image-modal';
import Button from '@components/ui/button';
import Checkbox from '@components/ui/checkbox';
import Description from '@components/ui/description';
import Input from '@components/ui/input';
import Label from '@components/ui/label';
import SelectInput from '@components/ui/select-input';
import { DELIVERY_TIME_SELECT } from '@graphql/delivery-time';
import { CREATE_SHIPPING, UPDATE_SHIPPING } from '@graphql/shipping-zone';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  useErrorLogger,
  useGetClient,
  useWarnIfUnsavedChanges
} from '@hooks/index';
import { useSettings } from '@hooks/useSettings';
import { notify } from '@lib/notify';
import { LanguageProps, Nullable } from '@ts-types/custom.types';
import { OrderBy, RateType } from '@ts-types/enums';
import { DeliveryTimeType, ShippingZoneType } from '@ts-types/generated';
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
import { updateVariable } from './variablesSubmission';

const defaultValues = {
  shippingZone: {
    name: '',
    logo: [],
    deliveryTime: {},
    displayName: '',
    active: false,
    freeShipping: false,
    rateType: { id: 1, name: 'Weight', type: RateType.WEIGHT }
  },
  zones: [],
  shippingRates: []
};

type FormValues = ShippingZoneType;

type IProps = {
  initialValues?: Nullable<ShippingZoneType>;
};

interface TDelivery {
  deliveryTimeSelect: DeliveryTimeType[];
}

interface DeliveryVariable extends LanguageProps {
  page: number;
  limit: number;
  orderBy: OrderBy;
}

export default function CreateOrUpdateShippingForm({ initialValues }: IProps) {
  const router = useRouter();
  const { t } = useTranslation();

  const [error, setError] = useState(null);
  const [unsavedChanges, setUnsavedChanges] = useState(true);
  const [countries, setCountries] = useState([]);

  // Get Countries
  useEffect(() => {
    async function getCountries() {
      const { Countries } = await import('@utils/countries');
      setCountries(Countries);
    }
    getCountries();
  }, []);

  const {
    register,
    handleSubmit,
    control,
    watch,
    reset,
    setValue,
    getValues,
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
            rateType:
              (initialValues?.shippingZone?.rateType as unknown as string) ===
              RateType.WEIGHT
                ? { id: 1, name: 'Weight', type: RateType.WEIGHT }
                : { id: 0, name: 'Price', type: RateType.PRICE }
          },
          shippingRates: clone(initialValues?.shippingRates)
            ?.sort((a, b) => (a.min > b.min ? 1 : b.min > a.min ? -1 : 0))
            ?.map((rate, index) => {
              return {
                ...rate,
                index
              };
            })
        }
  });

  const { systemLanguage } = useSettings();

  const {
    userInfo: { csrfToken, store: { etag } = {} }
  } = useGetClient();

  const {
    data,
    loading,
    error: deliveryTimeError
  } = useQuery<TDelivery, DeliveryVariable>(DELIVERY_TIME_SELECT, {
    variables: {
      page: 1,
      limit: 999,
      orderBy: OrderBy.CREATED_AT,
      language: systemLanguage,
      etag: etag?.shipmentEtag
    },
    fetchPolicy: 'cache-and-network',
    skip: isEmpty(systemLanguage) || isEmpty(etag)
  });

  const { deliveryTimeSelect = [] } = data ?? {};

  const [
    createShippingZone,
    { loading: creating, reset: resetCreateMutation }
  ] = useMutation(CREATE_SHIPPING, {
    context: {
      headers: {
        'x-csrf-token': csrfToken
      }
    },
    onCompleted: (data: { createShippingZone: ShippingZoneType }) => {
      if (!isEmpty(data)) {
        reset();
        notify(t('common:successfully-created'), 'success');
        router.push(ROUTES.SHIPPING_ZONE);
      }
    }
  });

  const [
    updateShippingZone,
    { loading: updating, reset: resetUpdateMutation }
  ] = useMutation(UPDATE_SHIPPING, {
    context: {
      headers: {
        'x-csrf-token': csrfToken
      }
    },
    onCompleted: (data: { updateShippingZone: ShippingZoneType }) => {
      if (!isEmpty(data)) {
        notify(t('common:successfully-updated'), 'success');
        router.push(ROUTES.SHIPPING_ZONE);
      }
    }
  });

  useErrorLogger(error);
  useErrorLogger(deliveryTimeError);

  const onSubmit = async (values: ShippingZoneType) => {
    const checkFailed = shippingRatesValidation(values.shippingRates, false);

    if (checkFailed) return;

    const { shippingRates, shippingZone, zones } = values;

    const variables = {
      name: shippingZone?.name,
      logo: shippingZone?.logo?.map(({ id }) => ({ id })),
      displayName: shippingZone?.displayName,
      active: shippingZone?.active,
      freeShipping: shippingZone?.freeShipping,
      rateType: shippingZone?.rateType?.type,
      deliveryTime: { id: shippingZone?.deliveryTime?.id },
      shippingRates: shippingRates?.map((rate) => {
        console.log({ rate });
        return {
          id: isEmpty(rate?.id) ? null : rate?.id,
          weightUnit:
            shippingZone?.rateType?.type === RateType.WEIGHT
              ? rate?.weightUnit
              : null,
          min: Number(rate?.min),
          max: rate?.noMax ? null : Number(rate?.max),
          noMax: rate?.noMax,
          price: Number(rate?.price)
        };
      }),
      zones: zones?.map(({ id, zoneId, name, iso2 }) => ({
        id,
        zoneId,
        name,
        iso2
      }))
    };

    setUnsavedChanges(false);
    if (isEmpty(initialValues)) {
      createShippingZone({ variables }).catch((err) => {
        setError(err);
        resetCreateMutation();
      });
    } else {
      const variablesUpdate = updateVariable(values, initialValues);
      updateShippingZone({
        variables: { id: initialValues?.shippingZone?.id, ...variablesUpdate }
      }).catch((err) => {
        setError(err);
        resetUpdateMutation();
      });
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

  const shippingRates = watch('shippingRates');
  const zones = watch('zones');
  const freeShipping = watch('shippingZone.freeShipping');

  useEffect(() => {
    if (freeShipping) {
      remove();
    }
  }, [freeShipping, remove]);

  useEffect(() => {
    const exist = zones?.find((c) => c.iso2 === 'XX');

    // Sometimes we get undefined when using watch('zones')
    const upToDateZones = getValues('zones');
    if (isEmpty(upToDateZones)) {
      setValue('zones', [{ id: 0, name: 'Global', iso2: 'XX' }]);
    } else if (upToDateZones.length > 1 && exist) {
      setValue(
        'zones',
        upToDateZones.filter((c) => c.iso2 !== 'XX')
      );
    }
  }, [getValues, setValue, zones]);

  // TODO: Fix when MaxValue is null and min is 0
  const handleRateAppend = () => {
    const hasFields = !isEmpty(shippingRates);

    const MaxMaxValueField = hasFields
      ? shippingRates?.reduce((acc, val) => {
          return Number(acc.max) >= Number(val.max)
            ? { max: Number(acc.max) }
            : { max: Number(val.max) };
        })
      : { max: 0 };

    const MaxPriceValueField = hasFields
      ? shippingRates?.reduce((acc, val) => {
          return Number(acc.price) > Number(val.price)
            ? { price: Number(acc.price), index: acc.index }
            : { price: Number(val.price), index: val.index };
        })
      : { price: 0, index: 0 };

    const checkFailed = shippingRatesValidation(shippingRates);

    if (!checkFailed) {
      append({
        id: null,
        weightUnit: { unit: 'g' },
        min: hasFields
          ? Number((Number(MaxMaxValueField.max) + 0.1).toFixed(1))
          : 0,
        max: null,
        noMax: hasFields,
        price: hasFields
          ? Number((Number(MaxPriceValueField.price) + 0.1).toFixed(1))
          : 0,
        index: shippingRates?.length
      });
    }
  };

  const logo = watch('shippingZone.logo');

  // Set Logo since a problem with shippingZone.logo to be set automatically
  useEffect(() => {
    if (!isEmpty(initialValues)) {
      setValue('shippingZone.logo', initialValues?.shippingZone?.logo);
    }
  }, [initialValues, setValue]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormActions
        backLink={ROUTES.SHIPPING_ZONE}
        showSelectLanguage={false}
        title={
          isEmpty(initialValues)
            ? t('form:form-title-new-shipping-zone')
            : t('form:form-title-edit-shipping')
        }
        loading={creating || updating}
        disabled={creating || updating}
      />
      <div className="my-5 flex flex-wrap border-b border-dashed border-border-base pb-8 sm:my-8">
        <Description
          title={t('form:input-label-logo')}
          details={t('form:shipping-logo-helper-text')}
          className="w-full px-0 pb-5 sm:w-4/12 sm:py-8 sm:pe-4 md:w-1/3 md:pe-5"
        />
        <Card className="w-full sm:w-8/12 md:w-2/3">
          <ImageModal
            label="form:label-add-shipping-logo"
            onSelect={(photo) => setValue('shippingZone.logo', photo)}
            selected={logo}
            isThumbnail
          />
        </Card>
      </div>
      <div className="my-5 flex flex-wrap sm:my-8">
        <Description
          title={t('form:item-shipping-information')}
          details={
            initialValues
              ? t('form:item-shipping-information-desc-update')
              : t('form:item-shipping-information-desc-create')
          }
          className="w-full px-0 pb-5 sm:w-4/12 sm:py-8 sm:pe-4 md:w-1/3 md:pe-5"
        />
        <Card className="w-full sm:w-8/12 md:w-2/3">
          <div className="mb-5">
            <Input
              label={t('form:input-label-name')}
              isRequiredLabel
              {...register('shippingZone.name')}
              error={t(errors.shippingZone?.name?.message!)}
              placeholder="Name ( The name you'll remember )"
              variant="outline"
              className="mb-5 w-full"
            />
            <Input
              label={t('form:input-label-display-name')}
              isRequiredLabel
              {...register('shippingZone.displayName')}
              error={t(errors.shippingZone?.displayName?.message!)}
              placeholder="Name ( Name to be displayed to customers )"
              variant="outline"
              className="w-full"
            />
          </div>
          <div className="mt-2">
            <Label>{t('form:input-label-status')}</Label>
            <Checkbox
              {...register('shippingZone.freeShipping')}
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
      {/* DELIVERY TIMES */}
      <div className="my-5 flex flex-wrap sm:my-8">
        <Description
          title={t('form:item-delivery-time')}
          details={
            initialValues
              ? t('form:item-shipping-zones-delivery-info-update')
              : t('form:item-shipping-zones-delivery-info-create')
          }
          className="w-full px-0 pb-5 sm:w-4/12 sm:py-8 sm:pe-4 md:w-1/3 md:pe-5"
        />
        <Card className="w-full sm:w-8/12 md:w-2/3">
          <div>
            <Label>{t('form:input-label-delivery-time')}</Label>
            <SelectInput
              name="shippingZone.deliveryTime"
              control={control}
              loading={loading}
              getOptionLabel={(option: any) => option.name}
              getOptionValue={(option: any) => option.id}
              options={deliveryTimeSelect}
            />
          </div>
        </Card>
      </div>
      {/* ZONES */}
      <div className="my-5 flex flex-wrap sm:my-8">
        <Description
          title={t('form:item-shipping-zones-info')}
          details={
            initialValues
              ? t('form:item-shipping-zones-country-info-update')
              : t('form:item-shipping-zones-country-info-create')
          }
          className="w-full px-0 pb-5 sm:w-4/12 sm:py-8 sm:pe-4 md:w-1/3 md:pe-5"
        />
        <Card className="w-full sm:w-8/12 md:w-2/3">
          <div>
            <Label>{t('form:input-label-countries')}</Label>
            <SelectInput
              name="zones"
              control={control}
              isMulti
              getOptionLabel={(option: any) => option.name}
              getOptionValue={(option: any) => option.iso2}
              options={countries}
              closeMenuOnSelect={false}
              hideSelectedOptions={false}
            />
          </div>
        </Card>
      </div>
      {/* TYPES */}
      {!freeShipping && (
        <div className="my-5 flex flex-wrap sm:my-8">
          <Description
            title={t('form:item-shipping-rate-type')}
            details={
              initialValues
                ? t('form:item-shipping-rate-type-update')
                : t('form:item-shipping-rate-type-create')
            }
            className="w-full px-0 pb-5 sm:w-4/12 sm:py-8 sm:pe-4 md:w-1/3 md:pe-5"
          />
          <Card className="w-full sm:w-8/12 md:w-2/3">
            <div>
              <Label>{t('form:input-label-type')}</Label>
              <SelectInput
                name="shippingZone.rateType"
                control={control}
                getOptionLabel={(option: any) => option.name}
                getOptionValue={(option: any) => option.type}
                options={[
                  { id: 0, name: 'Price', type: RateType.PRICE },
                  { id: 1, name: 'Weight', type: RateType.WEIGHT }
                ]}
              />
            </div>
          </Card>
        </div>
      )}
      {/* RATES */}
      {!freeShipping && (
        <div className="my-5 flex flex-wrap sm:my-8">
          <Description
            title={t('form:item-shipping-rates')}
            details={
              initialValues
                ? t('form:item-shipping-rates-update')
                : t('form:item-shipping-rates-create')
            }
            className="w-full px-0 pb-5 sm:w-4/12 sm:py-8 sm:pe-4 md:w-1/3 md:pe-5"
          />
          <Card className="w-full sm:w-8/12 md:w-2/3">
            <div>
              <Label>{t('form:input-label-rates')}</Label>
              {fields.map((item) => {
                return (
                  <RateComponent
                    register={register}
                    control={control}
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
                className="mt-3 w-full sm:w-auto"
              >
                {t('form:button-label-add-rate')}
              </Button>
            </div>
          </Card>
        </div>
      )}
    </form>
  );
}
