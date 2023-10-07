import AppLayout from '@components/layouts/app';
import Loader from '@components/ui/loader/loader';
import { useGetUser } from '@hooks/index';
import { verifyAuth, XSRFHandler } from '@middleware/utils';
import { SSRProps } from '@ts-types/custom.types';
import { ROUTES } from '@utils/routes';
import type { GetServerSideProps } from 'next';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const CreateOrUpdateTagForm = dynamic(
  () => import('@components/tag/tag-form'),
  { ssr: true, loading: () => <Loader /> }
);

export default function CreateCategoriesPage({ client }: SSRProps) {
  useGetUser(client);

  return (
    <>
      <Head>
        <title>Create Tag | Dropgala</title>
        <link rel="icon" type="image/svg" sizes="32x32" href="/svg/tag.svg" />
      </Head>
      <CreateOrUpdateTagForm />
    </>
  );
}

CreateCategoriesPage.Layout = AppLayout;

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
