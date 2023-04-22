import 'react-phone-input-2/lib/style.css';

import { useMutation } from '@apollo/client';
import Card from '@components/common/card';
import { SaveIcon } from '@components/icons/save-icon';
import Button from '@components/ui/button';
import Description from '@components/ui/description';
import Input from '@components/ui/input';
import { CREATE_ROLE, UPDATE_ROLE } from '@graphql/user-role';
import {
  useErrorLogger,
  useGetUser,
  useWarnIfUnsavedChanges
} from '@hooks/index';
import { notify } from '@lib/index';
import { UserType } from '@ts-types/generated';
import { ResourcePermissionType } from '@ts-types/index';
import { ROUTES } from '@utils/routes';
import isEmpty from 'lodash/isEmpty';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { useState } from 'react';

import { resourceDefaultData } from './resource-data';
import RoleResourceTable from './role-resource-table';

type IProps = {
  initialValues?: ResourcePermissionType | any;
};

const RoleCreateUpdateForm = ({ initialValues }: IProps) => {
  const { t } = useTranslation();
  const router = useRouter();

  const [roles, setRoles] = useState(resourceDefaultData);
  const [roleName, setRoleName] = useState('');

  const [error, setError] = useState();
  const [unsavedChanges, setUnsavedChanges] = useState(true);

  const { userInfo } = useGetUser();
  const csrfToken = userInfo?.csrfToken;

  const [createRole, { loading: creating }] = useMutation(CREATE_ROLE, {
    context: {
      headers: {
        'x-csrf-token': csrfToken
      }
    },
    onCompleted: (data: { updateRole: UserType }) => {
      if (!isEmpty(data)) {
        notify(t('common:successfully-created'), 'success');
        router.push(ROUTES.USER_ROLE);
      }
    }
  });
  const [updateRole, { loading: updating }] = useMutation(UPDATE_ROLE, {
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

  async function onSubmit(e) {
    e.preventDefault();
    const variables = {
      roleName,
      resource: {
        privileges: Object.assign(
          {},
          ...roles.map((role) => {
            const { resource, ...actions } = role;
            return {
              [resource]: {
                permissions: {
                  ...actions
                }
              }
            };
          })
        )
      }
    };

    console.log({ variables });

    setUnsavedChanges(false);
    if (isEmpty(initialValues)) {
      createRole({ variables }).catch((err) => {
        setError(err);
      });
    } else {
      updateRole({ variables: { id: initialValues?.id, ...variables } }).catch(
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

  return (
    <form onSubmit={onSubmit} noValidate>
      <div className="flex flex-wrap pb-8 border-b border-dashed border-border-base my-5 sm:my-8">
        <Description
          title={t('form:input-label-image')}
          details={t('form:category-image-helper-text')}
          className="w-full px-0 sm:pe-4 md:pe-5 pb-5 sm:w-[25%] md:w-[25%] sm:py-8"
        />

        <Card className="w-full sm:w-[75%] md:w-[75%]">
          <div>
            <Input
              name="roleName"
              label={t('form:input-label-role-name')}
              onChange={(e) => setRoleName(e.target.value)}
              type="text"
              variant="outline"
              className="mb-4"
            />
          </div>
          <div className="mt-5 block text-body-dark font-semibold text-sm leading-none mb-2">
            Permissions
          </div>
          <div>
            <RoleResourceTable setRoles={setRoles} roles={roles} />
          </div>
        </Card>
      </div>

      <div className="mb-4 text-end">
        <Button loading={creating || updating} disabled={creating || creating}>
          <div className="mr-1">
            <SaveIcon width="1.3rem" height="1.3rem" />
          </div>
          <div>{t('form:button-label-save')}</div>
        </Button>
      </div>
    </form>
  );
};

export default RoleCreateUpdateForm;
