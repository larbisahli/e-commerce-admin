import Label from '@components/ui/label';
import Select from '@components/ui/select/select';
import cn from 'classnames';
import { useTranslation } from 'next-i18next';
import React from 'react';

interface Props {
  className?: string;
  orderValue?: string;
  showLabel?: boolean;
  onSortChange?: Function;
  onOrderChange: Function;
  options: {
    id?: number;
    value: string;
    label: string;
  }[];
}

const SortForm: React.FC<Props> = ({
  onSortChange,
  onOrderChange,
  orderValue,
  options,
  className,
  showLabel = true
}) => {
  const { t } = useTranslation('common');

  return (
    <div className={cn('flex items-end w-full', className)}>
      <div className="w-full">
        {showLabel && <Label>{t('filter-by-order')}</Label>}
        <Select
          options={options}
          defaultValue={options?.find((option) => option.value === orderValue)}
          onChange={onOrderChange}
          name="orderBy"
          placeholder={t('filter-by-order-placeholder')}
        />
      </div>
      {/* {!!onSortChange && <div className="w-[150px] ms-5">
        <Select
          options={[
            { id: 1, value: 'asc', label: 'ASC' },
            { id: 2, value: 'desc', label: 'DESC' }
          ]}
          onChange={onSortChange}
          defaultValue={{ id: 1, value: 'desc', label: 'DESC' }}
          name="sortedBy"
        />
      </div>} */}
    </div>
  );
};

export default SortForm;
