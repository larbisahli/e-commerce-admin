import { useMutation } from '@apollo/client';
import ConfirmationCard from '@components/common/confirmation-card';
import {
  useModalAction,
  useModalState
} from '@components/ui/modal/modal.context';
import { DELETE_ORDER_STATUS, ORDER_STATUSES } from '@graphql/order_status';
import { useErrorLogger } from '@hooks/useErrorLogger';

const OrderStatusDeleteView = () => {
  const [deleteOrderStatusValue, { loading, error }] = useMutation(
    DELETE_ORDER_STATUS,
    {
      refetchQueries: [
        ORDER_STATUSES,
        'OrderStatusForAdmin' // Query name
      ]
    }
  );

  const { id } = useModalState();
  const { closeModal } = useModalAction();

  useErrorLogger(error);

  async function handleDelete() {
    deleteOrderStatusValue({ variables: { id } });
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

export default OrderStatusDeleteView;
