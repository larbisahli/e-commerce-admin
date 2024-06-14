import { useMutation } from '@apollo/client';
import Card from '@components/common/card';
import { SaveIcon } from '@components/icons/save-icon';
import Accordion from '@components/ui/accordion';
import Button from '@components/ui/button';
import Checkbox from '@components/ui/checkbox';
import Description from '@components/ui/description';
// import ValidationError from '@components/ui/form-validation-error';
import Input from '@components/ui/input';
import Label from '@components/ui/label';
import Loader from '@components/ui/loader/loader';
import Radio from '@components/ui/radio';
import TextArea from '@components/ui/text-area';
import { UPDATE_PRODUCT_CONTENT } from '@graphql/product';
import { useErrorLogger, useGetUser } from '@hooks/index';
import { useSettings } from '@hooks/useSettings';
import { notify } from '@lib/notify';
import { Nullable } from '@ts-types/custom.types';
import { Product, ProductStatus } from '@ts-types/generated';
import { translationFallback } from '@utils/utils';
import isEmpty from 'lodash/isEmpty';
import isEqual from 'lodash/isEqual';
import dynamic from 'next/dynamic';
import { useTranslation } from 'next-i18next';
import { ChangeEvent, memo, useCallback, useEffect, useState } from 'react';

import { Actions, useFormReducer } from '../context/form.context';
import {
  RenderTooltipHiddenNote,
  RenderTooltipTrackInventory
} from '../ToolTips';

interface Props {
  initialValues: Nullable<Product>;
  productSeo: Product['productSeo'];
  state: {
    id: number;
    name: Product['name'];
    note: Product['note'];
    description: Product['description'];
    status: Product['status'];
    disableOutOfStock: Product['disableOutOfStock'];
    freeShipping: Product['freeShipping'];
    trackInventory: Product['trackInventory'];
    displayProductMeasurements: Product['displayProductMeasurements'];
    isUpdateMode: boolean;
  };
}

const Editor = dynamic(() => import('@components/ui/editor'), {
  loading: () => <Loader height="150px" text="Editor..." />,
  ssr: false
});

