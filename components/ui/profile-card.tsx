import { CreatedUpdatedByAt } from '@ts-types/generated';
import dayjs from 'dayjs';

const ProfileCart = ({
  staff,
  updatedAt,
  createdAt
}: {
  staff: CreatedUpdatedByAt['updatedBy'];
  updatedAt?: CreatedUpdatedByAt['updatedAt'];
  createdAt?: CreatedUpdatedByAt['createdAt'];
}) => {
  return (
    <div
      title={
        updatedAt || createdAt
          ? `${dayjs(updatedAt || createdAt).format('MMM D, YYYY')} at ${dayjs(
              updatedAt || createdAt
            ).format('h:mm A')}`
          : ''
      }
      className="flex items-center min-w-max"
    >
      <div className="px-1 font-medium">
        {`${staff?.firstName ?? ''} ${staff?.lastName ?? ''}`}
      </div>
    </div>
  );
};

export default ProfileCart;
