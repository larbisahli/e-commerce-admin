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
import { ProductType } from '@ts-types/generated';
import { ROUTES } from '@utils/routes';
import isEmpty from 'lodash/isEmpty';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { memo, useState } from 'react';

import { FormProvider } from './context/form.context';
import ProductContent from './product-content';
import ProductGallery from './product-gallery';
import ProductSelectGroup from './product-select-group';
import ProductShippingInfoForm from './product-shipping-info';
import ProductThumbnail from './product-thumbnail';
import ProductTypeComponent from './product-type';
import ProductTypeFormComponent from './product-type/product-type-form';
import { productValidationSchema } from './product-validation-schema';
import ProductSeo from './products-seo';
import Recommendations from './recommendations';
import { creationVariable, updateVariable } from './variablesSubmission';

type FormValues = Product;

type IProps = {
  initialValues?: Product | any;
};

function CreateOrUpdateProductForm({ initialValues = {} }: IProps) {
  const { t } = useTranslation();

  const router = useRouter();

  const [error, setError] = useState(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [unsavedChanges, setUnsavedChanges] = useState(true);
  const [lockedSubmission, setLockedSubmission] = useState(false);

  console.log('YUP', yupResolver(productValidationSchema));

  // useEffect(()=>{
  //   !isEmpty(initialValues) ? cloneDeep({
  //     ...initialValues,
  //     status: initialValues?.published
  //       ? ProductStatus.Publish
  //       : ProductStatus.Draft,
  //     type:
  //       initialValues?.type.id === ProductType.Simple
  //         ? productTypes[0]
  //         : productTypes[1]
  //   }): defaultValues
  // }, [initialValues])

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
    const _values = {};
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
      <FormProvider>
        <form onSubmit={onSubmit} noValidate>
          {/* Thumbnail */}
          <div className="flex flex-wrap pb-8 border-b border-dashed border-border-base my-5 sm:my-8">
            <Description
              title={t('form:featured-image-title')}
              details={t('form:featured-image-help-text')}
              className="w-full px-0 sm:pe-4 md:pe-5 pb-5 sm:w-4/12 md:w-1/3 sm:py-8"
            />
            <Card className="w-full sm:w-8/12 md:w-2/3">
              <ProductThumbnail />
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
              <ProductGallery />
            </Card>
          </div>

          {/* Product Type */}
          <ProductTypeComponent initialValues={initialValues} />
          {/* Content */}
          <ProductContent initialValues={initialValues} />
          {/* Variation Type & Simple Type product form */}
          <ProductTypeFormComponent initialValues={initialValues} />
          {/* Tags, Category and Suppliers*/}
          <ProductSelectGroup />
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
