import { useMutation } from '@apollo/client';
import ConfirmationCard from '@components/common/confirmation-card';
import {
  useModalAction,
  useModalState
} from '@components/ui/modal/modal.context';
import { DELETE_ORDER_STATUS, ORDER_STATUSES } from '@graphql/order-status';
import { useErrorLogger } from '@hooks/useErrorLogger';
import { useAppDispatch, useGetClient } from '@hooks/useGetClient';
import { notify } from '@lib/notify';
import { setEtag } from '@store/client';
import { useTranslation } from 'next-i18next';
import { useState } from 'react';

const OrderStatusDeleteView = () => {
  const { t } = useTranslation();

  const [error, setError] = useState(null);

  const {
    userInfo: { csrfToken }
  } = useGetClient();

  const [deleteOrderStatusValue, { loading }] = useMutation(
    DELETE_ORDER_STATUS,
    {
      context: {
        headers: {
          'x-csrf-token': csrfToken
        }
      },
      refetchQueries: [
        ORDER_STATUSES,
        'OrderStatusForAdmin' // Query name
      ]
    }
  );

  const { id } = useModalState();
  const { closeModal } = useModalAction();
  const dispatch = useAppDispatch();

  useErrorLogger(error);

  async function handleDelete() {
    deleteOrderStatusValue({ variables: { id } })
      .then(({ data }) => {
        const {
          deleteOrderStatus: { id, etag }
        } = data;
        if (id) {
          dispatch(setEtag({ etag }));
          notify(t('common:successfully-deleted'), 'success');
        }
        closeModal();
      })
      .catch((err) => {
        setError(err);
      });
  }

  return (
    <ConfirmationCard
      onCancel={closeModal}
      onDelete={handleDelete}
      deleteBtnLoading={loading}
    />
  );
};

export default OrderStatusDeleteView;
