import { ArrowNext } from '@components/icons/arrow-next';
import { IosArrowDown } from '@components/icons/ios-arrow-down';
import { IosArrowUp } from '@components/icons/ios-arrow-up';
import Chart from '@components/ui/chart';
import dayjs from 'dayjs';
import { isEmpty } from 'lodash';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import React, { useMemo } from 'react';

const StickerCard = ({
  loading,
  titleTransKey,
  href,
  hrefText,
  price,
  indicator,
  indicatorText,
  note,
  data = [],
  tooltip,
  name
}: any) => {
  const { t } = useTranslation('widgets');

  const categories = useMemo(() => {
    return Object.keys(data)?.map((date) => {
      let day = new Date(date);
      return dayjs(day).format('dddd, MMM D, YYYY');
    });
  }, [data]);
  const series = useMemo(
    () => [
      {
        name,
        data: Object.keys(data)?.map((v) => data[v].value)
      }
    ],
    [data, name]
  );

  const options = {
    chart: {
      id: 'basic-bar',
      toolbar: {
        show: false
      },
      zoom: {
        enabled: false
      }
    },
    tooltip,
    fill: {
      type: 'gradient',
      gradient: {
        opacityFrom: 1,
        opacityTo: 0.7
      }
    },
    stroke: {
      curve: 'smooth',
      show: true,
      width: 2
    },
    markers: {
      size: 0,
      opacity: 1,
      colors: 'red',
      strokeColor: '#fff',
      strokeWidth: 4,
      hover: {
        size: 7
      }
    },
    grid: {
      borderColor: '#F7F7F7',
      xaxis: {
        lines: {
          show: false
        }
      },
      yaxis: {
        lines: {
          show: false
        }
      }
    },
    xaxis: {
      type: 'datetime',
      labels: {
        show: false
      },
      axisBorder: {
        show: false
      },
      axisTicks: {
        show: false
      },
      categories
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

  return (
    <div className="h-full w-full rounded-sm">
      <div className="flex h-full w-full flex-col justify-between">
        <div className="flex h-full w-full flex-col justify-between">
          <div className="mb-auto w-full pb-2">
            <div className="flex w-full flex-col">
              <span className="mb-1 text-xl font-semibold text-heading">
                {loading ? (
                  <div className="animated-background h-4 max-w-[130px] rounded-sm" />
                ) : (
                  t(titleTransKey)
                )}
              </span>
              {loading ? (
                <div className="animated-background m-1 h-2 max-w-[40px] rounded-sm" />
              ) : (
                <Link href={href} className="w-fit">
                  <div className="text flex cursor-pointer items-center text-sm text-gray-700 hover:text-blue-600 hover:underline">
                    <div>{t(hrefText)}</div>
                    <div className="m-1">
                      {<ArrowNext width={13} height={13} />}
                    </div>
                  </div>
                </Link>
              )}
            </div>
          </div>
          {loading ? (
            <div className="animated-background mb-2 h-6 max-w-[90px] rounded-sm" />
          ) : (
            <span className="mb-2 text-3xl font-semibold text-heading">
              {price}
            </span>
          )}
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
        {loading ? (
          <div className="animated-background h-20 max-w-full rounded-sm" />
        ) : (
          !isEmpty(data) &&
          Object.keys(data)?.length > 1 && (
            <div className="h-full w-full">
              <Chart options={options} series={series} type="line" />
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default StickerCard;
