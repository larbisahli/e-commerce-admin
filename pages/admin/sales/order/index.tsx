import { useQuery } from '@apollo/client';
import AppLayout from '@components/layouts/app';
import OrderList from '@components/order/order-list';
import ErrorMessage from '@components/ui/error-message';
import { ORDERS } from '@graphql/order';
import { SHIPPING_ZONES } from '@graphql/shipping-zone';
import { useGetClient } from '@hooks/index';
import { useErrorLogger } from '@hooks/useErrorLogger';
import { useTableColumn } from '@hooks/useTableColumn';
import { verifyAuth } from '@middleware/utils';
import type { SSRProps } from '@ts-types/custom.types';
import { OrderBy, OrderType, SortOrder } from '@ts-types/generated';
import { COLUMNS } from '@utils/data/table-columns';
import { ROUTES } from '@utils/routes';
import isEmpty from 'lodash/isEmpty';
import type { GetServerSideProps } from 'next';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useState } from 'react';

const PageMainHeader = dynamic(
  () => import('@components/common/page-main-header'),
  {
    ssr: true,
    loading: () => <div className="animated-background h-[80px] w-full"></div>
  }
);

const PageMainAction = dynamic(
  () => import('@components/common/PageMainAction'),
  {
    ssr: true,
    loading: () => <div className="animated-background h-[80px] w-full"></div>
  }
);

interface TShipping {
  orders: OrderType[];
  orderCount: { count: number };
}

interface ShippingVariable {
  page: number;
  limit: number;
  orderBy: OrderBy;
  sortedBy: SortOrder;
  etag: string;
}

export default function ShippingZonesPage({ client }: SSRProps) {
  const { t } = useTranslation();

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState({ id: 1, value: 10, label: 10 });
  const [orderBy, setOrder] = useState(OrderBy.CREATED_AT);

  const {
    userInfo: { store: { etag } = {} }
  } = useGetClient(client);

  const { selectedTableColumns, handleColumnChange } = useTableColumn('order');

  const { data, loading, error, fetchMore } = useQuery<
    TShipping,
    ShippingVariable
  >(ORDERS, {
    variables: {
      page,
      limit: limit.value,
      orderBy,
      sortedBy: SortOrder.Desc,
      etag: etag?.orderEtag
    },
    fetchPolicy: 'cache-and-network',
    skip: isEmpty(etag)
  });

  const { orders = [], orderCount: { count } = { count: 0 } } = data ?? {};

  useErrorLogger(error);

  const handlePagination = (current: number) => {
    setPage(current);
    fetchMore({
      variables: {
        page: current,
        limit: limit.value,
        orderBy,
        sortedBy: SortOrder.Desc
      }
    });
  };

  if (!isEmpty(error)) {
    return <ErrorMessage message={error.message} />;
  }

  return (
    <>
      <Head>
        <title>Orders | Dropgala</title>
        <link rel="icon" type="image/svg" sizes="32x32" href="/svg/order.svg" />
      </Head>
      <PageMainAction
        hideBorder
        title={t('form:input-label-orders')}
        showSelectLanguage={false}
      />
      <PageMainHeader
        columns={COLUMNS['order']}
        selectedColumns={selectedTableColumns}
        handleColumnChange={handleColumnChange}
        onLimitChange={(value) => {
          setLimit(value);
        }}
        limit={limit}
        onPagination={handlePagination}
        total={count}
        currentPage={page}
        perPage={limit.value}
      />
      <OrderList
        loading={loading}
        orders={orders}
        selectedColumns={selectedTableColumns}
      />
    </>
  );
}
ShippingZonesPage.Layout = AppLayout;

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
      ...(await serverSideTranslations(locale!, [
        'table',
        'common',
        'form',
        'error'
      ])),
      client
    }
  };
};
