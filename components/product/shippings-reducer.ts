import type { ProductShippings } from '@ts-types/generated';
import { ShippingsActions } from '@ts-types/generated';

// An interface for our actions
interface ShippingsAction {
  type: ShippingsActions;
  payload: {
    value?: any;
    field?: string;
    key?: string;
  };
}

export function ShippingsReducer(
  state: ProductShippings[],
  action: ShippingsAction
) {
  const { type, payload } = action;
  switch (type) {
    case ShippingsActions.ADD_SHIPPING:
      return [...state, payload.value];
    case ShippingsActions.DELETE_SHIPPING:
      return [
        ...state?.filter(
          (shipping) =>
            payload?.value?.product_shipping_id !==
            shipping?.product_shipping_id
        )
      ];
    case ShippingsActions.ADD_SHIPPING_PROVIDER:
      return [
        ...state?.map((shipping) => {
          if (
            payload?.value?.product_shipping_id ===
            shipping?.product_shipping_id
          ) {
            shipping.shipping_provider = payload?.value?.shipping_provider;
            return shipping;
          }
          return shipping;
        })
      ];
    case ShippingsActions.ADD_ZONE:
      return [
        ...state?.map((shipping) => {
          if (
            payload?.value?.product_shipping_id ===
            shipping?.product_shipping_id
          ) {
            shipping.shipping_zones = shipping.shipping_zones?.map(
              (shippingZone) => {
                if (shippingZone?.id === payload.value?.shipping_zone?.id) {
                  shippingZone.zones = payload.value?.shipping_zone?.zones;
                  return shippingZone;
                }
                return shippingZone;
              }
            );
            return shipping;
          }
          return shipping;
        })
      ];
    case ShippingsActions.SHIPPING_PRICE:
      return [
        ...state?.map((shipping) => {
          if (
            payload?.value?.product_shipping_id ===
            shipping?.product_shipping_id
          ) {
            shipping.shipping_zones = shipping.shipping_zones?.map(
              (shippingZone) => {
                if (shippingZone?.id === payload.value?.shipping_zone?.id) {
                  shippingZone.shipping_price =
                    payload.value?.shipping_zone?.shipping_price;
                  return shippingZone;
                }
                return shippingZone;
              }
            );
            return shipping;
          }
          return shipping;
        })
      ];
    case ShippingsActions.ADD_SHIPPING_ZONE:
      return [
        ...state?.map((shipping) => {
          if (
            payload?.value?.product_shipping_id ===
            shipping?.product_shipping_id
          ) {
            shipping.shipping_zones.push(payload?.value?.shipping_zone);
            return shipping;
          }
          return shipping;
        })
      ];
    case ShippingsActions.DELETE_SHIPPING_ZONE:
      return [
        ...state?.map((shipping) => {
          if (
            payload?.value?.product_shipping_id ===
            shipping?.product_shipping_id
          ) {
            shipping.shipping_zones = shipping.shipping_zones?.filter(
              (shippingZone) =>
                shippingZone?.id !== payload.value?.shipping_zone?.id
            );
            return shipping;
          }
          return shipping;
        })
      ];
    case ShippingsActions.CLEAR_GLOBAL:
      return [
        ...state?.map((shipping) => {
          if (
            payload?.value?.product_shipping_id ===
            shipping?.product_shipping_id
          ) {
            shipping.shipping_zones = shipping.shipping_zones?.filter(
              (shippingZone) => {
                if (shippingZone?.id === payload.value?.shipping_zone?.id) {
                  shippingZone.zones = shippingZone?.zones?.filter(
                    (z) => z.code !== 'Global'
                  );
                  return shippingZone;
                }
                return shippingZone;
              }
            );
            return shipping;
          }
          return shipping;
        })
      ];
    case ShippingsActions.INIT:
      return payload.value;
    default:
      return state;
  }
}
