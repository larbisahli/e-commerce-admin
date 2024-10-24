import { useMutation, useQuery } from '@apollo/client';
import Card from '@components/common/card';
import { AlignCenterIcon } from '@components/icons/builder/align-center';
import { AlignLeftIcon } from '@components/icons/builder/align-left';
import { AlignRightIcon } from '@components/icons/builder/align-right';
import * as socialIcons from '@components/icons/social';
import ImageModal from '@components/image-modal';
import Button from '@components/ui/button';
import Description from '@components/ui/description';
import Input from '@components/ui/input';
import Label from '@components/ui/label';
import { useModalAction } from '@components/ui/modal/modal.context';
import SelectInput from '@components/ui/select-input';
import TextArea from '@components/ui/text-area';
import {
  STORE_LAYOUTS,
  UPDATE_LAYOUT_COMPONENT_CONTENT
} from '@graphql/content';
import { useErrorLogger, useGetClient } from '@hooks/index';
import { useAppDispatch } from '@hooks/useGetClient';
import { useSettings } from '@hooks/useSettings';
import { useUI } from '@hooks/useUI';
import { notify } from '@lib/index';
import { setEtag } from '@store/client';
import { TextAlignEnum } from '@ts-types/custom.types';
import type { ImageType, StoreLayoutComponentType } from '@ts-types/generated';
import classNames from 'classnames';
import cloneDeep from 'lodash/cloneDeep';
import isEmpty from 'lodash/isEmpty';
import { useTranslation } from 'next-i18next';
import { memo, useEffect, useMemo, useState } from 'react';
import React from 'react';
import { useFieldArray, useForm } from 'react-hook-form';

import FormActions from '../../helpers/FormActions';

type FormValues = {
  socials: any[];
  links: {
    groupName: string;
    pages: {
      name: string;
      title: string;
    }[];
  }[];
};

const defaultValues = {};

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

type IProps = {
  initialValues?: StoreLayoutComponentType;
};

interface TLayout {
  storeLayouts: {
    id: string;
    name: string;
    title: string;
    isCustom: boolean;
  }[];
}

interface OptionsVariable {
  layoutName?: string;
  etag: string;
}

const moduleSliderWhiteList = ['Footer', 'FooterSubscribe'];

