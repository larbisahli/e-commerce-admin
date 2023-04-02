import { useQuery } from '@apollo/client';
import AppLayout from '@components/layouts/app';
import ErrorMessage from '@components/ui/error-message';
import Loader from '@components/ui/loader/loader';
import RoleCreateUpdateForm from '@components/user-role/role-form';
import { ROLE } from '@graphql/user-role';
import { useErrorLogger, useGetUser } from '@hooks/index';
import { verifyAuth, XSRFHandler } from '@middleware/utils';
import { SSRProps } from '@ts-types/custom.types';
import { RoleType } from '@ts-types/generated';
import { ROUTES } from '@utils/routes';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

interface TRole {
  role: RoleType;
}

interface OptionsVariable {
  id: string;
}

export default function EditRolePage({ client }: SSRProps) {
  const { t } = useTranslation();
  const { query } = useRouter();

  const roleId = query.roleId as string;

  const { data, loading, error } = useQuery<TRole, OptionsVariable>(ROLE, {
    variables: { id: roleId },
    fetchPolicy: 'cache-and-network'
  });

  const { role = [] } = data ?? {};

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
          {t('form:form-title-create-role')}
        </h1>
      </div>
      <RoleCreateUpdateForm initialValues={role} />
    </>
  );
}

EditRolePage.Layout = AppLayout;

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
