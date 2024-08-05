import { useQuery } from '@apollo/client';
import RecentOrders from '@components/order/recent-orders';
import StatCard from '@components/widgets/stat-card';
import StickerCard from '@components/widgets/sticker-card';
import { DASH_ANALYTICS } from '@graphql/analytics';
import { RECENT_ORDERS } from '@graphql/order';
import { useErrorLogger } from '@hooks/useErrorLogger';
import { useGetClient } from '@hooks/useGetClient';
import { useSettings } from '@hooks/useSettings';
import { DashAnalyticsType, OrderType } from '@ts-types/generated';
import { ROUTES } from '@utils/routes';
import classNames from 'classnames';
import dayjs from 'dayjs';
import { isEmpty, round } from 'lodash';
import Head from 'next/head';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import { useMemo, useState } from 'react';

import GettingStartedSection from './GettingStartedSection';
import RecommendationsSection from './RecommendationsSection';
import TipsSection from './TipsSection';

const dates = [
  {
    length: 1,
    id: 'today',
    label: 'Today'
  },
  {
    length: 7,
    id: '7_days',
    label: '7 days'
  },
  {
    length: 30,
    id: '30_days',
    label: '30 days'
  },
  {
    length: 90,
    id: '90_days',
    label: '90 days'
  }
];

const FormatData = (dateRange = [], data = {}) => {
  return dateRange
    ?.map((day) => {
      if (isEmpty(data[day])) {
        return { day, value: 0 };
      }
      return { day, value: data[day]?.value };
    })
    ?.reduce((result, item) => {
      const { day, value } = item;
      result[day] = { value };
      return result;
    }, {});
};

interface TDashAnalytics {
  getDashAnalytics: DashAnalyticsType;
}

interface TDashOrders {
  recentOrders: OrderType[];
}

