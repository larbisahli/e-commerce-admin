import { useMutation } from '@apollo/client';
import Card from '@components/common/card';
import { LanguageDefaultDescInfo } from '@components/common/commonComponents';
import FormActions from '@components/common/FormActions';
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
  useGetClient,
  useWarnIfUnsavedChanges
} from '@hooks/index';
import { useSettings } from '@hooks/useSettings';
import { notify } from '@lib/notify';
import { Nullable } from '@ts-types/custom.types';
import { DeliveryTimeType } from '@ts-types/generated';
import { ROUTES } from '@utils/routes';
import { translationFallback } from '@utils/utils';
import isEmpty from 'lodash/isEmpty';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { deliveryValidationSchema } from './delivery-validation-schema';

const defaultValues = {
  name: '',
  unit: null,
  min: null,
  max: null
};

type FormValues = DeliveryTimeType;

type IProps = {
  initialValues?: Nullable<DeliveryTimeType>;
};

const units = [
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

  const { selectedLanguage } = useSettings();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors }
  } = useForm<FormValues>({
    shouldUnregister: true,
    resolver: yupResolver(deliveryValidationSchema),
    defaultValues: isEmpty(initialValues)
      ? defaultValues
      : {
          ...initialValues,
          unit: units?.find(({ unit }) => unit === initialValues?.unit?.unit)
        }
  });

  const { userInfo } = useGetClient();
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
      const { id } = data.createDeliveryTime;
      if (id) {
        notify(t('common:successfully-created'), 'success');
        router.push(`${ROUTES.DELIVERY_TIME}/edit/${id}`);
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
      }
    }
  });

  useErrorLogger(error);

  const onSubmit = async (values: DeliveryTimeType) => {
    if (values?.min > values?.max) {
      notify('Maximum value must be larger than Minimum value', 'error');
      return;
    }

    const variables = {
      name: values?.name,
      unit: { unit: values?.unit?.unit },
      min: values?.min,
      max: values?.max,
      language: selectedLanguage
    };

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

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormActions
        backLink={ROUTES.DELIVERY_TIME}
        forceSystemLang={isEmpty(initialValues)}
        title={
          isEmpty(initialValues)
            ? t('form:form-title-new-manufacturer')
            : t('form:form-title-edit-manufacturer')
        }
        loading={creating || updating}
        disabled={creating || updating}
      />
      <LanguageDefaultDescInfo
        label="New delivery time"
        isVisible={isEmpty(initialValues)}
      />
      <div className="my-5 flex flex-wrap sm:my-8">
        <Description
          title={t('form:item-delivery-time')}
          details={
            initialValues
              ? t('form:item-delivery-time-desc-update')
              : t('form:item-delivery-time-desc-create')
          }
          className="w-full px-0 pb-5 sm:w-1/4 sm:py-8 sm:pe-4 md:w-1/4 md:pe-5"
        />
        <Card className="w-full sm:w-3/4 md:w-3/4">
          <div className="mb-5">
            <Input
              label={t('form:input-label-name')}
              isRequiredLabel
              {...register('name')}
              placeholder={translationFallback(
                initialValues,
                'name',
                'Enter name'
              )}
              error={t(errors?.name?.message!)}
              variant="outline"
              className="mb-8 w-full"
            />
          </div>
          <div>
            <Label isRequiredLabel>{t('form:input-label-unit')}</Label>
            <SelectInput
              name="unit"
              control={control}
              getOptionLabel={(option: any) => option.label}
              getOptionValue={(option: any) => option.unit}
              options={units}
            />
            <ValidationError message={errors?.unit?.message} />
          </div>
          <div className="my-8 grid grid-cols-2 gap-5">
            <Input
              label={t('form:input-label-minimum')}
              isRequiredLabel
              {...register('min')}
              type="number"
              min={0}
              error={t(errors.min?.message!)}
              variant="outline"
              className="mb-5"
            />
            <Input
              label={t('form:input-label-maximum')}
              {...register('max')}
              isRequiredLabel
              type="number"
              min={0}
              error={t(errors.max?.message!)}
              variant="outline"
              className="mb-5"
            />
          </div>
        </Card>
      </div>
    </form>
  );
}
