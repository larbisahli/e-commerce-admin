import AlertIcon from '@components/icons/alert';
import { CartIconBig } from '@components/icons/cart-icon-bag';
import { CoinIcon } from '@components/icons/coin-icon';
import ExternalLinkIcon from '@components/icons/external-link';
import { DollarIcon } from '@components/icons/shops/dollar';
import { ShopIcon } from '@components/icons/sidebar';
import { UserIcon } from '@components/icons/user-icon';
import RecentOrders from '@components/order/recent-orders';
// import PopularProductList from '@components/product/popular-product-list';
// import ErrorMessage from '@components/ui/error-message';
import Loader from '@components/ui/loader/loader';
import Select from '@components/ui/select/select';
import ColumnChart from '@components/widgets/column-chart';
import StickerCard from '@components/widgets/sticker-card';
import { ROUTES } from '@utils/routes';
import Head from 'next/head';
import Link from 'next/link';
// import { useAnalyticsQuery } from '@data/analytics/use-analytics.query';
// import { usePopularProductsQuery } from '@data/analytics/use-popular-products.query';
// import { useOrdersQuery } from '@data/order/use-orders.query';
// import { useWithdrawsQuery } from '@data/withdraw/use-withdraws.query';
// import usePrice from '@utils/use-price';
import { useTranslation } from 'next-i18next';
import { useState } from 'react';

export default function Dashboard() {
  const { t } = useTranslation();
  // const { data, isLoading: loading } = useAnalyticsQuery();
  const data = {};
  const loading = false;
  // const { price: total_revenue } = usePrice(
  //   data && {
  //     amount: data?.totalRevenue!
  //   }
  // );
  // const { price: todays_revenue } = usePrice(
  //   data && {
  //     amount: data?.todaysRevenue!
  //   }
  // );

  const totalSales = '434';
  const totalRevenue = '3,000 USD';
  const totalOrders = '50 USD';

  // const {
  //   data: orderData,
  //   isLoading: orderLoading,
  //   error: orderError
  // } = useOrdersQuery({
  //   limit: 10,
  //   page: 1
  // });
  const orderData = [
    {
      customer: 'Isaac frost',
      total: 12,
      created_at: Date.now(),
      status: {
        color: 'green',
        name: 'Pending'
      }
    },
    {
      customer: 'Karl moore',
      total: 120,
      created_at: Date.now(),
      status: {
        color: 'red',
        name: 'Canceled'
      }
    },
    {
      customer: 'Isaac frost',
      total: 22,
      created_at: Date.now(),
      status: {
        color: 'green',
        name: 'Pending'
      }
    },
    {
      customer: 'Isaac frost',
      total: 42,
      created_at: Date.now(),
      status: {
        color: 'green',
        name: 'Pending'
      }
    },
    {
      customer: 'Isaac frost',
      total: 34,
      created_at: Date.now(),
      status: {
        color: 'green',
        name: 'Pending'
      }
    }
  ];

  const dates = [
    {
      id: 'current_month',
      label: 'Current Month'
    },
    {
      id: 'current_year',
      label: 'Current Year'
    }
  ];

  const orderLoading = false;
  const orderError = {};

  // const {
  //   data: popularProductData,
  //   isLoading: popularProductLoading,
  //   error: popularProductError
  // } = usePopularProductsQuery({ limit: 10 });
  const popularProductData = [];
  const popularProductLoading = false;
  const popularProductError = {};

  // const { data: withdrawsData, isLoading: withdrawLoading } = useWithdrawsQuery(
  //   { limit: 10 }
  // );

  const withdrawLoading = false;

  let salesByYear: {} = [
    {
      name: 'Customers',
      data: Array.from(
        { length: 12 },
        (_) => Math.floor(Math.random() * 150) + 1
      )
    },
    {
      name: 'Sales',
      data: Array.from(
        { length: 12 },
        (_) => Math.floor(Math.random() * 100) + 1
      )
    },
    {
      name: 'Orders',
      data: Array.from(
        { length: 12 },
        (_) => Math.floor(Math.random() * 100) + 1
      )
    }
  ];

  let januarySalesByYear: {} = [
    {
      name: 'Revenue',
      data: Array.from(
        { length: 12 },
        (_) => Math.floor(Math.random() * 140) + 1
      )
    }
  ];
  // if (!!data?.totalYearSaleByMonth?.length) {
  //   salesByYear = data.totalYearSaleByMonth.map((item: any) =>
  //     item.total.toFixed(2)
  //   );
  // }

  const [selectedDate, setSelectedDate] = useState({
    id: 'current_month',
    label: 'Current Month'
  });

  if (loading || orderLoading || popularProductLoading || withdrawLoading) {
    return <Loader text={t('common:text-loading')} />;
  }
  // if (orderError || popularProductError) {
  //   return (
  //     <ErrorMessage
  //       message={orderError?.message || popularProductError?.message}
  //     />
  //   );
  // }

  return (
    <>
      <Head>
        <title>Dashboard | Dropgala</title>
        <link
          rel="icon"
          type="image/svg"
          sizes="32x32"
          href="/svg/dashboard.svg"
        />
      </Head>
      <div className="mb-8">
        <div className="text-3xl font-medium">Welcome back!</div>
        <span className="text-md text-gray-500">
          {`You can impact someone's life today.`}
        </span>
      </div>
      <GettingStartedSection />
      <div className="mb-5 flex justify-end">
        <Select
          options={dates}
          value={selectedDate}
          name="date"
          getOptionLabel={(option: any) => option.label}
          getOptionValue={(option: any) => option.id}
          onChange={setSelectedDate}
          className="max-w-[300px]"
        />
      </div>
      <div className="mb-6 grid w-full grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <div className="w-full ">
          <StickerCard
            titleTransKey="sticker-card-title-total-rev"
            subtitleTransKey="sticker-card-subtitle-order"
            indicator="up"
            indicatorText="23%"
            price={totalRevenue}
          />
        </div>
        <div className="w-full ">
          <StickerCard
            titleTransKey="Total Sales"
            subtitleTransKey="sticker-card-subtitle-rev"
            indicator="up"
            indicatorText="44%"
            note=""
            price={totalSales}
          />
        </div>
        <div className="w-full ">
          <StickerCard
            titleTransKey="sticker-card-title-avg-order"
            subtitleTransKey="sticker-card-subtitle-order"
            indicator="down"
            indicatorText="3%"
            price={totalOrders}
          />
        </div>
        <div className="w-full">
          <StickerCard
            titleTransKey="Total Orders"
            subtitleTransKey="sticker-card-subtitle-order"
            indicator="down"
            indicatorText="3%"
            price={343}
          />
        </div>
      </div>

      <div className="mb-6 w-full">
        <div className="mb-6">
          <ColumnChart
            widgetTitle="Sales History"
            position="up"
            percentage="23%"
            colors={['#124ED8', '#3eb81bd9', '#ff9224e3']}
            series={salesByYear}
            categories={[
              t('common:january'),
              t('common:february'),
              t('common:march'),
              t('common:april'),
              t('common:may'),
              t('common:june'),
              t('common:july'),
              t('common:august'),
              t('common:september'),
              t('common:october'),
              t('common:november'),
              t('common:december')
            ]}
          />
        </div>

        <div className="mb-6">
          <ColumnChart
            widgetTitle="Revenue History"
            // totalValue={'1234'}
            // prefix='USD'
            position="down"
            text=""
            percentage="12%"
            colors={['#03D3B5']}
            series={januarySalesByYear}
            categories={[
              t('common:january'),
              t('common:february'),
              t('common:march'),
              t('common:april'),
              t('common:may'),
              t('common:june'),
              t('common:july'),
              t('common:august'),
              t('common:september'),
              t('common:october'),
              t('common:november'),
              t('common:december')
            ]}
            tooltip={{
              x: {
                show: false
              },
              y: {
                formatter: function (value, series) {
                  return `${series?.series[0][series.dataPointIndex]} USD`;
                }
              }
            }}
          />
        </div>
      </div>

      <div className="mb-6 flex w-full flex-wrap">
        <div className="mb-6 w-full sm:px-3 sm:pl-0 xl:mb-0 xl:w-1/2">
          <RecentOrders
            orders={orderData}
            title={t('table:recent-order-table-title')}
          />
        </div>
        <div className="mb-6 w-full sm:px-3 sm:pl-0 xl:mb-0 xl:w-1/2">
          <RecentOrders orders={orderData} title={'Top Selling Products'} />
        </div>

        {/* <div className="w-full sm:w-1/2 xl:w-1/2 sm:px-3 sm:pr-0 mb-6 xl:mb-0">
          <WithdrawTable
            //@ts-ignore
            withdraws={withdrawsData?.withdraws}
            title={t('table:withdraw-table-title')}
          />
        </div> */}
      </div>
      <div className="mb-6 w-full sm:pe-0 xl:mb-0">
        {/* <PopularProductList
          products={popularProductData}
          title={t('table:popular-products-table-title')}
        /> */}
      </div>
    </>
  );
}

