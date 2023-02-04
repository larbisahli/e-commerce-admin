import Card from '@components/common/card';
import ImageModal from '@components/image-modal';
import Description from '@components/ui/description';
import Input from '@components/ui/input';
import TextArea from '@components/ui/text-area';
import isEmpty from 'lodash/isEmpty';
import { useTranslation } from 'next-i18next';
import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import slugify from 'slugify';

const ProductSeo = () => {
  const { t } = useTranslation();

  const [metaDescriptionLength, setMetaDescriptionLength] = useState(0);

  const {
    getValues,
    setValue,
    watch,
    register,
    formState: { errors }
  } = useFormContext();

  const thumbnail = watch('thumbnail');
  const metaImage = watch('productSeo.metaImage');
  const slug = watch('productSeo.slug');

  useEffect(() => {
    console.log({ metaImage, thumbnail });
    if (isEmpty(metaImage)) {
      setValue('productSeo.metaImage', thumbnail);
    }
  }, [metaImage, setValue, thumbnail]);

  const generateSlug = (slug = '') => {
    return slugify(slug?.replace(/[^A-Za-z0-9\s!?]/g, '-'), {
      trim: false,
      replacement: '-',
      lower: true
    });
  };

  useEffect(() => {
    const value = generateSlug(slug);
    setValue('productSeo.slug', value);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  return (
    <div className="flex flex-wrap my-5 sm:my-8">
      <Description
        details={t('form:type-and-category-help-text')}
        className="w-full px-0 pb-5 sm:w-4/12 md:w-1/3 sm:py-8"
      />
      <Card className="w-full sm:w-8/12 md:w-2/3">
        <Input
          label={`${t('form:input-label-meta-slug')}*`}
          {...register('productSeo.slug')}
          placeholder="Slug..."
          variant="outline"
          className="mb-5"
          onFocus={() => {
            const productName = getValues('name');
            const metaTitle = getValues('productSeo.slug');
            if (isEmpty(metaTitle)) {
              setValue('productSeo.slug', generateSlug(productName));
            }
          }}
        />
        <Input
          label={`${t('form:input-label-meta-title')}*`}
          {...register('productSeo.metaTitle')}
          placeholder="Title..."
          variant="outline"
          className="mb-5"
          onFocus={() => {
            const productName = getValues('name');
            const metaTitle = getValues('productSeo.metaTitle');
            if (isEmpty(metaTitle)) {
              setValue('productSeo.metaTitle', productName);
            }
          }}
        />
        <TextArea
          label={`${t('form:input-label-meta-keywords')}*`}
          // @ts-ignore
          {...register('productSeo.metaKeywords')}
          variant="outline"
          className="mb-5"
          placeholder="Products, keywords, ..."
        />
        <TextArea
          label={`${t('form:item-meta-description')}*`}
          // @ts-ignore
          {...register('productSeo.metaDescription')}
          onBlur={() =>
            setMetaDescriptionLength(
              getValues('productSeo.metaDescription')?.length
            )
          }
          error={t(errors.productSeo?.metaDescription?.message!)}
          variant="outline"
        />
        <div style={{ fontSize: '.75rem' }} className="mb-5 flex items-center">
          <p className="text-body mr-2">
            Meta Description should optimally be between 150-160 characters
          </p>
          {metaDescriptionLength <= 160 ? (
            <span className="text-green-600">{`(${metaDescriptionLength}/160 characters max)`}</span>
          ) : (
            <span className="text-red-600">
              {`(${metaDescriptionLength}/160 characters max)`}
            </span>
          )}
        </div>
        <div className="my-5">
          <ImageModal
            onSelect={(photo) => setValue('productSeo.metaImage', photo)}
            isThumbnail
            selected={metaImage}
            modalId="metaImage"
            label="form:label-add-meta-images"
          />
        </div>
      </Card>
    </div>
  );
};

export default ProductSeo;
