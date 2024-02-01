import { useMutation } from '@apollo/client';
import Card from '@components/common/card';
import { LanguageDefaultDescInfo } from '@components/common/commonComponents';
import FormActions from '@components/common/FormActions';
import ColorPicker from '@components/ui/color-picker/color-picker';
import DisplayColorCode from '@components/ui/color-picker/display-color-code';
import Description from '@components/ui/description';
import Input from '@components/ui/input';
import Label from '@components/ui/label';
import Radio from '@components/ui/radio';
import SelectInput from '@components/ui/select-input';
import {
  CREATE_ORDER_STATUS,
  UPDATE_ORDER_STATUS
} from '@graphql/order-status';
import { yupResolver } from '@hookform/resolvers/yup';
import { useGetUser } from '@hooks/index';
import { useErrorLogger } from '@hooks/useErrorLogger';
import { useSettings } from '@hooks/useSettings';
import { notify } from '@lib/notify';
import { OrderStatus, PrivacyType } from '@ts-types/generated';
import { ROUTES } from '@utils/routes';
import { translationFallback } from '@utils/utils';
import isEmpty from 'lodash/isEmpty';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { orderStatusValidationSchema } from './order-status-validation-schema';

const statuses = [
  { value: 'processing', label: 'Processing' },
  { value: 'canceled', label: 'Canceled' },
  { value: 'closed', label: 'Closed' },
  { value: 'complete', label: 'Complete' },
  { value: 'fraud', label: 'Fraud' },
  { value: 'held', label: 'Held' },
  { value: 'pending', label: 'Pending' },
  { value: 'payment_review', label: 'Payment Review' },
  { value: 'pending_payment', label: 'Pending Payment' },
  { value: 'payment_canceled', label: 'Payment Canceled' },
  { value: 'paypal_canceled_reversal', label: 'Paypal Canceled Reversal' },
  { value: 'paypal_reversed', label: 'Paypal Reversed' },
  { value: 'pending_paypal', label: 'Pending Paypal' }
];

type FormValues = {
  label: string;
  color: string;
  status: { value: string };
  privacy: PrivacyType;
};
const defaultValues = {
  label: '',
  privacy: PrivacyType.Private,
  status: { value: 'processing', label: 'Processing' },
  color: '#9cd864'
};
export default function CreateOrUpdateOrderStatusForm({
  initialValues
}: {
  initialValues?: OrderStatus | any;
}) {
  const router = useRouter();
  const { t } = useTranslation();

  const { selectedLanguage } = useSettings();

  const [error, setError] = useState(null);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors }
  } = useForm<FormValues>({
    shouldUnregister: true,
    resolver: yupResolver(orderStatusValidationSchema),
    defaultValues:
      {
        ...initialValues,
        status: statuses?.find((s) => s.value === initialValues?.status)
      } ?? defaultValues
  });

  const { userInfo } = useGetUser();
  const csrfToken = userInfo?.csrfToken;

  const [createOrderStatus, { loading: creating }] = useMutation(
    CREATE_ORDER_STATUS,
    {
      context: {
        headers: {
          'x-csrf-token': csrfToken
        }
      },
      onCompleted: (data: { createOrderStatus: OrderStatus }) => {
        const { id } = data.createOrderStatus;
        if (id) {
          notify(t('common:successfully-created'), 'success');
          router.push(`${ROUTES.ORDER_STATUS}/edit/${id}`);
        }
      }
    }
  );

  const [updateOrderStatus, { loading: updating }] = useMutation(
    UPDATE_ORDER_STATUS,
    {
      context: {
        headers: {
          'x-csrf-token': csrfToken
        }
      },
      onCompleted: (data: { updateOrderStatus: OrderStatus }) => {
        if (!isEmpty(data)) {
          notify(t('common:successfully-updated'), 'success');
        }
      }
    }
  );

  useErrorLogger(error);

  const onSubmit = async (values: FormValues) => {
    if (isEmpty(initialValues)) {
      createOrderStatus({
        variables: {
          label: values.label,
          status: values.status.value,
          color: values.color,
          privacy: values.privacy,
          language: selectedLanguage
        }
      }).catch((err) => {
        setError(err);
      });
    } else {
      updateOrderStatus({
        variables: {
          id: initialValues.id,
          label: values.label,
          status: values.status.value,
          color: values.color,
          privacy: values.privacy,
          language: selectedLanguage
        }
      }).catch((err) => {
        setError(err);
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormActions
        backLink={ROUTES.ORDER_STATUS}
        forceSystemLang={isEmpty(initialValues)}
        title={
          isEmpty(initialValues)
            ? t('form:form-title-new-order-status')
            : t('form:form-title-edit-order-status')
        }
        loading={creating || updating}
        disabled={creating || updating}
      />
      <LanguageDefaultDescInfo
        label="New order status"
        isVisible={isEmpty(initialValues)}
      />
      <div className="my-5 flex flex-wrap sm:my-8">
        <Description
          title={t('form:input-label-description')}
          details={`${
            initialValues
              ? t('form:button-label-update')
              : t('form:button-label-add')
          } ${t('form:order-status-description-helper-text')}`}
          className="w-full px-0 pb-5 sm:w-4/12 sm:py-8 sm:pe-4 md:w-1/3 md:pe-5"
        />

        <Card className="w-full sm:w-8/12 md:w-2/3">
          <div className="my-5">
            <Label isRequiredLabel>{t('form:input-label-status')}</Label>
            <SelectInput
              name="status"
              control={control}
              getOptionLabel={(option: any) => option.label}
              getOptionValue={(option: any) => option.value}
              options={statuses}
            />
          </div>
          <Input
            label={t('form:input-label')}
            isRequiredLabel
            {...register('label')}
            error={t(errors.label?.message!)}
            placeholder={translationFallback(
              initialValues,
              'label',
              'Enter status label'
            )}
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
            className="mt-5 pb-10"
          >
            <DisplayColorCode control={control} />
          </ColorPicker>
        </Card>
      </div>
    </form>
  );
}
