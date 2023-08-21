import { useMutation } from '@apollo/client';
import Card from '@components/common/card';
import * as socialIcons from '@components/icons/social';
import ImageModal from '@components/image-modal';
import Button from '@components/ui/button';
import Description from '@components/ui/description';
import ValidationError from '@components/ui/form-validation-error';
import Input from '@components/ui/input';
import Label from '@components/ui/label';
import SelectInput from '@components/ui/select-input';
import TextArea from '@components/ui/text-area';
import { yupResolver } from '@hookform/resolvers/yup';
import { useErrorLogger } from '@hooks/useErrorLogger';
import { useGetUser } from '@hooks/useGetUser';
import { notify } from '@lib/notify';
import { siteSettings } from '@settings/site.settings';
import { SettingsType } from '@ts-types/generated';
import { CURRENCY } from '@utils/currency';
import { isEmpty } from 'lodash';
import { useTranslation } from 'next-i18next';
import { useEffect, useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';

import { settingsValidationSchema } from './settings-validation-schema';

type FormValues = SettingsType;

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
  const TagName = socialIcons[item.value];
  item.label = (
    <div className="flex space-s-4 items-center text-body">
      <span className="flex w-4 h-4 items-center justify-center">
        {TagName && <TagName className="w-4 h-4" />}
      </span>
      <span>{item.label}</span>
    </div>
  );
  return item;
});

type IProps = {
  settings?: SettingsType;
};

