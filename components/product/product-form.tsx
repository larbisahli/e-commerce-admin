import Card from '@components/common/card';
import Alert from '@components/ui/alert';
import Button from '@components/ui/button';
import Checkbox from '@components/ui/checkbox';
import Description from '@components/ui/description';
import FileInput from '@components/ui/file-input';
import Label from '@components/ui/label';
import Radio from '@components/ui/radio';
import TextArea from '@components/ui/text-area';
import { yupResolver } from '@hookform/resolvers/yup';
import { useErrorLogger, useWarnIfUnsavedChanges } from '@hooks/index';
import {
  Category,
  Product,
  ProductStatus,
  ProductType,
  Tag
} from '@ts-types/generated';
import cloneDeep from 'lodash/cloneDeep';
import groupBy from 'lodash/groupBy';
import isEmpty from 'lodash/isEmpty';
import orderBy from 'lodash/orderBy';
import sum from 'lodash/sum';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import ProductCategoryInput from './product-category-input';
import ProductInfoForm from './product-info-form';
import ProductShippingOptionsForm from './product-shipping-options';
import ProductSupplierInput from './product-supplier-input';
import ProductTagInput from './product-tag-input';
import { productValidationSchema } from './product-validation-schema';
import ProductVariableForm from './product-variable-form';

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
  image: [],
  gallery: [],
  categories: [],
  suppliers: [],
  variations: [],
  tags: [],
  product_shipping_options: {
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

function getFormattedVariations(variations: any) {
  const variationGroup = groupBy(variations, 'attribute.slug');
  return Object.values(variationGroup)?.map((vg) => {
    return {
      attribute: vg?.[0]?.attribute,
      value: vg?.map((v) => ({ id: v.id, value: v.value }))
    };
  });
}

function processOptions(options: any) {
  try {
    return JSON.parse(options);
  } catch (error) {
    return options;
  }
}

function calculateMaxMinPrice(variationOptions: any) {
  if (!variationOptions || !variationOptions.length) {
    return {
      min_price: null,
      max_price: null
    };
  }
  const sortedVariationsByPrice = orderBy(variationOptions, ['price']);
  const sortedVariationsBySalePrice = orderBy(variationOptions, ['sale_price']);
  return {
    min_price:
      sortedVariationsBySalePrice?.[0].sale_price <
      sortedVariationsByPrice?.[0]?.price
        ? Number(sortedVariationsBySalePrice?.[0].sale_price)
        : Number(sortedVariationsByPrice?.[0]?.price),
    max_price: Number(
      sortedVariationsByPrice?.[sortedVariationsByPrice?.length - 1]?.price
    )
  };
}

function calculateQuantity(variationOptions: any) {
  return sum(
    variationOptions?.map(({ quantity }: { quantity: number }) => quantity)
  );
}
export default function CreateOrUpdateProductForm({ initialValues }: IProps) {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [unsavedChanges, setUnsavedChanges] = useState<string[]>([]);

  const { t } = useTranslation();

  const shopId = '';

  const methods = useForm<FormValues>({
    // resolver: yupResolver(productValidationSchema),
    shouldUnregister: true,
    //@ts-ignore
    defaultValues: initialValues
      ? cloneDeep({
          ...initialValues,
          quantity: 0,
          variations: getFormattedVariations(initialValues?.variations)
        })
      : defaultValues
  });

  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors }
  } = methods;

  const onSubmit = async (values: FormValues) => {
    const inputValues: any = {
      product_name: values.product_name,
      short_description: values.short_description,
      product_description: values.product_description,
      sku: values.sku,
      published: values.status === 'publish',
      quantity: values?.quantity,
      sale_price: Number(values.sale_price),
      compare_price: Number(values.compare_price),
      buying_price: Number(values.buying_price),
      categories: values?.categories?.map(({ id }: Category) => id),
      tags: values?.tags?.map(({ id }: Tag) => id),
      image: values?.image,
      gallery: values.gallery,
      disable_out_of_stock: values?.disable_out_of_stock,
      product_shipping_options: {
        weight: Number(values?.product_shipping_options?.weight),
        weight_unit: (
          values?.product_shipping_options?.weight_unit as { unit: string }
        )?.unit,
        volume: Number(values?.product_shipping_options?.volume),
        volume_unit: (
          values?.product_shipping_options?.volume_unit as { unit: string }
        )?.unit,
        dimension_width: Number(
          values?.product_shipping_options?.dimension_width
        ),
        dimension_height: Number(
          values?.product_shipping_options?.dimension_height
        ),
        dimension_depth: Number(
          values?.product_shipping_options?.dimension_depth
        ),
        dimension_unit: (
          values?.product_shipping_options?.dimension_unit as { unit: string }
        )?.unit
      },
      shippings: values?.shippings?.map((value) => {
        return {
          shipping_price: Number(value?.shipping_price),
          shipping_id: value?.shipping_provider?.id
        };
      })
      // ...(productTypeValue?.value === ProductType.Variable && {
      //   variations: values?.variations?.flatMap(({ value }: any) =>
      //     value?.map(({ id }: any) => ({ attribute_value_id: id }))
      //   )
      // }),
      // ...(productTypeValue?.value === ProductType.Variable
      //   ? {
      //       variation_options: {
      //         upsert: values?.variation_options?.map(
      //           ({ options, ...rest }: any) => ({
      //             ...rest,
      //             options: processOptions(options).map(
      //               ({ name, value }: VariationOption) => ({
      //                 name,
      //                 value
      //               })
      //             )
      //           })
      //         ),
      //         delete: initialValues?.variation_options
      //           ?.map((initialVariationOption) => {
      //             const find = values?.variation_options?.find(
      //               (variationOption) =>
      //                 variationOption?.id === initialVariationOption?.id
      //             );
      //             if (!find) {
      //               return initialVariationOption?.id;
      //             }
      //           })
      //           .filter((item) => item !== undefined)
      //       }
      //     }
      //   : {
      //       variations: [],
      //       variation_options: {
      //         upsert: [],
      //         delete: initialValues?.variation_options?.map(
      //           (variation) => variation?.id
      //         )
      //       }
      //     }),
      // ...calculateMaxMinPrice(values?.variation_options)
    };
    console.log('inputValues', inputValues);

    if (initialValues) {
      // updateProduct(
      //   {
      //     variables: {
      //       id: initialValues.id,
      //       input: inputValues
      //     }
      //   },
      //   {
      //     onError: (error: any) => {
      //       Object.keys(error?.response?.data).forEach((field: any) => {
      //         setError(field, {
      //           type: 'manual',
      //           message: error?.response?.data[field][0]
      //         });
      //       });
      //     }
      //   }
      // );
    } else {
      // createProduct(
      //   {
      //     ...inputValues
      //   },
      //   {
      //     onError: (error: any) => {
      //       if (error?.response?.data?.message) {
      //         setErrorMessage(error?.response?.data?.message);
      //         animateScroll.scrollToTop();
      //       } else {
      //         Object.keys(error?.response?.data).forEach((field: any) => {
      //           setError(field, {
      //             type: 'manual',
      //             message: error?.response?.data[field][0]
      //           });
      //         });
      //       }
      //     }
      //   }
      // );
    }
  };

  useWarnIfUnsavedChanges(!isEmpty(unsavedChanges), () => {
    return confirm(t('common:UNSAVED_IMAGE'));
  });

  const shortDescription = watch('short_description');

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
                name="image"
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

          {/* Tags & Category */}
          <div className="flex flex-wrap pb-8 border-b border-dashed border-border-base my-5 sm:my-8">
            <Description
              title={t('form:type-and-category')}
              details={t('form:type-and-category-help-text')}
              className="w-full px-0 sm:pe-4 md:pe-5 pb-5 sm:w-4/12 md:w-1/3 sm:py-8"
            />

            <Card className="w-full sm:w-8/12 md:w-2/3">
              <ProductSupplierInput
                control={control}
                error={t((errors?.type as any)?.message)}
              />
              <ProductCategoryInput control={control} />
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
              <TextArea
                label={t('form:item-short-description')}
                {...register('short_description')}
                error={t(errors.short_description?.message!)}
                variant="outline"
                className="mb-5"
              />
              <TextArea
                label={t('form:input-label-description')}
                {...register('product_description')}
                error={t(errors.product_description?.message!)}
                variant="outline"
                className="mb-5"
              />
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
          <ProductVariableForm shopId={shopId} initialValues={initialValues} />

          {/* Shipping options */}
          <ProductShippingOptionsForm
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
            // loading={updating || creating}
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
