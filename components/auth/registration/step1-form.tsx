import RegisterCheckbox from '@components/ui/checkbox/register-checkbox';
import Input from '@components/ui/input';
import PasswordInput from '@components/ui/password-input';
import { useTranslation } from 'next-i18next';
import React from 'react';
import PasswordStrengthBar from 'react-password-strength-bar';

const Step1Form = ({ register, errors, password, setPasswordStrength }) => {
  const { t } = useTranslation();

  return (
    <div className="h-full">
      <div className="flex items-center justify-between">
        <Input
          {...register('firstName')}
          label={t('form:input-label-first-name')}
          variant="outline"
          className="mb-4 mr-2 w-full"
          error={t(errors?.firstName?.message!)}
        />
        <Input
          {...register('lastName')}
          label={t('form:input-label-last-name')}
          variant="outline"
          className="mb-4 ml-2 w-full"
          error={t(errors?.lastName?.message!)}
        />
      </div>
      <div className="mb-5">
        <Input
          {...register('email')}
          type="email"
          label={t('form:input-label-email')}
          variant="outline"
          className="mb-4 w-full"
          error={t(errors?.email?.message!)}
        />
      </div>
      <div className="mb-5">
        <PasswordInput
          {...register('password')}
          label={t('form:input-label-password')}
          variant="outline"
          className="mb-4 w-full"
          error={t(errors?.password?.message!)}
        />
        <PasswordStrengthBar
          onChangeScore={(score, feedback) => {
            setPasswordStrength({ score, feedback });
          }}
          className="mb-5"
          password={password}
          scoreWords={['Very weak', 'Weak', 'Good', 'Strong']}
        />
      </div>
      <div className="mb-5">
        <RegisterCheckbox
          {...register('acceptCondition')}
          label={''}
          className="font-medium"
          error={errors?.acceptCondition?.message}
        />
      </div>
    </div>
  );
};

export default Step1Form;
