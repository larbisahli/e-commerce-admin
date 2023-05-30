import { useMutation, useQuery } from '@apollo/client';
import Card from '@components/common/card';
import { SaveIcon } from '@components/icons/save-icon';
import ImageModal from '@components/image-modal';
import Button from '@components/ui/button';
import Description from '@components/ui/description';
import Input from '@components/ui/input';
import Label from '@components/ui/label';
import SelectInput from '@components/ui/select-input';
import SwitchInput from '@components/ui/switch-input';
import TextArea from '@components/ui/text-area';
import {
  CATEGORIES_FOR_SELECT,
  CREATE_CATEGORY,
  UPDATE_CATEGORY
} from '@graphql/category';
import { yupResolver } from '@hookform/resolvers/yup';
import { useErrorLogger, useWarnIfUnsavedChanges } from '@hooks/index';
import { useGetUser } from '@hooks/useGetUser';
import { notify } from '@lib/index';
import { Category, OrderBy } from '@ts-types/generated';
import { ROUTES } from '@utils/routes';
import isEmpty from 'lodash/isEmpty';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { useEffect, useState } from 'react';
import { Control, useForm } from 'react-hook-form';
import slugify from 'slugify';

import { categoryValidationSchema } from './category-validation-schema';

interface TCategorySelect {
  categorySelect: Category[];
}

interface OptionsVariable {
  id: number;
  page: number;
  limit: number;
  orderBy: OrderBy;
}

function SelectCategories({ control }: { control: Control<FormValues> }) {
  const { t } = useTranslation();
  const { query } = useRouter();
  const { categoryId } = query;

  const { data, loading, error } = useQuery<TCategorySelect, OptionsVariable>(
    CATEGORIES_FOR_SELECT,
    {
      variables: {
        id: Number(categoryId),
        page: 1,
        limit: 999,
        orderBy: OrderBy.CREATED_AT
      },
      fetchPolicy: 'cache-and-network'
    }
  );

  const categories = data?.categorySelect;

  useErrorLogger(error);

  return (
    <div>
      <Label>{t('form:input-label-parent-category')}</Label>
      <SelectInput
        name="parent"
        control={control}
        getOptionLabel={(option: Category) => option.name}
        getOptionValue={(option: Category) => option.id}
        options={categories}
        isClearable={true}
        isLoading={loading}
      />
    </div>
  );
}

type FormValues = Category;

const defaultValues = {
  name: '',
  description: null,
  parent: null,
  includeInMenu: true,
  position: 1,
  thumbnail: [],
  icon: null,
  categorySeo: {
    urlKey: '',
    metaTitle: '',
    metaKeywords: '',
    metaDescription: '',
    metaRobots: { value: 'INDEX, FOLLOW' },
    breadcrumbsPriority: 0,
    metaImage: []
  }
};

type IProps = {
  initialValues?: Category | any;
};

const metaRobotOptions = [
  { value: 'INDEX, FOLLOW' },
  { value: 'INDEX, NOFOLLOW' },
  { value: 'NOINDEX, FOLLOW' },
  { value: 'NOINDEX, NOFOLLOW' },
  { value: 'INDEX, FOLLOW, NOARCHIVE' },
  { value: 'INDEX, NOFOLLOW, NOARCHIVE' },
  { value: 'NOINDEX, NOFOLLOW, NOARCHIVE' }
];

