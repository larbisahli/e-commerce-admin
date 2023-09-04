import { useQuery } from '@apollo/client';
import AppLayout from '@components/layouts/app';
import ManufacturerList from '@components/manufacturer/manufacturer-list';
import ErrorMessage from '@components/ui/error-message';
import Loader from '@components/ui/loader/loader';
import { MANUFACTURERS } from '@graphql/manufacturer';
import { useErrorLogger, useGetUser } from '@hooks/index';
import { useSettings } from '@hooks/useSettings';
import { useTableColumn } from '@hooks/useTableColumn';
import { verifyAuth, XSRFHandler } from '@middleware/utils';
import { SSRProps, TableQueryVariables } from '@ts-types/custom.types';
import { ManufacturerType, OrderBy, SortOrder } from '@ts-types/generated';
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
  manufacturers: ManufacturerType[];
  manufacturerCount: { count: number };
}


export default function ManufacturerPage({ client }: SSRProps) {
  const { t } = useTranslation();

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState({ id: 1, value: 10, label: 10 });
  const [orderBy, setOrder] = useState(OrderBy.CREATED_AT);

  const { selectedTableColumns, handleColumnChange } =
    useTableColumn('manufacturer');

    const { defaultLanguage, selectedLanguage } = useSettings();

  const { data, loading, error, fetchMore } = useQuery<
    TSupplier,
    TableQueryVariables
  >(MANUFACTURERS, {
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

  const { manufacturers = [], manufacturerCount: { count } = { count: 0 } } =
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
        href={`${ROUTES.MANUFACTURER}/create`}
        title={t('form:button-label-add-manufacturer')}
        label={t('common:sidebar-nav-item-manufacturer')}
      />
      <PageMainHeader
        columns={COLUMNS['manufacturer']}
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
      <ManufacturerList
        selectedColumns={selectedTableColumns}
        manufacturers={manufacturers}
      />
      </div>
    </>
  );
}

ManufacturerPage.Layout = AppLayout;

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
