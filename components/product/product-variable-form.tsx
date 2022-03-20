import Input from '@components/ui/input';
import { useFieldArray, useFormContext } from 'react-hook-form';
import type {
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
  FieldValues
} from 'react-hook-form';
import Button from '@components/ui/button';
import Description from '@components/ui/description';
import Card from '@components/common/card';
import Label from '@components/ui/label';
import Title from '@components/ui/title';
import Checkbox from '@components/ui/checkbox';
import SelectInput from '@components/ui/select-input';
import { cartesian } from '@utils/cartesian';
import isEmpty from 'lodash/isEmpty';
import { useEffect, useMemo } from 'react';
import { Product } from '@ts-types/generated';
import { useTranslation } from 'next-i18next';
import { useErrorLogger } from '@hooks/useErrorLogger';
import { useQuery } from '@apollo/client';
import {
  Attribute,
  AttributeValue,
  OrderBy,
  SortOrder
} from '@ts-types/generated';
import { ATTRIBUTES_FOR_SELECT } from '@graphql/attribute';
import ImageComponent from '@components/ImageComponent';
import cn from 'classnames';

type IProps = {
  initialValues?: Product | null;
};

interface TAttributeSelect {
  attributesForAdmin: Attribute[];
}

interface OptionsVariable {
  page: number;
  limit: number;
  orderBy: OrderBy;
  sortedBy: SortOrder;
}

interface CartesianType {
  id: string;
  attribute_name: string;
  attribute_value: string;
}

function getCartesianProduct(
  values: {
    attribute: Attribute;
    attribute_values: AttributeValue[];
  }[]
) {
  const formattedValues = values
    ?.map((v) =>
      v.attribute_values?.map((a) => ({
        id: a.id,
        attribute_name: v.attribute.attribute_name,
        attribute_value: a.attribute_value
      }))
    )
    .filter((i: any) => i !== undefined);

  if (isEmpty(formattedValues)) return [];

  return cartesian<CartesianType[][]>(...formattedValues) as CartesianType[][];
}

