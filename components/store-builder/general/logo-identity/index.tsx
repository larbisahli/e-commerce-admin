import { useMutation } from '@apollo/client';
import { Eye } from '@components/icons/eye-icon';
import { SaveIcon } from '@components/icons/save-icon';
import ImageModal from '@components/image-modal';
import Button from '@components/ui/button';
import { useModalAction } from '@components/ui/modal/modal.context';
import { UPDATE_STORE_SETTINGS } from '@graphql/settings';
import { useErrorLogger } from '@hooks/useErrorLogger';
import { useGetUser } from '@hooks/useGetUser';
import { notify } from '@lib/notify';
import { FAVICON_VIEWER_MODAL } from '@ts-types/constants';
import { SettingsType } from '@ts-types/generated';
import { isEmpty } from 'lodash';
import { useTranslation } from 'next-i18next';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

const generateMaintenancePassword = () => {
  return Math.floor(Math.random() * 90000) + 10000;
};

type FormValues = SettingsType;

type IProps = {
  settings?: SettingsType;
};

export default function StoreSettingsForm({ settings }: IProps) {
  const { t } = useTranslation();

  const [error, setError] = useState(null);

  const { handleSubmit, getValues } = useForm<FormValues>({
    shouldUnregister: true,
    defaultValues: {
      ...settings,
      maintenancePassword:
        settings?.maintenancePassword ?? generateMaintenancePassword(),
      defaultCurrency: settings?.currencies?.find(
        (currency) => currency.is_default
      )
    }
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
      <div className="my-5 flex flex-wrap border-b border-dashed border-border-base pb-8 sm:my-8">
        <ImageModal
          onSelect={(photo) => setLogo(photo)}
          selected={logo}
          isThumbnail
          modalId="logo"
          label="form:label-logo"
          labelClassName="text-lg"
        />
        <span className="pt-2 text-xs text-gray-500">
          Recommended aspect ratio: &nbsp;
          <span className="font-bold">3:2 (width:height)</span>
        </span>
      </div>
      <div className="my-5 flex flex-wrap pb-8 sm:my-8">
        <ImageModal
          onSelect={(photo) => setFavicon(photo)}
          selected={favicon}
          isThumbnail
          modalId="favicon"
          label="form:label-favicon"
          labelClassName="text-lg"
        />
        <span className="pt-2 text-xs text-gray-500">
          {t('form:favicon-dimension-help-text')} &nbsp;
          <span className="font-bold">
            {'625x625'} {t('common:pixel')}
          </span>
        </span>
        <div className="mt-5 flex w-full justify-end">
          <Button
            onClick={(e) => {
              e.preventDefault();
              openModal(FAVICON_VIEWER_MODAL, 'modalId');
            }}
            variant="outline"
          >
            <Eye width={20} height={20} />
            <span className="mx-1 text-sm">View generated favicons</span>
          </Button>
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
