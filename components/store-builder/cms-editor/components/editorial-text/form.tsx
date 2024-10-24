import { useMutation } from '@apollo/client';
import Card from '@components/common/card';
import Loader from '@components/ui/loader/loader';
import { useModalAction } from '@components/ui/modal/modal.context';
import { UPDATE_LAYOUT_COMPONENT_CONTENT } from '@graphql/content';
import { useErrorLogger, useGetClient } from '@hooks/index';
import { useAppDispatch } from '@hooks/useGetClient';
import { useSettings } from '@hooks/useSettings';
import { useUI } from '@hooks/useUI';
import { notify } from '@lib/index';
import { setEtag } from '@store/client';
import type { StoreLayoutComponentType } from '@ts-types/generated';
import cloneDeep from 'lodash/cloneDeep';
import isEmpty from 'lodash/isEmpty';
import dynamic from 'next/dynamic';
import { useTranslation } from 'next-i18next';
import { memo, useState } from 'react';
import React from 'react';
import { useForm } from 'react-hook-form';

import FormActions from '../../helpers/FormActions';

const Editor = dynamic(() => import('@components/ui/editor'), {
  loading: () => <Loader height="150px" text="Editor..." />,
  ssr: false
});

type FormValues = {
  content: string;
};

const defaultValues = {};

type IProps = {
  initialValues?: StoreLayoutComponentType;
};

const EditorialTextForm = ({ initialValues }: IProps) => {
  const { t } = useTranslation();

  const data = initialValues.data;
  const [error, setError] = useState(null);
  const { selectedLanguage } = useSettings();

  const { updateBuilderInfo } = useUI();
  const dispatch = useAppDispatch();

  const { handleSubmit, watch, setValue } = useForm<FormValues>({
    defaultValues: !isEmpty(data)
      ? cloneDeep({ ...data })
      : (defaultValues as FormValues)
  });

  const { userInfo } = useGetClient();
  const { closeModal } = useModalAction();
  const csrfToken = userInfo?.csrfToken;

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

  const onSubmit = async (values: FormValues) => {
    const variables = {
      componentId: initialValues.componentId,
      contentId: initialValues?.contentId,
      language: selectedLanguage,
      data: {
        content: values.content
      }
    };

    updateLayoutComponent({ variables }).catch((err) => {
      setError(err);
    });
  };

  const handleEditorChange = (value) => {
    setValue('content', value);
  };

  const content = watch('content');

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormActions
        btnLabel={t('form:button-label-save-content')}
        title="Component Content"
        disabled={updating}
        loading={updating}
      />
      <div className="my-5 flex flex-wrap border-b border-dashed border-border-base pb-8 sm:my-8">
        <Card className="min-h-[250px] w-full">
          <Editor
            name="content"
            value={content}
            onChange={handleEditorChange}
            className="mb-5"
            editorClassName="min-h-[250px]"
            defaultValue=""
            placeholder={'Your content goes here...'}
            options={[
              'inline',
              'blockType',
              'fontSize',
              'list',
              'textAlign',
              'colorPicker',
              'emoji',
              'link',
              'history'
            ]}
          />
        </Card>
      </div>
    </form>
  );
};

export default memo(EditorialTextForm);
