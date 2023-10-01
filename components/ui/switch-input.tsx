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
}

const SwitchInput = ({ control, label, name, errors }: Props) => {
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
              'relative inline-flex h-4 w-7 items-center rounded-full border',
              value ? 'bg-blue-500' : 'bg-gray-300'
            )}
          >
            <span className="sr-only">Enable {label}</span>
            <span
              className={`${
                value ? 'translate-x-3' : 'translate-x-0'
              } inline-block h-3 w-3 transform rounded-full border bg-light`}
            />
          </Switch>
        )}
      />
      <div className="ml-2 block text-sm font-medium leading-none text-gray-600">
        {label}
      </div>
      <ValidationError message={t(errors?.[name]?.message)} />
    </div>
  );
};

export default SwitchInput;
