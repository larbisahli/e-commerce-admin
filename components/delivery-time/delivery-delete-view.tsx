import { useMutation } from '@apollo/client';
import ConfirmationCard from '@components/common/confirmation-card';
import {
  useModalAction,
  useModalState
} from '@components/ui/modal/modal.context';
import { DELETE_DELIVERY_TIME, DELIVERY_TIMES } from '@graphql/delivery-time';
import { useErrorLogger } from '@hooks/useErrorLogger';
import { useAppDispatch, useGetClient } from '@hooks/useGetClient';
import { notify } from '@lib/notify';
import { setEtag } from '@store/client';
import { useTranslation } from 'next-i18next';
import { useState } from 'react';

const ShippingDeleteView = () => {
  const { t } = useTranslation();

  const [error, setError] = useState(null);

  const { userInfo } = useGetClient();
  const csrfToken = userInfo?.csrfToken;

  const [deleteShipping, { loading }] = useMutation(DELETE_DELIVERY_TIME, {
    context: {
      headers: {
        'x-csrf-token': csrfToken
      }
    },
    refetchQueries: [
      DELIVERY_TIMES,
      'DeliveryTimes' // Query name
    ]
  });

  const { id } = useModalState();
  const { closeModal } = useModalAction();
  const dispatch = useAppDispatch();

  useErrorLogger(error);

  async function handleDelete() {
    deleteShipping({ variables: { id } })
      .then(({ data }) => {
        const {
          deleteDeliveryTime: { id: shipId, etag }
        } = data;
        if (shipId) {
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

export default ShippingDeleteView;
