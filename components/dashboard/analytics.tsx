import { ArrowNext } from '@components/icons/arrow-next';
import RecentOrders from '@components/order/recent-orders';
import { DatePicker } from '@components/ui/date-picker';
import Label from '@components/ui/label';
import Loader from '@components/ui/loader/loader';
import Select from '@components/ui/select/select';
import ColumnChart from '@components/widgets/column-chart';
import { Scalars } from '@ts-types/custom.types';
// import usePrice from '@utils/use-price';
import { useTranslation } from 'next-i18next';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

type FormValues = {
  from: Scalars['Date'];
  to: Scalars['Date'];
};

export default function Dashboard() {
  const { t } = useTranslation();
  const initialValues = null;
  const loading = false;
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
      id: 'today',
      label: 'Today'
    },
    {
      id: 'last_30_days',
      label: 'Last 30 days'
    },
    {
      id: 'last_60_days',
      label: 'Last 60 days'
    },
    {
      id: 'last_90_days',
      label: 'Last 90 days'
    },
    {
      id: 'last_month',
      label: 'Last month'
    },
    {
      id: 'Last_year',
      label: 'Last year'
    },
    {
      id: 'custom',
      label: 'Custom'
    }
  ];

  const orderLoading = false;
  const popularProductLoading = false;
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

  const { handleSubmit, control, watch } = useForm<FormValues>({
    // @ts-ignore
    defaultValues: initialValues
      ? {
          ...initialValues,
          couponStartDate: new Date(initialValues.from!),
          couponEndDate: new Date(initialValues.to!)
        }
      : {
          from: new Date(),
          to: new Date()
        }
  });

  const [selectedDate, setSelectedDate] = useState({
    id: 'today',
    label: 'Today'
  });

  const [from, to] = watch(['from', 'to']);

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
      <div className="mb-8">
        <div className="text-3xl font-medium">Analytics</div>
      </div>
      <div className="mb-5 flex">
        <div>
          <Label className="h-[14px]">Date range</Label>
          <div className="mr-2">
            <Select
              options={dates}
              value={selectedDate}
              name="date"
              getOptionLabel={(option: any) => option.label}
              getOptionValue={(option: any) => option.id}
              onChange={setSelectedDate}
              className="min-w-[200px]"
            />
          </div>
        </div>
        <div className="relative ">
          <div className="mx-4 flex items-center">
            <div className="pointer-events-none opacity-50">
              <Label className="h-[14px]">Form</Label>
              <Controller
                control={control}
                name="from"
                render={({ field: { onChange, onBlur, value } }) => (
                  //@ts-ignore
                  <DatePicker
                    dateFormat="dd/MM/yyyy"
                    onChange={onChange}
                    onBlur={onBlur}
                    selected={value}
                    selectsStart
                    maxDate={to}
                    startDate={from}
                    endDate={to}
                  />
                )}
              />
            </div>
            <div className="mx-2 flex items-center justify-center text-gray-500">
              <ArrowNext className="pt-[19px]"></ArrowNext>
            </div>
            <div className="pointer-events-none opacity-50">
              <Label className="h-[14px]">To</Label>
              <Controller
                control={control}
                name="to"
                render={({ field: { onChange, onBlur, value } }) => (
                  //@ts-ignore
                  <DatePicker
                    dateFormat="dd/MM/yyyy"
                    onChange={onChange}
                    onBlur={onBlur}
                    selected={value}
                    selectsEnd
                    startDate={from}
                    endDate={to}
                    minDate={from}
                    className="border border-border-base"
                  />
                )}
              />
            </div>
          </div>
          <div className="absolute bottom-[-18px] mx-4 w-full text-xs text-gray-500">
            Premium plan is required to change date
          </div>
        </div>
      </div>
      <div className="my-8 w-full">
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
            title={'Top products by units sold'}
          />
        </div>
        <div className="mb-6 w-full sm:px-3 sm:pl-0 xl:mb-0 xl:w-1/2">
          <RecentOrders
            orders={orderData}
            // title={t('table:recent-order-table-title')}
            title={'Sales by country'}
          />
        </div>
      </div>
    </>
  );
}
