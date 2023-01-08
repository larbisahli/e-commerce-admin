import 'rc-pagination/assets/index.css';

import { ArrowNext } from '@components/icons/arrow-next';
import { ArrowPrev } from '@components/icons/arrow-prev';
import RCPagination, { PaginationProps } from 'rc-pagination';
import React from 'react';

const Pagination2: React.FC<PaginationProps> = (props) => {
  return (
    <RCPagination
      showTitle={false}
      nextIcon={<ArrowNext />}
      prevIcon={<ArrowPrev />}
      {...props}
    />
  );
};

export default Pagination2;
