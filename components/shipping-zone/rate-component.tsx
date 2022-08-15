import { CloseIcon } from '@components/icons/close-icon';
import Checkbox from '@components/ui/checkbox';
import Input from '@components/ui/input';
import Label from '@components/ui/label';
import SelectInput from '@components/ui/select-input';
import { ShippingRateEnum, ShippingRateType } from '@ts-types/generated';
import { useTranslation } from 'next-i18next';

interface ZoneProps {
  item: ShippingRateType;
  register: any;
  control: any;
  fields: ShippingRateType[];
  remove: any;
  watch: any;
}

const weightUnits = [{ unit: 'kg' }, { unit: 'g' }];

const RateComponent = ({
  item,
  register,
  control,
  fields,
  remove,
  watch
}: ZoneProps) => {
  const { t } = useTranslation();

  const index = item?.index;

  const removeRateValue = () => {
    remove(index);
  };

  const hasNoMax = watch(`shippingRates.${index}.noMax`);
  const rateType = watch('shippingZone.rateType');

  return (
    <div className="relative border border-solid border-border-200 last:border-0 mt-4 rounded-md">
      <div className="border-b flex items-center justify-between py-2 px-4">
        <div className="text-green-700 text-sm font-medium">{`Rate #${
          index + 1
        }`}</div>
        {fields?.length - 1 === index && (
          <button
            onClick={removeRateValue}
            className="p-1 bg-red-500 text-white rounded-full hover:bg-red-400"
          >
            <CloseIcon width="1rem" height="1rem" />
          </button>
        )}
      </div>
      <input {...register(`shippingRates.${index}.id`)} type="hidden" />
      <input {...register(`shippingRates.${index}.index`)} type="hidden" />
      <div
        style={{ background: '#f9f9f958' }}
        className="border border-solid border-gray-200 p-2 m-4 rounded-md"
      >
        <div className="flex items-center">
          {rateType.type === ShippingRateEnum.Weight && (
            <div className="mr-2 min-w-fit">
              <Label>{t('form:input-label-unit')}</Label>
              <SelectInput
                name={`shippingRates.${index}.weightUnit`}
                control={control}
                className="w-full"
                getOptionLabel={(option: any) => option.unit}
                getOptionValue={(option: any) => option.unit}
                options={weightUnits}
              />
            </div>
          )}
          <Input
            className="sm:col-span-2 mr-2"
            label={`${t('form:input-label-min')} ${rateType.type}`}
            type="number"
            // disabled={true}
            min={0}
            step={0.1}
            variant="outline"
            {...register(`shippingRates.${index}.minValue` as const)}
          />
          <Input
            className="sm:col-span-2 mr-2"
            label={`${t('form:input-label-max')} ${rateType.type}`}
            type="number"
            min={0}
            step={0.1}
            disabled={hasNoMax}
            variant="outline"
            {...register(`shippingRates.${index}.maxValue` as const)}
          />
          <Input
            className="sm:col-span-2"
            label={t('form:input-label-price')}
            type="number"
            min={0}
            step={0.1}
            variant="outline"
            {...register(`shippingRates.${index}.price` as const)}
          />
        </div>
        <div className="mt-4">
          <Checkbox
            disabled={fields?.length - 1 > index}
            {...register(`shippingRates.${index}.noMax` as const)}
            className="mb-4"
            label={t('form:input-label-no-maximum')}
          />
        </div>
      </div>
    </div>
  );
};

export default RateComponent;
