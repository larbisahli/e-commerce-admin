import { useMutation } from '@apollo/client';
import Card from '@components/common/card';
import FormActions from '@components/common/FormActions';
import Description from '@components/ui/description';
import Input from '@components/ui/input';
import { UPDATE_ORDER_STATUS } from '@graphql/order-status';
import { yupResolver } from '@hookform/resolvers/yup';
import { useGetClient } from '@hooks/index';
import { useErrorLogger } from '@hooks/useErrorLogger';
import { useAppDispatch } from '@hooks/useGetClient';
import { notify } from '@lib/notify';
import { setEtag } from '@store/client';
import { OrderStatus } from '@ts-types/generated';
import { ROUTES } from '@utils/routes';
import isEmpty from 'lodash/isEmpty';
import { useTranslation } from 'next-i18next';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { orderStatusValidationSchema } from './order-status-validation-schema';
import Button from '@components/ui/button';

export const defaultOrderStatus = [
  {
    id: 'pending',
    status: 'Pending'
  },
  {
    id: 'awaiting_payment',
    status: 'Awaiting Payment'
  },
  {
    id: 'awaiting_fulfillment',
    status: 'Awaiting Fulfillment'
  },
  {
    id: 'awaiting_shipment',
    status: 'Awaiting Shipment'
  },
  {
    id: 'awaiting_pickup',
    status: 'Awaiting Pickup'
  },
  {
    id: 'partially_shipped',
    status: 'Partially Shipped'
  },
  {
    id: 'completed',
    status: 'Completed'
  },
  {
    id: 'shipped',
    status: 'Shipped'
  },
  {
    id: 'cancelled',
    status: 'Cancelled'
  },
  {
    id: 'declined',
    status: 'Declined'
  },
  {
    id: 'refunded',
    status: 'Refunded'
  },
  {
    id: 'disputed',
    status: 'Disputed'
  },
  {
    id: 'manual_verification_required',
    status: 'Manual Verification Required'
  },
  {
    id: 'partially_refunded',
    status: 'Partially Refunded'
  }
];

type FormValues = {
  status: string;
};
const defaultValues = {
  status: ''
};
export default function CreateOrUpdateOrderStatusForm({
  initialValues
}: {
  initialValues?: OrderStatus | any;
}) {
  const { t } = useTranslation();

  const dispatch = useAppDispatch();

  const [error, setError] = useState(null);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm<FormValues>({
    shouldUnregister: true,
    resolver: yupResolver(orderStatusValidationSchema),
    defaultValues: initialValues ?? defaultValues
  });

  const { userInfo } = useGetClient();
  const csrfToken = userInfo?.csrfToken;

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
    updateOrderStatus({
      variables: {
        id: initialValues.id,
        status: values.status
      }
    }).catch((err) => {
      setError(err);
    });
  };

  const restoreDefault = (e) => {
    e.preventDefault();
    const defaultValue = defaultOrderStatus?.find(
      (status) => status.id === initialValues.id
    );
    setValue('status', defaultValue.status);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormActions
        backLink={ROUTES.ORDER_STATUS}
        title={t('form:form-title-edit-order-status')}
        loading={updating}
        disabled={updating}
        showSelectLanguage={false}
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
          <Input
            label={t('form:input-label-status')}
            isRequiredLabel
            {...register('status')}
            error={t(errors.status?.message!)}
            placeholder={'Enter status label'}
            variant="outline"
            className="mb-5"
          />
          <div className="flex justify-end">
            <Button variant="outline" onClick={restoreDefault}>
              Restore to default
            </Button>
          </div>
        </Card>
      </div>
    </form>
  );
}
