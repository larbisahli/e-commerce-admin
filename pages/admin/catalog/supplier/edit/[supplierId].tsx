import { useQuery } from '@apollo/client';
import { PageFormPlaceholder } from '@components/common/commonComponents';
import AppLayout from '@components/layouts/app';
import ErrorMessage from '@components/ui/error-message';
import { SUPPLIER } from '@graphql/supplier';
import { useGetClient } from '@hooks/index';
import { useErrorLogger } from '@hooks/useErrorLogger';
import { verifyAuth, XSRFHandler } from '@middleware/utils';
import type { SSRProps } from '@ts-types/custom.types';
import type { Suppliers } from '@ts-types/generated';
import { ROUTES } from '@utils/routes';
import { isEmpty } from 'lodash';
import type { GetServerSideProps } from 'next';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const CreateOrUpdateSupplierForm = dynamic(
  () => import('@components/suppliers/supplier-form'),
  { ssr: true, loading: () => <PageFormPlaceholder /> }
);

interface TAttribute {
  supplier: Suppliers;
}
interface OptionsVariable {
  id: number;
  etag: string;
}

export default function UpdateSupplierPage({ client }: SSRProps) {
  const { query } = useRouter();

  const supplierId = parseInt(query.supplierId as string, 10);

  const {
    userInfo: { store: { etag } = {} }
  } = useGetClient(client);

  const { data, loading, error } = useQuery<TAttribute, OptionsVariable>(
    SUPPLIER,
    {
      variables: {
        id: supplierId,
        etag: etag?.supplierEtag
      },
      fetchPolicy: 'cache-and-network',
      skip: isEmpty(etag)
    }
  );

  const { supplier = [] } = data ?? {};

  useErrorLogger(error);

  if (isEmpty(supplier) || loading) {
    return <PageFormPlaceholder />;
  }

  if (error) {
    return <ErrorMessage message={error.message} />;
  }

  return (
    <>
      <Head>
        <title>New Supplier | Dropgala</title>
        <link
          rel="icon"
          type="image/svg"
          sizes="32x32"
          href="/svg/supplier.svg"
        />
      </Head>
      <CreateOrUpdateSupplierForm initialValues={supplier} />
    </>
  );
}

UpdateSupplierPage.Layout = AppLayout;

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