export default function Dashboard() {
  const { t } = useTranslation();

  const {
    userInfo: { firstName = '', store: { etag } = {} }
  } = useGetClient();

  const [selectedDate, setSelectedDate] = useState({
    length: 7,
    id: '7_days',
    label: '7 days'
  });

  const {
    data: recentOrderData,
    loading: recentOrderLoading,
    error: recentOrderError
  } = useQuery<TDashOrders, { etag: string }>(RECENT_ORDERS, {
    variables: {
      etag: etag?.orderEtag
    },
    fetchPolicy: 'cache-and-network',
    skip: isEmpty(selectedDate) || isEmpty(etag)
  });

  const { recentOrders } = recentOrderData ?? {};

  const {
    data: requestData,
    loading,
    error
  } = useQuery<TDashAnalytics, { dateId: string; etag: string }>(
    DASH_ANALYTICS,
    {
      variables: {
        dateId: selectedDate.id,
        etag: etag?.analyticEtag
      },
      fetchPolicy: 'cache-and-network',
      skip: isEmpty(selectedDate) || isEmpty(etag)
    }
  );

  const { getDashAnalytics } = requestData ?? {};
  const {
    sales: salesRows = [],
    orders: orderRows = [],
    avgOrders: avgOrderRows = [],
    order,
    customer,
    product,
    category
  } = getDashAnalytics ?? {};

  useErrorLogger(error);
  useErrorLogger(recentOrderError);
  const { systemCurrency } = useSettings();

  const data = useMemo(() => {
    return {
      revenue: {
        total: round(salesRows?.reduce((total, item) => total + item.value, 0)),
        data: salesRows?.reduce((result, item) => {
          const { date, value } = item;
          // @ts-ignore
          result[dayjs(date)?.toISOString().split('T')[0]] = { value };
          return result;
        }, {})
      },
      orders: {
        total: orderRows?.reduce((total, item) => total + item.quantity, 0),
        data: orderRows?.reduce((result, item) => {
          const { date, quantity } = item;
          // @ts-ignore
          result[dayjs(date)?.toISOString().split('T')[0]] = {
            quantity,
            value: quantity
          };
          return result;
        }, {})
      },
      avgOrderValue: {
        total: round(
          avgOrderRows?.reduce((acc, num) => acc + num.value, 0) /
            avgOrderRows?.length || 0
        ),
        data: avgOrderRows?.reduce((result, item) => {
          const { date, value } = item;
          // @ts-ignore
          result[dayjs(date)?.toISOString().split('T')[0]] = { value };
          return result;
        }, {})
      },
      sales: {
        total: salesRows?.reduce((total, item) => total + item.quantity, 0),
        data: salesRows?.reduce((result, item) => {
          const { date, quantity } = item;
          // @ts-ignore
          result[dayjs(date)?.toISOString().split('T')[0]] = {
            quantity,
            value: quantity
          };
          return result;
        }, {})
      }
    };
  }, [avgOrderRows, orderRows, salesRows]);

  const sales = data?.sales;
  const orders = data?.orders;
  const avgOrderValue = data?.avgOrderValue;
  const revenue = data?.revenue;

  const dateRange = useMemo(() => {
    const now = new Date();
    return Array.from({ length: selectedDate?.length }, (_, days) => {
      let day = new Date(now);
      day.setDate(now.getDate() - days);
      return day.toISOString().split('T')[0];
    }).sort((a, b) => new Date(a).valueOf() - new Date(b).valueOf());
  }, [selectedDate?.length]);

  const revenueData = useMemo(() => {
    return FormatData(dateRange, revenue?.data);
  }, [dateRange, revenue?.data]);

  const salesData = useMemo(() => {
    return FormatData(dateRange, sales?.data);
  }, [dateRange, sales?.data]);

  const orderData = useMemo(() => {
    return FormatData(dateRange, orders?.data);
  }, [dateRange, orders?.data]);

  const avgOrderData = useMemo(() => {
    return FormatData(dateRange, avgOrderValue?.data);
  }, [dateRange, avgOrderValue?.data]);

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
        <div className="text-3xl font-medium">
          <span>Welcome back,</span>
          <span className="mx-1 text-blue-600">{firstName}</span>
          <Link href="/admin/catalog/product">PRODUCTS</Link>
        </div>
        <span className="text-md text-gray-500">
          {`You can impact someone's life today.`}
        </span>
      </div>
      <GettingStartedSection />
      <div>
        <h3 className="mb-4 flex flex-1 items-end text-xl text-gray-900">
          Store statistics
        </h3>
        <ul className="shadow-xs rounded-xs mb-6 grid w-full grid-cols-2 lg:grid-cols-4">
          <Link href={ROUTES.ORDERS}>
            <StatCard
              className="border-r-0 border-b-0 lg:border-b"
              title="Orders"
              loading={loading}
              count={order?.count}
            />
          </Link>
          <Link href={ROUTES.CUSTOMER}>
            <StatCard
              className="border-b-0 lg:border-r-0 lg:border-b"
              title="Customers"
              loading={loading}
              count={customer?.count}
            />
          </Link>
          <Link href={ROUTES.PRODUCT}>
            <StatCard
              className="border-r-0"
              title="Products"
              loading={loading}
              count={product?.count}
            />
          </Link>
          <Link href={ROUTES.CATEGORY}>
            <StatCard
              className=""
              title="Categories"
              loading={loading}
              count={category?.count}
            />
          </Link>
        </ul>
      </div>
      <div>
        <h3 className="mb-4 flex flex-1 items-end text-xl text-gray-900">
          Store performance
        </h3>
        <div className="mb-5 flex w-full">
          <div className="flex w-full flex-wrap items-center">
            {dates?.map((date) => {
              return (
                <button
                  onClick={() => setSelectedDate(date)}
                  key={date.id}
                  className={classNames(
                    'mr-3 rounded-sm border bg-white px-2 py-1 text-sm sm:px-5 sm:text-base',
                    { 'bg-blue-700 text-white': selectedDate.id === date.id }
                  )}
                >
                  {date?.label}
                </button>
              );
            })}
          </div>
        </div>
        <div className="mt-8 mb-6 grid w-full grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
          <div className="w-full ">
            <StickerCard
              loading={loading}
              titleTransKey="sticker-card-title-total-rev"
              price={`${revenue?.total?.toCommas()} ${systemCurrency?.symbol}`}
              data={revenueData}
              name="total"
              href={'/'}
              hrefText={'Estimated profit'}
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
          <div className="w-full ">
            <StickerCard
              loading={loading}
              titleTransKey="Total Sales"
              note=""
              price={sales?.total}
              data={salesData}
              name="sales"
              href={'/'}
              hrefText={'Sales'}
              tooltip={{
                x: {
                  show: false
                },
                y: {
                  formatter: function (value, series) {
                    return `${series?.series[0][series.dataPointIndex]}`;
                  }
                }
              }}
            />
          </div>
          <div className="w-full ">
            <StickerCard
              loading={loading}
              titleTransKey="sticker-card-title-avg-order"
              price={`${avgOrderValue?.total?.toCommas()} ${systemCurrency?.symbol}`}
              data={avgOrderData}
              name="amount"
              href={'/'}
              hrefText={'Average order value'}
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
          <div className="w-full">
            <StickerCard
              loading={loading}
              titleTransKey="Total Orders"
              price={orders?.total}
              data={orderData}
              name="orders"
              href={'/'}
              hrefText={'Orders'}
              tooltip={{
                x: {
                  show: false
                },
                y: {
                  formatter: function (value, series) {
                    return `${series?.series[0][series.dataPointIndex]}`;
                  }
                }
              }}
            />
          </div>
        </div>
      </div>

      <div className="mt-6 mb-12 w-full">
        <RecentOrders
          loading={recentOrderLoading}
          orders={recentOrders}
          title={t('table:recent-order-table-title')}
        />
      </div>
      <RecommendationsSection />
      <TipsSection />
    </>
  );
}

// const revenue = {
//   amount: '3,239 USD',
//   data: {
//     categories: Array.from({ length }, (_, days) => {
//       let day = new Date(now);
//       day.setDate(now.getDate() - days);
//       day.setHours(0, 0, 0, 0);
//       return dayjs(day).format('dddd, MMM D, YYYY');
//     }),
//     series: [
//       {
//         name: 'total',
//         data: Array.from(
//           { length },
//           (_) => Math.floor(Math.random() * 120) + 1
//         )
//       }
//     ]
//   }
// };
