import Label from '@components/ui/label';
import SelectInput from '@components/ui/select-input';
import { isValidPhoneNumber } from 'libphonenumber-js';
import { isEmpty } from 'lodash';
import { useTranslation } from 'next-i18next';
import React from 'react';
import PhoneInput from 'react-phone-input-2';

const Step3Form = ({ control, setValue, countries, country, phoneNumber }) => {
  const { t } = useTranslation();

  return (
    <div className="mb-8 h-full">
      <div className="mb-5">
        <Label>{t('form:input-label-country')}</Label>
        <SelectInput
          name="country"
          control={control}
          getOptionLabel={(option: any) => option.name}
          getOptionValue={(option: any) => option.id}
          options={countries}
          isLoading={isEmpty(countries)}
        />
      </div>
      <div>
        <Label>{t('form:input-label-phone-number')}</Label>
        <PhoneInput
          country={country?.iso2?.toLowerCase()}
          inputProps={{
            name: 'phone',
            required: true,
            autoFocus: false
          }}
          disableSearchIcon
          enableSearch
          inputClass="phone-number-class py-5"
          value={`+${phoneNumber}`}
          isValid={(value, country: { dialCode: string }) => {
            if (country?.dialCode != value) {
              return isValidPhoneNumber(`+${value}`);
            }
            return true;
          }}
          onChange={(phone) => {
            setValue('phoneNumber', phone);
          }}
        />
      </div>
    </div>
  );
};

export default Step3Form;
