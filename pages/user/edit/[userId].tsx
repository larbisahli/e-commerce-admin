import { useQuery } from '@apollo/client';
import AppLayout from '@components/layouts/app';
import ErrorMessage from '@components/ui/error-message';
import Loader from '@components/ui/loader/loader';
import UserCreateUpdateForm from '@components/user/user-form';
import { USER } from '@graphql/user';
import { useErrorLogger, useGetUser } from '@hooks/index';
import { verifyAuth, XSRFHandler } from '@middleware/utils';
import { SSRProps } from '@ts-types/custom.types';
import { UserType } from '@ts-types/generated';
import { ROUTES } from '@utils/routes';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

interface TUser {
  user: UserType;
}

interface OptionsVariable {
  id: string;
}

export default function EditUserPage({ client }: SSRProps) {
  const { t } = useTranslation();
  const { query } = useRouter();

  const userId = query.userId as string;

  const { data, loading, error } = useQuery<TUser, OptionsVariable>(USER, {
    variables: { id: userId },
    fetchPolicy: 'cache-and-network'
  });

  const { user = [] } = data ?? {};

  useGetUser(client);
  useErrorLogger(error);

  if (loading) {
    return <Loader text={t('common:text-loading')} />;
  }
  if (error) {
    return <ErrorMessage message={t('common:MESSAGE_SOMETHING_WENT_WRONG')} />;
  }

  return (
    <>
      <div className="py-5 sm:py-8 flex border-b border-dashed border-border-base">
        <h1 className="text-lg font-semibold text-heading">
          {t('form:form-title-create-user')}
        </h1>
      </div>
      <UserCreateUpdateForm initialValues={user} />
    </>
  );
}

EditUserPage.Layout = AppLayout;

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
      ...(await serverSideTranslations(locale, ['form', 'common', 'error'])),
      client: { ...(client ?? {}), csrfToken, csrfError }
    }
  };
};
