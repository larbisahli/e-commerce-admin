import { useMutation } from '@apollo/client';
import { SaveIcon } from '@components/icons/save-icon';
import Color from '@components/store-builder/cms-editor/components/common/color';
import Button from '@components/ui/button';
import Label from '@components/ui/label';
import Select from '@components/ui/select/select';
import { UPDATE_THEME_SETTINGS } from '@graphql/content';
import { useErrorLogger } from '@hooks/useErrorLogger';
import { useGetUser } from '@hooks/useGetUser';
import { useUI } from '@hooks/useUI';
import { notify } from '@lib/notify';
import { SettingsType } from '@ts-types/generated';
import { isEmpty } from 'lodash';
import { useTranslation } from 'next-i18next';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { fontFamilyOptions } from '../../cms-editor/components/common/data';

export type ThemeSettingsType = {
  fontFamily: { value: string };
  primaryColor: string;
  primaryHoverColor: string;
  textColor: string;
  background: string;
  modalBackground: string;
  alertBackground: string;
  primaryButtonTextColor: string;
  primaryButtonTextHoverColor: string;
  primaryButtonBackground: string;
  primaryButtonHoverBackground: string;
  primaryButtonBorder: string;
  primaryButtonBorderHover: string;
  secondaryButtonTextColor: string;
  secondaryButtonTextHoverColor: string;
  secondaryButtonBackground: string;
  secondaryButtonHoverBackground: string;
  secondaryButtonBorder: string;
  secondaryButtonBorderHover: string;
  checkboxIconColor: string;
  checkboxBackground: string;
  checkboxBorder: string;
  loadingBarColor: string;
  barLightHalfColor: string;
  barDarkHalfColor: string;
  modalLoadingBackground: string;
};

type IProps = {
  initialValues: ThemeSettingsType | null;
};

