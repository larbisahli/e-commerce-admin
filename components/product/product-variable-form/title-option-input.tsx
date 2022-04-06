import type {
  UseFormRegister,
  UseFormSetValue,
  FieldValues
} from 'react-hook-form';
import React, { useEffect, useMemo, memo } from 'react';

interface CartesianType {
  id: string;
  attribute_name: string;
  attribute_value: string;
}

interface TitleAndOptionsInputProps {
  fieldAttributeValue: CartesianType[];
  index: number;
  setValue: UseFormSetValue<FieldValues>;
  register: UseFormRegister<FieldValues>;
}

const TitleAndOptionsInput = ({
  fieldAttributeValue,
  index,
  setValue,
  register
}: TitleAndOptionsInputProps) => {
  const title = useMemo(
    () =>
      Array.isArray(fieldAttributeValue)
        ? fieldAttributeValue.map((a) => a?.attribute_value).join('/')
        : (fieldAttributeValue as { attribute_value: string })?.attribute_value,
    [fieldAttributeValue]
  );

  const options = useMemo(
    () =>
      Array.isArray(fieldAttributeValue)
        ? fieldAttributeValue?.map((av) => av.id)
        : [(fieldAttributeValue as CartesianType).id],
    [fieldAttributeValue]
  );

  useEffect(() => {
    setValue(`variation_options.${index}.title`, title);
    setValue(`variation_options.${index}.options`, options);
  }, [fieldAttributeValue]);

  return (
    <>
      <input {...register(`variation_options.${index}.title`)} type="hidden" />
      <input
        {...register(`variation_options.${index}.options`)}
        type="hidden"
      />
    </>
  );
};

export default memo(TitleAndOptionsInput);
