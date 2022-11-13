import { RateType } from '@ts-types/enums';
import { ShippingZoneType } from '@ts-types/generated';
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
        shippingZone?.rateType?.type === RateType.WEIGHT
          ? rate?.weightUnit
          : null,
      minValue: Number(rate?.minValue),
      maxValue: rate?.noMax ? null : Number(rate?.maxValue),
      noMax: rate?.noMax,
      price: Number(rate?.price)
    };
  });

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
    values?.zones,
    initialValues?.zones,
    isEqual
  );

  const zonesDeletion = differenceWith(
    initialValues?.zones?.map((zone) => zone.iso2),
    values?.zones?.map((zone) => zone.iso2),
    isEqual
  );

  const zonesDeletionMapToZoneId = initialValues?.zones
    ?.map((zone) => {
      if (zonesDeletion.includes(zone.iso2)) {
        return zone;
      }
    })
    ?.filter((e) => e !== undefined);

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
      zones: zonesAdditions?.map(({ id, name, iso2 }) => ({ id, name, iso2 })),
      shippingRates: shippingRatesAdditions
    },
    deletions: {
      zones: zonesDeletionMapToZoneId?.map(({ zoneId }) => ({ zoneId })),
      shippingRates: shippingRatesDeletion?.map((e) => ({ id: e }))
    }
  };
};
