import { useQuery } from '@apollo/client';
import Card from '@components/common/card';
import Button from '@components/ui/button';
import Description from '@components/ui/description';
import ValidationError from '@components/ui/form-validation-error';
import Input from '@components/ui/input';
import Label from '@components/ui/label';
import SelectInput from '@components/ui/select-input';
import { SHIPPINGS_FOR_SELECT } from '@graphql/shipping';
import { useErrorLogger } from '@hooks/useErrorLogger';
import {
  OrderBy,
  ProductShippings,
  Shipping,
  ShippingsActions
} from '@ts-types/generated';
import { nanoid } from 'nanoid';
import { useTranslation } from 'next-i18next';
import React, { memo } from 'react';
import { Control, useFormContext } from 'react-hook-form';

import ShippingsComponent from './shippings-component';

interface ShippingsAction {
  type: ShippingsActions;
  payload: {
    value?: any;
    field?: string;
    key?: string;
  };
}

type IProps = {
  control: Control<any>;
  initialValues: any;
  shippings: ProductShippings[];
  dispatchShippings: React.Dispatch<ShippingsAction>;
};

interface ShippingsSelect {
  shippingsSelectForAdmin: Shipping[];
}

interface OptionsVariable {
  page: number;
  limit: number;
  orderBy: OrderBy;
}

const weight_units = [{ unit: 'kg' }, { unit: 'g' }, { unit: 't' }];

const volume_units = [{ unit: 'L' }, { unit: 'mL' }];

const dimension_units = [{ unit: 'L' }, { unit: 'mL' }];

function ProductShippingInfoForm({
  control,
  initialValues,
  shippings,
  dispatchShippings
}: IProps) {
  const { t } = useTranslation();

  const {
    register,
    formState: { errors }
  } = useFormContext();

  console.log('Shippings', shippings);

  const { data, loading, error } = useQuery<ShippingsSelect, OptionsVariable>(
    SHIPPINGS_FOR_SELECT,
    {
      variables: {
        page: 1,
        limit: 999,
        orderBy: OrderBy.CREATED_AT
      },
      fetchPolicy: 'cache-and-network'
    }
  );

  const shippingProviders = data?.shippingsSelectForAdmin;

  useErrorLogger(error);

  const addShipping = () => {
    dispatchShippings({
      type: ShippingsActions.ADD_SHIPPING,
      payload: {
        value: {
          product_shipping_id: nanoid(10),
          shipping_provider: {},
          shipping_zones: [
            {
              id: nanoid(10),
              zones: [{ name: 'Global', code: 'Global' }],
              shipping_price: 0
            }
          ]
        }
      }
    });
  };

  return (
    <div className="flex flex-wrap my-5 sm:my-8">
      <Description
        title={t('form:form-title-product-shipping-info')}
        details={`${
          initialValues
            ? t('form:item-description-edit')
            : t('form:item-description-add')
        } ${t('form:form-description-simple-product-info')}`}
        className="w-full px-0 sm:pe-4 md:pe-5 pb-5 sm:w-4/12 md:w-1/3 sm:py-8"
      />

      <Card className="w-full sm:w-8/12 md:w-2/3">
        <input {...register(`product_shipping_info.id`)} type="hidden" />
        {/* Width */}
        <Label>{t('form:input-label-weight')}</Label>
        <div className="flex items-center mb-5">
          <Input
            {...register('product_shipping_info.weight')}
            type="number"
            variant="outline"
            className="mr-2"
          />
          <div className="w-36">
            <SelectInput
              name="product_shipping_info.weight_unit"
              control={control}
              getOptionLabel={(option: any) => option.unit}
              getOptionValue={(option: any) => option.unit}
              options={weight_units}
              className="w-full"
            />
          </div>
        </div>
        <ValidationError
          message={t(errors.product_shipping_info?.weight?.message!)}
        />
        {/* Volume */}
        <Label>{t('form:input-label-volume')}</Label>
        <div className="flex items-center mb-5">
          <Input
            {...register('product_shipping_info.volume')}
            type="number"
            variant="outline"
            className="mr-2"
          />
          <div className="w-36">
            <SelectInput
              name={'product_shipping_info.volume_unit'}
              control={control}
              className="w-full"
              getOptionLabel={(option: any) => option.unit}
              getOptionValue={(option: any) => option.unit}
              options={volume_units}
            />
          </div>
        </div>
        <ValidationError
          message={t(errors.product_shipping_info?.volume?.message!)}
        />
        {/* Dimensions */}
        <Label className="mb-3">{t('form:input-label-dimensions')}</Label>
        <div className="flex items-center mb-5 flex-wrap">
          <div>
            <Label
              style={{
                color: '#929191',
                fontSize: '0.8rem',
                marginTop: '0.75rem'
              }}
            >
              {t('form:input-label-dimensions-width')}
            </Label>
            <Input
              {...register('product_shipping_info.dimension_width')}
              type="number"
              variant="outline"
              className="w-24 mr-2"
            />
          </div>
          <div>
            <Label
              style={{
                color: '#929191',
                fontSize: '0.8rem',
                marginTop: '0.75rem'
              }}
            >
              {t('form:input-label-dimensions-height')}
            </Label>
            <Input
              {...register('product_shipping_info.dimension_height')}
              type="number"
              variant="outline"
              className="w-24 mr-2"
            />
          </div>
          <div>
            <Label
              style={{
                color: '#929191',
                fontSize: '0.8rem',
                marginTop: '0.75rem'
              }}
            >
              {t('form:input-label-dimensions-depth')}
            </Label>
            <Input
              {...register('product_shipping_info.dimension_depth')}
              type="number"
              variant="outline"
              className="w-24 mr-2"
            />
          </div>
          <div className="w-36">
            <Label
              style={{
                color: '#929191',
                fontSize: '0.8rem',
                marginTop: '0.75rem'
              }}
            >
              {t('form:input-label-dimensions-units')}
            </Label>
            <SelectInput
              name="product_shipping_info.dimension_unit"
              control={control}
              className="w-full"
              getOptionLabel={(option: any) => option.unit}
              getOptionValue={(option: any) => option.unit}
              options={dimension_units}
            />
          </div>
          <ValidationError
            message={
              t(errors.product_shipping_info?.dimension_depth?.message!) ||
              t(errors.product_shipping_info?.dimension_height?.message!) ||
              t(errors.product_shipping_info?.dimension_width?.message!)
            }
          />
        </div>

        {/* ********************** Shippings ********************** */}
        <div>
          <Label>{t('form:input-label-shippings')}</Label>
          <div>
            {shippings?.map((item) => {
              return (
                <ShippingsComponent
                  key={item?.product_shipping_id}
                  item={item}
                  shippingProviders={shippingProviders}
                  dispatchShippings={dispatchShippings}
                  loading={loading}
                />
              );
            })}
            <Button
              type="button"
              onClick={addShipping}
              className="w-full sm:w-auto"
            >
              {t('form:button-label-add-shipping')}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default memo(ProductShippingInfoForm);
