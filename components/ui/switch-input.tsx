import { Switch } from '@headlessui/react';
import cn from 'classnames';
import { useTranslation } from 'next-i18next';
import { Controller } from 'react-hook-form';

import ValidationError from './form-validation-error';

interface Props {
  control: any;
  errors?: any;
  label: string;
  name: string;
  labelClassName?: string;
  size?: 'small' | 'large';
}

const SwitchInput = ({
  control,
  label,
  name,
  errors,
  labelClassName,
  size = 'small'
}: Props) => {
  const { t } = useTranslation();
  return (
    <div className="flex items-center">
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value } }) => (
          <Switch
            checked={value}
            onChange={onChange}
            className={cn(
              size === 'large' && 'h-[25px] w-[50px]',
              size === 'small' && 'h-4 w-7',
              'relative inline-flex items-center rounded-full border',
              value ? 'bg-blue-500' : 'bg-gray-300'
            )}
          >
            <span className="sr-only">Enable {label}</span>
            <span
              className={cn(
                'translate-x-0',
                size === 'large' && 'h-[25px] w-[25px]',
                size === 'small' && 'h-3 w-3',
                size === 'large' && value && '!translate-x-6',
                size === 'small' && value && '!translate-x-3',
                'inline-block transform rounded-full border bg-light'
              )}
            />
          </Switch>
        )}
      />
      <div
        className={cn(
          'ml-2 block text-sm font-medium leading-none text-gray-600',
          labelClassName
        )}
      >
        {label}
      </div>
      <ValidationError message={t(errors?.[name]?.message)} />
    </div>
  );
};

export default SwitchInput;
