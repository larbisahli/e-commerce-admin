import 'react-phone-input-2/lib/style.css';

import { useMutation } from '@apollo/client';
import Card from '@components/common/card';
import FormActions from '@components/common/FormActions';
import { Eye } from '@components/icons/eye-icon';
import * as socialIcons from '@components/icons/social';
import ImageModal from '@components/image-modal';
import Button from '@components/ui/button';
import Checkbox from '@components/ui/checkbox';
import Description from '@components/ui/description';
import ValidationError from '@components/ui/form-validation-error';
import Input from '@components/ui/input';
import Label from '@components/ui/label';
import { useModalAction } from '@components/ui/modal/modal.context';
import SelectInput from '@components/ui/select-input';
import TextArea from '@components/ui/text-area';
import { UPDATE_STORE_SETTINGS } from '@graphql/settings';
import { yupResolver } from '@hookform/resolvers/yup';
import { useErrorLogger } from '@hooks/useErrorLogger';
import { useGetUser } from '@hooks/useGetUser';
import { notify } from '@lib/notify';
import { FAVICON_VIEWER_MODAL } from '@ts-types/constants';
import { SettingsType } from '@ts-types/generated';
import { CURRENCY } from '@utils/currency';
import { isValidPhoneNumber } from 'libphonenumber-js';
import { isEmpty } from 'lodash';
import { useTranslation } from 'next-i18next';
import { useEffect, useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import PhoneInput from 'react-phone-input-2';

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
    <div className="flex items-center text-body space-s-4">
      <span className="flex h-4 w-4 items-center justify-center">
        {TagName && <TagName className="h-4 w-4" />}
      </span>
      <span>{item.label}</span>
    </div>
  );
  return item;
});

type IProps = {
  settings?: SettingsType;
};

