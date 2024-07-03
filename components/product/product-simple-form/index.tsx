import { useMutation, useQuery } from '@apollo/client';
import Card from '@components/common/card';
import { SaveIcon } from '@components/icons/save-icon';
import Button from '@components/ui/button';
import Description from '@components/ui/description';
import Input from '@components/ui/input';
import { ATTRIBUTES_FOR_SELECT } from '@graphql/attribute';
import { UPDATE_SIMPLE_PRODUCT_INFORMATION } from '@graphql/product';
import { useErrorLogger } from '@hooks/useErrorLogger';
import { useAppDispatch, useGetClient } from '@hooks/useGetClient';
import { useSettings } from '@hooks/useSettings';
import { notify } from '@lib/notify';
import { setEtag } from '@store/client';
import { OrderBy, SortOrder } from '@ts-types/enums';
import { Attribute, LanguageType, Product } from '@ts-types/generated';
import { differenceWith, isEqual } from 'lodash';
import isEmpty from 'lodash/isEmpty';
import { nanoid } from 'nanoid';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import React, { ChangeEvent, memo, useCallback, useState } from 'react';

import { Actions, useFormReducer } from '../context/form.context';
import AttributesOptionComponent from './attributes';

interface TAttributeSelect {
  attributes: Attribute[];
}

interface OptionsVariable {
  page: number;
  limit: number;
  orderBy: OrderBy;
  sortedBy: SortOrder;
  language: LanguageType;
  etag: string;
}

type IProps = {
  initProductInformation: Product;
  setInitProductInformation: React.Dispatch<React.SetStateAction<Product>>;
  checkForUpdateHandler: () => void;
  isUpdated: boolean;
  state: {
    isUpdateMode: boolean;
    salePrice: Product['salePrice'];
    comparePrice: Product['comparePrice'];
    buyingPrice: Product['buyingPrice'];
    quantity: Product['quantity'];
    sku: Product['sku'];
    attributes: Product['attributes'];
  };
};