export default function ThemeStyles({ initialValues }: IProps) {
  const { t } = useTranslation();

  const [error, setError] = useState(null);

  const { register, handleSubmit, watch, setValue } =
    useForm<ThemeSettingsType>({
      defaultValues: {
        ...(initialValues ?? {})
      }
    });

  const { updateBuilderInfo } = useUI();

  const { userInfo } = useGetUser();

  const csrfToken = userInfo?.csrfToken;

  const [updateThemeSettings, { loading }] = useMutation(
    UPDATE_THEME_SETTINGS,
    {
      context: {
        headers: {
          'x-csrf-token': csrfToken
        }
      },
      onCompleted: (data: { updateThemeSettings: SettingsType }) => {
        if (!isEmpty(data.updateThemeSettings)) {
          notify(t('common:successfully-updated'), 'success');
          updateBuilderInfo({ isReloadIframe: true });
        }
      }
    }
  );

  useErrorLogger(error);

  async function onSubmit(values: ThemeSettingsType) {
    updateThemeSettings({
      variables: {
        settings: values
      }
    }).catch((err) => {
      setError(err);
    });
  }

  const fontFamily = watch('fontFamily');
  const primaryColor = watch('primaryColor');
  const primaryHoverColor = watch('primaryHoverColor');
  const textColor = watch('textColor');
  const background = watch('background');
  const modalBackground = watch('modalBackground');
  const alertBackground = watch('alertBackground');
  const primaryButtonTextColor = watch('primaryButtonTextColor');
  const primaryButtonTextHoverColor = watch('primaryButtonTextHoverColor');
  const primaryButtonBackground = watch('primaryButtonBackground');
  const primaryButtonHoverBackground = watch('primaryButtonHoverBackground');
  const primaryButtonBorder = watch('primaryButtonBorder');
  const primaryButtonBorderHover = watch('primaryButtonBorderHover');
  const secondaryButtonTextColor = watch('secondaryButtonTextColor');
  const secondaryButtonTextHoverColor = watch('secondaryButtonTextHoverColor');
  const secondaryButtonBackground = watch('secondaryButtonBackground');
  const secondaryButtonHoverBackground = watch(
    'secondaryButtonHoverBackground'
  );
  const secondaryButtonBorder = watch('secondaryButtonBorder');
  const secondaryButtonBorderHover = watch('secondaryButtonBorderHover');
  const checkboxIconColor = watch('checkboxIconColor');
  const checkboxBackground = watch('checkboxBackground');
  const checkboxBorder = watch('checkboxBorder');
  const loadingBarColor = watch('loadingBarColor');
  const barLightHalfColor = watch('barLightHalfColor');
  const barDarkHalfColor = watch('barDarkHalfColor');
  const modalLoadingBackground = watch('modalLoadingBackground');

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-5 flex flex-wrap border-b border-dashed border-border-base pb-4">
        <div className="my-8 w-full border-b border-dashed pb-5">
          {/* Typography */}
          <Label className="!font-medium !text-black">Font Family</Label>
          <div className="w-[100%]">
            <Select
              name="fontFamily"
              value={fontFamily}
              onChange={(value: { value: string }) =>
                setValue('fontFamily', value)
              }
              getOptionLabel={(option: any) => option.label}
              getOptionValue={(option: any) => option.value}
              options={fontFamilyOptions}
            />
          </div>
        </div>
        <div className="mb-8 w-full">
          <Label className="font-semibold !text-black">Primary Color</Label>
          <div className="mt-3 w-full">
            <Color
              label={'Primary Color'}
              color={primaryColor}
              register={register('primaryColor')}
            />
          </div>
          <div className="mt-3 w-full">
            <Color
              label={'Primary Hover Color'}
              color={primaryHoverColor}
              register={register('primaryHoverColor')}
            />
          </div>
        </div>
        <div className="mb-8 w-full">
          <Label className="font-semibold !text-black">
            Background and lines
          </Label>
          <div className="mt-3 w-full">
            <Color
              label={'Page background'}
              color={background}
              register={register('background')}
            />
          </div>
          <div className="mt-3 w-full">
            <Color
              label={'Modal overlay background'}
              color={modalBackground}
              register={register('modalBackground')}
            />
          </div>
          <div className="mt-3 w-full">
            <Color
              label={'Alert popup background'}
              color={alertBackground}
              register={register('alertBackground')}
            />
          </div>
        </div>
        <div className="mb-8 w-full">
          <Label className="font-semibold !text-black">
            Body text and links
          </Label>
          <div className="mt-3 w-full">
            <Color
              label={'Body text color'}
              color={textColor}
              register={register('textColor')}
            />
          </div>
        </div>
        <div className="mb-8 w-full">
          <Label className="font-semibold !text-black">
            Primary action button
          </Label>
          <div className="mt-3 w-full">
            <Color
              label={'Button text color'}
              color={primaryButtonTextColor}
              register={register('primaryButtonTextColor')}
            />
          </div>
          <div className="mt-3 w-full">
            <Color
              label={'Button text hover color'}
              color={primaryButtonTextHoverColor}
              register={register('primaryButtonTextHoverColor')}
            />
          </div>
          <div className="mt-3 w-full">
            <Color
              label={'Button background'}
              color={primaryButtonBackground}
              register={register('primaryButtonBackground')}
            />
          </div>
          <div className="mt-3 w-full">
            <Color
              label={'Button background hover'}
              color={primaryButtonHoverBackground}
              register={register('primaryButtonHoverBackground')}
            />
          </div>
          <div className="mt-3 w-full">
            <Color
              label={'Button border'}
              color={primaryButtonBorder}
              register={register('primaryButtonBorder')}
            />
          </div>
          <div className="mt-3 w-full">
            <Color
              label={'Button border hover'}
              color={primaryButtonBorderHover}
              register={register('primaryButtonBorderHover')}
            />
          </div>
        </div>
        <div className="mb-8 w-full">
          <Label className="text-base font-semibold !text-black">
            Secondary action button
          </Label>
          <div className="mt-3 w-full">
            <Color
              label={'Button text color'}
              color={secondaryButtonTextColor}
              register={register('secondaryButtonTextColor')}
            />
          </div>
          <div className="mt-3 w-full">
            <Color
              label={'Button text hover color'}
              color={secondaryButtonTextHoverColor}
              register={register('secondaryButtonTextHoverColor')}
            />
          </div>
          <div className="mt-3 w-full">
            <Color
              label={'Button background'}
              color={secondaryButtonBackground}
              register={register('secondaryButtonBackground')}
            />
          </div>
          <div className="mt-3 w-full">
            <Color
              label={'Button background hover'}
              color={secondaryButtonHoverBackground}
              register={register('secondaryButtonHoverBackground')}
            />
          </div>
          <div className="mt-3 w-full">
            <Color
              label={'Button border'}
              color={secondaryButtonBorder}
              register={register('secondaryButtonBorder')}
            />
          </div>
          <div className="mt-3 w-full">
            <Color
              label={'Button border hover'}
              color={secondaryButtonBorderHover}
              register={register('secondaryButtonBorderHover')}
            />
          </div>
        </div>
        <div className="mb-8 w-full">
          <Label className="font-semibold !text-black">
            Checkboxes and radio buttons
          </Label>
          <div className="mt-3 w-full">
            <Color
              label={'Checkbox and radio icon'}
              color={checkboxIconColor}
              register={register('checkboxIconColor')}
            />
          </div>
          <div className="mt-3 w-full">
            <Color
              label={'Button background'}
              color={checkboxBackground}
              register={register('checkboxBackground')}
            />
          </div>
          <div className="mt-3 w-full">
            <Color
              label={'Button border'}
              color={checkboxBorder}
              register={register('checkboxBorder')}
            />
          </div>
        </div>
        <div className="mb-8 w-full">
          <Label className="font-semibold !text-black">
            Loading indicators
          </Label>
          <div className="mt-3 w-full">
            <Color
              label={'Page loading bar'}
              color={loadingBarColor}
              register={register('loadingBarColor')}
            />
          </div>
          <div className="mt-3 w-full">
            <Color
              label={'Spinner light half'}
              color={barLightHalfColor}
              register={register('barLightHalfColor')}
            />
          </div>
          <div className="mt-3 w-full">
            <Color
              label={'Spinner dark half'}
              color={barDarkHalfColor}
              register={register('barDarkHalfColor')}
            />
          </div>
          <div className="mt-3 w-full">
            <Color
              label={'Modal loading background'}
              color={modalLoadingBackground}
              register={register('modalLoadingBackground')}
            />
          </div>
        </div>
      </div>
      <div className="fixed bottom-0 flex w-[260px] justify-end border-t bg-white pb-3 pt-2">
        <Button
          loading={loading}
          disabled={loading}
          renderIcon={<SaveIcon width="1.3rem" height="1.3rem" />}
        >
          <div className="text-lg">{t('form:button-label-save')}</div>
        </Button>
      </div>
    </form>
  );
}
