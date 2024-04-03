import AppLayout from '@components/layouts/app';
import { useGetUser } from '@hooks/index';
import { verifyAuth, XSRFHandler } from '@middleware/utils';
import { SSRProps } from '@ts-types/custom.types';
import { ROUTES } from '@utils/routes';
import type { GetServerSideProps } from 'next';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const CreateOrUpdateCustomerForm = dynamic(
  () => import('@components/customers/customer-form'),
  { ssr: true }
);

export default function CreateSlidePage({ client }: SSRProps) {
  useGetUser(client);
  return (
    <>
      <Head>
        <title>New Customer | Dropgala</title>
        <link
          rel="icon"
          type="image/svg"
          sizes="32x32"
          href="/svg/customer.svg"
        />
      </Head>
      <CreateOrUpdateCustomerForm />
    </>
  );
}

CreateSlidePage.Layout = AppLayout;

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
