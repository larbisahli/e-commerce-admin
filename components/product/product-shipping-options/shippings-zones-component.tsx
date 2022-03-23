import Button from '@components/ui/button';
import Input from '@components/ui/input';
import Label from '@components/ui/label';
import Select from '@components/ui/select/select';
import { useSettings } from '@contexts/settings.context';
import { isEmpty } from 'lodash';
import { useTranslation } from 'next-i18next';
import { useEffect, useState } from 'react';
import { Control, useFieldArray, useFormContext } from 'react-hook-form';

interface SZProps {
  control: Control<any>;
  index: number;
}

const ShippingsZonesComponent = ({
  control,
  index: firstLevelIndex
}: SZProps) => {
  const { t } = useTranslation();

  // eslint-disable-next-line no-unused-vars
  const [deletedIndex, setDeletedIndex] = useState<number | null>(null);
  const [countries, setCountries] = useState([]);
  const [loadingCountries, setLoadingCountries] = useState(false);

  const { register, watch, setValue } = useFormContext();

  const { fields, append, remove } = useFieldArray({
    shouldUnregister: true,
    control,
    name: `shippings[${firstLevelIndex}].shipping_zones`
  });

  // const value = watch(`shippings[${index}].shipping_zones[${index}].zones`);

  // console.log('value :>> ', value);

  // Get Countries
  useEffect(() => {
    async function getCountries() {
      setLoadingCountries(true);
      const { Countries } = await import('@utils/countries');
      setCountries(Countries);
      setLoadingCountries(false);
    }
    getCountries();
  }, []);

  const removeShippingsZone = (item, index) => {
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

  const { currency } = useSettings();

  return (
    <div>
      {fields.map((item, index) => {
        const shipping_price = watch(
          `shippings[${firstLevelIndex}].shipping_zones[${index}].shipping_price`
        );
        const zones = watch(
          `shippings[${firstLevelIndex}].shipping_zones[${index}].zones`
        );
        return (
          <div
            key={index}
            className="border-b border-dashed border-border-200 last:border-0 py-5 md:py-8"
          >
            <div className="flex justify-between">
              <div
                style={{
                  borderTopLeftRadius: '5px',
                  borderBottomLeftRadius: '5px',
                  borderRightColor: 'transparent'
                }}
                className="flex justify-between w-full flex-wrap border-border-200 border-solid border p-2"
              >
                <div className="w-full mb-5 mr-3">
                  <Label style={{ color: '#929191', fontSize: '0.8rem' }}>
                    {t('form:input-label-shipping-zones')}
                  </Label>
                  <Select
                    onChange={(value) => {
                      setValue(
                        `shippings[${firstLevelIndex}].shipping_zones[${index}].zones`,
                        value
                      );
                    }}
                    value={isEmpty(zones) ? null : zones}
                    // value={(item as any).zones}
                    // name={}
                    // control={control}
                    className="w-full"
                    isMulti={true}
                    getOptionLabel={(option: any) => option.name}
                    getOptionValue={(option: any) => option.code}
                    options={countries}
                    isLoading={loadingCountries}
                  />
                </div>
                <div>
                  <Label style={{ color: '#929191', fontSize: '0.8rem' }}>
                    {`${t('form:input-label-shipping-price')} (${currency})`}
                    {shipping_price <= 0 && (
                      <span className="border border-solid border-gray-200 rounded-full shadow mx-3 py px-4 bg-gray-100 font-bold">
                        Free Shipping
                      </span>
                    )}
                  </Label>
                  <Input
                    {...register(
                      `shippings[${firstLevelIndex}].shipping_zones[${index}].shipping_price` as const
                    )}
                    type="number"
                    min={0}
                    variant="outline"
                    className="w-36"
                  />
                </div>
              </div>

              <button
                onClick={() => removeShippingsZone(item, index)}
                type="button"
                style={{
                  borderTopRightRadius: '5px',
                  borderBottomRightRadius: '5px'
                }}
                className="transition-colors duration-200 focus:outline-none sm:col-span-1 text-red-500 p-2 flex justify-center items-center text-base border border-solid border-red-500 hover:bg-red-700 hover:text-white"
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
      })}
      <Button
        type="button"
        onClick={() => append({ zones: [], shipping_price: 0 })}
        className="w-full sm:w-auto mt-5"
      >
        {t('form:button-label-add-shipping-zone')}
      </Button>
    </div>
  );
};

export default ShippingsZonesComponent;
