import { useQuery } from '@apollo/client';
import { PageFormPlaceholder } from '@components/common/commonComponents';
import AppLayout from '@components/layouts/app';
import ErrorMessage from '@components/ui/error-message';
import { TAX } from '@graphql/tax';
import { useErrorLogger, useGetUser } from '@hooks/index';
import { useSettings } from '@hooks/useSettings';
import { verifyAuth, XSRFHandler } from '@middleware/utils';
import { SSRProps } from '@ts-types/custom.types';
import { CustomerType } from '@ts-types/generated';
import { ROUTES } from '@utils/routes';
import { isEmpty } from 'lodash';
import type { GetServerSideProps } from 'next';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const CreateOrUpdateCustomerForm = dynamic(
  () => import('@components/customers/customer-form'),
  { ssr: true }
);

interface THeroSlider {
  customer: CustomerType;
}
interface OptionsVariable {
  id: number;
}

export default function UpdateTaxPage({ client }: SSRProps) {
  const { query } = useRouter();

  const customerId = parseInt(query.customerId as string, 10);

  const { selectedLanguage } = useSettings();

  const { data, loading, error } = useQuery<THeroSlider, OptionsVariable>(TAX, {
    variables: { id: customerId },
    fetchPolicy: 'cache-and-network',
    skip: isEmpty(selectedLanguage)
  });

  const { customer = {} } = data ?? {};

  useGetUser(client);
  useErrorLogger(error);

  if (isEmpty(customerId) || loading) {
    return <PageFormPlaceholder />;
  }

  if (error) {
    return <ErrorMessage message={error.message} />;
  }

  return (
    <>
      <Head>
        <title>Edit Customer | Dropgala</title>
        <link
          rel="icon"
          type="image/svg"
          sizes="32x32"
          href="/svg/customer.svg"
        />
      </Head>
      <CreateOrUpdateCustomerForm initialValues={customer} />
    </>
  );
}

UpdateTaxPage.Layout = AppLayout;

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
