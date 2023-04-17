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
  position: 0,
  thumbnail: [],
  icon: null
};

type IProps = {
  initialValues?: Category | any;
};

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
    watch,
    formState: { errors },
    reset
  } = useForm<FormValues>({
    defaultValues: initialValues ? initialValues : defaultValues,
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
      notify('form:category-image-required', 'warning');
      return;
    }

    const variables = {
      name: values.name,
      description: values.description,
      includeInMenu: values.includeInMenu,
      position: Number(values.position),
      thumbnail: [
        {
          id: values.thumbnail[0]?.id
        }
      ],
      parentId: isEmpty(values?.parent) ? null : values?.parent?.id
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

  const thumbnail = watch('thumbnail');
  const includeInMenu = watch('includeInMenu');

  useEffect(() => {
    if (!includeInMenu) {
      setValue('position', 0);
    }
  }, [includeInMenu]);

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
            onSelect={(photo) => setValue('thumbnail', photo)}
            selected={thumbnail}
            isThumbnail
          />
          <div className="my-5">
            <SelectCategories control={control} />
          </div>
        </Card>
      </div>
      <div className="flex flex-wrap my-5 sm:my-8">
        <Description
          title={t('form:input-label-description')}
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
            // @ts-ignore
            {...register('name')}
            error={t(errors.name?.message!)}
            variant="outline"
            className="mb-5"
          />
          <TextArea
            label={t('form:input-label-details')}
            {...register('description')}
            variant="outline"
            className="mb-5"
          />
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
