import { useMutation, useQuery } from '@apollo/client';
import Card from '@components/common/card';
import Trash from '@components/icons/trash';
import ImageModal from '@components/image-modal';
import Accordion from '@components/ui/accordion';
import Button from '@components/ui/button';
import Description from '@components/ui/description';
import Input from '@components/ui/input';
import Label from '@components/ui/label';
import SelectInput from '@components/ui/select-input';
import { CATEGORIES_FOR_SELECT_ALL } from '@graphql/category';
import { UPDATE_LAYOUT_COMPONENT_CONTENT } from '@graphql/content';
import { useErrorLogger, useGetUser } from '@hooks/index';
import { useSettings } from '@hooks/useSettings';
import { useUI } from '@hooks/useUI';
import { notify } from '@lib/index';
import { OrderBy } from '@ts-types/enums';
import type {
  Category,
  ImageType,
  LanguageType,
  StoreLayoutComponentType
} from '@ts-types/generated';
import cloneDeep from 'lodash/cloneDeep';
import isEmpty from 'lodash/isEmpty';
import { useTranslation } from 'next-i18next';
import { memo, useMemo, useState } from 'react';
import React from 'react';
import { useFieldArray, useForm } from 'react-hook-form';

import FormActions from '../../helpers/FormActions';

type FormValues = {
  header: string;
  category: Category;
  buttonLabel: string;
  collection: {
    title: string;
    subTitle: string;
    thumbnail: ImageType[];
    category: Category;
  }[];
};

const defaultValues = {};

type IProps = {
  initialValues?: StoreLayoutComponentType;
};

interface TCategorySelect {
  categorySelectAll: Category[];
}

interface OptionsVariable {
  page: number;
  limit: number;
  orderBy: OrderBy;
  language: LanguageType;
}

