import { useMutation } from '@apollo/client';
import ConfirmationCard from '@components/common/confirmation-card';
import {
  useModalAction,
  useModalState
} from '@components/ui/modal/modal.context';
import { DELETE_SHIPPING, SHIPPING_ZONES } from '@graphql/shipping-zone';
import { useErrorLogger } from '@hooks/useErrorLogger';
import { useState } from 'react';

const ShippingDeleteView = () => {
  const [error, setError] = useState(null);
  const [deleteShipping, { loading }] = useMutation(DELETE_SHIPPING, {
    refetchQueries: [
      SHIPPING_ZONES,
      'Shippings' // Query name
    ]
  });

  const { id } = useModalState();
  const { closeModal } = useModalAction();

  useErrorLogger(error);

  async function handleDelete() {
    deleteShipping({ variables: { id } }).catch((err) => {
      setError(err);
    });
    closeModal();
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
