import { useQuery } from '@apollo/client';
import AppLayout from '@components/layouts/app';
import ShippingList from '@components/shipping-zone/shipping-list';
import ErrorMessage from '@components/ui/error-message';
import { SHIPPING_ZONES } from '@graphql/shipping-zone';
import { useGetClient } from '@hooks/index';
import { useErrorLogger } from '@hooks/useErrorLogger';
import { useTableColumn } from '@hooks/useTableColumn';
import { verifyAuth } from '@middleware/utils';
import type { SSRProps } from '@ts-types/custom.types';
import type { ShippingZoneType } from '@ts-types/generated';
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

interface TShipping {
  shippingZones: ShippingZoneType[];
  shippingZoneCount: { count: number };
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

  const { selectedTableColumns, handleColumnChange } =
    useTableColumn('shipping-zone');

  const {
    userInfo: { store: { etag } = {} }
  } = useGetClient(client);

  const { data, loading, error, fetchMore } = useQuery<
    TShipping,
    ShippingVariable
  >(SHIPPING_ZONES, {
    variables: {
      page,
      limit: limit.value,
      orderBy,
      sortedBy: SortOrder.Desc,
      etag: etag?.shipmentEtag
    },
    fetchPolicy: 'cache-and-network',
    skip: isEmpty(etag)
  });

  const { shippingZones = [], shippingZoneCount: { count } = { count: 0 } } =
    data ?? {};

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
        <title>Shipping zone | Dropgala</title>
        <link
          rel="icon"
          type="image/svg"
          sizes="32x32"
          href="/svg/shippingZone.svg"
        />
      </Head>
      <PageMainAction
        href={`${ROUTES.SHIPPING_ZONE}/create`}
        title={t('form:input-label-shipping-zones')}
        label={t('form:button-label-add-shipping-zone')}
        showSelectLanguage={false}
      />
      <PageMainHeader
        columns={COLUMNS['shipping-zone']}
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
      <ShippingList
        loading={loading}
        shippingZones={shippingZones}
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