const ProductContent = ({ state, initialValues, productSeo }: Props) => {
  const { t } = useTranslation();

  const [isUpdated, setIsUpdated] = useState(false);

  const [initProductContent, setInitProductContent] = useState<Product>(
    () => initialValues
  );

  const { selectedLanguage } = useSettings();

  const [error, setError] = useState(null);
  useErrorLogger(error);

  const { userInfo } = useGetUser();
  const csrfToken = userInfo?.csrfToken;

  const [updateProductContent, { loading }] = useMutation(
    UPDATE_PRODUCT_CONTENT,
    {
      context: {
        headers: {
          'x-csrf-token': csrfToken
        }
      },
      onCompleted: (data: { updateProductContent: Product }) => {
        if (!isEmpty(data?.updateProductContent)) {
          setInitProductContent(data?.updateProductContent);
          notify(t('common:successfully-updated'), 'success');
        }
      }
    }
  );

  const {
    id,
    name,
    note,
    description,
    status,
    disableOutOfStock,
    freeShipping,
    trackInventory,
    displayProductMeasurements,
    isUpdateMode
  } = state;

  const dispatch = useFormReducer();

  const checkForUpdateHandler = useCallback(() => {
    if (!isUpdateMode) return;

    const initialProductContent = {
      name: initProductContent.name,
      description: initProductContent.description,
      published: initProductContent.published,
      note: initProductContent.note,
      disableOutOfStock: initProductContent.disableOutOfStock,
      trackInventory: initProductContent.trackInventory,
      freeShipping: initProductContent.freeShipping,
      displayProductMeasurements: initProductContent.displayProductMeasurements
    };
    const currentProductContent = {
      name,
      description,
      published: status === 'publish',
      note,
      disableOutOfStock,
      trackInventory,
      freeShipping,
      displayProductMeasurements
    };
    console.log({
      initialProductContent,
      currentProductContent,
      initProductContent
    });
    setIsUpdated(!isEqual(initialProductContent, currentProductContent));
  }, [
    description,
    disableOutOfStock,
    displayProductMeasurements,
    freeShipping,
    trackInventory,
    initProductContent,
    isUpdateMode,
    name,
    note,
    status
  ]);

  useEffect(() => {
    if (!isEmpty(initProductContent)) {
      checkForUpdateHandler();
    }
  }, [checkForUpdateHandler, initProductContent]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;

    const inputValue =
      type === 'checkbox' ? (e.target as HTMLInputElement)?.checked : value;

    dispatch({
      type: Actions.CONTENT,
      payload: {
        field: name,
        value: inputValue
      }
    });
  };

  const handleEditorChange = (value) => {
    dispatch({
      type: Actions.CONTENT,
      payload: {
        field: 'description',
        value
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.length === 0) {
      return notify('Product name should not be empty', 'error');
    }
    updateProductContent({
      variables: {
        id,
        name,
        description,
        published: status === 'publish',
        note,
        disableOutOfStock,
        trackInventory,
        freeShipping,
        displayProductMeasurements,
        productSeo: {
          metaTitle: productSeo?.metaTitle,
          metaKeywords: productSeo?.metaKeywords,
          metaDescription: productSeo?.metaDescription
        },
        language: selectedLanguage
      }
    }).catch((err) => {
      setError(err);
    });
  };

  const renderSaveButton = () => {
    if (isUpdated) {
      return (
        <div className="mt-8 flex justify-end border-t pt-4">
          <Button
            loading={loading}
            disabled={loading}
            onClick={handleSubmit}
            renderIcon={<SaveIcon width="1.3rem" height="1.3rem" />}
          >
            <div>{t('form:button-label-save')}</div>
          </Button>
        </div>
      );
    }
    return null;
  };

  return (
    <Accordion
      isUpdated={isUpdated}
      Title={() => <>{t('form:item-label-content')}</>}
    >
      <div className="my-5 flex flex-wrap sm:my-8">
        <Description
          details={`${
            initialValues
              ? t('form:item-description-edit')
              : t('form:item-description-add')
          } ${t('form:product-description-help-text')}`}
          className="w-full px-0 pb-5 sm:w-1/4 sm:py-8 sm:pe-4 md:w-1/4 md:pe-5"
        />

        <Card className="w-full sm:w-3/4 md:w-3/4">
          <Input
            label={t('form:input-label-name')}
            name="name"
            isRequiredLabel
            value={name}
            onChange={handleChange}
            onBlur={checkForUpdateHandler}
            // error={t(errors.name?.message!)}
            variant="outline"
            className="mb-5"
            placeholder={translationFallback(
              initialValues,
              'name',
              'Enter product name'
            )}
          />

          <Label isRequiredLabel>{t('form:input-label-product-details')}</Label>
          <Editor
            name="description"
            value={description}
            onChange={handleEditorChange}
            onBlur={checkForUpdateHandler}
            className="mb-5"
            block={!isEmpty(initialValues.description) && !id}
            defaultValue=""
            placeholder={'Enter product details'}
          />
          {/* <ValidationError message={t(errors.description?.message)} /> */}
          <TextArea
            label={t('form:item-hidden-note')}
            name="note"
            value={note}
            onChange={handleChange}
            onBlur={checkForUpdateHandler}
            renderTooltip={<RenderTooltipHiddenNote />}
            // error={t(errors.note?.message!)}
            variant="outline"
            placeholder={translationFallback(
              initialValues,
              'note',
              'Your hidden note'
            )}
          />
          <p className="mb-5 text-xs text-gray-500">
            {t('form:hidden-info-note')}
          </p>
          <div className="mb-5">
            <Label>{t('form:input-label-status')}</Label>
            <Radio
              name="status"
              onChange={handleChange}
              onMouseLeaveTopLevel={checkForUpdateHandler}
              label={t('form:input-label-publish')}
              id={ProductStatus.Publish}
              checked={ProductStatus.Publish === status}
              value={ProductStatus.Publish}
              className="mb-2"
            />
            <Radio
              name="status"
              onChange={handleChange}
              onMouseLeaveTopLevel={checkForUpdateHandler}
              id={ProductStatus.Draft}
              checked={ProductStatus.Draft === status}
              label={t('form:input-label-draft')}
              value={ProductStatus.Draft}
            />
          </div>
          <div className="my-2">
            <Checkbox
              name="disableOutOfStock"
              onChange={handleChange}
              onMouseLeaveTopLevel={checkForUpdateHandler}
              checked={disableOutOfStock}
              label={t('form:input-label-disable-out-of-stock')}
            />
          </div>
          <div className="my-2">
            <Checkbox
              name="trackInventory"
              onChange={handleChange}
              onMouseLeaveTopLevel={checkForUpdateHandler}
              renderTooltip={<RenderTooltipTrackInventory />}
              checked={trackInventory}
              label={t('form:input-label-track-inventory')}
            />
          </div>
          <div className="my-2">
            <Checkbox
              name="freeShipping"
              onChange={handleChange}
              onMouseLeaveTopLevel={checkForUpdateHandler}
              checked={freeShipping}
              label={t('form:input-label-free-shipping')}
            />
          </div>
          <div className="my-2">
            <Checkbox
              name="displayProductMeasurements"
              onChange={handleChange}
              onMouseLeaveTopLevel={checkForUpdateHandler}
              checked={displayProductMeasurements}
              label={t('form:input-label-display-product-measurements')}
            />
          </div>
          {renderSaveButton()}
        </Card>
      </div>
    </Accordion>
  );
};

export default memo(ProductContent);
