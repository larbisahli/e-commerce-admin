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
import { OrderBy, Shipping } from '@ts-types/generated';
import { useTranslation } from 'next-i18next';
import { Control, useFieldArray, useFormContext } from 'react-hook-form';

import ShippingsComponent from './shippings-component';

type IProps = {
  control: Control<any>;
  initialValues: any;
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

export default function ProductShippingOptionsForm({
  control,
  initialValues
}: IProps) {
  const { t } = useTranslation();

  const {
    register,
    formState: { errors }
  } = useFormContext();

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'shippings',
    keyName: 'key'
  });

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

  const shippings = data?.shippingsSelectForAdmin;

  useErrorLogger(error);

  return (
    <div className="flex flex-wrap my-5 sm:my-8">
      <Description
        title={t('form:form-title-product-shipping-options')}
        details={`${
          initialValues
            ? t('form:item-description-edit')
            : t('form:item-description-add')
        } ${t('form:form-description-simple-product-info')}`}
        className="w-full px-0 sm:pe-4 md:pe-5 pb-5 sm:w-4/12 md:w-1/3 sm:py-8"
      />

      <Card className="w-full sm:w-8/12 md:w-2/3">
        {/* Width */}
        <Label>{t('form:input-label-weight')}</Label>
        <div className="flex items-center mb-5">
          <Input
            {...register('product_shipping_options.weight')}
            type="number"
            variant="outline"
            className="mr-2"
          />
          <div className="w-36">
            <SelectInput
              name="product_shipping_options.weight_unit"
              control={control}
              getOptionLabel={(option: any) => option.unit}
              getOptionValue={(option: any) => option.unit}
              options={weight_units}
              className="w-full"
            />
          </div>
        </div>
        <ValidationError
          message={t(errors.product_shipping_options?.weight?.message!)}
        />
        {/* Volume */}
        <Label>{t('form:input-label-volume')}</Label>
        <div className="flex items-center mb-5">
          <Input
            {...register('product_shipping_options.volume')}
            type="number"
            variant="outline"
            className="mr-2"
          />
          <div className="w-36">
            <SelectInput
              name={'product_shipping_options.volume_unit'}
              control={control}
              className="w-full"
              getOptionLabel={(option: any) => option.unit}
              getOptionValue={(option: any) => option.unit}
              options={volume_units}
            />
          </div>
        </div>
        <ValidationError
          message={t(errors.product_shipping_options?.volume?.message!)}
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
              {...register('product_shipping_options.dimension_width')}
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
              {...register('product_shipping_options.dimension_height')}
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
              {...register('product_shipping_options.dimension_depth')}
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
              name="product_shipping_options.dimension_unit"
              control={control}
              className="w-full"
              getOptionLabel={(option: any) => option.unit}
              getOptionValue={(option: any) => option.unit}
              options={dimension_units}
            />
          </div>
          <ValidationError
            message={
              t(errors.product_shipping_options?.dimension_depth?.message!) ||
              t(errors.product_shipping_options?.dimension_height?.message!) ||
              t(errors.product_shipping_options?.dimension_width?.message!)
            }
          />
        </div>
        {/* Shippings */}
        <div>
          <Label>{t('form:input-label-shippings')}</Label>
          <div>
            {fields.map((item, index) => {
              return (
                <ShippingsComponent
                  control={control}
                  key={index}
                  item={item}
                  index={index}
                  shippings={shippings}
                  loading={loading}
                  remove={remove}
                />
              );
            })}
            <Button
              type="button"
              onClick={() =>
                append({
                  shipping_provider: {},
                  shipping_zones: [
                    {
                      zones: [{ name: 'Global', code: 'Global' }],
                      shipping_price: 0
                    }
                  ]
                })
              }
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
