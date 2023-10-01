import { useQuery } from '@apollo/client';
import DeliveryList from '@components/delivery-time/delivery-list';
import AppLayout from '@components/layouts/app';
import ErrorMessage from '@components/ui/error-message';
import { DELIVERY_TIMES } from '@graphql/delivery-time';
import { useGetUser } from '@hooks/index';
import { useErrorLogger } from '@hooks/useErrorLogger';
import { useSettings } from '@hooks/useSettings';
import { useTableColumn } from '@hooks/useTableColumn';
import { verifyAuth, XSRFHandler } from '@middleware/utils';
import type { SSRProps, TableQueryVariables } from '@ts-types/custom.types';
import type { DeliveryTimeType } from '@ts-types/generated';
import { OrderBy, SortOrder } from '@ts-types/generated';
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

interface TDelivery {
  deliveryTimes: DeliveryTimeType[];
  deliveryTimeCount: { count: number };
}

export default function ShippingZonesPage({ client }: SSRProps) {
  const { t } = useTranslation();

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState({ id: 1, value: 10, label: 10 });
  const [orderBy, setOrder] = useState(OrderBy.CREATED_AT);

  const { selectedTableColumns, handleColumnChange } =
    useTableColumn('delivery-time');

  const { selectedLanguage } = useSettings();

  const { data, loading, error, fetchMore } = useQuery<
    TDelivery,
    TableQueryVariables
  >(DELIVERY_TIMES, {
    variables: {
      page,
      limit: limit.value,
      orderBy,
      sortedBy: SortOrder.Desc,
      language: selectedLanguage
    },
    fetchPolicy: 'cache-and-network',
    skip: isEmpty(selectedLanguage)
  });

  const { deliveryTimes = [], deliveryTimeCount: { count } = { count: 0 } } =
    data ?? {};

  useGetUser(client);
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
        <title>Delivery time | Dropgala</title>
        <link
          rel="icon"
          type="image/svg"
          sizes="32x32"
          href="/svg/deliveryTime.svg"
        />
      </Head>
      <PageMainAction
        href={`${ROUTES.DELIVERY_TIME}/create`}
        title={t('form:button-label-add-delivery-time')}
        label={t('form:input-label-delivery-times')}
      />
      <PageMainHeader
        columns={COLUMNS['delivery-time']}
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
      <DeliveryList
        loading={loading}
        deliveryTimes={deliveryTimes}
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

  const { csrfToken, csrfError } = await XSRFHandler(context);

  return {
    props: {
      ...(await serverSideTranslations(locale!, [
        'table',
        'common',
        'form',
        'error'
      ])),
      client: { ...(client ?? {}), csrfToken, csrfError }
    }
  };
};
