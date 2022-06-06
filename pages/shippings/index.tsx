import { useQuery } from '@apollo/client';
import Card from '@components/common/card';
import { Add } from '@components/icons/add';
import AppLayout from '@components/layouts/app';
import ShippingList from '@components/shipping/shipping-list';
import ErrorMessage from '@components/ui/error-message';
import LinkButton from '@components/ui/link-button';
import Loader from '@components/ui/loader/loader';
import { SHIPPINGS } from '@graphql/shipping';
import { useErrorLogger } from '@hooks/useErrorLogger';
import { useGetStaff } from '@hooks/useGetStaff';
import { verifyAuth } from '@middleware/utils';
import type { SSRProps } from '@ts-types/custom.types';
import type { Shipping } from '@ts-types/generated';
import { OrderBy, SortOrder } from '@ts-types/generated';
import { ROUTES } from '@utils/routes';
import isEmpty from 'lodash/isEmpty';
import type { GetServerSideProps } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useState } from 'react';

interface TShipping {
  shippings: Shipping[];
  shippingsCount: { count: number };
}

interface ShippingVariable {
  page: number;
  limit: number;
  orderBy: OrderBy;
  sortedBy: SortOrder;
}

const limit = 10;

export default function ShippingsPage({ client }: SSRProps) {
  const { t } = useTranslation();

  const [page, setPage] = useState(1);
  const [visible, setVisible] = useState(false);
  const [orderBy, setOrder] = useState(OrderBy.CREATED_AT);

  const { data, loading, error, fetchMore } = useQuery<
    TShipping,
    ShippingVariable
  >(SHIPPINGS, {
    variables: {
      page,
      limit,
      orderBy,
      sortedBy: SortOrder.Desc
    },
    fetchPolicy: 'cache-and-network'
  });

  const shippingsCount = data?.shippingsCount?.count;
  const shippings = data?.shippings;

  useGetStaff(client?.staff_id);
  useErrorLogger(error);

  const toggleVisible = () => {
    setVisible((v) => !v);
  };

  const handlePagination = (current: number) => {
    setPage(current);
    fetchMore({
      variables: {
        page: current,
        limit,
        orderBy,
        sortedBy: SortOrder.Desc
      }
    });
  };

  if (loading) {
    return <Loader text={t('common:text-loading')} />;
  }
  if (!isEmpty(error)) {
    return <ErrorMessage message={t('common:MESSAGE_SOMETHING_WENT_WRONG')} />;
  }

  return (
    <>
      <Card className="flex flex-col md:flex-row items-center mb-8">
        <div className="md:w-1/4 mb-4 md:mb-0">
          <h1 className="text-xl font-semibold text-heading pb-3">
            {t('form:input-label-shippings')}
          </h1>
        </div>
        <div className="w-full flex md:justify-end justify-center items-center">
          <LinkButton
            href={`${ROUTES.SHIPPINGS}/create`}
            className="h-12 ms-4 md:ms-6"
          >
            <div className="hidden md:flex items-center justify-center">
              <Add width="1rem" height="1rem" />
              <span className="m-1">{t('form:button-label-shipping')}</span>
            </div>
            <div className="md:hidden flex items-center justify-center">
              <Add width="1rem" height="1rem" />
              <span className="m-1">{t('form:button-label-add')}</span>
            </div>
          </LinkButton>
        </div>
      </Card>
      <ShippingList
        shippings={shippings}
        onPagination={handlePagination}
        total={shippingsCount}
        currentPage={page}
        perPage={limit}
      />
    </>
  );
}
ShippingsPage.Layout = AppLayout;

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
      ...(await serverSideTranslations(locale!, [
        'table',
        'common',
        'form',
        'error'
      ])),
      client
    }
  };
};
