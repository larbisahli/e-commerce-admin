import { useQuery } from '@apollo/client';
import AppLayout from '@components/layouts/app';
import ErrorMessage from '@components/ui/error-message';
import Loader from '@components/ui/loader/loader';
import { FormPlaceholder } from '@components/ui/placeholders/Form';
import { FormActionPlaceholder } from '@components/ui/placeholders/FormAction';
import { ORDER_STATUS } from '@graphql/order-status';
import { useGetUser } from '@hooks/index';
import { useErrorLogger } from '@hooks/useErrorLogger';
import { useSettings } from '@hooks/useSettings';
import { verifyAuth, XSRFHandler } from '@middleware/utils';
import { LanguageProps, SSRProps } from '@ts-types/custom.types';
import { OrderStatus } from '@ts-types/generated';
import { ROUTES } from '@utils/routes';
import { isEmpty } from 'lodash';
import type { GetServerSideProps } from 'next';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const CreateOrUpdateOrderStatusForm = dynamic(
  () => import('@components/order-status/order-status-form'),
  { ssr: true }
);

interface TOrderStatus {
  orderStatus: OrderStatus;
}
interface OptionsVariable extends LanguageProps {
  id: number;
}

export default function UpdateOrderStatusPage({ client }: SSRProps) {
  const { query } = useRouter();
  const { t } = useTranslation();

  const statusId = parseInt(query.statusId as string, 10);

  const { defaultLanguage, selectedLanguage } = useSettings();

  const { data, loading, error } = useQuery<TOrderStatus, OptionsVariable>(
    ORDER_STATUS,
    {
      variables: { id: statusId, language: selectedLanguage, defaultLanguage },
      fetchPolicy: 'cache-and-network',
      skip: isEmpty(selectedLanguage)
    }
  );

  const { orderStatus = [] } = data ?? {};

  useGetUser(client);
  useErrorLogger(error);

  if (isEmpty(orderStatus) || loading) {
    return (
      <div>
        <FormActionPlaceholder />
        <FormPlaceholder />
      </div>
    );
  }
  if (error) {
    return <ErrorMessage message={error.message} />;
  }

  return (
    <>
      <Head>
        <title>Edit Order Status | Dropgala</title>
        <link rel="icon" type="image/svg" sizes="32x32" href="/svg/media.svg" />
      </Head>
      <CreateOrUpdateOrderStatusForm initialValues={orderStatus} />
    </>
  );
}

UpdateOrderStatusPage.Layout = AppLayout;

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
        'form',
        'common',
        'table',
        'error'
      ])),
      client: { ...(client ?? {}), csrfToken, csrfError }
    }
  };
};
