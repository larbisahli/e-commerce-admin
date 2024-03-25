import ActionButtons from '@components/common/action-buttons';
import ImageComponent from '@components/ImageComponent';
import Badge from '@components/ui/badge/badge';
import Loader from '@components/ui/loader/loader';
import { TableRowPlaceholder } from '@components/ui/placeholders/Table';
import ProfileCart from '@components/ui/profile-card';
import { usePlaceholder } from '@hooks/usePlaceholder';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { siteSettings } from '@settings/site.settings';
import {
  CreatedUpdatedByAt,
  CustomerType,
  ImageType,
  OrderStatus,
  OrderType,
  ShippingZoneType
} from '@ts-types/generated';
import { useIsRTL } from '@utils/locals';
import { ROUTES } from '@utils/routes';
import dayjs from 'dayjs';
import dynamic from 'next/dynamic';
import { useTranslation } from 'next-i18next';
import { useMemo } from 'react';

import InvoicePdf from './invoice-pdf';
import Link from 'next/link';

const Table = dynamic(
  () => import('@components/ui/table').then((mod) => mod.Table),
  { ssr: false, loading: () => <Loader text={'Loading'} /> }
);

export type IProps = {
  orders: OrderType[] | undefined;
  selectedColumns: string[];
  loading: boolean;
};

interface TableRowProps extends ShippingZoneType {
  loading: boolean;
}

const OrderList = ({ loading, orders, selectedColumns }: IProps) => {
  const { t } = useTranslation();
  const { alignLeft } = useIsRTL();
  const rowExpandable = (record: any) => record.children?.length;
  const { tablePlaceholderRow } = usePlaceholder();

  const columns = useMemo(() => {
    return [
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
        title: t('table:table-customer-name'),
        dataIndex: 'customer',
        key: 'customer',
        align: 'center',
        width: 180,
        ellipsis: true,
        render: (customer: CustomerType, record: TableRowProps) => {
          if (record?.loading) {
            return <TableRowPlaceholder />;
          }
          return <span className="capitalize">{customer.fullName}</span>;
        }
      },
      {
        title: t('table:table-customer-address'),
        dataIndex: 'customer',
        key: 'customer',
        align: 'center',
        width: 230,
        render: (customer: CustomerType, record: TableRowProps) => {
          if (record?.loading) {
            return <TableRowPlaceholder />;
          }
          return (
            <span className="capitalize">
              {customer?.address?.addressLine1}
            </span>
          );
        }
      },
      {
        title: t('table:table-quantity'),
        dataIndex: 'quantity',
        key: 'quantity',
        align: 'center',
        width: 100,
        render: (freeShipping: boolean, record: TableRowProps) => {
          if (record?.loading) {
            return <TableRowPlaceholder />;
          }
          return (
            <Badge
              className="!text-sm !text-gray-600"
              text={freeShipping ? 'Yes' : 'No'}
              color={freeShipping ? 'bg-green-200' : 'bg-red-200'}
            />
          );
        }
      },
      {
        title: t('table:table-payment-method'),
        dataIndex: 'paymentCode',
        key: 'paymentCode',
        align: 'center',
        width: 150,
        render: (paymentCode: string, record: TableRowProps) => {
          if (record?.loading) {
            return <TableRowPlaceholder />;
          }
          return <span className="font-medium">{paymentCode}</span>;
        }
      },
      {
        title: t('table:table-grant-total'),
        dataIndex: 'grandTotalInclTax',
        key: 'grandTotalInclTax',
        align: 'center',
        width: 150,
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
        title: t('table:table-order-status'),
        dataIndex: 'orderStatus',
        key: 'orderStatus',
        align: 'center',
        width: 150,
        render: (orderStatus: OrderStatus, record: TableRowProps) => {
          if (record?.loading) {
            return <TableRowPlaceholder />;
          }
          return (
            <span
              className="rounded-sm border border-solid bg-white
                     py-[5px] px-[10px] font-semibold capitalize shadow-sm"
              style={{ color: orderStatus?.color }}
            >
              {orderStatus?.label}
            </span>
          );
        }
      },
      {
        title: t('table:table-payment-status'),
        dataIndex: 'paymentStatus',
        key: 'paymentStatus',
        align: 'center',
        width: 150,
        render: (paymentStatus: OrderStatus, record: TableRowProps) => {
          if (record?.loading) {
            return <TableRowPlaceholder />;
          }
          return (
            <span
              className="rounded-sm border border-solid bg-white
                     py-[5px] px-[10px] font-semibold capitalize shadow-sm"
              style={{ color: paymentStatus?.color }}
            >
              {paymentStatus?.label}
            </span>
          );
        }
      },
      {
        title: t('table:table-delivery-status'),
        dataIndex: 'deliveryStatus',
        key: 'deliveryStatus',
        align: 'center',
        width: 150,
        render: (deliveryStatus: OrderStatus, record: TableRowProps) => {
          if (record?.loading) {
            return <TableRowPlaceholder />;
          }
          return (
            <span
              className="rounded-sm border border-solid bg-white
                     py-[5px] px-[10px] font-semibold capitalize shadow-sm"
              style={{ color: deliveryStatus?.color }}
            >
              {deliveryStatus?.label}
            </span>
          );
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
        // title: "Download",
        title: t('common:text-download'),
        dataIndex: 'id',
        key: 'download',
        align: 'center',
        render: (_id: string, order: any) => (
          <div>
            <PDFDownloadLink
              document={<InvoicePdf order={order} />}
              fileName="invoice.pdf"
            >
              {({ loading }: any) =>
                loading ? t('common:text-loading') : t('common:text-download')
              }
            </PDFDownloadLink>
          </div>
        )
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
