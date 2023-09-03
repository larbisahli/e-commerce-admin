import { useQuery } from '@apollo/client';
import HeroCarouselList from '@components/hero-banner/hero-carousel-list';
import AppLayout from '@components/layouts/app';
import ErrorMessage from '@components/ui/error-message';
import Loader from '@components/ui/loader/loader';
import { HERO_BANNER_LIST } from '@graphql/hero-carousel';
import { useErrorLogger, useGetUser } from '@hooks/index';
import { useTableColumn } from '@hooks/useTableColumn';
import { verifyAuth, XSRFHandler } from '@middleware/utils';
import { SSRProps } from '@ts-types/custom.types';
import { HeroBannerType } from '@ts-types/generated';
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

interface THeroBanner {
  heroSlideList: HeroBannerType[];
  heroSlideListCount: { count: number };
}

interface OptionsVariable {
  page: number;
  limit: number;
}

export default function HeroBanner({ client }: SSRProps) {
  const { t } = useTranslation();

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState({ id: 1, value: 10, label: 10 });

  const { selectedTableColumns, handleColumnChange } =
    useTableColumn('hero-banner');

  const { data, loading, error, fetchMore } = useQuery<
    THeroBanner,
    OptionsVariable
  >(HERO_BANNER_LIST, {
    variables: {
      page,
      limit: limit.value
    },
    fetchPolicy: 'cache-and-network'
  });

  const { heroSlideList = [], heroSlideListCount: { count } = { count: 0 } } =
    data ?? {};

  useGetUser(client);
  useErrorLogger(error);

  const handlePagination = (current: number) => {
    setPage(current);
    fetchMore({
      variables: {
        page: current,
        limit: limit.value
      }
    });
  };

  if (loading) {
    return <Loader text={t('common:text-loading')} />;
  }
  if (!isEmpty(error)) {
    return <ErrorMessage message={error.message} />;
  }

  return (
    <>
      <Head>
        <title>Hero Banner | Dropgala</title>
        <link
          rel="icon"
          type="image/svg"
          sizes="32x32"
          href="/svg/slider.svg"
        />
      </Head>
      <PageMainAction
        href={`${ROUTES.HERO_BANNER}/create`}
        title={t('form:input-label-hero-banner')}
        label={t('form:button-label-add-slide')}
      />
      <PageMainHeader
        columns={COLUMNS['hero-carousel']}
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
      <HeroBannerList
        heroBannerList={heroSlideList}
        selectedColumns={selectedTableColumns}
      />
    </>
  );
}

HeroBanner.Layout = AppLayout;

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
        'form',
        'common',
        'table',
        'error'
      ])),
      client: { ...(client ?? {}), csrfToken, csrfError }
    }
  };
};
