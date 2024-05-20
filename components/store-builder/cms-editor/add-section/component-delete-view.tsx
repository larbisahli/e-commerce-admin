import { useMutation } from '@apollo/client';
import ConfirmationCard from '@components/common/confirmation-card';
import {
  useModalAction,
  useModalState
} from '@components/ui/modal/modal.context';
import { DELETE_LAYOUT_COMPONENT, STORE_LAYOUTS } from '@graphql/content';
import { useErrorLogger } from '@hooks/useErrorLogger';
import { useGetUser } from '@hooks/useGetUser';
import { useUI } from '@hooks/useUI';
import { notify } from '@lib/notify';
import { useTranslation } from 'next-i18next';
import { useState } from 'react';

const ComponentDeleteView = () => {
  const { t } = useTranslation();

  const { updateBuilderInfo } = useUI();
  const { id } = useModalState();
  const { closeModal } = useModalAction();

  const [error, setError] = useState(null);

  const { userInfo } = useGetUser();
  const csrfToken = userInfo?.csrfToken;

  const [deleteLayoutComponent, { loading }] = useMutation(
    DELETE_LAYOUT_COMPONENT,
    {
      context: {
        headers: {
          'x-csrf-token': csrfToken
        }
      },
      refetchQueries: [STORE_LAYOUTS, 'StoreLayouts']
    }
  );

  useErrorLogger(error);

  async function handleDelete() {
    deleteLayoutComponent({ variables: { componentId: id } })
      .then(({ data }) => {
        const {
          deleteLayoutComponent: { componentId }
        } = data;
        if (componentId) {
          updateBuilderInfo({ isReloadStoreFront: true });
          notify(t('common:successfully-deleted'), 'success', {
            position: 'top-center',
            autoClose: 1000
          });
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

export default ComponentDeleteView;
