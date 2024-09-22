import { useMutation } from '@apollo/client';
import ConfirmationCard from '@components/common/confirmation-card';
import {
  useModalAction,
  useModalState
} from '@components/ui/modal/modal.context';
import { COUPONS, DELETE_COUPON } from '@graphql/coupons';
import { useErrorLogger } from '@hooks/useErrorLogger';
import { useAppDispatch, useGetClient } from '@hooks/useGetClient';
import { notify } from '@lib/notify';
import { setEtag } from '@store/client';
import { useTranslation } from 'next-i18next';
import { useState } from 'react';

const CouponDeleteView = () => {
  const { t } = useTranslation();

  const [error, setError] = useState(null);

  const { userInfo } = useGetClient();
  const csrfToken = userInfo?.csrfToken;

  const [deleteCoupon, { loading }] = useMutation(DELETE_COUPON, {
    context: {
      headers: {
        'x-csrf-token': csrfToken
      }
    },
    refetchQueries: [
      COUPONS,
      'Coupons' // Query name
    ]
  });

  const dispatch = useAppDispatch();
  const { id } = useModalState();
  const { closeModal } = useModalAction();

  useErrorLogger(error);

  async function handleDelete() {
    deleteCoupon({ variables: { id } })
      .then(({ data }) => {
        const {
          deleteCoupon: { id, etag }
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
