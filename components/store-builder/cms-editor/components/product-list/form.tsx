import { useMutation, useQuery } from '@apollo/client';
import Card from '@components/common/card';
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
  LanguageType,
  Product,
  StoreLayoutComponentType
} from '@ts-types/generated';
import cloneDeep from 'lodash/cloneDeep';
import isEmpty from 'lodash/isEmpty';
import { useTranslation } from 'next-i18next';
import { memo, useMemo, useState } from 'react';
import React from 'react';
import { useForm } from 'react-hook-form';

import FormActions from '../../helpers/FormActions';
import ProductList from './product-list';
import ProductModal from './product-modal';

type FormValues = {
  header: string;
  category: Category;
  buttonLabel: string;
  collection: Product[];
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

const ProductListForm = ({ initialValues }: IProps) => {
  const { t } = useTranslation();

  const data = initialValues.data;
  const [modalOpen, setModalOpen] = useState(false);
  const [error, setError] = useState(null);
  const { selectedLanguage } = useSettings();

  const { updateBuilderInfo } = useUI();

  const { register, watch, setValue, control, handleSubmit } =
    useForm<FormValues>({
      defaultValues: !isEmpty(data)
        ? cloneDeep({ ...data })
        : (defaultValues as FormValues)
    });

  const { userInfo } = useGetUser();
  const csrfToken = userInfo?.csrfToken;

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
  useErrorLogger(categoryQueryError);

  const onSubmit = async (values: FormValues) => {
    const variables = {
      componentId: initialValues.componentId,
      contentId: initialValues?.contentId,
      language: selectedLanguage,
      data: {
        header: values.header,
        collection: values.collection?.map((product) => ({
          ...product,
          createdAt: null,
          updatedBy: null,
          createdBy: null
        }))
      }
    };

    updateLayoutComponent({ variables }).catch((err) => {
      setError(err);
    });
  };

  const collection = watch('collection');
  const category = watch('category');

  const handleClick = (e) => {
    e.preventDefault();
    setModalOpen(true);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <ProductModal
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        collection={collection}
        setValue={setValue}
      />
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
        <Card className="mb-8 w-full sm:w-8/12 md:w-2/3">
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
        <Card className="w-full">
          <div className="flex flex-wrap items-start justify-between xl:flex-nowrap">
            <div className="mb-3 xl:mb-0">
              <p className="max-w-full text-sm text-body">{`
          Add your product collection for this component.`}</p>
            </div>
            <div className="ml-0 xl:ml-2">
              <Button
                loading={false}
                disabled={false}
                size="small"
                className="w-max"
                onClick={handleClick}
              >
                <div>Add Product Collection</div>
              </Button>
            </div>
          </div>
          {!isEmpty(collection) && (
            <div className="mt-5">
              <ProductList
                products={collection}
                loading={false}
                selectedColumns={[
                  'thumbnail',
                  'name',
                  'sku',
                  'quantity',
                  'published'
                ]}
              />
            </div>
          )}
        </Card>
      </div>
    </form>
  );
};

export default memo(ProductListForm);
