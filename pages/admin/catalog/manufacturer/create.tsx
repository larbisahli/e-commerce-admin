import AppLayout from '@components/layouts/app';
import { useGetUser } from '@hooks/index';
import { verifyAuth, XSRFHandler } from '@middleware/utils';
import type { SSRProps } from '@ts-types/custom.types';
import { ROUTES } from '@utils/routes';
import type { GetServerSideProps } from 'next';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const CreateOrUpdateManufacturerForm = dynamic(
  () => import('@components/manufacturer/manufacturer-form'),
  { ssr: true }
);

export default function CreateManufacturerPage({ client }: SSRProps) {
  const { t } = useTranslation();
  useGetUser(client);

  return (
    <>
      <Head>
        <title>New Manufacturer | Dropgala</title>
        <link
          rel="icon"
          type="image/svg"
          sizes="32x32"
          href="/svg/manufacturer.svg"
        />
      </Head>
      <CreateOrUpdateManufacturerForm />
    </>
  );
}

CreateManufacturerPage.Layout = AppLayout;

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
        'table',
        'common',
        'form',
        'error'
      ])),
      client: { ...(client ?? {}), csrfToken, csrfError }
    }
  };
};
