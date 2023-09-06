import 'react-phone-input-2/lib/style.css';

import { useMutation, useQuery } from '@apollo/client';
import Card from '@components/common/card';
import { SaveIcon } from '@components/icons/save-icon';
import ImageModal from '@components/image-modal';
import Button from '@components/ui/button';
import Description from '@components/ui/description';
import ValidationError from '@components/ui/form-validation-error';
import Input from '@components/ui/input';
import Label from '@components/ui/label';
import SelectInput from '@components/ui/select-input';
import { CREATE_USER, UPDATE_USER } from '@graphql/user';
import { ROLES } from '@graphql/user-role';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  useErrorLogger,
  useGetUser,
  useWarnIfUnsavedChanges
} from '@hooks/index';
import { notify } from '@lib/index';
import { RoleType, UserType } from '@ts-types/generated';
import { ROUTES } from '@utils/routes';
import { isValidPhoneNumber } from 'libphonenumber-js';
import isEmpty from 'lodash/isEmpty';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { useState } from 'react';
import { Control, useForm } from 'react-hook-form';
import PhoneInput from 'react-phone-input-2';

import { userValidationSchema } from './user-validation-schema';

interface FormValues extends UserType {
  notify: boolean;
}

const defaultValues = {
  profile: []
};

type IProps = {
  initialValues?: UserType | any;
};

interface TRolesSelect {
  roles: RoleType[];
}

function SelectRoles({ control }: { control: Control<FormValues> }) {
  const { t } = useTranslation();

  const { data, loading, error } = useQuery<TRolesSelect>(ROLES, {
    variables: {},
    fetchPolicy: 'cache-and-network'
  });

  const { roles = [] } = data ?? {};

  useErrorLogger(error);

  return (
    <div>
      <Label isRequiredLabel>{t('form:input-label-roles')}</Label>
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

const UserCreateUpdateForm = ({ initialValues }: IProps) => {
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
    resolver: yupResolver(userValidationSchema)
  });

  const { userInfo } = useGetUser();
  const csrfToken = userInfo?.csrfToken;

  const [createUser, { loading: creating }] = useMutation(CREATE_USER, {
    context: {
      headers: {
        'x-csrf-token': csrfToken
      }
    },
    onCompleted: (data: { createUser: UserType }) => {
      if (!isEmpty(data)) {
        reset();
        notify(t('common:successfully-created'), 'success');
        router.push(ROUTES.USER);
      }
    }
  });
  const [updateUser, { loading: updating }] = useMutation(UPDATE_USER, {
    context: {
      headers: {
        'x-csrf-token': csrfToken
      }
    },
    onCompleted: (data: { updateUser: UserType }) => {
      if (!isEmpty(data)) {
        notify(t('common:successfully-updated'), 'success');
        router.push(ROUTES.USER);
      }
    }
  });

  useErrorLogger(error);

  async function onSubmit(values: FormValues) {
    const variables = {
      firstName: values.firstName,
      lastName: values.lastName,
      phoneNumber: values.phoneNumber,
      profile: (values.profile ?? [])?.map(({ id }) => ({ id })),
      roleId: values.role.id,
      email: values.email
    };

    setUnsavedChanges(false);
    if (isEmpty(initialValues)) {
      createUser({ variables }).catch((err) => {
        setError(err);
      });
    } else {
      updateUser({ variables: { id: initialValues?.id, ...variables } }).catch(
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
      <div className="my-5 flex flex-wrap border-b border-dashed border-border-base pb-8 sm:my-8">
        <Description
          title={t('form:input-label-image')}
          details={t('form:category-image-helper-text')}
          className="w-full px-0 pb-5 sm:w-4/12 sm:py-8 sm:pe-4 md:w-1/3 md:pe-5"
        />

        <Card className="w-full sm:w-8/12 md:w-2/3">
          <ImageModal
            onSelect={(photo) => setValue('profile', photo)}
            selected={profile}
            isThumbnail
          />
        </Card>
      </div>

      <div className="my-5 flex flex-wrap sm:my-8">
        <Description
          title={t('form:form-title-information')}
          details={t('form:customer-form-info-help-text')}
          className="w-full px-0 pb-5 sm:w-4/12 sm:py-8 sm:pe-4 md:w-1/3 md:pe-5"
        />

        <Card className="w-full sm:w-8/12 md:w-2/3">
          <Input
            label={t('form:input-label-first-name')}
            isRequiredLabel
            {...register('firstName')}
            type="text"
            variant="outline"
            className="mb-4"
            error={t(errors.firstName?.message!)}
          />
          <Input
            label={t('form:input-label-last-name')}
            isRequiredLabel
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
            isRequiredLabel
            {...register('email')}
            type="email"
            variant="outline"
            className="mb-4"
            error={t(errors.email?.message!)}
          />
          <SelectRoles control={control} />
          {errors?.role && (
            <p className="my-2 text-start text-xs text-red-500">
              {/* @ts-ignore */}
              {t(errors?.role?.message!)}
            </p>
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

export default UserCreateUpdateForm;
