import ActionButtons from '@components/common/action-buttons';
import Badge from '@components/ui/badge/badge';
import ProfileCart from '@components/ui/profile-card';
import { Table } from '@components/ui/table';
import {
  CreatedUpdatedByAt,
  OrderStatus,
  PrivacyType
} from '@ts-types/generated';
import { useIsRTL } from '@utils/locals';
import { ROUTES } from '@utils/routes';
import dayjs from 'dayjs';
import { useTranslation } from 'next-i18next';

export type IProps = {
  orderStatuses: OrderStatus[] | undefined | null;
};
const OrderStatusList = ({ orderStatuses }: IProps) => {
  const { t } = useTranslation();

  const { alignLeft, alignRight } = useIsRTL();

  const columns = [
    {
      title: t('table:table-item-title'),
      dataIndex: 'name',
      key: 'name',
      align: alignLeft,
      ellipsis: true,
      width: 250,
      render: (name: string, record: OrderStatus) => (
        <span
          className="font-semibold capitalize border border-solid 
                     rounded-full bg-white py-[4px] px-[8px] shadow-md"
          style={{ color: record?.color }}
        >
          {name}
        </span>
      )
    },
    {
      title: t('table:table-item-status'),
      dataIndex: 'privacy',
      key: 'privacy',
      align: alignLeft,
      ellipsis: true,
      width: 100,
      render: (privacy: string) => (
        <Badge
          text={privacy}
          color={privacy === PrivacyType.Private ? 'bg-blue-500' : 'bg-accent'}
        />
      )
    },
    {
      title: t('table:table-item-created-at'),
      dataIndex: 'createdAt',
      key: 'createdAt',
      align: alignLeft,
      width: 200,
      render: (createdAt: CreatedUpdatedByAt['createdAt']) => {
        return `${dayjs(createdAt).format('MMM D, YYYY')} at ${dayjs(
          createdAt
        ).format('h:mm A')}`;
      }
    },
    {
      title: t('table:table-item-created-by'),
      dataIndex: 'createdBy',
      key: 'createdBy',
      align: alignLeft,
      width: 140,
      ellipsis: true,
      render: (
        createdBy: CreatedUpdatedByAt['createdBy'],
        record: OrderStatus
      ) => {
        return <ProfileCart staff={createdBy} createdAt={record?.createdAt} />;
      }
    },
    {
      title: t('table:table-item-updated-by'),
      dataIndex: 'updatedBy',
      key: 'updatedBy',
      align: alignLeft,
      width: 140,
      ellipsis: true,
      render: (
        updatedBy: CreatedUpdatedByAt['updatedBy'],
        record: OrderStatus
      ) => {
        return <ProfileCart staff={updatedBy} updatedAt={record?.updatedAt} />;
      }
    },
    {
      title: t('table:table-item-actions'),
      dataIndex: 'id',
      key: 'actions',
      align: alignRight,
      width: 80,
      render: (id: string) => (
        <ActionButtons
          id={id}
          editUrl={`${ROUTES.ORDER_STATUS}/edit/${id}`}
          deleteModalView="DELETE_ORDER_STATUS"
        />
      )
    }
  ];

  return (
    <>
      <div className="card overflow-hidden mb-6">
        <Table
          //@ts-ignore
          columns={columns}
          emptyText={t('table:empty-table-data')}
          data={orderStatuses}
          rowKey="id"
          scroll={{ x: 600 }}
        />
      </div>
    </>
  );
};

export default OrderStatusList;
