import { ShippingRateEnum, ShippingZoneType } from '@ts-types/generated';
import differenceWith from 'lodash/differenceWith';
import isEqual from 'lodash/isEqual';

export const updateVariable = (
  values: ShippingZoneType,
  initialValues: ShippingZoneType
) => {
  const { shippingZone } = values;

  const newShippingRates = values?.shippingRates?.map((rate) => {
    return {
      id: rate?.id,
      weightUnit:
        shippingZone?.rateType?.type === ShippingRateEnum.Weight
          ? rate?.weightUnit
          : null,
      minValue: Number(rate?.minValue),
      maxValue: rate?.noMax ? null : Number(rate?.maxValue),
      noMax: rate?.noMax,
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

  const newShippingZone = {
    ...shippingZone,
    rateType: shippingZone?.rateType?.type
  };
  const initShippingZone = {
    name: initialValues.shippingZone?.name,
    displayName: initialValues.shippingZone?.displayName,
    active: initialValues.shippingZone?.active,
    freeShipping: initialValues.shippingZone?.freeShipping,
    rateType: initialValues.shippingZone?.rateType
  };
  const shippingZoneEqual = isEqual(initShippingZone, newShippingZone);

  const shippingZoneMain = shippingZoneEqual ? {} : newShippingZone;

  return {
    shippingZone: shippingZoneMain,
    additions: {
      zones: zonesAdditions?.map((e) => ({ id: e.id })),
      shippingRates: shippingRatesAdditions
    },
    deletions: {
      zones: zonesDeletion?.map((e) => ({ id: e })),
      shippingRates: shippingRatesDeletion?.map((e) => ({ id: e }))
    }
  };
};
