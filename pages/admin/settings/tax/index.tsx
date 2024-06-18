import { useQuery } from '@apollo/client';
import AppLayout from '@components/layouts/app';
import TaxList from '@components/tax/tax-list';
import ErrorMessage from '@components/ui/error-message';
import { TAXES } from '@graphql/tax';
import { useErrorLogger, useGetClient } from '@hooks/index';
import { useSettings } from '@hooks/useSettings';
import { useTableColumn } from '@hooks/useTableColumn';
import { verifyAuth, XSRFHandler } from '@middleware/utils';
import { LanguageProps, SSRProps } from '@ts-types/custom.types';
import { OrderBy, SortOrder } from '@ts-types/enums';
import { HeroBannerType, TaxType } from '@ts-types/generated';
import { ROUTES } from '@utils/routes';
import isEmpty from 'lodash/isEmpty';
import type { GetServerSideProps } from 'next';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useState } from 'react';

const PageMainAction = dynamic(
  () => import('@components/common/PageMainAction'),
  {
    ssr: true,
    loading: () => <div className="animated-background h-[80px] w-full"></div>
  }
);

interface THeroBanner {
  taxes: TaxType[];
  taxCount: { count: number };
}

interface OptionsVariable {
  page: number;
  limit: number;
  orderBy: OrderBy;
  sortedBy: SortOrder;
  etag: string;
}

export default function HeroBanner({ client }: SSRProps) {
  const { t } = useTranslation();

  const [orderBy, setOrder] = useState(OrderBy.CREATED_AT);
  const { selectedTableColumns } = useTableColumn('tax');

  const {
    userInfo: { store: { etag } = {} }
  } = useGetClient(client);

  const { data, loading, error } = useQuery<THeroBanner, OptionsVariable>(
    TAXES,
    {
      variables: {
        page: 1,
        limit: 999,
        orderBy,
        sortedBy: SortOrder.Desc,
        etag: etag?.taxEtag
      },
      fetchPolicy: 'cache-and-network',
      skip: isEmpty(etag)
    }
  );

  const { taxes = [], taxCount: { count } = { count: 0 } } = data ?? {};

  useErrorLogger(error);

  if (!isEmpty(error)) {
    return <ErrorMessage message={error.message} />;
  }

  return (
    <>
      <Head>
        <title>Tax | Dropgala</title>
        <link rel="icon" type="image/svg" sizes="32x32" href="/svg/tax.svg" />
      </Head>
      <PageMainAction
        showSelectLanguage={false}
        hideBorder
        href={`${ROUTES.TAX}/create`}
        title={t('form:input-label-Tax')}
        label={t('form:input-label-Tax')}
      />
      <div className="mb-5 flex flex-1 items-end justify-end py-2">
        <div className="w-full whitespace-nowrap text-sm text-gray-900">
          <span className="">{count}</span>
          <span className="px-1">records found</span>
        </div>
      </div>
      <TaxList
        loading={loading}
        taxes={taxes}
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
