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

  const todays_revenue = '$20';
  const total_revenue = '3,000 USD';

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
  let salesByYear: {} = {
    sales: Array.from(
      { length: 12 },
      (_) => Math.floor(Math.random() * 100) + 1
    ),
    revenue: Array.from(
      { length: 12 },
      (_) => Math.floor(Math.random() * 150) + 1
    ),
    orders: Array.from(
      { length: 12 },
      (_) => Math.floor(Math.random() * 100) + 1
    )
  };

  let januarySalesByYear: {} = {
    sales: [],
    revenue: [],
    orders: Array.from(
      { length: 31 },
      (_) => Math.floor(Math.random() * 140) + 1
    )
  };
  // if (!!data?.totalYearSaleByMonth?.length) {
  //   salesByYear = data.totalYearSaleByMonth.map((item: any) =>
  //     item.total.toFixed(2)
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
        <div className="text-xl font-medium">Welcome back!</div>
        <span className="text-sm text-gray-500">
          {`You can impact someone's life today.`}
        </span>
      </div>
      <GettingStartedSection />
      <div className="mb-6 grid w-full grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <div className="w-full ">
          <StickerCard
            titleTransKey="sticker-card-title-rev"
            subtitleTransKey="sticker-card-subtitle-rev"
            icon={<DollarIcon className="h-7 w-7" color="#047857" />}
            iconBgStyle={{ backgroundColor: '#A7F3D0' }}
            price={total_revenue ?? '$90'}
          />
        </div>
        <div className="w-full ">
          <StickerCard
            titleTransKey="sticker-card-title-today-rev"
            icon={<CoinIcon />}
            price={todays_revenue}
          />
        </div>
        <div className="w-full ">
          <StickerCard
            titleTransKey="sticker-card-title-order"
            subcheckouttitleTransKey="sticker-card-subtitle-order"
            icon={<CartIconBig />}
            price={data?.totalOrders ?? '$29'}
          />
        </div>
        <div className="w-full">
          <StickerCard
            titleTransKey="Unique Customers"
            icon={<UserIcon />}
            iconBgStyle={{ backgroundColor: '#124ED8' }}
            price={data?.totalShops ?? 343}
          />
        </div>
      </div>

      <div className="mb-6 flex w-full flex-wrap">
        <ColumnChart
          widgetTitle="Sales History"
          colors={['#03D3B5', '#124ED8', '#FFA500']}
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

      <div className="mb-6 flex w-full flex-wrap">
        <ColumnChart
          widgetTitle="January Order History"
          colors={['#03D3B5']}
          series={januarySalesByYear}
          categories={januarySalesByYear?.orders?.map((_, idx) => idx + 1)}
        />
      </div>

      <div className="mb-6 flex w-full flex-wrap">
        <div className="mb-6 w-full sm:w-1/2 sm:px-3 sm:pl-0 xl:mb-0 xl:w-1/2">
          <RecentOrders
            orders={orderData}
            title={t('table:recent-order-table-title')}
          />
        </div>
        <div className="mb-6 w-full sm:w-1/2 sm:px-3 sm:pl-0 xl:mb-0 xl:w-1/2">
          <RecentOrders
            orders={orderData}
            title={t('table:recent-order-table-title')}
          />
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
    <div className="mb-8 flex flex-col flex-wrap lg:flex-row">
      <div className="mb-2 flex flex-1 flex-col lg:mr-2">
        <div className="mb-2 flex flex-1 items-end text-lg font-medium">
          Getting started
        </div>
        <div className="flex w-full min-w-[400px] items-end bg-red-500">
          {/* Email verification section */}
          <div className="flex w-full items-start rounded border bg-white p-5 pr-12 pl-3 shadow-sm">
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
      <div className="flex flex-1 justify-end lg:ml-2">
        {/* Feedback verification section */}
        <div
          className="flex w-full flex-col items-center justify-center
                 rounded border border-gray-200 bg-white px-8 py-8 shadow-sm"
        >
          <h2 className="mb-2 font-semibold text-gray-800">
            First impression count.
          </h2>
          <p className="text-center text-sm font-medium text-gray-600">
            Share your first impression to help us improve the overall dropgala
            experience.
          </p>
          <Link href={ROUTES.DASHBOARD}>
            <a
              target="_blank"
              className="mt-3 flex items-center rounded-sm border border-gray-300 px-4 py-1 text-gray-500"
            >
              <span className="pr-2 font-medium text-gray-600">
                Give feedback
              </span>
              <div className="mb-1">
                <ExternalLinkIcon width={18} height={18} />
              </div>
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
};
