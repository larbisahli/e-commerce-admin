import 'react-phone-input-2/lib/style.css';

import { useMutation } from '@apollo/client';
import { SaveIcon } from '@components/icons/save-icon';
import * as socialIcons from '@components/icons/social';
import Button from '@components/ui/button';
import Input from '@components/ui/input';
import Label from '@components/ui/label';
import SelectInput from '@components/ui/select-input';
import { UPDATE_STORE_SETTINGS } from '@graphql/settings';
import { useGetUser } from '@hooks/useGetUser';
import { notify } from '@lib/notify';
import { SettingsType } from '@ts-types/generated';
import { isEmpty } from 'lodash';
import { useTranslation } from 'next-i18next';
import { useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';

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

export default function SocialLinksForm({ settings }: IProps) {
  const { t } = useTranslation();

  const [error, setError] = useState(null);

  const { register, handleSubmit, control, getValues } = useForm<FormValues>({
    shouldUnregister: true,
    defaultValues: {
      ...settings,
      defaultCurrency: settings?.currencies?.find(
        (currency) => currency.is_default
      ),
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
          ...values.seo
        },
        tax: { id: values?.tax?.id }
      }
    }).catch((err) => {
      setError(err);
    });
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <p className="mt-2 text-sm text-gray-700">
        Add links to your socials to encourage fans to stay connected. Enter
        your social handle, username or full URL.
      </p>
      <div className="my-5 flex flex-wrap border-t border-dashed border-gray-300 pt-8 sm:my-8">
        {/* Social and Icon picker */}
        <div>
          {socialFields.map((item, index: number) => (
            <div
              className="border-b border-dashed border-border-200 py-2 last:border-b-0"
              key={index}
            >
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-5">
                <div className="sm:col-span-2">
                  <Label className="whitespace-nowrap">
                    {t('form:input-label-select-platform')}
                  </Label>
                  <SelectInput
                    name={`socials.${index}.icon` as const}
                    // getOptionLabel={(option: { label: string }) => option.label}
                    // getOptionValue={(option: { id: string }) => option.id}
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
