import ActionButtons from '@components/common/action-buttons';
import ProfileCart from '@components/ui/profile-card';
import {
  CreatedUpdatedByAt,
  DeliveryTimeType,
  ShippingZoneType
} from '@ts-types/generated';
import { useIsRTL } from '@utils/locals';
import { ROUTES } from '@utils/routes';
import dayjs from 'dayjs';
import dynamic from 'next/dynamic';
import { useTranslation } from 'next-i18next';
import { useMemo } from 'react';

const Table = dynamic(
  () => import('@components/ui/table').then((mod) => mod.Table),
  { ssr: false }
);

export type IProps = {
  deliveryTimes: DeliveryTimeType[] | undefined;
  selectedColumns: string[];
};

const DeliveryList = ({ deliveryTimes, selectedColumns }: IProps) => {
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
          return <span className="capitalize">{name}</span>;
        }
      },
      {
        title: t('table:table-item-unit-only'),
        dataIndex: 'timeUnit',
        key: 'timeUnit',
        align: alignLeft,
        width: 150,
        ellipsis: true,
        render: ({ unit }: { unit: string }) => {
          return <span className="capitalize">{unit}</span>;
        }
      },
      {
        title: t('table:table-item-minimum'),
        dataIndex: 'minValue',
        key: 'minValue',
        align: alignLeft,
        width: 150,
        ellipsis: true,
        render: (minValue: number) => {
          return <span className="capitalize">{minValue}</span>;
        }
      },
      {
        title: t('table:table-item-maximum'),
        dataIndex: 'maxValue',
        key: 'maxValue',
        align: alignLeft,
        width: 150,
        ellipsis: true,
        render: (maxValue: number) => {
          return <span className="capitalize">{maxValue}</span>;
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
        width: 150,
        ellipsis: true,
        render: (
          createdBy: CreatedUpdatedByAt['createdBy'],
          record: ShippingZoneType
        ) => {
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
          record: ShippingZoneType
        ) => {
          return <ProfileCart user={updatedBy} updatedAt={record?.updatedAt} />;
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
            editUrl={`${ROUTES.DELIVERY_TIME}/edit/${id}`}
            deleteModalView="DELETE_DELIVERY_TIME"
          />
        ),
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
    <>
      <div className="card overflow-hidden mb-8">
        <Table
          //@ts-ignore
          columns={tableColumns}
          emptyText={t('table:empty-table-data')}
          data={deliveryTimes}
          rowKey="id"
          scroll={{ x: 900 }}
        />
      </div>
    </>
  );
};

export default DeliveryList;
