import RecentOrders from '@components/order/recent-orders';
import Loader from '@components/ui/loader/loader';
import StickerCard from '@components/widgets/sticker-card';
import { useGetUser } from '@hooks/useGetUser';
import classNames from 'classnames';
import dayjs from 'dayjs';
import Head from 'next/head';
import { useTranslation } from 'next-i18next';
import { useState } from 'react';

import GettingStartedSection from './GettingStartedSection';
import RecommendationsSection from './RecommendationsSection';

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

export default function Dashboard() {
  const { t } = useTranslation();

  const [selectedDate, setSelectedDate] = useState({
    length: 1,
    id: 'today',
    label: 'Today'
  });

  const {
    userInfo: { firstName = '' }
  } = useGetUser();

  const now = new Date();
  const length = selectedDate?.length;

  const sales = {
    count: 435,
    data: {
      categories: Array.from({ length }, (_, days) => {
        let day = new Date(now);
        day.setDate(now.getDate() - days);
        day.setHours(0, 0, 0, 0);
        return dayjs(day).format('dddd, MMM D, YYYY');
      }),
      series: [
        {
          name: 'sales',
          data: Array.from(
            { length },
            (_) => Math.floor(Math.random() * 120) + 1
          )
        }
      ]
    }
  };

  const orders = {
    count: 325,
    data: {
      categories: Array.from({ length }, (_, days) => {
        let day = new Date(now);
        day.setDate(now.getDate() - days);
        day.setHours(0, 0, 0, 0);
        return dayjs(day).format('dddd, MMM D, YYYY');
      }),
      series: [
        {
          name: 'orders',
          data: Array.from(
            { length },
            (_) => Math.floor(Math.random() * 120) + 1
          )
        }
      ]
    }
  };

  const avgOrderValue = {
    amount: '50 USD',
    data: {
      categories: Array.from({ length }, (_, days) => {
        let day = new Date(now);
        day.setDate(now.getDate() - days);
        day.setHours(0, 0, 0, 0);
        return dayjs(day).format('dddd, MMM D, YYYY');
      }),
      series: [
        {
          name: 'amount',
          data: Array.from(
            { length },
            (_) => Math.floor(Math.random() * 120) + 1
          )
        }
      ]
    }
  };

  const revenue = {
    amount: '3,239 USD',
    data: {
      categories: Array.from({ length }, (_, days) => {
        let day = new Date(now);
        day.setDate(now.getDate() - days);
        day.setHours(0, 0, 0, 0);
        return dayjs(day).format('dddd, MMM D, YYYY');
      }),
      series: [
        {
          name: 'total',
          data: Array.from(
            { length },
            (_) => Math.floor(Math.random() * 120) + 1
          )
        }
      ]
    }
  };

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

  const orderLoading = false;
  const loading = false;
  const popularProductLoading = false;
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
        <div className="flex w-full items-center">
          {dates?.map((date) => {
            return (
              <button
                onClick={() => setSelectedDate(date)}
                key={date.id}
                className={classNames(
                  'mr-3 rounded-sm border bg-white px-5 py-1',
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
            titleTransKey="sticker-card-title-total-rev"
            indicator="up"
            indicatorText={`${Math.round(
              ((Math.max(...(revenue.data?.series[0]?.data ?? [])) -
                Math.min(...(revenue.data?.series[0]?.data ?? []))) /
                Math.max(...(revenue.data?.series[0]?.data ?? []))) *
                100
            ).toFixed(0)}%`}
            price={revenue.amount}
            data={revenue.data}
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
            titleTransKey="Total Sales"
            indicator="up"
            indicatorText={`${Math.round(
              ((Math.max(...(sales.data?.series[0]?.data ?? [])) -
                Math.min(...(sales.data?.series[0]?.data ?? []))) /
                Math.max(...(sales.data?.series[0]?.data ?? []))) *
                100
            ).toFixed(0)}%`}
            note=""
            price={sales.count}
            data={sales.data}
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
            titleTransKey="sticker-card-title-avg-order"
            indicator="up"
            indicatorText={`${Math.round(
              ((Math.max(...(avgOrderValue.data?.series[0]?.data ?? [])) -
                Math.min(...(avgOrderValue.data?.series[0]?.data ?? []))) /
                Math.max(...(avgOrderValue.data?.series[0]?.data ?? []))) *
                100
            ).toFixed(0)}%`}
            price={avgOrderValue.amount}
            data={avgOrderValue.data}
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
            titleTransKey="Total Orders"
            indicator="up"
            indicatorText={`${Math.round(
              ((Math.max(...(orders.data?.series[0]?.data ?? [])) -
                Math.min(...(orders.data?.series[0]?.data ?? []))) /
                Math.max(...(orders.data?.series[0]?.data ?? []))) *
                100
            ).toFixed(0)}%`}
            price={orders.count}
            data={orders.data}
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
      <div className="mb-6 w-full">
        <RecentOrders
          orders={orderData}
          title={t('table:recent-order-table-title')}
        />
      </div>
      <RecommendationsSection />
    </>
  );
}
