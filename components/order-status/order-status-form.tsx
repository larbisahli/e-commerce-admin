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
import { useGetClient } from '@hooks/index';
import { useErrorLogger } from '@hooks/useErrorLogger';
import { useAppDispatch } from '@hooks/useGetClient';
import { useSettings } from '@hooks/useSettings';
import { notify } from '@lib/notify';
import { setEtag } from '@store/client';
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
  {
    value: 'processing',
    label: 'Processing',
    description:
      'Customer started the checkout process, but did not complete it.'
  },
  {
    value: 'canceled',
    label: 'Canceled',
    description:
      'Seller has cancelled an order, due to a stock inconsistency or other reasons.'
  },
  {
    value: 'declined',
    label: 'Declined',
    description:
      'Seller has marked the order as declined for lack of manual payment, or other reasons.'
  },
  {
    value: 'incomplete',
    label: 'Incomplete',
    description:
      'An incomplete order happens when a shopper reached the payment page, but did not complete the transaction.'
  },
  {
    value: 'refunded',
    label: 'Refunded',
    description: 'Seller has used the Refund action.'
  },
  {
    value: 'completed',
    label: 'Completed',
    description:
      'Client has paid for their digital product and their file(s) are available for download.'
  },
  {
    value: 'shipped',
    label: 'Shipped',
    description:
      'Order has been shipped, but receipt has not been confirmed; seller has used the Ship Items action.'
  },
  { value: 'fraud', label: 'Fraud', description: 'Suspected Fraud.' },
  { value: 'held', label: 'Held', description: 'Order on hold.' },
  {
    value: 'pending',
    label: 'Pending',
    description:
      'Customer started the checkout process, but did not complete it.'
  },
  {
    value: 'payment_review',
    label: 'Payment Review',
    description:
      'Customer has completed checkout process, but payment has yet to be confirmed.'
  },
  {
    value: 'pending_payment',
    label: 'Pending Payment',
    description:
      'Customer has completed checkout process, but payment has yet to be confirmed.'
  },
  {
    value: 'payment_canceled',
    label: 'Payment Canceled',
    description: 'Seller has cancelled payment'
  },
  {
    value: 'disputed',
    label: 'Disputed',
    description:
      'Customer has initiated a dispute resolution process for the PayPal transaction that paid for the order.'
  },
  {
    value: 'manual_verification_required',
    label: 'Manual Verification Required',
    description:
      'Order on hold while some aspect needs to be manually confirmed.'
  }
];

type FormValues = {
  label: string;
  color: string;
  status: { value: string; label: string; description: string };
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
  const dispatch = useAppDispatch();

  const [error, setError] = useState(null);
  const {
    register,
    handleSubmit,
    control,
    watch,
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

  const { userInfo } = useGetClient();
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
        if (!isEmpty(data?.updateOrderStatus)) {
          const { etag: newEtag } = data?.updateOrderStatus ?? {};
          dispatch(setEtag({ etag: newEtag }));
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

  const status = watch('status');

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
            <p className="pt-1 text-xs text-gray-500">{status?.description}</p>
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
            className="mt-5 flex items-center justify-between pb-10"
          >
            <DisplayColorCode control={control} />
          </ColorPicker>
        </Card>
      </div>
    </form>
  );
}
