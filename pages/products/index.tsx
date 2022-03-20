import Card from '@components/common/card';
import Search from '@components/common/search';
import SortForm from '@components/common/sort-form';
import { Add } from '@components/icons/add';
import { ArrowDown } from '@components/icons/arrow-down';
import { ArrowUp } from '@components/icons/arrow-up';
import AppLayout from '@components/layouts/app';
import CategoryTypeFilter from '@components/product/category-type-filter';
import ProductList from '@components/product/product-list';
import ErrorMessage from '@components/ui/error-message';
import LinkButton from '@components/ui/link-button';
import Loader from '@components/ui/loader/loader';
import { getClientToken, verifyAuth } from '@middleware/utils';
import { SortOrder } from '@ts-types/generated';
import { ROUTES } from '@utils/routes';
import cn from 'classnames';
import type { GetServerSideProps } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useState } from 'react';

export default function ProductsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [type, setType] = useState('');
  const [category, setCategory] = useState('');
  const [page, setPage] = useState(1);
  const { t } = useTranslation();
  const [orderBy, setOrder] = useState('created_at');
  const [sortedBy, setColumn] = useState<SortOrder>(SortOrder.Desc);
  const [visible, setVisible] = useState(false);

  const toggleVisible = () => {
    setVisible((v) => !v);
  };

  // const {
  //   data,
  //   isLoading: loading,
  //   error,
  // } = useProductsQuery({
  //   limit: 20,
  //   page,
  //   type,
  //   category,
  //   text: searchTerm,
  //   orderBy,
  //   sortedBy,
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
      <Card className="flex flex-col mb-8">
        <div className="w-full flex flex-col md:flex-row items-center">
          <div className="md:w-1/4 mb-4 md:mb-0">
            <h1 className="text-lg font-semibold text-heading pb-3">
              {t('form:input-label-products')}
            </h1>
          </div>

          {/* <div className="w-full md:w-3/4 flex flex-col items-center ms-auto">
            <Search onSearch={handleSearch} />
          </div> */}
          <div className="w-full md:w-3/4 flex flex-col md:flex-row items-center">
            <div className="w-full flex items-center">
              <Search onSearch={handleSearch} />
              <LinkButton
                href={`${ROUTES.PRODUCTS}/create`}
                className="h-12 ms-4 md:ms-6"
              >
                <div className="hidden md:flex items-center justify-center">
                  <Add width="1rem" height="1rem" />
                  <span className="m-1">
                    {t('form:button-label-add-products')}
                  </span>
                </div>
                <div className="md:hidden flex items-center justify-center">
                  <Add width="1rem" height="1rem" />
                  <span className="m-1">{t('form:button-label-add')}</span>
                </div>
              </LinkButton>
            </div>
            <button
              className="text-accent text-base font-semibold flex items-center md:ms-5 mt-5 md:mt-0"
              onClick={toggleVisible}
            >
              {t('common:text-filter')}{' '}
              {visible ? (
                <ArrowUp className="ms-2" />
              ) : (
                <ArrowDown className="ms-2" />
              )}
            </button>
          </div>
        </div>

        <div
          className={cn('w-full flex transition', {
            'h-auto visible': visible,
            'h-0 invisible': !visible
          })}
        >
          <div className="flex flex-col md:flex-row md:items-center mt-5 md:mt-8 border-t border-gray-200 pt-5 md:pt-8 w-full">
            <CategoryTypeFilter
              className="w-full md:w-2/3 md:mr-5"
              onCategoryFilter={({ slug }: { slug: string }) => {
                setCategory(slug);
              }}
              onTypeFilter={({ slug }: { slug: string }) => {
                setType(slug);
              }}
            />
            <SortForm
              className="w-full md:w-1/3 mt-5 md:mt-0"
              onSortChange={({ value }: { value: SortOrder }) => {
                setColumn(value);
              }}
              onOrderChange={({ value }: { value: string }) => {
                setOrder(value);
              }}
              options={[
                { value: 'name', label: 'Name' },
                { value: 'price', label: 'Price' },
                { value: 'max_price', label: 'Max Price' },
                { value: 'mix_price', label: 'Min Price' },
                { value: 'sale_price', label: 'Sale Price' },
                { value: 'quantity', label: 'Quantity' },
                { value: 'created_at', label: 'Created At' },
                { value: 'updated_at', label: 'Updated At' }
              ]}
            />
          </div>
        </div>
      </Card>
      <ProductList products={data?.products} onPagination={handlePagination} />
    </>
  );
}

ProductsPage.Layout = AppLayout;

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
      ...(await serverSideTranslations(locale, ['table', 'common', 'form'])),
      client
    }
  };
};
