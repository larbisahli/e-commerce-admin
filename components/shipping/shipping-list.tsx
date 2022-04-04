import ActionButtons from '@components/common/action-buttons';
import ImageComponent from '@components/ImageComponent';
import Badge from '@components/ui/badge/badge';
import Pagination from '@components/ui/pagination';
import { Table } from '@components/ui/table';
import { siteSettings } from '@settings/site.settings';
import { Nullable } from '@ts-types/custom.types';
import { Shipping } from '@ts-types/generated';
import { useIsRTL } from '@utils/locals';
import { ROUTES } from '@utils/routes';
import dayjs from 'dayjs';
import { useTranslation } from 'next-i18next';

export type IProps = {
  shippings: Shipping[] | undefined;
  // eslint-disable-next-line no-unused-vars
  onPagination: (key: number) => void;
  total: Nullable<number>;
  currentPage: Nullable<number>;
  perPage: Nullable<number>;
};

const ShippingList = ({
  shippings,
  onPagination,
  total,
  currentPage,
  perPage
}: IProps) => {
  const { t } = useTranslation();
  const { alignLeft } = useIsRTL();

  const columns = [
    {
      title: t('table:table-item-icon'),
      dataIndex: 'thumbnail',
      key: 'thumbnail',
      align: alignLeft,
      width: 130,
      render: (thumbnail: { image: string; placeholder: string }) => (
        <div
          style={{ maxWidth: '100px' }}
          className="rounded shadow min-w-0 overflow-hidden"
        >
          <ImageComponent
            src={thumbnail?.image ?? siteSettings.product.image}
            customPlaceholder={
              thumbnail?.placeholder ?? siteSettings.product.placeholder
            }
            layout="fill"
            objectFit="contain"
            className="rounded"
          />
        </div>
      )
    },
    {
      title: t('table:table-item-title'),
      dataIndex: 'shipper_name',
      key: 'shipper_name',
      align: alignLeft,
      width: 150,
      ellipsis: true,
      render: (shipper_name: Shipping) => {
        return (
          <span className="font-semibold text-gray-800 capitalize">
            {shipper_name}
          </span>
        );
      }
    },
    {
      title: t('table:table-item-status'),
      dataIndex: 'active',
      key: 'active',
      align: 'center',
      width: 90,
      render: (active: boolean) => {
        return (
          <Badge
            className="!text-sm"
            text={active ? 'Active' : 'Inactive'}
            color={active ? 'bg-green-500' : 'bg-red-500'}
          />
        );
      }
    },
    {
      title: t('table:table-item-created-at'),
      dataIndex: 'created_at',
      key: 'created_at',
      align: alignLeft,
      width: 180,
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
      align: 'center',
      render: (id: string) => (
        <ActionButtons
          id={id}
          editUrl={`${ROUTES.SHIPPINGS}/edit/${id}`}
          deleteModalView="DELETE_SHIPPING"
        />
      ),
      width: 200
    }
  ];

  return (
    <>
      <div className="card overflow-hidden mb-8">
        <Table
          //@ts-ignore
          columns={columns}
          emptyText={t('table:empty-table-data')}
          data={shippings}
          rowKey="id"
          scroll={{ x: 900 }}
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

export default ShippingList;
