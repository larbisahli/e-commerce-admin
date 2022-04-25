import type { VariationOptionsType } from '@ts-types/generated';
import { VariationOptionActions } from '@ts-types/generated';
import differenceWith from 'lodash/differenceWith';
import isEmpty from 'lodash/isEmpty';
import isEqual from 'lodash/isEqual';

// An interface for our actions
interface VariationOptionAction {
  type: VariationOptionActions;
  payload: {
    value?: any;
    values?: any[];
    field?: string;
    options?: string[];
    extra: any;
  };
}

export function VariationOptionsReducer(
  state: VariationOptionsType[],
  action: VariationOptionAction
) {
  const { type, payload } = action;
  switch (type) {
    case VariationOptionActions.INSERT:
      return [
        ...state?.map((option) => {
          if (isEqual(payload?.options, option?.options)) {
            return {
              ...option,
              [payload.field]: payload.value
            };
          }
          return option;
        })
      ];
    case VariationOptionActions.INIT:
      return payload.value;
    case VariationOptionActions.CARTESIAN: {
      const payloadOptions = payload.values?.map((v) => {
        return Array.isArray(v) ? v?.map((av) => av.id) : [v.id];
      });

      const stateOptions = state?.map((av) => av.options);

      const added = differenceWith(payloadOptions, stateOptions, isEqual);
      const deleted = differenceWith(stateOptions, payloadOptions, isEqual);

      const cleanedState = !isEmpty(deleted)
        ? state
            ?.map((v) => {
              const combination = payload.values?.find((cart) => {
                const options = Array.isArray(cart)
                  ? cart?.map((av) => av.id)
                  : [cart.id];
                return isEqual(options, v.options);
              });

              if (isEmpty(combination)) {
                return undefined;
              }
              return v;
            })
            ?.filter(function (element) {
              return element !== undefined;
            })
        : state;

      if (!isEmpty(added)) {
        return [
          ...cleanedState,
          ...payload.values
            ?.map((v) => {
              const options = Array.isArray(v) ? v?.map((av) => av.id) : [v.id];

              const combination = state?.find((s) =>
                isEqual(s.options, options)
              );

              if (isEmpty(combination)) {
                const title = Array.isArray(v)
                  ? v.map((av) => av?.attribute_value).join('/')
                  : v?.attribute_value;
                return {
                  options,
                  title,
                  buying_price: payload.extra.buying_price,
                  compare_price: payload.extra.compare_price,
                  id: null,
                  image: null,
                  is_disable: false,
                  quantity: 1,
                  sale_price: payload.extra.sale_price,
                  sku: ''
                };
              }
              return undefined;
            })
            ?.filter(function (element) {
              return element !== undefined;
            })
        ];
      }
      if (!isEmpty(deleted)) {
        return [...cleanedState];
      }
      return state;
    }
    default:
      return state;
  }
}
