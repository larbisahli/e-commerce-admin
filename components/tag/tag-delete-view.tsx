import { useMutation } from '@apollo/client';
import ConfirmationCard from '@components/common/confirmation-card';
import {
  useModalAction,
  useModalState
} from '@components/ui/modal/modal.context';
import { DELETE_TAG, TAGS } from '@graphql/tag';
import { useErrorLogger } from '@hooks/useErrorLogger';

const TagDeleteView = () => {
  const [deleteAttributeValue, { loading, error }] = useMutation(DELETE_TAG, {
    refetchQueries: [
      TAGS,
      'TagsForAdmin' // Query name
    ]
  });

  const { id } = useModalState();
  const { closeModal } = useModalAction();

  useErrorLogger(error);

  function handleDelete() {
    deleteAttributeValue({ variables: { id } });
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
