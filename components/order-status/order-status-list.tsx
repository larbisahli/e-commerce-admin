import ActionButtons from '@components/common/action-buttons';
import Badge from '@components/ui/badge/badge';
import Loader from '@components/ui/loader/loader';
import { TableRowPlaceholder } from '@components/ui/placeholders/Table';
import ProfileCart from '@components/ui/profile-card';
import { usePlaceholder } from '@hooks/usePlaceholder';
import {
  CreatedUpdatedByAt,
  OrderStatus,
  PrivacyType
} from '@ts-types/generated';
import { useIsRTL } from '@utils/locals';
import { ROUTES } from '@utils/routes';
import dayjs from 'dayjs';
import dynamic from 'next/dynamic';
import { useTranslation } from 'next-i18next';
import { memo, useMemo } from 'react';

const Table = dynamic(
  () => import('@components/ui/table').then((mod) => mod.Table),
  { ssr: false, loading: () => <Loader text={'Loading'} /> }
);

interface TableRowProps extends OrderStatus {
  loading: boolean;
}

export type IProps = {
  loading: boolean;
  orderStatuses: OrderStatus[] | undefined | null;
  selectedColumns: string[];
};

const OrderStatusList = ({
  loading,
  orderStatuses,
  selectedColumns
}: IProps) => {
  const { t } = useTranslation();

  const { alignLeft } = useIsRTL();

  const { tablePlaceholderRow } = usePlaceholder();

  const columns = useMemo(() => {
    return [
      {
        title: t('table:table-item-id'),
        dataIndex: 'id',
        key: 'id',
        align: alignLeft,
        width: 80,
        ellipsis: true
      },
      {
        title: t('table:table-item-label'),
        dataIndex: 'label',
        key: 'label',
        align: alignLeft,
        ellipsis: true,
        width: 200,
        render: (label: string, record: TableRowProps) => {
          if (record?.loading) {
            return <TableRowPlaceholder />;
          }
          return (
            <span
              className="rounded-md border border-solid bg-white
                       py-[5px] px-[10px] font-semibold capitalize shadow-md"
              style={{ color: record?.color }}
            >
              {label ?? record?.translated?.label}
            </span>
          );
        }
      },
      {
        title: t('table:table-item-privacy'),
        dataIndex: 'privacy',
        key: 'privacy',
        align: alignLeft,
        ellipsis: true,
        width: 100,
        render: (privacy: string, record: TableRowProps) => {
          if (record?.loading) {
            return <TableRowPlaceholder />;
          }
          return (
            <Badge
              text={privacy}
              color={
                privacy === PrivacyType.Private ? 'bg-blue-500' : 'bg-green-600'
              }
            />
          );
        }
      },
      {
        title: t('table:table-item-created-at'),
        dataIndex: 'createdAt',
        key: 'createdAt',
        align: alignLeft,
        width: 200,
        render: (
          createdAt: CreatedUpdatedByAt['createdAt'],
          record: TableRowProps
        ) => {
          if (record?.loading) {
            return <TableRowPlaceholder />;
          }
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
        width: 150,
        ellipsis: true,
        render: (
          createdBy: CreatedUpdatedByAt['createdBy'],
          record: TableRowProps
        ) => {
          if (record?.loading) {
            return <TableRowPlaceholder />;
          }
          return <ProfileCart user={createdBy} createdAt={record?.createdAt} />;
        }
      },
      {
        title: t('table:table-item-updated-by'),
        dataIndex: 'updatedBy',
        key: 'updatedBy',
        align: alignLeft,
        width: 150,
        ellipsis: true,
        render: (
          updatedBy: CreatedUpdatedByAt['updatedBy'],
          record: TableRowProps
        ) => {
          if (record?.loading) {
            return <TableRowPlaceholder />;
          }
          return <ProfileCart user={updatedBy} updatedAt={record?.updatedAt} />;
        }
      },
      {
        title: t('table:table-item-actions'),
        dataIndex: 'id',
        key: 'actions',
        align: 'center',
        width: 150,
        render: (id: string, record: TableRowProps) => {
          if (record?.loading) {
            return <TableRowPlaceholder />;
          }
          return (
            <ActionButtons
              id={id}
              editUrl={`${ROUTES.ORDER_STATUS}/edit/${id}`}
              deleteModalView="DELETE_ORDER_STATUS"
            />
          );
        }
      }
    ];
  }, [alignLeft, t]);

  const tableColumns = useMemo(() => {
    return columns?.filter(({ key }) => {
      return (
        key === 'id' || selectedColumns?.some((columnKey) => columnKey === key)
      );
    });
  }, [columns, selectedColumns]);

  return (
    <Table
      //@ts-ignore
      columns={tableColumns}
      emptyText={t('table:empty-table-data')}
      data={loading ? tablePlaceholderRow : orderStatuses}
      rowKey="id"
      scroll={{ x: 600 }}
      className="mb-6 overflow-hidden border"
    />
  );
};

export default memo(OrderStatusList);
