import { useQuery } from '@apollo/client';
import { PageFormPlaceholder } from '@components/common/commonComponents';
import AppLayout from '@components/layouts/app';
import ErrorMessage from '@components/ui/error-message';
import { ATTRIBUTE } from '@graphql/attribute';
import { useGetUser } from '@hooks/index';
import { useErrorLogger } from '@hooks/useErrorLogger';
import { useSettings } from '@hooks/useSettings';
import { verifyAuth, XSRFHandler } from '@middleware/utils';
import type { LanguageProps, SSRProps } from '@ts-types/custom.types';
import type { Attribute } from '@ts-types/generated';
import { ROUTES } from '@utils/routes';
import { isEmpty } from 'lodash';
import type { GetServerSideProps } from 'next';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const CreateOrUpdateAttributeForm = dynamic(
  () => import('@components/attribute/attribute-form'),
  { ssr: true, loading: () => <PageFormPlaceholder /> }
);

interface TAttribute {
  attribute: Attribute;
}
interface OptionsVariable extends LanguageProps {
  id: number;
}

export default function UpdateAttributePage({ client }: SSRProps) {
  const { t } = useTranslation();
  const { query } = useRouter();

  const attributeId = parseInt(query.attributeId as string, 10);

  const { selectedLanguage } = useSettings();

  const { data, loading, error } = useQuery<TAttribute, OptionsVariable>(
    ATTRIBUTE,
    {
      variables: {
        id: attributeId,
        language: selectedLanguage
      },
      fetchPolicy: 'cache-and-network',
      skip: isEmpty(selectedLanguage)
    }
  );

  useGetUser(client);
  useErrorLogger(error);

  const { attribute = [] } = data ?? {};

  if (isEmpty(attribute) || loading) {
    return <PageFormPlaceholder />;
  }

  if (error) {
    return <ErrorMessage message={error.message} />;
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
