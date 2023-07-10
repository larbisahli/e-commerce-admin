import { useQuery } from '@apollo/client';
import CategoryList from '@components/category/category-list';
import PageMainHeader from '@components/common/page-main-header';
import PageMainAction from '@components/common/PageMainAction';
import AppLayout from '@components/layouts/app';
import ErrorMessage from '@components/ui/error-message';
import Loader from '@components/ui/loader/loader';
import { CATEGORIES } from '@graphql/category';
import { useErrorLogger, useGetUser } from '@hooks/index';
import { useTableColumn } from '@hooks/useTableColumn';
import { verifyAuth } from '@middleware/utils';
import { SSRProps } from '@ts-types/custom.types';
import { OrderBy, SortOrder } from '@ts-types/generated';
import { Category } from '@ts-types/generated';
import { COLUMNS } from '@utils/data/table-columns';
import { ROUTES } from '@utils/routes';
import isEmpty from 'lodash/isEmpty';
import type { GetServerSideProps } from 'next';
import Head from 'next/head';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useState } from 'react';

interface TCategories {
  categories: Category[];
  categoryCount: { count: number };
}

interface OptionsVariable {
  page: number;
  limit: number;
  orderBy: OrderBy;
  sortedBy: SortOrder;
}

export default function Categories({ client }: SSRProps) {
  const { t } = useTranslation();

  const [page, setPage] = useState(1);
  const [orderBy, setOrder] = useState(OrderBy.CREATED_AT);
  const [limit, setLimit] = useState({ id: 1, value: 10, label: 10 });

  const { selectedTableColumns, handleColumnChange } =
    useTableColumn('category');

  const { data, loading, error, fetchMore } = useQuery<
    TCategories,
    OptionsVariable
  >(CATEGORIES, {
    variables: {
      page,
      limit: limit.value,
      orderBy,
      sortedBy: SortOrder.Desc
    },
    fetchPolicy: 'cache-and-network'
  });

  const { categories = [], categoryCount: { count } = { count: 0 } } =
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

  if (loading) {
    return <Loader text={t('common:text-loading')} />;
  }
  if (!isEmpty(error)) {
    return <ErrorMessage message={t('common:MESSAGE_SOMETHING_WENT_WRONG')} />;
  }

  return (
    <>
      <Head>
        <link
          rel="icon"
          type="image/svg"
          sizes="32x32"
          href="/svg/category.svg"
        />
      </Head>
      <PageMainAction
        href={`${ROUTES.CATEGORY}/create`}
        title={t('form:input-label-categories')}
        label={t('form:button-label-add-categories')}
      />
      <PageMainHeader
        columns={COLUMNS['category']}
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
      <CategoryList
        categories={categories}
        selectedColumns={selectedTableColumns}
      />
    </>
  );
}

Categories.Layout = AppLayout;

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
        'form',
        'common',
        'table',
        'error'
      ])),
      client
    }
  };
};
