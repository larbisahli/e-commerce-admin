import { useMutation } from '@apollo/client';
import Card from '@components/common/card';
import ImageModal from '@components/image-modal';
import Description from '@components/ui/description';
import Input from '@components/ui/input';
import { useModalAction } from '@components/ui/modal/modal.context';
import TextArea from '@components/ui/text-area';
import { CREATE_LAYOUT, UPDATE_LAYOUT } from '@graphql/content';
import { useErrorLogger } from '@hooks/useErrorLogger';
import { useGetClient } from '@hooks/useGetClient';
import { useSettings } from '@hooks/useSettings';
import { useUI } from '@hooks/useUI';
import { notify } from '@lib/notify';
import { NEW_PAGE_MODAL } from '@ts-types/constants';
import { ImageType } from '@ts-types/generated';
import { ROUTES } from '@utils/routes';
import { getBuilderSrc } from '@utils/utils';
import { isEmpty } from 'lodash';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { memo, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import slugify from 'slugify';

import FormActions from '../helpers/FormActions';

type FormValues = {
  title: string;
  slug: string;
  seo: {
    metaTitle: string;
    metaDescription: string;
    ogTitle: string;
    ogDescription: string;
    ogImage: ImageType[];
    metaTags: string;
  };
};

const defaultValues = {
  title: null,
  slug: null,
  seo: {
    metaTitle: ''
  }
};

interface Props {
  initialValue: any | null;
}

const NewPageForm = (props: Props) => {
  const { t } = useTranslation();
  const router = useRouter();

  const { closeModal } = useModalAction();

  const { updateBuilderInfo } = useUI();

  const initialValue = props?.initialValue;

  const { handleSubmit, register, watch, setValue } = useForm<FormValues>({
    defaultValues: initialValue
      ? {
          title: initialValue?.title,
          slug: initialValue?.name,
          seo: initialValue?.metadata?.seo
        }
      : defaultValues
  });

  const [error, setError] = useState(null);

  const { selectedLanguage } = useSettings();

  const { userInfo } = useGetClient();
  const alias = userInfo?.store?.alias;
  const csrfToken = userInfo?.csrfToken;

  const [createLayout, { loading: createLoading }] = useMutation(
    CREATE_LAYOUT,
    {
      context: {
        headers: {
          'x-csrf-token': csrfToken
        }
      },
      onCompleted: (data: { createLayout: { id: string; name: string } }) => {
        const createLayout = data?.createLayout;
        if (!isEmpty(createLayout)) {
          notify(t('common:successfully-create'), 'success', {
            position: 'top-center',
            autoClose: 2000
          });
          closeModal(NEW_PAGE_MODAL);
          router.push(`${ROUTES.BUILDER_LAYOUT}/${createLayout.name}`, null, {
            shallow: false
          });
          const iframeSrc = getBuilderSrc(alias, `pages/${createLayout.name}`);
          updateBuilderInfo({ isReloadIframe: true, iframeSrc });
        }
      }
    }
  );

  const [updateLayout, { loading: updateLoading }] = useMutation(
    UPDATE_LAYOUT,
    {
      context: {
        headers: {
          'x-csrf-token': csrfToken
        }
      },
      onCompleted: (data: { updateLayout: { id: string; name: string } }) => {
        const updateLayout = data?.updateLayout;
        if (!isEmpty(updateLayout)) {
          notify(t('common:successfully-updated'), 'success', {
            position: 'top-center',
            autoClose: 2000
          });
          closeModal(NEW_PAGE_MODAL);
          router.push(`${ROUTES.BUILDER_LAYOUT}/${updateLayout.name}`, null, {
            shallow: false
          });
        }
      }
    }
  );

  useErrorLogger(error);

  const onSubmit = async (values: FormValues) => {
    if (isEmpty(initialValue)) {
      createLayout({
        variables: {
          title: values.title,
          slug: values.slug,
          metadata: { seo: values?.seo },
          language: selectedLanguage
        }
      }).catch((err) => {
        setError(err);
      });
    } else {
      updateLayout({
        variables: {
          id: initialValue?.id,
          title: values.title,
          slug: values.slug,
          metadata: { seo: values?.seo },
          language: selectedLanguage
        }
      }).catch((err) => {
        setError(err);
      });
    }
  };

  const generateSlug = (slug = '') => {
    return slugify(slug?.replace(/[^A-Za-z0-9\s!?]/g, '-') ?? '', {
      trim: false,
      replacement: '-',
      lower: true
    });
  };

  const metaDescription = watch('seo.metaDescription');
  const ogDescription = watch('seo.ogDescription');
  const slug = watch('slug');
  const ogImage = watch('seo.ogImage');

  const metaDesLen = metaDescription?.length ?? 0;
  const ogDesLen = ogDescription?.length ?? 0;

  useEffect(() => {
    const value = generateSlug(slug);
    setValue('slug', value);
  }, [setValue, slug]);

  return (
    <form className="mb-22 h-fit" onSubmit={handleSubmit(onSubmit)}>
      <FormActions
        btnLabel={t('form:button-label-save')}
        title="New Page"
        disabled={createLoading || updateLoading}
        loading={createLoading || updateLoading}
      />
      <div className="my-5 flex flex-wrap sm:my-8">
        <Description
          title={t('form:input-label-page-content')}
          details={`${t('form:item-description-add')} ${t(
            'form:hero-slider-description-helper-text'
          )}`}
          className="w-full px-0 pb-5 sm:w-4/12 sm:py-8 sm:pe-4 md:w-1/3 md:pe-5"
        />
        <Card className="w-full sm:w-8/12 md:w-2/3">
          <Input
            label={'Title'}
            {...register('title')}
            placeholder={'Page Title'}
            variant="outline"
            className="mb-5"
          />
          <Input
            label={'Slug'}
            {...register('slug')}
            placeholder={'Page Slug'}
            variant="outline"
            className="mb-5"
          />
          {slug && (
            <div className="text-xs text-gray-500">
              <span>Final URL:</span>
              <span className="px-1 font-medium text-gray-800">{`/pages/${slug}`}</span>
            </div>
          )}
        </Card>
      </div>
      <div className="my-5 flex flex-wrap sm:my-8">
        <Description
          title={t('form:input-label-page-seo')}
          details={t('form:type-product-group-help-text')}
          className="w-full px-0 pb-5 sm:w-4/12 sm:py-8 sm:pe-4 md:w-1/3 md:pe-5"
        />
        <Card className="w-full sm:w-8/12 md:w-2/3">
          <Input
            label={t('form:input-label-meta-title')}
            {...register('seo.metaTitle')}
            variant="outline"
            className="mb-5"
            placeholder="Enter meta title"
          />
          <TextArea
            label={t('form:item-meta-description')}
            {...register('seo.metaDescription')}
            // error={t(errors.productSeo?.metaDescription?.message!)}
            variant="outline"
            placeholder="Enter meta description"
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
          <Input
            label={t('form:input-label-meta-tags')}
            {...register('seo.metaTags')}
            variant="outline"
            className="mb-5"
            placeholder="tag1, tag2, tag3..."
            note="Use a comma to separate the meta keywords"
          />
          <Input
            label={t('form:input-label-og-title')}
            {...register('seo.ogTitle')}
            variant="outline"
            className="mb-5"
          />
          <TextArea
            label={t('form:input-label-og-description')}
            {...register('seo.ogDescription')}
            variant="outline"
          />
          <div
            style={{ fontSize: '.75rem' }}
            className="mb-5 flex flex-wrap items-center"
          >
            <p className="mr-2 text-body">
              OG Description should optimally be between 55-160 characters
            </p>
            {metaDesLen < 160 ? (
              <span className="text-green-600">{`(${ogDesLen}/160 characters max)`}</span>
            ) : (
              <span className="text-red-600">
                {`(${metaDesLen}/160 characters max)`}
              </span>
            )}
          </div>
          <div className="my-5">
            <ImageModal
              onSelect={(img) => setValue('seo.ogImage', img)}
              isThumbnail
              selected={ogImage}
              modalId="metaImage"
              label="form:input-label-og-image"
            />
          </div>
        </Card>
      </div>
    </form>
  );
};

export default memo(NewPageForm);
