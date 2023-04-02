import { CreatedUpdatedByAt } from '@ts-types/generated';
import dayjs from 'dayjs';

const ProfileCart = ({
  user,
  updatedAt,
  createdAt
}: {
  user: CreatedUpdatedByAt['updatedBy'];
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
        {`${user?.firstName ?? ''} ${user?.lastName ?? ''}`}
      </div>
    </div>
  );
};

export default ProfileCart;
