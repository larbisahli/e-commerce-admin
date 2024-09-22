import { useMutation, useQuery } from '@apollo/client';
import Card from '@components/common/card';
import Button from '@components/ui/button';
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
import { animationSpeedOptions, delaySpeedOptions } from '../common/data';
import ProductList from './product-list';
import ProductModal from './product-modal';

type FormValues = {
  header: string;
  category: Category;
  buttonLabel: string;
  productsPerView: number;
  collection: Product[];
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

const moduleSliderBlackList = ['ProductListWidget'];

const ProductListForm = ({ initialValues }: IProps) => {
  const { t } = useTranslation();

  const data = initialValues.data;
  const moduleName = initialValues?.moduleName;

  const [modalOpen, setModalOpen] = useState(false);
  const [error, setError] = useState(null);
  const { selectedLanguage } = useSettings();

  const { updateBuilderInfo } = useUI();
  const dispatch = useAppDispatch();

  const { register, watch, setValue, control, handleSubmit } =
    useForm<FormValues>({
      defaultValues: !isEmpty(data)
        ? cloneDeep({ ...data })
        : (defaultValues as FormValues)
    });

  const {
    userInfo: { csrfToken, store: { etag } = {} }
  } = useGetClient();

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
          closeModal(null, null, { sectionId: initialValues.componentId });
        }
      }
    }
  );

  useErrorLogger(error);
  useErrorLogger(categoryQueryError);

  const isBlackListed = useMemo(
    () => moduleSliderBlackList?.includes(moduleName),
    [moduleName]
  );

  const onSubmit = async (values: FormValues) => {
    let productsPerView = values.productsPerView ?? 6;
    if (productsPerView > 6) {
      productsPerView = 6;
    }
    if (productsPerView < 3) {
      productsPerView = 3;
    }
    const variables = {
      componentId: initialValues.componentId,
      contentId: initialValues?.contentId,
      language: selectedLanguage,
      data: {
        header: values.header,
        category: values.category,
        buttonLabel: values.buttonLabel,
        productsPerView: Number(productsPerView),
        sliderConfiguration: values.sliderConfiguration,
        collection: values.collection?.map((product) => ({
          id: product.id
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

  const loop = watch('sliderConfiguration.loop');
  const draggable = watch('sliderConfiguration.draggable');

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
      <div className="my-5 flex flex-wrap">
        <Description
          title={'Content'}
          details={'Edit content from here'}
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
          {isBlackListed && (
            <>
              <Input
                label={'Products per column'}
                type="number"
                min={3}
                max={6}
                {...register('productsPerView')}
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
      {!isBlackListed && (
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
      <div className="border-t border-dashed border-border-base pt-8 sm:my-8 ">
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
