import Card from '@components/common/card';
import Search from '@components/common/search';
import SortForm from '@components/common/sort-form';
import AppLayout from '@components/layouts/app';
import OrderList from '@components/order/order-list';
import ErrorMessage from '@components/ui/error-message';
import Loader from '@components/ui/loader/loader';
// import { useOrdersQuery } from "@data/order/use-orders.query";
import { SortOrder } from '@ts-types/generated';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useState } from 'react';

export default function Orders() {
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const { t } = useTranslation();
  const [orderBy, setOrder] = useState('created_at');
  const [sortedBy, setColumn] = useState<SortOrder>(SortOrder.Desc);

  // const {
  //   data,
  //   isLoading: loading,
  //   error,
  // } = useOrdersQuery({
  //   limit: 20,
  //   page,
  //   text: searchTerm,
  // });

  const data = [];
  const loading = false;
  const error = null;

  if (loading) return <Loader text={t('common:text-loading')} />;
  if (error) return <ErrorMessage message={error.message} />;
  function handleSearch({ searchText }: { searchText: string }) {
    setSearchTerm(searchText);
    setPage(1);
  }
  function handlePagination(current: any) {
    setPage(current);
  }
  return (
    <>
      <Card className="mb-8 flex flex-col items-center justify-between md:flex-row">
        <div className="mb-4 md:mb-0 md:w-1/4">
          <h1 className="pb-3 text-lg font-semibold text-heading">
            {t('form:input-label-orders')}
          </h1>
        </div>

        <div className="flex w-full flex-col items-center ms-auto md:w-3/4 md:flex-row">
          <Search onSearch={handleSearch} />
          <SortForm
            showLabel={false}
            className="mt-5 w-full flex-shrink-0 md:mt-0 md:w-1/2 md:ms-5"
            onSortChange={({ value }: { value: SortOrder }) => {
              setColumn(value);
            }}
            onOrderChange={({ value }: { value: string }) => {
              setOrder(value);
            }}
            options={[
              { value: 'total', label: 'Total' },
              { value: 'created_at', label: 'Created At' },
              { value: 'updated_at', label: 'Updated At' }
            ]}
          />
        </div>
      </Card>

      <OrderList orders={data?.orders} onPagination={handlePagination} />
    </>
  );
}

Orders.Layout = AppLayout;

export const getStaticProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ['table', 'common', 'form']))
  }
});
