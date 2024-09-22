import { useMutation } from '@apollo/client';
import ConfirmationCard from '@components/common/confirmation-card';
import {
  useModalAction,
  useModalState
} from '@components/ui/modal/modal.context';
import { DELETE_SUPPLIER, SUPPLIERS } from '@graphql/supplier';
import { useErrorLogger } from '@hooks/useErrorLogger';
import { useAppDispatch, useGetClient } from '@hooks/useGetClient';
import { notify } from '@lib/notify';
import { setEtag } from '@store/client';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const SupplierDeleteView = () => {
  const { t } = useTranslation();

  const { userInfo } = useGetClient();
  const csrfToken = userInfo?.csrfToken;

  const [error, setError] = useState(null);
  const [deleteSupplierValue, { loading }] = useMutation(DELETE_SUPPLIER, {
    context: {
      headers: {
        'x-csrf-token': csrfToken
      }
    },
    refetchQueries: [
      SUPPLIERS,
      'Suppliers' // Query name
    ]
  });

  const dispatch = useAppDispatch();
  const { id } = useModalState();
  const { closeModal } = useModalAction();

  useErrorLogger(error);

  async function handleDelete() {
    deleteSupplierValue({ variables: { id } })
      .then(({ data }) => {
        const {
          deleteSupplier: { id, etag }
        } = data;
        if (id) {
          dispatch(setEtag({ etag }));
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

export default SupplierDeleteView;
