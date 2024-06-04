import { useMutation } from '@apollo/client';
import Card from '@components/common/card';
import Description from '@components/ui/description';
import Label from '@components/ui/label';
import Select from '@components/ui/select/select';
import { UPDATE_LAYOUT_COMPONENT_STYLES } from '@graphql/content';
import { useErrorLogger, useGetUser } from '@hooks/index';
import { useUI } from '@hooks/useUI';
import { notify } from '@lib/index';
import type { StoreLayoutComponentType } from '@ts-types/generated';
import cloneDeep from 'lodash/cloneDeep';
import isEmpty from 'lodash/isEmpty';
import { useTranslation } from 'next-i18next';
import { memo, useState } from 'react';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import FormActions from '../../helpers/FormActions';
import ContainerWidth from '../common/containerWidth';
import { fontFamilyOptions } from '../common/data';

type FormValues = {
  fontFamily: any;
  sectionSize: string;
};

const defaultValues = {};

type IProps = {
  initialValues?: any;
};

const EditorialTextStyles = ({ initialValues }: IProps) => {
  const { t } = useTranslation();

  const [error, setError] = useState(null);

  const data = initialValues?.styles;

  const { updateBuilderInfo } = useUI();

  const methods = useForm<FormValues>({
    defaultValues: !isEmpty(data)
      ? cloneDeep({ ...data })
      : (defaultValues as FormValues)
  });

  const { userInfo } = useGetUser();
  const csrfToken = userInfo?.csrfToken;

  const [updateLayoutComponent, { loading: updating }] = useMutation(
    UPDATE_LAYOUT_COMPONENT_STYLES,
    {
      context: {
        headers: {
          'x-csrf-token': csrfToken
        }
      },
      onCompleted: (data: {
        UpdateLayoutComponentStyles: StoreLayoutComponentType;
      }) => {
        if (!isEmpty(data)) {
          notify(t('common:successfully-updated'), 'success', {
            position: 'top-center',
            autoClose: 2000
          });
          updateBuilderInfo({ isReloadIframe: true });
        }
      }
    }
  );

  useErrorLogger(error);

  const onSubmit = async (values: FormValues) => {
    const variables = {
      componentId: initialValues.componentId,
      styles: {
        sectionSize: values.sectionSize,
        fontFamily: values.fontFamily
      }
    };
    updateLayoutComponent({ variables }).catch((err) => {
      setError(err);
    });
  };

  const sectionSize = methods.watch('sectionSize');
  const fontFamily = methods.watch('fontFamily');

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <FormActions
          isLang={false}
          btnLabel={t('form:button-label-save-styles')}
          title="Component Style"
          disabled={updating}
          loading={updating}
        />
        <div className="rounded- rounded- rounded- rounded- my-5 flex flex-wrap sm:my-8">
          <Description
            title={t('form:input-label-configuration')}
            details={`${
              data
                ? t('form:item-description-edit')
                : t('form:item-description-add')
            } ${t('form:hero-slider-description-helper-text')}`}
            className="w-full px-0 pb-5 sm:w-4/12 sm:py-8 sm:pe-4 md:w-1/3 md:pe-5"
          />
          <Card className="w-full sm:w-8/12 md:w-2/3">
            <div className="">
              <div className="flex items-center justify-between">
                <Label>Font family</Label>
                <div className="w-[40%]">
                  <Select
                    name="fontFamily"
                    value={fontFamily}
                    onChange={(value) => methods.setValue('fontFamily', value)}
                    getOptionLabel={(option: any) => option.label}
                    getOptionValue={(option: any) => option.value}
                    options={fontFamilyOptions}
                  />
                </div>
              </div>
            </div>
            <div className="mt-5 flex items-center justify-between">
              <Label>{t('form:input-label-section-size')}</Label>
              <ContainerWidth
                value={sectionSize}
                setValue={(value) => methods.setValue('sectionSize', value)}
              />
            </div>
          </Card>
        </div>
      </form>
    </FormProvider>
  );
};

export default memo(EditorialTextStyles);
