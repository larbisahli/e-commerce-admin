import { useMutation } from '@apollo/client';
import ConfirmationCard from '@components/common/confirmation-card';
import {
  useModalAction,
  useModalState
} from '@components/ui/modal/modal.context';
import { BAN_USER, USERS } from '@graphql/user';
import { useErrorLogger } from '@hooks/useErrorLogger';
import { useGetClient } from '@hooks/useGetClient';
import { notify } from '@lib/notify';
import { useTranslation } from 'next-i18next';
import { useState } from 'react';

const UserBanView = () => {
  const { t } = useTranslation();

  const [error, setError] = useState(null);

  const { userInfo } = useGetClient();
  const csrfToken = userInfo?.csrfToken;

  const [BanUser, { loading }] = useMutation(BAN_USER, {
    context: {
      headers: {
        'x-csrf-token': csrfToken
      }
    },
    refetchQueries: [
      USERS,
      'Users' // Query name
    ]
  });

  const { id, meta } = useModalState();
  const { closeModal } = useModalAction();

  useErrorLogger(error);

  console.log({ error });

  async function handleDelete() {
    if (meta === 'ban') {
      // Block user
      BanUser({
        variables: {
          id,
          active: false
        }
      })
        .then(({ data }) => {
          const {
            banUser: { id }
          } = data;
          if (id) {
            notify(t('common:successfully-blocked'), 'success');
          }
          closeModal();
        })
        .catch((err) => {
          setError(err);
        });
    } else {
      // Unblock user
      BanUser({
        variables: {
          id,
          active: true
        }
      })
        .then(({ data }) => {
          const {
            banUser: { id }
          } = data;
          if (id) {
            notify(t('common:successfully-unblocked'), 'success');
          }
          closeModal();
        })
        .catch((err) => {
          setError(err);
        });
    }
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
