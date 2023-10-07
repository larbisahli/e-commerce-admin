import 'react-phone-input-2/lib/style.css';

import { useMutation } from '@apollo/client';
import Card from '@components/common/card';
import FormActions from '@components/common/FormActions';
import { Eye } from '@components/icons/eye-icon';
import { LockSvg } from '@components/icons/lock';
import { ResetIcon } from '@components/icons/reset';
import * as socialIcons from '@components/icons/social';
import ImageModal from '@components/image-modal';
import Accordion from '@components/ui/accordion';
import Button from '@components/ui/button';
import Checkbox from '@components/ui/checkbox';
import ColorPicker from '@components/ui/color-picker/color-picker';
import DisplayColorCode from '@components/ui/color-picker/display-color-code';
import Description from '@components/ui/description';
import ValidationError from '@components/ui/form-validation-error';
import Input from '@components/ui/input';
import Label from '@components/ui/label';
import { useModalAction } from '@components/ui/modal/modal.context';
import SelectInput from '@components/ui/select-input';
import SwitchInput from '@components/ui/switch-input';
import TextArea from '@components/ui/text-area';
import { UPDATE_STORE_SETTINGS } from '@graphql/settings';
import { yupResolver } from '@hookform/resolvers/yup';
import { useErrorLogger } from '@hooks/useErrorLogger';
import { useGetUser } from '@hooks/useGetUser';
import { useSettings } from '@hooks/useSettings';
import { notify } from '@lib/notify';
import { FAVICON_VIEWER_MODAL } from '@ts-types/constants';
import { SettingsType } from '@ts-types/generated';
import { CURRENCY } from '@utils/currency';
import cn from 'classnames';
import { isValidPhoneNumber } from 'libphonenumber-js';
import { isEmpty } from 'lodash';
import { useTranslation } from 'next-i18next';
import { useEffect, useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import PhoneInput from 'react-phone-input-2';

import { settingsValidationSchema } from './settings-validation-schema';
import {
  RenderTooltipCurrencies,
  RenderTooltipGoogleTrackId,
  RenderTooltipTaxRate
} from './ToolTips';

type FormValues = SettingsType;

const paymentMethods = [
  {
    id: 1,
    name: 'Cash on Delivery',
    code: 'cash_on_delivery'
  }
];

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

const webmanifestDisplays = [
  { name: 'fullscreen' },
  { name: 'standalone' },
  { name: 'minimal-ui' },
  { name: 'browser' }
];
const webmanifestOrientations = [
  { name: 'any' },
  { name: 'natural' },
  { name: 'landscape' },
  { name: 'landscape-primary' },
  { name: 'landscape-secondary' },
  { name: 'portrait' },
  { name: 'portrait-primary' },
  { name: 'portrait-secondary' }
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

  const { systemCurrency } = useSettings();

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
      defaultCurrency: settings?.currencies?.find(
        (currency) => currency.is_default
      ),
      maintenanceMode: false,
      maintenancePassword: 12345,
      socials: !isEmpty(settings?.socials)
        ? settings?.socials.map((social: any) => ({
            icon: updatedIcons?.find(
              (icon) => icon?.value === social?.icon?.value
            ),
            url: social?.url
          }))
        : [],
      webmanifest: {
        theme_color: '#ffff',
        background_color: '#ffff'
      }
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
        currencies: values?.currencies?.map((currency) => {
          return {
            ...currency,
            is_default:
              currency?.code ===
              (values?.defaultCurrency?.code ?? settings?.systemCurrency?.code)
          };
        }),
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
  const selectedCurrencies = watch('currencies') ?? getValues('currencies');
  const maintenanceMode =
    watch('maintenanceMode') ?? getValues('maintenanceMode');
  const maintenancePassword =
    watch('maintenancePassword') ?? getValues('maintenancePassword');

  useEffect(() => {
    // Adding system currency back in case it was removed from currencies
    if (
      isEmpty(
        selectedCurrencies?.find(
          (c) => c.code === settings?.systemCurrency?.code
        )
      )
    ) {
      const systemCurrency = CURRENCY?.find(
        (c) => c.code === settings?.systemCurrency?.code
      );
      notify('Can not remove the system currency', 'error');
      setValue('currencies', [...selectedCurrencies, systemCurrency]);
    }
  }, [selectedCurrencies, setValue, settings?.systemCurrency?.code]);

  const generateMaintenancePassword = () => {
    return Math.floor(Math.random() * 90000) + 10000;
  };

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
          <Accordion
            btnClassName="mt-5 bg-gray-100"
            Title={() => (
              <div className="pt-1 text-gray-600">
                PWA web-manifest configuration
              </div>
            )}
          >
            <div className="mb-5 py-5 last:mb-8 last:border-0 md:py-8 md:last:pb-0">
              <Input
                label={t('form:input-label-name')}
                {...register('webmanifest.name')}
                variant="outline"
                className="mb-5"
              />
              <Input
                label={t('form:input-label-short-name')}
                {...register('webmanifest.short_name')}
                variant="outline"
                className="mb-5"
              />
              <Input
                label={t('form:input-label-description')}
                {...register('webmanifest.description')}
                variant="outline"
                className="mb-5"
              />
              <Input
                label={t('form:input-label-language')}
                {...register('webmanifest.language')}
                disabled
                variant="outline"
                className="mb-5"
              />
              <div className="flex items-center">
                <ColorPicker
                  label={t('form:input-label-color')}
                  {...register('webmanifest.theme_color')}
                  className="m-5 ml-0"
                >
                  <DisplayColorCode
                    control={control}
                    name="webmanifest.theme_color"
                  />
                </ColorPicker>
                <ColorPicker
                  label={t('form:input-label-background-color')}
                  {...register('webmanifest.background_color')}
                  className="m-5 ml-0"
                >
                  <DisplayColorCode
                    control={control}
                    name="webmanifest.background_color"
                  />
                </ColorPicker>
              </div>
              <Input
                label={t('form:input-label-start-url')}
                {...register('webmanifest.start_url')}
                variant="outline"
                className="mb-5"
              />
              <div className="mb-5">
                <Label>{t('form:input-label-orientation')}</Label>
                <SelectInput
                  name="webmanifest.orientation"
                  control={control}
                  getOptionLabel={(option: any) => option.name}
                  getOptionValue={(option: any) => option.name}
                  options={webmanifestOrientations}
                />
              </div>
              <div className="mb-5">
                <Label>{t('form:input-label-display')}</Label>
                <SelectInput
                  name="webmanifest.display"
                  control={control}
                  getOptionLabel={(option: any) => option.name}
                  getOptionValue={(option: any) => option.name}
                  options={webmanifestDisplays}
                />
              </div>
              <Input
                label={t('form:input-iarc-rating-id')}
                {...register('webmanifest.iarc_rating_id')}
                variant="outline"
                className="mb-5"
              />
              <Input
                label={t('form:input-label-start-url')}
                {...register('webmanifest.scope')}
                variant="outline"
                className="mb-5"
              />
            </div>
          </Accordion>
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
            renderLabel={<>{systemCurrency?.symbol}</>}
            className="mb-5"
          />
        </Card>
      </div>
      <div className="my-5 flex flex-wrap border-b border-dashed border-border-base pb-8 sm:my-8">
        <Description
          title={t('form:form-title-payment-currency')}
          details={t('form:form-title-payment-currency-info')}
          className="w-full px-0 pb-5 sm:w-4/12 sm:py-8 sm:pe-4 md:w-1/3 md:pe-5"
        />
        <Card className="w-full sm:w-8/12 md:w-2/3">
          <div className="mb-5">
            <Label>{t('form:input-label-payment-methods')}</Label>
            <SelectInput
              name="paymentMethods"
              control={control}
              isMulti
              getOptionLabel={(option: any) => option?.name}
              getOptionValue={(option: any) => option?.code}
              options={paymentMethods}
            />
          </div>
          <div className="mb-5">
            <Label
              tooltipId="currencies"
              spaceBetween={false}
              renderTooltip={<RenderTooltipCurrencies />}
            >
              {t('form:input-label-currencies')}
            </Label>
            <SelectInput
              name="currencies"
              control={control}
              isMulti
              getOptionLabel={(option: any) => option?.name}
              getOptionValue={(option: any) => option?.code}
              options={CURRENCY}
            />
            <ValidationError message={t(errors.currencies?.message)} />
            <div className="flex items-center text-xs text-gray-600">
              <div className="mr-1">
                {t('form:input-label-system-currency')}:
              </div>
              <div>{`(${settings?.systemCurrency?.name})`}</div>
            </div>
          </div>
          <div className="flex-4 mb-5 min-w-[200px]">
            <Label isRequiredLabel>
              {t('form:input-label-default-currency')}
            </Label>
            <SelectInput
              name="defaultCurrency"
              control={control}
              getOptionLabel={(option: any) => option?.name}
              getOptionValue={(option: any) => option?.code}
              options={selectedCurrencies}
            />
          </div>
          <div className="mb-5">
            <Label
              tooltipId="taxRate"
              spaceBetween={false}
              openTooltipOnClick
              renderTooltip={<RenderTooltipTaxRate />}
              isRequiredLabel
            >
              {t('form:input-label-tax-rate')}
            </Label>
            <SelectInput
              name="taxRate"
              control={control}
              getOptionLabel={(option: any) => option?.name}
              getOptionValue={(option: any) => option?.name}
              options={[
                { name: 'Standard rate' },
                { name: 'Reduced rate' },
                { name: 'Super-reduced rate' }
              ]}
            />
          </div>
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
            renderTooltip={<RenderTooltipGoogleTrackId />}
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
              <div className="mb-1">
                <SwitchInput
                  name="google.isTrackVisitors"
                  label={'Track Visitors'}
                  control={control}
                />
              </div>
              <div className="mb-1">
                <SwitchInput
                  name="google.isTrackOrders"
                  label={t('form:input-label-track-orders')}
                  control={control}
                />
              </div>
              <div className="mb-1">
                <SwitchInput
                  name="google.isTrackUserLogin"
                  label={'Track user login'}
                  control={control}
                />
              </div>
              <div className="mb-1">
                <SwitchInput
                  name="google.isTrackUserRegister"
                  label={'Track user register'}
                  control={control}
                />
              </div>
              <div className="mb-1">
                <SwitchInput
                  name="google.isTrackCheckoutOptions"
                  label={'Track checkout options'}
                  control={control}
                />
              </div>
            </div>
            <div className="min-w-[300px] flex-1">
              <div className="mb-1">
                <SwitchInput
                  name="google.isTrackProductAddToCart"
                  label={'Track product add to cart'}
                  control={control}
                />
              </div>
              <div className="mb-1">
                <SwitchInput
                  name="google.isTrackProductRemoveToCart"
                  label={'Track product remove from cart'}
                  control={control}
                />
              </div>
              <div className="mb-1">
                <SwitchInput
                  name="google.isTrackCheckout"
                  label={'Track checkout'}
                  control={control}
                />
              </div>
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

      <div className="my-5 flex flex-wrap border-b border-dashed border-gray-300 pb-8 sm:my-8">
        <Description
          title={t('form:shop-settings-status')}
          details={t('form:shop-settings-helper-text')}
          className="w-full px-0 pb-5 sm:w-4/12 sm:py-8 sm:pe-4 md:w-1/3 md:pe-5"
        />
        <Card className="w-full sm:w-8/12 md:w-2/3">
          <div className="flex-4 mb-5 min-w-[200px]">
            <Label className="text-lg">
              {t('form:input-label-maintenance-mode')}
            </Label>
            <div className="text-sm text-gray-600">
              <p>
                In maintenance mode the store will be invisible to visitors.
                However, you will be able to access it, using a generated
                password. This way you can safely work on the store data, while
                blocking visitors at a maintenance mode screen.
              </p>
            </div>
          </div>
          <div className="mb-9">
            <SwitchInput
              name="maintenanceMode"
              label={t('form:input-label-maintenance')}
              control={control}
            />
          </div>
          <Label>{t('form:input-label-password')}</Label>
          <div
            className={cn('my-1 flex w-fit rounded-sm border bg-gray-100', {
              'pointer-events-none opacity-50': !maintenanceMode
            })}
          >
            <div className="flex items-center px-4 py-2">
              <div className="text-gray-400">
                <LockSvg />
              </div>
              <div className="p-1 pb-0 font-medium text-gray-500">
                {maintenancePassword}
              </div>
            </div>
            <button
              onClick={(e) => {
                e.preventDefault();
                const pass = generateMaintenancePassword();
                setValue('maintenancePassword', pass);
              }}
              className="flex items-center justify-center border-l border-gray-300 px-5 py-2 text-gray-800"
            >
              <ResetIcon />
            </button>
          </div>
        </Card>
      </div>
    </form>
  );
}
