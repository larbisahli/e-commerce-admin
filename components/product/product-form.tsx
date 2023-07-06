import { useMutation } from '@apollo/client';
import Card from '@components/common/card';
import { SaveIcon } from '@components/icons/save-icon';
import Button from '@components/ui/button';
import Description from '@components/ui/description';
import { CREATE_PRODUCT } from '@graphql/product';
import { useErrorLogger, useGetUser } from '@hooks/index';
import { notify } from '@lib/index';
import { Product } from '@ts-types/generated';
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
  setUnsavedChanges: any;
};

function ProductForm({ setUnsavedChanges, initialValues = {} }: IProps) {
  const { t } = useTranslation();
  const router = useRouter();

  const state = useFormState();
  const dispatch = useFormReducer();

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
      id,
      name,
      thumbnail,
      productSeo
    }),
    [id, name, thumbnail, productSeo, isUpdateMode]
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
    () => ({ id, isUpdateMode, productShippingInfo }),
    [id, productShippingInfo, isUpdateMode]
  );

  const [lockedSubmission, setLockedSubmission] = useState(false);

  const [error, setError] = useState(null);
  useErrorLogger(error);

  const { userInfo } = useGetUser();
  const csrfToken = userInfo?.csrfToken;

  const [createProduct, { loading: creating }] = useMutation(CREATE_PRODUCT, {
    context: {
      headers: {
        'x-csrf-token': csrfToken
      }
    },
    onCompleted: (data: { createAttribute: Product }) => {
      if (!isEmpty(data)) {
        notify(t('common:successfully-created'), 'success');
        router.push(ROUTES.PRODUCT);
      }
    }
  });

  const onSubmit = async (e) => {
    e.preventDefault();

    const isVariable = state.type.id === ProductType.Variable;
    const values = {
      ...state,
      variations: isVariable ? state.variations : [],
      variationOptions: isVariable ? state.variationOptions : []
    };

    if (lockedSubmission) return;

    setLockedSubmission(true);
    setUnsavedChanges(false);

    if (isEmpty(initialValues)) {
      const variables = creationVariable(values);

      // Validations
      const name = variables.name;
      const thumbnail = variables.thumbnail;
      const slug = variables.productSeo.slug;
      const productType = variables.type.id;
      const salePrice = variables.salePrice;
      const comparePrice = variables.comparePrice;
      const variationOptions = variables.variationOptions;
      if (
        productType === ProductType.Simple &&
        salePrice >= comparePrice &&
        comparePrice !== 0
      ) {
        notify('Compare price must be larger than Sale price', 'error');
        setLockedSubmission(false);
        return;
      } else if (isEmpty(name)) {
        notify('Product name should not be empty', 'error');
        setLockedSubmission(false);
        return;
      } else if (isEmpty(slug)) {
        notify('Product slug should not be empty', 'error');
        setLockedSubmission(false);
        return;
      } else if (isEmpty(thumbnail)) {
        notify('Product thumbnail must not be empty', 'error');
        setLockedSubmission(false);
        return;
      } else if (
        productType === ProductType.Variable &&
        !isEmpty(variationOptions)
      ) {
        const values = variationOptions
          ?.map((option) => {
            const comparePrice = option.comparePrice;
            const salePrice = option.salePrice;
            if (salePrice >= comparePrice && comparePrice !== 0) {
              return option.title;
            }
            return undefined;
          })
          ?.filter((e) => e !== undefined);

        if (!isEmpty(values[0])) {
          notify(
            `Compare price in option ${values[0]} must be larger than Sale price`,
            'error'
          );
          setLockedSubmission(false);
          return;
        }
      }

      createProduct({ variables }).catch((err) => {
        setError(err);
        setUnsavedChanges(true);
      });
    }
    setLockedSubmission(false);
  };

  return (
    <form noValidate>
      {/* Thumbnail */}
      <div className="flex flex-wrap pb-8 border-b border-dashed border-border-base my-5 sm:my-8">
        <Description
          title={t('form:featured-image-title')}
          details={t('form:featured-image-help-text')}
          className="w-full px-0 sm:pe-4 md:pe-5 pb-5 sm:w-4/12 md:w-1/3 sm:py-8"
        />
        <Card className="w-full sm:w-8/12 md:w-2/3">
          <ProductThumbnail
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
          <Button loading={creating} disabled={creating} onClick={onSubmit}>
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
