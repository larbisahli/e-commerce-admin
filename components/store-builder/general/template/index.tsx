import { useMutation } from '@apollo/client';
import { CheckMark } from '@components/icons/checkmark';
import { AddLineIcon } from '@components/icons/sidebar/addLineIcon';
import Button from '@components/ui/button';
import Loader from '@components/ui/loader/loader';
import { UPDATE_STORE_SETTINGS } from '@graphql/settings';
import { useErrorLogger } from '@hooks/useErrorLogger';
import { useGetUser } from '@hooks/useGetUser';
import { notify } from '@lib/notify';
import { SettingsType } from '@ts-types/generated';
import cn from 'classnames';
import { isEmpty } from 'lodash';
import Image from 'next/image';
import { useTranslation } from 'next-i18next';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

const themes = [
  {
    themeName: 'bright',
    thumbnail: {
      image: '/static/components/theme-bright.jpg',
      placeholder: '/static/components/theme-bright.jpg'
    },
    title: 'Bright'
  },
  {
    themeName: 'cool',
    thumbnail: {
      image: '/static/components/theme-cool.jpg',
      placeholder: '/static/components/theme-cool.jpg'
    },
    title: 'Cool'
  },
  {
    themeName: 'natural',
    thumbnail: {
      image: '/static/components/theme-natural.jpg',
      placeholder: '/static/components/theme-natural.jpg'
    },
    title: 'Natural'
  }
];

type FormValues = {};

type IProps = {
  initialValues: any;
};

export default function Template({ initialValues }: IProps) {
  const { t } = useTranslation();

  const [selectedTheme, setSelectedTheme] = useState({
    themeName: null
  });
  const [selectedLoadingThemeName, setSelectedLoadingThemeName] =
    useState(null);
  const [error, setError] = useState(null);

  const { register, setValue, handleSubmit, watch } = useForm<FormValues>({
    shouldUnregister: true,
    defaultValues: {
      ...initialValues
    }
  });

  const { userInfo } = useGetUser();

  const csrfToken = userInfo?.csrfToken;

  const [updateTypography, { loading }] = useMutation(UPDATE_STORE_SETTINGS, {
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

  async function onSubmit(values: FormValues) {
    // updateTypography({
    //   variables: {}
    // }).catch((err) => {
    //   setError(err);
    // });
  }

  const handleClick = (theme) => {
    setSelectedLoadingThemeName(theme.themeName);
    setSelectedTheme(theme);
    // updateComponentModuleName({
    //   variables: {
    //     componentId,
    //     moduleName: component.moduleName
    //   }
    // }).catch((err) => {
    //   setError(err);
    //   setSelectedLoadingModuleName(null);
    // });
  };

  return (
    <div className="relative my-5 flex flex-wrap pb-4">
      <div className="flex w-full justify-end">
        <Button className="flex !w-fit items-center justify-center">
          <AddLineIcon width={13} height={13} />
        </Button>
      </div>
      <div className="relative h-full w-full pt-3">
        {themes?.map((theme) => {
          return (
            <div key={theme.themeName} className="relative">
              {loading && selectedLoadingThemeName === theme.themeName && (
                <div className="absolute top-0 right-0 left-0 bottom-0 z-50 flex items-center justify-center">
                  <Loader special />
                </div>
              )}
              <div className="mb-2 flex items-center font-medium">
                <span>{theme.title}</span>
                {selectedTheme?.themeName === theme.themeName && (
                  <div className="mx-2 flex h-[18px] w-[18px] items-center justify-center rounded-full border bg-green-600 text-white">
                    <CheckMark width={10} height={10} />
                  </div>
                )}
              </div>
              <button
                onClick={() => handleClick(theme)}
                className={cn(
                  'relative mb-5 cursor-pointer border border-gray-200',
                  'group max-w-[250px] overflow-hidden rounded-md border-solid shadow transition-transform duration-500 ease-in-out me-2 hover:border-gray-300 hover:opacity-70',
                  selectedTheme?.themeName === theme.themeName &&
                    '!border-2 !border-solid !border-blue-500 shadow',
                  loading && 'blur-[2px]'
                )}
              >
                <Image
                  alt="thumbnail"
                  className="rounded-md bg-gray-100 transition-all duration-300 group-hover:scale-110"
                  src={theme.thumbnail?.image}
                  width={250}
                  height={350}
                />
                {/* <ImageComponent
                          src={component.thumbnail?.image}
                          customPlaceholder={component.thumbnail?.placeholder}
                          width={450}
                          height={300}
                          objectFit="cover"
                        /> */}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
