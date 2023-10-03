import { useMutation, useQuery } from '@apollo/client';
import Card from '@components/common/card';
import { SaveIcon } from '@components/icons/save-icon';
import Button from '@components/ui/button';
import Description from '@components/ui/description';
import Input from '@components/ui/input';
import Label from '@components/ui/label';
import Select from '@components/ui/select/select';
import { ATTRIBUTES_FOR_SELECT } from '@graphql/attribute';
import { UPDATE_SIMPLE_PRODUCT_INFORMATION } from '@graphql/product';
import { useErrorLogger } from '@hooks/useErrorLogger';
import { useGetUser } from '@hooks/useGetUser';
import { useSettings } from '@hooks/useSettings';
import { notify } from '@lib/notify';
import { OrderBy, SortOrder } from '@ts-types/enums';
import { Attribute, LanguageType, Product } from '@ts-types/generated';
import isEmpty from 'lodash/isEmpty';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import React, { ChangeEvent, memo, useState } from 'react';

import { Actions, useFormReducer } from '../context/form.context';

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
  useErrorLogger(error);

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

  const { salePrice, comparePrice, buyingPrice, quantity, sku } = state;

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
        sku
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
    return;
    // dispatch({
    //   type: Actions.APPEND_VARIATION,
    //   payload: {
    //     value: { id: nanoid(), attribute: attributes[0], selectedValues: [] }
    //   }
    // });
  };

  const { attributes = [] } = data ?? {};

  return (
    <div className="my-5 flex flex-wrap pb-8 sm:my-8">
      <Description
        details={`${
          initProductInformation
            ? t('form:item-description-edit')
            : t('form:item-description-add')
        } ${t('form:form-description-simple-product-info')}`}
        className="w-full px-0 pb-5 sm:w-4/12 sm:py-8 sm:pe-4 md:w-1/3 md:pe-5"
      />

      <Card className="w-full sm:w-8/12 md:w-2/3">
        <Input
          label={`${t('form:input-label-sale-price')} (${
            systemCurrency.symbol
          })`}
          isRequiredLabel
          name="salePrice"
          value={salePrice}
          onChange={handleChange}
          onBlur={checkForUpdateHandler}
          type="number"
          // error={t(errors.salePrice?.message!)}
          variant="outline"
          className="mb-5"
        />
        <Input
          label={`${t(
            'form:input-label-compare-price'
          )} (${systemCurrency?.symbol})`}
          name="comparePrice"
          value={comparePrice}
          onChange={handleChange}
          onBlur={checkForUpdateHandler}
          type="number"
          // error={t(errors.comparePrice?.message!)}
          variant="outline"
          className="mb-5"
        />
        <Input
          label={`${t(
            'form:input-label-buying-price'
          )} (${systemCurrency?.symbol})`}
          name="buyingPrice"
          value={buyingPrice}
          onChange={handleChange}
          onBlur={checkForUpdateHandler}
          type="number"
          // error={t(errors.buyingPrice?.message!)}
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

          <div className="border-b border-dashed border-border-200 last:border-0">
            <div className="flex items-center justify-end">
              <button
                // onClick={remove}
                type="button"
                className="text-sm text-red-500 transition-colors
            duration-200 hover:text-red-700 focus:outline-none"
              >
                {t('form:button-label-remove')}
              </button>
            </div>

            <div className="grid grid-cols-fit gap-5">
              <div className="mt-5">
                <Label isRequiredLabel>
                  {t('form:input-label-attribute-name')}
                </Label>
                <Select
                  value={{}}
                  getOptionLabel={(option: any) => option.name}
                  getOptionValue={(option: any) => option.id}
                  isLoading={loading}
                  closeMenuOnSelect
                  hideSelectedOptions
                  options={[]}
                  // onChange={changeAttribute}
                  // onBlur={updateHandler}
                />
              </div>

              <div className="col-span-2 mt-5">
                <Label isRequiredLabel>
                  {t('form:input-label-attribute-value')}
                </Label>
                <Select
                  value={{}}
                  getOptionLabel={(option: any) => option.value}
                  getOptionValue={(option: any) => option.id}
                  isLoading={loading}
                  closeMenuOnSelect
                  hideSelectedOptions
                  options={[]}
                  // onChange={changeValues}
                  // onBlur={updateHandler}
                />
              </div>
            </div>
          </div>
          {/* ------------- */}
          <div className="mt-12 pb-5">
            <Button
              // disabled={variations.length === attributes?.length}
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
