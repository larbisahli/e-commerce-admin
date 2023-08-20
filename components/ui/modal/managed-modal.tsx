import Modal from '@components/ui/modal/modal';
import {
  BAN_CUSTOMER,
  DELETE_ATTRIBUTE,
  DELETE_COUPON,
  DELETE_DELIVERY_TIME,
  DELETE_LANGUAGE,
  DELETE_MANUFACTURER,
  DELETE_ORDER_STATUS,
  DELETE_PRODUCT,
  DELETE_SHIPPING,
  DELETE_SLIDER,
  DELETE_SUPPLIER,
  DELETE_TAG,
  DELETE_USER,
  FAVICON_VIEWER_MODAL
} from '@ts-types/constants';
import dynamic from 'next/dynamic';

import { useModalAction, useModalState } from './modal.context';

const TagDeleteView = dynamic(() => import('@components/tag/tag-delete-view'));

const BanCustomerView = dynamic(() => import('@components/user/user-ban-view'));

const ShippingDeleteView = dynamic(
  () => import('@components/shipping-zone/shipping-delete-view')
);

const CouponDeleteView = dynamic(
  () => import('@components/coupon/coupon-delete-view')
);

const ProductDeleteView = dynamic(
  () => import('@components/product/product-delete-view')
);

const AttributeDeleteView = dynamic(
  () => import('@components/attribute/attribute-delete-view')
);

const OrderStatusDeleteView = dynamic(
  () => import('@components/order-status/order-status-delete-view')
);

const UserDeleteView = dynamic(
  () => import('@components/user/user-delete-view')
);

const SupplierDeleteView = dynamic(
  () => import('@components/suppliers/supplier-delete-view')
);

const SliderDeleteView = dynamic(
  () => import('@components/hero-carousel/slider-delete-view')
);

const ManufacturerDeleteView = dynamic(
  () => import('@components/manufacturer/manufacturer-delete-view')
);

const DeliveryTimeDeleteView = dynamic(
  () => import('@components/delivery-time/delivery-delete-view')
);

const FaviconModalView = dynamic(
  () => import('@components/settings/favicon-modal-view')
);

const LanguageDeleteView = dynamic(
  () => import('@components/language/language-delete-view')
);

// const AttributeExportImport = dynamic(
//   () => import('@components/attribute/attribute-import-export')
// );

const ManagedModal = () => {
  const { isOpen, view } = useModalState();
  const { closeModal } = useModalAction();

  return (
    <Modal open={isOpen} onClose={closeModal}>
      {view === DELETE_PRODUCT && <ProductDeleteView />}
      {view === DELETE_ATTRIBUTE && <AttributeDeleteView />}
      {view === DELETE_COUPON && <CouponDeleteView />}
      {view === DELETE_SHIPPING && <ShippingDeleteView />}
      {view === DELETE_TAG && <TagDeleteView />}
      {view === DELETE_LANGUAGE && <LanguageDeleteView />}
      {view === BAN_CUSTOMER && <BanCustomerView />}
      {view === DELETE_ORDER_STATUS && <OrderStatusDeleteView />}
      {view === DELETE_USER && <UserDeleteView />}
      {view === DELETE_SUPPLIER && <SupplierDeleteView />}
      {view === DELETE_SLIDER && <SliderDeleteView />}
      {view === DELETE_MANUFACTURER && <ManufacturerDeleteView />}
      {view === DELETE_DELIVERY_TIME && <DeliveryTimeDeleteView />}
      {view === FAVICON_VIEWER_MODAL && <FaviconModalView />}
    </Modal>
  );
};

export default ManagedModal;
