import { useMutation } from '@apollo/client';
import Card from '@components/common/card';
import { SaveIcon } from '@components/icons/save-icon';
import Accordion from '@components/ui/accordion';
import Button from '@components/ui/button';
import Description from '@components/ui/description';
import Input from '@components/ui/input';
import Label from '@components/ui/label';
import Select from '@components/ui/select/select';
import { UPDATE_PRODUCT_SHIPPING_INFO } from '@graphql/product';
import { useErrorLogger } from '@hooks/useErrorLogger';
import { useGetUser } from '@hooks/useGetUser';
import { notify } from '@lib/notify';
import { Nullable } from '@ts-types/custom.types';
import { Product, ProductType } from '@ts-types/generated';
import isEmpty from 'lodash/isEmpty';
import isEqual from 'lodash/isEqual';
import { useTranslation } from 'next-i18next';
import React, {
  ChangeEvent,
  memo,
  useCallback,
  useEffect,
  useState
} from 'react';

import { Actions, useFormReducer } from '../context/form.context';

type Props = {
  initialValues: Nullable<Product>;
  productType: ProductType;
  state: {
    id: number;
    productShippingInfo: Product['productShippingInfo'];
    isUpdateMode: boolean;
  };
};

const weightUnits = [{ unit: 'kg' }, { unit: 'g' }];

const dimensionUnits = [{ unit: 'cm' }, { unit: 'mm' }];

