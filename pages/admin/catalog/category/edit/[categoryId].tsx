import { useQuery } from '@apollo/client';
import { PageFormPlaceholder } from '@components/common/commonComponents';
import AppLayout from '@components/layouts/app';
import ErrorMessage from '@components/ui/error-message';
import { CATEGORY } from '@graphql/category';
import { useErrorLogger, useGetUser } from '@hooks/index';
import { useSettings } from '@hooks/useSettings';
import { verifyAuth, XSRFHandler } from '@middleware/utils';
import { LanguageProps, SSRProps } from '@ts-types/custom.types';
import { Category } from '@ts-types/generated';
import { ROUTES } from '@utils/routes';
import { isEmpty } from 'lodash';
import type { GetServerSideProps } from 'next';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const CreateOrUpdateCategoriesForm = dynamic(
  () => import('@components/category/category-form'),
  { ssr: true, loading: () => <PageFormPlaceholder /> }
);

interface TCategory {
  category: Category;
}
interface OptionsVariable extends LanguageProps {
  id: number;
}

export default function UpdateCategoriesPage({ client }: SSRProps) {
  const { query } = useRouter();
  const { t } = useTranslation();

  const categoryId = parseInt(query.categoryId as string, 10);

  const { selectedLanguage } = useSettings();

  const { data, loading, error } = useQuery<TCategory, OptionsVariable>(
    CATEGORY,
    {
      variables: {
        id: categoryId,
        language: selectedLanguage
      },
      fetchPolicy: 'cache-and-network',
      skip: isEmpty(selectedLanguage)
    }
  );

  const { category = [] } = data ?? {};

  useGetUser(client);
  useErrorLogger(error);

  if (isEmpty(category) || loading) {
    return <PageFormPlaceholder />;
  }
  if (error) {
    return <ErrorMessage message={error.message} />;
  }

  return (
    <>
      <Head>
        <title>Edit Category | Dropgala</title>
        <link
          rel="icon"
          type="image/svg"
          sizes="32x32"
          href="/svg/category.svg"
        />
      </Head>
      <CreateOrUpdateCategoriesForm initialValues={category} />
    </>
  );
}

UpdateCategoriesPage.Layout = AppLayout;

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
      ...(await serverSideTranslations(locale, ['form', 'common', 'error'])),
      client: { ...(client ?? {}), csrfToken, csrfError }
    }
  };
};
