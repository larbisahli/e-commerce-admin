import { useQuery } from '@apollo/client';
import Card from '@components/common/card';
import Button from '@components/ui/button';
import Description from '@components/ui/description';
import Label from '@components/ui/label';
import SelectInput from '@components/ui/select-input';
import Title from '@components/ui/title';
import { ATTRIBUTES_FOR_SELECT } from '@graphql/attribute';
import { useErrorLogger } from '@hooks/useErrorLogger';
import type { Product, VariationOptionsType } from '@ts-types/generated';
import {
  Attribute,
  AttributeValue,
  OrderBy,
  SortOrder,
  VariationOptionActions
} from '@ts-types/generated';
import { cartesian } from '@utils/cartesian';
import cloneDeep from 'lodash/cloneDeep';
import differenceWith from 'lodash/differenceWith';
import isEmpty from 'lodash/isEmpty';
import isEqual from 'lodash/isEqual';
import { useTranslation } from 'next-i18next';
import React, { memo, useEffect, useMemo, useState } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';

import CartesianProductComponent from './cartesian-product-component';

interface VariationOptionAction {
  type: VariationOptionActions;
  payload: {
    value?: any;
    field?: string;
    values?: any[];
    extra?: any;
  };
}

type IProps = {
  initialValues?: Product | null;
  variationOptions?: VariationOptionsType[];
  dispatchVariationOptions?: React.Dispatch<VariationOptionAction>;
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

function ProductVariableForm({
  initialValues,
  variationOptions,
  dispatchVariationOptions
}: IProps) {
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

  const { control, watch, getValues } = useFormContext();

  // This field array will keep all the attribute dropdown fields
  const { fields, append, remove } = useFieldArray({
    shouldUnregister: true,
    control,
    name: 'variations'
  });

  const [attributeValuesChangesState, setAttributeValuesChangesState] =
    useState([]);
  const [cartesianProduct, setCartesianProduct] = useState([]);
  const [init, setInit] = useState(false);

  const variations = watch('variations');

  const attributeValuesChanges = [].concat(
    ...(variations?.map((v) => v?.attribute_values) ?? [])
  );

  useEffect(() => {
    const diffAdd = differenceWith(
      attributeValuesChanges,
      attributeValuesChangesState,
      isEqual
    );

    const diffDel = differenceWith(
      attributeValuesChangesState,
      attributeValuesChanges,
      isEqual
    );

    if (!isEmpty(diffAdd) || !isEmpty(diffDel)) {
      const cp = getCartesianProduct(variations);
      setCartesianProduct(cp);
      setAttributeValuesChangesState(attributeValuesChanges);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [attributeValuesChanges, attributeValuesChangesState]);

  useEffect(() => {
    if (
      isEmpty(variationOptions) &&
      !isEmpty(initialValues?.variation_options)
    ) {
      dispatchVariationOptions({
        type: VariationOptionActions.INIT,
        payload: {
          value: cloneDeep(initialValues?.variation_options)
        }
      });
    }
    setInit(true);
  }, []);

  useEffect(() => {
    const sale_price = getValues('sale_price');
    const compare_price = getValues('compare_price');
    const buying_price = getValues('buying_price');

    if (init) {
      dispatchVariationOptions({
        type: VariationOptionActions.CARTESIAN,
        payload: {
          values: cartesianProduct,
          extra: { sale_price, compare_price, buying_price }
        }
      });
    }
  }, [cartesianProduct]);

  const attributes = data?.attributesForAdmin ?? [];

  const gallery = watch('gallery');

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
                <VariationComponent
                  key={index}
                  field={field}
                  index={index}
                  attributes={attributes}
                  loading={loading}
                  remove={remove}
                />
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
          {!!variationOptions?.length && (
            <div className="border-t border-dashed border-border-200 pt-5 md:pt-8 mt-5 md:mt-8">
              <Title className="text-lg uppercase text-center px-5 md:px-8 mb-0">
                {variationOptions?.length}{' '}
                {variationOptions?.length > 1
                  ? t('form:total-variations-added')
                  : t('form:total-variation-added')}
              </Title>
              {variationOptions.map((variationOption, index: number) => {
                return (
                  <CartesianProductComponent
                    key={index}
                    gallery={gallery}
                    variationOption={variationOption}
                    dispatchVariationOptions={dispatchVariationOptions}
                    index={index}
                  />
                );
              })}
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}

const VariationComponent = ({ field, index, attributes, remove, loading }) => {
  const { t } = useTranslation();

  const { control, watch } = useFormContext();

  const attId = watch(`variations[${index}].attribute.id`);
  const av = useMemo(
    () =>
      attributes?.find((a) => {
        return a.id === attId;
      })?.attribute_values,
    [attributes, attId]
  );

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
            value={field.attribute}
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
            value={field.value}
            getOptionLabel={(option: any) => option.attribute_value}
            getOptionValue={(option: any) => option.id}
            options={av}
          />
        </div>
      </div>
    </div>
  );
};

export default memo(ProductVariableForm);
