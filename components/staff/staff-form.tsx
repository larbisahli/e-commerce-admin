import 'react-phone-input-2/lib/style.css';

import { useMutation, useQuery } from '@apollo/client';
import Card from '@components/common/card';
import { SaveIcon } from '@components/icons/save-icon';
import ImageModal from '@components/image-modal';
import Button from '@components/ui/button';
import Checkbox from '@components/ui/checkbox';
import Description from '@components/ui/description';
import ValidationError from '@components/ui/form-validation-error';
import Input from '@components/ui/input';
import Label from '@components/ui/label';
import PasswordInput from '@components/ui/password-input';
import SelectInput from '@components/ui/select-input';
import { CREATE_STAFF, ROLES_FOR_SELECT, UPDATE_STAFF } from '@graphql/staff';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  useErrorLogger,
  useGetStaff,
  useWarnIfUnsavedChanges
} from '@hooks/index';
import { notify } from '@lib/index';
import { RoleType, StaffType } from '@ts-types/generated';
import { ROUTES } from '@utils/routes';
import { isValidPhoneNumber } from 'libphonenumber-js';
import isEmpty from 'lodash/isEmpty';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { useState } from 'react';
import { Control, useForm } from 'react-hook-form';
import PhoneInput from 'react-phone-input-2';

import { staffValidationSchema } from './staff-validation-schema';

interface FormValues extends StaffType {
  notify: boolean;
}

const defaultValues = {};

type IProps = {
  initialValues?: StaffType | any[];
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
        getOptionLabel={(option: RoleType) => option.roleName}
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

  const [error, setError] = useState();
  const [unsavedChanges, setUnsavedChanges] = useState(true);

  const {
    register,
    handleSubmit,
    control,
    reset,
    watch,
    setValue,
    formState: { errors }
  } = useForm<FormValues>({
    // @ts-ignore
    defaultValues: initialValues
      ? {
          ...initialValues,
          password: 'test',
          confirmPassword: 'test',
          notify: false
        }
      : defaultValues,
    resolver: yupResolver(staffValidationSchema)
  });

  const { staffInfo } = useGetStaff();
  const csrfToken = staffInfo?.csrfToken;

  const [createStaff, { loading: creating }] = useMutation(CREATE_STAFF, {
    context: {
      headers: {
        'x-csrf-token': csrfToken
      }
    },
    onCompleted: (data: { createStaff: StaffType }) => {
      if (!isEmpty(data)) {
        reset();
        notify(t('common:successfully-created'), 'success');
        router.push(ROUTES.STAFFS);
      }
    }
  });
  const [updateStaff, { loading: updating }] = useMutation(UPDATE_STAFF, {
    context: {
      headers: {
        'x-csrf-token': csrfToken
      }
    },
    onCompleted: (data: { updateStaff: StaffType }) => {
      if (!isEmpty(data)) {
        notify(t('common:successfully-updated'), 'success');
        router.push(ROUTES.STAFFS);
      }
    }
  });

  useErrorLogger(error);

  async function onSubmit(values: FormValues) {
    const variables = {
      firstName: values.firstName,
      lastName: values.lastName,
      phoneNumber: values.phoneNumber,
      profile: [
        {
          id: values.profile[0]?.id
        }
      ],
      roleId: values.role.id,
      password: values.password,
      email: values.email,
      notify: values.notify
    };

    console.log({ variables, initialValues });

    setUnsavedChanges(false);
    if (isEmpty(initialValues)) {
      createStaff({ variables }).catch((err) => {
        setError(err);
      });
    } else {
      updateStaff({ variables: { id: initialValues?.id, ...variables } }).catch(
        (err) => {
          setError(err);
          setUnsavedChanges(true);
        }
      );
    }
  }

  useWarnIfUnsavedChanges(unsavedChanges, () => {
    return confirm(t('common:UNSAVED_CHANGES'));
  });

  const phoneNumber = watch('phoneNumber');
  const profile = watch('profile');

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className="flex flex-wrap pb-8 border-b border-dashed border-border-base my-5 sm:my-8">
        <Description
          title={t('form:input-label-image')}
          details={t('form:category-image-helper-text')}
          className="w-full px-0 sm:pe-4 md:pe-5 pb-5 sm:w-4/12 md:w-1/3 sm:py-8"
        />

        <Card className="w-full sm:w-8/12 md:w-2/3">
          <ImageModal
            onSelect={(photo) => setValue('profile', photo)}
            selected={profile}
            isThumbnail
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
            {...register('firstName')}
            type="text"
            variant="outline"
            className="mb-4"
            error={t(errors.firstName?.message!)}
          />
          <Input
            label={t('form:input-label-last-name')}
            {...register('lastName')}
            type="text"
            variant="outline"
            className="mb-4"
            error={t(errors.lastName?.message!)}
          />
          <div className="mb-4">
            <Label>{t('form:input-label-phone')}</Label>
            <PhoneInput
              country="us"
              inputProps={{
                name: 'phone',
                required: true,
                autoFocus: false
              }}
              disableSearchIcon
              enableSearch
              inputClass="phone-number-class py-5"
              value={`+${phoneNumber}`}
              isValid={(value, country: { dialCode: string }) => {
                if (country?.dialCode != value) {
                  return isValidPhoneNumber(`+${value}`);
                }
                return true;
              }}
              onChange={(phone) => {
                setValue('phoneNumber', phone);
              }}
            />
            {/* @ts-ignore */}
            <ValidationError message={t(errors.phoneNumber?.message)} />
          </div>
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
                {...register('confirmPassword')}
                error={t(errors?.confirmPassword?.message!)}
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
          {isEmpty(initialValues) && (
            <div className="mt-4">
              <Label>{t('form:input-label-notification')}</Label>
              <Checkbox
                {...register('notify')}
                className="mb-4"
                label={t('form:input-label-notify')}
              />
            </div>
          )}
        </Card>
      </div>

      <div className="mb-4 text-end">
        <Button loading={creating || updating} disabled={creating || updating}>
          <div className="mr-1">
            <SaveIcon width="1.3rem" height="1.3rem" />
          </div>
          <div>{t('form:button-label-save')}</div>
        </Button>
      </div>
    </form>
  );
};

export default StaffCreateUpdateForm;
