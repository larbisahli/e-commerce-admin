import ActionButtons from '@components/common/action-buttons';
import Badge from '@components/ui/badge/badge';
import Pagination from '@components/ui/pagination';
import { Table } from '@components/ui/table';
import { Nullable } from '@ts-types/custom.types';
import { OrderStatus, PrivacyType } from '@ts-types/generated';
import { useIsRTL } from '@utils/locals';
import { ROUTES } from '@utils/routes';
import Color from 'color';
import dayjs from 'dayjs';
import { useTranslation } from 'next-i18next';

export type IProps = {
  orderStatuses: OrderStatus[] | undefined | null;
  // eslint-disable-next-line no-unused-vars
  onPagination: (key: number) => void;
  total: Nullable<number>;
  currentPage: Nullable<number>;
  perPage: Nullable<number>;
};
const OrderStatusList = ({
  orderStatuses,
  onPagination,
  total,
  currentPage,
  perPage
}: IProps) => {
  const { t } = useTranslation();

  const { alignLeft, alignRight } = useIsRTL();

  const columns = [
    {
      title: t('table:table-item-title'),
      dataIndex: 'status_name',
      key: 'status_name',
      align: alignLeft,
      ellipsis: true,
      width: 120,
      render: (status_name: string, record: OrderStatus) => (
        <span
          className="font-semibold capitalize border border-solid shadow-sm"
          style={{
            color: Color(record?.color).darken(0.6),
            background: record?.color,
            borderColor: Color(record?.color).darken(0.1),
            padding: '2px 6px',
            borderRadius: '4px'
          }}
        >
          {status_name}
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
      dataIndex: 'created_at',
      key: 'created_at',
      align: alignLeft,
      width: 200,
      render: (created_at: string | number) => {
        return `${dayjs(created_at).format('MMM D, YYYY')} at ${dayjs(
          created_at
        ).format('h:mm A')}`;
      }
    },
    {
      title: t('table:table-item-created-by'),
      dataIndex: 'created_by',
      key: 'created_by',
      align: alignLeft,
      width: 100,
      ellipsis: true,
      render: (created_by: any) => {
        return (
          <div>{`${created_by?.first_name ?? ''} ${
            created_by?.last_name ?? ''
          }`}</div>
        );
      }
    },
    {
      title: t('table:table-item-updated-by'),
      dataIndex: 'updated_by',
      key: 'updated_by',
      align: alignLeft,
      width: 140,
      ellipsis: true,
      render: (updated_by: any) => {
        return (
          <div>{`${updated_by?.first_name ?? ''} ${
            updated_by?.last_name ?? ''
          }`}</div>
        );
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

      {!!total && (
        <div className="flex justify-end items-center">
          <Pagination
            total={total}
            current={currentPage}
            pageSize={perPage}
            onChange={onPagination}
          />
        </div>
      )}
    </>
  );
};

export default OrderStatusList;
