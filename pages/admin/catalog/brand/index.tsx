import { useQuery } from '@apollo/client';
import BrandList from '@components/brand/brand-list';
import AppLayout from '@components/layouts/app';
import ErrorMessage from '@components/ui/error-message';
import { BRANDS } from '@graphql/brand';
import { useErrorLogger, useGetClient } from '@hooks/index';
import { useSettings } from '@hooks/useSettings';
import { useTableColumn } from '@hooks/useTableColumn';
import { verifyAuth, XSRFHandler } from '@middleware/utils';
import { SSRProps, TableQueryVariables } from '@ts-types/custom.types';
import { BrandType, OrderBy, SortOrder } from '@ts-types/generated';
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

interface TSupplier {
  brands: BrandType[];
  brandCount: { count: number };
}

export default function BrandPage({ client }: SSRProps) {
  const { t } = useTranslation();

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState({ id: 1, value: 10, label: 10 });
  const [orderBy, setOrder] = useState(OrderBy.CREATED_AT);

  const { selectedTableColumns, handleColumnChange } = useTableColumn('brand');

  const { selectedLanguage } = useSettings();

  const {
    userInfo: { store: { etag } = {} }
  } = useGetClient(client);

  const { data, loading, error, fetchMore } = useQuery<
    TSupplier,
    TableQueryVariables
  >(BRANDS, {
    variables: {
      page,
      limit: limit.value,
      orderBy,
      sortedBy: SortOrder.Desc,
      language: selectedLanguage,
      etag: etag?.brandEtag
    },
    fetchPolicy: 'cache-and-network',
    skip: isEmpty(selectedLanguage) || isEmpty(etag)
  });

  const { brands = [], brandCount: { count } = { count: 0 } } = data ?? {};

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
        <title>Brands | Dropgala</title>
        <link rel="icon" type="image/svg" sizes="32x32" href="/svg/brand.svg" />
      </Head>
      <PageMainAction
        href={`${ROUTES.BRAND}/create`}
        title={t('common:sidebar-nav-item-brands')}
        label={t('form:button-label-add-brand')}
      />
      <PageMainHeader
        columns={COLUMNS['brand']}
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
      <BrandList
        loading={loading}
        selectedColumns={selectedTableColumns}
        brands={brands}
      />
    </>
  );
}

BrandPage.Layout = AppLayout;

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
