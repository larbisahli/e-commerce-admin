import PageMainAction from '@components/common/PageMainAction';
import { AccountSettingsIcon } from '@components/icons/account-settings-icon';
import CheckoutIcon from '@components/icons/checkout-icon';
import { LoginHistoryIcon } from '@components/icons/login-history-icon';
import { NotificationBellIcon } from '@components/icons/notification-icon';
import { PaymentIcon } from '@components/icons/payment-icon';
import { TagIcon, UsersIcon } from '@components/icons/sidebar';
import { TaxIcon } from '@components/icons/sidebar/tax';
import AppLayout from '@components/layouts/app';
import { useGetClient } from '@hooks/index';
import { verifyAuth } from '@middleware/utils';
import { SSRProps } from '@ts-types/custom.types';
import { ROUTES } from '@utils/routes';
import type { GetServerSideProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { CreditCard } from '@components/icons/credit-card';

const settingRoutes = [
  // {
  //   label: 'common:sidebar-nav-item-account-settings',
  //   url: ROUTES.ACCOUNT_SETTINGS,
  //   renderIcon: () => <AccountSettingsIcon width={25} height={25} />,
  //   description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit'
  // },
  {
    label: 'common:sidebar-nav-item-notifications',
    url: ROUTES.NOTIFICATION,
    renderIcon: () => <NotificationBellIcon width={25} height={25} />,
    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit'
  },
  {
    label: 'common:sidebar-nav-item-tax',
    url: ROUTES.TAX,
    renderIcon: () => <TaxIcon width={25} height={25} />,
    description: 'Your own tax rules and recommended services'
  },
  {
    label: 'common:sidebar-nav-item-checkout-settings',
    url: ROUTES.CHECKOUT_SETTINGS,
    renderIcon: () => <CheckoutIcon width={25} height={25} />,
    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit'
  },
  {
    label: 'common:sidebar-nav-item-payments',
    url: ROUTES.PAYMENT,
    renderIcon: () => <PaymentIcon width={25} height={25} />,
    description: 'Payment methods for the currencies you support in your store'
  },
  {
    label: 'common:sidebar-nav-item-tags',
    url: ROUTES.TAG,
    renderIcon: () => <TagIcon width={25} height={25} />,
    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit'
  },
  // {
  //   label: 'common:sidebar-nav-item-recent-login-history',
  //   url: ROUTES.RECENT_LOGIN_HISTORY,
  //   renderIcon: () => <LoginHistoryIcon width={25} height={25} />,
  //   description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit'
  // },
  {
    label: 'common:sidebar-nav-item-billing',
    url: ROUTES.BILLING,
    renderIcon: () => <CreditCard width={25} height={25} />,
    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit'
  }
  // {
  //   label: 'common:sidebar-nav-item-email-templates',
  //   url: ROUTES.EMAIL_TEMPLATE,
  //   renderIcon: () => <UsersIcon />
  // },
  // {
  //   label: 'common:sidebar-nav-item-newsletters',
  //   url: ROUTES.NEWSLETTER,
  //   renderIcon: () => <UsersIcon />
  // },
  // {
  //   label: 'common:sidebar-nav-item-multi-currency',
  //   url: ROUTES.MULTI_CURRENCY,
  //   renderIcon: () => <UsersIcon />
  // },
];

export default function Settings({ client }: SSRProps) {
  const { t } = useTranslation();

  useGetClient(client);

  return (
    <>
      <Head>
        <title>Settings | Dropgala</title>
        <link
          rel="icon"
          type="image/svg"
          sizes="32x32"
          href="/svg/settings.svg"
        />
      </Head>
      <PageMainAction
        showSelectLanguage={false}
        hideBorder
        title={t('form:form-title-settings')}
        label={t('form:form-title-settings')}
      />
      <section className="mx-auto mt-20 grid max-w-[900px] grid-cols-1  gap-5 rounded-md border bg-white p-5 shadow-sm sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-3">
        {settingRoutes?.map(({ label, url, renderIcon, description }) => (
          <Link key={label} href={url}>
            <div className="group m-2 flex cursor-pointer items-center text-gray-500">
              <div className="mr-3 flex h-12 w-12 items-center justify-center rounded-full border bg-gray-100 group-hover:text-blue-500">
                {renderIcon()}
              </div>
              <div className="flex-1">
                <span className="font-semibold text-gray-800 group-hover:text-blue-500">
                  {t(label)}
                </span>
                <p className="text-xs">{description}</p>
              </div>
            </div>
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
