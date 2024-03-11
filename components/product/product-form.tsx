import { useMutation } from '@apollo/client';
import Card from '@components/common/card';
import { LanguageDefaultDescInfo } from '@components/common/commonComponents';
import FormActions from '@components/common/FormActions';
import Description from '@components/ui/description';
import { CREATE_PRODUCT } from '@graphql/product';
import { useErrorLogger, useGetUser } from '@hooks/index';
import { useSettings } from '@hooks/useSettings';
import { notify } from '@lib/index';
import { Product } from '@ts-types/generated';
import { ProductType, SaveOptions } from '@ts-types/generated';
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
  isFork?: boolean;
};

function ProductForm({
  setUnsavedChanges,
  initialValues = {},
  isFork
}: IProps) {
  const { t } = useTranslation();
  const router = useRouter();
  const createMode = isEmpty(initialValues);

  console.log({ createMode });

  const state = useFormState();
  const dispatch = useFormReducer();

  const [saveMode, setSaveMode] = useState<SaveOptions>(SaveOptions.Default);

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
    trackInventory,
    freeShipping,
    displayProductMeasurements,
    includeInHomepage,
    quantity,
    sku,
    thumbnail,
    gallery,
    type,
    categories,
    suppliers,
    manufacturers,
    attributes,
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
      payload: { init: { ...initialValues, isUpdateMode: !createMode, isFork } }
    });
  }, []);

  // Stopping unnecessary rerenders
  const productTypeState = {
    isUpdateMode,
    type,
    variationOptions,
    variations,
    salePrice,
    comparePrice,
    buyingPrice,
    attributes,
    quantity,
    sku
  };
  const ProductSeoState = {
    isUpdateMode,
    id,
    name,
    thumbnail,
    productSeo
  };
  const productThumbnailState = { thumbnail, isUpdateMode };
  const productGalleryState = { gallery, isUpdateMode };
  const ProductSelectGroupState = {
    categories,
    suppliers,
    tags,
    manufacturers,
    isUpdateMode
  };
  const productContentState = {
    isUpdateMode,
    name,
    note,
    description,
    status,
    disableOutOfStock,
    trackInventory,
    freeShipping,
    displayProductMeasurements,
    includeInHomepage,
    id
  };
  const linkedProductsState = {
    isUpdateMode,
    upsellProducts,
    relatedProducts,
    crossSellProducts
  };
  const productShippingInfoState = { id, isUpdateMode, productShippingInfo };

  const [lockedSubmission, setLockedSubmission] = useState(false);

  const [error, setError] = useState(null);
  const { selectedLanguage } = useSettings();

  const { userInfo } = useGetUser();
  const csrfToken = userInfo?.csrfToken;

  useErrorLogger(error);

  const [createProduct, { loading: creating }] = useMutation(CREATE_PRODUCT, {
    context: {
      headers: {
        'x-csrf-token': csrfToken
      }
    },
    onCompleted: (data: { createProduct: Product }) => {
      const { id } = data.createProduct;
      if (!id) {
        return;
      }
      if (saveMode === SaveOptions.Default) {
        notify(t('common:successfully-created'), 'success');
        router.push(`${ROUTES.PRODUCT}/edit/${id}`);
      } else if (saveMode === SaveOptions.SaveClose) {
        notify(t('common:successfully-created'), 'success');
        router.push(ROUTES.PRODUCT);
      } else if (saveMode === SaveOptions.SaveNew) {
        notify(t('common:successfully-created'), 'success');
        router.push(`${ROUTES.PRODUCT}/create`);
      } else if (saveMode === SaveOptions.SaveDuplicate) {
        notify(t('common:successfully-created'), 'success');
        router.push(`${ROUTES.PRODUCT}/fork/${id}`);
      }

      setSaveMode(SaveOptions.Default);
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

    if (createMode || isFork) {
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
        setSaveMode(SaveOptions.Default);
        return;
      } else if (isEmpty(name)) {
        notify('Product name should not be empty', 'error');
        setLockedSubmission(false);
        setSaveMode(SaveOptions.Default);
        return;
      } else if (isEmpty(slug)) {
        notify('Product slug should not be empty', 'error');
        setLockedSubmission(false);
        setSaveMode(SaveOptions.Default);
        return;
      } else if (isEmpty(thumbnail)) {
        notify('Product thumbnail must not be empty', 'error');
        setLockedSubmission(false);
        setSaveMode(SaveOptions.Default);
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

      createProduct({
        variables: {
          ...variables,
          language: selectedLanguage
        }
      }).catch((err) => {
        setError(err);
        setSaveMode(SaveOptions.Default);
        setUnsavedChanges(true);
      });
    }
    setLockedSubmission(false);
  };

  return (
    <form noValidate>
      <FormActions
        backLink={ROUTES.PRODUCT}
        forceSystemLang={createMode || isFork}
        title={
          createMode || isFork
            ? t('form:form-title-new-product')
            : t('form:form-title-edit-product')
        }
        loading={creating}
        disabled={creating}
        showSaveButton={createMode || isFork}
        onSubmit={onSubmit}
        saveOptions={
          (createMode || isFork) && [
            {
              onClick: () => setSaveMode(SaveOptions.SaveNew),
              name: t('common:button-label-save-new')
            },
            {
              onClick: () => setSaveMode(SaveOptions.SaveDuplicate),
              name: t('common:button-label-save-duplicate')
            },
            {
              onClick: () => setSaveMode(SaveOptions.SaveClose),
              name: t('common:button-label-save-close')
            }
          ]
        }
      />
      <LanguageDefaultDescInfo label="New Product" isVisible={createMode} />
      {/* Thumbnail */}
      <div className="my-5 flex flex-wrap border-b border-dashed border-border-base pb-8 sm:my-8">
        <Description
          title={t('form:featured-image-title')}
          details={t('form:featured-image-help-text')}
          className="w-full px-0 pb-5 sm:w-1/4 sm:py-8 sm:pe-4 md:w-1/4 md:pe-5"
        />
        <Card className="w-full sm:w-3/4 md:w-3/4">
          <ProductThumbnail
            state={productThumbnailState}
            initialValues={initialValues}
          />
        </Card>
      </div>
      {/* Gallery */}
      <div className="my-5 flex flex-wrap border-b border-dashed border-border-base pb-8 sm:my-8">
        <Description
          title={t('form:gallery-title')}
          details={t('form:gallery-help-text')}
          className="w-full px-0 pb-5 sm:w-1/4 sm:py-8 sm:pe-4 md:w-1/4 md:pe-5"
        />
        <Card className="sm:w-w-3/4 w-full md:w-3/4">
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
        productSeo={productSeo}
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
      <ProductSeo
        state={ProductSeoState}
        productContent={productContentState}
        initialValues={initialValues}
      />
      {/* Related Products, Up-Sells, and Cross-Sells  */}
      <LinkedProducts
        state={linkedProductsState}
        initialValues={initialValues}
      />
      {/* Shipping Info */}
      <div className="mb-12">
        <ProductShippingInfoForm
          productType={type?.id}
          state={productShippingInfoState}
          initialValues={initialValues}
        />
      </div>
    </form>
  );
}

export default memo(ProductForm);
