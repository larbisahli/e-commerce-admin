import 'rc-slider/assets/index.css';

import { useMutation } from '@apollo/client';
import Card from '@components/common/card';
import Description from '@components/ui/description';
import Label from '@components/ui/label';
import { useModalAction } from '@components/ui/modal/modal.context';
import { UPDATE_LAYOUT_COMPONENT_STYLES } from '@graphql/content';
import { useErrorLogger, useGetClient } from '@hooks/index';
import { useAppDispatch } from '@hooks/useGetClient';
import { useUI } from '@hooks/useUI';
import { notify } from '@lib/index';
import { setEtag } from '@store/client';
import type { StoreLayoutComponentType } from '@ts-types/generated';
import cloneDeep from 'lodash/cloneDeep';
import isEmpty from 'lodash/isEmpty';
import { useTranslation } from 'next-i18next';
import Slider from 'rc-slider';
import { memo, useState } from 'react';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import FormActions from '../../helpers/FormActions';

type FormValues = {
  spaceHeight: number;
};

const defaultValues = {};

type IProps = {
  initialValues?: any;
};

const SpacerStyles = ({ initialValues }: IProps) => {
  const { t } = useTranslation();

  const [error, setError] = useState(null);

  const data = initialValues?.styles;

  const { updateBuilderInfo } = useUI();
  const dispatch = useAppDispatch();

  const methods = useForm<FormValues>({
    defaultValues: !isEmpty(data)
      ? cloneDeep({ ...data })
      : (defaultValues as FormValues)
  });

  const { userInfo } = useGetClient();
  const { closeModal } = useModalAction();
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
        updateLayoutComponentStyles: StoreLayoutComponentType;
      }) => {
        if (!isEmpty(data?.updateLayoutComponentStyles)) {
          const { etag: newEtag } = data?.updateLayoutComponentStyles ?? {};
          dispatch(setEtag({ etag: newEtag }));
          notify(t('common:successfully-updated'), 'success', {
            position: 'top-center',
            autoClose: 2000
          });
          updateBuilderInfo({ isReloadIframe: true });
          closeModal(null, null, { sectionId: initialValues.componentId });
        }
      }
    }
  );

  useErrorLogger(error);

  const onSubmit = async (values: FormValues) => {
    const variables = {
      componentId: initialValues.componentId,
      styles: {
        spaceHeight: values.spaceHeight
      }
    };
    updateLayoutComponent({ variables }).catch((err) => {
      setError(err);
    });
  };

  const spaceHeight = methods.watch('spaceHeight');

  const handleSpaceHeight = (value) => {
    methods.setValue(`spaceHeight`, value);
  };

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
            <div className="mb-3 flex w-full items-center justify-between">
              <Label>Space</Label>
              <div className="flex w-[50%] items-center justify-end">
                <Slider
                  min={0}
                  max={200}
                  value={spaceHeight}
                  trackStyle={{ background: '#3887ff' }}
                  handleStyle={{
                    background: '#1064e3',
                    borderColor: '#70aafb',
                    opacity: 1
                  }}
                  onChange={(v) => handleSpaceHeight(v)}
                />
                <div className="ml-4 flex w-fit items-center justify-center rounded-sm border border-gray-300 p-1 px-2">
                  <input
                    type="number"
                    min={0}
                    max={200}
                    value={spaceHeight}
                    className="hide-arrow w-[30px] pr-1 text-right outline-none"
                    onChange={(evt) =>
                      handleSpaceHeight(Number(evt.currentTarget.value))
                    }
                  />
                  <span>px</span>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </form>
    </FormProvider>
  );
};

export default memo(SpacerStyles);
