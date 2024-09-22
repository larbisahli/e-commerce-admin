import { useMutation, useQuery } from '@apollo/client';
import Card from '@components/common/card';
import { LanguageDefaultDescInfo } from '@components/common/commonComponents';
import FormActions from '@components/common/FormActions';
import Button from '@components/ui/button';
import Checkbox from '@components/ui/checkbox';
import Description from '@components/ui/description';
import Input from '@components/ui/input';
import Label from '@components/ui/label';
import SelectInput from '@components/ui/select-input';
import SwitchInput from '@components/ui/switch-input';
import {
  CREATE_CUSTOMER,
  DELETE_CUSTOMER_ADDRESS,
  UPDATE_CUSTOMER
} from '@graphql/customer';
import { TAGS_FOR_SELECT } from '@graphql/tag';
import { yupResolver } from '@hookform/resolvers/yup';
import { useErrorLogger, useWarnIfUnsavedChanges } from '@hooks/index';
import { useGetClient } from '@hooks/useGetClient';
import { useSettings } from '@hooks/useSettings';
import { notify } from '@lib/index';
import { LanguageProps } from '@ts-types/custom.types';
import {
  Category,
  CustomerAddressType,
  CustomerType,
  OrderBy,
  Tag
} from '@ts-types/generated';
import { ROUTES } from '@utils/routes';
import isEmpty from 'lodash/isEmpty';
import { useTranslation } from 'next-i18next';
import { useEffect, useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';

import { categoryValidationSchema } from './customer-validation-schema';
import Accordion from '@components/ui/accordion';

interface OptionsVariable extends LanguageProps {
  id?: number;
  page: number;
  limit: number;
  orderBy: OrderBy;
  etag: string;
}

type FormValues = CustomerType;

const defaultValues = {
  fullName: '',
  email: '',
  active: false,
  marketingOptIn: false,
  tags: [],
  address: []
};

type IProps = {
  initialValues?: CustomerType | any;
};

interface TagSelect {
  tagSelect: Tag[];
}

export default function CreateOrUpdateCustomerForm({ initialValues }: IProps) {
  const { t } = useTranslation();
  const createMode = isEmpty(initialValues);

  const [error, setError] = useState(null);
  const [unsavedChanges, setUnsavedChanges] = useState(true);
  const [deletedIndex, setDeletedIndex] = useState<number | null>(null);

  const {
    userInfo: { csrfToken, store: { etag } = {} }
  } = useGetClient();

  const { defaultLanguage } = useSettings();
  const [countries, setCountries] = useState([]);

  const {
    data,
    loading: tagLoading,
    error: tagQueryError
  } = useQuery<TagSelect, OptionsVariable>(TAGS_FOR_SELECT, {
    variables: {
      page: 1,
      limit: 999,
      orderBy: OrderBy.CREATED_AT,
      language: defaultLanguage,
      etag: etag?.tagEtag
    },
    fetchPolicy: 'cache-and-network',
    skip: isEmpty(defaultLanguage) || isEmpty(etag)
  });

  const { tagSelect = [] } = data ?? {};

  const {
    register,
    handleSubmit,
    control,
    formState: { errors }
  } = useForm<FormValues>({
    defaultValues: createMode ? defaultValues : initialValues,
    resolver: yupResolver(categoryValidationSchema)
  });

  const [createCustomer, { loading: creating }] = useMutation(CREATE_CUSTOMER, {
    context: {
      headers: {
        'x-csrf-token': csrfToken
      }
    },
    onCompleted: (data: { createCustomer: CustomerType }) => {
      const { id } = data.createCustomer;
      if (!id) {
        return;
      }
      notify(t('common:successfully-created'), 'success');
    }
  });

  const [updateCustomer, { loading: updating }] = useMutation(UPDATE_CUSTOMER, {
    context: {
      headers: {
        'x-csrf-token': csrfToken
      }
    },
    onCompleted: (data: { updateCustomer: CustomerType }) => {
      const { id } = data.updateCustomer;
      if (!id) {
        return;
      }
      notify(t('common:successfully-updated'), 'success');
    }
  });

  const [deleteCustomerAddress, { loading: deleting }] = useMutation(
    DELETE_CUSTOMER_ADDRESS,
    {
      context: {
        headers: {
          'x-csrf-token': csrfToken
        }
      }
    }
  );

  useErrorLogger(error);
  useErrorLogger(tagQueryError);

  // Get Countries
  useEffect(() => {
    async function getCountries() {
      const { Countries } = await import('@utils/countries');
      setCountries(Countries);
    }
    getCountries();
  }, []);

  const onSubmit = async (values: FormValues) => {
    console.log({ values });
    const variables = {
      ...values,
      tags: values.tags?.map((tag) => ({ id: tag?.id }))
    };
    setUnsavedChanges(false);
    if (createMode) {
      createCustomer({ variables }).catch((err) => {
        setError(err);
      });
    } else {
      updateCustomer({
        variables: { id: initialValues?.id, ...variables }
      }).catch((err) => {
        setError(err);
      });
    }
  };

  useWarnIfUnsavedChanges(unsavedChanges, () => {
    return confirm(t('common:UNSAVED_CHANGES'));
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'address',
    keyName: 'key'
  });

  const removeCustomerAddress = (item: CustomerAddressType, index: number) => {
    setDeletedIndex(index);
    if (item?.id) {
      deleteCustomerAddress({
        variables: { id: item?.id },
        onCompleted: (data: { deleteCustomerAddress: CustomerAddressType }) => {
          const { id } = data.deleteCustomerAddress;
          if (!id) {
            return;
          }
          notify(t('common:successfully-deleted'), 'success');
          remove(index);
        }
      }).catch((err) => {
        setError(err);
      });
    } else {
      remove(index);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormActions
        backLink={ROUTES.CUSTOMER}
        showSelectLanguage={false}
        title={
          createMode
            ? t('form:form-title-new-customer')
            : t('form:form-title-edit-customer')
        }
        loading={creating || updating}
        disabled={creating || updating}
      />
      <div className="my-5 flex flex-wrap border-b border-dashed border-border-base pb-8 sm:my-8">
        <Description
          title={t('form:input-label-customer-info')}
          details={t('form:category-image-customer-customer')}
          className="w-full px-0 pb-5 sm:w-4/12 sm:py-8 sm:pe-4 md:w-1/3 md:pe-5"
        />
        <Card className="w-full sm:w-8/12 md:w-2/3">
          <Input
            label={t('form:input-label-full-name')}
            isRequiredLabel
            // @ts-ignore
            {...register('fullName')}
            error={t(errors.fullName?.message!)}
            placeholder={'Enter customer fullname'}
            variant="outline"
            className="mb-5"
          />
          <Input
            label={t('form:input-label-email')}
            isRequiredLabel
            // @ts-ignore
            {...register('email')}
            error={t(errors.email?.message!)}
            placeholder={'Enter customer email'}
            variant="outline"
            className="mb-5"
          />
          <div className="mb-5">
            <Label openTooltipOnClick>{t('sidebar-nav-item-tags')}</Label>
            <SelectInput
              control={control}
              name="tags"
              getOptionLabel={(option: any) => option.name}
              getOptionValue={(option: any) => option.id}
              options={tagSelect}
              isMulti
              isLoading={tagLoading}
            />
            <p className="pt-1 text-xs text-gray-500">
              {t('form:tag-info-note')}
            </p>
          </div>
          <div className="mb-4">
            <SwitchInput
              name="active"
              label="Active"
              control={control}
              errors={errors}
            />
          </div>
          <div className="mb-4">
            <SwitchInput
              name="marketingOptIn"
              label="Marketing Opt In"
              control={control}
              errors={errors}
            />
          </div>
        </Card>
      </div>
      <div className="my-5 flex flex-wrap sm:my-8">
        <Description
          title={t('form:input-label-customer-address')}
          details={`${
            initialValues
              ? t('form:item-description-edit')
              : t('form:item-description-add')
          } ${t('form:customer-address-description-helper-text')}`}
          className="w-full px-0 pb-5 sm:w-4/12 sm:py-8 sm:pe-4 md:w-1/3 md:pe-5"
        />
        <Card className="w-full sm:w-8/12 md:w-2/3">
          <div className="mb-8">
            {fields.map((item, index) => (
              <Accordion
                key={index}
                Title={() => (
                  <h3 className="font-semibold text-blue-500">{`Address #${
                    index + 1
                  }`}</h3>
                )}
              >
                <div
                  key={index}
                  className="flex flex-col justify-between border-b border-dashed border-border-200 pb-5 last:border-0 md:pb-8"
                >
                  <div className="mb-5 flex justify-end">
                    <button
                      onClick={() => removeCustomerAddress(item, index)}
                      type="button"
                      className="border border-red-500 py-1 px-2 text-sm text-red-500 transition-colors duration-200
                      hover:bg-red-200 hover:text-red-700 focus:outline-none sm:col-span-1 sm:mt-4"
                    >
                      {t('form:button-label-remove')}
                      {deleting && deletedIndex === index && (
                        <span
                          className="absolute h-4 w-4 animate-spin rounded-full
                           border-2 border-t-2 border-transparent ms-2"
                          style={{
                            borderTopColor: 'red'
                          }}
                        />
                      )}
                    </button>
                  </div>
                  <Input
                    className="mb-5"
                    isRequiredLabel
                    label={t('form:input-label-email')}
                    variant="outline"
                    {...register(`address.${index}.email` as const)}
                    placeholder=""
                    defaultValue={item.email}
                  />
                  <div className="mb-5">
                    <Label>{t('form:input-label-country')}</Label>
                    <SelectInput
                      control={control}
                      {...register(`address.${index}.country` as const)}
                      getOptionLabel={(option: any) => option.name}
                      getOptionValue={(option: any) => option.id}
                      options={countries}
                      isLoading={isEmpty(countries)}
                      className="mb-5"
                    />
                  </div>
                  <Input
                    className="mb-5"
                    isRequiredLabel
                    label={t('form:input-label-address-line1')}
                    variant="outline"
                    {...register(`address.${index}.addressLine1` as const)}
                    placeholder=""
                    defaultValue={item.email}
                  />
                  <Input
                    className="mb-5"
                    label={t('form:input-label-address-line2')}
                    variant="outline"
                    {...register(`address.${index}.addressLine2` as const)}
                    placeholder=""
                    defaultValue={item.email}
                  />
                  <Input
                    className="mb-5"
                    label={t('form:input-label-phone')}
                    variant="outline"
                    {...register(`address.${index}.phoneNumber` as const)}
                    placeholder=""
                    defaultValue={item.email}
                  />
                  <Input
                    className="mb-5"
                    label={t('form:input-label-city')}
                    variant="outline"
                    {...register(`address.${index}.city` as const)}
                    placeholder=""
                    defaultValue={item.email}
                  />
                  <Input
                    className="mb-5"
                    label={t('form:input-label-post-code')}
                    variant="outline"
                    {...register(`address.${index}.postalCode` as const)}
                    placeholder=""
                    defaultValue={item.email}
                  />
                  <Input
                    className="mb-5"
                    label={t('form:input-label-state')}
                    variant="outline"
                    {...register(`address.${index}.state` as const)}
                    placeholder=""
                    defaultValue={item.email}
                  />
                  <Checkbox
                    {...register(`address.${index}.isDefault` as const)}
                    label={t('form:input-label-set-default')}
                  />
                </div>
              </Accordion>
            ))}
          </div>
          <div className="flex justify-end">
            <Button
              type="button"
              onClick={() =>
                append({
                  id: null,
                  email: '',
                  addressLine1: '',
                  addressLine2: '',
                  phoneNumber: '',
                  postalCode: '',
                  state: '',
                  city: '',
                  isDefault: false,
                  country: null
                })
              }
              className="w-full sm:w-auto"
            >
              {t('form:button-label-add-address')}
            </Button>
          </div>
        </Card>
      </div>
    </form>
  );
}
