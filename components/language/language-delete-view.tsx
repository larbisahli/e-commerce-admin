import { useMutation } from '@apollo/client';
import ConfirmationCard from '@components/common/confirmation-card';
import {
  useModalAction,
  useModalState
} from '@components/ui/modal/modal.context';
import { DELETE_LANGUAGE, LANGUAGES } from '@graphql/language';
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

  const [deleteLanguage, { loading }] = useMutation(DELETE_LANGUAGE, {
    context: {
      headers: {
        'x-csrf-token': csrfToken
      }
    },
    refetchQueries: [LANGUAGES, 'Languages']
  });

  const { id, meta } = useModalState();
  const { closeModal } = useModalAction();

  useErrorLogger(error);

  function handleDelete() {
    deleteLanguage({ variables: { id, localeId: meta.localeId } })
      .then(({ data }) => {
        const {
          deleteLanguage: { id }
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

export default TagDeleteView;
