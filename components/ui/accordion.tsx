import { ArrowCircleDown } from '@components/icons/arrow-circle-down';
import EditInfoIcon from '@components/icons/edit-info';
import styles from '@styles/loader.module.css';
import cn from 'classnames';
import React, { useState } from 'react';
import { Tooltip } from 'react-tooltip';

type CollapseProps = {
  Title: React.FC;
  children: React.ReactNode;
  disabled?: boolean;
  loading?: boolean;
  isUpdated?: boolean;
  variant?: 'gray' | 'transparent';
  btnClassName?: string;
};

export const Accordion: React.FC<CollapseProps> = ({
  Title,
  loading = false,
  isUpdated = false,
  disabled = false,
  children,
  btnClassName
}) => {
  const [open, setOpen] = useState(false);

  const onChange = (e) => {
    e.preventDefault();
    if (disabled) return;
    setOpen((prev) => !prev);
  };

  return (
    <div className="w-full">
      <div className="shadow-category bg-skin-fill group mx-auto w-full">
        <div>
          <button
            className={cn(
              btnClassName,
              'text-skin-base flex w-full cursor-pointer justify-between  border-b border-solid border-border-base bg-white px-5 py-4 text-start text-base font-medium shadow-sm focus:outline-none 2xl:px-6 2xl:py-6',
              {
                '!border-none': open,
                'shadow-lg': open,
                'pointer-events-none bg-gray-100 text-gray-400': disabled,
                'pointer-events-none': loading
              }
            )}
            onClick={onChange}
          >
            <div className="flex items-end">
              <Title />
              {isUpdated && (
                <div
                  className="pl-3 pb-1 text-gray-500"
                  data-tooltip-id="update-tooltip"
                >
                  <EditInfoIcon />
                  <Tooltip
                    id="update-tooltip"
                    className="form-tooltip"
                    classNameArrow="form-tooltip-arrow"
                    place="right"
                  >
                    <div>
                      Changes have been made to this section that have not been
                      saved.
                    </div>
                  </Tooltip>
                </div>
              )}
            </div>
            <div
              className={cn('text-gray-400 transition', {
                'rotate-180': open
              })}
            >
              {loading ? (
                <div className={styles.loading_small}></div>
              ) : (
                <ArrowCircleDown width={'2em'} height={'2em'} />
              )}
            </div>
          </button>
          <div
            className={cn(
              '2xl:text-15px text-skin-base -mt-1 hidden pb-4 text-sm leading-7 transition-all 2xl:mt-0 2xl:pb-7',
              {
                '!block': open
              }
            )}
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Accordion;
