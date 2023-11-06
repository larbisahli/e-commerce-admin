import { useMutation, useQuery } from '@apollo/client';
import Card from '@components/common/card';
import { SaveIcon } from '@components/icons/save-icon';
import Button from '@components/ui/button';
import Description from '@components/ui/description';
import Input from '@components/ui/input';
import { ATTRIBUTES_FOR_SELECT } from '@graphql/attribute';
import { UPDATE_SIMPLE_PRODUCT_INFORMATION } from '@graphql/product';
import { useErrorLogger } from '@hooks/useErrorLogger';
import { useGetUser } from '@hooks/useGetUser';
import { useSettings } from '@hooks/useSettings';
import { notify } from '@lib/notify';
import { OrderBy, SortOrder } from '@ts-types/enums';
import { Attribute, LanguageType, Product } from '@ts-types/generated';
import isEmpty from 'lodash/isEmpty';
import { nanoid } from 'nanoid';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import React, { ChangeEvent, memo, useState } from 'react';

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
}

type IProps = {
  initProductInformation: Product;
  setInitProductInformation: React.Dispatch<React.SetStateAction<Product>>;
  checkForUpdateHandler: () => void;
  isUpdated: boolean;
  state: {
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

  const { selectedLanguage } = useSettings();

  const { userInfo } = useGetUser();
  const csrfToken = userInfo?.csrfToken;

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
      language: selectedLanguage
    },
    fetchPolicy: 'cache-and-network',
    skip: isEmpty(selectedLanguage)
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
        if (!isEmpty(data?.updateSimpleProductInformation)) {
          setInitProductInformation(data?.updateSimpleProductInformation);
          notify(t('common:successfully-updated'), 'success');
        }
      }
    }
  );

  useErrorLogger(error);
  useErrorLogger(queryError);

  const { salePrice, comparePrice, buyingPrice, quantity, sku, attributes } =
    state;

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

  const handleSubmit = (e) => {
    e.preventDefault();
    updateProductInformation({
      variables: {
        id: productId,
        salePrice,
        comparePrice,
        buyingPrice,
        quantity,
        sku,
        attributes: attributes?.map(({ id, attribute, value }) => {
          return {
            id:
              typeof id === 'string' || (id as any) instanceof String
                ? null
                : id, // if null create otherwise update
            attribute: { id: attribute?.id },
            value: { id: value?.id }
          };
        })
      }
    }).catch((err) => {
      setError(err);
    });
  };

  const renderSaveButton = () => {
    if (isUpdated) {
      return (
        <div className="mt-8 flex justify-end border-t pt-4">
          <Button loading={loading} disabled={loading} onClick={handleSubmit}>
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
              disabled={attributes.length === requestAttributes?.length}
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
