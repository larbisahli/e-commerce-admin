import { useQuery } from '@apollo/client';
import BuilderLayout from '@components/layouts/builder';
import { ThemeSettingsType } from '@components/store-builder/general/theme-styles';
import NavigationLink from '@components/store-builder/navigationLink';
import Loader from '@components/ui/loader/loader';
import { GET_THEME_SETTINGS } from '@graphql/content';
import { useErrorLogger, useGetClient } from '@hooks/index';
import { verifyAuth, XSRFHandler } from '@middleware/utils';
import type { SSRProps } from '@ts-types/custom.types';
import { ROUTES } from '@utils/routes';
import { isEmpty } from 'lodash';
import type { GetServerSideProps } from 'next';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const ThemeStyles = dynamic(
  () => import('@components/store-builder/general/theme-styles'),
  { ssr: true, loading: () => <Loader special /> }
);

interface TThemeSettings {
  getThemeSettings: ThemeSettingsType;
}

export default function CreateSupplierPage({ client }: SSRProps) {
  const {
    userInfo: { store: { etag } = {} }
  } = useGetClient(client);

  const { data, loading, error } = useQuery<TThemeSettings>(
    GET_THEME_SETTINGS,
    {
      variables: {
        etag: etag?.layoutEtag
      },
      fetchPolicy: 'cache-and-network',
      skip: isEmpty(etag)
    }
  );

  const { getThemeSettings = null } = data ?? {};

  useErrorLogger(error);

  return (
    <>
      <Head>
        <title>General | Dropgala</title>
        <link
          rel="icon"
          type="image/svg"
          sizes="32x32"
          href="/svg/supplier.svg"
        />
      </Head>
      <div className="px-5 pt-0">
        <NavigationLink />
        {/* <div className="mt-5">
          <Link
            href={ROUTES.THEME_STYLES}
            className="flex cursor-pointer items-center py-3 px-2 hover:bg-gray-100"
          >
            <div className="text-gray-900">
              <DesignIcon width={25} height={25} />
            </div>
            <div className="mx-2 text-base text-black">Theme Styles</div>
          </Link>
          <Link
            href={ROUTES.BUILDER_TEMPLATES}
            className="flex cursor-pointer items-center py-3 px-2 hover:bg-gray-100"
          >
            <div className="text-gray-900">
              <TemplateIcon width={20} height={20} />
            </div>
            <div className="mx-2 px-1 text-base text-black">Templates</div>
          </Link>
        </div> */}
        <div className="relative">
          {loading && isEmpty(getThemeSettings) && (
            <div className="pt-5">
              <Loader special />
            </div>
          )}
          {!loading && !isEmpty(getThemeSettings) && (
            <ThemeStyles initialValues={getThemeSettings} />
          )}
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
