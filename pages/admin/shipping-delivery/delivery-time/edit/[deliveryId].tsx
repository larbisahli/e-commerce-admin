import { useQuery } from '@apollo/client';
import AppLayout from '@components/layouts/app';
import ErrorMessage from '@components/ui/error-message';
import Loader from '@components/ui/loader/loader';
import { DELIVERY_TIME } from '@graphql/delivery-time';
import { useGetUser } from '@hooks/index';
import { useErrorLogger } from '@hooks/useErrorLogger';
import { useSettings } from '@hooks/useSettings';
import { verifyAuth, XSRFHandler } from '@middleware/utils';
import type { LanguageProps, SSRProps } from '@ts-types/custom.types';
import { DeliveryTimeType } from '@ts-types/generated';
import { ROUTES } from '@utils/routes';
import { isEmpty } from 'lodash';
import type { GetServerSideProps } from 'next';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const CreateOrUpdateDeliveryForm = dynamic(
  () => import('@components/delivery-time/delivery-form'),
  { ssr: true }
);

interface DeliveryVariable extends LanguageProps {
  id: number;
}

export default function UpdateShippingPage({ client }: SSRProps) {
  const { t } = useTranslation();
  const { query } = useRouter();

  const deliveryId = parseInt(query.deliveryId as string, 10);

  const { selectedLanguage } = useSettings();

  const { data, loading, error } = useQuery<
    { deliveryTime: DeliveryTimeType },
    DeliveryVariable
  >(DELIVERY_TIME, {
    variables: { id: deliveryId, language: selectedLanguage },
    fetchPolicy: 'cache-and-network',
    skip: isEmpty(selectedLanguage)
  });

  const { deliveryTime } = data ?? {};

  useGetUser(client);
  useErrorLogger(error);

  if (loading) {
    return <Loader text={t('common:text-loading')} />;
  }

  if (error) {
    return <ErrorMessage message={error.message} />;
  }

  return (
    <>
      <Head>
        <title>Delivery time | Dropgala</title>
        <link
          rel="icon"
          type="image/svg"
          sizes="32x32"
          href="/svg/deliveryTime.svg"
        />
      </Head>
      <div className="flex border-b border-dashed border-border-base py-5 sm:py-8">
        <h1 className="text-lg font-semibold text-heading">
          {t('form:form-title-update-shipping')}
        </h1>
      </div>
      <CreateOrUpdateDeliveryForm initialValues={deliveryTime} />
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
