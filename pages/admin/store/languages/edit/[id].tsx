import { useQuery } from '@apollo/client';
import AppLayout from '@components/layouts/app';
import ErrorMessage from '@components/ui/error-message';
import Loader from '@components/ui/loader/loader';
import { TAG } from '@graphql/tag';
import { useErrorLogger, useGetUser } from '@hooks/index';
import { verifyAuth, XSRFHandler } from '@middleware/utils';
import { SSRProps } from '@ts-types/custom.types';
import { Tag } from '@ts-types/generated';
import { ROUTES } from '@utils/routes';
import type { GetServerSideProps } from 'next';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const LanguageForm = dynamic(
  () => import('@components/language/language-form'),
  { ssr: true }
);

interface TTag {
  tag: Tag;
}
interface OptionsVariable {
  id: number;
}

export default function UpdateTagPage({ client }: SSRProps) {
  const { t } = useTranslation();
  const { query } = useRouter();

  const id = parseInt(query.id as string, 10);

  // const { data, loading, error } = useQuery<TTag, OptionsVariable>(TAG, {
  //   variables: { id },
  //   fetchPolicy: 'cache-and-network'
  // });

  // const { tag = [] } = data ?? {};

  useGetUser(client);
  // useErrorLogger(error);

  // if (loading) {
  //   return <Loader text={t('common:text-loading')} />;
  // }
  // if (error) {
  //   return <ErrorMessage message={error.message} />;
  // }

  return (
    <>
      <Head>
        <title>Edit Language | Dropgala</title>
        <link rel="icon" type="image/svg" sizes="32x32" href="/svg/tag.svg" />
      </Head>
      <div className="py-5 sm:py-8 flex border-b border-dashed border-gray-300">
        <h1 className="text-xl font-semibold text-heading">
          {t('form:button-label-edit-language')}
        </h1>
      </div>
      <LanguageForm />
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
