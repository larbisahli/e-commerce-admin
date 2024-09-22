import { useQuery } from '@apollo/client';
import AppLayout from '@components/layouts/app';
import OrderStatusList from '@components/order-status/order-status-list';
import ErrorMessage from '@components/ui/error-message';
import { ORDER_STATUSES } from '@graphql/order-status';
import { useErrorLogger, useGetClient } from '@hooks/index';
import { useSettings } from '@hooks/useSettings';
import { useTableColumn } from '@hooks/useTableColumn';
import { verifyAuth, XSRFHandler } from '@middleware/utils';
import { SSRProps } from '@ts-types/custom.types';
import { OrderBy, OrderStatus, SortOrder } from '@ts-types/generated';
import { COLUMNS } from '@utils/data/table-columns';
import { ROUTES } from '@utils/routes';
import isEmpty from 'lodash/isEmpty';
import type { GetServerSideProps } from 'next';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useState } from 'react';

const PageMainAction = dynamic(
  () => import('@components/common/PageMainAction'),
  {
    ssr: true,
    loading: () => <div className="animated-background h-[80px] w-full"></div>
  }
);

interface TOrderStatus {
  orderStatuses: OrderStatus[];
  orderStatusCount: { count: number };
}

export interface QueryVariables {
  page: number;
  limit: number;
  orderBy: OrderBy;
  sortedBy: SortOrder;
  etag: string;
}

export default function OrderStatusPage({ client }: SSRProps) {
  const { t } = useTranslation();

  const {
    userInfo: { store: { etag } = {} }
  } = useGetClient(client);

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState({ id: 1, value: 999, label: 10 });
  const [orderBy, setOrder] = useState(OrderBy.CREATED_AT);

  const { selectedLanguage } = useSettings();

  const { data, loading, error } = useQuery<TOrderStatus, QueryVariables>(
    ORDER_STATUSES,
    {
      variables: {
        page,
        limit: limit.value,
        orderBy,
        sortedBy: SortOrder.Desc,
        etag: etag?.orderStatusEtag
      },
      fetchPolicy: 'cache-and-network',
      skip: isEmpty(selectedLanguage) || isEmpty(etag)
    }
  );

  const { orderStatuses = [] } = data ?? {};

  useErrorLogger(error);

  if (!isEmpty(error)) {
    return <ErrorMessage message={error.message} />;
  }

  return (
    <>
      <Head>
        <title>Order Status | Dropgala</title>
        <link rel="icon" type="image/svg" sizes="32x32" href="/svg/media.svg" />
      </Head>
      <PageMainAction
        showSelectLanguage={false}
        hideBorder
        title={t('form:input-label-order-status')}
        infoText="Order statuses can help you decide what actions need to be taken for a particular order. Does the order need to be packaged, shipped, or refunded? Most order statuses are applied as a result of store user or customer action, but some must be manually changed."
      />
      <OrderStatusList loading={loading} orderStatuses={orderStatuses} />
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

  const { csrfToken, csrfError } = await XSRFHandler(context);

  return {
    props: {
      ...(await serverSideTranslations(locale, [
        'table',
        'common',
        'form',
        'error'
      ])),
      client: { ...(client ?? {}), csrfToken, csrfError }
    }
  };
};
