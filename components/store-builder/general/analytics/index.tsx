import 'react-phone-input-2/lib/style.css';

import { useMutation } from '@apollo/client';
import { SaveIcon } from '@components/icons/save-icon';
import { RenderTooltipGoogleTrackId } from '@components/settings/ToolTips';
import Button from '@components/ui/button';
import Checkbox from '@components/ui/checkbox';
import Input from '@components/ui/input';
import Label from '@components/ui/label';
import SwitchInput from '@components/ui/switch-input';
import { UPDATE_STORE_SETTINGS } from '@graphql/settings';
import { useErrorLogger } from '@hooks/useErrorLogger';
import { useGetUser } from '@hooks/useGetUser';
import { notify } from '@lib/notify';
import { SettingsType } from '@ts-types/generated';
import { isEmpty } from 'lodash';
import { useTranslation } from 'next-i18next';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

type FormValues = SettingsType;

type IProps = {
  settings?: SettingsType;
};

export default function AnalyticsForm({ settings }: IProps) {
  const { t } = useTranslation();

  const [error, setError] = useState(null);

  const { register, handleSubmit, control, getValues } = useForm<FormValues>({
    shouldUnregister: true,
    defaultValues: {
      ...settings,
      defaultCurrency: settings?.currencies?.find(
        (currency) => currency.is_default
      )
    }
  });

  const { userInfo } = useGetUser();

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
    const maintenancePassword =
      values?.maintenancePassword ?? getValues('maintenancePassword');

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
        maintenancePassword,
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
        },
        tax: { id: values?.tax?.id }
      }
    }).catch((err) => {
      setError(err);
    });
  }

  useEffect(() => {
    setLogo(settings?.logo);
    setFavicon(settings?.favicon);
    setOgImage(settings?.seo?.ogImage);
  }, []);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="relative my-5 flex flex-wrap border-b border-dashed border-border-base pb-8 sm:my-8">
        <Label className="text-xl">
          {t('form:input-label-google-analytics')}
        </Label>
        <p className="mb-4 text-xs text-gray-500">
          {t('form:tax-form-analytics-info-help-text')}
        </p>
        <Input
          label={t('form:input-label-tracking-id')}
          {...register('google.trackingId')}
          variant="outline"
          placeholder="Enter Tracking ID"
          className="mb-5 w-full"
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
          <div className="min-w-[250px] flex-1">
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
          <div className="min-w-[250px] flex-1">
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
      </div>
      <div className="flex w-full justify-end">
        <Button
          loading={false}
          disabled={false}
          renderIcon={<SaveIcon width="1.3rem" height="1.3rem" />}
        >
          <div className="text-lg">{t('form:button-label-save')}</div>
        </Button>
      </div>
    </form>
  );
}
