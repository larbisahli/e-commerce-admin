import { CheckMark } from '@components/icons/checkmark';
import Scrollbar from '@components/ui/scrollbar';
import cn from 'classnames';

import styles from './progress-box.module.css';

type ProgressProps = {
  data: any[] | undefined;
  status: number;
};

const ProgressBox: React.FC<ProgressProps> = ({ status, data }) => {
  return (
    <Scrollbar
      className="h-full w-full"
      options={{
        scrollbars: {
          autoHide: 'never'
        }
      }}
    >
      <div className="flex w-full flex-col py-7 md:flex-row md:items-start md:justify-start">
        {data?.map((item: any) => (
          <div className={styles.progress_container} key={item.id}>
            <div
              className={cn(
                styles.progress_wrapper,
                status >= item.serial ? styles.checked : ''
              )}
            >
              <div className={styles.status_wrapper}>
                {status >= item.serial ? (
                  <div className="h-4 w-3">
                    <CheckMark className="w-full" />
                  </div>
                ) : (
                  item.serial
                )}
              </div>
              <div className={styles.bar} />
            </div>

            <div className="flex flex-col items-start ms-5 md:items-center md:ms-0">
              {item && (
                <span className="text-start text-base font-semibold capitalize text-body-dark md:px-2 md:text-center">
                  {item?.name}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </Scrollbar>
  );
};

export default ProgressBox;
