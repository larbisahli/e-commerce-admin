import { useQuery } from '@apollo/client';
import Card from '@components/common/card';
import SortForm from '@components/common/sort-form';
import CouponList from '@components/coupon/coupon-list';
import { Add } from '@components/icons/add';
import AppLayout from '@components/layouts/app';
import ErrorMessage from '@components/ui/error-message';
import LinkButton from '@components/ui/link-button';
import Loader from '@components/ui/loader/loader';
import { COUPONS } from '@graphql/coupons';
import { useErrorLogger, useGetStaff } from '@hooks/index';
import { verifyAuth } from '@middleware/utils';
import { SSRProps } from '@ts-types/custom.types';
import { Coupon, OrderBy, SortOrder } from '@ts-types/generated';
import { ROUTES } from '@utils/routes';
import isEmpty from 'lodash/isEmpty';
import type { GetServerSideProps } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useEffect, useState } from 'react';

interface TCoupon {
  couponsForAdmin: Coupon[];
  couponsCount: { count: number };
}

interface OptionsVariable {
  page: number;
  limit: number;
  orderBy: OrderBy;
  sortedBy: SortOrder;
}

const limit = 10;

export default function Coupons({ client }: SSRProps) {
  const { t } = useTranslation();

  const [page, setPage] = useState(1);
  const [orderBy, setOrder] = useState(OrderBy.CREATED_AT);
  const [couponsData, setCouponsData] = useState<Coupon[]>([] as Coupon[]);

  const { data, loading, error, fetchMore } = useQuery<
    TCoupon,
    OptionsVariable
  >(COUPONS, {
    variables: {
      page,
      limit,
      orderBy,
      sortedBy: SortOrder.Desc
    },
    fetchPolicy: 'cache-and-network'
  });

  const couponsCount = data?.couponsCount?.count;

  useGetStaff(client);
  useErrorLogger(error);

  useEffect(() => {
    const couponsForAdmin = data?.couponsForAdmin;
    if (!isEmpty(couponsForAdmin)) {
      setCouponsData(() => couponsForAdmin);
    }
  }, [data]);

  function handlePagination(current: any) {
    setPage(current);
    fetchMore({
      variables: {
        page: current,
        limit,
        orderBy,
        sortedBy: SortOrder.Desc
      }
    });
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
        <div className="md:w-1/4 mb-4 md:mb-0">
          <h1 className="text-xl font-semibold text-heading pb-3">
            {t('form:input-label-coupons')}
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
            href={`${ROUTES.COUPONS}/create`}
            className="h-12 ms-4 md:ms-6"
          >
            <div className="w-full flex items-center justify-center">
              <div className="hidden md:flex items-center justify-center">
                <Add width="1rem" height="1rem" />
                <span className="m-1">{t('form:button-label-add-coupon')}</span>
              </div>
              <div className="md:hidden flex items-center justify-center">
                <Add width="1rem" height="1rem" />
                <span className="m-1">{t('form:button-label-add')}</span>
              </div>
            </div>
          </LinkButton>
        </div>
      </Card>
      <CouponList
        coupons={couponsData}
        onPagination={handlePagination}
        total={couponsCount}
        currentPage={page}
        perPage={limit}
      />
    </>
  );
}

Coupons.Layout = AppLayout;

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
        'form',
        'common',
        'table',
        'error'
      ])),
      client
    }
  };
};
