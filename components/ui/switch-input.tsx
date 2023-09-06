import { Switch } from '@headlessui/react';
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
      <div className="mr-2 block text-sm font-semibold leading-none text-body-dark">
        {label}
      </div>
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value } }) => (
          <Switch
            checked={value}
            onChange={onChange}
            className={`${
              value ? 'bg-green-600' : 'bg-gray-200'
            } relative inline-flex h-6 w-11 items-center rounded-full`}
          >
            <span className="sr-only">Enable {label}</span>
            <span
              className={`${
                value ? 'translate-x-6' : 'translate-x-1'
              } inline-block h-4 w-4 transform rounded-full bg-light`}
            />
          </Switch>
        )}
      />
      <ValidationError message={t(errors?.[name]?.message)} />
    </div>
  );
};

export default SwitchInput;
