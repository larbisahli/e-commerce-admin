import { useMutation, useQuery } from '@apollo/client';
import Card from '@components/common/card';
import { SaveIcon } from '@components/icons/save-icon';
import Button from '@components/ui/button';
import Description from '@components/ui/description';
import Title from '@components/ui/title';
import { ATTRIBUTES_FOR_SELECT } from '@graphql/attribute';
import { UPDATE_VARIABLE_PRODUCT_INFORMATION } from '@graphql/product';
import { useErrorLogger } from '@hooks/useErrorLogger';
import { useGetUser } from '@hooks/useGetUser';
import { notify } from '@lib/notify';
import type {
  Product,
  VariationOptionsType,
  VariationType
} from '@ts-types/generated';
import { Attribute, OrderBy, SortOrder } from '@ts-types/generated';
import { cartesian } from '@utils/cartesian';
import differenceWith from 'lodash/differenceWith';
import isEmpty from 'lodash/isEmpty';
import isEqual from 'lodash/isEqual';
import { nanoid } from 'nanoid';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';

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
  // eslint-disable-next-line no-empty-pattern
  getUpdatedVariationOptions: ({}: any) => {
    additions: Product['variationOptions'];
    deletions: Product['variationOptions'];
  };
  // eslint-disable-next-line no-unused-vars
  checkForUpdateHandler: (values: any) => void;
  isUpdated: boolean;
  state: {
    variationOptions: Product['variationOptions'];
    variations: Product['variations'];
    isUpdateMode: boolean;
  };
};

