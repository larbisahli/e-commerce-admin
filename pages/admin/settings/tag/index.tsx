import { useQuery } from '@apollo/client';
import AppLayout from '@components/layouts/app';
import TagList from '@components/tag/tag-list';
import ErrorMessage from '@components/ui/error-message';
import { TAGS } from '@graphql/tag';
import { useErrorLogger, useGetClient } from '@hooks/index';
import { useSettings } from '@hooks/useSettings';
import { useTableColumn } from '@hooks/useTableColumn';
import { verifyAuth, XSRFHandler } from '@middleware/utils';
import { SSRProps, TableQueryVariables } from '@ts-types/custom.types';
import { OrderBy, SortOrder, Tag } from '@ts-types/generated';
import { COLUMNS } from '@utils/data/table-columns';
import { ROUTES } from '@utils/routes';
import isEmpty from 'lodash/isEmpty';
import type { GetServerSideProps } from 'next';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useState } from 'react';
import Button from '@components/ui/button';
import { ArrowPrev } from '@components/icons/arrow-prev';
import { useRouter } from 'next/router';

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

interface TTags {
  tags: Tag[];
  tagCount: { count: number };
}

export default function Tags({ client }: SSRProps) {
  const router = useRouter();
  const { t } = useTranslation();

  const [page, setPage] = useState(1);
  const [orderBy, setOrder] = useState(OrderBy.CREATED_AT);
  const [limit, setLimit] = useState({ id: 1, value: 10, label: 10 });

  const { selectedTableColumns, handleColumnChange } = useTableColumn('tag');

  const { selectedLanguage } = useSettings();

  const {
    userInfo: { store: { etag } = {} }
  } = useGetClient(client);

  const { data, loading, error, fetchMore } = useQuery<
    TTags,
    TableQueryVariables
  >(TAGS, {
    variables: {
      page,
      limit: limit.value,
      orderBy,
      sortedBy: SortOrder.Desc,
      language: selectedLanguage,
      etag: etag?.tagEtag
    },
    fetchPolicy: 'cache-and-network',
    skip: isEmpty(selectedLanguage) || isEmpty(etag)
  });

  const { tags = [], tagCount: { count } = { count: 0 } } = data ?? {};

  useErrorLogger(error);

  function handlePagination(current: any) {
    setPage(current);
    fetchMore({
      variables: {
        page: current,
        limit: limit.value,
        orderBy,
        sortedBy: SortOrder.Desc
      }
    });
  }

  if (!isEmpty(error)) {
    return <ErrorMessage message={error.message} />;
  }

  return (
    <>
      <Head>
        <title>Tag | Dropgala</title>
        <link rel="icon" type="image/svg" sizes="32x32" href="/svg/tag.svg" />
      </Head>
      <div className="pb-3">
        <Button
          variant="outline"
          onClick={() => router.push(`${ROUTES.SETTINGS}`)}
          type="button"
          className="mb-4"
        >
          <ArrowPrev />
          <span>Settings</span>
        </Button>
      </div>
      <PageMainAction
        href={`${ROUTES.TAG}/create`}
        title={t('common:sidebar-nav-item-tags')}
        label={t('form:button-label-add-tag')}
      />
      <PageMainHeader
        columns={COLUMNS['tag']}
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
      <TagList
        loading={loading}
        tags={tags}
        selectedColumns={selectedTableColumns}
      />
    </>
  );
}

Tags.Layout = AppLayout;

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
        'form',
        'common',
        'table',
        'error'
      ])),
      client: { ...(client ?? {}), csrfToken, csrfError }
    }
  };
};
