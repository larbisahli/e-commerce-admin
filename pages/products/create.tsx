import AppLayout from '@components/layouts/app';
import CreateOrUpdateProductForm from '@components/product/product-form';
import ErrorMessage from '@components/ui/error-message';
import Loader from '@components/ui/loader/loader';
import { verifyAuth } from '@middleware/utils';
import { ROUTES } from '@utils/routes';
import type { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export default function CreateProductPage() {
  const { t } = useTranslation();
  const { query } = useRouter();

  // const {
  //   data,
  //   isLoading: loading,
  //   error,
  // } = useProductQuery(query.productId as string);

  const data = [];
  const loading = false;
  const error = null;

  if (loading) return <Loader text={t('common:text-loading')} />;
  if (error) return <ErrorMessage message={error?.message as string} />;
  return (
    <>
      <div className="py-5 sm:py-8 flex border-b border-dashed border-border-base">
        <h1 className="text-lg font-semibold text-heading">Create Product</h1>
      </div>
      <CreateOrUpdateProductForm />
    </>
  );
}

CreateProductPage.Layout = AppLayout;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { locale } = context;
  const { client } = verifyAuth(context);

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
      ...(await serverSideTranslations(locale, ['common', 'form'])),
      client
    }
  };
};
