import { useMutation } from '@apollo/client';
import Card from '@components/common/card';
import Button from '@components/ui/button';
import { DatePicker } from '@components/ui/date-picker';
import Description from '@components/ui/description';
import ValidationError from '@components/ui/form-validation-error';
import Input from '@components/ui/input';
import Label from '@components/ui/label';
import SelectInput from '@components/ui/select-input';
import { useSettings } from '@contexts/settings.context';
import { CREATE_COUPON, UPDATE_COUPON } from '@graphql/coupons';
import { yupResolver } from '@hookform/resolvers/yup';
import { useErrorLogger } from '@hooks/useErrorLogger';
import { notify } from '@lib/notify';
import { Nullable, Scalars } from '@ts-types/custom.types';
import { Coupon, CouponType } from '@ts-types/generated';
import { ROUTES } from '@utils/routes';
import { pgFormatDate } from '@utils/utils';
import isEmpty from 'lodash/isEmpty';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { useState } from 'react';
import { Control, Controller, FieldErrors, useForm } from 'react-hook-form';

import { couponValidationSchema } from './coupon-validation-schema';

type FormValues = {
  code: Scalars['String'];
  discount_value: Scalars['Int'];
  discount_type: {
    value: CouponType;
    label: Nullable<Scalars['String']>;
  };
  order_amount_limit?: Nullable<Scalars['Int']>;
  max_usage: Scalars['Int'];
  coupon_start_date: Scalars['Date'];
  coupon_end_date: Scalars['Date'];
};

const defaultValues = {
  discount_value: 0,
  max_usage: 0,
  order_amount_limit: 0,
  coupon_start_date: new Date(),
  coupon_end_date: new Date()
};

type IProps = {
  initialValues?: Coupon | null;
};

const couponDiscountTypes = [
  { value: CouponType.Fixed, label: 'Fixed' },
  { value: CouponType.Percentage, label: 'Percentage' },
  { value: CouponType.FreeShipping, label: 'Free Shipping' }
];

function SelectTypes({
  control,
  errors
}: {
  control: Control<FormValues>;
  errors: FieldErrors;
}) {
  const { t } = useTranslation();

  return (
    <div className="mb-5">
      <Label>{t('form:input-label-discount-type')}</Label>
      <SelectInput
        name="discount_type"
        control={control}
        getOptionLabel={(option: any) => option.label}
        getOptionValue={(option: any) => option.value}
        options={couponDiscountTypes!}
      />
      <ValidationError message={t(errors.discount_type?.message)} />
    </div>
  );
}

