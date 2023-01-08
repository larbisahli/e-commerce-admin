/* eslint-disable no-unused-vars */
import Checkbox from '@components/ui/checkbox';
import isEmpty from 'lodash/isEmpty';
import React, { useMemo } from 'react';

interface Parameter {
  id: string;
  append: boolean;
  remove: boolean;
  column: { label: string; key: string };
}

interface Props {
  // eslint-disable-next-line no-unused-vars
  columns: { label: string; key: string }[];
  selectedColumns: { label: string; key: string }[];
  handleColumnChange: (a: Parameter) => void;
}

const ColumnsComponent = ({
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

  return (
    <div className="flex items-center flex-wrap">
      {columns?.map((column) => {
        return (
          <Column
            key={column.key}
            column={column}
            handleCheck={handleCheck}
            selectedColumns={selectedColumns}
          />
        );
      })}
    </div>
  );
};

const Column = ({
  column,
  selectedColumns,
  handleCheck
}: {
  column: { label: string; key: string };
  handleCheck: Function;
  selectedColumns: { label: string; key: string }[];
}) => {
  const selected = useMemo(() => {
    return !isEmpty(selectedColumns?.find((c) => c.key === column.key));
  }, [selectedColumns, column]);
  return (
    <div key={column.key} className="mr-3 my-4">
      <div className="text-xl">
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
