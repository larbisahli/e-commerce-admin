import ActionButtons from '@components/common/action-buttons';
import Badge from '@components/ui/badge/badge';
import Pagination from '@components/ui/pagination';
import { Table } from '@components/ui/table';
import { Nullable } from '@ts-types/custom.types';
import { ShippingZoneType } from '@ts-types/generated';
import { useIsRTL } from '@utils/locals';
import { ROUTES } from '@utils/routes';
import dayjs from 'dayjs';
import { useTranslation } from 'next-i18next';

export type IProps = {
  shipping_zones: ShippingZoneType[] | undefined;
  // eslint-disable-next-line no-unused-vars
  onPagination: (key: number) => void;
  total: Nullable<number>;
  currentPage: Nullable<number>;
  perPage: Nullable<number>;
};

const ShippingList = ({
  shipping_zones,
  onPagination,
  total,
  currentPage,
  perPage
}: IProps) => {
  const { t } = useTranslation();
  const { alignLeft } = useIsRTL();

  const columns = [
    {
      title: t('table:table-item-name'),
      dataIndex: 'name',
      key: 'name',
      align: alignLeft,
      width: 150,
      ellipsis: true,
      render: (name: string) => {
        return (
          <span className="font-semibold capitalize text-accent">{name}</span>
        );
      }
    },
    {
      title: t('table:table-item-rate-type'),
      dataIndex: 'rate_type',
      key: 'rate_type',
      align: 'center',
      width: 90,
      render: (rate_type: string, record: ShippingZoneType) => {
        return (
          <Badge
            className="!text-sm text-gray-500 capitalize font-medium"
            text={record?.free_shipping ? 'No Rate' : rate_type}
            color={'bg-gray-100'}
          />
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
            text={active ? 'Visible' : 'Hidden'}
            color={active ? 'bg-green-400' : 'bg-red-400'}
          />
        );
      }
    },
    {
      title: t('table:table-item-free'),
      dataIndex: 'free_shipping',
      key: 'free_shipping',
      align: 'center',
      width: 90,
      render: (free_shipping: boolean) => {
        return (
          <Badge
            className="!text-sm"
            text={free_shipping ? 'Yes' : 'No'}
            color={free_shipping ? 'bg-green-400' : 'bg-red-400'}
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
          editUrl={`${ROUTES.SHIPPING_ZONES}/edit/${id}`}
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
          data={shipping_zones}
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
