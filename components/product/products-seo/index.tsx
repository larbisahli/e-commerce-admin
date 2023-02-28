import Card from '@components/common/card';
import { SaveIcon } from '@components/icons/save-icon';
import ImageModal from '@components/image-modal';
import Accordion from '@components/ui/accordion';
import Button from '@components/ui/button';
import Description from '@components/ui/description';
import Input from '@components/ui/input';
import TextArea from '@components/ui/text-area';
import { Product } from '@ts-types/generated';
import isEmpty from 'lodash/isEmpty';
import { useTranslation } from 'next-i18next';
import { ChangeEvent, useEffect } from 'react';
import slugify from 'slugify';

import { Actions, useForm } from '../context/form.context';

type Props = {
  initialValues: Product | any;
};

const ProductSeo = ({ initialValues }: Props) => {
  const { t } = useTranslation();

  const {
    state: {
      name: productName,
      thumbnail,
      productSeo: { slug, metaImage, metaTitle, metaKeywords, metaDescription },
      productSeo
    },
    dispatch
  } = useForm();

  useEffect(() => {
    if (isEmpty(metaImage)) {
      dispatch({
        type: Actions.PRODUCT_SEO,
        payload: {
          field: 'metaImage',
          value: thumbnail
        }
      });
    }
  }, [dispatch, metaImage, thumbnail]);

  const generateSlug = (slug = '') => {
    return slugify(slug?.replace(/[^A-Za-z0-9\s!?]/g, '-') ?? '', {
      trim: false,
      replacement: '-',
      lower: true
    });
  };

  useEffect(() => {
    const value = generateSlug(slug);
    dispatch({
      type: Actions.PRODUCT_SEO,
      payload: {
        field: 'slug',
        value
      }
    });
  }, [dispatch, slug]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    dispatch({
      type: Actions.PRODUCT_SEO,
      payload: {
        field: name,
        value
      }
    });
  };

  const handleImageChange = (photo) => {
    dispatch({
      type: Actions.PRODUCT_SEO,
      payload: {
        field: 'metaImage',
        value: photo
      }
    });
  };

  const updateWhenEmpty = (field: string) => {
    if (isEmpty(productSeo[field])) {
      dispatch({
        type: Actions.PRODUCT_SEO,
        payload: {
          field,
          value: generateSlug(productName)
        }
      });
    }
  };

  return (
    <Accordion Title={() => t('form:form-title-seo')}>
      <div className="flex flex-wrap my-5 sm:my-8">
        <Description
          details={t('form:type-and-category-help-text')}
          className="w-full px-0 pb-5 sm:w-4/12 md:w-1/3 sm:py-8"
        />
        <Card className="w-full sm:w-8/12 md:w-2/3">
          <Input
            label={`${t('form:input-label-meta-slug')}*`}
            name="slug"
            value={slug}
            onChange={handleChange}
            placeholder="Slug..."
            variant="outline"
            className="mb-5"
            onFocus={() => updateWhenEmpty('slug')}
          />
          <Input
            label={`${t('form:input-label-meta-title')}*`}
            name="metaTitle"
            value={metaTitle}
            onChange={handleChange}
            placeholder="Title..."
            variant="outline"
            className="mb-5"
            onFocus={() => updateWhenEmpty('metaTitle')}
          />
          <TextArea
            label={`${t('form:input-label-meta-keywords')}*`}
            name="metaKeywords"
            value={metaKeywords}
            onChange={handleChange}
            variant="outline"
            className="mb-5"
            placeholder="Products, keywords, ..."
          />
          <TextArea
            label={`${t('form:item-meta-description')}*`}
            name="metaDescription"
            value={metaDescription}
            onChange={handleChange}
            // error={t(errors.productSeo?.metaDescription?.message!)}
            variant="outline"
          />
          <div
            style={{ fontSize: '.75rem' }}
            className="mb-5 flex items-center"
          >
            <p className="text-body mr-2">
              Meta Description should optimally be between 150-160 characters
            </p>
            {metaDescription?.length < 160 ? (
              <span className="text-green-600">{`(${
                metaDescription?.length ?? 0
              }/160 characters max)`}</span>
            ) : (
              <span className="text-red-600">
                {`(${metaDescription?.length ?? 0}/160 characters max)`}
              </span>
            )}
          </div>
          <div className="my-5">
            <ImageModal
              onSelect={handleImageChange}
              isThumbnail
              selected={metaImage}
              modalId="metaImage"
              label="form:label-add-meta-images"
            />
          </div>
          {!isEmpty(initialValues) && (
            <div className="mt-12 flex justify-end border-t pt-4">
              <Button
              // loading={updating || creating}
              // disabled={updating || creating}
              >
                <div className="mr-1">
                  <SaveIcon width="1.3rem" height="1.3rem" />
                </div>
                <div>{t('form:button-label-save')}</div>
              </Button>
            </div>
          )}
        </Card>
      </div>
    </Accordion>
  );
};

export default ProductSeo;
