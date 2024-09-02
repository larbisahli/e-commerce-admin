import Badge from '@components/ui/badge/badge';
import Loader from '@components/ui/loader/loader';
import ProfileCart from '@components/ui/profile-card';
import { CreatedUpdatedByAt } from '@ts-types/generated';
import { useIsRTL } from '@utils/locals';
import dayjs from 'dayjs';
import { useTranslation } from 'next-i18next';
import dynamic from 'next/dynamic';
import React, { useMemo } from 'react';

const Table = dynamic(
  () => import('@components/ui/table').then((mod) => mod.Table),
  { ssr: false, loading: () => <Loader text={'Loading'} /> }
);

type IProps = {
  clientSubscriptions?: any[];
};

export default function SubscriptionHistory({ clientSubscriptions }: IProps) {
  const { t } = useTranslation();

  const { alignLeft } = useIsRTL();

  const columns = useMemo(() => {
    return [
      {
        title: 'Subscription ID',
        dataIndex: 'id',
        key: 'id',
        align: alignLeft,
        width: 140,
        ellipsis: true,
        render: (id: string) => (
          <div>
            <span className="cut-line-1 font-semibold text-blue-500">{id}</span>
          </div>
        )
      },
      {
        title: t('table:table-item-status'),
        dataIndex: 'status',
        key: 'status',
        align: 'center',
        ellipsis: true,
        width: 130,
        render: (active: string, record) => {
          let status;
          if (record?.status === 'active') {
            status = 'Active';
          }
          if (record?.status === 'trialing') {
            status = 'Trial';
          }
          if (record?.cancel_at_period_end) {
            status = 'Canceled';
          }
          return (
            <Badge
              className="!text-sm"
              text={status}
              color={status === 'Canceled' ? 'bg-red-500' : 'bg-green-600'}
            />
          );
        }
      },
      {
        title: 'Paid By',
        dataIndex: 'user',
        key: 'user',
        align: alignLeft,
        width: 120,
        ellipsis: true,
        render: (user: CreatedUpdatedByAt['createdBy']) => {
          return <ProfileCart user={user} />;
        }
      },
      {
        title: 'Plan',
        dataIndex: 'price',
        key: 'price',
        align: alignLeft,
        width: 120,
        ellipsis: true,
        render: (price: any) => {
          return (
            <Badge
              className="!text-sm"
              text={price?.product?.name}
              color={'bg-blue-500'}
            />
          );
        }
      },
      {
        title: 'Amount',
        dataIndex: 'price',
        key: 'price',
        align: alignLeft,
        width: 120,
        ellipsis: true,
        render: (price: any) => {
          const subscriptionPrice =
            price &&
            new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: price?.currency!,
              minimumFractionDigits: 0
            }).format((price?.unitAmount || 0) / 100);

          return (
            <div className="font-medium text-black">{`${subscriptionPrice}/${price?.interval}`}</div>
          );
        }
      },
      {
        title: 'Start date',
        dataIndex: 'current_period_start',
        key: 'current_period_start',
        align: alignLeft,
        width: 200,
        ellipsis: true,
        render: (current_period_start: CreatedUpdatedByAt['updatedAt']) => {
          return `${dayjs(current_period_start).format(
            'MMM D, YYYY'
          )} at ${dayjs(current_period_start).format('h:mm A')}`;
        }
      },
      {
        title: 'End date',
        dataIndex: 'current_period_end',
        key: 'current_period_end',
        align: alignLeft,
        width: 200,
        ellipsis: true,
        render: (current_period_end: CreatedUpdatedByAt['updatedAt']) => {
          return `${dayjs(current_period_end).format('MMM D, YYYY')} at ${dayjs(
            current_period_end
          ).format('h:mm A')}`;
        }
      },
      {
        title: 'Canceled at',
        dataIndex: 'canceled_at',
        key: 'canceled_at',
        align: alignLeft,
        width: 200,
        ellipsis: false,
        render: (canceled_at: CreatedUpdatedByAt['updatedAt']) => {
          if (canceled_at) {
            return `${dayjs(canceled_at).format('MMM D, YYYY')} at ${dayjs(
              canceled_at
            ).format('h:mm A')}`;
          }
          return 'N/A';
        }
      }
    ];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [alignLeft]);

  // const subscriptionPrice =
  //   subscription &&
  //   new Intl.NumberFormat('en-US', {
  //     style: 'currency',
  //     currency: subscription?.price?.currency!,
  //     minimumFractionDigits: 0
  //   }).format((subscription?.price?.unitAmount || 0) / 100);

  return (
    <Table
      // @ts-ignore
      columns={columns}
      emptyText={t('table:empty-table-data')}
      data={clientSubscriptions}
      rowKey="id"
      scroll={{ x: 800 }}
      className="mb-6 overflow-hidden border"
    />
  );
}
