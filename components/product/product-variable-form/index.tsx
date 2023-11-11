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
import { useSettings } from '@hooks/useSettings';
import { notify } from '@lib/notify';
import type { LanguageType, Product, VariationType } from '@ts-types/generated';
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
  language: LanguageType;
}

interface CartesianType {
  id: string | number;
  name: string;
  value: string;
}

function getCartesianProduct(values: VariationType[]) {
  const formattedValues = values
    ?.map(
      (v) =>
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

  const { selectedLanguage } = useSettings();

  const {
    data,
    loading,
    error: queryError
  } = useQuery<TAttributeSelect, OptionsVariable>(ATTRIBUTES_FOR_SELECT, {
    variables: {
      page: 1,
      limit: 999,
      orderBy: OrderBy.CREATED_AT,
      sortedBy: SortOrder.Desc,
      language: selectedLanguage
    },
    fetchPolicy: 'cache-and-network',
    skip: isEmpty(selectedLanguage)
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
        const { updateVariableProductInformation } = data ?? {};
        if (!isEmpty(updateVariableProductInformation)) {
          const { variations, variationOptions } =
            updateVariableProductInformation;
          // Update initial state
          setInitVariableProductInformation(updateVariableProductInformation);
          // Update current state
          dispatch({
            type: Actions.VARIATION_INIT,
            payload: {
              value: {
                variations: variations?.map((variation) => {
                  return {
                    id: nanoid(),
                    ...variation
                  };
                }),
                variationOptions
              }
            }
          });
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
    if (!isUpdateMode) return;
    const { additions, deletions } = getUpdatedVariationOptions({
      variationOptions,
      initVariationOptions
    });
    checkForUpdateHandler({ additions, deletions });
    setUpdatedVariationOptions(additions);
    // No dependencies
  }, []);

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

    updateVariableProductInformation({
      variables: {
        id: productId,
        language: selectedLanguage,
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
          variationOptions: deletions?.map(({ id }) => ({
            id
          })),
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
        <div className="m-5 mt-8 flex justify-end border-t pt-4">
          <Button
            loading={updateLoading}
            disabled={updateLoading}
            onClick={handleSubmit}
            renderIcon={<SaveIcon width="1.3rem" height="1.3rem" />}
          >
            <div>{t('form:button-label-save')}</div>
          </Button>
        </div>
      );
    }
    return null;
  };

  console.log('ProductVariableForm-index:>>', {
    variationOptions,
    attributeValuesChanges
  });

  return (
    <div className="my-5 flex flex-wrap pb-8 sm:my-8">
      <Description
        details={`${
          initVariableProductInformation
            ? t('form:item-description-update')
            : t('form:item-description-choose')
        } ${t('form:form-description-variation-product-info')}`}
        className="w-full px-0 pb-5 sm:w-1/4 sm:py-8 sm:pe-4 md:w-1/4 md:pe-5"
      />
      <Card className="w-full p-0 sm:w-3/4 md:w-3/4 md:p-0">
        <div className="border-t border-dashed border-border-200">
          <Title className="mb-0 mt-8 px-5 text-center text-lg uppercase md:px-8">
            {t('form:form-title-options')}
          </Title>
          <div>
            {variations?.map((variant, index) => {
              return (
                <VariationComponent
                  key={variant.id}
                  {...{
                    // we use "attributeValuesChanges" to trigger re-render only because memo do a shallow compare
                    attributeValuesChanges,
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
            <div className="mt-5 border-t border-dashed border-border-200 pt-5 md:mt-8 md:pt-8">
              <Title className="mb-5 px-5 text-center text-lg uppercase md:px-8">
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
