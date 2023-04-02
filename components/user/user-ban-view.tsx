import { useMutation } from '@apollo/client';
import ConfirmationCard from '@components/common/confirmation-card';
import {
  useModalAction,
  useModalState
} from '@components/ui/modal/modal.context';
import { BAN_USER, USERS } from '@graphql/user';
import { useErrorLogger } from '@hooks/useErrorLogger';
import { useState } from 'react';

const UserBanView = () => {
  const [error, setError] = useState(null);
  const [BanUser, { loading }] = useMutation(BAN_USER, {
    refetchQueries: [
      USERS,
      'Users' // Query name
    ]
  });

  const { id, meta } = useModalState();
  const { closeModal } = useModalAction();

  useErrorLogger(error);

  async function handleDelete() {
    if (meta === 'ban') {
      // Block user
      BanUser({
        variables: {
          id,
          active: false
        }
      }).catch((err) => {
        setError(err);
      });
    } else {
      // Unblock user
      BanUser({
        variables: {
          id,
          active: true
        }
      }).catch((err) => {
        setError(err);
      });
    }
    closeModal();
  }
  return (
    <ConfirmationCard
      onCancel={closeModal}
      onDelete={handleDelete}
      deleteBtnText={meta === 'ban' ? 'Block' : 'Unblock'}
      title={meta === 'ban' ? 'Block User' : 'Unblock User'}
      description={
        meta === 'ban'
          ? 'Are you sure you want to block this User?'
          : 'Are you sure you want to unblock this User?'
      }
      deleteBtnLoading={loading}
    />
  );
};

export default UserBanView;
