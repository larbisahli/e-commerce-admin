import { ShippingZoneType } from '@ts-types/generated';
import differenceWith from 'lodash/differenceWith';
import isEqual from 'lodash/isEqual';

export const updateVariable = (
  values: ShippingZoneType,
  initialValues: ShippingZoneType
) => {
  // 8) shippings block
  const newShippingValue = values?.shippingRates?.map((rate) => {
    return {
      id: rate?.id,
      min_value: Number(rate?.min_value),
      max_value: rate?.no_max ? null : Number(rate?.max_value),
      no_max: rate?.no_max,
      price: Number(rate?.price)
    };
  });

  const shippingsAdditions = differenceWith(
    newShippingValue,
    initialValues?.shippingRates,
    isEqual
  );

  const shippingsDeletion = differenceWith(
    initialValues?.shippingRates?.map((rate) => rate.id),
    values?.shippingRates?.map((rate) => rate.id),
    isEqual
  );

  const { shippingZone } = values;

  return {
    name: shippingZone?.name,
    display_name: shippingZone?.display_name,
    active: shippingZone?.active,
    free_shipping: shippingZone?.free_shipping,
    rate_type: shippingZone?.rate_type?.type,
    additions: {
      shipping_rates: shippingsAdditions
    },
    deletions: {
      shipping_rates: shippingsDeletion
    }
  };
};
