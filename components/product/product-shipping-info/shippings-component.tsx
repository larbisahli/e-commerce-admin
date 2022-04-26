import { useMutation } from '@apollo/client';
import Button from '@components/ui/button';
// import ValidationError from '@components/ui/form-validation-error';
import Label from '@components/ui/label';
import Select from '@components/ui/select/select';
import { DELETE_SHIPPING } from '@graphql/product';
import { useErrorLogger } from '@hooks/useErrorLogger';
import { notify } from '@lib/notify';
import {
  ProductShippings,
  Shipping,
  ShippingsActions
} from '@ts-types/generated';
import { nanoid } from 'nanoid';
import { useTranslation } from 'next-i18next';
import React, { useState } from 'react';

import ShippingsZonesComponent from './shippings-zones-component';

interface ShippingsAction {
  type: ShippingsActions;
  payload: {
    value?: any;
    field?: string;
    key?: string;
  };
}
interface SCProps {
  item: ProductShippings;
  shippingProviders: Shipping[];
  loading: boolean;
  dispatchShippings: React.Dispatch<ShippingsAction>;
}

const ShippingsComponent = ({
  item,
  shippingProviders,
  loading,
  dispatchShippings
}: SCProps) => {
  const { t } = useTranslation();

  // eslint-disable-next-line no-unused-vars
  const [deletedIndex, setDeletedIndex] = useState<number | null>(null);

  const [
    deleteShipping,
    { loading: deleteShippingLoading, error: deleteShippingError }
  ] = useMutation(DELETE_SHIPPING);

  useErrorLogger(deleteShippingError);

  const removeShipping = () => {
    // nanoid(10) generates 10 characters
    if (item?.product_shipping_id?.length > 10) {
      deleteShipping({
        variables: { product_shipping_id: item?.product_shipping_id },
        onCompleted: (data: {
          deleteShipping: { product_shipping_id: string };
        }) => {
          const product_shipping_id = data?.deleteShipping?.product_shipping_id;
          if (product_shipping_id) {
            notify(t('common:successfully-deleted'), 'success');
            dispatchShippings({
              type: ShippingsActions.DELETE_SHIPPING,
              payload: {
                value: {
                  product_shipping_id: item?.product_shipping_id
                }
              }
            });
          }
        }
      });
    } else {
      dispatchShippings({
        type: ShippingsActions.DELETE_SHIPPING,
        payload: {
          value: {
            product_shipping_id: item?.product_shipping_id
          }
        }
      });
    }
  };

  const addShippingProvider = (shippingProvider) => {
    dispatchShippings({
      type: ShippingsActions.ADD_SHIPPING_PROVIDER,
      payload: {
        value: {
          product_shipping_id: item?.product_shipping_id,
          shipping_provider: shippingProvider
        }
      }
    });
  };

  const addShippingZone = () => {
    dispatchShippings({
      type: ShippingsActions.ADD_SHIPPING_ZONE,
      payload: {
        value: {
          product_shipping_id: item?.product_shipping_id,
          shipping_zone: {
            id: nanoid(10),
            zones: [{ name: 'Global', code: 'Global' }],
            shipping_price: 0
          }
        }
      }
    });
  };

  return (
    <div className="border-b border-dashed border-border-200 last:border-0 py-5 md:py-8">
      <div className="flex justify-between flex-col">
        <div style={{ minWidth: '150px', marginRight: '5px' }}>
          <Label style={{ color: '#929191', fontSize: '0.8rem' }}>
            {t('form:input-label-shipping-provider')}
          </Label>
          <Select
            value={item?.shipping_provider}
            onChange={addShippingProvider}
            className="w-full"
            getOptionLabel={(option: any) => option.shipper_name}
            getOptionValue={(option: any) => option.id}
            options={shippingProviders}
            isLoading={loading}
          />
        </div>
        {/* <ValidationError
          message={t(
            isEmpty(errors.shippings)
              ? null
              : errors.shippings[index]?.shipping_provider?.id?.message
          )}
        /> */}
        <div className="border border-border-200 border-solid p-2 mt-4 mb-4">
          {item?.shipping_zones?.map((shipping_zone) => {
            return (
              <ShippingsZonesComponent
                key={shipping_zone?.id}
                product_shipping_id={item?.product_shipping_id}
                shipping_zone={shipping_zone}
                shippingZonesCount={item?.shipping_zones?.length}
                dispatchShippings={dispatchShippings}
              />
            );
          })}
          <Button
            type="button"
            onClick={addShippingZone}
            className="w-full sm:w-auto"
          >
            {t('form:button-label-add-shipping-zone')}
          </Button>
        </div>
        <button
          onClick={removeShipping}
          type="button"
          className="transition-colors duration-200 focus:outline-none sm:mt-4 self-end sm:col-span-1 text-red-500 py-1 rounded flex justify-center items-center text-base border border-solid border-red-500 hover:bg-red-700 hover:text-white mb-3 w-24"
        >
          {t('form:button-label-remove')}
          {deleteShippingLoading && (
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

export default ShippingsComponent;
