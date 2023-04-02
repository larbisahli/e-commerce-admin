import { useQuery } from '@apollo/client';
import PageMainAction from '@components/common/PageMainAction';
import AppLayout from '@components/layouts/app';
import ErrorMessage from '@components/ui/error-message';
import Loader from '@components/ui/loader/loader';
import RoleList from '@components/user-role/role-list';
import { ROLES } from '@graphql/user-role';
import { useErrorLogger, useGetUser } from '@hooks/index';
import { verifyAuth } from '@middleware/utils';
import { SSRProps } from '@ts-types/custom.types';
import { RoleType } from '@ts-types/generated';
import { ROUTES } from '@utils/routes';
import isEmpty from 'lodash/isEmpty';
import type { GetServerSideProps } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

interface TRole {
  roles: RoleType[];
  roleCount: { count: number };
}

export default function UserRole({ client }: SSRProps) {
  const { t } = useTranslation();

  const { data, loading, error } = useQuery<TRole>(ROLES, {
    variables: {},
    fetchPolicy: 'cache-and-network'
  });

  const { roles = [] } = data ?? {};

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
      <PageMainAction
        href={`${ROUTES.USER_ROLE}/create`}
        title={t('form:button-label-add-role')}
        label={t('form:input-label-roles')}
      />
      <RoleList roles={roles} />
    </>
  );
}
UserRole.Layout = AppLayout;

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
