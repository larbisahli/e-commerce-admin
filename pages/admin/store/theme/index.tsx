import { useQuery } from '@apollo/client';
import PageMainAction from '@components/common/PageMainAction';
import AppLayout from '@components/layouts/app';
import PageTabs from '@components/pageTabs';
import MyThemeList from '@components/theme/my-theme-list';
import ErrorMessage from '@components/ui/error-message';
import Loader from '@components/ui/loader/loader';
import { STORE_THEMES } from '@graphql/theme';
import { useErrorLogger, useGetUser } from '@hooks/index';
import { verifyAuth } from '@middleware/utils';
import { SSRProps } from '@ts-types/custom.types';
import { ThemeType } from '@ts-types/generated';
import { ROUTES } from '@utils/routes';
import isEmpty from 'lodash/isEmpty';
import type { GetServerSideProps } from 'next';
import Head from 'next/head';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

interface TTheme {
  storeThemes: ThemeType[];
}

export default function Themes({ client }: SSRProps) {
  const { t } = useTranslation();

  const { data, loading, error } = useQuery<TTheme>(STORE_THEMES, {
    variables: {},
    fetchPolicy: 'cache-and-network'
  });

  const { storeThemes: themes = [] } = data ?? {};

  console.log({ themes });

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
        <title>themes | Dropgala</title>
        <link rel="icon" type="image/svg" sizes="32x32" href="/svg/store.svg" />
      </Head>
      <PageMainAction
        title={t('form:button-label-your-themes')}
        label={t('form:button-label-your-themes')}
      />
      <MyThemeList themes={themes} />
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

  return {
    props: {
      ...(await serverSideTranslations(locale, [
        'table',
        'common',
        'form',
        'error'
      ])),
      client
    }
  };
};
