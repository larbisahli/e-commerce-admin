import { useQuery } from '@apollo/client';
import { PageFormPlaceholder } from '@components/common/commonComponents';
import AppLayout from '@components/layouts/app';
import ErrorMessage from '@components/ui/error-message';
import { GET_PAGE } from '@graphql/pages';
import { useErrorLogger, useGetUser } from '@hooks/index';
import { useSettings } from '@hooks/useSettings';
import { verifyAuth, XSRFHandler } from '@middleware/utils';
import type { SSRProps } from '@ts-types/custom.types';
import type { LanguageType, PageType } from '@ts-types/generated';
import { ROUTES } from '@utils/routes';
import isEmpty from 'lodash/isEmpty';
import type { GetServerSideProps } from 'next';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const PageForm = dynamic(() => import('@components/pages/page-form'), {
  ssr: true,
  loading: () => <PageFormPlaceholder />
});

interface TPage {
  getPage: PageType;
}
interface OptionsVariable {
  slug: string;
  language: LanguageType;
}

export default function AboutUs({ client }: SSRProps) {
  const { t } = useTranslation();

  const { query } = useRouter();

  const slug = query.slug as string;

  const { selectedLanguage } = useSettings();

  const { data, loading, error } = useQuery<TPage, OptionsVariable>(GET_PAGE, {
    variables: {
      slug,
      language: selectedLanguage
    },
    fetchPolicy: 'cache-and-network',
    skip: isEmpty(selectedLanguage)
  });

  const { getPage = {} } = data ?? {};

  useGetUser(client);
  useErrorLogger(error);

  if (isEmpty(getPage) || loading) {
    return <PageFormPlaceholder />;
  }
  if (!isEmpty(error)) {
    return <ErrorMessage message={error.message} />;
  }

  return (
    <>
      <Head>
        <title>{`${getPage?.name ?? ''} | Dropgala`}</title>
        <link rel="icon" type="image/svg" sizes="32x32" href="/svg/store.svg" />
      </Head>
      <PageForm initialValues={getPage} />
    </>
  );
}

AboutUs.Layout = AppLayout;

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
      ...(await serverSideTranslations(locale!, [
        'form',
        'common',
        'table',
        'error'
      ])),
      client: { ...(client ?? {}), csrfToken, csrfError }
    }
  };
};
