import { ArrowNext } from '@components/icons/arrow-next';
import { IosArrowDown } from '@components/icons/ios-arrow-down';
import { IosArrowUp } from '@components/icons/ios-arrow-up';
import Chart from '@components/ui/chart';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import React from 'react';

const StickerCard = ({
  titleTransKey,
  href,
  hrefText,
  price,
  indicator,
  indicatorText,
  note,
  data,
  tooltip
}: any) => {
  const { t } = useTranslation('widgets');

  const options = {
    chart: {
      id: 'basic-bar',
      toolbar: {
        show: false
      }
    },
    tooltip,
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
      labels: {
        show: false
      },
      axisBorder: {
        show: false
      },
      axisTicks: {
        show: false
      },
      categories: data?.categories ?? []
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
          <div className="mb-auto w-full pb-3">
            <div className="flex w-full flex-col">
              <span className="mb-1 text-xl font-semibold text-heading">
                {t(titleTransKey)}
              </span>
              <Link href={href} className="w-fit">
                <div className="text flex cursor-pointer items-center text-sm text-gray-700 hover:text-blue-600 hover:underline">
                  <div>{t(hrefText)}</div>
                  <div className="m-1">
                    {<ArrowNext width={13} height={13} />}
                  </div>
                </div>
              </Link>
            </div>
          </div>
          <span className="mb-2 text-3xl font-semibold text-heading">
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
        {data?.categories?.length > 1 && (
          <div className="h-full w-full">
            <Chart options={options} series={data?.series ?? []} type="line" />
          </div>
        )}
      </div>
    </div>
  );
};

export default StickerCard;
