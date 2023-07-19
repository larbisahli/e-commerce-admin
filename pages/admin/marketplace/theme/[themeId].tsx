import { useQuery } from '@apollo/client';
import AppLayout from '@components/layouts/app';
import ThemePage from '@components/theme/theme-page';
import ErrorMessage from '@components/ui/error-message';
import Loader from '@components/ui/loader/loader';
import { THEME } from '@graphql/theme';
import { useErrorLogger, useGetUser } from '@hooks/index';
import { verifyAuth, XSRFHandler } from '@middleware/utils';
import { SSRProps } from '@ts-types/custom.types';
import { ThemeType } from '@ts-types/generated';
import { ROUTES } from '@utils/routes';
import isEmpty from 'lodash/isEmpty';
import type { GetServerSideProps } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

interface TTheme {
  theme: ThemeType;
}

interface OptionsVariable {
  id: string;
}

export default function Themes({ client }: SSRProps) {
  const { query } = useRouter();
  const { t } = useTranslation();

  const themeId = query.themeId as string;

  const { data, loading, error } = useQuery<TTheme, OptionsVariable>(THEME, {
    variables: { id: themeId },
    fetchPolicy: 'cache-and-network'
  });

  const { theme } = data ?? {};

  useGetUser(client);
  useErrorLogger(error);

  if (loading) {
    return <Loader text={t('common:text-loading')} />;
  }
  if (!isEmpty(error)) {
    return <ErrorMessage message={t('common:MESSAGE_SOMETHING_WENT_WRONG')} />;
  }

  return (
    <>
      <Head>
        {/* Theme name here */}
        <title>Theme | Dropgala</title>
        <link
          rel="icon"
          type="image/svg"
          sizes="32x32"
          href="/svg/market.svg"
        />
      </Head>
      <ThemePage theme={theme} />
    </>
  );
}

Themes.Layout = AppLayout;

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
      ...(await serverSideTranslations(locale, [
        'table',
        'common',
        'form',
        'error'
      ])),
      client: { ...(client ?? {}), csrfToken, csrfError }
    }
  };
};
