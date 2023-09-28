import { useMutation } from '@apollo/client';
import Card from '@components/common/card';
import { SaveIcon } from '@components/icons/save-icon';
import ImageModal from '@components/image-modal';
import {
  RenderTooltipMetaDescription,
  RenderTooltipMetaKeywords,
  RenderTooltipMetaTitle,
  RenderTooltipSlug
} from '@components/product/ToolTips';
import Accordion from '@components/ui/accordion';
import Button from '@components/ui/button';
import Description from '@components/ui/description';
import Input from '@components/ui/input';
import TextArea from '@components/ui/text-area';
import { UPDATE_PRODUCT_SEO } from '@graphql/product';
import { useErrorLogger } from '@hooks/useErrorLogger';
import { useGetUser } from '@hooks/useGetUser';
import { useSettings } from '@hooks/useSettings';
import { notify } from '@lib/notify';
import { Product } from '@ts-types/generated';
import { translationFallback } from '@utils/utils';
import isEmpty from 'lodash/isEmpty';
import isEqual from 'lodash/isEqual';
import { useTranslation } from 'next-i18next';
import { ChangeEvent, memo, useCallback, useEffect, useState } from 'react';
import slugify from 'slugify';

import { Actions, useFormReducer } from '../context/form.context';

type Props = {
  initialValues: Product;
  state: {
    id: number;
    name: string;
    thumbnail: Product['thumbnail'];
    productSeo: Product['productSeo'];
    isUpdateMode: boolean;
  };
  productContent: {
    id: number;
    name: Product['name'];
    note: Product['note'];
    description: Product['description'];
    status: Product['status'];
    disableOutOfStock: Product['disableOutOfStock'];
    isUpdateMode: boolean;
  };
};

const ProductSeo = ({ state, productContent, initialValues }: Props) => {
  const { t } = useTranslation();

  const [initProductSeo, setInitProductSeo] = useState<Product['productSeo']>(
    () => initialValues?.productSeo
  );

  const [isUpdated, setIsUpdated] = useState(false);

  const [error, setError] = useState(null);
  useErrorLogger(error);

  const {
    id: productId,
    name: productName,
    thumbnail,
    productSeo: {
      slug,
      metaImage,
      metaTitle,
      metaKeywords,
      metaDescription
    } = {},
    productSeo,
    isUpdateMode
  } = state;

  const { selectedLanguage } = useSettings();

  const dispatch = useFormReducer();

  const { userInfo } = useGetUser();
  const csrfToken = userInfo?.csrfToken;

  const [updateProductSeo, { loading }] = useMutation(UPDATE_PRODUCT_SEO, {
    context: {
      headers: {
        'x-csrf-token': csrfToken
      }
    },
    onCompleted: (data: { updateProductSeo: Product }) => {
      if (!isEmpty(data?.updateProductSeo)) {
        setInitProductSeo(data?.updateProductSeo?.productSeo);
        notify(t('common:successfully-updated'), 'success');
      }
    }
  });

  const checkForUpdateHandler = useCallback(() => {
    if (!isUpdateMode) return;

    const seo = initProductSeo;
    const initialProductContent = {
      slug: seo.slug,
      metaImage: seo.metaImage?.map(({ id }) => ({ id })),
      metaTitle: seo.metaTitle,
      metaKeywords: seo.metaKeywords,
      metaDescription: seo.metaDescription
    };
    const currentProductContent = {
      slug,
      metaImage: metaImage?.map(({ id }) => ({ id })),
      metaTitle,
      metaKeywords,
      metaDescription
    };

    setIsUpdated(!isEqual(initialProductContent, currentProductContent));
  }, [
    initProductSeo,
    isUpdateMode,
    metaDescription,
    metaImage,
    metaKeywords,
    metaTitle,
    slug
  ]);

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
    checkForUpdateHandler();
  }, [checkForUpdateHandler, dispatch, metaImage, thumbnail]);

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

  const updateWhenEmpty = (field: string, isSlug = true) => {
    if (isEmpty(productSeo[field])) {
      dispatch({
        type: Actions.PRODUCT_SEO,
        payload: {
          field,
          value: isSlug ? generateSlug(productName) : productName
        }
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!slug) {
      return notify('slug should not be empty', 'error');
    }

    updateProductSeo({
      variables: {
        id: productId,
        name: productContent?.name,
        description: productContent?.description,
        note: productContent?.note,
        language: selectedLanguage,
        productSeo: {
          slug,
          metaImage: metaImage?.map(({ id }) => ({ id })),
          metaTitle,
          metaKeywords,
          metaDescription
        }
      }
    }).catch((err) => {
      setError(err);
    });
  };

  const renderSaveButton = () => {
    if (isUpdated) {
      return (
        <div className="mt-8 flex justify-end border-t pt-4">
          <Button loading={loading} disabled={loading} onClick={handleSubmit}>
            <div className="mr-1">
              <SaveIcon width="1.3rem" height="1.3rem" />
            </div>
            <div>{t('form:button-label-save')}</div>
          </Button>
        </div>
      );
    }
    return null;
  };

  const descriptionLength = metaDescription?.length ?? 0;

  return (
    <Accordion isUpdated={isUpdated} Title={() => t('form:form-title-seo')}>
      <div className="my-5 flex flex-wrap sm:my-8">
        <Description
          details={t('form:type-and-category-help-text')}
          className="w-full px-0 pb-5 sm:w-4/12 sm:py-8 md:w-1/3"
        />
        <Card className="w-full sm:w-8/12 md:w-2/3">
          <Input
            label={t('form:input-label-meta-slug')}
            isRequiredLabel
            name="slug"
            value={slug}
            onChange={handleChange}
            placeholder="Slug..."
            variant="outline"
            className="mb-5"
            onFocus={() => updateWhenEmpty('slug')}
            onBlur={checkForUpdateHandler}
            renderTooltip={<RenderTooltipSlug />}
          />
          <Input
            label={t('form:input-label-meta-title')}
            isRequiredLabel
            name="metaTitle"
            value={metaTitle}
            onChange={handleChange}
            variant="outline"
            className="mb-5"
            onFocus={() => updateWhenEmpty('metaTitle', false)}
            onBlur={checkForUpdateHandler}
            renderTooltip={<RenderTooltipMetaTitle />}
            placeholder={translationFallback(
              initialValues?.productSeo,
              'metaTitle',
              'Enter meta title'
            )}
          />
          <TextArea
            label={t('form:input-label-meta-keywords')}
            name="metaKeywords"
            value={metaKeywords}
            onChange={handleChange}
            variant="outline"
            className="mb-5"
            onBlur={checkForUpdateHandler}
            renderTooltip={<RenderTooltipMetaKeywords />}
            placeholder={translationFallback(
              initialValues?.productSeo,
              'metaKeywords',
              'Accessories, keywords...'
            )}
          />
          <TextArea
            label={t('form:item-meta-description')}
            isRequiredLabel
            name="metaDescription"
            value={metaDescription}
            onChange={handleChange}
            // error={t(errors.productSeo?.metaDescription?.message!)}
            variant="outline"
            onBlur={checkForUpdateHandler}
            renderTooltip={<RenderTooltipMetaDescription />}
            placeholder={translationFallback(
              initialValues?.productSeo,
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
            {descriptionLength < 160 ? (
              <span className="text-green-600">{`(${descriptionLength}/160 characters max)`}</span>
            ) : (
              <span className="text-red-600">
                {`(${descriptionLength}/160 characters max)`}
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
          {renderSaveButton()}
        </Card>
      </div>
    </Accordion>
  );
};

export default memo(ProductSeo);
