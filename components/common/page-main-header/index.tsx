// import SortForm from '@components/common/sort-form';
import { ArrowDown } from '@components/icons/arrow-down';
import { ExportIcon } from '@components/icons/export';
import { FilterIcon } from '@components/icons/filter';
import { RefreshIcon } from '@components/icons/refresh';
import { SettingsIcon } from '@components/icons/sidebar';
import Button from '@components/ui/button';
import Pagination from '@components/ui/pagination';
import Select from '@components/ui/select/select';
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
  columns?: { label: string; key: string }[];
  selectedColumns?: string[];
  // eslint-disable-next-line no-unused-vars
  handleColumnChange?: (a: Parameter) => void;
  // eslint-disable-next-line no-unused-vars
  onPagination: (key: number) => void;
  total: Nullable<number>;
  currentPage: Nullable<number>;
  perPage: Nullable<number>;
  onLimitChange?: Function;
  limit?: { id: number; value: number; label: number };
  showOnlyPagination?: boolean;
  isFilterVisible?: boolean;
  isExportVisible?: boolean;
}

const PageMainHeader = ({
  columns,
  selectedColumns,
  handleColumnChange,
  onLimitChange,
  limit,
  onPagination,
  total = 0,
  currentPage,
  perPage,
  showOnlyPagination = false,
  isFilterVisible = true,
  isExportVisible = false
}: Props) => {
  const { t } = useTranslation();

  const [openDrop, setOpenDrop] = useState('');

  const handleOpenDrop = (column) => {
    setOpenDrop((prev) => {
      return prev === column ? '' : column;
    });
  };

  const renderControllers = () => {
    if (showOnlyPagination) {
      return null;
    }
    return (
      <div className="flex flex-wrap-reverse items-center justify-between py-2">
        <div className="flex flex-1 items-end justify-end py-2">
          <div className="w-full whitespace-nowrap text-sm text-gray-900">
            <span className="">{total}</span>
            <span className="px-1">records found</span>
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-end">
          {isFilterVisible && (
            <>
              <button
                onClick={() => handleOpenDrop('filter')}
                className="flex cursor-pointer items-center text-sub-heading"
              >
                <div className="mr-2">
                  <FilterIcon height="1.2em" width="1.2em" />
                </div>
                <span className="">Filter</span>
                <div className="mx-4 h-[40px] w-[1px] bg-gray-300"></div>
              </button>
            </>
          )}

          <button
            onClick={() => handleOpenDrop('columns')}
            className="flex cursor-pointer items-center text-sub-heading"
          >
            <div className="mr-2">
              <SettingsIcon height="1.2em" width="1.2em" />
            </div>
            <span className="">Columns</span>
          </button>

          {!isExportVisible && (
            <>
              <div className="mx-4 h-[40px] w-[1px] bg-gray-300"></div>
              <button
                onClick={() => handleOpenDrop('exports')}
                className="flex cursor-pointer items-center p-2 text-sub-heading"
              >
                <div className="mr-2">
                  <ExportIcon height="1.2em" width="1.2em" />
                </div>
                <span className="">Exports</span>
              </button>
            </>
          )}
        </div>
      </div>
    );
  };

  const renderAppliedFilter = () => {
    if (showOnlyPagination) {
      return null;
    }
    return (
      <div className="my-5 flex items-center justify-between border-y border-gray-300 py-3">
        <div>
          <div className="text-base text-sub-heading">Active filters:</div>
        </div>
        <button className="font-medium text-blue-500">Clear All</button>
      </div>
    );
  };

  const renderColumnsDropdown = () => {
    if (showOnlyPagination) {
      return null;
    }
    return (
      <div className="mb-5">
        <ColumnsComponent
          closeModal={() => handleOpenDrop('columns')}
          isOpen={openDrop === 'columns'}
          columns={columns}
          selectedColumns={selectedColumns}
          handleColumnChange={handleColumnChange}
        />
      </div>
    );
  };

  return (
    <div className="mb-8 p-3">
      {/* ----- */}
      {renderControllers()}
      {/* --- Applied Filters --- */}
      {isFilterVisible && renderAppliedFilter()}
      {/* --- Dropdown --- */}
      {renderColumnsDropdown()}
      {/* ----- */}
      <div className="flex items-center justify-end">
        {onLimitChange instanceof Function && (
          <div className="mr-5 flex items-center">
            <div className="item-center flex w-[90px]">
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
            <span className="font-light text-heading">Per page</span>
          </div>
        )}
        {!!total && (
          <div className="flex items-center justify-end">
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

{
  /* <SortForm
            className="md:ms-5"
            showLabel={false}
            onLimitChange={(value) => {
              setLimit(value);
            }}
            limit={limit}
            onOrderChange={({ value }: { value: OrderBy }) => {
              setOrder(value);
            }}
            options={[
              { id: 1, value: 'created_at', label: 'Created At' },
              { id: 2, value: 'updated_at', label: 'Updated At' }
            ]}
          /> */
}
