import AppLayout from '@components/layouts/app';
import RoleCreateUpdateForm from '@components/user-role/role-form';
import { useGetUser } from '@hooks/index';
import { verifyAuth, XSRFHandler } from '@middleware/utils';
import { SSRProps } from '@ts-types/custom.types';
import { ROUTES } from '@utils/routes';
import type { GetServerSideProps } from 'next';
import Head from 'next/head';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export default function CreateUserPage({ client }: SSRProps) {
  const { t } = useTranslation();
  useGetUser(client);

  return (
    <>
      <Head>
        <title>Create Role | Dropgala</title>
        <link rel="icon" type="image/svg" sizes="32x32" href="/svg/user.svg" />
      </Head>
      <div className="py-5 sm:py-8 flex border-b border-dashed border-border-base">
        <h1 className="text-lg font-semibold text-heading">
          {t('form:form-title-create-role')}
        </h1>
      </div>
      <RoleCreateUpdateForm />
    </>
  );
}

CreateUserPage.Layout = AppLayout;

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
        'form',
        'common',
        'error'
      ])),
      client: { ...(client ?? {}), csrfToken, csrfError }
    }
  };
};
