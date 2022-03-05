import { useMutation } from '@apollo/client';
import ConfirmationCard from '@components/common/confirmation-card';
import {
  useModalAction,
  useModalState
} from '@components/ui/modal/modal.context';
import { DELETE_STAFF, STAFFS } from '@graphql/staff';
import { useErrorLogger } from '@hooks/useErrorLogger';
import { notify } from '@lib/index';
import { StaffType } from '@ts-types/generated';
import { useTranslation } from 'next-i18next';

const StaffDeleteView = () => {
  const { t } = useTranslation();

  const [deleteAttributeValue, { loading, error }] = useMutation(DELETE_STAFF, {
    refetchQueries: [
      STAFFS,
      'Staffs' // Query name
    ]
  });

  const { id } = useModalState();
  const { closeModal } = useModalAction();

  useErrorLogger(error);

  async function handleDelete() {
    deleteAttributeValue({
      variables: { id },
      onCompleted: ({ deleteStaff }: { deleteStaff: StaffType }) => {
        const { first_name, last_name } = deleteStaff;
        notify(
          `${t(
            'common:sidebar-nav-item-staff'
          )} '${first_name} ${last_name}' ${t('common:successfully-deleted')}`,
          'success'
        );
      }
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

export default StaffDeleteView;
