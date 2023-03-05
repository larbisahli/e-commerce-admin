import { useMutation } from '@apollo/client';
import Card from '@components/common/card';
import { SaveIcon } from '@components/icons/save-icon';
import Button from '@components/ui/button';
import Description from '@components/ui/description';
import { CREATE_PRODUCT, UPDATE_PRODUCT } from '@graphql/product';
import { useErrorLogger, useGetStaff } from '@hooks/index';
import { notify } from '@lib/index';
import { Product, ProductStatus } from '@ts-types/generated';
import { ProductType } from '@ts-types/generated';
import { ROUTES } from '@utils/routes';
import isEmpty from 'lodash/isEmpty';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { memo, useEffect, useMemo, useState } from 'react';

import { Actions, useFormReducer, useFormState } from './context/form.context';
import LinkedProducts from './linked-products';
import ProductContent from './product-content';
import ProductGallery from './product-gallery';
import ProductSelectGroup from './product-select-group';
import ProductShippingInfoForm from './product-shipping-info';
import ProductThumbnail from './product-thumbnail';
import ProductTypeComponent from './product-type';
import ProductTypeFormComponent from './product-type/product-type-form';
import ProductSeo from './products-seo';
import { creationVariable } from './variablesSubmission';

type IProps = {
  initialValues: Product | any;
};

function ProductForm({ setUnsavedChanges, initialValues = {} }: IProps) {
  const { t } = useTranslation();
  const router = useRouter();

  const state = useFormState();
  const dispatch = useFormReducer();

  console.log({ state });

  const {
    id,
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
    crossSellProducts,
    isUpdateMode
  } = state;

  console.log('>>>', { initialValues, state });

  useEffect(() => {
    dispatch({
      type: Actions.INITIAL_VALUES,
      payload: { init: initialValues }
    });
  }, []);

  // Stopping unnecessary rerenders
  const productTypeState = useMemo(
    () => ({
      isUpdateMode,
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
      sku,
      isUpdateMode
    ]
  );
  const ProductSeoState = useMemo(
    () => ({
      isUpdateMode,
      name,
      thumbnail,
      productSeo
    }),
    [name, thumbnail, productSeo, isUpdateMode]
  );
  const productThumbnailState = useMemo(
    () => ({ thumbnail, isUpdateMode }),
    [thumbnail, isUpdateMode]
  );
  const productGalleryState = useMemo(
    () => ({ gallery, isUpdateMode }),
    [gallery, isUpdateMode]
  );
  const ProductSelectGroupState = useMemo(
    () => ({ categories, suppliers, tags, isUpdateMode }),
    [categories, suppliers, tags, isUpdateMode]
  );
  const productContentState = useMemo(
    () => ({
      isUpdateMode,
      name,
      note,
      description,
      status,
      disableOutOfStock,
      id
    }),
    [id, name, note, description, status, disableOutOfStock, isUpdateMode]
  );
  const linkedProductsState = useMemo(
    () => ({
      isUpdateMode,
      upsellProducts,
      relatedProducts,
      crossSellProducts
    }),
    [upsellProducts, relatedProducts, crossSellProducts, isUpdateMode]
  );
  const productShippingInfoState = useMemo(
    () => ({ isUpdateMode, productShippingInfo }),
    [productShippingInfo, isUpdateMode]
  );

  const [lockedSubmission, setLockedSubmission] = useState(false);
  const [error, setError] = useState(null);

  const { staffInfo } = useGetStaff();
  const csrfToken = staffInfo?.csrfToken;

  const [createProduct, { loading: creating }] = useMutation(CREATE_PRODUCT, {
    context: {
      headers: {
        'x-csrf-token': csrfToken
      }
    },
    onCompleted: (data: { createAttribute: Product }) => {
      if (!isEmpty(data)) {
        notify(t('common:successfully-created'), 'success');
        router.push(ROUTES.PRODUCTS);
      }
    }
  });

  const [updateProduct, { loading: updating }] = useMutation(UPDATE_PRODUCT, {
    context: {
      headers: {
        'x-csrf-token': csrfToken
      }
    },
    onCompleted: (data: { updateAttribute: Product }) => {
      if (!isEmpty(data)) {
        notify(t('common:successfully-updated'), 'success');
        router.push(ROUTES.PRODUCTS);
      }
    }
  });

  useErrorLogger(error);

  const onSubmit = async () => {
    const isVariable = state.type.id === ProductType.Variable;
    const values = {
      ...state,
      variations: isVariable ? state.variations : [],
      variationOptions: isVariable ? state.variationOptions : []
    };

    console.log({ values });
    if (lockedSubmission) return;

    setLockedSubmission(true);
    setUnsavedChanges(false);

    if (isEmpty(initialValues)) {
      const variables = creationVariable(values);
      console.log({ state, variables });
      createProduct({ variables }).catch((err) => {
        setError(err);
        setUnsavedChanges(true);
      });
    } else {
      const variables = values;
      console.log({ variables, state });
      // updateProduct({
      //   variables: {
      //     ...variables
      //   }
      // }).catch((err) => {
      //   setError(err);
      //   setUnsavedChanges(true);
      // });
    }
    setLockedSubmission(false);
  };

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
          <ProductThumbnail
            setError={setError}
            state={productThumbnailState}
            initialValues={initialValues}
          />
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
          <ProductGallery
            setError={setError}
            state={productGalleryState}
            initialValues={initialValues}
          />
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
      <ProductSelectGroup
        state={ProductSelectGroupState}
        initialValues={initialValues}
      />
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
          <Button
            loading={updating || creating}
            disabled={updating || creating}
          >
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
