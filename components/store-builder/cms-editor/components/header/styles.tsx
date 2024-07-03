import { useMutation } from '@apollo/client';
import Card from '@components/common/card';
import Description from '@components/ui/description';
import Label from '@components/ui/label';
import { useModalAction } from '@components/ui/modal/modal.context';
import SelectInput from '@components/ui/select-input';
import { UPDATE_LAYOUT_COMPONENT_STYLES } from '@graphql/content';
import { useErrorLogger, useGetClient } from '@hooks/index';
import { useAppDispatch } from '@hooks/useGetClient';
import { useUI } from '@hooks/useUI';
import { notify } from '@lib/index';
import { setEtag } from '@store/client';
import { PageBuilderStyles } from '@ts-types/custom.types';
import type { StoreLayoutComponentType } from '@ts-types/generated';
import cloneDeep from 'lodash/cloneDeep';
import isEmpty from 'lodash/isEmpty';
import { useTranslation } from 'next-i18next';
import { memo, useState } from 'react';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import FormActions from '../../helpers/FormActions';
import Border from '../common/Border';
import ContainerWidth from '../common/containerWidth';
import { ObjectFitTooltipContent } from '../common/ToolTips';
import Typography from '../common/Typography';

const objectFitOptions = [
  { value: 'fill' },
  { value: 'cover' },
  { value: 'contain' },
  { value: 'scale-down' },
  { value: 'none' }
];

type FormValues = {
  sectionSize: string;
  header: PageBuilderStyles['Typography'];
  description: PageBuilderStyles['Typography'];
  imageBorder: PageBuilderStyles['Border'];
  objectFit: { value: string };
};

const defaultValues = {};

type IProps = {
  initialValues?: any;
};

const HeaderStyles = ({ initialValues }: IProps) => {
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
        sectionSize: values.sectionSize,
        header: values.header,
        description: values.description,
        imageBorder: values.imageBorder,
        objectFit: values.objectFit
      }
    };
    updateLayoutComponent({ variables }).catch((err) => {
      setError(err);
    });
  };

  const sectionSize = methods.watch('sectionSize');

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
            <div className="mb-5">
              <Typography label={'Header'} name={'header'} />
            </div>
            <div className="mb-5">
              <Typography label={'Description'} name={'description'} />
            </div>
            <div className="mb-5">
              <Border label={'Image Border'} name={'imageBorder'} />
            </div>
            <div className="mb-3">
              <div className="flex items-center justify-between">
                <Label
                  tooltipId="objectFit"
                  renderTooltip={<ObjectFitTooltipContent />}
                >
                  {t('form:input-label-object-fit')}
                </Label>
                <div className="w-32">
                  <SelectInput
                    name="objectFit"
                    control={methods.control}
                    getOptionLabel={(option) => option.value}
                    getOptionValue={(option) => option.value}
                    options={objectFitOptions}
                  />
                </div>
              </div>
            </div>
            <div className="mt-5 flex items-center justify-between">
              <Label>{t('form:input-label-section-size')}</Label>
              <ContainerWidth
                value={sectionSize}
                setValue={(v) => methods.setValue('sectionSize', v)}
              />
            </div>
          </Card>
        </div>
      </form>
    </FormProvider>
  );
};

export default memo(HeaderStyles);
