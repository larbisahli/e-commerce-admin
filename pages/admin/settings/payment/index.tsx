import { ArrowPrev } from '@components/icons/arrow-prev';
import AppLayout from '@components/layouts/app';
import Button from '@components/ui/button';
import { useErrorLogger, useGetClient } from '@hooks/index';
import { XSRFHandler, verifyAuth } from '@middleware/utils';
import { SSRProps } from '@ts-types/custom.types';
import { ROUTES } from '@utils/routes';
import type { GetServerSideProps } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import dynamic from 'next/dynamic';
import { useQuery } from '@apollo/client';
import { isEmpty } from 'lodash';
import { GET_OFFLINE_PAYMENTS } from '@graphql/payment';
import { useMemo } from 'react';
import { PaymentType } from '@ts-types/generated';
import Loader from '@components/ui/loader/loader';

const OfflinePayments = dynamic(
  () => import('@components/payments/offline-payments'),
  { ssr: true }
);

const OnlinePayments = dynamic(
  () => import('@components/payments/online-payments'),
  { ssr: true }
);

interface OptionsVariable {
  etag: string;
}

interface TPayment {
  getOfflinePayments: PaymentType[];
}

export default function Payment({ client }: SSRProps) {
  const router = useRouter();

  const { t } = useTranslation();

  useGetClient(client);

  const {
    userInfo: { store: { etag } = {} }
  } = useGetClient(client);

  const { data, loading, error } = useQuery<TPayment, OptionsVariable>(
    GET_OFFLINE_PAYMENTS,
    {
      variables: {
        etag: etag?.paymentEtag
      },
      fetchPolicy: 'cache-and-network',
      skip: isEmpty(etag)
    }
  );

  useErrorLogger(error);

  const { getOfflinePayments = [] } = data ?? {};

  const offlinePayments = useMemo(() => {
    return getOfflinePayments.reduce(
      (obj, cur) => ({ ...obj, [cur.code]: cur }),
      {}
    );
  }, [getOfflinePayments]);

  const onlinePayments = [];

  return (
    <>
      <Head>
        <title>Payments | Dropgala</title>
        <link
          rel="icon"
          type="image/svg"
          sizes="32x32"
          href="/svg/settings.svg"
        />
      </Head>
      <div className="border-b pb-3">
        <Button
          variant="outline"
          onClick={() => router.push(`${ROUTES.SETTINGS}`)}
          type="button"
          className="mb-4"
        >
          <ArrowPrev />
          <span>Settings</span>
        </Button>
        <h1 className="flex flex-1 text-2xl font-bold text-gray-700">
          Payment Methods
        </h1>
      </div>
      <p className="mt-4 text-gray-500">
        Set up payment methods for the currencies you support on your store.{' '}
      </p>
      <OfflinePayments initialValues={offlinePayments} loading={loading} />
      <OnlinePayments initialValues={onlinePayments} />
    </>
  );
}
Payment.Layout = AppLayout;

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
        'table',
        'common',
        'form',
        'error'
      ])),
      client: { ...(client ?? {}), csrfToken, csrfError }
    }
  };
};