const GettingStartedSection = () => {
  return (
    <>
      <div className="mb-2 flex flex-1 items-end text-lg font-medium">
        Getting started
      </div>
      <div className="mb-5 flex h-[150px] flex-col flex-wrap lg:flex-row">
        <div className="mb-2 flex h-full flex-1 flex-col rounded border bg-white shadow-sm lg:mr-2">
          <div className="flex w-full items-end">
            {/* Email verification section */}
            <div className="flex w-full items-start p-5 pr-12 pl-3">
              <div className="mr-2 text-yellow-600">
                <AlertIcon />
              </div>
              <div className="flex flex-col items-start">
                <span className="text-sm font-medium text-gray-700">
                  {`Verify your email address to activate your online store.`}
                </span>
                <button className="text-sm text-blue-500">
                  {`Resend verification link`}
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="flex h-full flex-1 justify-end rounded border border-gray-200 bg-white shadow-sm lg:ml-2">
          {/* Feedback verification section */}
          <div className="flex w-full flex-col items-center justify-center px-8 py-8">
            <h2 className="mb-2 font-semibold text-gray-800">
              First impression count.
            </h2>
            <p className="text-center text-sm font-medium text-gray-600">
              Share your first impression to help us improve the overall
              dropgala experience.
            </p>
            <Link href={ROUTES.DASHBOARD} target="_blank">
              <div className="mt-3 flex items-center rounded-sm border border-gray-300 px-4 py-1 text-gray-500">
                <span className="pr-2 font-medium text-gray-600">
                  Give feedback
                </span>
                <div className="mb-1">
                  <ExternalLinkIcon width={18} height={18} />
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};
