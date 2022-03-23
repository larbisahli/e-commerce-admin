import Label from '@components/ui/label';
import Select from '@components/ui/select/select';
import { ProductShippings, Shipping } from '@ts-types/generated';
import { isEmpty } from 'lodash';
import { useTranslation } from 'next-i18next';
import { useState } from 'react';
import type {
  FieldValues,
  UseFormSetValue,
  UseFormWatch
} from 'react-hook-form';
import { Control } from 'react-hook-form';

import ShippingsZonesComponent from './shippings-zones-component';

interface SCProps {
  item: ProductShippings;
  index: number;
  setValue: UseFormSetValue<FieldValues>;
  // eslint-disable-next-line no-unused-vars
  remove: (index?: number | number[]) => void;
  watch: UseFormWatch<FieldValues>;
  shippings: Shipping[];
  loading: boolean;
  control: Control<any>;
}

const ShippingsComponent = ({
  item,
  index,
  setValue,
  shippings,
  loading,
  remove,
  watch,
  control
}: SCProps) => {
  const { t } = useTranslation();

  // eslint-disable-next-line no-unused-vars
  const [deletedIndex, setDeletedIndex] = useState<number | null>(null);

  const value = watch(`shippings[${index}].shipping_provider`);

  const removeShippingProvider = () => {
    setDeletedIndex(index);
    console.log('item', { item, index });
    if (item?.id) {
      // deleteAttributeValue({
      //   variables: { id: item?.id },
      //   onCompleted: (data: { deleteAttributeValue: AttributeValue }) => {
      //     const attribute_value = data?.deleteAttributeValue?.attribute_value;
      //     if (!isEmpty(attribute_value)) {
      //       notify(t('common:successfully-deleted'), 'success');
      //       remove(index);
      //     }
      //   }
      // });
      remove(index);
    } else {
      remove(index);
    }
  };

  return (
    <div className="border-b border-dashed border-border-200 last:border-0 py-5 md:py-8">
      <div className="flex justify-between flex-col">
        <div style={{ minWidth: '150px', marginRight: '5px' }}>
          <Label style={{ color: '#929191', fontSize: '0.8rem' }}>
            {t('form:input-label-shipping-provider')}
          </Label>
          <Select
            onChange={(value) => {
              setValue(`shippings[${index}].shipping_provider`, value);
            }}
            value={isEmpty(value) ? null : [value]}
            className="w-full"
            getOptionLabel={(option: any) => option.shipper_name}
            getOptionValue={(option: any) => option.id}
            options={shippings}
            isLoading={loading}
          />
        </div>
        <div>
          {/* <Label>{t('form:input-label-shippings')}</Label> */}
          <ShippingsZonesComponent control={control} index={index} />
        </div>

        <button
          onClick={removeShippingProvider}
          type="button"
          className="transition-colors duration-200 focus:outline-none sm:mt-4 sm:col-span-1 text-red-500 py-1 rounded flex justify-center items-center text-base border border-solid border-red-500 hover:bg-red-700 hover:text-white"
        >
          {t('form:button-label-remove')}
          {/* {deleteAttributeLoading && deletedIndex === index && (
               <span
                 className="absolute h-4 w-4 ms-2 rounded-full border-2 border-transparent border-t-2 animate-spin"
                 style={{
                   borderTopColor: 'red'
                 }}
               />
             )} */}
        </button>
      </div>
    </div>
  );
};

export default ShippingsComponent;
