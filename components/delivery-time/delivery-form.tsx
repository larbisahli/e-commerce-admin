import { useMutation } from '@apollo/client';
import Card from '@components/common/card';
import { SaveIcon } from '@components/icons/save-icon';
import Button from '@components/ui/button';
import Description from '@components/ui/description';
import ValidationError from '@components/ui/form-validation-error';
import Input from '@components/ui/input';
import Label from '@components/ui/label';
import SelectInput from '@components/ui/select-input';
import {
  CREATE_DELIVERY_TIME,
  UPDATE_DELIVERY_TIME
} from '@graphql/delivery-time';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  useErrorLogger,
  useGetUser,
  useWarnIfUnsavedChanges
} from '@hooks/index';
import { notify } from '@lib/notify';
import { Nullable } from '@ts-types/custom.types';
import { DeliveryTimeType } from '@ts-types/generated';
import { ROUTES } from '@utils/routes';
import isEmpty from 'lodash/isEmpty';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { deliveryValidationSchema } from './delivery-validation-schema';

const defaultValues = {
  name: '',
  timeUnit: null,
  minValue: null,
  maxValue: null
};

type FormValues = DeliveryTimeType;

type IProps = {
  initialValues?: Nullable<DeliveryTimeType>;
};

const timeUnits = [
  {
    unit: 'hour',
    label: 'Hour'
  },
  {
    unit: 'day',
    label: 'Day'
  },
  {
    unit: 'week',
    label: 'Week'
  },
  {
    unit: 'month',
    label: 'Month'
  },
  {
    unit: 'year',
    label: 'Year'
  }
];

export default function CreateOrUpdateDeliveryForm({ initialValues }: IProps) {
  const router = useRouter();
  const { t } = useTranslation();

  const [error, setError] = useState(null);
  const [unsavedChanges, setUnsavedChanges] = useState(true);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors }
  } = useForm<FormValues>({
    shouldUnregister: true,
    resolver: yupResolver(deliveryValidationSchema),
    defaultValues: isEmpty(initialValues)
      ? defaultValues
      : {
          ...initialValues,
          timeUnit: timeUnits?.find(
            ({ unit }) => unit === initialValues?.timeUnit?.unit
          )
        }
  });

  const { userInfo } = useGetUser();
  const csrfToken = userInfo?.csrfToken;

  const [
    createShippingZone,
    { loading: creating, reset: resetCreateMutation }
  ] = useMutation(CREATE_DELIVERY_TIME, {
    context: {
      headers: {
        'x-csrf-token': csrfToken
      }
    },
    onCompleted: (data: { createDeliveryTime: DeliveryTimeType }) => {
      if (!isEmpty(data)) {
        reset();
        notify(t('common:successfully-created'), 'success');
        router.push(ROUTES.DELIVERY_TIME);
      }
    }
  });

  const [
    updateShippingZone,
    { loading: updating, reset: resetUpdateMutation }
  ] = useMutation(UPDATE_DELIVERY_TIME, {
    context: {
      headers: {
        'x-csrf-token': csrfToken
      }
    },
    onCompleted: (data: { updateDeliveryTime: DeliveryTimeType }) => {
      if (!isEmpty(data)) {
        notify(t('common:successfully-updated'), 'success');
        router.push(ROUTES.DELIVERY_TIME);
      }
    }
  });

  useErrorLogger(error);

  const onSubmit = async (values: DeliveryTimeType) => {
    if (values?.minValue > values?.maxValue) {
      notify('Maximum value must be larger than Minimum value', 'error');
      return;
    }

    const variables = {
      name: values?.name,
      timeUnit: { unit: values?.timeUnit?.unit },
      minValue: values?.minValue,
      maxValue: values?.maxValue
    };

    console.log({ variables });

    setUnsavedChanges(false);
    if (isEmpty(initialValues)) {
      createShippingZone({ variables }).catch((err) => {
        setError(err);
        resetCreateMutation();
      });
    } else {
      updateShippingZone({
        variables: { id: initialValues?.id, ...variables }
      }).catch((err) => {
        setError(err);
        resetUpdateMutation();
      });
    }
  };

  useWarnIfUnsavedChanges(unsavedChanges, () => {
    return confirm(t('common:UNSAVED_CHANGES'));
  });

  console.log({ errors });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-wrap my-5 sm:my-8">
        <Description
          title={t('form:item-delivery-time')}
          details={
            initialValues
              ? t('form:item-delivery-time-desc-update')
              : t('form:item-delivery-time-desc-create')
          }
          className="w-full px-0 sm:pe-4 md:pe-5 pb-5 sm:w-4/12 md:w-1/3 sm:py-8"
        />
        <Card className="w-full sm:w-8/12 md:w-2/3">
          <div className="mb-5">
            <Input
              label={t('form:input-label-name')}
              isRequiredLabel
              {...register('name')}
              error={t(errors?.name?.message!)}
              variant="outline"
              className="w-full mb-8"
            />
          </div>
          <div>
            <Label isRequiredLabel>{t('form:input-label-unit')}</Label>
            <SelectInput
              name="timeUnit"
              control={control}
              getOptionLabel={(option: any) => option.label}
              getOptionValue={(option: any) => option.unit}
              options={timeUnits}
            />
            <ValidationError message={errors?.timeUnit?.message} />
          </div>
          <div className="grid grid-cols-2 gap-5 my-8">
            <Input
              label={t('form:input-label-minimum')}
              isRequiredLabel
              {...register('minValue')}
              type="number"
              min={0}
              error={t(errors.minValue?.message!)}
              variant="outline"
              className="mb-5"
            />
            <Input
              label={t('form:input-label-maximum')}
              {...register('maxValue')}
              isRequiredLabel
              type="number"
              min={0}
              error={t(errors.maxValue?.message!)}
              variant="outline"
              className="mb-5"
            />
          </div>
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
