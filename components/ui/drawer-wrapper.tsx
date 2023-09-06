import { CloseIcon } from '@components/icons/close-icon';
import { useGetUser } from '@hooks/useGetUser';
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
    <div
      className={cn(
        'relative flex h-full flex-col bg-sidenav-secondary',
        className
      )}
    >
      <div
        style={{ width: '280px' }}
        className="flex h-16 w-full items-center justify-between border-b border-sidenav-divider border-opacity-75 px-5 md:py-5"
      >
        {label && (
          <span className="text-lg font-medium text-light">{label}</span>
        )}
        <button
          onClick={onClose}
          className="flex h-8 w-8 items-center justify-center
          text-sidenav-color-secondary transition-all duration-200
          hover:text-light focus:outline-none"
        >
          <CloseIcon className="h-5 w-5" />
        </button>
      </div>
      {/* End of header part */}
      <div style={{ width: '280px' }} className="h-full pt-5">
        <Scrollbar className="h-full w-full">{children}</Scrollbar>
      </div>
      {/* End of menu part */}
    </div>
  );
};

export default DrawerWrapper;
