import { useQuery } from '@apollo/client';
import { PageFormPlaceholder } from '@components/common/commonComponents';
import AppLayout from '@components/layouts/app';
import ErrorMessage from '@components/ui/error-message';
import { STORE_SETTINGS } from '@graphql/settings';
import { useErrorLogger } from '@hooks/useErrorLogger';
import { useGetClient } from '@hooks/useGetClient';
import { verifyAuth, XSRFHandler } from '@middleware/utils';
import { SSRProps } from '@ts-types/custom.types';
import { SettingsType } from '@ts-types/generated';
import { ROUTES } from '@utils/routes';
import { isEmpty } from 'lodash';
import { GetServerSideProps } from 'next';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const StoreSettingsForm = dynamic(
  () => import('@components/settings/store-settings-form'),
  { ssr: true, loading: () => <PageFormPlaceholder /> }
);

interface tSettings {
  getStoreSettings: SettingsType;
}

export default function StoreSettings({ client }: SSRProps) {
  const { t } = useTranslation();

  const {
    userInfo: { store: { etag } = {} }
  } = useGetClient(client);

  const { data, loading, error } = useQuery<tSettings>(STORE_SETTINGS, {
    variables: {
      etag: etag?.configEtag
    },
    fetchPolicy: 'cache-and-network',
    skip: isEmpty(etag)
  });

  const { getStoreSettings: settings } = data ?? {};

  useErrorLogger(error);

  if (isEmpty(settings) || loading) {
    return <PageFormPlaceholder />;
  }

  if (error) return <ErrorMessage message={error.message} />;

  return (
    <>
      <Head>
        <title>Settings | Dropgala</title>
        <link
          rel="icon"
          type="image/svg"
          sizes="32x32"
          href="/svg/settings.svg"
        />
      </Head>
      <StoreSettingsForm settings={settings} />
    </>
  );
}

StoreSettings.Layout = AppLayout;

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
