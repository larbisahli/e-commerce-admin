import 'rc-tooltip/assets/bootstrap_white.css';

import { ArrowCircleDown } from '@components/icons/arrow-circle-down';
import EditInfoIcon from '@components/icons/edit-info';
import styles from '@styles/loader.module.css';
import cn from 'classnames';
import Tooltip from 'rc-tooltip';
import React, { useState } from 'react';

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
      <div className="w-full mx-auto shadow-category bg-skin-fill group">
        <div>
          <button
            className={cn(
              btnClassName,
              'flex bg-white border-b border-solid border-border-base  shadow-sm justify-between w-full px-5 py-4 2xl:px-6 2xl:py-6 text-base font-medium text-start text-skin-base focus:outline-none cursor-pointer',
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
                <Tooltip
                  placement="top"
                  trigger={['hover', 'click']}
                  overlay={
                    <span>
                      Changes have been made to this section that have not been
                      saved.
                    </span>
                  }
                >
                  <div className="pl-3 pb-1 text-gray-500">
                    <EditInfoIcon />
                  </div>
                </Tooltip>
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
              'pb-4 2xl:pb-7 transition-all hidden -mt-1 2xl:mt-0 leading-7 text-sm 2xl:text-15px text-skin-base',
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