export default function ProductVariableForm({ initialValues }: IProps) {
  const { t } = useTranslation();

  const { data, loading, error } = useQuery<TAttributeSelect, OptionsVariable>(
    ATTRIBUTES_FOR_SELECT,
    {
      variables: {
        page: 1,
        limit: 999,
        orderBy: OrderBy.CREATED_AT,
        sortedBy: SortOrder.Desc
      },
      fetchPolicy: 'cache-and-network'
    }
  );

  useErrorLogger(error);

  const {
    register,
    control,
    watch,
    setValue,
    formState: { errors }
  } = useFormContext();

  // This field array will keep all the attribute dropdown fields
  const { fields, append, remove } = useFieldArray({
    shouldUnregister: true,
    control,
    name: 'variations'
  });

  const variations = watch('variations');
  const gallery = watch('gallery');

  const cartesianProduct = getCartesianProduct(variations);

  const attributes = data?.attributesForAdmin ?? [];

  return (
    <div className="flex flex-wrap pb-8 border-b border-dashed border-border-base my-5 sm:my-8">
      <Description
        title={t('form:form-title-variation-product-info')}
        details={`${
          initialValues
            ? t('form:item-description-update')
            : t('form:item-description-choose')
        } ${t('form:form-description-variation-product-info')}`}
        className="w-full px-0 sm:pe-4 md:pe-5 pb-5 sm:w-4/12 md:w-1/3 sm:py-8"
      />
      <Card className="w-full sm:w-8/12 md:w-2/3 p-0 md:p-0">
        <div className="border-t border-dashed border-border-200 mb-5 md:mb-8">
          <Title className="text-lg uppercase text-center px-5 md:px-8 mb-0 mt-8">
            {t('form:form-title-options')}
          </Title>
          <div>
            {fields?.map((field: any, index: number) => {
              return (
                <div
                  key={field.id}
                  className="border-b border-dashed border-border-200 last:border-0 p-5 md:p-8"
                >
                  <div className="flex items-center justify-between">
                    <Title className="mb-0">
                      {t('form:form-title-options')} {index + 1}
                    </Title>
                    <button
                      onClick={() => remove(index)}
                      type="button"
                      className="text-sm text-red-500 hover:text-red-700 transition-colors duration-200 focus:outline-none"
                    >
                      {t('form:button-label-remove')}
                    </button>
                  </div>

                  <div className="grid grid-cols-fit gap-5">
                    <div className="mt-5">
                      <Label>{t('form:input-label-attribute-name')}*</Label>
                      <SelectInput
                        name={`variations[${index}].attribute`}
                        control={control}
                        defaultValue={field.attribute}
                        getOptionLabel={(option: any) => option.attribute_name}
                        getOptionValue={(option: any) => option.id}
                        options={attributes}
                        isLoading={loading}
                      />
                    </div>

                    <div className="mt-5 col-span-2">
                      <Label>{t('form:input-label-attribute-value')}*</Label>
                      <SelectInput
                        isMulti
                        name={`variations[${index}].attribute_values`}
                        control={control}
                        defaultValue={field.value}
                        getOptionLabel={(option: any) => option.attribute_value}
                        getOptionValue={(option: any) => option.id}
                        options={
                          watch(`variations[${index}].attribute`)
                            ?.attribute_values
                        }
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="px-5 md:px-8">
            <Button
              disabled={fields.length === attributes?.length}
              onClick={(e: any) => {
                e.preventDefault();
                append({ attribute: '', attribute_values: [] });
              }}
              type="button"
            >
              {t('form:button-label-add-option')}
            </Button>
          </div>

          {/* Preview generation section start */}
          {!!cartesianProduct?.length && (
            <div className="border-t border-dashed border-border-200 pt-5 md:pt-8 mt-5 md:mt-8">
              <Title className="text-lg uppercase text-center px-5 md:px-8 mb-0">
                {cartesianProduct?.length}{' '}
                {cartesianProduct?.length > 1
                  ? t('form:total-variations-added')
                  : t('form:total-variation-added')}
              </Title>
              {cartesianProduct.map((fieldAttributeValue, index: number) => {
                return (
                  <div
                    key={`fieldAttributeValues-${index}`}
                    className="border-b last:border-0 border-dashed border-border-200 p-5 md:p-8 md:last:pb-0 mb-5 last:mb-8 mt-5"
                  >
                    <Title className="!text-lg mb-8">
                      {t('form:form-title-variant')}:{' '}
                      <span className="text-blue-600 font-semibold">
                        {Array.isArray(fieldAttributeValue)
                          ? fieldAttributeValue
                              ?.map((a) => a?.attribute_value)
                              .join('/')
                          : (fieldAttributeValue as { attribute_value: string })
                              ?.attribute_value}
                      </span>
                    </Title>

                    {/* Hidden inputs title and option */}
                    <TitleAndOptionsInput
                      register={register}
                      setValue={setValue}
                      index={index}
                      fieldAttributeValue={fieldAttributeValue}
                    />

                    <div className="grid grid-cols-2 gap-5">
                      <Input
                        label={`${t('form:input-label-sale-price')}*`}
                        type="number"
                        {...register(`variation_options.${index}.sale_price`)}
                        error={t(
                          errors.variation_options?.[index]?.sale_price?.message
                        )}
                        variant="outline"
                        className="mb-5"
                      />
                      <Input
                        label={t('form:input-label-sale-price')}
                        type="number"
                        {...register(
                          `variation_options.${index}.compare_price`
                        )}
                        error={t(
                          errors.variation_options?.[index]?.compare_price
                            ?.message
                        )}
                        variant="outline"
                        className="mb-5"
                      />
                      <Input
                        label={t('form:input-label-sale-price')}
                        type="number"
                        {...register(`variation_options.${index}.buying_price`)}
                        error={t(
                          errors.variation_options?.[index]?.buying_price
                            ?.message
                        )}
                        variant="outline"
                        className="mb-5"
                      />
                      <Input
                        label={`${t('form:input-label-sku')}`}
                        {...register(`variation_options.${index}.sku`)}
                        error={t(
                          errors.variation_options?.[index]?.sku?.message
                        )}
                        variant="outline"
                        className="mb-5"
                      />
                      <Input
                        label={`${t('form:input-label-quantity')}*`}
                        type="number"
                        {...register(`variation_options.${index}.quantity`)}
                        error={t(
                          errors.variation_options?.[index]?.quantity?.message
                        )}
                        variant="outline"
                        className="mb-5"
                      />
                    </div>

                    {/* use dynamic import */}
                    {!isEmpty(gallery) && (
                      <VariationImages
                        watch={watch}
                        gallery={gallery}
                        index={index}
                        setValue={setValue}
                      />
                    )}

                    <div className="mb-5 mt-5">
                      <Checkbox
                        {...register(`variation_options.${index}.is_disable`)}
                        error={t(
                          errors.variation_options?.[index]?.is_disable?.message
                        )}
                        label={t('form:input-label-disable-variant')}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}

interface TitleAndOptionsInputProps {
  fieldAttributeValue: CartesianType[];
  index: number;
  setValue: UseFormSetValue<FieldValues>;
  register: UseFormRegister<FieldValues>;
}

const TitleAndOptionsInput = ({
  fieldAttributeValue,
  index,
  setValue,
  register
}: TitleAndOptionsInputProps) => {
  const title = useMemo(
    () =>
      Array.isArray(fieldAttributeValue)
        ? fieldAttributeValue.map((a) => a?.attribute_value).join('/')
        : (fieldAttributeValue as { attribute_value: string })?.attribute_value,
    [fieldAttributeValue]
  );

  const options = useMemo(
    () =>
      Array.isArray(fieldAttributeValue)
        ? fieldAttributeValue?.map((av) => av.id)
        : [(fieldAttributeValue as CartesianType).id],
    [fieldAttributeValue]
  );

  useEffect(() => {
    setValue(`variation_options.${index}.title`, title);
    setValue(`variation_options.${index}.options`, options);
  }, [fieldAttributeValue]);

  return (
    <>
      <input {...register(`variation_options.${index}.title`)} type="hidden" />
      <input
        {...register(`variation_options.${index}.options`)}
        type="hidden"
      />
    </>
  );
};

interface VariationImagesProps {
  gallery: string[];
  index: number;
  setValue: UseFormSetValue<FieldValues>;
  watch: UseFormWatch<FieldValues>;
}

const VariationImages = ({
  gallery,
  index,
  watch,
  setValue
}: VariationImagesProps) => {
  const { t } = useTranslation();

  const selectedImg = watch(`variation_options.${index}.image`);

  const setImage = (img: string) => {
    if (selectedImg === img) {
      setValue(`variation_options.${index}.image`, null);
    } else {
      setValue(`variation_options.${index}.image`, img);
    }
  };

  return (
    <div className="mb-5 mt-5">
      <Label>{t('form:input-label-select-image')}</Label>
      {gallery?.map((img) => {
        return (
          <div
            onClick={() => setImage(img)}
            className={cn(
              'inline-flex flex-col transition-all overflow-hidden border-2 border-border-200 rounded mt-2 me-2 relative cursor-pointer',
              {
                '!border-2': selectedImg === img,
                shadow: selectedImg === img
              }
            )}
            style={{
              borderColor: selectedImg === img ? '#46d934' : null,
              transform: selectedImg === img ? 'translateY(-8px)' : null
            }}
            key={img}
          >
            <div className="flex items-center justify-center min-w-0 w-16 h-16 overflow-hidden">
              <ImageComponent
                src={img}
                customPlaceholder={'/placeholders/no-image.svg'}
                width={64}
                height={64}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};
