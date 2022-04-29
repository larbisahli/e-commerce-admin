import { useMutation, useQuery } from '@apollo/client';
import Card from '@components/common/card';
import Button from '@components/ui/button';
import Description from '@components/ui/description';
import FileInput from '@components/ui/file-input';
import Input from '@components/ui/input';
import Label from '@components/ui/label';
import PasswordInput from '@components/ui/password-input';
import SelectInput from '@components/ui/select-input';
import { CREATE_STAFF, ROLES_FOR_SELECT, UPDATE_STAFF } from '@graphql/staff';
import { yupResolver } from '@hookform/resolvers/yup';
import { useErrorLogger, useWarnIfUnsavedChanges } from '@hooks/index';
import { notify } from '@lib/index';
import { RoleType, StaffType } from '@ts-types/generated';
import { ROUTES } from '@utils/routes';
import isEmpty from 'lodash/isEmpty';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { useState } from 'react';
import { Control, useForm } from 'react-hook-form';

import { staffValidationSchema } from './staff-validation-schema';

type FormValues = StaffType;

const defaultValues = {};

type IProps = {
  initialValues?: StaffType | null;
};

interface TRolesSelect {
  roles: RoleType[];
}

interface OptionsVariable {}

function SelectRoles({ control }: { control: Control<FormValues> }) {
  const { t } = useTranslation();

  const { data, loading, error } = useQuery<TRolesSelect, OptionsVariable>(
    ROLES_FOR_SELECT,
    {
      variables: {}
    }
  );

  const roles = data?.roles;

  useErrorLogger(error);

  return (
    <div>
      <Label>{t('form:input-label-roles')}</Label>
      <SelectInput
        name="role"
        control={control}
        getOptionLabel={(option: RoleType) => option.role_name}
        getOptionValue={(option: RoleType) => option.id}
        options={roles}
        isClearable={true}
        isLoading={loading}
      />
    </div>
  );
}

const StaffCreateUpdateForm = ({ initialValues }: IProps) => {
  const { t } = useTranslation();
  const router = useRouter();

  const [unsavedChanges, setUnsavedChanges] = useState<string[]>([]);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors }
  } = useForm<FormValues>({
    // @ts-ignore
    defaultValues: initialValues
      ? {
          ...initialValues,
          password: 'test',
          confirm_password: 'test'
        }
      : defaultValues,
    resolver: yupResolver(staffValidationSchema)
  });

  const [createStaff, { loading: creating, error: createStaffError }] =
    useMutation(CREATE_STAFF, {
      onCompleted: (data: { createStaff: StaffType }) => {
        if (!isEmpty(data)) {
          reset();
          setUnsavedChanges([]);
          notify(t('common:successfully-created'), 'success');
          router.push(ROUTES.STAFFS);
        }
      }
    });
  const [updateStaff, { loading: updating, error: updateStaffError }] =
    useMutation(UPDATE_STAFF, {
      onCompleted: (data: { updateStaff: StaffType }) => {
        if (!isEmpty(data)) {
          setUnsavedChanges([]);
          notify(t('common:successfully-updated'), 'success');
          router.push(ROUTES.STAFFS);
        }
      }
    });

  useErrorLogger(createStaffError);
  useErrorLogger(updateStaffError);

  async function onSubmit(values: FormValues) {
    const variables = {
      first_name: values.first_name,
      last_name: values.last_name,
      phone_number: values.phone_number,
      profile: {
        image: values?.profile?.image,
        placeholder: values?.profile?.placeholder
      },
      role_id: values.role.id,
      password: values.password,
      email: values.email
    };

    if (isEmpty(initialValues)) {
      createStaff({ variables });
    } else {
      updateStaff({ variables: { id: initialValues?.id, ...variables } });
    }
  }

  useWarnIfUnsavedChanges(!isEmpty(unsavedChanges), () => {
    return confirm(t('common:UNSAVED_IMAGE'));
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className="flex flex-wrap pb-8 border-b border-dashed border-border-base my-5 sm:my-8">
        <Description
          title={t('form:input-label-image')}
          details={t('form:category-image-helper-text')}
          className="w-full px-0 sm:pe-4 md:pe-5 pb-5 sm:w-4/12 md:w-1/3 sm:py-8"
        />

        <Card className="w-full sm:w-8/12 md:w-2/3">
          <FileInput
            name="profile"
            control={control}
            multiple={false}
            setUnsavedChanges={setUnsavedChanges}
          />
        </Card>
      </div>

      <div className="flex flex-wrap my-5 sm:my-8">
        <Description
          title={t('form:form-title-information')}
          details={t('form:customer-form-info-help-text')}
          className="w-full px-0 sm:pe-4 md:pe-5 pb-5 sm:w-4/12 md:w-1/3 sm:py-8"
        />

        <Card className="w-full sm:w-8/12 md:w-2/3">
          <Input
            label={t('form:input-label-first-name')}
            {...register('first_name')}
            type="text"
            variant="outline"
            className="mb-4"
            error={t(errors.first_name?.message!)}
          />
          <Input
            label={t('form:input-label-last-name')}
            {...register('last_name')}
            type="text"
            variant="outline"
            className="mb-4"
            error={t(errors.last_name?.message!)}
          />
          <Input
            label={t('form:label-phone-number')}
            {...register('phone_number')}
            type="text"
            variant="outline"
            className="mb-4"
            error={t(errors.phone_number?.message!)}
          />
          <Input
            label={t('form:input-label-email')}
            {...register('email')}
            type="email"
            variant="outline"
            className="mb-4"
            error={t(errors.email?.message!)}
          />
          {isEmpty(initialValues) && (
            <div>
              <PasswordInput
                label={t('form:input-label-password')}
                {...register('password')}
                error={t(errors?.password?.message!)}
                variant="outline"
                className="mb-4"
              />
              <PasswordInput
                label={t('form:input-label-confirm-password')}
                {...register('confirm_password')}
                error={t(errors?.confirm_password?.message!)}
                variant="outline"
                className="mb-4"
              />
            </div>
          )}
          <SelectRoles control={control} />
          {errors?.role && (
            <p className="my-2 text-xs text-start text-red-500">
              {/* @ts-ignore */}
              {t(errors?.role?.message!)}
            </p>
          )}
        </Card>
      </div>

      <div className="mb-4 text-end">
        <Button loading={creating || updating} disabled={creating || updating}>
          {isEmpty(initialValues)
            ? t('form:button-label-create-customer')
            : t('form:button-label-update-customer')}
        </Button>
      </div>
    </form>
  );
};

export default StaffCreateUpdateForm;
