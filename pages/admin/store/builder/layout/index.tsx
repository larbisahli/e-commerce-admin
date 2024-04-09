import BuilderLayout from '@components/layouts/builder';
import NavigationLink from '@components/store-builder/navigationLink';
import { useGetUser } from '@hooks/index';
import { verifyAuth, XSRFHandler } from '@middleware/utils';
import type { SSRProps } from '@ts-types/custom.types';
import { ROUTES } from '@utils/routes';
import type { GetServerSideProps } from 'next';
import Head from 'next/head';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export default function CreateSupplierPage({ client }: SSRProps) {
  useGetUser(client);
  return (
    <>
      <Head>
        <title>Store Builder | Dropgala</title>
        <link
          rel="icon"
          type="image/svg"
          sizes="32x32"
          href="/svg/supplier.svg"
        />
      </Head>
      <div>
        <NavigationLink />
      </div>
    </>
  );
}

CreateSupplierPage.Layout = BuilderLayout;

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

// store-design/layout/index/sections/header
// store-design/layout/8c4cc176-0c02-4bc6-b39c-458a8689512d/ (privacy page)
// store-design/layout/8c4cc176-0c02-4bc6-b39c-458a8689512d/sections/header

// store-design/general/logo-identity
// store-design/general/colors-appearance
// store-design/general/typography
// store-design/general/analytics
// store-design/general/social-links
// store-design/general/templates
