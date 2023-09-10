import AppLayout from '@components/layouts/app';
import { useGetUser } from '@hooks/index';
import { verifyAuth, XSRFHandler } from '@middleware/utils';
import { SSRProps } from '@ts-types/custom.types';
import { ROUTES } from '@utils/routes';
import type { GetServerSideProps } from 'next';
// import dynamic from 'next/dynamic';
import Head from 'next/head';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

// const StoreViewForm = dynamic(
//   () => import('@components/store-views/store-view-form'),
//   { ssr: true }
// );

interface Props extends SSRProps {
  localeFiles: { [key: string]: string };
}

export default function UpdateTagPage({ client }: Props) {
  const { t } = useTranslation();

  useGetUser(client);

  return (
    <>
      <Head>
        <title>New Store View | Dropgala</title>
        <link
          rel="icon"
          type="image/svg"
          sizes="32x32"
          href="/svg/system-store.svg"
        />
      </Head>
      <div className="flex border-b border-dashed border-gray-300 py-5 sm:py-8">
        <h1 className="text-xl font-semibold text-heading">
          {t('form:label-new-store-view')}
        </h1>
      </div>
      {/* <StoreViewForm /> */}
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
