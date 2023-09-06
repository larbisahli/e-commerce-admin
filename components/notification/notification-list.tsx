import ActionButtons from '@components/common/action-buttons';
import Loader from '@components/ui/loader/loader';
import { CreatedUpdatedByAt, RoleType } from '@ts-types/generated';
import { useIsRTL } from '@utils/locals';
import dayjs from 'dayjs';
import dynamic from 'next/dynamic';
import { useTranslation } from 'next-i18next';
import { useMemo } from 'react';

const Table = dynamic(
  () => import('@components/ui/table').then((mod) => mod.Table),
  { ssr: false, loading: () => <Loader text={'Loading'} /> }
);

type IProps = {
  notifications: RoleType[] | null | undefined;
};
const NotificationList = ({ notifications }: IProps) => {
  const { t } = useTranslation();
  const { alignLeft } = useIsRTL();

  const columns = useMemo(() => {
    return [
      {
        title: t('table:table-item-title'),
        dataIndex: 'title',
        key: 'title',
        align: alignLeft,
        width: 80,
        ellipsis: true,
        render: (roleName: string) => (
          <div>
            <span
              style={{ width: 'fit-content' }}
              className="font-semibold text-blue-500"
            >
              {roleName}
            </span>
          </div>
        )
      },
      {
        title: t('table:table-item-date'),
        dataIndex: 'date',
        key: 'date',
        align: alignLeft,
        width: 80,
        ellipsis: true,
        render: (createdAt: CreatedUpdatedByAt['updatedAt']) => {
          return `${dayjs(createdAt).format('MMM D, YYYY')} at ${dayjs(
            createdAt
          ).format('h:mm A')}`;
        }
      },
      {
        title: t('table:table-item-message'),
        dataIndex: 'content',
        key: 'content',
        align: alignLeft,
        width: 150,
        ellipsis: false,
        render: (content: string) => (
          <div className="w-full font-medium text-gray-700">{content}</div>
        )
      },
      {
        title: t('table:table-item-actions'),
        dataIndex: 'id',
        key: 'actions',
        align: 'center',
        width: 150,
        render: (id: string) => {
          return (
            <>
              <ActionButtons id={id} deleteModalView={'DELETE_ROLE'} />
            </>
          );
        }
      }
    ];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [alignLeft]);

  return (
    <Table
      // @ts-ignore
      columns={columns}
      emptyText={t('table:empty-table-data')}
      data={notifications}
      rowKey="id"
      scroll={{ x: 800 }}
      className="card mb-6 overflow-hidden"
    />
  );
};

export default NotificationList;
