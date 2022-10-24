import { useQuery } from '@apollo/client';
import AppLayout from '@components/layouts/app';
import CreateOrUpdateOrderStatusForm from '@components/order-status/order-status-form';
import ErrorMessage from '@components/ui/error-message';
import Loader from '@components/ui/loader/loader';
import { ORDER_STATUS } from '@graphql/order-status';
import { useErrorLogger } from '@hooks/useErrorLogger';
import { useGetStaff } from '@hooks/useGetStaff';
import { verifyAuth, XSRFHandler } from '@middleware/utils';
import { SSRProps } from '@ts-types/custom.types';
import { OrderStatus } from '@ts-types/generated';
import { ROUTES } from '@utils/routes';
import type { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

interface TOrderStatus {
  getOrderStatus: OrderStatus;
}
interface OptionsVariable {
  id: string | string[];
}

export default function UpdateOrderStatusPage({ client }: SSRProps) {
  const { query } = useRouter();
  const { t } = useTranslation();

  const { statusId } = query;

  const { data, loading, error } = useQuery<TOrderStatus, OptionsVariable>(
    ORDER_STATUS,
    {
      variables: { id: statusId },
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
          {t('form:form-title-edit-order-status')}
        </h1>
      </div>
      <CreateOrUpdateOrderStatusForm initialValues={data?.getOrderStatus} />
    </>
  );
}

UpdateOrderStatusPage.Layout = AppLayout;

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
        'form',
        'common',
        'table',
        'error'
      ])),
      client: { ...(client ?? {}), csrfToken, csrfError }
    }
  };
};
