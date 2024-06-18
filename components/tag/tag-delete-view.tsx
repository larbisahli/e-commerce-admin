import { useMutation } from '@apollo/client';
import ConfirmationCard from '@components/common/confirmation-card';
import {
  useModalAction,
  useModalState
} from '@components/ui/modal/modal.context';
import { DELETE_TAG, TAGS } from '@graphql/tag';
import { useErrorLogger } from '@hooks/useErrorLogger';
import { useGetClient } from '@hooks/useGetClient';
import { notify } from '@lib/notify';
import { useTranslation } from 'next-i18next';
import { useState } from 'react';

const TagDeleteView = () => {
  const { t } = useTranslation();

  const [error, setError] = useState(null);

  const { userInfo } = useGetClient();
  const csrfToken = userInfo?.csrfToken;

  const [deleteAttributeValue, { loading }] = useMutation(DELETE_TAG, {
    context: {
      headers: {
        'x-csrf-token': csrfToken
      }
    },
    refetchQueries: [TAGS, 'Tags']
  });

  const { id } = useModalState();
  const { closeModal } = useModalAction();

  useErrorLogger(error);

  function handleDelete() {
    deleteAttributeValue({ variables: { id } })
      .then(({ data }) => {
        const {
          deleteTag: { id }
        } = data;
        if (id) {
          notify(t('common:successfully-deleted'), 'success');
        }
        closeModal();
      })
      .catch((err) => {
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

export default TagDeleteView;
