import { useQuery } from '@apollo/client';
import AppLayout from '@components/layouts/app';
import SettingsForm from '@components/settings/settings-form';
import ErrorMessage from '@components/ui/error-message';
import Loader from '@components/ui/loader/loader';
import { SETTINGS } from '@graphql/settings';
import { useErrorLogger } from '@hooks/useErrorLogger';
import { useGetUser } from '@hooks/useGetUser';
import { verifyAuth, XSRFHandler } from '@middleware/utils';
import { SSRProps } from '@ts-types/custom.types';
import { SettingsType } from '@ts-types/generated';
import { ROUTES } from '@utils/routes';
import { GetServerSideProps } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

interface tSettings {
  getSettings: SettingsType;
}

export default function AccountInformation({ client }: SSRProps) {
  const { t } = useTranslation();

  const { data, loading, error } = useQuery<tSettings>(SETTINGS, {
    variables: {},
    fetchPolicy: 'cache-and-network'
  });

  const { getSettings: settings } = data ?? {};

  useGetUser(client);
  useErrorLogger(error);

  if (loading) {
    return <Loader text={t('common:text-loading')} />;
  }

  if (error) return <ErrorMessage message={error.message} />;

  return (
    <>
      <div className="py-5 sm:py-8 flex border-b border-dashed border-border-base">
        <h1 className="text-lg font-semibold text-heading">
          {t('form:form-title-settings')}
        </h1>
      </div>
      <SettingsForm settings={settings} />
    </>
  );
}

AccountInformation.Layout = AppLayout;

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
