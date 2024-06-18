import { useQuery } from '@apollo/client';
import { PageFormPlaceholder } from '@components/common/commonComponents';
import AppLayout from '@components/layouts/app';
import ErrorMessage from '@components/ui/error-message';
import { SHIPPING_ZONE } from '@graphql/shipping-zone';
import { useGetClient } from '@hooks/index';
import { useErrorLogger } from '@hooks/useErrorLogger';
import { useSettings } from '@hooks/useSettings';
import { verifyAuth, XSRFHandler } from '@middleware/utils';
import type { LanguageProps, SSRProps } from '@ts-types/custom.types';
import { ShippingZoneType } from '@ts-types/generated';
import { ROUTES } from '@utils/routes';
import { isEmpty } from 'lodash';
import type { GetServerSideProps } from 'next';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const CreateOrUpdateShippingForm = dynamic(
  () => import('@components/shipping-zone/shipping-form'),
  { ssr: true, loading: () => <PageFormPlaceholder /> }
);

interface ShippingVariable extends LanguageProps {
  id: number;
}

export default function UpdateShippingPage({ client }: SSRProps) {
  const { t } = useTranslation();
  const { query } = useRouter();

  const shippingId = parseInt(query.shippingId as string, 10);

  const { systemLanguage } = useSettings();

  const {
    userInfo: { store: { etag } = {} }
  } = useGetClient(client);

  const { data, loading, error } = useQuery<ShippingZoneType, ShippingVariable>(
    SHIPPING_ZONE,
    {
      variables: {
        id: shippingId,
        language: systemLanguage,
        etag: etag?.shipmentEtag
      },
      fetchPolicy: 'cache-and-network',
      skip: isEmpty(systemLanguage) || isEmpty(etag)
    }
  );

  useErrorLogger(error);

  if (isEmpty(data?.shippingZone) || loading) {
    return <PageFormPlaceholder />;
  }

  if (error) {
    return <ErrorMessage message={error.message} />;
  }

  return (
    <>
      <Head>
        <title>Edit Shipping zone | Dropgala</title>
        <link
          rel="icon"
          type="image/svg"
          sizes="32x32"
          href="/svg/shippingZone.svg"
        />
      </Head>
      <CreateOrUpdateShippingForm initialValues={data} />
    </>
  );
}

UpdateShippingPage.Layout = AppLayout;

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
