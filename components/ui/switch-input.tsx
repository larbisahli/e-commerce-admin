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
      <div className="block text-body-dark font-semibold text-sm leading-none mr-2">
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
            } relative inline-flex items-center h-6 rounded-full w-11`}
          >
            <span className="sr-only">Enable {label}</span>
            <span
              className={`${
                value ? 'translate-x-6' : 'translate-x-1'
              } inline-block w-4 h-4 transform bg-light rounded-full`}
            />
          </Switch>
        )}
      />
      <ValidationError message={t(errors?.[name]?.message)} />
    </div>
  );
};

export default SwitchInput;
