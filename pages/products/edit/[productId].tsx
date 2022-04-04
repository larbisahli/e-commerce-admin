import { useQuery } from '@apollo/client';
import AppLayout from '@components/layouts/app';
import CreateOrUpdateProductForm from '@components/product/product-form';
import ErrorMessage from '@components/ui/error-message';
import Loader from '@components/ui/loader/loader';
import { PRODUCT } from '@graphql/product';
import { useErrorLogger } from '@hooks/useErrorLogger';
import { useGetStaff } from '@hooks/useGetStaff';
import { getClientToken, verifyAuth } from '@middleware/utils';
import type { SSRProps } from '@ts-types/custom.types';
import type { Product } from '@ts-types/generated';
import { ROUTES } from '@utils/routes';
import type { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

interface TProduct {
  productForAdmin: Product;
}
interface productVariable {
  id: string | string[];
}

export default function UpdateProductPage({ client }: SSRProps) {
  const { t } = useTranslation();
  const { query } = useRouter();

  const { productId } = query;

  const { data, loading, error } = useQuery<TProduct, productVariable>(
    PRODUCT,
    {
      variables: { id: productId },
      fetchPolicy: 'cache-and-network'
    }
  );

  useGetStaff(client?.staff_id);
  useErrorLogger(error);

  console.log('data >>>>', data);

  const productForAdmin = data?.productForAdmin;

  if (loading) {
    return <Loader text={t('common:text-loading')} />;
  }

  if (error) {
    return <ErrorMessage message={t('common:MESSAGE_SOMETHING_WENT_WRONG')} />;
  }

  return (
    <>
      <div className="py-5 sm:py-8 flex border-b border-dashed border-border-base">
        <h1 className="text-lg font-semibold text-heading">Edit Product</h1>
      </div>
      <CreateOrUpdateProductForm initialValues={productForAdmin} />
    </>
  );
}

UpdateProductPage.Layout = AppLayout;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { locale } = context;
  const { token }: { token: string } = getClientToken(context);
  const { client } = verifyAuth(token);

  if (!client) {
    return {
      redirect: {
        permanent: false,
        destination: ROUTES.LOGIN
      }
    };
  }

  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'form', 'error'])),
      client
    }
  };
};
