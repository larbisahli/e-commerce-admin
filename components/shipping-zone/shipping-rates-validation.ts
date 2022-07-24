import { notify } from '@lib/notify';
import { ShippingRateType } from '@ts-types/generated';

export default function shippingRatesValidation(
  shippingRates: ShippingRateType[],
  noMaxValidation = true
) {
  let checkFailed = false;
  let prevFailed = {} as ShippingRateType;

  // ==== CHECKS ====
  shippingRates?.every((field, index) => {
    if (!field?.maxValue && !field?.noMax && noMaxValidation) {
      notify(`Please set Max value (Rate #${index + 1})`, 'error');
      checkFailed = true;
      return false; // break
    } else if (
      (Number(field?.minValue) > Number(field?.maxValue) || field?.noMax) &&
      noMaxValidation
    ) {
      notify(
        `Max value should be greater than Min value (Rate #${index + 1})`,
        'error'
      );
      checkFailed = true;
      return false; // break
    } else if (Number(prevFailed?.price) > Number(field?.price)) {
      notify(
        `The price in (Rate #${
          field.index + 1
        }) should be greater than the one in (Rate #${prevFailed.index + 1})`,
        'error'
      );
      checkFailed = true;
      return false; // break
    }

    const diffMinMax = Number(
      (Number(field?.minValue) - Number(prevFailed?.maxValue)).toFixed(1)
    );
    if (!isNaN(diffMinMax) && 0 > diffMinMax) {
      notify(
        `Min value in (Rage #${
          field.index + 1
        }) should be greater than Max value in (Rage #${prevFailed.index + 1})`,
        'error'
      );
      checkFailed = true;
      return false; // break
    } else if (diffMinMax !== 0 && diffMinMax !== 0.1 && !isNaN(diffMinMax)) {
      notify(
        `There is a gap between Max value in (Rage #${
          prevFailed.index + 1
        }) and Min value in (Rage #${field.index + 1})`,
        'error'
      );
      checkFailed = true;
      return false; // break
    }

    prevFailed = field;
    return true; // continue
  });

  return checkFailed;
}
