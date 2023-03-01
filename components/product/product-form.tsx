import Card from '@components/common/card';
import { SaveIcon } from '@components/icons/save-icon';
import Button from '@components/ui/button';
import Description from '@components/ui/description';
import type { Product } from '@ts-types/generated';
import isEmpty from 'lodash/isEmpty';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { memo, useMemo } from 'react';

import { useFormState } from './context/form.context';
import LinkedProducts from './linked-products';
import ProductContent from './product-content';
import ProductGallery from './product-gallery';
import ProductSelectGroup from './product-select-group';
import ProductShippingInfoForm from './product-shipping-info';
import ProductThumbnail from './product-thumbnail';
import ProductTypeComponent from './product-type';
import ProductTypeFormComponent from './product-type/product-type-form';
import ProductSeo from './products-seo';

type IProps = {
  initialValues: Product | any;
  onSubmit: () => void;
  isLoading: boolean;
};

function ProductForm({ isLoading, onSubmit, initialValues = {} }: IProps) {
  const { t } = useTranslation();
  const router = useRouter();

  const {
    name,
    salePrice,
    comparePrice,
    buyingPrice,
    note,
    description,
    status,
    disableOutOfStock,
    quantity,
    sku,
    thumbnail,
    gallery,
    type,
    categories,
    suppliers,
    tags,
    productSeo,
    variationOptions,
    variations,
    productShippingInfo,
    upsellProducts,
    relatedProducts,
    crossSellProducts
  } = useFormState();

  // Stopping unnecessary rerenders
  const productTypeState = useMemo(
    () => ({
      type,
      variationOptions,
      variations,
      salePrice,
      comparePrice,
      buyingPrice,
      quantity,
      sku
    }),
    [
      type,
      variationOptions,
      variations,
      salePrice,
      comparePrice,
      buyingPrice,
      quantity,
      sku
    ]
  );
  const ProductSeoState = useMemo(
    () => ({
      name,
      thumbnail,
      productSeo
    }),
    [name, thumbnail, productSeo]
  );
  const productThumbnailState = useMemo(() => ({ thumbnail }), [thumbnail]);
  const productGalleryState = useMemo(() => ({ gallery }), [gallery]);
  const ProductSelectGroupState = useMemo(
    () => ({ categories, suppliers, tags }),
    [categories, suppliers, tags]
  );
  const productContentState = useMemo(
    () => ({ name, note, description, status, disableOutOfStock }),
    [name, note, description, status, disableOutOfStock]
  );
  const linkedProductsState = useMemo(
    () => ({ upsellProducts, relatedProducts, crossSellProducts }),
    [upsellProducts, relatedProducts, crossSellProducts]
  );
  const productShippingInfoState = useMemo(
    () => ({ productShippingInfo }),
    [productShippingInfo]
  );

  return (
    <form onSubmit={onSubmit} noValidate>
      {/* Thumbnail */}
      <div className="flex flex-wrap pb-8 border-b border-dashed border-border-base my-5 sm:my-8">
        <Description
          title={t('form:featured-image-title')}
          details={t('form:featured-image-help-text')}
          className="w-full px-0 sm:pe-4 md:pe-5 pb-5 sm:w-4/12 md:w-1/3 sm:py-8"
        />
        <Card className="w-full sm:w-8/12 md:w-2/3">
          <ProductThumbnail state={productThumbnailState} />
        </Card>
      </div>
      {/* Gallery */}
      <div className="flex flex-wrap pb-8 border-b border-dashed border-border-base my-5 sm:my-8">
        <Description
          title={t('form:gallery-title')}
          details={t('form:gallery-help-text')}
          className="w-full px-0 sm:pe-4 md:pe-5 pb-5 sm:w-4/12 md:w-1/3 sm:py-8"
        />
        <Card className="w-full sm:w-8/12 md:w-2/3">
          <ProductGallery state={productGalleryState} />
        </Card>
      </div>

      {/* Product Type */}
      <ProductTypeComponent
        state={productTypeState}
        initialValues={initialValues}
      />
      {/* Content */}
      <ProductContent
        state={productContentState}
        initialValues={initialValues}
      />
      {/* Variation Type & Simple Type product form */}
      <ProductTypeFormComponent
        state={productTypeState}
        initialValues={initialValues}
      />
      {/* Tags, Category and Suppliers*/}
      <ProductSelectGroup state={ProductSelectGroupState} />
      {/* SEO */}
      <ProductSeo state={ProductSeoState} initialValues={initialValues} />
      {/* Related Products, Up-Sells, and Cross-Sells  */}
      <LinkedProducts
        state={linkedProductsState}
        initialValues={initialValues}
      />
      {/* Shipping Info */}
      <div className="mb-12">
        <ProductShippingInfoForm
          state={productShippingInfoState}
          initialValues={initialValues}
        />
      </div>

      <div className="mb-4 text-end">
        {!isEmpty(initialValues) && (
          <Button
            variant="outline"
            onClick={router.back}
            className="me-4"
            type="button"
          >
            {t('form:button-label-back')}
          </Button>
        )}
        {isEmpty(initialValues) && (
          <Button loading={isLoading} disabled={isLoading}>
            <div className="mr-1">
              <SaveIcon width="1.3rem" height="1.3rem" />
            </div>
            <div>{t('form:button-label-save')}</div>
          </Button>
        )}
      </div>
    </form>
  );
}

export default memo(ProductForm);