const FooterForm = ({ initialValues }: IProps) => {
  const { t } = useTranslation();

  const data = initialValues.data;
  const moduleName = initialValues?.moduleName;

  const [error, setError] = useState(null);
  const { selectedLanguage } = useSettings();
  const dispatch = useAppDispatch();

  const { updateBuilderInfo } = useUI();

  const { register, control, watch, setValue, handleSubmit } =
    useForm<FormValues>({
      defaultValues: !isEmpty(data)
        ? cloneDeep({ ...data })
        : (defaultValues as FormValues)
    });

  const { userInfo } = useGetClient();
  const { closeModal } = useModalAction();
  const csrfToken = userInfo?.csrfToken;
  const etag = userInfo?.store?.etag;

  const {
    data: layoutData,
    loading: layoutLoading,
    error: layoutError
  } = useQuery<TLayout, OptionsVariable>(STORE_LAYOUTS, {
    variables: {
      etag: etag?.layoutEtag
    },
    fetchPolicy: 'cache-and-network',
    skip: isEmpty(etag)
  });

  const { storeLayouts = [] } = layoutData ?? {};

  const [updateLayoutComponent, { loading: updating }] = useMutation(
    UPDATE_LAYOUT_COMPONENT_CONTENT,
    {
      context: {
        headers: {
          'x-csrf-token': csrfToken
        }
      },
      onCompleted: (data: {
        updateLayoutComponent: StoreLayoutComponentType;
      }) => {
        if (!isEmpty(data?.updateLayoutComponent)) {
          const { etag: newEtag } = data?.updateLayoutComponent ?? {};
          dispatch(setEtag({ etag: newEtag }));
          notify(t('common:successfully-updated'), 'success', {
            position: 'top-center',
            autoClose: 2000
          });
          updateBuilderInfo({ isReloadIframe: true });
          closeModal(null, null, { componentId: initialValues.componentId });
        }
      }
    }
  );

  useErrorLogger(error);
  useErrorLogger(layoutError);

  const onSubmit = async (values: FormValues) => {
    const variables = {
      componentId: initialValues.componentId,
      contentId: initialValues?.contentId,
      language: selectedLanguage,
      data: {
        socials: values.socials,
        links: values.links?.map((link) => ({
          ...link,
          pages: link.pages?.map((page) => ({
            name: page.name,
            title: page.title
          }))
        }))
      }
    };

    updateLayoutComponent({ variables }).catch((err) => {
      setError(err);
    });
  };

  const {
    fields: socialFields,
    append: socialAppend,
    remove: socialRemove
  } = useFieldArray({
    control,
    name: 'socials'
  });

  const {
    fields: linkFields,
    append: linkAppend,
    remove: linkRemove
  } = useFieldArray({
    control,
    name: 'links'
  });

  const isWhiteListed = useMemo(
    () => moduleSliderWhiteList?.includes(moduleName),
    [moduleName]
  );

  useEffect(() => {
    console.log({ linkFields });
    if (moduleName === 'FooterLight' && linkFields.length === 0) {
      linkAppend({ pages: [], groupName: 'About' });
    } else if (linkFields.length > 1) {
      linkRemove();
      linkAppend({ pages: [], groupName: 'About' });
    }
  }, [isWhiteListed]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormActions
        btnLabel={t('form:button-label-save-content')}
        title="Component Content"
        disabled={updating}
        loading={updating}
      />
      {isWhiteListed && (
        <div className="my-5 flex flex-wrap border-b border-dashed border-gray-300 pb-8 sm:my-8">
          <Description
            title={t('form:links')}
            details={t('form:shop-settings-helper-text')}
            className="w-full px-0 pb-5 sm:w-4/12 sm:py-8 sm:pe-4 md:w-1/3 md:pe-5"
          />
          <Card className="w-full sm:w-8/12 md:w-2/3">
            <div>
              {linkFields.map((item, index: number) => (
                <div
                  className={classNames(
                    'py-5 first:mt-5 first:border-t last:border-b-0 md:py-8 md:first:mt-10',
                    'border-b border-dashed border-border-200 first:border-t-0 first:pt-0'
                  )}
                  key={index}
                >
                  <div className="relative">
                    <Input
                      label={t('form:input-label-group-name')}
                      variant="outline"
                      inputClassName="!rounded-sm"
                      {...register(`links.${index}.groupName` as const)}
                    />
                    <div className="mt-5">
                      <Label className="whitespace-nowrap">
                        {t('form:input-label-select-pages')}
                      </Label>
                      <SelectInput
                        name={`links.${index}.pages` as const}
                        getOptionLabel={(option: any) => option.title}
                        getOptionValue={(option: any) => option.name}
                        control={control}
                        options={storeLayouts}
                        loading={layoutLoading}
                        isMulti
                      />
                    </div>
                    <button
                      onClick={() => {
                        linkRemove(index);
                      }}
                      type="button"
                      className="absolute top-[-20px] right-0 text-sm text-red-500 transition-colors duration-200 hover:text-red-700 focus:outline-none sm:col-span-1 sm:mt-4"
                    >
                      {t('form:button-label-remove')}
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <Button
              type="button"
              onClick={() => linkAppend({ pages: [], groupName: '' })}
              className="w-full sm:w-auto"
            >
              {t('form:button-label-add-link')}
            </Button>
          </Card>
        </div>
      )}
      {!isWhiteListed && (
        <div className="my-5 flex flex-wrap border-b border-dashed border-gray-300 pb-8 sm:my-8">
          <Description
            title={t('form:links')}
            details={t('form:shop-settings-helper-text')}
            className="w-full px-0 pb-5 sm:w-4/12 sm:py-8 sm:pe-4 md:w-1/3 md:pe-5"
          />
          <Card className="w-full sm:w-8/12 md:w-2/3">
            <div>
              {linkFields.map((item, index: number) => (
                <div
                  className={classNames(
                    'py-5 first:mt-5 first:border-t last:border-b-0 md:py-8 md:first:mt-10',
                    'border-b border-dashed border-border-200 first:border-t-0 first:pt-0'
                  )}
                  key={index}
                >
                  <div className="relative">
                    <div className="mt-5">
                      <Label className="whitespace-nowrap">
                        {t('form:input-label-select-pages')}
                      </Label>
                      <SelectInput
                        name={`links.${index}.pages` as const}
                        getOptionLabel={(option: any) => option.title}
                        getOptionValue={(option: any) => option.name}
                        control={control}
                        options={storeLayouts}
                        loading={layoutLoading}
                        isMulti
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}
      <div className="my-5 flex flex-wrap border-b border-dashed border-gray-300 pb-8 sm:my-8">
        <Description
          title={t('form:social-settings')}
          details={t('form:shop-settings-helper-text')}
          className="w-full px-0 pb-5 sm:w-4/12 sm:py-8 sm:pe-4 md:w-1/3 md:pe-5"
        />
        <Card className="w-full sm:w-8/12 md:w-2/3">
          <div>
            {socialFields.map((item, index: number) => (
              <div
                className="border-b border-dashed border-border-200 py-5 first:mt-5 first:border-t last:border-b-0 md:py-8 md:first:mt-10"
                key={index}
              >
                <div className="relative grid grid-cols-2 gap-5">
                  <div>
                    <Label className="whitespace-nowrap">
                      {t('form:input-label-select-platform')}
                    </Label>
                    <SelectInput
                      name={`socials.${index}.icon` as const}
                      getOptionLabel={(option: { label: string }) =>
                        option.label
                      }
                      getOptionValue={(option: { value: string }) =>
                        option.value
                      }
                      control={control}
                      options={socialIcon}
                      isClearable={true}
                      defaultValue={item?.icon!}
                    />
                  </div>
                  <Input
                    label={t('form:input-label-social-url')}
                    variant="outline"
                    inputClassName="!rounded-sm"
                    {...register(`socials.${index}.url` as const)}
                    defaultValue={item.url!} // make sure to set up defaultValue
                  />
                  <button
                    onClick={() => {
                      socialRemove(index);
                    }}
                    type="button"
                    className="absolute top-[-20px] right-0 text-sm text-red-500 transition-colors duration-200 hover:text-red-700 focus:outline-none sm:col-span-1 sm:mt-4"
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
};

export default memo(FooterForm);
