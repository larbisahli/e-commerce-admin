import { useMutation } from '@apollo/client';
import Card from '@components/common/card';
import { SaveIcon } from '@components/icons/save-icon';
import Alert from '@components/ui/alert';
import Button from '@components/ui/button';
import Description from '@components/ui/description';
import Label from '@components/ui/label';
import SelectInput from '@components/ui/select-input';
import { CREATE_PRODUCT, UPDATE_PRODUCT } from '@graphql/product';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  useErrorLogger,
  useGetStaff,
  useWarnIfUnsavedChanges
} from '@hooks/index';
import { useFormError } from '@hooks/useFormError';
import { notify } from '@lib/index';
import type { Product } from '@ts-types/generated';
import { ProductStatus, ProductType } from '@ts-types/generated';
import { ROUTES } from '@utils/routes';
import cloneDeep from 'lodash/cloneDeep';
import isEmpty from 'lodash/isEmpty';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { memo, useReducer, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import ProductContent from './product-content';
import ProductGallery from './product-gallery';
import ProductSelectGroup from './product-select-group';
import ProductShippingInfoForm from './product-shipping-info';
import ProductThumbnail from './product-thumbnail';
import ProductTypeComponent from './product-type';
import { productValidationSchema } from './product-validation-schema';
import ProductSeo from './products-seo';
import Recommendations from './recommendations';
import { creationVariable, updateVariable } from './variablesSubmission';
import { variationsReducer } from './variations-reducer';

type FormValues = Product;

const defaultValues = {
  name: '',
  sku: '',
  salePrice: 0,
  comparePrice: 0,
  buyingPrice: 0,
  quantity: 0,
  description: '',
  type: { id: ProductType.Simple, name: 'Simple' },
  status: ProductStatus.Draft,
  disableOutOfStock: true,
  note: '',
  thumbnail: [],
  gallery: [],
  categories: [],
  suppliers: [],
  tags: [],
  productShippingInfo: {
    weight: 0,
    weightUnit: { unit: 'kg', label: 'kg' },
    volume: 0,
    volumeUnit: { unit: 'l', label: 'L' },
    dimensionWidth: 0,
    dimensionHeight: 0,
    dimensionDepth: 0,
    dimensionUnit: { unit: 'l', label: 'L' }
  },
  productSeo: {
    slug: '',
    metaTitle: '',
    metaKeywords: '',
    metaDescription: '',
    metaImage: []
  },
  relatedProducts: [],
  upsellProducts: [],
  crossSellProducts: []
};

type IProps = {
  initialValues?: Product | any;
};

const productTypes = [
  { name: 'Simple Product', id: ProductType.Simple },
  { name: 'Variable Product', id: ProductType.Variable }
];

function CreateOrUpdateProductForm({ initialValues }: IProps) {
  const { t } = useTranslation();

  const router = useRouter();

  const [variationState, dispatchVariationState] = useReducer(
    variationsReducer,
    {
      variations: [],
      variationOptions: []
    }
  );
  const [error, setError] = useState(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [unsavedChanges, setUnsavedChanges] = useState(true);
  const [lockedSubmission, setLockedSubmission] = useState(false);

  const methods = useForm<FormValues>({
    resolver: yupResolver(productValidationSchema),
    shouldUnregister: true,
    //@ts-ignore
    defaultValues: !isEmpty(initialValues)
      ? cloneDeep({
          ...initialValues,
          status: initialValues?.published
            ? ProductStatus.Publish
            : ProductStatus.Draft,
          type:
            initialValues.type.id === ProductType.Simple
              ? productTypes[0]
              : productTypes[1]
        })
      : defaultValues
  });

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors }
  } = methods;

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
        reset();
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
  useFormError(errors);

  const onSubmit = async (_values: FormValues) => {
    const isVariable = _values.type.id === ProductType.Variable;
    const values = {
      ..._values,
      variations: isVariable ? variationState.variations : [],
      variationOptions: isVariable ? variationState.variationOptions : []
    };

    console.log({ values });
    if (lockedSubmission) return;

    setLockedSubmission(true);
    setUnsavedChanges(false);

    if (isEmpty(initialValues)) {
      const variables = creationVariable(values);
      console.log({ _values, variables });
      createProduct({ variables }).catch((err) => {
        setError(err);
        setUnsavedChanges(true);
      });
    } else {
      const variables = updateVariable(values, initialValues);
      console.log({ variables, _values });
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

  useWarnIfUnsavedChanges(unsavedChanges, () => {
    return confirm(t('common:UNSAVED_CHANGES'));
  });

  return (
    <>
      {errorMessage ? (
        <Alert
          message={t(`common:${errorMessage}`)}
          variant="error"
          closeable={true}
          className="mt-5"
          onClose={() => setErrorMessage(null)}
        />
      ) : null}
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          {/* Thumbnail */}
          <div className="flex flex-wrap pb-8 border-b border-dashed border-border-base my-5 sm:my-8">
            <Description
              title={t('form:featured-image-title')}
              details={t('form:featured-image-help-text')}
              className="w-full px-0 sm:pe-4 md:pe-5 pb-5 sm:w-4/12 md:w-1/3 sm:py-8"
            />
            <Card className="w-full sm:w-8/12 md:w-2/3">
              <ProductThumbnail initialValues={initialValues} />
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
              <ProductGallery initialValues={initialValues} />
            </Card>
          </div>

          {/* Product Type */}

          <div className="flex flex-wrap pb-8 border-b border-dashed border-border-base my-5 sm:my-8">
            <Description
              title={t('form:form-title-product-type')}
              details={`${
                initialValues
                  ? t('form:item-description-edit')
                  : t('form:item-description-add')
              } ${t('form:product-type-help-text')}`}
              className="w-full px-0 sm:pe-4 md:pe-5 pb-5 sm:w-4/12 md:w-1/3 sm:py-8"
            />
            <Card className="w-full sm:w-8/12 md:w-2/3">
              <Label>{t('form:input-label-attribute-name')}</Label>
              <SelectInput
                name={`type`}
                control={control}
                hideSelectedOptions={false}
                getOptionLabel={(option: any) => option.name}
                getOptionValue={(option: any) => option.id}
                options={productTypes}
              />
            </Card>
          </div>
          {/* Content */}
          <ProductContent initialValues={initialValues} />
          {/* Variation Type & Simple Type */}
          <ProductTypeComponent
            initialValues={initialValues}
            variationState={variationState}
            dispatchVariationState={dispatchVariationState}
          />
          {/* Tags, Category and Suppliers*/}
          <ProductSelectGroup initialValues={initialValues} />
          {/* SEO */}
          <ProductSeo initialValues={initialValues} />
          {/* Related Products, Up-Sells, and Cross-Sells  */}
          <Recommendations initialValues={initialValues} />
          {/* Shipping Info */}
          <div className="mb-12">
            <ProductShippingInfoForm initialValues={initialValues} />
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
      </FormProvider>
    </>
  );
}

export default memo(CreateOrUpdateProductForm);
