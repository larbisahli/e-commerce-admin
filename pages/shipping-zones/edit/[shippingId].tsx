import { useQuery } from '@apollo/client';
import AppLayout from '@components/layouts/app';
import CreateOrUpdateShippingForm from '@components/shipping-zone/shipping-form';
import ErrorMessage from '@components/ui/error-message';
import Loader from '@components/ui/loader/loader';
import { SHIPPING_ZONE } from '@graphql/shipping-zone';
import { useErrorLogger } from '@hooks/useErrorLogger';
import { useGetStaff } from '@hooks/useGetStaff';
import { verifyAuth, XSRFHandler } from '@middleware/utils';
import type { SSRProps } from '@ts-types/custom.types';
import { ShippingZoneType } from '@ts-types/generated';
import { ROUTES } from '@utils/routes';
import type { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

interface ShippingVariable {
  id: string | string[];
}

export default function UpdateShippingPage({ client }: SSRProps) {
  const { t } = useTranslation();
  const { query } = useRouter();

  const { shippingId } = query;

  const { data, loading, error } = useQuery<ShippingZoneType, ShippingVariable>(
    SHIPPING_ZONE,
    {
      variables: { id: shippingId },
      fetchPolicy: 'cache-and-network'
    }
  );

  useGetStaff(client);
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
          {t('form:form-title-update-shipping')}
        </h1>
      </div>
      <CreateOrUpdateShippingForm initialValues={data} />
    </>
  );
}

UpdateShippingPage.Layout = AppLayout;

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
