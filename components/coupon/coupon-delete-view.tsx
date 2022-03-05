import { useMutation } from '@apollo/client';
import ConfirmationCard from '@components/common/confirmation-card';
import {
  useModalAction,
  useModalState
} from '@components/ui/modal/modal.context';
import { COUPONS, DELETE_COUPON } from '@graphql/coupons';
import { useErrorLogger } from '@hooks/useErrorLogger';

const CouponDeleteView = () => {
  const [deleteCoupon, { loading, error }] = useMutation(DELETE_COUPON, {
    refetchQueries: [
      COUPONS,
      'CouponsForAdmin' // Query name
    ]
  });

  const { id } = useModalState();
  const { closeModal } = useModalAction();

  useErrorLogger(error);

  async function handleDelete() {
    deleteCoupon({ variables: { id } });
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

export default CouponDeleteView;
