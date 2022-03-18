/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import ActionButtons from '@components/common/action-buttons';
import { CopyIcon } from '@components/icons/copy';
import Badge from '@components/ui/badge/badge';
import Pagination from '@components/ui/pagination';
import { Table } from '@components/ui/table';
import { notify } from '@lib/index';
import { Nullable } from '@ts-types/custom.types';
import { Coupon, CouponType } from '@ts-types/generated';
import { useIsRTL } from '@utils/locals';
import { ROUTES } from '@utils/routes';
import { CopyToClipboard } from '@utils/utils';
import dayjs from 'dayjs';
import { useTranslation } from 'next-i18next';

type IProps = {
  coupons: Coupon[] | null | undefined;
  // eslint-disable-next-line no-unused-vars
  onPagination: (current: number) => void;
  total: Nullable<number>;
  currentPage: Nullable<number>;
  perPage: Nullable<number>;
};

const CouponList = ({
  coupons,
  onPagination,
  total,
  currentPage,
  perPage
}: IProps) => {
  const { t } = useTranslation();
  const { alignLeft } = useIsRTL();

  const columns = [
    {
      title: t('table:table-item-code'),
      dataIndex: 'code',
      key: 'code',
      align: 'center',
      width: 120,
      ellipsis: true,
      render: (code: string) => (
        <>
          <div
            role="button"
            className="flex items-center justify-center text-accent"
            onClick={(event) =>
              CopyToClipboard(event, (value) => {
                notify(`Coupon (${value}) successfully copied`, 'success');
              })
            }
          >
            <span className="font-semibold capitalize whitespace-nowrap">
              {code}
            </span>
            <span style={{ pointerEvents: 'none' }} className="m-1">
              <CopyIcon />
            </span>
          </div>
        </>
      )
    },
    {
      title: t('table:table-item-order-amount-limit'),
      dataIndex: 'order_amount_limit',
      key: 'order_amount_limit',
      align: 'center',
      ellipsis: true,
      width: 150,
      render: (order_amount_limit: number) => (
        <span className="whitespace-nowrap">
          {order_amount_limit ? `${order_amount_limit} USD` : 'Any'}
        </span>
      )
    },
    {
      title: t('table:table-item-value'),
      dataIndex: 'discount_value',
      key: 'discount_value',
      align: 'center',
      ellipsis: true,
      width: 100,
      render: (discount_value: number, record: Coupon) => {
        const className =
          'font-medium bg-gray-100 w-fit text-13px md:text-sm rounded block border border-sink-base px-2 py-1';

        if (record.discount_type === CouponType.Percentage) {
          return <span className={className}>{`- ${discount_value} %`}</span>;
        } else if (record.discount_type === CouponType.Fixed) {
          return <span className={className}>{`- ${discount_value} USD`}</span>;
        } else {
          return (
            <span className={className}>{t('form:input-label-free')}</span>
          );
        }
      }
    },
    {
      title: t('table:table-item-status'),
      dataIndex: 'coupon_end_date',
      key: 'coupon_end_date',
      align: 'center',
      ellipsis: true,
      width: 100,
      render: (coupon_end_date: string, recode: Coupon) => {
        const expired = Date.now() >= Number(coupon_end_date.valueOf());
        const limited = recode.times_used === recode.max_usage;
        return (
          <Badge
            className="!text-sm"
            text={expired || limited ? 'Expired' : 'Active'}
            color={expired || limited ? 'bg-red-500' : 'bg-green-500'}
          />
        );
      }
    },
    {
      title: t('table:table-item-times-used'),
      dataIndex: 'times_used',
      key: 'times_used',
      align: 'center',
      ellipsis: true,
      width: 140,
      render: (times_used: number) => {
        return <span>{times_used ?? 0}</span>;
      }
    },
    {
      title: t('table:table-item-usage-limit'),
      dataIndex: 'max_usage',
      key: 'max_usage',
      align: 'center',
      ellipsis: true,
      width: 100,
      render: (max_usage: number) => {
        return <span>{max_usage}</span>;
      }
    },
    {
      title: t('table:table-item-start-date'),
      dataIndex: 'coupon_start_date',
      key: 'coupon_start_date',
      align: 'center',
      ellipsis: true,
      width: 180,
      render: (coupon_start_date: string) => (
        <span className="whitespace-nowrap">
          {dayjs(coupon_start_date).format('DD/MM/YYYY')} at{' '}
          {dayjs(coupon_start_date).format('h:mm A')}
        </span>
      )
    },
    {
      title: t('table:table-item-end-date'),
      dataIndex: 'coupon_end_date',
      key: 'coupon_end_date',
      align: 'center',
      ellipsis: true,
      width: 180,
      render: (coupon_end_date: string) => (
        <span className="whitespace-nowrap">
          {dayjs(coupon_end_date).format('DD/MM/YYYY')} at{' '}
          {dayjs(coupon_end_date).format('h:mm A')}
        </span>
      )
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
      width: 100,
      render: (id: string) => (
        <ActionButtons
          id={id}
          editUrl={`${ROUTES.COUPONS}/edit/${id}`}
          deleteModalView="DELETE_COUPON"
        />
      )
    }
  ];

  return (
    <>
      <div className="card overflow-hidden mb-6">
        <Table
          //@ts-ignore
          columns={columns}
          emptyText={t('table:empty-table-data')}
          //@ts-ignore
          data={coupons}
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

export default CouponList;