function ProductSimpleForm({
  state,
  initProductInformation,
  setInitProductInformation,
  isUpdated,
  checkForUpdateHandler
}: IProps) {
  const { t } = useTranslation();
  const { query } = useRouter();

  const productId = parseInt(query.productId as string, 10);

  const [error, setError] = useState(null);

  const { systemCurrency } = useSettings();
  const dispatch = useFormReducer();
  const reduxDispatch = useAppDispatch();

  const { selectedLanguage } = useSettings();

  const {
    userInfo: { csrfToken, store: { etag } = {} }
  } = useGetClient();

  const {
    data,
    loading: attributeLoading,
    error: queryError
  } = useQuery<TAttributeSelect, OptionsVariable>(ATTRIBUTES_FOR_SELECT, {
    variables: {
      page: 1,
      limit: 999,
      orderBy: OrderBy.CREATED_AT,
      sortedBy: SortOrder.Desc,
      language: selectedLanguage,
      etag: etag?.attributeEtag
    },
    fetchPolicy: 'cache-and-network',
    skip: isEmpty(selectedLanguage) || isEmpty(etag)
  });

  const [updateProductInformation, { loading }] = useMutation(
    UPDATE_SIMPLE_PRODUCT_INFORMATION,
    {
      context: {
        headers: {
          'x-csrf-token': csrfToken
        }
      },
      onCompleted: (data: { updateSimpleProductInformation: Product }) => {
        console.log({ data });
        if (!isEmpty(data?.updateSimpleProductInformation)) {
          const { etag: newEtag } = data?.updateSimpleProductInformation ?? {};
          reduxDispatch(setEtag({ etag: newEtag }));
          setInitProductInformation(data?.updateSimpleProductInformation);
          notify(t('common:successfully-updated'), 'success');
        }
      }
    }
  );

  useErrorLogger(error);
  useErrorLogger(queryError);

  const {
    salePrice,
    comparePrice,
    buyingPrice,
    quantity,
    sku,
    attributes,
    isUpdateMode
  } = state;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;

    const inputValue =
      type === 'number' ? (Number(value) < 0 ? 0 : Number(value)) : value;

    dispatch({
      type: Actions.CONTENT,
      payload: {
        field: name,
        value: inputValue
      }
    });
  };

  const getUpdatedAttributes = useCallback(() => {
    if (!isUpdateMode) return { additions: [], deletions: [] };

    const attributeAdditions = attributes
      ?.map((v) => {
        const initAttribute = initProductInformation?.attributes?.find(
          (vv) => vv?.attribute?.id === v?.attribute?.id
        );
        if (!isEmpty(initAttribute)) {
          const additionSelectedValues = differenceWith(
            [{ id: v?.selectedValue.id }],
            [{ id: initAttribute?.selectedValue.id }],
            isEqual
          );
          console.log({ additionSelectedValues });

          return isEmpty(additionSelectedValues)
            ? undefined
            : {
                attribute: { id: v.attribute.id },
                selectedValue: additionSelectedValues?.map((av) => {
                  return { id: av.id };
                })[0]
              };
        } else {
          return {
            attribute: { id: v.attribute.id },
            selectedValue: { id: v.selectedValue.id }
          };
        }
      })
      ?.filter((e) => e !== undefined);

    const attributeDeletions = initProductInformation?.attributes
      ?.map((v) => {
        const valueAttribute = attributes?.find(
          (vv) => vv?.attribute?.id === v?.attribute?.id
        );
        console.log(
          valueAttribute,
          [{ id: v?.selectedValue.id }],
          [{ id: valueAttribute?.selectedValue.id }]
        );
        if (!isEmpty(valueAttribute)) {
          const deletedSelectedValues = differenceWith(
            [{ id: v?.selectedValue.id }],
            [{ id: valueAttribute?.selectedValue.id }],
            isEqual
          );

          console.log({ deletedSelectedValues });

          return isEmpty(deletedSelectedValues)
            ? undefined
            : {
                attribute: { id: v.attribute.id },
                selectedValue: deletedSelectedValues?.map((av) => {
                  return { id: av.id };
                })[0]
              };
        } else {
          return {
            attribute: { id: v.attribute.id }
          };
        }
      })
      ?.filter((e) => e !== undefined);

    return {
      additions: attributeAdditions,
      deletions: attributeDeletions
    };
  }, [initProductInformation?.attributes, isUpdateMode, attributes]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const { additions, deletions } = getUpdatedAttributes();

    updateProductInformation({
      variables: {
        id: productId,
        salePrice,
        comparePrice,
        buyingPrice,
        quantity,
        sku,
        attributes: { additions, deletions },
        language: selectedLanguage
      }
    }).catch((err) => {
      setError(err);
    });
  };

  const renderSaveButton = () => {
    if (isUpdated) {
      return (
        <div className="mt-8 flex justify-end border-t pt-4">
          <Button
            loading={loading}
            disabled={loading}
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

  const appendVariant = (e: any) => {
    e.preventDefault();
    dispatch({
      type: Actions.APPEND_ATTRIBUTE,
      payload: {
        value: { id: nanoid(), attribute: null, value: null }
      }
    });
  };

  const { attributes: requestAttributes = [] } = data ?? {};

  return (
    <div className="my-5 flex flex-wrap pb-8 sm:my-8">
      <Description
        details={`${
          initProductInformation
            ? t('form:item-description-edit')
            : t('form:item-description-add')
        } ${t('form:form-description-simple-product-info')}`}
        className="w-full px-0 pb-5 sm:w-1/4 sm:py-8 sm:pe-4 md:w-1/4 md:pe-5"
      />

      <Card className="w-full sm:w-3/4 md:w-3/4">
        <Input
          label={t('form:input-label-sale-price')}
          subLabel={t('form:input-label-exclude-tax')}
          isRequiredLabel
          name="salePrice"
          value={salePrice}
          onChange={handleChange}
          onBlur={checkForUpdateHandler}
          type="number"
          // error={t(errors.salePrice?.message!)}
          renderLabel={<>{systemCurrency?.symbol}</>}
          variant="outline"
          className="mb-5"
        />
        <Input
          label={t('form:input-label-compare-price')}
          subLabel={t('form:input-label-exclude-tax')}
          name="comparePrice"
          value={comparePrice}
          onChange={handleChange}
          onBlur={checkForUpdateHandler}
          type="number"
          // error={t(errors.comparePrice?.message!)}
          variant="outline"
          className="mb-5"
          renderLabel={<>{systemCurrency?.symbol}</>}
        />
        <Input
          label={t('form:input-label-buying-price')}
          name="buyingPrice"
          value={buyingPrice}
          onChange={handleChange}
          onBlur={checkForUpdateHandler}
          type="number"
          // error={t(errors.buyingPrice?.message!)}
          renderLabel={<>{systemCurrency?.symbol}</>}
          variant="outline"
          className="mb-5"
        />
        <Input
          label={t('form:input-label-total-quantity')}
          isRequiredLabel
          name="quantity"
          value={quantity}
          onChange={handleChange}
          onBlur={checkForUpdateHandler}
          type="number"
          // error={t(errors.quantity?.message!)}
          variant="outline"
          className="mb-5"
        />
        <Input
          label={t('form:input-label-sku')}
          name="sku"
          value={sku}
          onChange={handleChange}
          onBlur={checkForUpdateHandler}
          placeholder="LV-10001"
          // error={t(errors.sku?.message!)}
          variant="outline"
          className="mb-5"
        />
        <div className="mt-8">
          {/* ---------<Attribute>---------- */}
          {attributes?.map((attribute) => {
            return (
              <AttributesOptionComponent
                key={attribute?.id}
                checkForUpdateHandler={checkForUpdateHandler}
                productAttribute={attribute}
                attributes={requestAttributes}
                loading={attributeLoading}
                selectedAttributes={attributes}
              />
            );
          })}
          {/* ------------- */}
          <div className="mt-12 pb-5">
            <Button
              disabled={attributes?.length === requestAttributes?.length}
              onClick={appendVariant}
              type="button"
              variant="outline"
              loading={attributeLoading}
            >
              {t('form:button-label-add-attribute')}
            </Button>
          </div>
        </div>

        {renderSaveButton()}
      </Card>
    </div>
  );
}

export default memo(ProductSimpleForm);
