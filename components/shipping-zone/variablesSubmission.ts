import { ShippingZoneType } from '@ts-types/generated';
import differenceWith from 'lodash/differenceWith';
import isEqual from 'lodash/isEqual';

export const updateVariable = (
  values: ShippingZoneType,
  initialValues: ShippingZoneType
) => {
  const newShippingRates = values?.shippingRates?.map((rate) => {
    return {
      id: rate?.id,
      min_value: Number(rate?.min_value),
      max_value: rate?.no_max ? null : Number(rate?.max_value),
      no_max: rate?.no_max,
      price: Number(rate?.price)
    };
  });

  const newZones = values?.zones;

  const shippingRatesAdditions = differenceWith(
    newShippingRates,
    initialValues?.shippingRates,
    isEqual
  );

  const shippingRatesDeletion = differenceWith(
    initialValues?.shippingRates?.map((rate) => rate.id),
    values?.shippingRates?.map((rate) => rate.id),
    isEqual
  );

  const zonesAdditions = differenceWith(
    newZones,
    initialValues?.zones,
    isEqual
  );

  const zonesDeletion = differenceWith(
    initialValues?.zones?.map((rate) => rate.id),
    values?.zones?.map((rate) => rate.id),
    isEqual
  );

  const { shippingZone } = values;

  const newShippingZone = {
    ...shippingZone,
    rate_type: shippingZone?.rate_type?.type
  };
  const initShippingZone = {
    name: initialValues.shippingZone?.name,
    display_name: initialValues.shippingZone?.display_name,
    active: initialValues.shippingZone?.active,
    free_shipping: initialValues.shippingZone?.free_shipping,
    rate_type: initialValues.shippingZone?.rate_type
  };
  const shippingZoneEqual = isEqual(initShippingZone, newShippingZone);

  const shippingZoneMain = shippingZoneEqual ? {} : newShippingZone;

  return {
    shippingZone: shippingZoneMain,
    additions: {
      zones: zonesAdditions?.map((e) => ({ id: e.id })),
      shipping_rates: shippingRatesAdditions
    },
    deletions: {
      zones: zonesDeletion?.map((e) => ({ id: e })),
      shipping_rates: shippingRatesDeletion?.map((e) => ({ id: e }))
    }
  };
};
