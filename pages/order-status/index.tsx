import Card from '@components/common/card';
import SortForm from '@components/common/sort-form';
import { Add } from '@components/icons/add';
import AppLayout from '@components/layouts/app';
import OrderStatusList from '@components/order-status/order-status-list';
import LinkButton from '@components/ui/link-button';
import { OrderBy, OrderStatus, SortOrder } from '@ts-types/generated';
import { ROUTES } from '@utils/routes';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import isEmpty from 'lodash/isEmpty';
import { useQuery } from '@apollo/client';
import { useErrorLogger, useGetStaff } from '@hooks/index';
import { getClientToken, verifyAuth } from '@middleware/utils';
import { SSRProps } from '@ts-types/custom.types';
import type { GetServerSideProps } from 'next';
import { useTranslation } from 'next-i18next';
import { useState, useEffect } from 'react';
import { ORDER_STATUSES } from '@graphql/order_status';
import Loader from '@components/ui/loader/loader';
import ErrorMessage from '@components/ui/error-message';

interface TOrderStatus {
  orderStatusesForAdmin: OrderStatus[];
  orderStatusCount: { count: number };
}

interface OptionsVariable {
  page: number;
  limit: number;
  orderBy: OrderBy;
  sortedBy: SortOrder;
}

const limit = 10;

export default function OrderStatusPage({ client }: SSRProps) {
  const { t } = useTranslation();

  const [page, setPage] = useState(1);
  const [orderBy, setOrder] = useState(OrderBy.CREATED_AT);
  const [orderStatuses, setOrderStatuses] = useState<OrderStatus[]>(
    [] as OrderStatus[]
  );

  const { data, loading, error, fetchMore } = useQuery<
    TOrderStatus,
    OptionsVariable
  >(ORDER_STATUSES, {
    variables: {
      page,
      limit,
      orderBy,
      sortedBy: SortOrder.Desc
    },
    fetchPolicy: 'cache-and-network'
  });

  const orderStatusCount = data?.orderStatusCount?.count;

  useGetStaff(client?.staff_id);
  useErrorLogger(error);

  useEffect(() => {
    fetchMore({
      variables: {
        page,
        limit,
        orderBy,
        sortedBy: SortOrder.Desc
      }
    });
  }, [page]);

  useEffect(() => {
    const orderStatusesForAdmin = data?.orderStatusesForAdmin;
    if (!isEmpty(orderStatusesForAdmin)) {
      setOrderStatuses(() => orderStatusesForAdmin);
    }
  }, [data]);

  function handlePagination(current: any) {
    setPage(current);
  }

  if (loading) {
    return <Loader text={t('common:text-loading')} />;
  }
  if (!isEmpty(error)) {
    return <ErrorMessage message={t('common:MESSAGE_SOMETHING_WENT_WRONG')} />;
  }

  return (
    <>
      <Card className="flex flex-col xl:flex-row items-center mb-8">
        <div className="md:w-1/4 mb-4 xl:mb-0">
          <h1 className="text-lg font-semibold text-heading pb-3">
            {t('form:input-label-order-status')}
          </h1>
        </div>

        <div className="w-full xl:w-3/4 flex flex-col md:flex-row space-y-4 md:space-y-0 items-center ms-auto">
          <SortForm
            className="md:ms-5"
            showLabel={false}
            onOrderChange={({ value }: { value: OrderBy }) => {
              setOrder(value);
            }}
            options={[
              { id: 1, value: 'created_at', label: 'Created At' },
              { id: 2, value: 'updated_at', label: 'Updated At' }
            ]}
          />
          <LinkButton
            href={`${ROUTES.ORDER_STATUS}/create`}
            className="h-12 ms-4 md:ms-6"
          >
            <div className="w-full flex items-center justify-center">
              <div className="hidden md:flex items-center justify-center">
                <Add width="1rem" height="1rem" />
                <span className="m-1">
                  {t('form:button-label-add-order-status')}
                </span>
              </div>
              <div className="md:hidden flex items-center justify-center">
                <Add width="1rem" height="1rem" />
                <span className="m-1">{t('form:button-label-add')}</span>
              </div>
            </div>
          </LinkButton>
        </div>
      </Card>

      {loading ? null : (
        <OrderStatusList
          orderStatuses={orderStatuses}
          onPagination={handlePagination}
          total={orderStatusCount}
          currentPage={page}
          perPage={limit}
        />
      )}
    </>
  );
}

OrderStatusPage.Layout = AppLayout;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { locale } = context;
  const { token }: { token: string } = getClientToken(context);
  const { client } = verifyAuth(token);

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
