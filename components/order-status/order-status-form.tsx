import { useMutation } from '@apollo/client';
import Card from '@components/common/card';
import { SaveIcon } from '@components/icons/save-icon';
import Button from '@components/ui/button';
import ColorPicker from '@components/ui/color-picker/color-picker';
import DisplayColorCode from '@components/ui/color-picker/display-color-code';
import Description from '@components/ui/description';
import Input from '@components/ui/input';
import Label from '@components/ui/label';
import Radio from '@components/ui/radio';
import {
  CREATE_ORDER_STATUS,
  UPDATE_ORDER_STATUS
} from '@graphql/order-status';
import { yupResolver } from '@hookform/resolvers/yup';
import { useErrorLogger } from '@hooks/useErrorLogger';
import { notify } from '@lib/notify';
import { OrderStatus, PrivacyType } from '@ts-types/generated';
import { ROUTES } from '@utils/routes';
import isEmpty from 'lodash/isEmpty';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { orderStatusValidationSchema } from './order-status-validation-schema';

type FormValues = {
  status_name: string;
  color: string;
  privacy: PrivacyType;
};
const defaultValues = {
  status_name: '',
  privacy: PrivacyType.Private,
  color: '#9cd864'
};
export default function CreateOrUpdateOrderStatusForm({
  initialValues
}: {
  initialValues?: OrderStatus;
}) {
  const router = useRouter();
  const { t } = useTranslation();

  const [error, setError] = useState(null);
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors }
  } = useForm<FormValues>({
    shouldUnregister: true,
    resolver: yupResolver(orderStatusValidationSchema),
    defaultValues: initialValues ?? defaultValues
  });

  const [createOrderStatus, { loading: creating }] = useMutation(
    CREATE_ORDER_STATUS,
    {
      onCompleted: (data: { createTag: OrderStatus }) => {
        if (!isEmpty(data)) {
          notify(t('common:successfully-created'), 'success');
          reset();
          router.push(ROUTES.ORDER_STATUS);
        }
      }
    }
  );

  const [updateOrderStatus, { loading: updating }] = useMutation(
    UPDATE_ORDER_STATUS,
    {
      onCompleted: (data: { updateTag: OrderStatus }) => {
        if (!isEmpty(data)) {
          notify(t('common:successfully-updated'), 'success');
          router.push(ROUTES.ORDER_STATUS);
        }
      }
    }
  );

  useErrorLogger(error);

  const onSubmit = async (values: FormValues) => {
    if (isEmpty(initialValues)) {
      createOrderStatus({
        variables: {
          status_name: values.status_name,
          color: values.color,
          privacy: values.privacy
        }
      }).catch((err) => {
        setError(err);
      });
    } else {
      updateOrderStatus({
        variables: {
          // id: initialValues.id,
          status_name: values.status_name,
          color: values.color,
          privacy: values.privacy
        }
      }).catch((err) => {
        setError(err);
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-wrap my-5 sm:my-8">
        <Description
          title={t('form:input-label-description')}
          details={`${
            initialValues
              ? t('form:button-label-update')
              : t('form:button-label-add')
          } ${t('form:order-status-description-helper-text')}`}
          className="w-full px-0 sm:pe-4 md:pe-5 pb-5 sm:w-4/12 md:w-1/3 sm:py-8"
        />

        <Card className="w-full sm:w-8/12 md:w-2/3">
          <Input
            label={t('form:input-label-name')}
            {...register('status_name')}
            error={t(errors.status_name?.message!)}
            variant="outline"
            className="mb-5"
          />
          <div>
            <Label>{t('form:input-label-privacy')}</Label>
            <Radio
              {...register('privacy')}
              label={t('form:input-label-private')}
              id={PrivacyType.Private}
              value={PrivacyType.Private}
              className="mb-2"
            />
            <Radio
              {...register('privacy')}
              id={PrivacyType.Public}
              label={t('form:input-label-public')}
              value={PrivacyType.Public}
            />
          </div>
          <ColorPicker
            label={t('form:input-label-color')}
            {...register('color')}
            error={t(errors.color?.message!)}
            className="mt-5"
          >
            <DisplayColorCode control={control} />
          </ColorPicker>
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
          <div className="mr-1">
            <SaveIcon width="1.3rem" height="1.3rem" />
          </div>
          <div>{t('form:button-label-save')}</div>
        </Button>
      </div>
    </form>
  );
}
