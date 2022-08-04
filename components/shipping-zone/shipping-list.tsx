import ActionButtons from '@components/common/action-buttons';
import Badge from '@components/ui/badge/badge';
import Pagination from '@components/ui/pagination';
import { Table } from '@components/ui/table';
import { Nullable } from '@ts-types/custom.types';
import { CreatedUpdatedByAt, ShippingZoneType } from '@ts-types/generated';
import { useIsRTL } from '@utils/locals';
import { ROUTES } from '@utils/routes';
import dayjs from 'dayjs';
import { useTranslation } from 'next-i18next';

export type IProps = {
  shippingZones: ShippingZoneType[] | undefined;
  // eslint-disable-next-line no-unused-vars
  onPagination: (key: number) => void;
  total: Nullable<number>;
  currentPage: Nullable<number>;
  perPage: Nullable<number>;
};

const ShippingList = ({
  shippingZones,
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
      dataIndex: 'rateType',
      key: 'rateType',
      align: 'center',
      width: 90,
      render: (rateType: string, record: ShippingZoneType) => {
        if (!rateType)
          return (
            <div className="!text-sm text-gray-500 capitalize font-medium">
              None
            </div>
          );
        return (
          <Badge
            className="!text-sm text-gray-500 capitalize font-medium"
            text={record?.shippingZone?.freeShipping ? 'No Rate' : rateType}
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
      dataIndex: 'freeShipping',
      key: 'freeShipping',
      align: 'center',
      width: 90,
      render: (freeShipping: boolean) => {
        return (
          <Badge
            className="!text-sm"
            text={freeShipping ? 'Yes' : 'No'}
            color={freeShipping ? 'bg-green-400' : 'bg-red-400'}
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
      width: 100,
      ellipsis: true,
      render: (createdBy: CreatedUpdatedByAt['createdBy']) => {
        return (
          <div>{`${createdBy?.firstName ?? ''} ${
            createdBy?.lastName ?? ''
          }`}</div>
        );
      }
    },
    {
      title: t('table:table-item-updated-by'),
      dataIndex: 'updatedBy',
      key: 'updatedBy',
      align: alignLeft,
      width: 140,
      ellipsis: true,
      render: (updatedBy: CreatedUpdatedByAt['updatedBy']) => {
        return (
          <div>{`${updatedBy?.firstName ?? ''} ${
            updatedBy?.lastName ?? ''
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
          data={shippingZones}
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
