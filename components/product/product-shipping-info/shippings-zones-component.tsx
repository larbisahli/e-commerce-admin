import { useMutation } from '@apollo/client';
import Input from '@components/ui/input';
import Label from '@components/ui/label';
import Select from '@components/ui/select/select';
import { useSettings } from '@contexts/settings.context';
import { DELETE_SHIPPING_ZONE } from '@graphql/product';
import { useErrorLogger } from '@hooks/useErrorLogger';
import { notify } from '@lib/notify';
import type { Nullable, Scalars } from '@ts-types/custom.types';
import { ShippingsActions } from '@ts-types/generated';
import isEmpty from 'lodash/isEmpty';
import { useTranslation } from 'next-i18next';
import React, { useEffect, useState } from 'react';

interface ShippingsAction {
  type: ShippingsActions;
  payload: {
    value?: any;
    field?: string;
    key?: string;
  };
}
interface SZProps {
  product_shipping_id: string;
  shippingZonesCount: number;
  shipping_zone: {
    id: Nullable<Scalars['ID']>;
    zones: { name: string; code: string }[];
    shipping_price: Scalars['Float'];
  };
  dispatchShippings: React.Dispatch<ShippingsAction>;
}

const ShippingsZonesComponent = ({
  shippingZonesCount,
  product_shipping_id,
  shipping_zone,
  dispatchShippings
}: SZProps) => {
  const { t } = useTranslation();

  const [countries, setCountries] = useState([]);
  const [loadingCountries, setLoadingCountries] = useState(false);
  const { currency } = useSettings();

  const zones = shipping_zone?.zones;
  const shipping_price = shipping_zone?.shipping_price;

  const [
    deleteShippingZone,
    { loading: deleteShippingZoneLoading, error: deleteShippingError }
  ] = useMutation(DELETE_SHIPPING_ZONE);

  useErrorLogger(deleteShippingError);

  // Add global when zone is empty
  useEffect(() => {
    if (isEmpty(zones)) {
      addShippingZone({ name: 'Global', code: 'Global' });
    }
  }, [zones]);

  // remove global when we have at least one country
  useEffect(() => {
    if (
      zones?.length === 2 &&
      !isEmpty(zones?.find((a) => a.code === 'Global'))
    ) {
      dispatchShippings({
        type: ShippingsActions.CLEAR_GLOBAL,
        payload: {
          value: {
            product_shipping_id,
            shipping_zone: {
              id: shipping_zone?.id
            }
          }
        }
      });
    }
  }, [zones]);

  // Get Countries
  useEffect(() => {
    async function getCountries() {
      setLoadingCountries(true);
      const { Countries } = await import('@utils/countries');
      setCountries(Countries);
      setLoadingCountries(false);
    }
    getCountries();
  }, []);

  const addShippingZone = (shippingZone) => {
    dispatchShippings({
      type: ShippingsActions.ADD_ZONE,
      payload: {
        value: {
          product_shipping_id,
          shipping_zone: {
            id: shipping_zone?.id,
            zones: shippingZone
          }
        }
      }
    });
  };

  const handleShippingPrice = (e) => {
    dispatchShippings({
      type: ShippingsActions.SHIPPING_PRICE,
      payload: {
        value: {
          product_shipping_id,
          shipping_zone: {
            id: shipping_zone?.id,
            shipping_price: Number(e.target.value)
          }
        }
      }
    });
  };

  const removeShippingZone = () => {
    // nanoid(10) generates 10 characters
    if (shipping_zone?.id?.length > 10) {
      deleteShippingZone({
        variables: { id: shipping_zone?.id },
        onCompleted: (data: { deleteShippingZone: { id: string } }) => {
          const id = data?.deleteShippingZone?.id;
          if (id) {
            notify(t('common:successfully-deleted'), 'success');
            dispatchShippings({
              type: ShippingsActions.DELETE_SHIPPING_ZONE,
              payload: {
                value: {
                  product_shipping_id,
                  shipping_zone: {
                    id: shipping_zone?.id
                  }
                }
              }
            });
          }
        }
      });
    } else {
      dispatchShippings({
        type: ShippingsActions.DELETE_SHIPPING_ZONE,
        payload: {
          value: {
            product_shipping_id,
            shipping_zone: {
              id: shipping_zone?.id
            }
          }
        }
      });
    }
  };

  return (
    <div className="py-3">
      <div className="flex justify-between">
        <div className="flex justify-between w-full rounded border-border-200 border border-dashed">
          <div className="flex w-full flex-col p-2">
            <div className="w-full mb-5 mr-3">
              <Label style={{ color: '#929191', fontSize: '0.8rem' }}>
                {t('form:input-label-shipping-zones')}
              </Label>

              <Select
                onChange={addShippingZone}
                value={zones}
                defaultValue={zones}
                className="w-full"
                isMulti
                getOptionLabel={(option: any) => option.name}
                getOptionValue={(option: any) => option.code}
                options={countries}
                isLoading={loadingCountries}
              />
            </div>
            <div>
              <Label style={{ color: '#929191', fontSize: '0.8rem' }}>
                {`${t('form:input-label-shipping-price')} (${currency})`}
                {shipping_price <= 0 && (
                  <span className="border border-solid border-gray-200 rounded-full shadow mx-3 py px-4 bg-gray-100 font-bold">
                    Free Shipping
                  </span>
                )}
              </Label>
              <Input
                name="shipping_price"
                type="number"
                value={shipping_price}
                onChange={handleShippingPrice}
                min={0}
                variant="outline"
                className="w-36"
              />
            </div>
          </div>

          {shippingZonesCount > 1 && (
            <button
              onClick={removeShippingZone}
              style={{
                borderTopLeftRadius: '0',
                borderBottomLeftRadius: '0'
              }}
              type="button"
              className="transition-colors duration-200 focus:outline-none sm:col-span-1 text-red-500 p-1 rounded flex justify-center items-center text-base border border-solid border-red-500 hover:bg-red-700 hover:text-white"
            >
              {t('form:button-label-remove')}
              {deleteShippingZoneLoading && (
                <span
                  className="absolute h-6 w-6 ms-2 rounded-full border-2 border-transparent border-t-2 animate-spin"
                  style={{
                    borderTopColor: '#016806'
                  }}
                />
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShippingsZonesComponent;
