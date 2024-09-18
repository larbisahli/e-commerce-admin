import AppLayout from '@components/layouts/app';
import { useGetClient } from '@hooks/useGetClient';
import { verifyAuth, XSRFHandler } from '@middleware/utils';
import { SSRProps } from '@ts-types/custom.types';
import { ROUTES } from '@utils/routes';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import dynamic from 'next/dynamic';
import { GET_CHECKOUT_SETTINGS } from '@graphql/settings';
import { useQuery } from '@apollo/client';
import { useErrorLogger } from '@hooks/useErrorLogger';
import Loader from '@components/ui/loader/loader';
import { isEmpty } from 'lodash';
import ErrorMessage from '@components/ui/error-message';

const CheckoutSettingsComponent = dynamic(
  () => import('@components/checkout-settings'),
  {
    ssr: true
  }
);

interface tSettings {
  getCheckoutSettings: {
    fields: any[];
  };
}

export default function CheckoutSettings({ client }: SSRProps) {
  const {
    userInfo: { store: { etag } = {} }
  } = useGetClient(client);

  const { data, loading, error } = useQuery<tSettings>(GET_CHECKOUT_SETTINGS, {
    variables: {
      etag: etag?.configEtag
    },
    fetchPolicy: 'cache-and-network',
    skip: isEmpty(etag)
  });

  const { getCheckoutSettings = {} } = data ?? {};

  useErrorLogger(error);

  if (!isEmpty(error)) {
    return <ErrorMessage message={error.message} />;
  }
  return (
    <>
      <Head>
        <title>Checkout Settings | Dropgala</title>
        <link
          rel="icon"
          type="image/svg"
          sizes="32x32"
          href="/svg/settings.svg"
        />
      </Head>
      {loading && (
        <div className="absolute top-0 right-0 left-0 bottom-0 z-10 flex items-center justify-center">
          <div
            style={{ backdropFilter: 'blur(1px)' }}
            className="absolute inset-0 h-full w-full"
          ></div>
          <div className="z-10">
            <Loader special />
          </div>
        </div>
      )}
      <div className="border-b pb-3">
        {!loading && !isEmpty(getCheckoutSettings) && (
          <CheckoutSettingsComponent initialValues={getCheckoutSettings} />
        )}
      </div>
    </>
  );
}

CheckoutSettings.Layout = AppLayout;

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
