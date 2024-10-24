import 'rc-slider/assets/index.css';

import { useMutation } from '@apollo/client';
import Card from '@components/common/card';
import { AlignCenterIcon } from '@components/icons/builder/align-center';
import { AlignLeftIcon } from '@components/icons/builder/align-left';
import { AlignRightIcon } from '@components/icons/builder/align-right';
import Description from '@components/ui/description';
import Label from '@components/ui/label';
import { useModalAction } from '@components/ui/modal/modal.context';
import Select from '@components/ui/select/select';
import { UPDATE_LAYOUT_COMPONENT_STYLES } from '@graphql/content';
import { useErrorLogger, useGetClient } from '@hooks/index';
import { useAppDispatch } from '@hooks/useGetClient';
import { useUI } from '@hooks/useUI';
import { notify } from '@lib/index';
import { setEtag } from '@store/client';
import type { StoreLayoutComponentType } from '@ts-types/generated';
import classNames from 'classnames';
import cloneDeep from 'lodash/cloneDeep';
import isEmpty from 'lodash/isEmpty';
import { useTranslation } from 'next-i18next';
import Slider from 'rc-slider';
import { memo, useState } from 'react';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import FormActions from '../../helpers/FormActions';
import Color from '../common/color';

type FormValues = {
  lineStyle: { value: string };
  lineColor: string;
  lineWidth: number;
  lineThickness: number;
  alignment: 'start' | 'center' | 'end';
};

const defaultValues = {};

type IProps = {
  initialValues?: any;
};

const borderStyleOptions = [
  {
    value: 'solid'
  },
  {
    value: 'dashed'
  },
  {
    value: 'dotted'
  },
  {
    value: 'hidden'
  }
];

const DividerStyles = ({ initialValues }: IProps) => {
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
          closeModal(null, null, { componentId: initialValues.componentId });
        }
      }
    }
  );

  useErrorLogger(error);

  const onSubmit = async (values: FormValues) => {
    const variables = {
      componentId: initialValues.componentId,
      styles: {
        lineStyle: values.lineStyle,
        lineThickness: values.lineThickness,
        lineColor: values.lineColor,
        lineWidth: values.lineWidth,
        alignment: values.alignment
      }
    };
    updateLayoutComponent({ variables }).catch((err) => {
      setError(err);
    });
  };

  const alignment = methods.watch('alignment');
  const lineStyle = methods.watch('lineStyle');
  const lineColor = methods.watch('lineColor');
  const lineWidth = methods.watch('lineWidth');
  const lineThickness = methods.watch('lineThickness');

  const handleLineWidth = (value) => {
    methods.setValue(`lineWidth`, value);
  };

  const handleLineThickness = (value) => {
    methods.setValue(`lineThickness`, value);
  };

  const handleAlignment = (e, value) => {
    e.preventDefault();
    methods.setValue(`alignment`, value);
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
              <Label>Line width</Label>
              <div className="flex w-[50%] items-center justify-end">
                <Slider
                  min={0}
                  max={100}
                  value={lineWidth}
                  trackStyle={{ background: '#3887ff' }}
                  handleStyle={{
                    background: '#1064e3',
                    borderColor: '#70aafb',
                    opacity: 1
                  }}
                  onChange={(v) => handleLineWidth(v)}
                />
                <div className="ml-4 flex w-fit items-center justify-center rounded-sm border border-gray-300 p-1 px-2">
                  <input
                    type="number"
                    min={0}
                    max={100}
                    value={lineWidth}
                    className="hide-arrow w-[30px] pr-1 text-right outline-none"
                    onChange={(evt) =>
                      handleLineWidth(Number(evt.currentTarget.value))
                    }
                  />
                  <span>%</span>
                </div>
              </div>
            </div>
            <div className="flex w-full items-center justify-between">
              <Label>Line thickness</Label>
              <div className="flex w-[50%] items-center justify-end">
                <Slider
                  min={0}
                  max={10}
                  value={lineThickness}
                  trackStyle={{ background: '#3887ff' }}
                  handleStyle={{
                    background: '#1064e3',
                    borderColor: '#70aafb',
                    opacity: 1
                  }}
                  onChange={(v) => handleLineThickness(v)}
                />
                <div className="ml-4 flex w-fit items-center justify-center rounded-sm border border-gray-300 p-1 px-2">
                  <input
                    type="number"
                    min={0}
                    max={10}
                    value={lineThickness}
                    className="hide-arrow w-[30px] pr-1 text-right outline-none"
                    onChange={(evt) =>
                      handleLineThickness(Number(evt.currentTarget.value))
                    }
                  />
                  <span>px</span>
                </div>
              </div>
            </div>
            <div className="mt-3">
              <Color
                label={'Line color'}
                color={lineColor}
                register={methods.register(`lineColor`)}
              />
            </div>
            <div className="mt-3">
              <div className="flex items-center justify-between">
                <Label>Line style</Label>
                <div className="w-[25%]">
                  <Select
                    name="lineStyle"
                    value={lineStyle}
                    onChange={(value) =>
                      methods.setValue(`lineStyle`, value as { value: string })
                    }
                    getOptionLabel={(option: any) => option.value}
                    getOptionValue={(option: any) => option.value}
                    options={borderStyleOptions}
                  />
                </div>
              </div>
            </div>
            <div className="mt-3 flex items-center justify-between">
              <Label>Alignment</Label>
              <div className="flex items-center justify-center">
                <button
                  onClick={(e) => handleAlignment(e, 'start')}
                  title="Start"
                  className={classNames(
                    'flex h-7 w-10 items-center justify-center rounded-l-sm border-t border-b border-l border-gray-300 text-gray-600 hover:bg-gray-200 hover:text-blue-700',
                    {
                      'border-accent bg-blue-100 text-accent transition-colors hover:bg-blue-200':
                        alignment === 'start'
                    }
                  )}
                >
                  <AlignLeftIcon width={18} height={18} />
                </button>
                <button
                  onClick={(e) => handleAlignment(e, 'center')}
                  title="Center"
                  className={classNames(
                    'flex h-7 w-10 items-center justify-center border-t border-b border-r border-l border-gray-300 text-gray-600 transition-colors hover:bg-gray-200 hover:text-blue-700',
                    {
                      'border-accent bg-blue-100 text-accent hover:bg-blue-200':
                        alignment === 'center',
                      'border-l-accent': alignment === 'start',
                      '!border-r-0': alignment === 'end'
                    }
                  )}
                >
                  <AlignCenterIcon width={18} height={18} />
                </button>
                <button
                  onClick={(e) => handleAlignment(e, 'end')}
                  title="End"
                  className={classNames(
                    'flex h-7 w-10 items-center justify-center rounded-r-sm border-t border-b border-r border-gray-300 text-gray-600 hover:bg-gray-200 hover:text-blue-700',
                    {
                      'border-l border-accent border-l-accent bg-blue-100 text-accent transition-colors hover:bg-blue-200':
                        alignment === 'end'
                    }
                  )}
                >
                  <AlignRightIcon width={18} height={18} />
                </button>
              </div>
            </div>
          </Card>
        </div>
      </form>
    </FormProvider>
  );
};

export default memo(DividerStyles);
