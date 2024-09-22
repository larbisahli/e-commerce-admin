import ActionButtons from '@components/common/action-buttons';
import StatusBadge from '@components/common/statusBadge';
import Loader from '@components/ui/loader/loader';
import { TableRowPlaceholder } from '@components/ui/placeholders/Table';
import ProfileCart from '@components/ui/profile-card';
import { usePlaceholder } from '@hooks/usePlaceholder';
import { useSettings } from '@hooks/useSettings';
import {
  CreatedUpdatedByAt,
  CustomerType,
  OrderStatus,
  OrderType,
  PaymentType
} from '@ts-types/generated';
import { formatAddress } from '@utils/format-address';
import { useIsRTL } from '@utils/locals';
import { ROUTES } from '@utils/routes';
import dayjs from 'dayjs';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import { useMemo } from 'react';

const Table = dynamic(
  () => import('@components/ui/table').then((mod) => mod.Table),
  { ssr: false, loading: () => <Loader text={'Loading'} /> }
);

export type IProps = {
  orders: OrderType[] | undefined;
  selectedColumns: string[];
  loading: boolean;
};

interface TableRowProps extends OrderType {
  loading: boolean;
}

const OrderList = ({ loading, orders, selectedColumns }: IProps) => {
  const { t } = useTranslation();
  const { alignLeft } = useIsRTL();
  const rowExpandable = (record: any) => record.children?.length;
  const { tablePlaceholderRow } = usePlaceholder();
  const { systemCurrency } = useSettings();

  const columns = useMemo(() => {
    return [
      {
        title: t('table:table-order-status'),
        dataIndex: 'orderStatus',
        key: 'orderStatus',
        align: 'left',
        width: 150,
        render: (orderStatus: OrderStatus, record: TableRowProps) => {
          if (record?.loading) {
            return <TableRowPlaceholder />;
          }
          return (
            <StatusBadge
              tooltip
              color={orderStatus?.color}
              label={orderStatus?.status}
            />
          );
        }
      },
      {
        title: t('table:table-order-number'),
        dataIndex: 'orderNumber',
        key: 'orderNumber',
        align: 'center',
        width: 120,
        ellipsis: true,
        render: (orderNumber: string, record: TableRowProps) => {
          if (record?.loading) {
            return <TableRowPlaceholder />;
          }
          return (
            <Link href={`${ROUTES.ORDERS}/${orderNumber}`}>
              <span className="text-md font-semibold text-blue-700 underline">
                #{orderNumber}
              </span>
            </Link>
          );
        }
      },
      {
        title: t('table:table-quantity'),
        dataIndex: 'totalQuantity',
        key: 'totalQuantity',
        align: 'center',
        width: 100,
        render: (quantity: number, record: TableRowProps) => {
          if (record?.loading) {
            return <TableRowPlaceholder />;
          }
          return <div>{quantity}</div>;
        }
      },
      {
        title: t('table:table-item-total'),
        dataIndex: 'grandTotalInclTax',
        key: 'grandTotalInclTax',
        align: 'center',
        width: 150,
        render: (grandTotalInclTax: number, record: TableRowProps) => {
          if (record?.loading) {
            return <TableRowPlaceholder />;
          }
          return (
            <span>
              {grandTotalInclTax
                ? `${systemCurrency?.symbol}${grandTotalInclTax}`
                : 'N/A'}
            </span>
          );
        }
      },
      {
        title: t('table:table-item-customer'),
        dataIndex: 'customer',
        key: 'fullName',
        align: 'center',
        width: 180,
        ellipsis: true,
        render: (customer: CustomerType, record: TableRowProps) => {
          if (record?.loading) {
            return <TableRowPlaceholder />;
          }
          return (
            <Link href={`${ROUTES.CUSTOMER}/edit/${customer.id}`}>
              <span className="text-md font-semibold capitalize text-blue-700 underline">
                {customer.fullName}
              </span>
            </Link>
          );
        }
      },
      {
        title: t('table:table-item-address'),
        dataIndex: 'customer',
        key: 'address',
        align: 'center',
        width: 350,
        render: (customer: CustomerType, record: TableRowProps) => {
          if (record?.loading) {
            return <TableRowPlaceholder />;
          }
          const address = customer?.address[0] ?? {};
          return <span className="capitalize">{formatAddress(address)}</span>;
        }
      },
      {
        title: t('table:table-payment-method'),
        dataIndex: 'payment',
        key: 'payment',
        align: 'center',
        width: 150,
        render: (payment: PaymentType, record: TableRowProps) => {
          if (record?.loading) {
            return <TableRowPlaceholder />;
          }
          return <span className="font-medium">{payment?.data?.name}</span>;
        }
      },
      {
        title: t('table:table-purchase-date'),
        dataIndex: 'createdAt',
        key: 'createdAt',
        align: 'center',
        width: 200,
        render: (createdAt: Date, record: TableRowProps) => {
          if (record?.loading) {
            return <TableRowPlaceholder />;
          }
          return `${dayjs(createdAt).format('MMM D, YYYY')} at ${dayjs(
            createdAt
          ).format('h:mm A')}`;
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
        dataIndex: 'orderNumber',
        key: 'actions',
        align: 'center',
        render: (orderNumber: string, record: TableRowProps) => {
          if (record?.loading) {
            return <TableRowPlaceholder />;
          }
          return (
            <ActionButtons
              id={orderNumber}
              detailsUrl={`${ROUTES.ORDERS}/${orderNumber}`}
              deleteModalView="DELETE_SHIPPING"
            />
          );
        },
        width: 200
      }
    ];
  }, [alignLeft, systemCurrency?.symbol, t]);

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
      data={loading ? tablePlaceholderRow : orders}
      rowKey="id"
      scroll={{ x: 900 }}
      className="card mb-8 overflow-hidden"
      expandable={{
        expandedRowRender: () => '',
        rowExpandable: rowExpandable
      }}
    />
  );
};

export default OrderList;