export default function SettingsForm({ settings }: IProps) {
  const { t } = useTranslation();

  const [error, setError] = useState(null);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors }
  } = useForm<FormValues>({
    shouldUnregister: true,
    resolver: yupResolver(settingsValidationSchema),
    defaultValues: {
      ...settings,
      logo: settings?.logo,
      favicon: settings?.favicon,
      socials: !isEmpty(settings?.socials)
        ? settings?.socials.map((social: any) => ({
            icon: updatedIcons?.find(
              (icon) => icon?.value === social?.icon?.value
            ),
            url: social?.url
          }))
        : []
    }
  });

  const {
    fields: socialFields,
    append: socialAppend,
    remove: socialRemove
  } = useFieldArray({
    control,
    name: 'socials'
  });

  const { userInfo } = useGetUser();

  const csrfToken = userInfo?.csrfToken;

  const [updateSettings, { loading }] = useMutation(UPDATE_SETTINGS, {
    context: {
      headers: {
        'x-csrf-token': csrfToken
      }
    },
    onCompleted: (data: { updateSettings: SettingsType }) => {
      if (!isEmpty(data)) {
        notify(t('common:successfully-updated'), 'success');
      }
    }
  });

  useErrorLogger(error);

  const [logo, setLogo] = useState([]);
  const [favicon, setFavicon] = useState([]);
  const [ogImage, setOgImage] = useState([]);

  async function onSubmit(values: FormValues) {
    updateSettings({
      variables: {
        ...values,
        logo: logo?.map(({ id }) => ({ id })),
        favicon: favicon?.map(({ id }) => ({ id })),
        maxCheckoutQuantity: Number(values.maxCheckoutQuantity),
        socials: values?.socials
          ? values?.socials?.map((social: any) => ({
              icon: {
                value: social?.icon?.value
              },
              url: social?.url
            }))
          : [],
        seo: {
          ...values.seo,
          ogImage: ogImage?.map(({ id }) => ({ id }))
        }
      }
    }).catch((err) => {
      setError(err);
    });
  }

  const logoInformation = (
    <span>
      {t('form:logo-help-text')} <br />
      {t('form:logo-dimension-help-text')} &nbsp;
      <span className="font-bold">
        {siteSettings.logo.width}x{siteSettings.logo.height} {t('common:pixel')}
      </span>
    </span>
  );

  useEffect(() => {
    setLogo(settings.logo);
    setFavicon(settings.favicon);
    setOgImage(settings.seo.ogImage);
  }, []);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-wrap pb-8 border-b border-dashed border-border-base my-5 sm:my-8">
        <Description
          title={t('form:input-label-logo')}
          details={logoInformation}
          className="w-full px-0 sm:pe-4 md:pe-5 pb-5 sm:w-4/12 md:w-1/3 sm:py-8"
        />

        <Card className="w-full sm:w-8/12 md:w-2/3">
          <ImageModal
            onSelect={(photo) => setLogo(photo)}
            selected={logo}
            isThumbnail
            modalId="logo"
            label="form:label-add-store-logo"
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
          <ImageModal
            onSelect={(photo) => setFavicon(photo)}
            selected={favicon}
            isThumbnail
            modalId="favicon"
            label="form:label-add-store-favicon"
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
            {...register('storeName')}
            error={t(errors.storeName?.message!)}
            variant="outline"
            className="mb-5"
          />
          <Input
            label={t('form:input-label-store-contact-email')}
            {...register('storeEmail')}
            error={t(errors.storeEmail?.message!)}
            variant="outline"
            className="mb-5"
          />
          <Input
            label={t('form:input-label-store-contact-number')}
            {...register('storeNumber')}
            variant="outline"
            className="mb-5"
            error={t(errors.storeNumber?.message!)}
          />
          <div className="mb-5">
            <Label>{t('form:input-label-currency')}</Label>
            <SelectInput
              name="currency"
              control={control}
              getOptionLabel={(option: any) => option?.name}
              getOptionValue={(option: any) => option?.code}
              options={CURRENCY}
            />
            <ValidationError message={t(errors.currency?.message)} />
          </div>

          <Input
            label={`${t('form:input-label-max-checkout-quantity')}`}
            {...register('maxCheckoutQuantity')}
            type="number"
            error={t(errors.maxCheckoutQuantity?.message!)}
            variant="outline"
            className="mb-5"
          />
        </Card>
      </div>
      <div className="flex flex-wrap pb-8 border-b border-dashed border-border-base my-5 sm:my-8">
        <Description
          title="SEO"
          details={t('form:tax-form-seo-info-help-text')}
          className="w-full px-0 sm:pr-4 md:pr-5 pb-5 sm:w-4/12 md:w-1/3 sm:py-8"
        />

        <Card className="w-full sm:w-8/12 md:w-2/3">
          <Input
            label={t('form:input-label-meta-title')}
            {...register('seo.metaTitle')}
            variant="outline"
            className="mb-5"
          />
          <TextArea
            label={t('form:input-label-meta-description')}
            {...register('seo.metaDescription')}
            variant="outline"
            className="mb-5"
          />
          <Input
            label={t('form:input-label-meta-tags')}
            {...register('seo.metaTags')}
            variant="outline"
            className="mb-5"
          />
          <Input
            label={t('form:input-label-og-title')}
            {...register('seo.ogTitle')}
            variant="outline"
            className="mb-5"
          />
          <TextArea
            label={t('form:input-label-og-description')}
            {...register('seo.ogDescription')}
            variant="outline"
            className="mb-5"
          />
          <div className="mb-5">
            <Label>{t('form:input-label-og-image')}</Label>
            <ImageModal
              onSelect={(photo) => setOgImage(photo)}
              selected={ogImage}
              isThumbnail
              modalId="seo.ogImage"
              label="form:label-add-store-og-image"
            />
          </div>
          <Input
            label={t('form:input-label-twitter-handle')}
            {...register('seo.twitterHandle')}
            variant="outline"
            className="mb-5"
            placeholder="your twitter username (exp: @username)"
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
            {socialFields.map((item, index: number) => (
              <div
                className="border-b border-dashed border-border-200 first:border-t last:border-b-0 first:mt-5 md:first:mt-10 py-5 md:py-8"
                key={index}
              >
                <div className="grid grid-cols-1 sm:grid-cols-5 gap-5">
                  <div className="sm:col-span-2">
                    <Label className="whitespace-nowrap">
                      {t('form:input-label-select-platform')}
                    </Label>
                    <SelectInput
                      name={`socials.${index}.icon` as const}
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
                    {...register(`socials.${index}.url` as const)}
                    defaultValue={item.url!} // make sure to set up defaultValue
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
            ))}
          </div>

          <Button
            type="button"
            onClick={() =>
              socialAppend({ icon: { value: 'FacebookIcon' }, url: '' })
            }
            className="w-full sm:w-auto"
          >
            {t('form:button-label-add-social')}
          </Button>
        </Card>
      </div>

      <div className="mb-4 text-end">
        <Button loading={loading} disabled={loading}>
          {t('form:button-label-save-settings')}
        </Button>
      </div>
    </form>
  );
}
