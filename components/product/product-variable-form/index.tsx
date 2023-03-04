import { useQuery } from '@apollo/client';
import Card from '@components/common/card';
import { SaveIcon } from '@components/icons/save-icon';
import Button from '@components/ui/button';
import Description from '@components/ui/description';
import Title from '@components/ui/title';
import { ATTRIBUTES_FOR_SELECT } from '@graphql/attribute';
import { useErrorLogger } from '@hooks/useErrorLogger';
import type { Product, VariationType } from '@ts-types/generated';
import { Attribute, OrderBy, SortOrder } from '@ts-types/generated';
import { cartesian } from '@utils/cartesian';
import differenceWith from 'lodash/differenceWith';
import isEmpty from 'lodash/isEmpty';
import isEqual from 'lodash/isEqual';
import { nanoid } from 'nanoid';
import { useTranslation } from 'next-i18next';
import React, { memo, useEffect, useState } from 'react';

import { useFormReducer } from '../context/form.context';
import { Actions } from '../context/form.types';
import CartesianProductComponent from './cartesian-product-component';
import VariationComponent from './variation-component';

interface TAttributeSelect {
  attributes: Attribute[];
}

interface OptionsVariable {
  page: number;
  limit: number;
  orderBy: OrderBy;
  sortedBy: SortOrder;
}

interface CartesianType {
  id: string | number;
  name: string;
  value: string;
}

function getCartesianProduct(values: VariationType[]) {
  const formattedValues = values
    ?.map((v) =>
      v.selectedValues?.map((a) => ({
        id: a.id,
        name: v.attribute.name,
        value: a.value
      }))
    )
    .filter((i: any) => i !== undefined);

  if (isEmpty(formattedValues)) return [];

  return cartesian<CartesianType[][]>(...formattedValues) as CartesianType[][];
}

type IProps = {
  initialValues?: Product | null;
  checkForUpdateHandler: () => void;
  isUpdated: boolean;
  state: {
    variationOptions: Product['variationOptions'];
    variations: Product['variations'];
  };
};

function ProductVariableForm({ state, initialValues }: IProps) {
  const { t } = useTranslation();

  const dispatch = useFormReducer();

  const { variationOptions, variations } = state;

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

  const [attributeValuesChangesState, setAttributeValuesChangesState] =
    useState([]);
  const [cartesianProduct, setCartesianProduct] = useState([]);
  const [init, setInit] = useState(false);

  const { attributes = [] } = data ?? {};

  const attributeValuesChanges = [].concat(
    ...(variations?.map((v) => v?.selectedValues) ?? [])
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

  // useEffect(() => {
  //   if (
  //     isEmpty(variationOptions) &&
  //     !isEmpty(initialValues?.variationOptions)
  //   ) {
  //     const variationOptions = cloneDeep(initialValues?.variationOptions ?? []);
  //     const variations = cloneDeep(initialValues?.variations ?? []);
  //     dispatchVariationState({
  //       type: VariationActions.INIT,
  //       payload: {
  //         value: {
  //           variations: variations?.map((variation) => {
  //             return {
  //               id: nanoid(),
  //               ...variation
  //             };
  //           }),
  //           variationOptions
  //         }
  //       }
  //     });
  //   } else if (isEmpty(initialValues?.variationOptions)) {
  //     setInit(true);
  //   }
  // }, []);

  useEffect(() => {
    dispatch({
      type: Actions.VARIATION_CARTESIAN,
      payload: {
        values: cartesianProduct
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cartesianProduct]);

  const appendVariant = (e: any) => {
    e.preventDefault();
    dispatch({
      type: Actions.APPEND_VARIATION,
      payload: {
        value: { id: nanoid(), attribute: attributes[0], selectedValues: [] }
      }
    });
  };

  return (
    <div className="flex flex-wrap pb-8 my-5 sm:my-8">
      <Description
        details={`${
          initialValues
            ? t('form:item-description-update')
            : t('form:item-description-choose')
        } ${t('form:form-description-variation-product-info')}`}
        className="w-full px-0 sm:pe-4 md:pe-5 pb-5 sm:w-4/12 md:w-1/3 sm:py-8"
      />
      <Card className="w-full sm:w-8/12 md:w-2/3 p-0 md:p-0">
        <div className="border-t border-dashed border-border-200">
          <Title className="text-lg uppercase text-center px-5 md:px-8 mb-0 mt-8">
            {t('form:form-title-options')}
          </Title>
          <div>
            {variations?.map((variant, index) => {
              return (
                <VariationComponent
                  key={variant.id}
                  {...{
                    variant,
                    attributes,
                    loading,
                    index
                  }}
                />
              );
            })}
          </div>

          <div className="px-5 pb-5 md:px-8">
            <Button
              disabled={variations.length === attributes?.length}
              onClick={appendVariant}
              type="button"
              loading={loading}
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
              {variationOptions?.map((variationOption, index: number) => {
                return (
                  <CartesianProductComponent
                    key={index}
                    variationOption={variationOption}
                    index={index}
                  />
                );
              })}
            </div>
          )}
        </div>
        {!isEmpty(initialValues) && (
          <div className="mt-12 flex justify-end p-5">
            <Button
            // loading={updating || creating}
            // disabled={updating || creating}
            >
              <div className="mr-1">
                <SaveIcon width="1.3rem" height="1.3rem" />
              </div>
              <div>{t('form:button-label-save')}</div>
            </Button>
          </div>
        )}
      </Card>
    </div>
  );
}

export default memo(ProductVariableForm);
