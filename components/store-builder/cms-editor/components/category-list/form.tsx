import { useMutation, useQuery } from '@apollo/client';
import Card from '@components/common/card';
import Trash from '@components/icons/trash';
import ImageModal from '@components/image-modal';
import Accordion from '@components/ui/accordion';
import Button from '@components/ui/button';
import Checkbox from '@components/ui/checkbox';
import Description from '@components/ui/description';
import Input from '@components/ui/input';
import Label from '@components/ui/label';
import { useModalAction } from '@components/ui/modal/modal.context';
import SelectInput from '@components/ui/select-input';
import SwitchInput from '@components/ui/switch-input';
import { CATEGORIES_FOR_SELECT_ALL } from '@graphql/category';
import { UPDATE_LAYOUT_COMPONENT_CONTENT } from '@graphql/content';
import { useErrorLogger, useGetClient } from '@hooks/index';
import { useAppDispatch } from '@hooks/useGetClient';
import { useSettings } from '@hooks/useSettings';
import { useUI } from '@hooks/useUI';
import { notify } from '@lib/index';
import { setEtag } from '@store/client';
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
import { animationSpeedOptions, delaySpeedOptions } from '../common/data';

type FormValues = {
  header: string;
  category: Category;
  buttonLabel: string;
  categoriesPerView: number;
  collection: {
    title: string;
    subTitle: string;
    thumbnail: ImageType[];
    category: Category;
    displayContent: boolean;
  }[];
  sliderConfiguration: {
    animationSpeed: { value: number; name: string };
    delaySpeed: { value: number; name: string };
    langDirection: { value: 'LTR' | 'RTL' };
    loop?: boolean;
    draggable?: boolean;
  };
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
  etag: string;
}

const moduleSliderWhiteList = ['CategoryListSlide'];

const CategoryListForm = ({ initialValues }: IProps) => {
  const { t } = useTranslation();

  const data = initialValues.data;
  const moduleName = initialValues?.moduleName;

  const [error, setError] = useState(null);
  const { selectedLanguage } = useSettings();

  const {
    userInfo: { csrfToken, store: { etag } = {} }
  } = useGetClient();

  const { updateBuilderInfo } = useUI();
  const dispatch = useAppDispatch();

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
      language: selectedLanguage,
      etag: etag?.categoryEtag
    },
    fetchPolicy: 'cache-and-network',
    skip: isEmpty(selectedLanguage) || isEmpty(etag)
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
  const { closeModal } = useModalAction();

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
        if (!isEmpty(data?.updateLayoutComponent)) {
          const { etag: newEtag } = data?.updateLayoutComponent ?? {};
          dispatch(setEtag({ etag: newEtag }));
          notify(t('common:successfully-updated'), 'success', {
            position: 'top-center',
            autoClose: 2000
          });
          updateBuilderInfo({ isReloadIframe: true });
          closeModal(null, null, { componentId: initialValues.componentId });
        }
      }
    }
  );

  useErrorLogger(error);

  const onSubmit = async (values: FormValues) => {
    let categoriesPerView = values.categoriesPerView ?? 6;
    if (categoriesPerView > 6) {
      categoriesPerView = 6;
    }
    if (categoriesPerView < 3) {
      categoriesPerView = 3;
    }

    const variables = {
      componentId: initialValues.componentId,
      contentId: initialValues?.contentId,
      language: selectedLanguage,
      data: {
        header: values.header,
        buttonLabel: values.buttonLabel,
        category: values.category,
        collection: values.collection,
        sliderConfiguration: values.sliderConfiguration,
        categoriesPerView: Number(categoriesPerView)
      }
    };

    updateLayoutComponent({ variables }).catch((err) => {
      setError(err);
    });
  };

  const category = watch('category');
  const loop = watch('sliderConfiguration.loop');
  const draggable = watch('sliderConfiguration.draggable');

  const isWhiteListed = useMemo(
    () => moduleSliderWhiteList?.includes(moduleName),
    [moduleName]
  );

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
          {!isWhiteListed && (
            <>
              <Input
                label={'Categories per column'}
                type="number"
                min={3}
                max={6}
                {...register('categoriesPerView')}
                variant="outline"
                className="mt-5"
              />
              <p className="my-1 text-xs text-gray-400">
                In desktop view one column can contain from 3 to 6 items
              </p>
            </>
          )}
        </Card>
      </div>
      {isWhiteListed && (
        <div className="my-5 flex flex-wrap sm:my-8">
          <Description
            title={'Slider Configuration'}
            details={`Edit your slider configuration here`}
            className="w-full px-0 pb-5 sm:w-4/12 sm:py-8 sm:pe-4 md:w-1/3 md:pe-5"
          />
          <Card className="w-full sm:w-8/12 md:w-2/3">
            <div className="mb-5">
              <Label>{t('form:input-label-animation-speed')}</Label>
              <SelectInput
                name="sliderConfiguration.animationSpeed"
                control={control}
                getOptionLabel={(option) => option.name}
                getOptionValue={(option) => option.value}
                options={animationSpeedOptions}
              />
            </div>
            <div className="mb-5">
              <Label>{t('form:input-label-delay-speed')}</Label>
              <SelectInput
                name="sliderConfiguration.delaySpeed"
                control={control}
                getOptionLabel={(option) => option.name}
                getOptionValue={(option) => option.value}
                options={delaySpeedOptions}
              />
            </div>
            <div>
              <Label>{t('form:input-label-lang-direction')}</Label>
              <SelectInput
                name="sliderConfiguration.langDirection"
                control={control}
                getOptionLabel={(option: { value: string }) => option?.value}
                getOptionValue={(option: { value: string }) => option?.value}
                options={[{ value: 'LTR' }, { value: 'RTL' }]}
              />
            </div>
            <div className="mt-4">
              <Label>Infinite loop</Label>
              <SwitchInput
                name="sliderConfiguration.loop"
                label={loop ? 'On' : 'Off'}
                control={control}
                labelClassName="font-normal"
              />
            </div>
            <div className="mt-4">
              <Label>Draggable</Label>
              <SwitchInput
                name="sliderConfiguration.draggable"
                label={draggable ? 'On' : 'Off'}
                control={control}
                labelClassName="font-normal"
              />
            </div>
          </Card>
        </div>
      )}
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
              const displayContent = watch(
                `collection.${index}.displayContent`
              );
              return (
                <Accordion
                  key={index}
                  Title={() => (
                    <h3 className="font-semibold text-blue-500">{`Item #${
                      index + 1
                    }`}</h3>
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
                        <div className="my-3">
                          <Checkbox
                            {...register(
                              `collection.${index}.displayContent` as const
                            )}
                            label={'Display content'}
                          />
                        </div>
                        <Input
                          label="Title"
                          variant="outline"
                          {...register(`collection.${index}.title` as const)}
                          placeholder="Title"
                          className="my-5"
                          disabled={!displayContent}
                        />
                        <Input
                          label="subTitle"
                          variant="outline"
                          {...register(`collection.${index}.subTitle` as const)}
                          placeholder="Subtitle"
                          className="mb-5"
                          disabled={!displayContent}
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
                category: null,
                displayContent: true
              })
            }
            className="w-full sm:w-auto"
          >
            New Item
          </Button>
        </Card>
      </div>
    </form>
  );
};

export default memo(CategoryListForm);
