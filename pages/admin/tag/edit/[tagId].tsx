import { useQuery } from '@apollo/client';
import AppLayout from '@components/layouts/app';
import ErrorMessage from '@components/ui/error-message';
import Loader from '@components/ui/loader/loader';
import { TAG } from '@graphql/tag';
import { useErrorLogger, useGetUser } from '@hooks/index';
import { useSettings } from '@hooks/useSettings';
import { verifyAuth, XSRFHandler } from '@middleware/utils';
import { LanguageProps, SSRProps } from '@ts-types/custom.types';
import { Tag } from '@ts-types/generated';
import { ROUTES } from '@utils/routes';
import { isEmpty } from 'lodash';
import type { GetServerSideProps } from 'next';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const CreateOrUpdateTagForm = dynamic(
  () => import('@components/tag/tag-form'),
  { ssr: true }
);

interface TTag {
  tag: Tag;
}

interface OptionsVariable extends LanguageProps {
  id: number;
}

export default function UpdateTagPage({ client }: SSRProps) {
  const { t } = useTranslation();
  const { query } = useRouter();

  const tagId = parseInt(query.tagId as string, 10);

  const { defaultLanguage, selectedLanguage } = useSettings();

  const { data, loading, error } = useQuery<TTag, OptionsVariable>(TAG, {
    variables: { id: tagId, language: selectedLanguage, defaultLanguage },
    fetchPolicy: 'cache-and-network',
    skip: isEmpty(selectedLanguage),
  });

  const { tag = [] } = data ?? {};

  useGetUser(client);
  useErrorLogger(error);

  if (loading) {
    return <Loader text={t('common:text-loading')} height="400px" />;
  }

  if (error) {
    return <ErrorMessage message={error.message} />;
  }

  return (
    <>
      <Head>
        <title>Edit Tag | Dropgala</title>
        <link rel="icon" type="image/svg" sizes="32x32" href="/svg/tag.svg" />
      </Head>
      <CreateOrUpdateTagForm initialValues={tag} />
    </>
  );
}

UpdateTagPage.Layout = AppLayout;

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
