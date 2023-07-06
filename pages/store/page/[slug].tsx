import { useQuery } from '@apollo/client';
import PageMainAction from '@components/common/PageMainAction';
import AppLayout from '@components/layouts/app';
import PageForm from '@components/pages/page-form';
import ErrorMessage from '@components/ui/error-message';
import Loader from '@components/ui/loader/loader';
import { GET_PAGE } from '@graphql/pages';
import { useErrorLogger, useGetUser } from '@hooks/index';
import { verifyAuth, XSRFHandler } from '@middleware/utils';
import type { SSRProps } from '@ts-types/custom.types';
import type { PageType } from '@ts-types/generated';
import { ROUTES } from '@utils/routes';
import isEmpty from 'lodash/isEmpty';
import type { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

interface TPage {
  getPage: PageType;
}
interface OptionsVariable {
  slug: string;
}

export default function AboutUs({ client }: SSRProps) {
  const { t } = useTranslation();

  const { query } = useRouter();

  const slug = query.slug as string;

  console.log({ slug });

  const { data, loading, error } = useQuery<TPage, OptionsVariable>(GET_PAGE, {
    variables: {
      slug
    },
    fetchPolicy: 'cache-and-network'
  });

  const { getPage = { name: 'Page' } } = data ?? {};

  useGetUser(client);
  useErrorLogger(error);

  if (loading) {
    return <Loader text={t('common:text-loading')} />;
  }
  if (!isEmpty(error)) {
    return <ErrorMessage message={t('common:MESSAGE_SOMETHING_WENT_WRONG')} />;
  }

  return (
    <>
      <PageMainAction title={getPage?.name} label="" />
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
