import { useQuery } from '@apollo/client';
import PageMainHeader from '@components/common/page-main-header';
import PageMainAction from '@components/common/PageMainAction';
import HeroCarouselList from '@components/hero-carousel/hero-carousel-list';
import AppLayout from '@components/layouts/app';
import ErrorMessage from '@components/ui/error-message';
import Loader from '@components/ui/loader/loader';
import { HERO_CAROUSEL_LIST } from '@graphql/hero-carousel';
import { useErrorLogger, useGetStaff } from '@hooks/index';
import { useTableColumn } from '@hooks/useTableColumn';
import { verifyAuth } from '@middleware/utils';
import { SSRProps } from '@ts-types/custom.types';
import { HeroCarouselType } from '@ts-types/generated';
import { COLUMNS } from '@utils/data/table-columns';
import { ROUTES } from '@utils/routes';
import isEmpty from 'lodash/isEmpty';
import type { GetServerSideProps } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useState } from 'react';

interface THeroCarousel {
  heroSlideList: HeroCarouselType[];
  heroSlideListCount: { count: number };
}

interface OptionsVariable {
  page: number;
  limit: number;
}

export default function HeroCarousel({ client }: SSRProps) {
  const { t } = useTranslation();

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState({ id: 1, value: 10, label: 10 });

  const { selectedTableColumns, handleColumnChange } =
    useTableColumn('hero-carousel');

  const { data, loading, error, fetchMore } = useQuery<
    THeroCarousel,
    OptionsVariable
  >(HERO_CAROUSEL_LIST, {
    variables: {
      page,
      limit: limit.value
    },
    fetchPolicy: 'cache-and-network'
  });

  const { heroSlideList = [], heroSlideListCount: { count } = { count: 0 } } =
    data ?? {};

  useGetStaff(client);
  useErrorLogger(error);

  const handlePagination = (current: number) => {
    setPage(current);
    fetchMore({
      variables: {
        page: current,
        limit
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
      <PageMainAction
        href={`${ROUTES.HERO_CAROUSEL}/create`}
        title={t('form:input-label-hero-carousel')}
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
      <HeroCarouselList
        heroCarouselList={heroSlideList}
        selectedColumns={selectedTableColumns}
      />
    </>
  );
}

HeroCarousel.Layout = AppLayout;

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
