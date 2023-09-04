import { useQuery } from '@apollo/client';
import AppLayout from '@components/layouts/app';
import ErrorMessage from '@components/ui/error-message';
import Loader from '@components/ui/loader/loader';
import { MANUFACTURER } from '@graphql/manufacturer';
import { useGetUser } from '@hooks/index';
import { useErrorLogger } from '@hooks/useErrorLogger';
import { useSettings } from '@hooks/useSettings';
import { verifyAuth, XSRFHandler } from '@middleware/utils';
import type { LanguageProps, SSRProps } from '@ts-types/custom.types';
import type { ManufacturerType } from '@ts-types/generated';
import { ROUTES } from '@utils/routes';
import { isEmpty } from 'lodash';
import type { GetServerSideProps } from 'next';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const CreateOrUpdateManufacturerForm = dynamic(
  () => import('@components/manufacturer/manufacturer-form'),
  { ssr: true }
);

interface TManufacturer {
  manufacturer: ManufacturerType;
}
interface OptionsVariable extends LanguageProps {
  id: number;
}

export default function UpdateManufacturerPage({ client }: SSRProps) {
  const { t } = useTranslation();
  const { query } = useRouter();

  const manufacturerId = parseInt(query.manufacturerId as string, 10);

  const { defaultLanguage, selectedLanguage } = useSettings();

  const { data, loading, error } = useQuery<TManufacturer, OptionsVariable>(
    MANUFACTURER,
    {
      variables: { id: manufacturerId, language: selectedLanguage, defaultLanguage },
      fetchPolicy: 'cache-and-network',
      skip: isEmpty(selectedLanguage)
    }
  );

  const { manufacturer = [] } = data ?? {};

  useGetUser(client);
  useErrorLogger(error);

  if (loading) {
    return <Loader text={t('common:text-loading')} />;
  }

  if (error) {
    return <ErrorMessage message={error.message} />;
  }

  return (
    <>
      <div className="py-5 sm:py-8 flex border-b border-dashed border-border-base">
        <h1 className="text-lg font-semibold text-heading">
          {t('form:edit-manufacturer')}
        </h1>
      </div>
      <CreateOrUpdateManufacturerForm initialValues={manufacturer} />
    </>
  );
}

UpdateManufacturerPage.Layout = AppLayout;

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
