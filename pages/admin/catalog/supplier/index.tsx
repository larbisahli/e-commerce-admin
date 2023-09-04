import { useQuery } from '@apollo/client';
import AppLayout from '@components/layouts/app';
import SuppliersList from '@components/suppliers/supplier-list';
import ErrorMessage from '@components/ui/error-message';
import Loader from '@components/ui/loader/loader';
import { SUPPLIERS } from '@graphql/supplier';
import { useErrorLogger, useGetUser } from '@hooks/index';
import { useSettings } from '@hooks/useSettings';
import { useTableColumn } from '@hooks/useTableColumn';
import { verifyAuth } from '@middleware/utils';
import { SSRProps, TableQueryVariables } from '@ts-types/custom.types';
import { OrderBy, SortOrder, Suppliers } from '@ts-types/generated';
import { COLUMNS } from '@utils/data/table-columns';
import { ROUTES } from '@utils/routes';
import cn from 'classnames'
import isEmpty from 'lodash/isEmpty';
import type { GetServerSideProps } from 'next';
import dynamic from 'next/dynamic';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useState } from 'react';

const PageMainHeader = dynamic(
  () => import('@components/common/page-main-header'),
  {
    ssr: true,
    loading: () => <div className="animated-background w-full h-[80px]"></div>
  }
);

const PageMainAction = dynamic(
  () => import('@components/common/PageMainAction'),
  {
    ssr: true,
    loading: () => <div className="animated-background w-full h-[80px]"></div>
  }
);

interface TSupplier {
  suppliers: Suppliers[];
  supplierCount: { count: number };
}

export default function SuppliersPage({ client }: SSRProps) {
  const { t } = useTranslation();

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState({ id: 1, value: 10, label: 10 });
  const [orderBy, setOrder] = useState(OrderBy.CREATED_AT);

  const { selectedTableColumns, handleColumnChange } =
    useTableColumn('supplier');

    const { defaultLanguage, selectedLanguage } = useSettings();

  const { data, loading, error, fetchMore } = useQuery<
    TSupplier,
    TableQueryVariables
  >(SUPPLIERS, {
    variables: {
      page,
      limit: limit.value,
      orderBy,
      sortedBy: SortOrder.Desc,
      language: selectedLanguage,
      defaultLanguage
    },
    fetchPolicy: 'cache-and-network',
    skip: isEmpty(selectedLanguage)
  });

  const { suppliers = [], supplierCount: { count } = { count: 0 } } =
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
      <PageMainAction
        href={`${ROUTES.SUPPLIER}/create`}
        title={t('form:button-label-add-supplier')}
        label={t('common:sidebar-nav-item-suppliers')}
      />
      <PageMainHeader
        columns={COLUMNS['supplier']}
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
      {loading && <Loader text={t('common:text-loading')} />}
      <div className={cn({ hidden: loading })}>
      <SuppliersList
        selectedColumns={selectedTableColumns}
        suppliers={suppliers}
      />
      </div>
    </>
  );
}

SuppliersPage.Layout = AppLayout;

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
