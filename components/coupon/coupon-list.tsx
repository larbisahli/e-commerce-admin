/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import ActionButtons from '@components/common/action-buttons';
import { CopyIcon } from '@components/icons/copy';
import Badge from '@components/ui/badge/badge';
import Loader from '@components/ui/loader/loader';
import { TableRowPlaceholder } from '@components/ui/placeholders/Table';
import ProfileCart from '@components/ui/profile-card';
import { usePlaceholder } from '@hooks/usePlaceholder';
import { notify } from '@lib/index';
import { Coupon, CouponType, CreatedUpdatedByAt } from '@ts-types/generated';
import { useIsRTL } from '@utils/locals';
import { ROUTES } from '@utils/routes';
import { CopyToClipboard } from '@utils/utils';
import dayjs from 'dayjs';
import dynamic from 'next/dynamic';
import { useTranslation } from 'next-i18next';
import { useMemo } from 'react';

const Table = dynamic(
  () => import('@components/ui/table').then((mod) => mod.Table),
  { ssr: false, loading: () => <Loader text={'Loading'} /> }
);

interface TableRowProps extends Coupon {
  loading: boolean;
}

type IProps = {
  coupons: Coupon[] | null | undefined;
  selectedColumns: string[];
  loading: boolean;
};

const CouponList = ({ loading, coupons, selectedColumns }: IProps) => {
  const { t } = useTranslation();
  const { alignLeft } = useIsRTL();

  const { tablePlaceholderRow } = usePlaceholder();

  const columns = useMemo(() => {
    return [
      {
        title: t('table:table-item-id'),
        dataIndex: 'id',
        key: 'id',
        align: alignLeft,
        width: 80,
        ellipsis: true
      },
      {
        title: t('table:table-item-code'),
        dataIndex: 'code',
        key: 'code',
        align: alignLeft,
        width: 150,
        ellipsis: true,
        render: (code: string, record: TableRowProps) => {
          if (record?.loading) {
            return <TableRowPlaceholder />;
          }
          return (
            <>
              <div
                role="button"
                className="flex items-center text-accent"
                onClick={(event) =>
                  CopyToClipboard(event, () => {
                    notify('Copied', 'info');
                  })
                }
              >
                <span className="whitespace-nowrap font-semibold capitalize">
                  {code}
                </span>
                <span style={{ pointerEvents: 'none' }} className="m-1">
                  <CopyIcon />
                </span>
              </div>
            </>
          );
        }
      },
      {
        title: t('table:table-item-order-amount-limit'),
        dataIndex: 'orderAmountLimit',
        key: 'orderAmountLimit',
        align: 'center',
        ellipsis: true,
        width: 180,
        render: (orderAmountLimit: number, record: TableRowProps) => {
          if (record?.loading) {
            return <TableRowPlaceholder />;
          }
          return (
            <span className="whitespace-nowrap">
              {orderAmountLimit ? `${orderAmountLimit} USD` : 'Any'}
            </span>
          );
        }
      },
      {
        title: t('table:table-item-value'),
        dataIndex: 'discountValue',
        key: 'discountValue',
        align: 'center',
        ellipsis: true,
        width: 135,
        render: (discountValue: number, record: TableRowProps) => {
          if (record?.loading) {
            return <TableRowPlaceholder />;
          }

          const className =
            'font-medium bg-gray-100 w-full text-13px md:text-sm rounded block border border-sink-base px-2 py-1';

          if (record.discountType === CouponType.Percentage) {
            return <span className={className}>{`- ${discountValue} %`}</span>;
          } else if (record.discountType === CouponType.Fixed) {
            return (
              <span className={className}>{`- ${discountValue} USD`}</span>
            );
          } else {
            return (
              <span className={className}>
                {t('form:input-label-free-shipping')}
              </span>
            );
          }
        }
      },
      {
        title: t('table:table-item-status'),
        dataIndex: 'active',
        key: 'active',
        align: 'center',
        ellipsis: true,
        width: 100,
        render: (active: string, record: TableRowProps) => {
          if (record?.loading) {
            return <TableRowPlaceholder />;
          }

          const expired = Date.now() >= Number(record.couponEndDate.valueOf());
          const limited = record.timesUsed === record.maxUsage;
          return (
            <Badge
              className="!text-sm"
              text={expired || limited ? 'Expired' : 'Active'}
              color={expired || limited ? 'bg-red-500' : 'bg-green-600'}
            />
          );
        }
      },
      {
        title: t('table:table-item-times-used'),
        dataIndex: 'timesUsed',
        key: 'timesUsed',
        align: 'center',
        ellipsis: true,
        width: 140,
        render: (timesUsed: number, record: TableRowProps) => {
          if (record?.loading) {
            return <TableRowPlaceholder />;
          }
          return <span>{timesUsed ?? 0}</span>;
        }
      },
      {
        title: t('table:table-item-usage-limit'),
        dataIndex: 'maxUsage',
        key: 'maxUsage',
        align: 'center',
        ellipsis: true,
        width: 100,
        render: (maxUsage: number, record: TableRowProps) => {
          if (record?.loading) {
            return <TableRowPlaceholder />;
          }
          return <span>{maxUsage}</span>;
        }
      },
      {
        title: t('table:table-item-start-date'),
        dataIndex: 'couponStartDate',
        key: 'couponStartDate',
        align: 'center',
        ellipsis: true,
        width: 180,
        render: (couponStartDate: string, record: TableRowProps) => {
          if (record?.loading) {
            return <TableRowPlaceholder />;
          }
          return (
            <span className="whitespace-nowrap">
              {dayjs(couponStartDate).format('DD/MM/YYYY')} at{' '}
              {dayjs(couponStartDate).format('h:mm A')}
            </span>
          );
        }
      },
      {
        title: t('table:table-item-end-date'),
        dataIndex: 'couponEndDate',
        key: 'couponEndDate',
        align: 'center',
        ellipsis: true,
        width: 180,
        render: (couponEndDate: string, record: TableRowProps) => {
          if (record?.loading) {
            return <TableRowPlaceholder />;
          }
          return (
            <span className="whitespace-nowrap">
              {dayjs(couponEndDate).format('DD/MM/YYYY')} at{' '}
              {dayjs(couponEndDate).format('h:mm A')}
            </span>
          );
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
          record: TableRowProps
        ) => {
          if (record?.loading) {
            return <TableRowPlaceholder />;
          }
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
        dataIndex: 'id',
        key: 'actions',
        align: 'center',
        width: 100,
        render: (id: string, record: TableRowProps) => {
          if (record?.loading) {
            return <TableRowPlaceholder />;
          }
          return (
            <ActionButtons
              id={id}
              editUrl={`${ROUTES.COUPON}/edit/${id}`}
              deleteModalView="DELETE_COUPON"
            />
          );
        }
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
      data={loading ? tablePlaceholderRow : coupons}
      rowKey="id"
      scroll={{ x: 800 }}
      className="mb-6 overflow-hidden border"
    />
  );
};

export default CouponList;
