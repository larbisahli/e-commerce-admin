import { useQuery } from '@apollo/client';
import CreateOrUpdateAttributeForm from '@components/attribute/attribute-form';
import AppLayout from '@components/layouts/app';
import ErrorMessage from '@components/ui/error-message';
import Loader from '@components/ui/loader/loader';
import { ATTRIBUTE } from '@graphql/attribute';
import { useGetUser } from '@hooks/index';
import { useErrorLogger } from '@hooks/useErrorLogger';
import { verifyAuth, XSRFHandler } from '@middleware/utils';
import type { SSRProps } from '@ts-types/custom.types';
import type { Attribute } from '@ts-types/generated';
import { ROUTES } from '@utils/routes';
import type { GetServerSideProps } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

interface TAttribute {
  attribute: Attribute;
}
interface OptionsVariable {
  id: number;
}

export default function UpdateAttributePage({ client }: SSRProps) {
  const { t } = useTranslation();
  const { query } = useRouter();

  const attributeId = parseInt(query.attributeId as string, 10);

  const { data, loading, error } = useQuery<TAttribute, OptionsVariable>(
    ATTRIBUTE,
    {
      variables: { id: attributeId },
      fetchPolicy: 'cache-and-network'
    }
  );

  useGetUser(client);
  useErrorLogger(error);

  const { attribute = [] } = data ?? {};

  if (loading) {
    return <Loader text={t('common:text-loading')} />;
  }

  if (error) {
    return <ErrorMessage message={t('common:MESSAGE_SOMETHING_WENT_WRONG')} />;
  }

  return (
    <>
      <Head>
        <title>Edit Attribute | Dropgala</title>
        <link
          rel="icon"
          type="image/svg"
          sizes="32x32"
          href="/svg/attribute.svg"
        />
      </Head>
      <div className="py-5 sm:py-8 flex border-b border-dashed border-border-base">
        <h1 className="text-lg font-semibold text-heading">
          {t('form:edit-attribute')}
        </h1>
      </div>
      <CreateOrUpdateAttributeForm initialValues={attribute} />
    </>
  );
}

UpdateAttributePage.Layout = AppLayout;

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