export default function StoreSettingsForm({ settings }: IProps) {
  const { t } = useTranslation();

  const [error, setError] = useState(null);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    getValues,
    watch,
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

  const { openModal } = useModalAction();

  const csrfToken = userInfo?.csrfToken;

  const [updateSettings, { loading: updating }] = useMutation(
    UPDATE_STORE_SETTINGS,
    {
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
    }
  );

  useErrorLogger(error);

  const [logo, setLogo] = useState([]);
  const [favicon, setFavicon] = useState([]);
  const [ogImage, setOgImage] = useState([]);

  async function onSubmit(values: FormValues) {
    const storeNumber = values?.storeNumber ?? getValues('storeNumber');

    updateSettings({
      variables: {
        ...values,
        storeNumber,
        logo: logo?.map(({ id }) => ({ id })),
        favicon: favicon?.map(({ id }) => ({ id })),
        maxCheckoutQuantity: Number(values.maxCheckoutQuantity),
        maxCheckoutAmount: Number(values.maxCheckoutAmount),
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
        {'350x50'} {t('common:pixel')}
      </span>
    </span>
  );

  const faviconInformation = (
    <span>
      {t('form:favicon-help-text')} <br />
      {t('form:favicon-dimension-help-text')} &nbsp;
      <span className="font-bold">
        {'625x625'} {t('common:pixel')}
      </span>
    </span>
  );

  useEffect(() => {
    setLogo(settings?.logo);
    setFavicon(settings?.favicon);
    setOgImage(settings?.seo?.ogImage);
  }, []);

  const storeNumber = watch('storeNumber') ?? getValues('storeNumber');

  console.log({ storeNumber, settings });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormActions
        showSelectLanguage={false}
        hideBackLink
        showCancel={false}
        loading={updating}
        disabled={updating}
        title={t('form:form-title-store-settings')}
      />
      <div className="my-5 flex flex-wrap border-b border-dashed border-border-base pb-8 sm:my-8">
        <Description
          title={t('form:input-label-logo')}
          details={logoInformation}
          className="w-full px-0 pb-5 sm:w-4/12 sm:py-8 sm:pe-4 md:w-1/3 md:pe-5"
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
      <div className="my-5 flex flex-wrap border-b border-dashed border-border-base pb-8 sm:my-8">
        <Description
          title={t('form:input-label-favicon')}
          details={faviconInformation}
          className="w-full px-0 pb-5 sm:w-4/12 sm:py-8 sm:pe-4 md:w-1/3 md:pe-5"
        />

        <Card className="w-full sm:w-8/12 md:w-2/3">
          <ImageModal
            onSelect={(photo) => setFavicon(photo)}
            selected={favicon}
            isThumbnail
            modalId="favicon"
            label="form:label-add-store-favicon"
          />
          <div className="flex justify-end">
            <Button
              onClick={(e) => {
                e.preventDefault();
                openModal(FAVICON_VIEWER_MODAL, 'modalId');
              }}
              variant="outline"
            >
              <Eye width={20} height={20} />
              <span className="mx-1 text-sm">View favicons</span>
            </Button>
          </div>
        </Card>
      </div>

      <div className="my-5 flex flex-wrap border-b border-dashed border-border-base pb-8 sm:my-8">
        <Description
          title={t('form:form-title-information')}
          details={t('form:site-info-help-text')}
          className="w-full px-0 pb-5 sm:w-4/12 sm:py-8 sm:pe-4 md:w-1/3 md:pe-5"
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
          <div className="mb-4">
            <Label>{t('form:input-label-store-contact-number')}</Label>
            <PhoneInput
              country="us"
              inputProps={{
                name: 'phone',
                required: true,
                autoFocus: false
              }}
              disableSearchIcon
              enableSearch
              inputClass="phone-number-class py-5"
              value={`+${storeNumber}`}
              isValid={(value, country: { dialCode: string }) => {
                if (country?.dialCode != value) {
                  return isValidPhoneNumber(`+${value}`);
                }
                return true;
              }}
              onChange={(phone) => {
                setValue('storeNumber', phone);
              }}
            />
            {/* @ts-ignore */}
            <ValidationError message={t(errors.storeNumber?.message)} />
          </div>
          <Input
            label={t('form:input-label-address-1')}
            {...register('addressLine1')}
            error={t(errors.storeName?.message!)}
            variant="outline"
            className="mb-5"
          />
          <Input
            label={t('form:input-label-address-2')}
            {...register('addressLine2')}
            error={t(errors.storeName?.message!)}
            variant="outline"
            className="mb-5"
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

          <Input
            label={`${t('form:input-label-max-checkout-amount')}`}
            {...register('maxCheckoutAmount')}
            type="number"
            error={t(errors.maxCheckoutQuantity?.message!)}
            variant="outline"
            className="mb-5"
          />
        </Card>
      </div>
      {/* SEO */}
      <div className="my-5 flex flex-wrap border-b border-dashed border-border-base pb-8 sm:my-8">
        <Description
          title="SEO"
          details={t('form:tax-form-seo-info-help-text')}
          className="w-full px-0 pb-5 sm:w-4/12 sm:py-8 sm:pr-4 md:w-1/3 md:pr-5"
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
      {/* ANALYTICS */}
      <div className="my-5 flex flex-wrap border-b border-dashed border-border-base pb-8 sm:my-8">
        <Description
          title={t('form:input-label-google-analytics')}
          details={t('form:tax-form-analytics-info-help-text')}
          className="w-full px-0 pb-5 sm:w-4/12 sm:py-8 sm:pr-4 md:w-1/3 md:pr-5"
        />

        <Card className="w-full sm:w-8/12 md:w-2/3">
          <Input
            label={t('form:input-label-tracking-id')}
            {...register('google.trackingId')}
            variant="outline"
            placeholder="Enter Tracking ID"
            className="mb-5"
          />
          <div className="mb-5">
            <Checkbox
              {...register(`google.isEnabled` as const)}
              label={t('form:input-label-activate-google-analytics')}
            />
          </div>
          <Label>{t('form:input-label-tracking-options')}</Label>
          <div className="my-5 flex flex-wrap">
            <div className="min-w-[300px] flex-1">
              <Checkbox
                {...register(`google.isTrackVisitors` as const)}
                label={'Track Visitors'}
              />
              <Checkbox
                {...register(`google.isTrackOrders` as const)}
                label={t('form:input-label-track-orders')}
              />
              <Checkbox
                {...register(`google.isTrackUserLogin` as const)}
                label={'Track user login'}
              />
              <Checkbox
                {...register(`google.isTrackUserRegister` as const)}
                label={'Track user register'}
              />
              <Checkbox
                {...register(`google.isTrackCheckoutOptions` as const)}
                label={'Track checkout options'}
              />
            </div>
            <div className="min-w-[300px] flex-1">
              <Checkbox
                {...register(`google.isTrackProductAddToCart` as const)}
                label={'Track product add to cart'}
              />
              <Checkbox
                {...register(`google.isTrackProductRemoveToCart` as const)}
                label={'Track product remove from cart'}
              />
              <Checkbox
                {...register(`google.isTrackCheckout` as const)}
                label={'Track checkout'}
              />
            </div>
          </div>
        </Card>
      </div>

      <div className="my-5 flex flex-wrap border-b border-dashed border-gray-300 pb-8 sm:my-8">
        <Description
          title={t('form:shop-settings')}
          details={t('form:shop-settings-helper-text')}
          className="w-full px-0 pb-5 sm:w-4/12 sm:py-8 sm:pe-4 md:w-1/3 md:pe-5"
        />

        <Card className="w-full sm:w-8/12 md:w-2/3">
          {/* Social and Icon picker */}
          <div>
            {socialFields.map((item, index: number) => (
              <div
                className="border-b border-dashed border-border-200 py-5 first:mt-5 first:border-t last:border-b-0 md:py-8 md:first:mt-10"
                key={index}
              >
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-5">
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
                    className="text-sm text-red-500 transition-colors duration-200 hover:text-red-700 focus:outline-none sm:col-span-1 sm:mt-4"
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
    </form>
  );
}
