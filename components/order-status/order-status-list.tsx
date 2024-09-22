import ActionButtons from '@components/common/action-buttons';
import StatusBadge from '@components/common/statusBadge';
import Loader from '@components/ui/loader/loader';
import { TableRowPlaceholder } from '@components/ui/placeholders/Table';
import { usePlaceholder } from '@hooks/usePlaceholder';
import { OrderStatus } from '@ts-types/generated';
import { useIsRTL } from '@utils/locals';
import { ROUTES } from '@utils/routes';
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
};

const OrderStatusList = ({ loading, orderStatuses }: IProps) => {
  const { t } = useTranslation();

  const { alignLeft } = useIsRTL();

  const { tablePlaceholderRow } = usePlaceholder();

  const columns = useMemo(() => {
    return [
      {
        title: t('table:table-item-status'),
        dataIndex: 'status',
        key: 'status',
        align: 'left',
        ellipsis: true,
        width: 250,
        render: (label: string, record: TableRowProps) => {
          if (record?.loading) {
            return <TableRowPlaceholder />;
          }
          return <span>{label}</span>;
        }
      },
      {
        title: t('table:table-item-status-description'),
        dataIndex: 'description',
        key: 'description',
        align: 'left',
        render: (description: string, record: TableRowProps) => {
          if (record?.loading) {
            return <TableRowPlaceholder />;
          }
          return description;
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
            />
          );
        }
      }
    ];
  }, [alignLeft, t]);

  return (
    <Table
      //@ts-ignore
      columns={columns}
      emptyText={t('table:empty-table-data')}
      data={loading ? tablePlaceholderRow : orderStatuses}
      rowKey="id"
      scroll={{ x: 600 }}
      className="mb-6 overflow-hidden border"
    />
  );
};

export default memo(OrderStatusList);
