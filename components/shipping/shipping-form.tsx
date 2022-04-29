import { useMutation } from '@apollo/client';
import Card from '@components/common/card';
import Button from '@components/ui/button';
import Description from '@components/ui/description';
import FileInput from '@components/ui/file-input';
import Input from '@components/ui/input';
import { CREATE_SHIPPING, UPDATE_SHIPPING } from '@graphql/shipping';
import { yupResolver } from '@hookform/resolvers/yup';
import { useErrorLogger, useWarnIfUnsavedChanges } from '@hooks/index';
import { notify } from '@lib/notify';
import { Nullable } from '@ts-types/custom.types';
import { Shipping } from '@ts-types/generated';
import { ROUTES } from '@utils/routes';
import isEmpty from 'lodash/isEmpty';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { shippingValidationSchema } from './shipping-validation-schema';

const defaultValues = {
  shipper_name: '',
  active: true,
  thumbnail: null
};

type FormValues = Shipping;

type IProps = {
  initialValues?: Nullable<Shipping>;
};

export default function CreateOrUpdateShippingForm({ initialValues }: IProps) {
  const router = useRouter();
  const { t } = useTranslation();

  const [unsavedChanges, setUnsavedChanges] = useState<string[]>([]);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors }
  } = useForm<FormValues>({
    shouldUnregister: true,
    resolver: yupResolver(shippingValidationSchema),
    defaultValues: initialValues
      ? {
          ...initialValues
        }
      : defaultValues
  });

  const [createShipping, { loading: creating, error: createShippingError }] =
    useMutation(CREATE_SHIPPING, {
      onCompleted: (data: { createShipping: Shipping }) => {
        if (!isEmpty(data)) {
          setUnsavedChanges([]);
          reset();
          notify(t('common:successfully-created'), 'success');
          router.push(ROUTES.SHIPPINGS);
        }
      }
    });

  const [updateShipping, { loading: updating, error: updateShippingError }] =
    useMutation(UPDATE_SHIPPING, {
      onCompleted: (data: { updateShipping: Shipping }) => {
        if (!isEmpty(data)) {
          notify(t('common:successfully-updated'), 'success');
          setUnsavedChanges([]);
          router.push(ROUTES.SHIPPINGS);
        }
      }
    });

  useErrorLogger(createShippingError);
  useErrorLogger(updateShippingError);

  const onSubmit = async (values: Shipping) => {
    if (isEmpty(values.thumbnail)) {
      notify(t('form:error-logo-required'), 'warning');
    }

    const variables = {
      ...values,
      active: true,
      thumbnail: {
        image: values.thumbnail?.image,
        placeholder: values.thumbnail?.placeholder
      }
    };

    if (isEmpty(initialValues)) {
      createShipping({ variables });
    } else {
      updateShipping({ variables: { id: initialValues?.id, ...variables } });
    }
  };

  useWarnIfUnsavedChanges(!isEmpty(unsavedChanges), () => {
    return confirm(t('common:UNSAVED_IMAGE'));
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-wrap pb-8 border-b border-dashed border-border-base my-5 sm:my-8">
        <Description
          title={t('form:input-label-logo')}
          details={t('form:shipper-logo-helper-text')}
          className="w-full px-0 sm:pe-4 md:pe-5 pb-5 sm:w-4/12 md:w-1/3 sm:py-8"
        />

        <Card className="w-full sm:w-8/12 md:w-2/3">
          <FileInput
            name="thumbnail"
            control={control}
            multiple={false}
            setUnsavedChanges={setUnsavedChanges}
          />
        </Card>
      </div>

      <div className="flex flex-wrap my-5 sm:my-8">
        <Description
          title={t('form:item-description')}
          details={`${
            initialValues
              ? t('form:item-description-update')
              : t('form:item-description-add')
          } ${t('form:shipping-form-info-help-text')}`}
          className="w-full px-0 sm:pe-4 md:pe-5 pb-5 sm:w-4/12 md:w-1/3 sm:py-8"
        />
        <Card className="w-full sm:w-8/12 md:w-2/3">
          <Input
            label={t('form:input-label-name')}
            {...register('shipper_name', { required: 'Name is required' })}
            error={t(errors.shipper_name?.message!)}
            variant="outline"
            className="mb-5"
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

        <Button loading={creating || updating} disabled={creating || updating}>
          {initialValues
            ? t('form:button-label-update')
            : t('form:button-label-add')}{' '}
          {t('form:button-label-shipping')}
        </Button>
      </div>
    </form>
  );
}