function ProductVariableForm({
  state,
  initialValues,
  checkForUpdateHandler,
  getUpdatedVariationOptions,
  isUpdated
}: IProps) {
  const { t } = useTranslation();

  const dispatch = useFormReducer();

  const { query } = useRouter();

  const productId = parseInt(query.productId as string, 10);

  const [error, setError] = useState(null);

  const [updatedVariationOptions, setUpdatedVariationOptions] = useState([]);
  const [initVariableProductInformation, setInitVariableProductInformation] =
    useState(() => initialValues);

  const { variationOptions: initVariationOptions } =
    initVariableProductInformation;

  const { variationOptions, variations, isUpdateMode } = state;

  const {
    data,
    loading,
    error: queryError
  } = useQuery<TAttributeSelect, OptionsVariable>(ATTRIBUTES_FOR_SELECT, {
    variables: {
      page: 1,
      limit: 999,
      orderBy: OrderBy.CREATED_AT,
      sortedBy: SortOrder.Desc
    },
    fetchPolicy: 'cache-and-network'
  });

  const { userInfo } = useGetUser();
  const csrfToken = userInfo?.csrfToken;

  const [updateVariableProductInformation, { loading: updateLoading }] =
    useMutation(UPDATE_VARIABLE_PRODUCT_INFORMATION, {
      context: {
        headers: {
          'x-csrf-token': csrfToken
        }
      },
      onCompleted: (data: { updateVariableProductInformation: Product }) => {
        if (!isEmpty(data?.updateVariableProductInformation)) {
          setInitVariableProductInformation(
            data?.updateVariableProductInformation
          );
          notify(t('common:successfully-updated'), 'success');
        }
      }
    });

  useErrorLogger(error);
  useErrorLogger(queryError);

  const [attributeValuesChangesState, setAttributeValuesChangesState] =
    useState([]);
  const [cartesianProduct, setCartesianProduct] = useState([]);
  const [init, setInit] = useState(false);

  const { attributes = [] } = data ?? {};

  const attributeValuesChanges = useMemo(
    () => [].concat(...(variations?.map((v) => v?.selectedValues) ?? [])),
    [variations]
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
    if (init) {
      dispatch({
        type: Actions.VARIATION_CARTESIAN,
        payload: {
          values: cartesianProduct
        }
      });
    } else {
      setInit(true);
    }
  }, [cartesianProduct, dispatch, init]);

  const appendVariant = (e: any) => {
    e.preventDefault();
    dispatch({
      type: Actions.APPEND_VARIATION,
      payload: {
        value: { id: nanoid(), attribute: attributes[0], selectedValues: [] }
      }
    });
  };

  const updateHandler = useCallback(() => {
    const { additions, deletions } = getUpdatedVariationOptions({
      variationOptions,
      initVariationOptions
    });
    console.log({ additions, deletions });
    checkForUpdateHandler({ additions, deletions });
    setUpdatedVariationOptions(additions);
  }, [
    checkForUpdateHandler,
    getUpdatedVariationOptions,
    initVariationOptions,
    variationOptions
  ]);

  useEffect(() => {
    if (!isEmpty(initVariableProductInformation)) {
      updateHandler();
    }
  }, [initVariableProductInformation, updateHandler]);

  const getUpdatedVariationAttributes = useCallback(() => {
    if (!isUpdateMode) return { additions: [], deletions: [] };

    const variationAdditions = variations
      ?.map((v) => {
        const initVariation = initVariableProductInformation?.variations?.find(
          (vv) => vv?.attribute?.id === v?.attribute?.id
        );
        if (!isEmpty(initVariation)) {
          const addedSelectedValues = differenceWith(
            v?.selectedValues,
            initVariation?.selectedValues,
            isEqual
          );
          return isEmpty(addedSelectedValues)
            ? undefined
            : {
                attribute: { id: v.attribute.id },
                selectedValues: addedSelectedValues?.map((av) => {
                  return { id: av.id };
                })
              };
        } else {
          return {
            attribute: { id: v.attribute.id },
            selectedValues: v.selectedValues?.map((av) => {
              return { id: av.id };
            })
          };
        }
      })
      ?.filter((e) => e !== undefined);

    const variationDeletions = initVariableProductInformation?.variations
      ?.map((v) => {
        const valueVariation = variations?.find(
          (vv) => vv?.attribute?.id === v?.attribute?.id
        );
        if (!isEmpty(valueVariation)) {
          const deletedSelectedValues = differenceWith(
            v?.selectedValues,
            valueVariation?.selectedValues,
            isEqual
          );
          return isEmpty(deletedSelectedValues)
            ? undefined
            : {
                attribute: { id: v.attribute.id },
                selectedValues: deletedSelectedValues?.map((av) => {
                  return { id: av.id };
                })
              };
        } else {
          return {
            attribute: { id: v.attribute.id }
          };
        }
      })
      ?.filter((e) => e !== undefined);

    return {
      additions: variationAdditions,
      deletions: variationDeletions
    };
  }, [initVariableProductInformation?.variations, isUpdateMode, variations]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const { additions, deletions } = getUpdatedVariationOptions({
      variationOptions,
      initVariationOptions
    });
    const { additions: variationAdditions, deletions: variationDeletion } =
      getUpdatedVariationAttributes();

    console.log({
      additions: {
        variationOptions: additions?.map((value) => {
          return {
            ...value,
            thumbnail: value.thumbnail?.map(({ id }) => ({ id }))
          };
        }),
        variations: variationAdditions
      },
      deletions: {
        variationOptions: deletions?.map((value) => {
          return {
            ...value,
            thumbnail: value.thumbnail?.map(({ id }) => ({ id }))
          };
        }),
        variations: variationDeletion
      }
    });

    updateVariableProductInformation({
      variables: {
        id: productId,
        additions: {
          variationOptions: additions?.map((value) => {
            return {
              ...value,
              thumbnail: value.thumbnail?.map(({ id }) => ({ id })),
              active: !value.isDisable
            };
          }),
          variations: variationAdditions
        },
        deletions: {
          variationOptions: deletions?.map(({ id }) => {
            id;
          }),
          variations: variationDeletion
        }
      }
    }).catch((err) => {
      setError(err);
    });
  };

  const renderSaveButton = () => {
    if (isUpdated) {
      return (
        <div className="mt-8 flex justify-end border-t pt-4 m-5">
          <Button
            loading={updateLoading}
            disabled={updateLoading}
            onClick={handleSubmit}
          >
            <div className="mr-1">
              <SaveIcon width="1.3rem" height="1.3rem" />
            </div>
            <div>{t('form:button-label-save')}</div>
          </Button>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="flex flex-wrap pb-8 my-5 sm:my-8">
      <Description
        details={`${
          initVariableProductInformation
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
                    updateHandler,
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
                  ? t('form:variations')
                  : t('form:variation')}
              </Title>
              {variationOptions?.map((variationOption, index: number) => {
                return (
                  <CartesianProductComponent
                    key={index}
                    {...{
                      index,
                      updateHandler,
                      updatedVariationOptions,
                      variationOption
                    }}
                  />
                );
              })}
            </div>
          )}
        </div>
        {renderSaveButton()}
      </Card>
    </div>
  );
}

export default memo(ProductVariableForm);
