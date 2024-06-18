import { useQuery } from '@apollo/client';
import { BackArrowIcon } from '@components/icons/builder/arrow-back';
import BuilderLayout from '@components/layouts/builder';
import { ThemeSettingsType } from '@components/store-builder/general/theme-styles';
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
import Link from 'next/link';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const ThemeStyles = dynamic(
  () => import('@components/store-builder/general/theme-styles'),
  { ssr: true, loading: () => <Loader special /> }
);

interface TThemeSettings {
  getThemeSettings: ThemeSettingsType;
}

export default function ThemeStylesPage({ client }: SSRProps) {
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
        <title>Theme Styles | Dropgala</title>
        <link
          rel="icon"
          type="image/svg"
          sizes="32x32"
          href="/svg/design.svg"
        />
      </Head>
      <div className="px-5">
        <div className="mt-5">
          <div className="mb-5">
            <Link
              href={ROUTES.BUILDER_GENERAL}
              className="absolute left-0 cursor-pointer px-5 pt-1 text-gray-500 hover:text-black"
            >
              <BackArrowIcon width={20} height={20} />
            </Link>
            <h3 className="text flex-1 text-center text-xl font-semibold text-black">
              Theme Styles
            </h3>
          </div>
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
      </div>
    </>
  );
}

ThemeStylesPage.Layout = BuilderLayout;

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
