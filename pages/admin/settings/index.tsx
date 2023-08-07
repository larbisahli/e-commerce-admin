import PageMainAction from '@components/common/PageMainAction';
import { UsersIcon } from '@components/icons/sidebar';
import AppLayout from '@components/layouts/app';
import { useGetUser } from '@hooks/index';
import { verifyAuth } from '@middleware/utils';
import { SSRProps } from '@ts-types/custom.types';
import { ROUTES } from '@utils/routes';
import type { GetServerSideProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const settingRoutes = [
  {
    label: 'common:sidebar-nav-item-account-settings',
    url: ROUTES.ACCOUNT_SETTINGS,
    renderIcon: () => <UsersIcon />
  },
  {
    label: 'common:sidebar-nav-item-notifications',
    url: ROUTES.NOTIFICATION,
    renderIcon: () => <UsersIcon />
  },
  {
    label: 'common:sidebar-nav-item-tax',
    url: ROUTES.TAX,
    renderIcon: () => <UsersIcon />
  },
  {
    label: 'common:sidebar-nav-item-checkout-settings',
    url: ROUTES.CHECKOUT_SETTINGS,
    renderIcon: () => <UsersIcon />
  },
  {
    label: 'common:sidebar-nav-item-payments',
    url: ROUTES.PAYMENT,
    renderIcon: () => <UsersIcon />
  },
  {
    label: 'common:sidebar-nav-item-email-templates',
    url: ROUTES.EMAIL_TEMPLATE,
    renderIcon: () => <UsersIcon />
  },
  {
    label: 'common:sidebar-nav-item-newsletters',
    url: ROUTES.NEWSLETTER,
    renderIcon: () => <UsersIcon />
  },
  {
    label: 'common:sidebar-nav-item-multi-currency',
    url: ROUTES.MULTI_CURRENCY,
    renderIcon: () => <UsersIcon />
  },
  {
    label: 'common:sidebar-nav-item-recent-login-history',
    url: ROUTES.RECENT_LOGIN_HISTORY,
    renderIcon: () => <UsersIcon />
  }
];

export default function Settings({ client }: SSRProps) {
  const { t } = useTranslation();

  useGetUser(client);

  return (
    <>
      <Head>
        <title>Settings | Dropgala</title>
        <link rel="icon" type="image/svg" sizes="32x32" href="/svg/user.svg" />
      </Head>
      <PageMainAction
        title={t('form:form-title-settings')}
        label={t('form:form-title-settings')}
      />
      <section className="grid grid-cols-1 p-5 sm:grid-cols-2 md:grid-cols-3  xl:grid-cols-3 gap-5 bg-white max-w-[900px] mx-auto mt-20 border shadow-sm rounded-md">
        {settingRoutes?.map(({ label, url, renderIcon }) => (
          <Link key={label} href={url}>
            <a className="flex items-center text-gray-500 cursor-pointer m-2 hover:text-blue-500">
              <div className="flex justify-center items-center bg-gray-100 border rounded-full w-12 h-12 mr-3">
                {renderIcon()}
              </div>
              <span className="font-medium">{t(label)}</span>
            </a>
          </Link>
        ))}
      </section>
    </>
  );
}
Settings.Layout = AppLayout;

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
