import { useMutation } from '@apollo/client';
import Card from '@components/common/card';
import FormActions from '@components/common/FormActions';
import ImageModal from '@components/image-modal';
import Description from '@components/ui/description';
import Input from '@components/ui/input';
import Label from '@components/ui/label';
import Loader from '@components/ui/loader/loader';
import TextArea from '@components/ui/text-area';
import { UPDATE_PAGE } from '@graphql/pages';
import { useErrorLogger, useGetUser } from '@hooks/index';
import { useSettings } from '@hooks/useSettings';
import { notify } from '@lib/index';
import type { PageType } from '@ts-types/generated';
import { translationFallback } from '@utils/utils';
import isEmpty from 'lodash/isEmpty';
import dynamic from 'next/dynamic';
import { useTranslation } from 'next-i18next';
import { useState } from 'react';
import React from 'react';
import { useForm } from 'react-hook-form';

const Editor = dynamic(() => import('@components/ui/editor'), {
  loading: () => <Loader height="150px" text="Editor..." />,
  ssr: false
});

type FormValues = PageType;

const defaultValues = {
  content: '',
  name: '',
  seo: {
    metaTitle: ''
  }
};

type IProps = {
  initialValues?: PageType | any;
};

export default function AboutUsForm({ initialValues }: IProps) {
  const { t } = useTranslation();

  const [error, setError] = useState(null);

  const { watch, setValue, register, handleSubmit } = useForm<FormValues>({
    defaultValues: !isEmpty(initialValues) ? initialValues : defaultValues
  });

  const { selectedLanguage } = useSettings();

  const { userInfo } = useGetUser();
  const csrfToken = userInfo?.csrfToken;

  const [updatePage, { loading: updating }] = useMutation(UPDATE_PAGE, {
    context: {
      headers: {
        'x-csrf-token': csrfToken
      }
    },
    onCompleted: (data: { updatePage: PageType }) => {
      if (!isEmpty(data)) {
        notify(t('common:successfully-updated'), 'success');
      }
    }
  });

  useErrorLogger(error);

  const onSubmit = async (values: FormValues) => {
    if (isEmpty(values.name)) {
      notify('Page name is required', 'warning');
    }

    const variables = {
      name: values.name,
      content: values.content,
      ogMedia: values?.ogMedia?.map(({ id }) => ({ id })),
      metaTitle: values?.metaTitle,
      metaDescription: values?.metaDescription,
      language: selectedLanguage
    };

    updatePage({
      variables: { slug: initialValues.slug, ...variables }
    }).catch((err) => {
      setError(err);
    });
  };

  const name = watch('name');
  const content = watch('content');
  const metaDescription = watch('metaDescription');
  const ogMedia = watch('ogMedia');

  const metaDesLen = metaDescription?.length ?? 0;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormActions
        forceSystemLang={isEmpty(initialValues)}
        title={name ?? initialValues?.translated?.name}
        loading={updating}
        disabled={updating}
        showCancel={false}
        hideBackLink
      />
      <div className="my-5 flex flex-wrap sm:my-8">
        <Description
          title={t('form:input-label-page-content')}
          details={`${
            initialValues
              ? t('form:item-description-edit')
              : t('form:item-description-add')
          } ${t('form:hero-slider-description-helper-text')}`}
          className="w-full px-0 pb-5 sm:w-4/12 sm:py-8 sm:pe-4 md:w-1/3 md:pe-5"
        />
        <Card className="w-full sm:w-8/12 md:w-2/3">
          <Input
            label={t('form:input-label-name')}
            placeholder={translationFallback(
              initialValues,
              'name',
              'Enter page name'
            )}
            isRequiredLabel
            {...register('name')}
            variant="outline"
            className="mb-5"
          />
          <Label>{t('form:input-label-body')}</Label>
          <Editor
            name="description"
            value={content}
            onChange={(value) => setValue('content', value)}
            className="mb-5"
            defaultValue=""
            placeholder={'Enter page content'}
          />
        </Card>
      </div>
      <div className="my-5 flex flex-wrap sm:my-8">
        <Description
          title={t('form:input-label-page-seo')}
          details={t('form:type-product-group-help-text')}
          className="w-full px-0 pb-5 sm:w-4/12 sm:py-8 md:w-1/3"
        />
        <Card className="w-full sm:w-8/12 md:w-2/3">
          <Input
            label={t('form:input-label-meta-title')}
            {...register('metaTitle')}
            variant="outline"
            className="mb-5"
            placeholder={translationFallback(
              initialValues,
              'metaTitle',
              'Enter meta title'
            )}
          />
          <TextArea
            label={t('form:item-meta-description')}
            {...register('metaDescription')}
            // error={t(errors.productSeo?.metaDescription?.message!)}
            variant="outline"
            placeholder={translationFallback(
              initialValues,
              'metaDescription',
              'Enter meta description'
            )}
          />
          <div
            style={{ fontSize: '.75rem' }}
            className="mb-5 flex flex-wrap items-center"
          >
            <p className="mr-2 text-body">
              Meta Description should optimally be between 150-160 characters
            </p>
            {metaDesLen < 160 ? (
              <span className="text-green-600">{`(${metaDesLen}/160 characters max)`}</span>
            ) : (
              <span className="text-red-600">
                {`(${metaDesLen}/160 characters max)`}
              </span>
            )}
          </div>
          <div className="my-5">
            <ImageModal
              onSelect={(img) => setValue('ogMedia', img)}
              isThumbnail
              selected={ogMedia}
              modalId="metaImage"
              label="form:label-add-meta-images"
            />
          </div>
        </Card>
      </div>
    </form>
  );
}
