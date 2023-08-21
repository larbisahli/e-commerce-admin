import { BanUser } from '@components/icons/ban-user';
import { CheckMarkCircle } from '@components/icons/checkmark-circle';
import { CheckMarkFill } from '@components/icons/checkmark-circle-fill';
import { CopyIcon } from '@components/icons/copy';
import EditIcon from '@components/icons/edit';
import { Eye } from '@components/icons/eye-icon';
import Trash from '@components/icons/trash';
import Link from '@components/ui/link';
import Loader from '@components/ui/loader/loader';
import { useModalAction } from '@components/ui/modal/modal.context';
import { useTranslation } from 'next-i18next';
import { Tooltip } from 'react-tooltip';

type Props = {
  id: string | number;
  deleteModalView?: string | any;
  editUrl?: string;
  detailsUrl?: string;
  isUserActive?: boolean;
  userStatus?: boolean;
  isShopActive?: boolean;
  // eslint-disable-next-line no-unused-vars
  copy?: string;
  metadata?: { [key: string]: any };
  approveButton?: boolean;
  loading?: boolean;
  isTenant?: boolean;
  activate?: boolean;
  // eslint-disable-next-line no-unused-vars
  setDefault?: (id: number) => void;
  activated?: boolean;
};

const ActionButtons = ({
  id,
  deleteModalView,
  isTenant = false,
  editUrl,
  detailsUrl,
  copy,
  setDefault,
  metadata = {},
  loading = false,
  userStatus = false,
  isUserActive = false,
  activate = false,
  activated = false
}: Props) => {
  const { t } = useTranslation();
  const { openModal } = useModalAction();

  function handleDelete() {
    if (isTenant) return;
    openModal(deleteModalView, id as string, metadata);
  }

  function handleUserStatus(id: string | number, state: string) {
    if (isTenant) return;
    openModal('BAN_CUSTOMER', id as string, state);
  }

  return (
    <div className="space-s-2 flex items-center justify-center w-auto">
      {loading && (
        <div className="absolute inset-0 bg-white opacity-70 flex items-center">
          <Loader height="100px" showText={false} />
        </div>
      )}
      {!isTenant && deleteModalView && (
        <button
          onClick={handleDelete}
          data-tooltip-id="actions-tooltip"
          data-tooltip-content={t('text-delete')}
          className="text-gray-500 transition duration-200 hover:text-red-600 focus:outline-none border hover:shadow-xl rounded-sm h-9 w-9 flex items-center justify-center"
        >
          <Trash width={16} />
        </button>
      )}
      {!isTenant && userStatus && (
        <>
          {isUserActive ? (
            <button
              onClick={() => handleUserStatus(id, 'ban')}
              className="text-gray-500 transition duration-200 hover:text-red-600 focus:outline-none border hover:shadow-xl rounded-sm h-9 w-9 flex items-center justify-center"
              title={t('text-ban-user')}
            >
              <BanUser width={20} />
            </button>
          ) : (
            <button
              onClick={() => handleUserStatus(id, 'active')}
              className="text-green-500 transition duration-200 hover:text-green-400 focus:outline-none border hover:shadow-xl rounded-sm h-9 w-9 flex items-center justify-center"
              title={t('text-activate-user')}
            >
              <CheckMarkCircle width={20} />
            </button>
          )}
        </>
      )}

      {copy && (
        <Link
          href={copy}
          data-tooltip-id="actions-tooltip"
          data-tooltip-content="Duplicate language"
          className="text-gray-500 transition duration-200 hover:text-green-500 focus:outline-none border hover:shadow-xl rounded-sm h-9 w-9 flex items-center justify-center"
        >
          <CopyIcon width={20} />
        </Link>
      )}
      {detailsUrl && (
        <Link
          href={detailsUrl}
          className="text-gray-500 ml-2 text-base transition duration-200 hover:text-heading border hover:shadow-xl rounded-sm h-9 w-9 flex items-center justify-center"
          title={t('text-view')}
        >
          <Eye width={24} />
        </Link>
      )}
      {activate && (
        <button
          onClick={() => handleUserStatus(id, 'active')}
          className="text-gray-500 transition duration-200 focus:outline-none border hover:shadow-xl rounded-sm h-9 w-9 flex items-center justify-center"
          title={'Activate theme'}
        >
          <CheckMarkCircle width={20} />
        </button>
      )}
      {activated && (
        <div
          className="text-green-500 transition duration-200 hover:text-green-400 focus:outline-none border hover:shadow-xl rounded-sm h-9 w-9 flex items-center justify-center"
          title={'Default theme'}
        >
          <CheckMarkFill width={20} />
        </div>
      )}
      {setDefault instanceof Function && (
        <button
          onClick={() => setDefault(id as number)}
          className="text-gray-500 transition duration-200 hover:text-green-400 focus:outline-none border hover:shadow-xl rounded-sm h-9 w-9 flex items-center justify-center"
          data-tooltip-id="actions-tooltip"
          data-tooltip-content={'Set as default'}
        >
          <CheckMarkCircle width={20} />
        </button>
      )}
      {editUrl && (
        <Link
          href={editUrl}
          data-tooltip-id="actions-tooltip"
          data-tooltip-content={t('text-edit')}
          className="text-gray-500 text-base hover:text-blue-600 transition duration-200 border hover:shadow-xl rounded-sm h-9 w-9 flex items-center justify-center"
        >
          <EditIcon width={16} />
        </Link>
      )}
      <Tooltip id="actions-tooltip" />
    </div>
  );
};

export default ActionButtons;
