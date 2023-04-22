import { useQuery } from '@apollo/client';
import PageMainHeader from '@components/common/page-main-header';
import PageMainAction from '@components/common/PageMainAction';
import FileList from '@components/files/file-list';
import AppLayout from '@components/layouts/app';
import ErrorMessage from '@components/ui/error-message';
import Loader from '@components/ui/loader/loader';
import { PHOTOS } from '@graphql/photo';
import { useErrorLogger, useGetUser } from '@hooks/index';
import { useTableColumn } from '@hooks/useTableColumn';
import { verifyAuth, XSRFHandler } from '@middleware/utils';
import { SSRProps } from '@ts-types/custom.types';
import { ImageType, OrderBy, SortOrder } from '@ts-types/generated';
import { COLUMNS } from '@utils/data/table-columns';
import { ROUTES } from '@utils/routes';
import isEmpty from 'lodash/isEmpty';
import type { GetServerSideProps } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useState } from 'react';

interface TPhotos {
  photos: ImageType[];
  photoCount: { count: number };
}

interface OptionsVariable {
  page: number;
  limit: number;
  orderBy: OrderBy;
  sortedBy: SortOrder;
}

export default function Files({ client }: SSRProps) {
  const { t } = useTranslation();

  const [page, setPage] = useState(1);
  const [orderBy, setOrder] = useState(OrderBy.CREATED_AT);
  const [limit, setLimit] = useState({ id: 1, value: 10, label: 10 });

  const { selectedTableColumns, handleColumnChange } = useTableColumn('file');

  const { data, loading, error, fetchMore } = useQuery<
    TPhotos,
    OptionsVariable
  >(PHOTOS, {
    variables: {
      page,
      limit: limit.value,
      orderBy,
      sortedBy: SortOrder.Desc
    },
    fetchPolicy: 'cache-and-network'
  });

  const { photos: files = [], photoCount: { count = 0 } = {} } = data ?? {};

  useGetUser(client);
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

  if (loading) {
    return <Loader text={t('common:text-loading')} />;
  }
  if (!isEmpty(error)) {
    return <ErrorMessage message={t('common:MESSAGE_SOMETHING_WENT_WRONG')} />;
  }

  return (
    <>
      <PageMainAction
        href="#"
        onClick={() => console.log('LOL')}
        title={t('form:input-label-images')}
        label={t('form:button-label-upload-image')}
      />
      <PageMainHeader
        columns={COLUMNS['file']}
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
      <FileList files={files} selectedColumns={selectedTableColumns} />
    </>
  );
}

Files.Layout = AppLayout;

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
