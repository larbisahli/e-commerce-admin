import { useQuery } from '@apollo/client';
import { BackArrowIcon } from '@components/icons/builder/arrow-back';
import BuilderLayout from '@components/layouts/builder';
import ErrorMessage from '@components/ui/error-message';
import Loader from '@components/ui/loader/loader';
import { STORE_SETTINGS } from '@graphql/settings';
import { useErrorLogger, useGetUser } from '@hooks/index';
import { verifyAuth, XSRFHandler } from '@middleware/utils';
import type { SSRProps } from '@ts-types/custom.types';
import { SettingsType } from '@ts-types/generated';
import { ROUTES } from '@utils/routes';
import { isEmpty } from 'lodash';
import type { GetServerSideProps } from 'next';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import Link from 'next/link';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const SocialLinksForm = dynamic(
  () => import('@components/store-builder/general/social-links'),
  { ssr: true, loading: () => <div></div> }
);

interface tSettings {
  getStoreSettings: SettingsType;
}

export default function CreateSupplierPage({ client }: SSRProps) {
  useGetUser(client);

  const { data, loading, error } = useQuery<tSettings>(STORE_SETTINGS, {
    variables: {},
    fetchPolicy: 'cache-and-network'
  });

  const { getStoreSettings: settings } = data ?? {};

  useGetUser(client);
  useErrorLogger(error);

  if (isEmpty(settings) || loading) {
    return (
      <div className="absolute left-1/2 mt-96 -translate-x-1/2 -translate-y-1/2 transform">
        <Loader special />
      </div>
    );
  }

  if (error) return <ErrorMessage message={error.message} />;

  return (
    <>
      <Head>
        <title>Social links | Dropgala</title>
        <link
          rel="icon"
          type="image/svg"
          sizes="32x32"
          href="/svg/supplier.svg"
        />
      </Head>
      <div>
        <div className="mt-5">
          <div className="mb-5">
            <Link
              href={ROUTES.BUILDER_GENERAL}
              className="absolute left-0 cursor-pointer pt-1 text-gray-500 hover:text-black"
            >
              <BackArrowIcon width={20} height={20} />
            </Link>
            <h3 className="text flex-1 text-center text-xl font-semibold text-black">
              Social links
            </h3>
          </div>
          <div>
            <SocialLinksForm />
          </div>
        </div>
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
