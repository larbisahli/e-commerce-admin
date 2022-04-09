import { useMutation } from '@apollo/client';
import Card from '@components/common/card';
import Alert from '@components/ui/alert';
import Button from '@components/ui/button';
import Checkbox from '@components/ui/checkbox';
import Description from '@components/ui/description';
import FileInput from '@components/ui/file-input';
import ValidationError from '@components/ui/form-validation-error';
import Label from '@components/ui/label';
import Loader from '@components/ui/loader/loader';
import Radio from '@components/ui/radio';
import TextArea from '@components/ui/text-area';
import { CREATE_PRODUCT, UPDATE_PRODUCT } from '@graphql/product';
import { yupResolver } from '@hookform/resolvers/yup';
import { useErrorLogger, useWarnIfUnsavedChanges } from '@hooks/index';
import { notify } from '@lib/index';
import { Product } from '@ts-types/generated';
import { ROUTES } from '@utils/routes';
import cloneDeep from 'lodash/cloneDeep';
import isEmpty from 'lodash/isEmpty';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { memo, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import ProductCategoryInput from './product-category-input';
import ProductInfoForm from './product-info-form';
import ProductShippingInfoForm from './product-shipping-info';
import ProductSupplierInput from './product-supplier-input';
import ProductTagInput from './product-tag-input';
import { productValidationSchema } from './product-validation-schema';
import ProductVariableForm from './product-variable-form';
import { creationVariable, updateVariable } from './variablesSubmission';

const Editor = dynamic(() => import('@components/ui/editor'), {
  loading: () => <Loader height="150px" text="Editor..." />,
  ssr: false
});

type FormValues = Product;

const defaultValues = {
  product_name: '',
  sku: '',
  sale_price: 0,
  compare_price: 0,
  buying_price: 0,
  quantity: 0,
  short_description: '',
  product_description: '',
  status: 'draft',
  disable_out_of_stock: true,
  note: '',
  thumbnail: [],
  gallery: [],
  categories: [],
  suppliers: [],
  variations: [],
  tags: [],
  product_shipping_info: {
    weight: 0,
    weight_unit: { unit: 'kg' },
    volume: 0,
    volume_unit: { unit: 'L' },
    dimension_width: 0,
    dimension_height: 0,
    dimension_depth: 0,
    dimension_unit: { unit: 'L' }
  }
};

type IProps = {
  initialValues?: Product | null;
};

function CreateOrUpdateProductForm({ initialValues }: IProps) {
  const { t } = useTranslation();

  const router = useRouter();

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [unsavedChanges, setUnsavedChanges] = useState<string[]>([]);
  const [lockedSubmission, setLockedSubmission] = useState(false);

  const methods = useForm<FormValues>({
    resolver: yupResolver(productValidationSchema),
    shouldUnregister: true,
    //@ts-ignore
    defaultValues: initialValues
      ? cloneDeep({
          ...initialValues,
          status: initialValues?.published ? 'publish' : 'draft'
        })
      : defaultValues
  });

  const {
    register,
    handleSubmit,
    control,
    getValues,
    reset,
    formState: { errors }
  } = methods;

  const [createProduct, { loading: creating, error: createProductError }] =
    useMutation(CREATE_PRODUCT, {
      onCompleted: (data: { createAttribute: Product }) => {
        console.log('CREATE_PRODUCT - data :>> ', data);
        if (!isEmpty(data)) {
          notify(t('common:successfully-created'), 'success');
          // reset();
          // router.push(ROUTES.PRODUCTS);
        }
      }
    });

  const [updateProduct, { loading: updating, error: updateProductError }] =
    useMutation(UPDATE_PRODUCT, {
      onCompleted: (data: { updateAttribute: Product }) => {
        console.log('UPDATE_PRODUCT - data :>> ', data);
        if (!isEmpty(data)) {
          notify(t('common:successfully-updated'), 'success');
          // router.push(ROUTES.PRODUCTS);
        }
      }
    });

  useErrorLogger(createProductError);
  useErrorLogger(updateProductError);

  const onSubmit = async (values: FormValues) => {
    if (lockedSubmission) {
      console.log('lockedSubmission :>> ');
      return;
    }

    setLockedSubmission(true);

    // Check if shipping_provider exist
    const shippingProviderCheck = values?.shippings?.find(
      (v) => !v.shipping_provider?.id
    );
    if (!isEmpty(shippingProviderCheck)) {
      notify('Please add a Shipping Provider', 'error');
      return;
    }

    console.log('inputValues', { values });

    if (initialValues) {
      console.time('Product Update =========>');

      const variables = updateVariable(values, initialValues);

      console.log('Update Variables :>> ', variables);

      console.timeEnd('Product Update =========>');
      // updateProduct({
      //   variables: {
      //     id: initialValues.id,
      //     ...variables
      //   }
      // });
    } else {
      const variables = creationVariable(values);
      console.log('variables', { variables });
      // createProduct({ variables });
    }
    setLockedSubmission(false);
  };

  useWarnIfUnsavedChanges(!isEmpty(unsavedChanges), () => {
    return confirm(t('common:UNSAVED_IMAGE'));
  });

  const [shortDescription, setShortDescription] = useState(0);

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
              <FileInput
                name="thumbnail"
                control={control}
                multiple={false}
                setUnsavedChanges={setUnsavedChanges}
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
              <FileInput
                name="gallery"
                control={control}
                setUnsavedChanges={setUnsavedChanges}
              />
            </Card>
          </div>

          {/* Tags, Category and Suppliers*/}
          <div className="flex flex-wrap pb-8 border-b border-dashed border-border-base my-5 sm:my-8">
            <Description
              title={t('form:type-and-category')}
              details={t('form:type-and-category-help-text')}
              className="w-full px-0 sm:pe-4 md:pe-5 pb-5 sm:w-4/12 md:w-1/3 sm:py-8"
            />

            <Card className="w-full sm:w-8/12 md:w-2/3">
              <ProductCategoryInput control={control} />
              {/* @ts-ignore */}
              <ValidationError message={t(errors.categories?.message)} />
              <ProductSupplierInput control={control} />
              <ProductTagInput control={control} />
            </Card>
          </div>

          {/* Simple Type */}
          <ProductInfoForm initialValues={initialValues} />

          {/* Description */}
          <div className="flex flex-wrap my-5 sm:my-8">
            <Description
              title={t('form:item-description')}
              details={`${
                initialValues
                  ? t('form:item-description-edit')
                  : t('form:item-description-add')
              } ${t('form:product-description-help-text')}`}
              className="w-full px-0 sm:pe-4 md:pe-5 pb-5 sm:w-4/12 md:w-1/3 sm:py-8"
            />

            <Card className="w-full sm:w-8/12 md:w-2/3">
              <Label>{t('form:input-label-description')}*</Label>
              <Editor
                control={control}
                name="product_description"
                className="mb-5"
                defaultValue=""
              />
              <ValidationError
                message={t(errors.product_description?.message)}
              />
              <TextArea
                label={`${t('form:item-short-description')}*`}
                // @ts-ignore
                {...register('short_description')}
                onBlur={() =>
                  setShortDescription(getValues('short_description').length)
                }
                error={t(errors.short_description?.message!)}
                variant="outline"
              />
              <div style={{ fontSize: '.75rem' }} className="mb-5">
                {shortDescription <= 160 ? (
                  <span className="text-green-600 ">
                    {`(${shortDescription}/160 max)`}
                  </span>
                ) : (
                  <span className="text-red-600">
                    {`(${shortDescription}/160 max)`}
                  </span>
                )}
              </div>
              <div>
                <Label>{t('form:input-label-status')}</Label>
                <Radio
                  {...register('status')}
                  label={t('form:input-label-published')}
                  id="published"
                  value="publish"
                  className="mb-2"
                />
                <Radio
                  {...register('status')}
                  id="draft"
                  label={t('form:input-label-draft')}
                  value="draft"
                />
              </div>
              <div className="my-5">
                <Checkbox
                  {...register('disable_out_of_stock')}
                  label={t('form:input-label-disable-out-of-stock')}
                />
              </div>
            </Card>
          </div>

          {/* Variation Type */}
          <ProductVariableForm initialValues={initialValues} />

          {/* Shipping Info */}
          <ProductShippingInfoForm
            control={control}
            initialValues={initialValues}
          />

          <div className="mb-4 text-end">
            {initialValues && (
              <Button
                variant="outline"
                onClick={router.back}
                className="me-4"
                type="button"
              >
                {t('form:button-label-back')}
              </Button>
            )}
            <Button
              loading={updating || creating}
              disabled={updating || creating}
            >
              {initialValues
                ? t('form:button-label-update-product')
                : t('form:button-label-add-product')}
            </Button>
          </div>
        </form>
      </FormProvider>
    </>
  );
}

export default memo(CreateOrUpdateProductForm);
