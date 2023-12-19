import { useMutation } from '@apollo/client';
import ConfirmationCard from '@components/common/confirmation-card';
import {
  useModalAction,
  useModalState
} from '@components/ui/modal/modal.context';
import { DELETE_TAX } from '@graphql/tax';
import { useErrorLogger } from '@hooks/useErrorLogger';
import { useGetUser } from '@hooks/useGetUser';
import { notify } from '@lib/notify';
import { useTranslation } from 'next-i18next';
import { useState } from 'react';

const SliderDeleteView = () => {
  const { t } = useTranslation();

  const [error, setError] = useState(null);

  const { userInfo } = useGetUser();
  const csrfToken = userInfo?.csrfToken;

  const [deleteTax, { loading }] = useMutation(DELETE_TAX, {
    context: {
      headers: {
        'x-csrf-token': csrfToken
      }
    },
    refetchQueries: [
      'Taxes' // Query name
    ]
  });

  const { id } = useModalState();
  const { closeModal } = useModalAction();

  useErrorLogger(error);

  async function handleDelete() {
    deleteTax({ variables: { id } })
      .then(({ data }) => {
        const {
          deleteTax: { id }
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

export default SliderDeleteView;