export default function CreateOrUpdateCouponForm({ initialValues }: IProps) {
  const router = useRouter();
  const { t } = useTranslation();

  const [error, setError] = useState(null);

  const {
    register,
    handleSubmit,
    control,
    reset,
    watch,
    formState: { errors }
  } = useForm<FormValues>({
    // @ts-ignore
    defaultValues: initialValues
      ? {
          ...initialValues,
          discount_type: couponDiscountTypes.find(
            (e) => e.value === initialValues.discount_type
          ),
          coupon_start_date: new Date(initialValues.coupon_start_date!),
          coupon_end_date: new Date(initialValues.coupon_end_date!)
        }
      : defaultValues,
    resolver: yupResolver(couponValidationSchema)
  });

  const { currency } = useSettings();

  const [coupon_start_date, coupon_end_date] = watch([
    'coupon_start_date',
    'coupon_end_date'
  ]);
  const couponType = watch('discount_type');

  const [createCoupon, { loading: creating }] = useMutation(CREATE_COUPON, {
    onCompleted: (data: { createCoupon: Coupon }) => {
      if (!isEmpty(data)) {
        notify(t('common:successfully-created'), 'success');
        reset();
        router.push(ROUTES.COUPONS);
      }
    }
  });

  const [updateCoupon, { loading: updating }] = useMutation(UPDATE_COUPON, {
    onCompleted: (data: { updateCoupon: Coupon }) => {
      if (!isEmpty(data)) {
        notify(t('common:successfully-updated'), 'success');
        router.push(ROUTES.COUPONS);
      }
    }
  });

  useErrorLogger(error);

  const onSubmit = async (values: FormValues) => {
    const discount_type = values.discount_type?.value;

    const variables = {
      code: values.code,
      order_amount_limit: Number(values.order_amount_limit),
      discount_value:
        discount_type === CouponType.FreeShipping
          ? 0
          : Number(values.discount_value),
      discount_type,
      max_usage: Number(values.max_usage),
      coupon_start_date: pgFormatDate(values.coupon_start_date),
      coupon_end_date: pgFormatDate(values.coupon_end_date)
    };

    if (isEmpty(initialValues)) {
      createCoupon({ variables }).catch((err) => {
        setError(err);
      });
    } else {
      updateCoupon({ variables: { id: initialValues.id, ...variables } }).catch(
        (err) => {
          setError(err);
        }
      );
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-wrap my-5 sm:my-8">
        <Description
          title={t('form:input-label-description')}
          details={`${
            initialValues
              ? t('form:item-description-edit')
              : t('form:item-description-add')
          } ${t('form:coupon-form-info-help-text')}`}
          className="w-full px-0 sm:pe-4 md:pe-5 pb-5 sm:w-4/12 md:w-1/3 sm:py-8 "
        />

        <Card className="w-full sm:w-8/12 md:w-2/3">
          <Input
            label={t('form:input-label-code')}
            {...register('code')}
            error={t(errors.code?.message!)}
            variant="outline"
            className="mb-5"
          />
          <Input
            label={`${t('form:order-amount-limit')} (${currency})`}
            {...register('order_amount_limit')}
            type={'number'}
            min={0}
            error={t(errors.order_amount_limit?.message!)}
            variant="outline"
            className="mb-5"
          />

          <SelectTypes control={control} errors={errors} />

          {couponType?.value !== CouponType.FreeShipping && (
            <Input
              label={`${t('form:input-label-discount-value')} (${
                couponType?.value === CouponType.Percentage ? '%' : currency
              })`}
              {...register('discount_value')}
              type="number"
              error={t(errors.discount_value?.message!)}
              variant="outline"
              className="mb-5"
              min="0"
              max={couponType?.value === CouponType.Percentage ? 100 : null}
            />
          )}
          <Input
            label={`${t('form:input-label-usage-limit')}`}
            {...register('max_usage')}
            type="number"
            error={t(errors.max_usage?.message!)}
            variant="outline"
            className="mb-5"
            min="0"
          />
          <div className="flex flex-col sm:flex-row">
            <div className="w-full sm:w-1/2 p-0 sm:pe-2 mb-5 sm:mb-0">
              <Label>{t('form:coupon-active-from')}</Label>
              <Controller
                control={control}
                name="coupon_start_date"
                render={({ field: { onChange, onBlur, value } }) => (
                  //@ts-ignore
                  <DatePicker
                    dateFormat="dd/MM/yyyy"
                    onChange={onChange}
                    onBlur={onBlur}
                    selected={value}
                    selectsStart
                    minDate={new Date()}
                    maxDate={coupon_end_date}
                    startDate={coupon_start_date}
                    endDate={coupon_end_date}
                    className="border border-border-base"
                  />
                )}
              />
              <ValidationError
                message={t(errors.coupon_start_date?.message!)}
              />
            </div>
            <div className="w-full sm:w-1/2 p-0 sm:ps-2">
              <Label>{t('form:coupon-expire-at')}</Label>

              <Controller
                control={control}
                name="coupon_end_date"
                render={({ field: { onChange, onBlur, value } }) => (
                  //@ts-ignore
                  <DatePicker
                    dateFormat="dd/MM/yyyy"
                    onChange={onChange}
                    onBlur={onBlur}
                    selected={value}
                    selectsEnd
                    startDate={coupon_start_date}
                    endDate={coupon_end_date}
                    minDate={coupon_start_date}
                    className="border border-border-base"
                  />
                )}
              />
              <ValidationError message={t(errors.coupon_end_date?.message!)} />
            </div>
          </div>
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

        <Button loading={creating || updating} disabled={creating || updating}>
          {initialValues
            ? t('form:button-label-update-coupon')
            : t('form:button-label-add-coupon')}
        </Button>
      </div>
    </form>
  );
}
