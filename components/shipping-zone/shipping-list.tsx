import ActionButtons from '@components/common/action-buttons';
import Badge from '@components/ui/badge/badge';
import Pagination from '@components/ui/pagination';
import ProfileCart from '@components/ui/profile-card';
import { Table } from '@components/ui/table';
import { CreatedUpdatedByAt, ShippingZoneType } from '@ts-types/generated';
import { useIsRTL } from '@utils/locals';
import { ROUTES } from '@utils/routes';
import dayjs from 'dayjs';
import { useTranslation } from 'next-i18next';
import { useMemo } from 'react';

export type IProps = {
  shippingZones: ShippingZoneType[] | undefined;
  selectedColumns: { label: string; key: string }[];
};

const ShippingList = ({ shippingZones, selectedColumns }: IProps) => {
  const { t } = useTranslation();
  const { alignLeft } = useIsRTL();

  const columns = useMemo(() => {
    return [
      {
        title: t('table:table-item-id'),
        dataIndex: 'id',
        key: 'id',
        align: alignLeft,
        width: 50,
        ellipsis: true
      },
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
              className="!text-sm capitalize font-semibold"
              text={record?.shippingZone?.freeShipping ? 'No Rate' : rateType}
              color={'bg-gray-100'}
              textColor={'text-gray-500'}
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
        render: (
          createdBy: CreatedUpdatedByAt['createdBy'],
          record: ShippingZoneType
        ) => {
          return (
            <ProfileCart staff={createdBy} createdAt={record?.createdAt} />
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
        render: (
          updatedBy: CreatedUpdatedByAt['updatedBy'],
          record: ShippingZoneType
        ) => {
          return (
            <ProfileCart staff={updatedBy} updatedAt={record?.updatedAt} />
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
  }, [alignLeft, t]);

  const tableColumns = useMemo(() => {
    return columns?.filter(({ key }) => {
      return key === 'id' || selectedColumns.some((c) => c.key === key);
    });
  }, [columns, selectedColumns]);

  return (
    <>
      <div className="card overflow-hidden mb-8">
        <Table
          //@ts-ignore
          columns={tableColumns}
          emptyText={t('table:empty-table-data')}
          data={shippingZones}
          rowKey="id"
          scroll={{ x: 900 }}
        />
      </div>
    </>
  );
};

export default ShippingList;
