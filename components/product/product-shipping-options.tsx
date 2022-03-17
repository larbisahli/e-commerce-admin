import Card from '@components/common/card';
import Button from '@components/ui/button';
import Description from '@components/ui/description';
import Input from '@components/ui/input';
import Label from '@components/ui/label';
import SelectInput from '@components/ui/select-input';
import { useTranslation } from 'next-i18next';
import { Control, useFieldArray, useFormContext } from 'react-hook-form';

type IProps = {
  control: Control<any>;
  initialValues: any;
};

const weight_units = [{ unit: 'kg' }, { unit: 'g' }, { unit: 't' }];

const volume_units = [{ unit: 'l' }, { unit: 'ml' }];

const dimension_units = [{ unit: 'l' }, { unit: 'ml' }];

export default function ProductShippingOptionsForm({
  control,
  initialValues
}: IProps) {
  const {
    register,
    formState: { errors }
  } = useFormContext();
  const { t } = useTranslation();

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'shippings',
    keyName: 'key'
  });

  const removeAttributeValue = (item: AttributeValue, index: number) => {
    // setDeletedIndex(index);
    // if (item?.id) {
    //   deleteAttributeValue({
    //     variables: { id: item?.id },
    //     onCompleted: (data: { deleteAttributeValue: AttributeValue }) => {
    //       const attribute_value = data?.deleteAttributeValue?.attribute_value;
    //       if (!isEmpty(attribute_value)) {
    //         notify(t('common:successfully-deleted'), 'success');
    //         remove(index);
    //       }
    //     }
    //   });
    // } else {
    //   remove(index);
    // }
  };

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
        <Label>{t('form:input-label-width')}</Label>
        <div className="flex items-center mb-5">
          <Input
            {...register('width')}
            type="number"
            error={t(errors.width?.message!)}
            variant="outline"
            className="mr-2"
          />
          <div className="w-36">
            <SelectInput
              name="weight_unit"
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
            {...register('volume')}
            type="number"
            error={t(errors.volume?.message!)}
            variant="outline"
            className="mr-2"
          />
          <div className="w-36">
            <SelectInput
              name="volume_unit"
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
              {...register('dimension_width')}
              type="number"
              error={t(errors.dimension_width?.message!)}
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
              {...register('dimension_height')}
              type="number"
              error={t(errors.dimension_height?.message!)}
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
              {...register('dimension_depth')}
              type="number"
              error={t(errors.dimension_depth?.message!)}
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
              name="dimension_unit"
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
            {fields.map((item, index) => (
              <div
                className="border-b border-dashed border-border-200 last:border-0 py-5 md:py-8"
                key={index}
              >
                <div className="flex justify-between">
                  <div style={{ minWidth: '150px', marginRight: '5px' }}>
                    <Label style={{ color: '#929191', fontSize: '0.8rem' }}>
                      {t('form:input-label-shipping-provider')}
                    </Label>
                    <SelectInput
                      name="shipping_provider"
                      control={control}
                      className="w-full"
                      getOptionLabel={(option: any) => option.unit}
                      getOptionValue={(option: any) => option.unit}
                      options={dimension_units}
                      // isLoading={loading}
                    />
                  </div>
                  <div>
                    <Label style={{ color: '#929191', fontSize: '0.8rem' }}>
                      {t('form:input-label-shipping-price')}
                    </Label>
                    <Input
                      {...register('shipping_price')}
                      type="number"
                      error={t(errors.shipping_price?.message!)}
                      variant="outline"
                      className="mr-2"
                    />
                  </div>

                  <button
                    onClick={() => removeAttributeValue(item, index)}
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
            ))}
            <Button
              type="button"
              onClick={() => append({ attribute_value: '', color: '' })}
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
