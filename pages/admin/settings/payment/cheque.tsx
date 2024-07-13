import { useQuery } from '@apollo/client';
import { PageFormPlaceholder } from '@components/common/commonComponents';
import AppLayout from '@components/layouts/app';
import ErrorMessage from '@components/ui/error-message';
import { GET_PAYMENT } from '@graphql/payment';
import { useErrorLogger, useGetClient } from '@hooks/index';
import { verifyAuth,XSRFHandler } from '@middleware/utils';
import { SSRProps } from '@ts-types/custom.types';
import { PaymentType } from '@ts-types/generated';
import { ROUTES } from '@utils/routes';
import { isEmpty } from 'lodash';
import type { GetServerSideProps } from 'next';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { offlinePaymentCodes } from '@ts-types/enums';

const ChequeForm = dynamic(
  () => import('@components/payments/cheque-form'),
  { ssr: true }
);

interface TPayment {
  getPayment: PaymentType;
}

interface OptionsVariable {
  code: string;
  etag: string;
}

export default function Cheque({ client }: SSRProps) {

  const {
    userInfo: { store: { etag } = {} }
  } = useGetClient(client);

  const { data, loading, error } = useQuery<TPayment, OptionsVariable>(GET_PAYMENT, {
    variables: {
      code: offlinePaymentCodes.cheque,
      etag: etag?.paymentEtag
    },
    fetchPolicy: 'cache-and-network',
    skip: isEmpty(etag)
  });

  const { getPayment = {} } = data ?? {};

  useErrorLogger(error);

  if (loading) {
    return <PageFormPlaceholder />;
  }

  if (error) {
    return <ErrorMessage message={error.message} />;
  }

  return (
    <>
      <Head>
        <title>Check | Dropgala</title>
        <link
          rel="icon"
          type="image/svg"
          sizes="32x32"
          href="/svg/settings.svg"
        />
      </Head>
      <ChequeForm initialValues={getPayment}/>
    </>
  );
}
Cheque.Layout = AppLayout;

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
