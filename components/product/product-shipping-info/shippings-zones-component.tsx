import Button from '@components/ui/button';
import Input from '@components/ui/input';
import Label from '@components/ui/label';
import Select from '@components/ui/select/select';
import { useSettings } from '@contexts/settings.context';
import isArray from 'lodash/isArray';
import isEmpty from 'lodash/isEmpty';
import { useTranslation } from 'next-i18next';
import { useEffect, memo, useMemo, useState } from 'react';
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

  const [countries, setCountries] = useState([]);
  const [loadingCountries, setLoadingCountries] = useState(false);

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

  return (
    <div>
      {fields.map((item, index) => {
        return (
          <ZonesComponent
            key={index}
            firstLevelIndex={firstLevelIndex}
            item={item}
            index={index}
            remove={remove}
            countries={countries}
            loadingCountries={loadingCountries}
          />
        );
      })}
      <Button
        type="button"
        onClick={() =>
          append({
            zones: [{ name: 'Global', code: 'Global' }],
            shipping_price: 0
          })
        }
        className="w-full sm:w-auto mt-5"
      >
        {t('form:button-label-add-shipping-zone')}
      </Button>
    </div>
  );
};

interface ZoneProps {
  firstLevelIndex: number;
  index: number;
  item: any;
  countries: { name: string; code: string }[];
  // eslint-disable-next-line no-unused-vars
  remove: (index?: number | number[]) => void;
  loadingCountries: boolean;
}

const ZonesComponent = ({
  firstLevelIndex,
  item,
  index,
  countries,
  remove,
  loadingCountries
}: ZoneProps) => {
  const { t } = useTranslation();

  const [deletedIndex, setDeletedIndex] = useState<number | null>(null);

  const { register, watch, setValue } = useFormContext();
  const { currency } = useSettings();

  const shipping_price = watch(
    `shippings[${firstLevelIndex}].shipping_zones[${index}].shipping_price`
  );

  const zones = watch(
    `shippings[${firstLevelIndex}].shipping_zones[${index}].zones`
  ) as { name: string; code: string }[];

  // Add global when zone is empty
  useEffect(() => {
    if (isEmpty(zones)) {
      setValue(`shippings[${firstLevelIndex}].shipping_zones[${index}].zones`, [
        { name: 'Global', code: 'Global' }
      ]);
    }
  }, [zones]);

  // remove global when we have at least one country
  useEffect(() => {
    if (
      isArray(zones) &&
      zones?.length >= 2 &&
      zones?.find((a) => a.code === 'Global')
    ) {
      setValue(
        `shippings[${firstLevelIndex}].shipping_zones[${index}].zones`,
        zones?.filter((a) => a.code !== 'Global')
      );
    }
  }, [zones]);

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
              className="w-full"
              isMulti
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
};

export default memo(ShippingsZonesComponent);
