import AppLayout from '@components/layouts/app';
import { useGetClient } from '@hooks/useGetClient';
import { verifyAuth, XSRFHandler } from '@middleware/utils';
import { SSRProps } from '@ts-types/custom.types';
import { SettingsType } from '@ts-types/generated';
import { ROUTES } from '@utils/routes';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { ArrowPrev } from '@components/icons/arrow-prev';
import Button from '@components/ui/button';
import { useRouter } from 'next/router';

interface tSettings {
  getSettings: SettingsType;
}

export default function RecentLoginHistory({ client }: SSRProps) {
  const router = useRouter();
  const { t } = useTranslation();

  const {
    userInfo: { store: { etag } = {} }
  } = useGetClient(client);

  return (
    <>
      <Head>
        <title>Login History | Dropgala</title>
        <link
          rel="icon"
          type="image/svg"
          sizes="32x32"
          href="/svg/settings.svg"
        />
      </Head>
      <div className="border-b pb-3">
        <Button
          variant="outline"
          onClick={() => router.push(`${ROUTES.SETTINGS}`)}
          type="button"
          className="mb-4"
        >
          <ArrowPrev />
          <span>Settings</span>
        </Button>
        <h1 className="flex flex-1 text-2xl font-bold text-gray-700">
          Account Settings
        </h1>
      </div>
    </>
  );
}

RecentLoginHistory.Layout = AppLayout;

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
