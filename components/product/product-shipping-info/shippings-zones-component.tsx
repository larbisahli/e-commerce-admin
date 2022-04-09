import Input from '@components/ui/input';
import Label from '@components/ui/label';
import { useSettings } from '@contexts/settings.context';
import isArray from 'lodash/isArray';
import isEmpty from 'lodash/isEmpty';
import { useTranslation } from 'next-i18next';
import { useEffect, memo, useState } from 'react';
import { Control, useFormContext } from 'react-hook-form';
import SelectInput from '@components/ui/select-input';

interface SZProps {
  control: Control<any>;
  index: number;
}

const ShippingsZonesComponent = ({ control, index }: SZProps) => {
  const { t } = useTranslation();

  const [countries, setCountries] = useState([]);
  const [loadingCountries, setLoadingCountries] = useState(false);

  const { register, watch, setValue } = useFormContext();

  const { currency } = useSettings();

  const zones = watch(`shippings[${index}].shipping_zones.zones`) as {
    name: string;
    code: string;
  };

  const shipping_price = watch(
    `shippings[${index}].shipping_zones.shipping_price`
  ) as number;

  // Add global when zone is empty
  useEffect(() => {
    if (isEmpty(zones)) {
      setValue(`shippings[${index}].shipping_zones.zones`, [
        { name: 'Global', code: 'Global' }
      ]);
    }
  }, [zones]);

  // remove global when we have at least one country
  useEffect(() => {
    if (
      isArray(zones) &&
      zones?.length >= 2 &&
      !isEmpty(zones?.find((a) => a.code === 'Global'))
    ) {
      setValue(
        `shippings[${index}].shipping_zones.zones`,
        zones?.filter((a) => a.code !== 'Global')
      );
    } else {
      setValue(`shippings[${index}].shipping_zones.zones`, zones);
    }
  }, [zones]);

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
    <div className="border-b border-dashed border-border-200 last:border-0 py-5 md:py-8">
      <div className="flex justify-between">
        <div
          style={{
            borderTopLeftRadius: '5px',
            borderBottomLeftRadius: '5px',
            borderRightColor: index === 0 ? null : 'transparent'
          }}
          className="flex justify-between w-full flex-wrap border-border-200 border-solid border p-2"
        >
          <input
            {...register(`shippings[${index}].shipping_zones.id`)}
            type="hidden"
          />
          <div className="w-full mb-5 mr-3">
            <Label style={{ color: '#929191', fontSize: '0.8rem' }}>
              {t('form:input-label-shipping-zones')}
            </Label>

            <SelectInput
              name={`shippings[${index}].shipping_zones.zones`}
              control={control}
              value={zones}
              // defaultValue={zones}
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
              {...register(`shippings[${index}].shipping_zones.shipping_price`)}
              type="number"
              min={0}
              variant="outline"
              className="w-36"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(ShippingsZonesComponent);
