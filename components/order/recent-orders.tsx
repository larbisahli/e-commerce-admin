// import { Order, OrderStatus } from '@ts-types/generated';
import StatusBadge from '@components/common/statusBadge';
import Loader from '@components/ui/loader/loader';
import { TableRowPlaceholder } from '@components/ui/placeholders/Table';
import { usePlaceholder } from '@hooks/usePlaceholder';
import { CustomerType, OrderStatus, OrderType } from '@ts-types/generated';
import { ROUTES } from '@utils/routes';
import dayjs from 'dayjs';
// import usePrice from '@utils/use-price';
import relativeTime from 'dayjs/plugin/relativeTime';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';

const Table = dynamic(
  () => import('@components/ui/table').then((mod) => mod.Table),
  { ssr: false, loading: () => <Loader text={'Loading'} /> }
);

type IProps = {
  orders: any[];
  title?: string;
  loading: boolean;
};

interface TableRowProps extends OrderType {
  loading: boolean;
}

const RecentOrders = ({ orders, title, loading }: IProps) => {
  const { t } = useTranslation();
  const { tablePlaceholderRow } = usePlaceholder();

  const columns = [
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
            label={orderStatus?.status as string}
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
      title: t('table:table-item-total'),
      dataIndex: 'grandTotalInclTax',
      key: 'grandTotalInclTax',
      align: 'center',
      width: 80,
      render: (grandTotalInclTax: number, record: TableRowProps) => {
        if (record?.loading) {
          return <TableRowPlaceholder />;
        }
        return (
          <span>{grandTotalInclTax ? `$${grandTotalInclTax}` : 'Any'}</span>
        );
      }
    },
    {
      title: t('table:table-quantity'),
      dataIndex: 'totalQuantity',
      key: 'totalQuantity',
      align: 'center',
      width: 80,
      render: (quantity: number, record: TableRowProps) => {
        if (record?.loading) {
          return <TableRowPlaceholder />;
        }
        return <>{quantity}</>;
      }
    },
    {
      title: t('table:table-item-customer'),
      dataIndex: 'customer',
      key: 'customer',
      align: 'center',
      width: 130,
      ellipsis: true,
      render: (customer: CustomerType, record: TableRowProps) => {
        if (record?.loading) {
          return <TableRowPlaceholder />;
        }
        return <span className="capitalize">{customer.fullName}</span>;
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
        dayjs.extend(relativeTime);
        dayjs.extend(utc);
        dayjs.extend(timezone);
        return (
          <span className="whitespace-nowrap">
            {dayjs.utc(createdAt).tz(dayjs.tz.guess()).fromNow()}
          </span>
        );
      }
    }
  ];

  return (
    <>
      <div className="mb-6 overflow-hidden">
        <h3 className="border-b border-border-200 py-4 text-xl font-semibold text-heading">
          {title}
        </h3>
        <Table
          //@ts-ignore
          columns={columns}
          emptyText="You haven't received any recent orders."
          data={loading ? tablePlaceholderRow : orders}
          rowKey="id"
          scroll={{ x: 700 }}
          className="border border-t-0"
        />
      </div>
    </>
  );
};

export default RecentOrders;
