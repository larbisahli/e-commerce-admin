import { useQuery } from '@apollo/client';
import AppLayout from '@components/layouts/app';
import NotificationList from '@components/notification/notification-list';
import ErrorMessage from '@components/ui/error-message';
import Loader from '@components/ui/loader/loader';
import { ROLES } from '@graphql/user-role';
import { useErrorLogger, useGetUser } from '@hooks/index';
import { useTableColumn } from '@hooks/useTableColumn';
import { verifyAuth } from '@middleware/utils';
import { SSRProps } from '@ts-types/custom.types';
import { OrderBy, SortOrder } from '@ts-types/enums';
import { RoleType } from '@ts-types/generated';
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

interface TRole {
  notifications: RoleType[];
  roleCount: { count: number };
}

export default function UserRole({ client }: SSRProps) {
  const { t } = useTranslation();
  const [limit, setLimit] = useState({ id: 1, value: 10, label: 10 });
  const [page, setPage] = useState(1);
  const [orderBy, setOrder] = useState(OrderBy.CREATED_AT);

  const { selectedTableColumns, handleColumnChange } =
    useTableColumn('notification');

  const { data, loading, error, fetchMore } = useQuery<TRole>(ROLES, {
    variables: {},
    fetchPolicy: 'cache-and-network'
  });

  // const { notifications = [] } = data ?? {};

  const count = 4;

  const notifications = [
    {
      title: 'Mageplaza Notice',
      date: Date.now(),
      content: `Following Mageplaza extensions: Product Labels, Social Login, Instagram Feed. Please check your account dashboard to download the latest versions for your modules. To read the release notes, please check it here https://www.mageplaza.com/releases/`
    },
    {
      title: 'New Order',
      date: Date.now(),
      content: `Following Mageplaza extensions: Product Labels, Social Login, Instagram Feed. Please check your account dashboard to download the latest versions for your modules. To read the release notes, please check it here https://www.mageplaza.com/releases/`
    },
    {
      title: 'Mageplaza Notice',
      date: Date.now(),
      content: `Following Mageplaza extensions: Product Labels, Social Login, Instagram Feed. Please check your account dashboard to download the latest versions for your modules. To read the release notes, please check it here https://www.mageplaza.com/releases/`
    },
    {
      title: 'Mageplaza Notice',
      date: Date.now(),
      content: `Following Mageplaza extensions: Product Labels, Social Login, Instagram Feed. Please check your account dashboard to download the latest versions for your modules. To read the release notes, please check it here https://www.mageplaza.com/releases/`
    }
  ];

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
    return <ErrorMessage message={error.message} />;
  }

  return (
    <>
      <Head>
        <title>Notifications | Dropgala</title>
        <link rel="icon" type="image/svg" sizes="32x32" href="/svg/user.svg" />
      </Head>
      <PageMainAction
        title={t('common:sidebar-nav-item-notifications')}
        label={t('common:sidebar-nav-item-notifications')}
      />
      <PageMainHeader
        columns={COLUMNS['notification']}
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
        isExportVisible={false}
        isFilterVisible={false}
      />
      <NotificationList notifications={notifications} />
    </>
  );
}
UserRole.Layout = AppLayout;

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
      ...(await serverSideTranslations(locale, [
        'table',
        'common',
        'form',
        'error'
      ])),
      client
    }
  };
};