export default function CreateOrUpdateCategoriesForm({
  initialValues
}: IProps) {
  const router = useRouter();
  const { t } = useTranslation();

  const [error, setError] = useState(null);
  const [unsavedChanges, setUnsavedChanges] = useState(true);

  const { userInfo } = useGetUser();

  const csrfToken = userInfo?.csrfToken;

  const {
    register,
    handleSubmit,
    control,
    setValue,
    getValues,
    watch,
    formState: { errors },
    reset
  } = useForm<FormValues>({
    defaultValues: isEmpty(initialValues)
      ? defaultValues
      : {
          ...initialValues,
          categorySeo: isEmpty(initialValues?.categorySeo)
            ? {}
            : {
                ...initialValues?.categorySeo,
                metaRobots: { value: initialValues?.categorySeo?.metaRobots }
              }
        },
    resolver: yupResolver(categoryValidationSchema)
  });

  const [createCategory, { loading: creating, reset: resetCreateMutation }] =
    useMutation(CREATE_CATEGORY, {
      context: {
        headers: {
          'x-csrf-token': csrfToken
        }
      },
      onCompleted: (data: { createCategory: Category }) => {
        if (!isEmpty(data)) {
          notify(t('common:successfully-created'), 'success');
          reset();
          router.push(ROUTES.CATEGORIES);
        }
      }
    });

  const [updateCategory, { loading: updating, reset: resetUpdateMutation }] =
    useMutation(UPDATE_CATEGORY, {
      context: {
        headers: {
          'x-csrf-token': csrfToken
        }
      },
      onCompleted: (data: { updateCategory: Category }) => {
        if (!isEmpty(data)) {
          notify(t('common:successfully-updated'), 'success');
          router.push(ROUTES.CATEGORIES);
        }
      }
    });

  useErrorLogger(error);

  const onSubmit = async (values: FormValues) => {
    if (isEmpty(values.thumbnail)) {
      notify(t('form:category-image-required'), 'warning');
      return;
    }

    const variables = {
      name: values.name,
      description: values.description,
      includeInMenu: values.includeInMenu,
      position: Number(values.position),
      thumbnail: values.thumbnail?.map(({ id }) => ({ id })),
      parentId: isEmpty(values?.parent) ? null : values?.parent?.id,
      categorySeo: {
        ...values.categorySeo,
        breadcrumbsPriority: Number(values.categorySeo.breadcrumbsPriority),
        metaImage: values.categorySeo.metaImage?.map(({ id }) => ({ id })),
        metaRobots: values.categorySeo.metaRobots.value
      }
    };

    setUnsavedChanges(false);
    if (isEmpty(initialValues)) {
      createCategory({ variables }).catch((err) => {
        setError(err);
        resetCreateMutation();
      });
    } else {
      updateCategory({
        variables: { id: initialValues?.id, ...variables }
      }).catch((err) => {
        setError(err);
        resetUpdateMutation();
      });
    }
  };

  useWarnIfUnsavedChanges(unsavedChanges, () => {
    return confirm(t('common:UNSAVED_CHANGES'));
  });

  const generateSlug = (slug = '') => {
    return slugify(slug?.replace(/[^A-Za-z0-9\s!?]/g, '-') ?? '', {
      trim: false,
      replacement: '-',
      lower: true
    });
  };

  const thumbnail = watch('thumbnail');
  const includeInMenu = watch('includeInMenu');
  const name = watch('name');
  const metaDescription = watch('categorySeo.metaDescription');
  const metaImage = watch('categorySeo.metaImage');
  const urlKey = watch('categorySeo.urlKey');

  useEffect(() => {
    if (!includeInMenu) {
      setValue('position', 0);
    }
  }, [includeInMenu]);

  useEffect(() => {
    if (!isEmpty(thumbnail) && isEmpty(metaImage)) {
      setValue('categorySeo.metaImage', thumbnail);
    }
  }, [thumbnail, metaImage]);

  useEffect(() => {
    const value = generateSlug(urlKey);
    setValue('categorySeo.urlKey', value);
  }, [urlKey]);

  const updateWhenEmpty = (field: string, isSlug = true) => {
    // @ts-ignore
    if (isEmpty(getValues(field))) {
      // @ts-ignore
      setValue(field, isSlug ? generateSlug(name) : name);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-wrap pb-8 border-b border-dashed border-border-base my-5 sm:my-8">
        <Description
          title={t('form:input-label-image')}
          details={t('form:category-image-helper-text')}
          className="w-full px-0 sm:pe-4 md:pe-5 pb-5 sm:w-4/12 md:w-1/3 sm:py-8"
        />
        <Card className="w-full sm:w-8/12 md:w-2/3">
          <ImageModal
            label="form:label-add-category-image"
            isRequiredLabel
            onSelect={(photo) => setValue('thumbnail', photo)}
            selected={thumbnail}
            isThumbnail
          />
        </Card>
      </div>
      <div className="flex flex-wrap my-5 sm:my-8">
        <Description
          title={t('form:input-label-content')}
          details={`${
            initialValues
              ? t('form:item-description-edit')
              : t('form:item-description-add')
          } ${t('form:category-description-helper-text')}`}
          className="w-full px-0 sm:pe-4 md:pe-5 pb-5 sm:w-4/12 md:w-1/3 sm:py-8"
        />
        <Card className="w-full sm:w-8/12 md:w-2/3">
          <Input
            label={t('form:input-label-name')}
            isRequiredLabel
            // @ts-ignore
            {...register('name')}
            error={t(errors.name?.message!)}
            variant="outline"
            className="mb-5"
          />
          <TextArea
            label={t('form:input-label-description')}
            isRequiredLabel
            {...register('description')}
            error={t(errors.description?.message!)}
            variant="outline"
            className="mb-5"
          />
          <div className="my-5">
            <SelectCategories control={control} />
          </div>
          <Input
            label={`${t('form:input-label-menu-position')}`}
            type="number"
            min={0}
            {...register('position')}
            disabled={!includeInMenu}
            error={t(errors.position?.message!)}
            variant="outline"
            className="mb-5"
          />
          <div className="mb-4">
            <SwitchInput
              name="includeInMenu"
              label="Include in menu"
              control={control}
              errors={errors}
            />
          </div>
        </Card>
      </div>
      <div className="flex flex-wrap my-5 sm:my-8">
        <Description
          title={t('form:input-label-search-engine-optimization')}
          details={`${
            initialValues
              ? t('form:item-description-edit')
              : t('form:item-description-add')
          } ${t('form:category-description-helper-text')}`}
          className="w-full px-0 sm:pe-4 md:pe-5 pb-5 sm:w-4/12 md:w-1/3 sm:py-8"
        />
        <Card className="w-full sm:w-8/12 md:w-2/3">
          <Input
            label={t('form:input-label-meta-title')}
            isRequiredLabel
            onFocus={() => updateWhenEmpty('categorySeo.metaTitle', false)}
            // @ts-ignore
            {...register('categorySeo.metaTitle')}
            error={t(errors.categorySeo?.metaTitle?.message!)}
            variant="outline"
            className="mb-5"
          />
          <Input
            label={t('form:input-label-url-key')}
            isRequiredLabel
            onFocus={() => updateWhenEmpty('categorySeo.urlKey')}
            // @ts-ignore
            {...register('categorySeo.urlKey')}
            error={t(errors.categorySeo?.urlKey?.message!)}
            variant="outline"
            className="mb-5"
          />
          <div className="mb-5">
            <Label isRequiredLabel>{t('form:input-label-meta-robots')}</Label>
            <SelectInput
              name="categorySeo.metaRobots"
              control={control}
              getOptionLabel={(option: { value: string }) => option.value}
              getOptionValue={(option: { value: string }) => option.value}
              options={metaRobotOptions}
            />
          </div>
          <TextArea
            label={t('form:input-label-meta-keywords')}
            // @ts-ignore
            {...register('categorySeo.metaKeywords')}
            rows={2}
            variant="outline"
            className="mb-5"
          />
          <TextArea
            label={t('form:input-label-meta-description')}
            // @ts-ignore
            {...register('categorySeo.metaDescription')}
            variant="outline"
          />
          <div style={{ fontSize: '.75rem' }} className="mb-5">
            <div className="flex items-center flex-wrap">
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
            <p className="my-2 text-xs text-red-500">
              {t(errors.categorySeo?.metaDescription?.message!)}
            </p>
          </div>
          <Input
            label={`${t('form:input-label-breadcrumbs-priority')}`}
            type="number"
            min={0}
            max={100}
            {...register('categorySeo.breadcrumbsPriority')}
            variant="outline"
            className="mb-12"
            note="100 is the highest priority. This setting defines the priority of each category to be selected for the product breadcrumbs."
          />
          <div className="my-5">
            <ImageModal
              onSelect={(image) => setValue('categorySeo.metaImage', image)}
              isThumbnail
              selected={metaImage}
              modalId="metaImage"
              label="form:label-add-meta-images"
            />
          </div>
        </Card>
      </div>
      <div className="mb-4 flex justify-end">
        {initialValues && (
          <Button
            variant="outline"
            onClick={router.back}
            className="me-4"
            type="button"
          >
            {t('form:button-label-back')}
          </Button>
        )}
        <Button loading={creating || updating} disabled={creating || updating}>
          <div className="mr-1">
            <SaveIcon width="1.3rem" height="1.3rem" />
          </div>
          <div>{t('form:button-label-save')}</div>
        </Button>
      </div>
    </form>
  );
}
