import { useQuery } from '@apollo/client';
import RecentOrders from '@components/order/recent-orders';
import StickerCard from '@components/widgets/sticker-card';
import { DASH_ANALYTICS } from '@graphql/analytics';
import { useErrorLogger } from '@hooks/useErrorLogger';
import { useGetUser } from '@hooks/useGetUser';
import { useSettings } from '@hooks/useSettings';
import { DashAnalyticsType } from '@ts-types/generated';
import classNames from 'classnames';
import { isEmpty } from 'lodash';
import Head from 'next/head';
import { useTranslation } from 'next-i18next';
import { useMemo, useState } from 'react';

import GettingStartedSection from './GettingStartedSection';
import RecommendationsSection from './RecommendationsSection';
import TipsSection from './TipsSection';

const ordersData = [
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

export default function Dashboard() {
  const { t } = useTranslation();

  const [selectedDate, setSelectedDate] = useState({
    length: 7,
    id: '7_days',
    label: '7 days'
  });

  const { data, loading, error } = useQuery<TDashAnalytics, { dateId: string }>(
    DASH_ANALYTICS,
    {
      variables: {
        dateId: selectedDate.id
      },
      fetchPolicy: 'cache-and-network',
      skip: isEmpty(selectedDate)
    }
  );

  const { getDashAnalytics } = data ?? {};

  const {
    userInfo: { firstName = '' }
  } = useGetUser();

  useErrorLogger(error);

  const sales = getDashAnalytics?.sales;
  const orders = getDashAnalytics?.orders;
  const avgOrderValue = getDashAnalytics?.avgOrderValue;
  const revenue = getDashAnalytics?.revenue;

  const { systemCurrency } = useSettings();

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
        <div className="text-3xl font-medium">{`Welcome back, ${firstName}! 👋`}</div>
        <span className="text-md text-gray-500">
          {`You can impact someone's life today.`}
        </span>
      </div>
      <GettingStartedSection />
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
      <div className="mt-6 mb-12 w-full">
        <RecentOrders
          orders={ordersData}
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
