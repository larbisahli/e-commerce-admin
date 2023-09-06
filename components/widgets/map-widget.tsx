import { Line } from 'rc-progress';

const MapWidget = ({ data, totalText }: any) => {
  const numberWithCommas = (num: number) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  const numberToPercent = (num: number, total: number) => {
    return (num * 100) / total;
  };

  return (
    <div className="h-full w-full rounded bg-light shadow-sm">
      <div className="my-auto mx-0 flex w-full py-12 px-9">
        <div className="flex w-5/12 flex-col items-center justify-center py-12 pe-8">
          <span className="mb-1 whitespace-nowrap text-xs text-body">
            {totalText}
          </span>

          <span className="text-xl font-semibold text-heading">
            {numberWithCommas(
              data.reduce((a: any, { value }: any) => a + value, 0)
            )}
          </span>
        </div>

        <div className="flex w-7/12 flex-col">
          {data.map((item: any, index: number) => (
            <div
              className="mb-4 flex w-full flex-col pe-12 last:mb-0"
              key={index}
            >
              <div className="mb-3 flex w-full items-baseline">
                <span className="text-sm font-semibold text-heading">
                  {item.name}
                </span>
                <span className="text-xs font-semibold  text-heading ms-2">
                  ({numberWithCommas(item.value)})
                </span>
              </div>
              <Line
                percent={numberToPercent(
                  item.value,
                  data.reduce((a: any, { value }: any) => a + value, 0)
                )}
                strokeWidth={2}
                strokeColor={item.color}
                trailWidth={2}
                trailColor="#F2F2F2"
              />
            </div>
          ))}
        </div>
      </div>
      <div className="flex w-full border border-border-100">
        <div className="flex w-full flex-shrink-0  flex-wrap justify-around py-5 px-5 md:px-4">
          {data.map((item: any, index: number) => (
            <div
              className="flex w-1/2 flex-col justify-between py-4 px-4 md:w-1/4 md:px-3"
              key={index}
            >
              <span className="mb-1 truncate whitespace-nowrap text-xs text-body">
                <span
                  className="inline-block h-2 w-2 rounded-full me-1"
                  style={{ backgroundColor: item.color }}
                />
                {item.name}
              </span>
              <span className="text-xl font-semibold text-heading">
                {numberWithCommas(item.value)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MapWidget;
