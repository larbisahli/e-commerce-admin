import { IosArrowDown } from '@components/icons/ios-arrow-down';
import { IosArrowUp } from '@components/icons/ios-arrow-up';
import Chart from '@components/ui/chart';
import { useTranslation } from 'next-i18next';
import React from 'react';

const StickerCard = ({
  titleTransKey,
  subtitleTransKey,
  price,
  indicator,
  indicatorText,
  note
}: any) => {
  const { t } = useTranslation('widgets');

  let januarySalesByYear: {} = {
    orders: Array.from(
      { length: 31 },
      (_) => Math.floor(Math.random() * 140) + 1
    )
  };

  const options = {
    chart: {
      id: 'basic-bar',
      toolbar: {
        show: false
      }
    },
    stroke: {
      show: true,
      width: 2
    },
    grid: {
      borderColor: '#F7F7F7',
      xaxis: {
        lines: {
          show: false
        }
      }
    },
    xaxis: {
      labels: {
        show: false
      },
      axisBorder: {
        show: false
      },
      axisTicks: {
        show: false
      },
      categories: Array.from(
        { length: 31 },
        (_) => Math.floor(Math.random() * 140) + 1
      )
    },
    yaxis: {
      axisBorder: {
        show: false
      },
      axisTicks: {
        show: false
      },
      labels: {
        show: false
      }
    }
  };

  const series = [
    {
      name: 'series-1',
      data: Array.from(
        { length: 31 },
        (_) => Math.floor(Math.random() * 140) + 1
      )
    }
  ];

  return (
    <div className="h-full w-full rounded-sm border bg-white p-4 shadow-sm">
      <div className="flex h-full w-full justify-between ">
        <div className="flex h-full w-full flex-col justify-between">
          <div className="mb-auto w-full pb-3">
            <div className="flex w-full flex-col">
              <span className="mb-1 font-medium text-heading">
                {t(titleTransKey)}
              </span>
              <span className="text-xs font-medium text-body">
                {t(subtitleTransKey)}
              </span>
            </div>
          </div>
          <span className="mb-2 text-2xl font-semibold text-heading">
            {price}
          </span>
          {indicator === 'up' && (
            <span
              className="inline-block text-sm font-semibold text-body"
              style={{ color: 'green' }}
            >
              <IosArrowUp width="9px" height="11px" className="inline-block" />{' '}
              {indicatorText}
              <span className="text-sm font-normal text-body"> {note}</span>
            </span>
          )}
          {indicator === 'down' && (
            <span
              className="inline-block text-sm font-semibold text-body"
              style={{ color: 'red' }}
            >
              <IosArrowDown
                width="9px"
                height="11px"
                className="inline-block"
              />{' '}
              {indicatorText}
              <span className="text-sm font-normal text-body"> {note}</span>
            </span>
          )}
        </div>
        <div className="h-full w-full">
          <Chart
            options={options}
            colors={['#2E93fA', '#66DA26', '#546E7A', '#E91E63', '#FF9800']}
            series={series}
            type="line"
            // categories={series?.data?.map((_, idx) => idx + 1)}
          />
        </div>
      </div>
    </div>
  );
};

export default StickerCard;
