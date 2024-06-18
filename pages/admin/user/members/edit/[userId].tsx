import { useQuery } from '@apollo/client';
import { PageFormPlaceholder } from '@components/common/commonComponents';
import AppLayout from '@components/layouts/app';
import ErrorMessage from '@components/ui/error-message';
import { USER } from '@graphql/user';
import { useErrorLogger, useGetClient } from '@hooks/index';
import { verifyAuth, XSRFHandler } from '@middleware/utils';
import { SSRProps } from '@ts-types/custom.types';
import { UserType } from '@ts-types/generated';
import { ROUTES } from '@utils/routes';
import { isEmpty } from 'lodash';
import { GetServerSideProps } from 'next';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const UserCreateUpdateForm = dynamic(
  () => import('@components/user/user-form'),
  { ssr: true, loading: () => <PageFormPlaceholder /> }
);

interface TUser {
  user: UserType;
}

interface OptionsVariable {
  id: string;
  etag: string;
}

export default function EditUserPage({ client }: SSRProps) {
  const { t } = useTranslation();
  const { query } = useRouter();

  const userId = query.userId as string;

  const {
    userInfo: { store: { etag } = {} }
  } = useGetClient(client);

  const { data, loading, error } = useQuery<TUser, OptionsVariable>(USER, {
    variables: {
      id: userId,
      etag: etag?.userEtag
    },
    fetchPolicy: 'cache-and-network',
    skip: isEmpty(etag)
  });

  const { user = [] } = data ?? {};

  useErrorLogger(error);

  if (isEmpty(user) || loading) {
    return <PageFormPlaceholder />;
  }

  if (error) {
    return <ErrorMessage message={error.message} />;
  }

  return (
    <>
      <Head>
        <title>Edit User | Dropgala</title>
        <link rel="icon" type="image/svg" sizes="32x32" href="/svg/user.svg" />
      </Head>
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
