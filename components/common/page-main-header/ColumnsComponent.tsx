/* eslint-disable no-unused-vars */
import { ResetIcon } from '@components/icons/reset';
import Button from '@components/ui/button';
import Checkbox from '@components/ui/checkbox';
import isEmpty from 'lodash/isEmpty';
import dynamic from 'next/dynamic';
import React, { useMemo } from 'react';

const Modal = dynamic(() => import('@components/ui/modal/modal'), {
  ssr: false
});

interface Parameter {
  id?: string;
  append?: boolean;
  remove?: boolean;
  column?: { label: string; key: string };
}

interface Props {
  // eslint-disable-next-line no-unused-vars
  columns: { label: string; key: string }[];
  selectedColumns: string[];
  isOpen: boolean;
  closeModal: () => void;
  handleColumnChange: (a: Parameter, reset?: boolean) => void;
}

const ColumnsComponent = ({
  isOpen,
  closeModal,
  columns = [],
  selectedColumns,
  handleColumnChange
}: Props) => {
  const handleCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    const id = e.target.id;
    const checked = e.target.checked;
    const column = columns?.find((column) => column.key === id);
    handleColumnChange({
      id,
      append: checked,
      remove: !checked && selectedColumns?.length > 1,
      column
    });
  };

  const handleReset = () => {
    handleColumnChange({}, true);
  };

  return (
    <Modal open={isOpen} onClose={closeModal} align="center">
      <div className="w-full rounded-md bg-light p-6 pb-6 sm:w-[400px]">
        <div className="py-5 font-semibold text-black">Columns:</div>
        <div className="grid grid-cols-2 gap-4">
          {columns?.map((column, idx) => {
            return (
              <Column
                key={column.key ?? idx}
                column={column}
                handleCheck={handleCheck}
                selectedColumns={selectedColumns}
              />
            );
          })}
        </div>
        <div className="mt-6 flex justify-end">
          <Button size="small" onClick={handleReset}>
            <ResetIcon />
            <span className="mx-1">Reset</span>
          </Button>
        </div>
      </div>
    </Modal>
  );
};

const Column = ({
  column,
  selectedColumns,
  handleCheck
}: {
  column: { label: string; key: string };
  handleCheck: Function;
  selectedColumns: string[];
}) => {
  const selected = useMemo(() => {
    return !isEmpty(
      selectedColumns?.find((columnKey) => columnKey === column.key)
    );
  }, [selectedColumns, column]);
  return (
    <div key={column.key} className="text-xl">
      <Checkbox
        id={column.key}
        className="text-xl font-medium text-body"
        name={column.label}
        // @ts-ignore
        onChange={handleCheck}
        checked={selected}
        label={column.label}
      />
    </div>
  );
};

export default ColumnsComponent;

{
  /* <SortForm
              className="w-full md:w-1/3 mt-5 md:mt-0"
              onSortChange={({ value }: { value: SortOrder }) => {
                setColumn(value);
              }}
              onOrderChange={({ value }: { value: string }) => {
                setOrder(value);
              }}
              options={[
                { value: 'name', label: 'Name' },
                { value: 'price', label: 'Price' },
                { value: 'max_price', label: 'Max Price' },
                { value: 'mix_price', label: 'Min Price' },
                { value: 'sale_price', label: 'Sale Price' },
                { value: 'quantity', label: 'Quantity' },
                { value: 'created_at', label: 'Created At' },
                { value: 'updated_at', label: 'Updated At' }
              ]}
            /> */
}
