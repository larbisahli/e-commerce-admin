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
import { Product, Suppliers, Tag } from '@ts-types/generated';
import cloneDeep from 'lodash/cloneDeep';
import groupBy from 'lodash/groupBy';
import isEmpty from 'lodash/isEmpty';
import dynamic from 'next/dynamic';
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

const Editor = dynamic(() => import('@components/ui/editor'), {
  loading: () => <p>...</p>,
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

export default function CreateOrUpdateProductForm({ initialValues }: IProps) {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [unsavedChanges, setUnsavedChanges] = useState<string[]>([]);

  const { t } = useTranslation();

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
    getValues,
    formState: { errors }
  } = methods;

  const onSubmit = async (values: FormValues) => {
    const inputValues: any = {
      product_name: values.product_name,
      short_description: values.short_description,
      product_description: values.product_description,
      sku: values.sku,
      published: values.status === 'publish',
      quantity: Number(values?.quantity),
      sale_price: Number(values.sale_price),
      compare_price: Number(values.compare_price),
      buying_price: Number(values.buying_price),
      categories: values?.categories?.map(({ id }) => {
        return { id };
      }),
      tags: values?.tags?.map(({ id }: Tag) => {
        return { id };
      }),
      suppliers: values?.suppliers?.map(({ id }: Suppliers) => {
        return { id };
      }),
      thumbnail: values?.thumbnail?.map((img) => {
        return { image: img };
      }),
      gallery: values.gallery?.map((img) => {
        return { image: img };
      }),
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
          id: value?.shipping_provider?.id,
          shipping_price: Number(value?.shipping_price)
        };
      }),
      variations: values?.variations?.map((v) => {
        return {
          attribute: { id: v.attribute.id },
          attribute_values: v.attribute_values?.map((av) => {
            return { id: av.id };
          })
        };
      }),
      variation_options: values?.variation_options?.map((vo) => {
        return {
          title: vo.title,
          options: vo.options,
          image: vo.image,
          sale_price: Number(vo.sale_price),
          compare_price: Number(vo.compare_price),
          buying_price: Number(vo.buying_price),
          quantity: Number(vo.quantity),
          sku: vo.sku,
          active: vo.is_disable
        };
      })
    };
    console.log('inputValues', { inputValues, values });

    if (initialValues) {
      // updateProduct(
      //   {
      //     variables: {
      //       id: initialValues.id,
      //       input: inputValues
      //     }
      //   }
      // );
    } else {
      // createProduct(
      //   {
      //     ...inputValues
      //   }
      // );
    }
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
