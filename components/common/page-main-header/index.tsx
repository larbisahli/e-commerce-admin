import SortForm from '@components/common/sort-form';
import { Add } from '@components/icons/add';
import { ArrowDown } from '@components/icons/arrow-down';
import { ExportIcon } from '@components/icons/export';
import { FilterIcon } from '@components/icons/filter';
import { SettingsIcon } from '@components/icons/sidebar';
import Pagination from '@components/ui/pagination';
import Select from '@components/ui/select/select';
import SelectInput from '@components/ui/select-input';
import { Nullable } from '@ts-types/custom.types';
import cn from 'classnames';
import { useTranslation } from 'next-i18next';
import React, { useState } from 'react';

import ColumnsComponent from './ColumnsComponent';

interface Parameter {
  id: string;
  append: boolean;
  remove: boolean;
  column: { label: string; key: string };
}

interface Props {
  columns: { label: string; key: string }[];
  selectedColumns: string[];
  // eslint-disable-next-line no-unused-vars
  handleColumnChange: (a: Parameter) => void;
  // eslint-disable-next-line no-unused-vars
  onPagination: (key: number) => void;
  total: Nullable<number>;
  currentPage: Nullable<number>;
  perPage: Nullable<number>;
  onLimitChange?: Function;
  limit?: { id: number; value: number; label: number };
}

const PageMainHeader = ({
  columns,
  selectedColumns,
  handleColumnChange,
  onLimitChange,
  limit,
  onPagination,
  total,
  currentPage,
  perPage
}: Props) => {
  const { t } = useTranslation();

  const [openDrop, setOpenDrop] = useState('');

  console.log({ openDrop });

  const handleOpenDrop = (column) => {
    setOpenDrop((prev) => {
      return prev === column ? '' : column;
    });
  };

  return (
    <div className="p-3 mb-8">
      {/* ----- */}
      <div className="py-2 flex items-center justify-end">
        <button
          onClick={() => handleOpenDrop('filter')}
          className="text-sub-heading p-2 flex items-center cursor-pointer"
        >
          <div className="mr-2">
            <FilterIcon height="1.2em" width="1.2em" />
          </div>
          <span className="">Filter</span>
          <div className="ml-2">
            <ArrowDown
              height="1.2em"
              width="1.2em"
              className={cn('transition', {
                'rotate-180': openDrop === 'filter'
              })}
            />
          </div>
        </button>
        <div className="w-[1px] h-[40px] bg-gray-300 mx-2"></div>
        <button
          onClick={() => handleOpenDrop('columns')}
          className="text-sub-heading p-2 flex items-center cursor-pointer"
        >
          <div className="mr-2">
            <SettingsIcon height="1.2em" width="1.2em" />
          </div>
          <span className="">Columns</span>
          <div className="ml-2">
            <ArrowDown
              height="1.2em"
              width="1.2em"
              className={cn('transition', {
                'rotate-180': openDrop === 'columns'
              })}
            />
          </div>
        </button>
        <div className="w-[1px] h-[40px] bg-gray-300 mx-2"></div>
        <button
          onClick={() => handleOpenDrop('exports')}
          className="text-sub-heading p-2 flex items-center cursor-pointer"
        >
          <div className="mr-2">
            <ExportIcon height="1.2em" width="1.2em" />
          </div>
          <span className="">Exports</span>
          <div className="ml-2">
            <ArrowDown
              height="1.2em"
              width="1.2em"
              className={cn('transition', {
                'rotate-180': openDrop === 'exports'
              })}
            />
          </div>
        </button>
      </div>
      {/* --- Applied Filters --- */}
      <div className="border-y border-gray-300 py-3 my-5 flex items-center justify-between">
        <div>
          <div className="text-base text-sub-heading">Active filters:</div>
        </div>
        <button className="text-blue-500 font-medium">Clear All</button>
      </div>
      {/* --- Dropdown --- */}
      <div className="mb-5">
        {openDrop === 'columns' && (
          <ColumnsComponent
            columns={columns}
            selectedColumns={selectedColumns}
            handleColumnChange={handleColumnChange}
          />
        )}
      </div>
      {/* ----- */}
      <div className="flex items-center justify-end">
        {onLimitChange instanceof Function && (
          <div className="flex items-center mr-5">
            <div className="w-[90px] flex item-center">
              <Select
                options={[
                  { id: 1, value: 10, label: 10 },
                  { id: 2, value: 20, label: 20 },
                  { id: 3, value: 30, label: 30 }
                ]}
                onChange={onLimitChange}
                value={limit}
                name="Limit"
              />
            </div>
            <span className="text-heading font-light">Per page</span>
          </div>
        )}
        {!!total && (
          <div className="flex justify-end items-center">
            <Pagination
              total={total}
              current={currentPage}
              pageSize={perPage}
              onChange={onPagination}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default PageMainHeader;
