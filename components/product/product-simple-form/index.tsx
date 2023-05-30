import { useMutation } from '@apollo/client';
import Card from '@components/common/card';
import { SaveIcon } from '@components/icons/save-icon';
import Button from '@components/ui/button';
import Description from '@components/ui/description';
import Input from '@components/ui/input';
import { UPDATE_SIMPLE_PRODUCT_INFORMATION } from '@graphql/product';
import { useErrorLogger } from '@hooks/useErrorLogger';
import { useGetUser } from '@hooks/useGetUser';
import { useSettings } from '@hooks/useSettings';
import { notify } from '@lib/notify';
import { Product } from '@ts-types/generated';
import isEmpty from 'lodash/isEmpty';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import React, { ChangeEvent, memo, useState } from 'react';

import { Actions, useFormReducer } from '../context/form.context';

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

  const { currency } = useSettings();
  const dispatch = useFormReducer();

  const { userInfo } = useGetUser();
  const csrfToken = userInfo?.csrfToken;

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
    // if (name.length === 0) {
    //   return notify('Product name should not be empty', 'error');
    // }
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

  return (
    <div className="flex flex-wrap pb-8 my-5 sm:my-8">
      <Description
        details={`${
          initProductInformation
            ? t('form:item-description-edit')
            : t('form:item-description-add')
        } ${t('form:form-description-simple-product-info')}`}
        className="w-full px-0 sm:pe-4 md:pe-5 pb-5 sm:w-4/12 md:w-1/3 sm:py-8"
      />

      <Card className="w-full sm:w-8/12 md:w-2/3">
        <Input
          label={`${t('form:input-label-sale-price')} (${currency.symbol})`}
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
          label={`${t('form:input-label-compare-price')} (${currency.symbol})`}
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
          label={`${t('form:input-label-buying-price')} (${currency.symbol})`}
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
          placeholder="LEV-JN-BL-WM"
          // error={t(errors.sku?.message!)}
          variant="outline"
          className="mb-5"
        />
        {renderSaveButton()}
      </Card>
    </div>
  );
}

export default memo(ProductSimpleForm);
