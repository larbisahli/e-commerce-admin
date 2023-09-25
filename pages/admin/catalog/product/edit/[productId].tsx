import { useQuery } from '@apollo/client';
import { PageFormPlaceholder } from '@components/common/commonComponents';
import AppLayout from '@components/layouts/app';
import ErrorMessage from '@components/ui/error-message';
import { PRODUCT } from '@graphql/product';
import { useGetUser } from '@hooks/index';
import { useErrorLogger } from '@hooks/useErrorLogger';
import { useSettings } from '@hooks/useSettings';
import { verifyAuth, XSRFHandler } from '@middleware/utils';
import type { LanguageProps, SSRProps } from '@ts-types/custom.types';
import type { Product } from '@ts-types/generated';
import { ROUTES } from '@utils/routes';
import { isEmpty } from 'lodash';
import type { GetServerSideProps } from 'next';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const CreateOrUpdateProductForm = dynamic(() => import('@components/product'), {
  ssr: true,
  loading: () => <PageFormPlaceholder />
});

interface TProduct {
  product: Product;
}
interface productVariable extends LanguageProps {
  id: number;
}

export default function UpdateProductPage({ client }: SSRProps) {
  const { t } = useTranslation();
  const { query } = useRouter();

  const productId = parseInt(query.productId as string, 10);

  const { selectedLanguage } = useSettings();

  const { data, loading, error } = useQuery<TProduct, productVariable>(
    PRODUCT,
    {
      variables: { id: productId, language: selectedLanguage },
      fetchPolicy: 'cache-and-network',
      skip: isEmpty(selectedLanguage)
    }
  );

  useGetUser(client);
  useErrorLogger(error);

  const { product = {} } = data ?? {};

  if (isEmpty(product) || loading) {
    return <PageFormPlaceholder />;
  }

  if (error) {
    return <ErrorMessage message={error.message} />;
  }

  return (
    <>
      <Head>
        <title>Edit Product | Dropgala</title>
        <link
          rel="icon"
          type="image/svg"
          sizes="32x32"
          href="/svg/product.svg"
        />
      </Head>
      <CreateOrUpdateProductForm initialValues={product} />
    </>
  );
}

UpdateProductPage.Layout = AppLayout;

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
