import { useMutation } from '@apollo/client';
import ConfirmationCard from '@components/common/confirmation-card';
import {
  useModalAction,
  useModalState
} from '@components/ui/modal/modal.context';
import { ATTRIBUTES, DELETE_ATTRIBUTE } from '@graphql/attribute';
import { useErrorLogger } from '@hooks/useErrorLogger';
import { useGetUser } from '@hooks/useGetUser';
import { notify } from '@lib/notify';
import { useTranslation } from 'next-i18next';
import { useState } from 'react';

const AttributeDeleteView = () => {
  const { t } = useTranslation();

  const [error, setError] = useState(null);

  const { userInfo } = useGetUser();
  const csrfToken = userInfo?.csrfToken;

  const [deleteAttributeValue, { loading }] = useMutation(DELETE_ATTRIBUTE, {
    context: {
      headers: {
        'x-csrf-token': csrfToken
      }
    },
    refetchQueries: [
      ATTRIBUTES,
      'Attributes' // Query name
    ]
  });

  const { id } = useModalState();
  const { closeModal } = useModalAction();

  useErrorLogger(error);

  async function handleDelete() {
    deleteAttributeValue({ variables: { id } })
      .then(({ data }) => {
        const {
          deleteAttribute: { id }
        } = data;
        if (id) {
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

export default AttributeDeleteView;