function ProductShippingInfoForm({ state, productType, initialValues }: Props) {
  const { t } = useTranslation();

  const [initProductShippingInfo, setInitProductShippingInfo] = useState<
    Product['productShippingInfo']
  >(() => initialValues?.productShippingInfo);

  const [error, setError] = useState(null);
  useErrorLogger(error);

  const { userInfo } = useGetUser();
  const csrfToken = userInfo?.csrfToken;

  const [updateProductShippingInfo, { loading }] = useMutation(
    UPDATE_PRODUCT_SHIPPING_INFO,
    {
      context: {
        headers: {
          'x-csrf-token': csrfToken
        }
      },
      onCompleted: (data: { updateProductShippingInfo: Product }) => {
        if (!isEmpty(data?.updateProductShippingInfo)) {
          setInitProductShippingInfo(
            data?.updateProductShippingInfo?.productShippingInfo
          );
          notify(t('common:successfully-updated'), 'success');
        }
      }
    }
  );

  const {
    id,
    productShippingInfo: {
      weight,
      weightUnit,
      dimensionWidth,
      dimensionHeight,
      dimensionLength,
      dimensionUnit
    },
    isUpdateMode
  } = state;

  const dispatch = useFormReducer();

  const [isUpdated, setIsUpdated] = useState(false);

  const checkForUpdateHandler = useCallback(() => {
    if (!isUpdateMode) return;

    const productShippingInfo = initProductShippingInfo;
    const initialProductShippingInfo = {
      weight: productShippingInfo.weight,
      weightUnit: productShippingInfo.weightUnit,
      dimensionWidth: productShippingInfo.dimensionWidth,
      dimensionHeight: productShippingInfo.dimensionHeight,
      dimensionLength: productShippingInfo.dimensionLength,
      dimensionUnit: productShippingInfo.dimensionUnit
    };
    const currentProductShippingInfo = {
      weight,
      weightUnit,
      dimensionWidth,
      dimensionHeight,
      dimensionLength,
      dimensionUnit
    };

    setIsUpdated(
      !isEqual(initialProductShippingInfo, currentProductShippingInfo)
    );
  }, [
    dimensionLength,
    dimensionHeight,
    dimensionUnit,
    dimensionWidth,
    initProductShippingInfo,
    isUpdateMode,
    weight,
    weightUnit
  ]);

  useEffect(() => {
    if (!isEmpty(initProductShippingInfo)) {
      checkForUpdateHandler();
    }
  }, [checkForUpdateHandler, initProductShippingInfo]);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateProductShippingInfo({
      variables: {
        id,
        productShippingInfo: {
          weight,
          weightUnit,
          dimensionWidth,
          dimensionHeight,
          dimensionLength,
          dimensionUnit
        }
      }
    }).catch((err) => {
      setError(err);
    });
  };

  const renderSaveButton = () => {
    if (isUpdated) {
      return (
        <div className="mt-12 flex justify-end border-t pt-4">
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

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    const inputValue = Number(value) < 0 ? 0 : Number(value);

    dispatch({
      type: Actions.PRODUCT_SHIPPING_INFO,
      payload: {
        field: name,
        value: inputValue
      }
    });
  };

  const onSelectChange = (value, field) => {
    dispatch({
      type: Actions.PRODUCT_SHIPPING_INFO,
      payload: {
        field,
        value
      }
    });
  };

  if (productType === ProductType.Variable) {
    return null;
  }

  return (
    <Accordion
      isUpdated={isUpdated}
      Title={() => t('form:form-title-measures-packaging')}
    >
      <div className="my-5 flex flex-wrap sm:my-8">
        <Description
          details={`${
            initialValues
              ? t('form:item-description-edit')
              : t('form:item-description-add')
          } ${t('form:form-description-simple-product-info')}`}
          // Enter the dimensions and weight of this product to help calculate shipping rate. These measurements are for the product's shipping container. They are used to help calculate shipping price and do not show up on your storefront.
          className="w-full px-0 pb-5 sm:w-1/4 sm:py-8 sm:pe-4 md:w-1/4 md:pe-5"
        />

        <Card className="sm:w-3/4 md:w-3/4">
          <div className="flex w-full flex-wrap items-center ">
            <div className="flex items-center">
              {/* Width */}
              <div className="mr-2 mb-5 flex items-center">
                <div>
                  <Label>{t('form:input-label-weight')}</Label>
                  <div className="mr-2 flex items-center justify-center rounded-sm bg-gray-100">
                    <Input
                      name="weight"
                      value={weight}
                      onChange={handleChange}
                      onBlur={checkForUpdateHandler}
                      type="number"
                      variant="outline"
                      className="w-40"
                      min={0}
                      placeholder="e.g. 0.4..."
                      renderLabel={<>{weightUnit?.unit}</>}
                    />
                  </div>
                </div>
                <div className="w-22">
                  <Label>{t('form:input-label-dimensions-units')}</Label>
                  <Select
                    options={weightUnits}
                    value={weightUnit}
                    name="weightUnit"
                    getOptionLabel={(option: any) => option.unit}
                    getOptionValue={(option: any) =>
                      option.unit?.charAt(0)?.toUpperCase() +
                      option.unit?.slice(1)
                    }
                    onBlur={checkForUpdateHandler}
                    onChange={(value) => onSelectChange(value, 'weightUnit')}
                    className="w-full"
                  />
                </div>
              </div>
            </div>
            {/* Dimensions */}
            <div className="mb-5 flex flex-wrap items-center">
              <div className="my-2">
                <Label>{t('form:input-label-dimensions-width')}</Label>
                <div className="mr-2 flex items-center justify-center rounded-sm bg-gray-100">
                  <Input
                    name="dimensionWidth"
                    value={dimensionWidth}
                    onChange={handleChange}
                    onBlur={checkForUpdateHandler}
                    type="number"
                    variant="outline"
                    className="w-40"
                    min={0}
                    placeholder="e.g. 500..."
                    renderLabel={<>{dimensionUnit?.unit}</>}
                  />
                </div>
              </div>
              <div className="my-2">
                <Label>{t('form:input-label-dimensions-height')}</Label>
                <div className="mr-2 flex items-center justify-center rounded-sm bg-gray-100">
                  <Input
                    name="dimensionHeight"
                    value={dimensionHeight}
                    onChange={handleChange}
                    onBlur={checkForUpdateHandler}
                    type="number"
                    variant="outline"
                    min={0}
                    className="w-40"
                    placeholder="e.g. 200..."
                    renderLabel={<>{dimensionUnit?.unit}</>}
                  />
                </div>
              </div>
              <div className="my-2">
                <Label>{t('form:input-label-dimensions-length')}</Label>
                <div className="rounded-sm0 mr-2 flex items-center justify-center bg-gray-100">
                  <Input
                    name="dimensionLength"
                    value={dimensionLength}
                    onChange={handleChange}
                    onBlur={checkForUpdateHandler}
                    type="number"
                    variant="outline"
                    className="w-40"
                    placeholder="e.g. 100..."
                    min={0}
                    renderLabel={<>{dimensionUnit?.unit}</>}
                  />
                </div>
              </div>
              <div className="my-2 w-24">
                <Label>{t('form:input-label-dimensions-units')}</Label>
                <Select
                  options={dimensionUnits}
                  value={dimensionUnit}
                  name="dimensionUnit"
                  getOptionLabel={(option: any) => option.unit}
                  getOptionValue={(option: any) =>
                    option.unit?.charAt(0)?.toUpperCase() +
                    option.unit?.slice(1)
                  }
                  onBlur={checkForUpdateHandler}
                  onChange={(value) => onSelectChange(value, 'dimensionUnit')}
                  className="w-full"
                />
              </div>
            </div>
          </div>
          {renderSaveButton()}
        </Card>
      </div>
    </Accordion>
  );
}

export default memo(ProductShippingInfoForm);
