import { useQuery } from '@apollo/client';
import Card from '@components/common/card';
import Button from '@components/ui/button';
import Description from '@components/ui/description';
import Input from '@components/ui/input';
import Label from '@components/ui/label';
import Select from '@components/ui/select/select';
import SelectInput from '@components/ui/select-input';
import { SHIPPINGS_FOR_SELECT } from '@graphql/shipping';
import { useErrorLogger } from '@hooks/useErrorLogger';
import { OrderBy, ProductShippings, Shipping } from '@ts-types/generated';
import { isEmpty } from 'lodash';
import { useTranslation } from 'next-i18next';
import { useState } from 'react';
import type {
  FieldValues,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch
} from 'react-hook-form';
import { Control, useFieldArray, useFormContext } from 'react-hook-form';

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
    setValue,
    watch,
    formState: { errors }
  } = useFormContext();

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'shippings',
    keyName: 'key'
  });

  console.log('fields :>> ', fields);

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
            error={t(errors.product_shipping_options?.weight?.message!)}
            variant="outline"
            className="mr-2"
          />
          <div className="w-36">
            <SelectInput
              name="product_shipping_options.weight_unit"
              control={control}
              getOptionLabel={(option: any) => option.unit}
              getOptionValue={(option: any) => option.unit}
              // @ts-ignore
              options={weight_units}
              className="w-full"
              // isLoading={loading}
            />
          </div>
        </div>
        {/* Volume */}
        <Label>{t('form:input-label-volume')}</Label>
        <div className="flex items-center mb-5">
          <Input
            {...register('product_shipping_options.volume')}
            type="number"
            error={t(errors.product_shipping_options?.volume?.message!)}
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
              // @ts-ignore
              options={volume_units}
              // isLoading={loading}
            />
          </div>
        </div>
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
              error={t(
                errors.product_shipping_options?.dimension_width?.message!
              )}
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
              error={t(
                errors.product_shipping_options?.dimension_height?.message!
              )}
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
              error={t(
                errors.product_shipping_options?.dimension_depth?.message!
              )}
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
              // isLoading={loading}
            />
          </div>
        </div>
        {/* Shippings */}
        <div>
          <Label>{t('form:input-label-shippings')}</Label>
          <div>
            {fields.map((item, index) => {
              console.log('item====>', { item, index });
              return (
                <ShippingsComponent
                  key={index}
                  item={item}
                  index={index}
                  setValue={setValue}
                  shippings={shippings}
                  loading={loading}
                  register={register}
                  remove={remove}
                  watch={watch}
                />
              );
            })}
            <Button
              type="button"
              onClick={() =>
                append({ shipping_provider: {}, shipping_price: 0 })
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

interface SCProps {
  item: ProductShippings;
  index: number;
  setValue: UseFormSetValue<FieldValues>;
  register: UseFormRegister<FieldValues>;
  // eslint-disable-next-line no-unused-vars
  remove: (index?: number | number[]) => void;
  watch: UseFormWatch<FieldValues>;
  shippings: Shipping[];
  loading: boolean;
}

const ShippingsComponent = ({
  item,
  index,
  setValue,
  shippings,
  loading,
  register,
  remove,
  watch
}: SCProps) => {
  const { t } = useTranslation();

  // eslint-disable-next-line no-unused-vars
  const [deletedIndex, setDeletedIndex] = useState<number | null>(null);

  const value = watch(`shippings[${index}].shipping_provider`);

  const removeAttributeValue = () => {
    setDeletedIndex(index);
    console.log('item', { item, index });
    if (item?.id) {
      // deleteAttributeValue({
      //   variables: { id: item?.id },
      //   onCompleted: (data: { deleteAttributeValue: AttributeValue }) => {
      //     const attribute_value = data?.deleteAttributeValue?.attribute_value;
      //     if (!isEmpty(attribute_value)) {
      //       notify(t('common:successfully-deleted'), 'success');
      //       remove(index);
      //     }
      //   }
      // });
      remove(index);
    } else {
      remove(index);
    }
  };

  return (
    <div className="border-b border-dashed border-border-200 last:border-0 py-5 md:py-8">
      <div className="flex justify-between">
        <div style={{ minWidth: '150px', marginRight: '5px' }}>
          <Label style={{ color: '#929191', fontSize: '0.8rem' }}>
            {t('form:input-label-shipping-provider')}
          </Label>
          <Select
            onChange={(value) => {
              setValue(`shippings[${index}].shipping_provider`, value);
            }}
            value={isEmpty(value) ? null : [value]}
            className="w-full"
            getOptionLabel={(option: any) => option.shipper_name}
            getOptionValue={(option: any) => option.id}
            options={shippings}
            isLoading={loading}
          />
        </div>
        <div>
          <Label style={{ color: '#929191', fontSize: '0.8rem' }}>
            {t('form:input-label-shipping-price')}
          </Label>
          <Input
            {...register(`shippings[${index}].shipping_price` as const)}
            type="number"
            variant="outline"
            className="mr-2"
          />
        </div>

        <button
          onClick={removeAttributeValue}
          type="button"
          className="text-sm text-red-500 hover:text-red-700 transition-colors duration-200 focus:outline-none sm:mt-4 sm:col-span-1"
        >
          {t('form:button-label-remove')}
          {/* {deleteAttributeLoading && deletedIndex === index && (
             <span
               className="absolute h-4 w-4 ms-2 rounded-full border-2 border-transparent border-t-2 animate-spin"
               style={{
                 borderTopColor: 'red'
               }}
             />
           )} */}
        </button>
      </div>
    </div>
  );
};
