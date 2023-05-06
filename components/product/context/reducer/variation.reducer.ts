import { AttributeValue, Product } from '@ts-types/generated';
import { isArray } from 'lodash';
import differenceWith from 'lodash/differenceWith';
import isEmpty from 'lodash/isEmpty';
import isEqual from 'lodash/isEqual';

import { Actions, ActionType, CartesianType } from '../form.types';

export const VariationReducer = {
  [Actions.APPEND_VARIATION]: (state: Product, { payload }: ActionType) => {
    return {
      ...state,
      variations: [...state.variations, payload.value]
    };
  },
  [Actions.REMOVE_VARIATION]: (state: Product, { payload }: ActionType) => {
    return {
      ...state,
      variations: state.variations?.filter(
        (variant) => variant.id !== payload.id
      )
    };
  },
  [Actions.CHANGE_VARIATION]: (state: Product, { payload }: ActionType) => {
    return {
      ...state,
      variations: state.variations?.map((variation) => {
        if (variation.id === payload.id) {
          variation.attribute = payload.value;
          variation.selectedValues = [];
        }
        return variation;
      })
    };
  },
  [Actions.CHANGE_VARIATION_VALUES]: (
    state: Product,
    { payload }: ActionType
  ) => {
    return {
      ...state,
      variations: state.variations?.map((variation) => {
        if (variation.id === payload.id) {
          variation.selectedValues = payload.values as AttributeValue[];
        }
        return variation;
      })
    };
  },
  [Actions.CHANGE_VARIATION_OPTION]: (
    state: Product,
    { payload }: ActionType
  ) => {
    return {
      ...state,
      variationOptions: state.variationOptions?.map((option) => {
        if (
          isEqual(
            payload?.options?.sort((a, b) => a - b),
            option?.options?.sort((a, b) => a - b)
          )
        ) {
          // ASC
          return {
            ...option,
            [payload.field]: payload.value
          };
        }
        return option;
      })
    };
  },
  [Actions.VARIATION_CARTESIAN]: (state: Product, { payload }: ActionType) => {
    const payloadOptions = payload.values?.map((v) => {
      return Array.isArray(v) ? v?.map((av) => av.id) : [v.id];
    });

    const stateOptions = state.variationOptions?.map((av) => av.options);

    const added = differenceWith(payloadOptions, stateOptions, isEqual);
    const deleted = differenceWith(stateOptions, payloadOptions, isEqual);

    const cleanedState = !isEmpty(deleted)
      ? state.variationOptions
          ?.map((v) => {
            const combination = payload.values?.find((cart) => {
              const options = Array.isArray(cart)
                ? cart?.map((av) => av.id)
                : [cart.id];
              return isEqual(
                options?.sort((a, b) => a - b),
                v.options?.sort((a, b) => a - b)
              ); // ASC
            });

            if (isEmpty(combination)) {
              return undefined;
            }
            return v;
          })
          ?.filter(function (element) {
            return element !== undefined;
          })
      : state.variationOptions;

    if (!isEmpty(added)) {
      return {
        ...state,
        variationOptions: [
          ...cleanedState,
          ...(payload.values ?? [])
            .map((v: CartesianType[]) => {
              const options = isArray(v)
                ? v?.map((av) => av.id)
                : [(v as CartesianType).id];

              const combination = state.variationOptions?.find(
                (s) =>
                  isEqual(
                    s.options?.sort((a, b) => a - b),
                    options?.sort((a, b) => a - b)
                  ) // ASC
              );

              if (isEmpty(combination)) {
                const title = Array.isArray(v)
                  ? v.map((av) => av?.value).join('/')
                  : (v as CartesianType)?.value;
                return {
                  options,
                  title,
                  buyingPrice: 0,
                  comparePrice: 0,
                  id: null,
                  thumbnail: [],
                  isDisable: false,
                  quantity: 1,
                  salePrice: 0,
                  sku: ''
                };
              }
              return undefined;
            })
            .filter(function (element) {
              return element !== undefined;
            })
        ]
      };
    }
    return {
      ...state,
      variationOptions: !isEmpty(deleted)
        ? [...cleanedState]
        : state.variationOptions
    };
  },
  [Actions.VARIATION_INIT]: (state: Product, { payload }: ActionType) => {
    return {
      variations: payload.value.variations,
      variationOptions: payload.value.variationOptions
    };
  }
};
