import { useQuery } from '@apollo/client';
import CreateOrUpdateAttributeForm from '@components/attribute/attribute-form';
import AppLayout from '@components/layouts/app';
import ErrorMessage from '@components/ui/error-message';
import Loader from '@components/ui/loader/loader';
import { ATTRIBUTE } from '@graphql/attribute';
import { useErrorLogger } from '@hooks/useErrorLogger';
import { useGetStaff } from '@hooks/useGetStaff';
import { verifyAuth } from '@middleware/utils';
import type { SSRProps } from '@ts-types/custom.types';
import type { Attribute } from '@ts-types/generated';
import { ROUTES } from '@utils/routes';
import type { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

interface TAttribute {
  attributeForAdmin: Attribute;
}
interface OptionsVariable {
  id: string | string[];
}

export default function UpdateAttributePage({ client }: SSRProps) {
  const { t } = useTranslation();
  const { query } = useRouter();

  const { attributeId } = query;

  const { data, loading, error } = useQuery<TAttribute, OptionsVariable>(
    ATTRIBUTE,
    {
      variables: { id: attributeId },
      fetchPolicy: 'cache-and-network'
    }
  );

  useGetStaff(client?.staff_id);
  useErrorLogger(error);

  const attribute = data?.attributeForAdmin;

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
  const { client } = verifyAuth(context);

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