const CategoryListForm = ({ initialValues }: IProps) => {
  const { t } = useTranslation();

  const data = initialValues.data;
  const [error, setError] = useState(null);
  const { selectedLanguage } = useSettings();
  const { userInfo } = useGetUser();
  const csrfToken = userInfo?.csrfToken;

  console.log('CategoryListForm', { initialValues });

  const { updateBuilderInfo } = useUI();

  const { register, control, setValue, watch, handleSubmit } =
    useForm<FormValues>({
      defaultValues: !isEmpty(data)
        ? cloneDeep({ ...data })
        : (defaultValues as FormValues)
    });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'collection',
    keyName: 'key'
  });

  const {
    data: categories,
    loading,
    error: categoryQueryError
  } = useQuery<TCategorySelect, OptionsVariable>(CATEGORIES_FOR_SELECT_ALL, {
    variables: {
      page: 1,
      limit: 999,
      orderBy: OrderBy.CREATED_AT,
      language: selectedLanguage
    },
    fetchPolicy: 'cache-and-network',
    skip: isEmpty(selectedLanguage)
  });

  const { categorySelectAll = [] } = categories ?? {};

  const categoryOptions = useMemo(() => {
    return categorySelectAll?.map(({ id, name, translated, ...date }) => {
      return {
        id,
        name: name ?? translated?.name,
        ...date
      };
    });
  }, [categorySelectAll]);

  useErrorLogger(categoryQueryError);

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
        if (!isEmpty(data)) {
          notify(t('common:successfully-updated'), 'success', {
            position: 'top-center',
            autoClose: 2000
          });
          updateBuilderInfo({ isReloadIframe: true });
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
        header: values.header,
        buttonLabel: values.buttonLabel,
        category: values.category,
        collection: values.collection
      }
    };

    updateLayoutComponent({ variables }).catch((err) => {
      setError(err);
    });
  };

  const category = watch('category');

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormActions
        btnLabel={t('form:button-label-save-content')}
        title="Component Content"
        disabled={updating}
        loading={updating}
      />
      <div className="my-5 flex flex-wrap border-b border-dashed border-border-base pb-8 sm:my-8">
        <Description
          title={t('form:input-label-image')}
          details={t('form:image-helper-text')}
          className="w-full px-0 pb-5 sm:w-4/12 sm:py-8 sm:pe-4 md:w-1/3 md:pe-5"
        />
        <Card className="w-full sm:w-8/12 md:w-2/3">
          <Input
            label={'Heading'}
            {...register('header')}
            placeholder={'Heading'}
            variant="outline"
            className="mb-5"
          />
          <Input
            label={'View all button text'}
            {...register('buttonLabel')}
            placeholder={'Text'}
            variant="outline"
            className="mb-5"
          />
          <div className="mb-5">
            <Label>Links to (Category)</Label>
            <SelectInput
              name={'category'}
              getOptionLabel={(option: { name: string }) => option.name}
              getOptionValue={(option: { id: string }) => option.id}
              control={control}
              options={categoryOptions}
              loading={loading}
              isClearable={true}
            />
            <p className="my-1 text-xs text-gray-500">{`Links to (URL): /category/${category?.urlKey}`}</p>
          </div>
        </Card>
      </div>
      <div className="my-5 flex flex-wrap border-b border-dashed border-border-base pb-8 sm:my-8">
        <Description
          title={t('form:input-label-image')}
          details={t('form:image-helper-text')}
          className="w-full px-0 pb-5 sm:w-4/12 sm:py-8 sm:pe-4 md:w-1/3 md:pe-5"
        />
        <Card className="w-full sm:w-8/12 md:w-2/3">
          <div className="mb-5">
            {fields.map((item, index) => {
              const thumbnail = watch(`collection.${index}.thumbnail`);
              const category = watch(`collection.${index}.category`);
              return (
                <Accordion
                  key={index}
                  Title={() => (
                    <h3 className="font-semibold text-blue-500">{`Item #${index}`}</h3>
                  )}
                >
                  <div className="border-b border-dashed border-border-200 py-5 last:border-0 md:py-8">
                    <div className="flex flex-col justify-between">
                      <div className="flex-1">
                        <ImageModal
                          label="form:label-add-image"
                          isRequiredLabel
                          onSelect={(photo) =>
                            setValue(`collection.${index}.thumbnail`, photo)
                          }
                          selected={thumbnail}
                          isThumbnail
                        />

                        <Input
                          label="Title"
                          variant="outline"
                          {...register(`collection.${index}.title` as const)}
                          placeholder="Title"
                          className="my-5"
                        />
                        <Input
                          label="subTitle"
                          variant="outline"
                          {...register(`collection.${index}.subTitle` as const)}
                          placeholder="Subtitle"
                          className="mb-5"
                        />
                        <div className="mb-5">
                          <Label>Links to (Category)</Label>
                          <SelectInput
                            name={`collection.${index}.category` as const}
                            getOptionLabel={(option: { name: string }) =>
                              option.name
                            }
                            getOptionValue={(option: { id: string }) =>
                              option.id
                            }
                            control={control}
                            options={categoryOptions}
                            loading={loading}
                            isClearable={true}
                          />
                          <p className="my-1 text-xs text-gray-500">{`Links to (URL): /category/${category?.urlKey}`}</p>
                        </div>
                      </div>
                      <div className="w-full">
                        <button
                          onClick={() => remove(index)}
                          type="button"
                          className="flex h-8 w-full items-center justify-center rounded-sm bg-red-400 text-sm text-white transition-colors
                    duration-200 focus:outline-none sm:col-span-1 sm:mt-4"
                        >
                          <Trash width={15} height={15} />
                        </button>
                      </div>
                    </div>
                  </div>
                </Accordion>
              );
            })}
          </div>
          <Button
            type="button"
            onClick={() =>
              append({
                title: '',
                subTitle: '',
                thumbnail: null,
                category: null
              })
            }
            className="w-full sm:w-auto"
          >
            {t('form:button-label-add-value')}
          </Button>
        </Card>
      </div>
    </form>
  );
};

export default memo(CategoryListForm);
