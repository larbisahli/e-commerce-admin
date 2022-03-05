import { useMutation } from '@apollo/client';
import ConfirmationCard from '@components/common/confirmation-card';
import {
  useModalAction,
  useModalState
} from '@components/ui/modal/modal.context';
import { DELETE_SHIPPING, SHIPPINGS } from '@graphql/shipping';
import { useErrorLogger } from '@hooks/useErrorLogger';

const ShippingDeleteView = () => {
  const [deleteShipping, { loading, error }] = useMutation(DELETE_SHIPPING, {
    refetchQueries: [
      SHIPPINGS,
      'Shippings' // Query name
    ]
  });

  const { id } = useModalState();
  const { closeModal } = useModalAction();

  useErrorLogger(error);

  async function handleDelete() {
    deleteShipping({ variables: { id } });
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
