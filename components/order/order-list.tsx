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
  ImageType,
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
        align: alignLeft,
        width: 150,
        ellipsis: true
      },
      {
        title: t('table:table-customer-name'),
        dataIndex: 'customer',
        key: 'customer',
        align: alignLeft,
        width: 200,
        ellipsis: true,
        render: (name: string, record: TableRowProps) => {
          if (record?.loading) {
            return <TableRowPlaceholder />;
          }
          return (
            <span className="font-semibold capitalize text-accent">{name}</span>
          );
        }
      },
      {
        title: t('table:table-customer-address'),
        dataIndex: 'customer',
        key: 'customer',
        align: 'center',
        width: 230,
        render: (rateType: string, record: TableRowProps) => {
          if (record?.loading) {
            return <TableRowPlaceholder />;
          }
          if (!rateType)
            return (
              <div
                title="Not available"
                className="!text-sm font-medium capitalize text-gray-500"
              >
                N/A
              </div>
            );
          return (
            <Badge
              className="!text-sm font-semibold capitalize"
              text={record?.shippingZone?.freeShipping ? 'No Rate' : rateType}
              color={'bg-gray-100'}
              textColor={'text-gray-500'}
            />
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
        dataIndex: 'payment',
        key: 'payment',
        align: 'center',
        width: 150,
        render: (active: boolean, record: TableRowProps) => {
          if (record?.loading) {
            return <TableRowPlaceholder />;
          }
          return (
            <Badge
              className="!text-sm !text-gray-600"
              text={active ? 'Visible' : 'Hidden'}
              color={active ? 'bg-green-200' : 'bg-red-200'}
            />
          );
        }
      },
      {
        title: t('table:table-grant-total'),
        dataIndex: 'paymentCode',
        key: 'paymentCode',
        align: 'center',
        width: 150,
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
        title: t('table:table-order-status'),
        dataIndex: 'orderStatus',
        key: 'orderStatus',
        align: 'center',
        width: 150,
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
        title: t('table:table-payment-status'),
        dataIndex: 'paymentStatus',
        key: 'paymentStatus',
        align: 'center',
        width: 150,
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
        title: t('table:table-delivery-status'),
        dataIndex: 'deliveryStatus',
        key: 'paymentCode',
        align: 'center',
        width: 150,
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
        title: t('table:table-purchase-date'),
        dataIndex: 'createdAt',
        key: 'createdAt',
        align: 'center',
        width: 150,
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
        dataIndex: 'id',
        key: 'actions',
        align: 'center',
        render: (id: string, record: TableRowProps) => {
          if (record?.loading) {
            return <TableRowPlaceholder />;
          }
          return (
            <ActionButtons
              id={id}
              editUrl={`${ROUTES.SHIPPING_ZONE}/edit/${id}`}
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
