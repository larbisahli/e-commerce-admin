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
import { Nullable } from '@ts-types/custom.types';
import { Product, ProductStatus } from '@ts-types/generated';
import dynamic from 'next/dynamic';
import { useTranslation } from 'next-i18next';
import { ChangeEvent, memo } from 'react';

import { Actions, useFormReducer } from '../context/form.context';

interface Props {
  initialValues: Nullable<Product>;
  state: {
    name: Product['name'];
    note: Product['note'];
    description: Product['description'];
    status: Product['status'];
    disableOutOfStock: Product['disableOutOfStock'];
  };
}

const Editor = dynamic(() => import('@components/ui/editor'), {
  loading: () => <Loader height="150px" text="Editor..." />,
  ssr: false
});

const ProductContent = ({ state, initialValues }: Props) => {
  const { t } = useTranslation();

  const { name, note, description, status, disableOutOfStock } = state;

  const dispatch = useFormReducer();

  const isUpdated = false;

  console.log({ isUpdated });

  const renderSaveButton = () => {
    if (isUpdated) {
      return (
        <div className="mt-8 flex justify-end border-t pt-4">
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
      );
    }
    return null;
  };

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

  return (
    <Accordion
      isUpdated={isUpdated}
      Title={() => <>{t('form:item-label-content')}</>}
    >
      <div className="flex flex-wrap my-5 sm:my-8">
        <Description
          details={`${
            initialValues
              ? t('form:item-description-edit')
              : t('form:item-description-add')
          } ${t('form:product-description-help-text')}`}
          className="w-full px-0 sm:pe-4 md:pe-5 pb-5 sm:w-4/12 md:w-1/3 sm:py-8"
        />

        <Card className="w-full sm:w-8/12 md:w-2/3">
          <Input
            label={`${t('form:input-label-name')}*`}
            name="name"
            value={name}
            onChange={handleChange}
            // error={t(errors.name?.message!)}
            placeholder="Title..."
            variant="outline"
            className="mb-5"
          />

          <Label>{t('form:input-label-product-details')}*</Label>
          <Editor
            name="description"
            value={description}
            onChange={handleEditorChange}
            className="mb-5"
            defaultValue=""
          />
          {/* <ValidationError message={t(errors.description?.message)} /> */}
          <TextArea
            label={t('form:item-hidden-note')}
            name="note"
            value={note}
            onChange={handleChange}
            placeholder="Hidden note"
            // error={t(errors.note?.message!)}
            variant="outline"
            className="mb-5"
          />
          <div>
            <Label>{t('form:input-label-status')}</Label>
            <Radio
              name="status"
              onChange={handleChange}
              label={t('form:input-label-publish')}
              id={ProductStatus.Publish}
              checked={ProductStatus.Publish === status}
              value={ProductStatus.Publish}
              className="mb-2"
            />
            <Radio
              name="status"
              onChange={handleChange}
              id={ProductStatus.Draft}
              checked={ProductStatus.Draft === status}
              label={t('form:input-label-draft')}
              value={ProductStatus.Draft}
            />
          </div>
          <div className="my-5">
            <Checkbox
              name="disableOutOfStock"
              onChange={handleChange}
              checked={disableOutOfStock}
              label={t('form:input-label-disable-out-of-stock')}
            />
          </div>
          {renderSaveButton()}
        </Card>
      </div>
    </Accordion>
  );
};

export default memo(ProductContent);
