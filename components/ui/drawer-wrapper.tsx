import { CloseIcon } from '@components/icons/close-icon';
import cn from 'classnames';
import React from 'react';

import Scrollbar from './scrollbar';

type DrawerWrapperProps = {
  children: any;
  onClose: () => void;
  label?: string;
  className?: string;
};

const DrawerWrapper: React.FunctionComponent<DrawerWrapperProps> = ({
  children,
  onClose,
  label,
  className
}) => {
  return (
    <div className={cn('flex flex-col h-full relative bg-sidenav', className)}>
      <div
        style={{ width: '280px' }}
        className="flex items-center border-sidenav-divider justify-between px-5 md:py-5 border-b border-opacity-75 w-full h-16"
      >
        {label && (
          <span className="text-light font-medium text-lg">{label}</span>
        )}
        <button
          onClick={onClose}
          className="w-8 h-8 flex items-center justify-center
          text-sidenav-color-secondary transition-all duration-200
          focus:outline-none hover:text-light"
        >
          <CloseIcon className="w-5 h-5" />
        </button>
      </div>
      {/* End of header part */}
      <div style={{ width: '280px' }} className="pt-5 h-full">
        <Scrollbar className="w-full h-full">{children}</Scrollbar>
      </div>
      {/* End of menu part */}
    </div>
  );
};

export default DrawerWrapper;
