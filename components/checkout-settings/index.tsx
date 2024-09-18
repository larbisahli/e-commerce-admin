import { useMutation } from '@apollo/client';
import Card from '@components/common/card';
import FormActions from '@components/common/FormActions';
import Description from '@components/ui/description';
import SwitchInput from '@components/ui/switch-input';
import { useErrorLogger } from '@hooks/index';
import { useAppDispatch, useGetClient } from '@hooks/useGetClient';
import { notify } from '@lib/index';
import { setEtag } from '@store/client';
import { Category, EtagGroupsType } from '@ts-types/generated';
import { ROUTES } from '@utils/routes';
import isEmpty from 'lodash/isEmpty';
import { useTranslation } from 'next-i18next';
import { useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import Checkbox from '@components/ui/checkbox';
import { UPDATE_CHECKOUT_SETTINGS } from '@graphql/settings';

type FormValues = {
  fields: {
    name: string;
    active: boolean;
    requited: boolean;
  }[];
};

type IProps = {
  initialValues?: Category | any;
  isFork?: boolean;
};

const fieldsLabelMap = {
  email: 'Customer email',
  fullName: 'Customer fullname',
  firstName: 'Customer firstname',
  lastName: 'Customer lastname',
  country: 'Customer country',
  city: 'Customer city',
  address: 'Customer address',
  state: 'Customer state / province',
  zipCode: 'Customer zip / postal code',
  phone: 'Customer phone number',
  market_opt_in: 'Customer marketing optin'
};

export default function CheckoutSettings({ initialValues }: IProps) {
  const { t } = useTranslation();

  const [error, setError] = useState(null);

  const { userInfo } = useGetClient();

  const dispatch = useAppDispatch();

  const csrfToken = userInfo?.csrfToken;

  const {
    handleSubmit,
    register,
    control,
    formState: { errors }
  } = useForm<FormValues>({
    defaultValues: {
      ...initialValues
    }
  });

  const [updateCheckoutSettings, { loading: updating }] = useMutation(
    UPDATE_CHECKOUT_SETTINGS,
    {
      context: {
        headers: {
          'x-csrf-token': csrfToken
        }
      },
      onCompleted: (data: {
        updateCheckoutSettings: { success: boolean; etag: EtagGroupsType };
      }) => {
        if (data?.updateCheckoutSettings.success) {
          notify(t('common:successfully-updated'), 'success');
          const { etag: newEtag } = data?.updateCheckoutSettings ?? {};
          dispatch(setEtag({ etag: newEtag }));
        }
      }
    }
  );

  useErrorLogger(error);

  const onSubmit = async (values: FormValues) => {
    console.log({ values });

    const variables = {
      fields: values.fields
    };

    updateCheckoutSettings({ variables }).catch((err) => {
      setError(err);
    });
  };

  const { fields } = useFieldArray({
    control,
    name: 'fields',
    keyName: 'key'
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormActions
        backLink={ROUTES.SETTINGS}
        showSelectLanguage={false}
        title={'Checkout Settings'}
        loading={updating}
        disabled={updating}
      />
      <div className="my-5 flex flex-wrap sm:my-8">
        <Description
          title={t('form:input-label-content')}
          details={`${
            initialValues
              ? t('form:item-description-edit')
              : t('form:item-description-add')
          } ${t('form:category-description-helper-text')}`}
          className="w-full px-0 pb-5 sm:w-[20%] sm:py-8 sm:pe-4 md:w-[20%] md:pe-5"
        />
        <Card className="w-full sm:w-[80%] md:w-[80%]">
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            {fields?.map((field, index) => {
              return (
                <div key={index}>
                  <div className="relative flex items-center justify-between rounded-sm border p-4">
                    <SwitchInput
                      size="large"
                      name={`fields.${index}.active`}
                      label={fieldsLabelMap[field.name]}
                      control={control}
                      errors={errors}
                      labelClassName="!font-semibold text-base"
                    />
                    <Checkbox
                      {...register(`fields.${index}.requited` as const)}
                      label={'Required'}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      </div>
    </form>
  );
}
