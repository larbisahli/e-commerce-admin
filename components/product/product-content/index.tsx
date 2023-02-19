import Card from '@components/common/card';
import { SaveIcon } from '@components/icons/save-icon';
import Accordion from '@components/ui/accordion';
import Button from '@components/ui/button';
import Checkbox from '@components/ui/checkbox';
import Description from '@components/ui/description';
import ValidationError from '@components/ui/form-validation-error';
import Input from '@components/ui/input';
import Label from '@components/ui/label';
import Loader from '@components/ui/loader/loader';
import Radio from '@components/ui/radio';
import TextArea from '@components/ui/text-area';
import { Nullable } from '@ts-types/custom.types';
import { Product, ProductStatus } from '@ts-types/generated';
import isEqual from 'lodash/isEqual';
import dynamic from 'next/dynamic';
import { useTranslation } from 'next-i18next';
import { memo, useMemo } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

interface Props {
  initialValues: Nullable<Product>;
}

const Editor = dynamic(() => import('@components/ui/editor'), {
  loading: () => <Loader height="150px" text="Editor..." />,
  ssr: false
});

const ProductContent = ({ initialValues }: Props) => {
  const { t } = useTranslation();

  const {
    register,
    formState: { errors },
    getValues,
    control
  } = useFormContext();

  const name = useWatch({ control, name: 'name', exact: true });
  const description =
    useWatch({ control, name: 'description', exact: true }) ??
    getValues('description');
  const status = useWatch({ control, name: 'status', exact: true });
  const note = useWatch({ control, name: 'note', exact: true });
  const disableOutOfStock = useWatch({
    control,
    name: 'disableOutOfStock',
    exact: true
  });

  const {
    name: initName,
    description: initDescription,
    published: initPublished,
    note: initNote,
    disableOutOfStock: initDisableOutOfStock
  } = initialValues;

  const isUpdated = useMemo(() => {
    const initialProductContent = {
      name: initName,
      description: initDescription,
      published: initPublished,
      note: initNote,
      disableOutOfStock: initDisableOutOfStock
    };
    const currentProductContent = {
      name,
      description,
      published: status === 'publish',
      note,
      disableOutOfStock
    };
    return !isEqual(initialProductContent, currentProductContent);
  }, [
    initName,
    initDescription,
    initPublished,
    initNote,
    initDisableOutOfStock,
    name,
    description,
    status,
    note,
    disableOutOfStock
  ]);

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
            {...register('name')}
            error={t(errors.name?.message!)}
            placeholder="Title..."
            variant="outline"
            className="mb-5"
          />

          <Label>{t('form:input-label-product-details')}*</Label>
          <Editor
            control={control}
            name="description"
            className="mb-5"
            defaultValue=""
          />
          <ValidationError message={t(errors.description?.message)} />
          <TextArea
            label={t('form:item-hidden-note')}
            {...register('note')}
            placeholder="Hidden note"
            error={t(errors.note?.message!)}
            variant="outline"
            className="mb-5"
          />
          <div>
            <Label>{t('form:input-label-status')}</Label>
            <Radio
              {...register('status')}
              label={t('form:input-label-publish')}
              id={ProductStatus.Publish}
              value={ProductStatus.Publish}
              className="mb-2"
            />
            <Radio
              {...register('status')}
              id={ProductStatus.Draft}
              label={t('form:input-label-draft')}
              value={ProductStatus.Draft}
            />
          </div>
          <div className="my-5">
            <Checkbox
              {...register('disableOutOfStock')}
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
