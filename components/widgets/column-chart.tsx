import { ArrowDown } from '@components/icons/arrow-down';
import { ArrowUp } from '@components/icons/arrow-up';
import { IosArrowDown } from '@components/icons/ios-arrow-down';
import { IosArrowUp } from '@components/icons/ios-arrow-up';
import Chart from '@components/ui/chart';
import cn from 'classnames';

const BarChart = ({
  widgetTitle,
  series,
  colors,
  prefix,
  totalValue,
  text,
  position,
  percentage,
  categories,
  tooltip = {}
}: any) => {
  const options = {
    options: {
      chart: {
        toolbar: {
          show: false
        }
      },
      tooltip,
      plotOptions: {
        bar: {
          columnWidth: '75%',
          endingShape: 'flat'
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: 'smooth',
        show: false,
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
      colors: colors,
      xaxis: {
        labels: {
          show: true,
          style: {
            colors: '#161F6A',
            fontSize: '14px',
            fontFamily: "'Lato', sans-serif"
          }
        },
        axisBorder: {
          show: false
        },
        axisTicks: {
          show: false
        },
        categories: categories
      },
      yaxis: {
        show: true,
        labels: {
          show: true,
          style: {
            color: '#161F6A',
            fontSize: '14px',
            fontFamily: "'Lato', sans-serif"
          }
        }
      }
    },
    series: series
  };

  return (
    <div className="h-full w-full rounded-sm border bg-light">
      <div className="flex items-center justify-between p-4">
        <h3 className="text-lg font-semibold text-heading">{widgetTitle}</h3>

        <div className="flex flex-col">
          <span className="text-lg font-semibold text-green-600">
            {prefix}
            {totalValue}
          </span>

          <div className="flex items-center">
            {position === 'up' && (
              <span className="text-green-600">
                <IosArrowUp
                  width="12px"
                  height="12px"
                  className="inline-block"
                />
              </span>
            )}
            {position === 'down' && (
              <span className="text-red-600">
                <IosArrowDown
                  width="12px"
                  height="12px"
                  className="inline-block"
                />
              </span>
            )}
            <span className="text-sm text-heading ms-1">
              <span
                className={cn(
                  position === 'down' ? 'text-red-600' : 'text-green-600'
                )}
              >
                {percentage}
              </span>
              &nbsp;
              {text}
            </span>
          </div>
        </div>
      </div>

      <div className="flex w-full flex-wrap" style={{ display: 'block' }}>
        <Chart
          options={options.options}
          series={options.series}
          height="350"
          width="100%"
          type="bar"
        />
      </div>
    </div>
  );
};

export default BarChart;
