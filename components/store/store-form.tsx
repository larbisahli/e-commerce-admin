import { useMutation } from '@apollo/client';
import Card from '@components/common/card';
import * as socialIcons from '@components/icons/social';
import Button from '@components/ui/button';
import Description from '@components/ui/description';
import FileInput from '@components/ui/file-input';
import ValidationError from '@components/ui/form-validation-error';
import Input from '@components/ui/input';
import Label from '@components/ui/label';
import SelectInput from '@components/ui/select-input';
import {
  CREATE_STORE_SETTINGS,
  UPDATE_STORE_SETTINGS
} from '@graphql/settings';
import { yupResolver } from '@hookform/resolvers/yup';
import { useErrorLogger, useWarnIfUnsavedChanges } from '@hooks/index';
import { notify } from '@lib/index';
import { siteSettings } from '@settings/site.settings';
import { Nullable, Scalars } from '@ts-types/custom.types';
import {
  ContactDetails,
  Social,
  StoreSettingsOptions
} from '@ts-types/generated';
import { CURRENCY } from '@utils/currency';
import { getIcon } from '@utils/get-icon';
import isEmpty from 'lodash/isEmpty';
import { useTranslation } from 'next-i18next';
import { useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';

import { settingsValidationSchema } from './settings-validation-schema';

type FormValues = {
  store_name: Scalars['String'];
  contactDetails: ContactDetails;
  max_order_amount?: Nullable<Scalars['Float']>;
  max_checkout_quantity?: Nullable<Scalars['Int']>;
  store_address: Scalars['String'];
  currency: any;
  logo: any;
  favicon: any;
  google: {
    isEnable: boolean;
    tagManagerId: string;
  };
  facebook: {
    isEnable: boolean;
    appId: string;
    pageId: string;
  };
};

const socialIcon = [
  {
    value: 'FacebookIcon',
    label: 'Facebook'
  },
  {
    value: 'InstagramIcon',
    label: 'Instagram'
  },
  {
    value: 'TwitterIcon',
    label: 'Twitter'
  },
  {
    value: 'YouTubeIcon',
    label: 'Youtube'
  }
];

export const updatedIcons = socialIcon.map((item: any) => {
  item.label = (
    <div className="flex space-s-4 items-center text-body">
      <span className="flex w-4 h-4 items-center justify-center">
        {getIcon({
          iconList: socialIcons,
          iconName: item.value,
          className: 'w-4 h-4'
        })}
      </span>
      <span>{item.label}</span>
    </div>
  );
  return item;
});

type IProps = {
  initialValues?: StoreSettingsOptions | undefined | null;
};

export default function StoreForm({ initialValues }: IProps) {
  const { t } = useTranslation();

  const [unsavedChanges, setUnsavedChanges] = useState<string[]>([]);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors }
  } = useForm<FormValues>({
    shouldUnregister: true,
    resolver: yupResolver(settingsValidationSchema),
    defaultValues: {
      ...initialValues,
      contactDetails: {
        ...initialValues?.contactDetails,
        socials: initialValues?.contactDetails?.socials
          ? initialValues?.contactDetails?.socials.map((social: any) => ({
              icon: updatedIcons?.find((icon) => icon?.value === social?.icon),
              url: social?.url
            }))
          : []
      },
      logo: initialValues?.logo ?? '',
      favicon: initialValues?.favicon ?? '',
      currency: initialValues?.currency
        ? CURRENCY.find((item) => item.code == initialValues?.currency)
        : ''
    }
  });

  const {
    fields: socialFields,
    append: socialAppend,
    remove: socialRemove
  } = useFieldArray({
    control,
    name: 'contactDetails.socials'
  });

  const [
    createStoreSettings,
    { loading: creating, error: createStoreSettingsError }
  ] = useMutation(CREATE_STORE_SETTINGS, {
    onCompleted: (data: { createStoreSettings: StoreSettingsOptions }) => {
      if (!isEmpty(data)) {
        notify(t('common:successfully-created'), 'success');
        setUnsavedChanges([]);
      }
    }
  });
  const [
    updateStoreSettings,
    { loading: updating, error: updateStoreSettingsError }
  ] = useMutation(UPDATE_STORE_SETTINGS, {
    onCompleted: (data: { updateStoreSettings: StoreSettingsOptions }) => {
      if (!isEmpty(data)) {
        notify(t('common:successfully-updated'), 'success');
        setUnsavedChanges([]);
      }
    }
  });

  useErrorLogger(createStoreSettingsError);
  useErrorLogger(updateStoreSettingsError);

  async function onSubmit(values: FormValues) {
   
    const contactDetails = {
      email:values?.contactDetails?.email,
      number:values?.contactDetails?.number,
      socials: values?.contactDetails?.socials
        ? values?.contactDetails?.socials?.map((social: any) => ({
            icon: social?.icon?.value,
            link: social?.link
          }))
        : []
    };
    
    const currency = {
      symbol:values?.currency?.symbol,
      code:values?.currency?.code,
    };

    const variables = {
      ...values,
      logo: !isEmpty(values?.logo) ? values?.logo[0] : null,
      favicon: !isEmpty(values?.favicon) ? values?.favicon[0] : null,
      contactDetails,
      currency
    };

    console.log('<: variables :>', variables);
    if (isEmpty(initialValues)) {
      createStoreSettings({ variables });
    } else {
      // updateStoreSettings({ variables: { id: initialValues?.id, ...variables } });
    }
  }

  useWarnIfUnsavedChanges(!isEmpty(unsavedChanges), () => {
    return confirm(t('common:UNSAVED_IMAGE'));
  });

  const logoInformation = (
    <span>
      {t('form:logo-help-text')} <br />
      {t('form:logo-dimension-help-text')} &nbsp;
      <span className="font-bold">
        {siteSettings.logo.width}x{siteSettings.logo.height} {t('common:pixel')}
      </span>
    </span>
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-wrap pb-8 border-b border-dashed border-border-base my-5 sm:my-8">
        <Description
          title={t('form:input-label-logo')}
          details={logoInformation}
          className="w-full px-0 sm:pe-4 md:pe-5 pb-5 sm:w-4/12 md:w-1/3 sm:py-8"
        />

        <Card className="w-full sm:w-8/12 md:w-2/3">
          <FileInput
            name="logo"
            control={control}
            multiple={false}
            setUnsavedChanges={setUnsavedChanges}
          />
        </Card>
      </div>
      <div className="flex flex-wrap pb-8 border-b border-dashed border-border-base my-5 sm:my-8">
        <Description
          title={t('form:input-label-favicon')}
          details={logoInformation}
          className="w-full px-0 sm:pe-4 md:pe-5 pb-5 sm:w-4/12 md:w-1/3 sm:py-8"
        />

        <Card className="w-full sm:w-8/12 md:w-2/3">
          <FileInput
            name="favicon"
            control={control}
            multiple={false}
            setUnsavedChanges={setUnsavedChanges}
          />
        </Card>
      </div>

      <div className="flex flex-wrap pb-8 border-b border-dashed border-border-base my-5 sm:my-8">
        <Description
          title={t('form:form-title-information')}
          details={t('form:site-info-help-text')}
          className="w-full px-0 sm:pe-4 md:pe-5 pb-5 sm:w-4/12 md:w-1/3 sm:py-8"
        />

        <Card className="w-full sm:w-8/12 md:w-2/3">
          <Input
            label={t('form:input-label-store-name')}
            {...register('store_name')}
            error={t(errors.store_name?.message!)}
            variant="outline"
            className="mb-5"
          />
          <Input
            label={t('form:input-label-store-contact-email')}
            {...register('contactDetails.email')}
            error={t(errors.contactDetails?.email?.message!)}
            variant="outline"
            className="mb-5"
          />
          <Input
            label={t('form:input-label-store-contact-number')}
            {...register('contactDetails.number')}
            variant="outline"
            className="mb-5"
            error={t(errors.contactDetails?.number?.message!)}
          />
          <div className="mb-5">
            <Label>{t('form:input-label-currency')}</Label>
            <SelectInput
              name="currency"
              control={control}
              getOptionLabel={(option: any) => option.name}
              getOptionValue={(option: any) => option.code}
              options={CURRENCY}
            />
            <ValidationError message={t(errors.currency?.message)} />
          </div>

          <Input
            label={`${t('form:input-store-address')}`}
            {...register('store_address')}
            error={t(errors.store_address?.message!)}
            variant="outline"
            className="mb-5"
          />
        </Card>
      </div>

      <div className="flex flex-wrap pb-8 border-b border-dashed border-gray-300 my-5 sm:my-8">
        <Description
          title={t('form:shop-settings')}
          details={t('form:shop-settings-helper-text')}
          className="w-full px-0 sm:pe-4 md:pe-5 pb-5 sm:w-4/12 md:w-1/3 sm:py-8"
        />

        <Card className="w-full sm:w-8/12 md:w-2/3">
          {/* Social and Icon picker */}
          <div>
            {socialFields.map(
              (item: Social & { id: string }, index: number) => (
                <div
                  className="border-b border-dashed border-border-200 first:border-t last:border-b-0 first:mt-5 md:first:mt-10 py-5 md:py-8"
                  key={item.id}
                >
                  <div className="grid grid-cols-1 sm:grid-cols-5 gap-5">
                    <div className="sm:col-span-2">
                      <Label className="whitespace-nowrap">
                        {t('form:input-label-select-platform')}
                      </Label>
                      <SelectInput
                        name={`contactDetails.socials.${index}.icon` as const}
                        control={control}
                        options={updatedIcons}
                        isClearable={true}
                        defaultValue={item?.icon!}
                      />
                    </div>
                    <Input
                      className="sm:col-span-2"
                      label={t('form:input-label-social-url')}
                      variant="outline"
                      {...register(
                        `contactDetails.socials.${index}.link` as const
                      )}
                      defaultValue={item.link!} // make sure to set up defaultValue
                    />
                    <button
                      onClick={() => {
                        socialRemove(index);
                      }}
                      type="button"
                      className="text-sm text-red-500 hover:text-red-700 transition-colors duration-200 focus:outline-none sm:mt-4 sm:col-span-1"
                    >
                      {t('form:button-label-remove')}
                    </button>
                  </div>
                </div>
              )
            )}
          </div>

          <Button
            type="button"
            onClick={() => socialAppend({ icon: '', link: '' })}
            className="w-full sm:w-auto"
          >
            {t('form:button-label-add-social')}
          </Button>
        </Card>
      </div>

      <div className="mb-4 text-end">
        <Button loading={creating || updating} disabled={creating || updating}>
          {t('form:button-label-save-settings')}
        </Button>
      </div>
    </form>
  );
}
