import Modal from '@components/ui/modal/modal';
import {
  ADD_SECTION_MODAL,
  BAN_CUSTOMER,
  CMS_BUILDER_MODAL,
  DELETE_ATTRIBUTE,
  DELETE_COMPONENT,
  DELETE_COUPON,
  DELETE_CUSTOMER,
  DELETE_DELIVERY_TIME,
  DELETE_LANGUAGE,
  DELETE_BRAND,
  DELETE_PRODUCT,
  DELETE_SHIPPING,
  DELETE_SUPPLIER,
  DELETE_TAG,
  DELETE_TAX,
  DELETE_USER,
  FAVICON_VIEWER_MODAL,
  LIBRARY_SECTION_MODAL,
  NEW_PAGE_MODAL
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

const UserDeleteView = dynamic(
  () => import('@components/user/user-delete-view')
);

const SupplierDeleteView = dynamic(
  () => import('@components/suppliers/supplier-delete-view')
);

const TaxDeleteView = dynamic(() => import('@components/tax/tax-delete-view'));

const BrandDeleteView = dynamic(
  () => import('@components/brand/brand-delete-view')
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

const CustomerDeleteView = dynamic(
  () => import('@components/customers/customer-delete-view')
);

const CmsEditorModal = dynamic(
  () => import('@components/store-builder/cms-editor')
);

const AddSectionModal = dynamic(
  () => import('@components/store-builder/cms-editor/add-section')
);

const LibrarySectionModal = dynamic(
  () => import('@components/store-builder/cms-editor/library-section')
);

const ComponentDeleteView = dynamic(
  () =>
    import(
      '@components/store-builder/cms-editor/add-section/component-delete-view'
    )
);

const NewPageModal = dynamic(
  () => import('@components/store-builder/cms-editor/new-page')
);

// const AttributeExportImport = dynamic(
//   () => import('@components/attribute/attribute-import-export')
// );

const ManagedModal = () => {
  const { isOpen, view, meta } = useModalState();
  const { closeModal } = useModalAction();

  return (
    <Modal
      open={isOpen}
      onClose={closeModal}
      closeOnClickOutside={meta?.closeOnClickOutside ?? true}
    >
      {view === DELETE_PRODUCT && <ProductDeleteView />}
      {view === DELETE_ATTRIBUTE && <AttributeDeleteView />}
      {view === DELETE_CUSTOMER && <CustomerDeleteView />}
      {view === DELETE_COUPON && <CouponDeleteView />}
      {view === DELETE_SHIPPING && <ShippingDeleteView />}
      {view === DELETE_TAG && <TagDeleteView />}
      {view === DELETE_LANGUAGE && <LanguageDeleteView />}
      {view === BAN_CUSTOMER && <BanCustomerView />}
      {view === DELETE_USER && <UserDeleteView />}
      {view === DELETE_SUPPLIER && <SupplierDeleteView />}
      {view === DELETE_TAX && <TaxDeleteView />}
      {view === DELETE_BRAND && <BrandDeleteView />}
      {view === DELETE_DELIVERY_TIME && <DeliveryTimeDeleteView />}
      {view === FAVICON_VIEWER_MODAL && <FaviconModalView />}
      {view === CMS_BUILDER_MODAL && <CmsEditorModal />}
      {view === ADD_SECTION_MODAL && <AddSectionModal />}
      {view === LIBRARY_SECTION_MODAL && <LibrarySectionModal />}
      {view === NEW_PAGE_MODAL && <NewPageModal />}
      {view === DELETE_COMPONENT && <ComponentDeleteView />}
    </Modal>
  );
};

export default ManagedModal;
