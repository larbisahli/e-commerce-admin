import { useMutation } from '@apollo/client';
import ValidationError from '@components/ui/form-validation-error';
import Label from '@components/ui/label';
import SelectInput from '@components/ui/select-input';
import { DELETE_SHIPPING_PROVIDER } from '@graphql/product';
import { useErrorLogger } from '@hooks/useErrorLogger';
import { notify } from '@lib/notify';
import { Shipping } from '@ts-types/generated';
import { isEmpty } from 'lodash';
import { useTranslation } from 'next-i18next';
import { memo, useEffect, useState } from 'react';
import { Control, useFormContext } from 'react-hook-form';

import ShippingsZonesComponent from './shippings-zones-component';

interface SCProps {
  item: any;
  index: number;
  // eslint-disable-next-line no-unused-vars
  remove: (index?: number | number[]) => void;
  shippings: Shipping[];
  loading: boolean;
  control: Control<any>;
}

const ShippingsComponent = ({
  item,
  index,
  shippings,
  loading,
  remove,
  control
}: SCProps) => {
  const { t } = useTranslation();

  // eslint-disable-next-line no-unused-vars
  const [deletedIndex, setDeletedIndex] = useState<number | null>(null);

  const {
    setValue,
    watch,
    register,
    formState: { errors }
  } = useFormContext();

  const [
    deleteShippingProvider,
    {
      loading: deleteShippingProviderLoading,
      error: deleteShippingProviderError
    }
  ] = useMutation(DELETE_SHIPPING_PROVIDER);

  useErrorLogger(deleteShippingProviderError);

  const value = watch(`shippings[${index}].shipping_provider`);

  useEffect(() => {
    setValue(`shippings[${index}].shipping_provider`, value);
  }, [value]);

  const removeShippingProvider = () => {
    setDeletedIndex(index);
    console.log('removeShippingProvider', { item, index });
    if (item?.product_shipping_id) {
      deleteShippingProvider({
        variables: { product_shipping_id: item?.product_shipping_id },
        onCompleted: (data: {
          deleteShippingProvider: { product_shipping_id: string };
        }) => {
          const product_shipping_id =
            data?.deleteShippingProvider?.product_shipping_id;
          if (product_shipping_id) {
            notify(t('common:successfully-deleted'), 'success');
            console.log('=====><>', { index });
            remove(index);
          }
        }
      });
    } else {
      remove(index);
    }
  };

  return (
    <div className="border-b border-dashed border-border-200 last:border-0 py-5 md:py-8">
      <div className="flex justify-between flex-col">
        <input
          {...register(`shippings[${index}].product_shipping_id`)}
          type="hidden"
        />
        <div style={{ minWidth: '150px', marginRight: '5px' }}>
          <Label style={{ color: '#929191', fontSize: '0.8rem' }}>
            {t('form:input-label-shipping-provider')}
          </Label>
          <SelectInput
            name={`shippings[${index}].shipping_provider`}
            control={control}
            value={value}
            className="w-full"
            getOptionLabel={(option: any) => option.shipper_name}
            getOptionValue={(option: any) => option.id}
            options={shippings}
            isLoading={loading}
          />
        </div>
        <ValidationError
          message={t(
            isEmpty(errors.shippings)
              ? null
              : errors.shippings[index]?.shipping_provider?.id?.message
          )}
        />
        <div>
          <ShippingsZonesComponent index={index} />
        </div>
        <button
          onClick={removeShippingProvider}
          type="button"
          className="transition-colors duration-200 focus:outline-none sm:mt-4 sm:col-span-1 text-red-500 py-1 rounded flex justify-center items-center text-base border border-solid border-red-500 hover:bg-red-700 hover:text-white mb-3"
        >
          {t('form:button-label-remove')}
          {deleteShippingProviderLoading && deletedIndex === index && (
            <span
              className="absolute h-6 w-6 ms-2 rounded-full border-2 border-transparent border-t-2 animate-spin"
              style={{
                borderTopColor: '#016806'
              }}
            />
          )}
        </button>
      </div>
    </div>
  );
};

export default memo(ShippingsComponent);
