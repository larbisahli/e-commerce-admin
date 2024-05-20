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
  isAdmin?: boolean;
  activate?: boolean;
  // eslint-disable-next-line no-unused-vars
  setDefault?: (id: number) => void;
  activated?: boolean;
};

const ActionButtons = ({
  id,
  deleteModalView,
  isAdmin = false,
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
    if (isAdmin) return;
    openModal(deleteModalView, id as string, metadata);
  }

  function handleUserStatus(id: string | number, state: string) {
    if (isAdmin) return;
    openModal('BAN_CUSTOMER', id as string, state);
  }

  return (
    <div className="flex w-auto items-center justify-center space-s-2">
      {loading && (
        <div className="absolute inset-0 flex items-center bg-white opacity-70">
          <Loader height="100px" showText={false} />
        </div>
      )}
      {!isAdmin && deleteModalView && (
        <button
          onClick={handleDelete}
          data-tooltip-id="actions-tooltip"
          data-tooltip-content={t('text-delete')}
          className="flex h-9 w-9 items-center justify-center rounded-sm border text-gray-500 transition duration-200 hover:text-red-600 hover:shadow-xl focus:outline-none"
        >
          <Trash width={16} />
        </button>
      )}
      {!isAdmin && userStatus && (
        <>
          {isUserActive ? (
            <button
              onClick={() => handleUserStatus(id, 'ban')}
              className="flex h-9 w-9 items-center justify-center rounded-sm border text-gray-500 transition duration-200 hover:text-red-600 hover:shadow-xl focus:outline-none"
              data-tooltip-id="actions-tooltip"
              data-tooltip-content={t('text-ban-user')}
            >
              <BanUser width={20} />
            </button>
          ) : (
            <button
              onClick={() => handleUserStatus(id, 'active')}
              className="flex h-9 w-9 items-center justify-center rounded-sm border text-green-500 transition duration-200 hover:text-green-400 hover:shadow-xl focus:outline-none"
              data-tooltip-id="actions-tooltip"
              data-tooltip-content={t('text-activate-user')}
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
          className="flex h-9 w-9 items-center justify-center rounded-sm border text-gray-500 transition duration-200 hover:text-green-500 hover:shadow-xl focus:outline-none"
        >
          <CopyIcon width={20} />
        </Link>
      )}
      {detailsUrl && (
        <Link
          href={detailsUrl}
          className="ml-2 flex h-9 w-9 items-center justify-center rounded-sm border text-base text-gray-500 transition duration-200 hover:text-heading hover:shadow-xl"
          data-tooltip-id="actions-tooltip"
          data-tooltip-content={t('text-view')}
          target="_blank"
        >
          <Eye width={24} />
        </Link>
      )}
      {activate && (
        <button
          onClick={() => handleUserStatus(id, 'active')}
          className="flex h-9 w-9 items-center justify-center rounded-sm border text-gray-500 transition duration-200 hover:shadow-xl focus:outline-none"
          data-tooltip-id="actions-tooltip"
          data-tooltip-content={'Activate theme'}
        >
          <CheckMarkCircle width={20} />
        </button>
      )}
      {activated && (
        <div
          className="flex h-9 w-9 items-center justify-center rounded-sm border text-green-500 transition duration-200 hover:text-green-400 hover:shadow-xl focus:outline-none"
          data-tooltip-id="actions-tooltip"
          data-tooltip-content={'Default'}
        >
          <CheckMarkFill width={20} />
        </div>
      )}
      {setDefault instanceof Function && (
        <button
          onClick={() => setDefault(id as number)}
          className="flex h-9 w-9 items-center justify-center rounded-sm border text-gray-500 transition duration-200 hover:text-green-400 hover:shadow-xl focus:outline-none"
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
          className="flex h-9 w-9 items-center justify-center rounded-sm border text-base text-gray-500 transition duration-200 hover:text-blue-600 hover:shadow-xl"
        >
          <EditIcon width={16} />
        </Link>
      )}
      <Tooltip id="actions-tooltip" />
    </div>
  );
};

export default ActionButtons;
