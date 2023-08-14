import { useMutation } from '@apollo/client';
import ConfirmationCard from '@components/common/confirmation-card';
import {
  useModalAction,
  useModalState
} from '@components/ui/modal/modal.context';
import { DELETE_USER, USERS } from '@graphql/user';
import { useErrorLogger } from '@hooks/useErrorLogger';
import { useGetUser } from '@hooks/useGetUser';
import { notify } from '@lib/index';
import { UserType } from '@ts-types/generated';
import { useTranslation } from 'next-i18next';
import { useState } from 'react';

const UserDeleteView = () => {
  const { t } = useTranslation();

  const [error, setError] = useState(null);

  const { userInfo } = useGetUser();
  const csrfToken = userInfo?.csrfToken;

  const [deleteAttributeValue, { loading }] = useMutation(DELETE_USER, {
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

  const { id } = useModalState();
  const { closeModal } = useModalAction();

  useErrorLogger(error);

  async function handleDelete() {
    console.log('DELETE');
    deleteAttributeValue({
      variables: { id }
    })
      .catch((err) => {
        setError(err);
      })
      .then(({ data = {} }: { data: { deleteUser?: UserType } }) => {
        const { deleteUser: { firstName, lastName } = {} } = data;
        console.log('----------->', { data });
        if (firstName || lastName) {
          notify(
            `${t(
              'common:sidebar-nav-item-user'
            )} '${firstName} ${lastName}' ${t('common:successfully-deleted')}`,
            'success'
          );
          closeModal();
        }
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

export default UserDeleteView;
