import { useQuery } from '@apollo/client';
import PageMainHeader from '@components/common/page-main-header';
import PageMainAction from '@components/common/PageMainAction';
import CouponList from '@components/coupon/coupon-list';
import AppLayout from '@components/layouts/app';
import ErrorMessage from '@components/ui/error-message';
import Loader from '@components/ui/loader/loader';
import { COUPONS } from '@graphql/coupons';
import { useErrorLogger, useGetStaff } from '@hooks/index';
import { verifyAuth } from '@middleware/utils';
import { SSRProps } from '@ts-types/custom.types';
import { Coupon, OrderBy, SortOrder } from '@ts-types/generated';
import { COLUMNS } from '@utils/data/table-columns';
import { ROUTES } from '@utils/routes';
import isEmpty from 'lodash/isEmpty';
import type { GetServerSideProps } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useState } from 'react';

interface TCoupon {
  coupons: Coupon[];
  couponCount: { count: number };
}

interface OptionsVariable {
  page: number;
  limit: number;
  orderBy: OrderBy;
  sortedBy: SortOrder;
}

export default function Coupons({ client }: SSRProps) {
  const { t } = useTranslation();

  const [page, setPage] = useState(1);
  const [orderBy, setOrder] = useState(OrderBy.CREATED_AT);
  const [limit, setLimit] = useState({ id: 1, value: 10, label: 10 });
  const [selectedColumns, setSelectedColumns] = useState([
    { label: 'Code', key: 'code' },
    { label: 'Order Amount Limit', key: 'orderAmountLimit' },
    { label: 'Value', key: 'discountValue' },
    { label: 'Status', key: 'couponEndDate' },
    { label: 'Time Used', key: 'timesUsed' },
    { label: 'Usage limit', key: 'maxUsage' },
    { label: 'Start Date', key: 'couponStartDate' },
    { label: 'End Date', key: 'couponEndDate' },
    { label: 'Placed By', key: 'createdBy' },
    { label: 'Last Updated By', key: 'updatedBy' },
    { label: 'Actions', key: 'actions' }
  ]);

  const { data, loading, error, fetchMore } = useQuery<
    TCoupon,
    OptionsVariable
  >(COUPONS, {
    variables: {
      page,
      limit: limit.value,
      orderBy,
      sortedBy: SortOrder.Desc
    },
    fetchPolicy: 'cache-and-network'
  });

  const { coupons = [], couponCount: { count } = { count: 0 } } = data ?? {};

  useGetStaff(client);
  useErrorLogger(error);

  function handlePagination(current: any) {
    setPage(current);
    fetchMore({
      variables: {
        page: current,
        limit,
        orderBy,
        sortedBy: SortOrder.Desc
      }
    });
  }

  if (loading) {
    return <Loader text={t('common:text-loading')} />;
  }
  if (!isEmpty(error)) {
    return <ErrorMessage message={t('common:MESSAGE_SOMETHING_WENT_WRONG')} />;
  }

  return (
    <>
      <PageMainAction
        href={`${ROUTES.COUPONS}/create`}
        title={t('form:input-label-coupons')}
        label={t('form:button-label-add-coupon')}
      />
      <PageMainHeader
        columns={COLUMNS['coupon']}
        selectedColumns={selectedColumns}
        setSelectedColumns={setSelectedColumns}
        onLimitChange={(value) => {
          setLimit(value);
        }}
        limit={limit}
        onPagination={handlePagination}
        total={count}
        currentPage={page}
        perPage={limit.value}
      />
      <CouponList coupons={coupons} selectedColumns={selectedColumns} />
    </>
  );
}

Coupons.Layout = AppLayout;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { locale } = context;
  const { client } = await verifyAuth(context);

  if (!client) {
    return {
      redirect: {
        permanent: false,
        destination: ROUTES.LOGIN
      }
    };
  }

  return {
    props: {
      ...(await serverSideTranslations(locale, [
        'form',
        'common',
        'table',
        'error'
      ])),
      client
    }
  };
};
