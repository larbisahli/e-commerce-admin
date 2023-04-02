import { useMutation } from '@apollo/client';
import ConfirmationCard from '@components/common/confirmation-card';
import {
  useModalAction,
  useModalState
} from '@components/ui/modal/modal.context';
import { DELETE_IMAGE, PHOTOS } from '@graphql/photo';
import { useErrorLogger } from '@hooks/useErrorLogger';
import { useState } from 'react';

const CouponDeleteView = () => {
  const [error, setError] = useState(null);
  const [deletePhoto, { loading }] = useMutation(DELETE_IMAGE, {
    refetchQueries: [
      PHOTOS,
      'photos' // Query name
    ]
  });

  const { id } = useModalState();
  const { closeModal } = useModalAction();

  useErrorLogger(error);

  async function handleDelete() {
    deletePhoto({ variables: { id } }).catch((err) => {
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

export default CouponDeleteView;
