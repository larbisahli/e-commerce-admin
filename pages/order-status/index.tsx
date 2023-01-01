import { useQuery } from '@apollo/client';
import PageMainAction from '@components/common/PageMainAction';
import PageMainHeader from '@components/common/PageMainHeader';
import SortForm from '@components/common/sort-form';
import { Add } from '@components/icons/add';
import AppLayout from '@components/layouts/app';
import OrderStatusList from '@components/order-status/order-status-list';
import ErrorMessage from '@components/ui/error-message';
import LinkButton from '@components/ui/link-button';
import Loader from '@components/ui/loader/loader';
import { ORDER_STATUSES } from '@graphql/order-status';
import { useErrorLogger, useGetStaff } from '@hooks/index';
import { verifyAuth } from '@middleware/utils';
import { SSRProps } from '@ts-types/custom.types';
import { OrderBy, OrderStatus, SortOrder } from '@ts-types/generated';
import { ROUTES } from '@utils/routes';
import isEmpty from 'lodash/isEmpty';
import type { GetServerSideProps } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useState } from 'react';

interface TOrderStatus {
  orderStatuses: OrderStatus[];
  orderStatusCount: { count: number };
}

interface OptionsVariable {
  page: number;
  limit: number;
  orderBy: OrderBy;
  sortedBy: SortOrder;
}

export default function OrderStatusPage({ client }: SSRProps) {
  const { t } = useTranslation();

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState({ id: 1, value: 10, label: 10 });
  const [orderBy, setOrder] = useState(OrderBy.CREATED_AT);

  const { data, loading, error, fetchMore } = useQuery<
    TOrderStatus,
    OptionsVariable
  >(ORDER_STATUSES, {
    variables: {
      page,
      limit: limit.value,
      orderBy,
      sortedBy: SortOrder.Desc
    },
    fetchPolicy: 'cache-and-network'
  });

  const { orderStatuses = [], orderStatusCount: { count = 0 } = { count: 0 } } =
    data ?? {};

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
        href={`${ROUTES.ORDER_STATUS}/create`}
        title={t('form:input-label-order-status')}
        label={t('form:button-label-add-order-status')}
      />
      <PageMainHeader
        onLimitChange={(value) => {
          setLimit(value);
        }}
        limit={limit}
        onPagination={handlePagination}
        total={100}
        // total={orderStatusCount}
        currentPage={page}
        perPage={limit.value}
      />
      {loading ? null : (
        <OrderStatusList
          orderStatuses={orderStatuses}
          onPagination={handlePagination}
          total={count}
          currentPage={page}
          perPage={limit.value}
        />
      )}
    </>
  );
}

OrderStatusPage.Layout = AppLayout;

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
        'table',
        'common',
        'form',
        'error'
      ])),
      client
    }
  };
};

{
  /* <SortForm
            className="md:ms-5"
            showLabel={false}
            onLimitChange={(value) => {
              setLimit(value);
            }}
            limit={limit}
            onOrderChange={({ value }: { value: OrderBy }) => {
              setOrder(value);
            }}
            options={[
              { id: 1, value: 'created_at', label: 'Created At' },
              { id: 2, value: 'updated_at', label: 'Updated At' }
            ]}
          /> */
}
