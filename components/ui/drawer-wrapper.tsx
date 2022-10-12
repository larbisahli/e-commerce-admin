import { CloseIcon } from '@components/icons/close-icon';
import React from 'react';

import Scrollbar from './scrollbar';

type DrawerWrapperProps = {
  children: any;
  onClose: () => void;
  label?: string;
};

const DrawerWrapper: React.FunctionComponent<DrawerWrapperProps> = ({
  children,
  onClose,
  label
}) => {
  return (
    <div className="flex flex-col h-full relative bg-sidenav">
      <div
        style={{ width: '280px', borderColor: '#4b4a4a' }}
        className="flex items-center justify-between px-5 md:py-5 md:px-8 mb-4 md:mb-6 border-b border-opacity-75 absolute top-0 start-0 w-full h-16 z-30"
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
      <div style={{ width: '280px' }} className="pt-16 h-full">
        <Scrollbar className="w-full h-full">{children}</Scrollbar>
      </div>
      {/* End of menu part */}
    </div>
  );
};

export default DrawerWrapper;
