import { useQuery } from '@apollo/client';
import { PageFormPlaceholder } from '@components/common/commonComponents';
import AppLayout from '@components/layouts/app';
import ErrorMessage from '@components/ui/error-message';
import { BRAND } from '@graphql/brand';
import { useGetClient } from '@hooks/index';
import { useErrorLogger } from '@hooks/useErrorLogger';
import { useSettings } from '@hooks/useSettings';
import { verifyAuth, XSRFHandler } from '@middleware/utils';
import type { LanguageProps, SSRProps } from '@ts-types/custom.types';
import type { BrandType } from '@ts-types/generated';
import { ROUTES } from '@utils/routes';
import { isEmpty } from 'lodash';
import type { GetServerSideProps } from 'next';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const CreateOrUpdateBrandForm = dynamic(
  () => import('@components/brand/brand-form'),
  { ssr: true, loading: () => <PageFormPlaceholder /> }
);

interface TBrand {
  brand: BrandType;
}
interface OptionsVariable extends LanguageProps {
  id: number;
}

export default function UpdateBrandPage({ client }: SSRProps) {
  const { t } = useTranslation();
  const { query } = useRouter();

  const brandId = parseInt(query.brandId as string, 10);

  const { selectedLanguage } = useSettings();

  const {
    userInfo: { store: { etag } = {} }
  } = useGetClient(client);

  const { data, loading, error } = useQuery<TBrand, OptionsVariable>(BRAND, {
    variables: {
      id: brandId,
      language: selectedLanguage,
      etag: etag?.brandEtag
    },
    fetchPolicy: 'cache-and-network',
    skip: isEmpty(selectedLanguage) || isEmpty(etag)
  });

  const { brand = [] } = data ?? {};

  useErrorLogger(error);

  if (isEmpty(brand) || loading) {
    return <PageFormPlaceholder />;
  }

  if (error) {
    return <ErrorMessage message={error.message} />;
  }

  return (
    <>
      <Head>
        <title>Edit Brand | Dropgala</title>
        <link rel="icon" type="image/svg" sizes="32x32" href="/svg/brand.svg" />
      </Head>
      <CreateOrUpdateBrandForm initialValues={brand} />
    </>
  );
}

UpdateBrandPage.Layout = AppLayout;

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
