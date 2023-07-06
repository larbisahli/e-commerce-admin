import { useMutation } from '@apollo/client';
import Card from '@components/common/card';
import { SaveIcon } from '@components/icons/save-icon';
import Button from '@components/ui/button';
import Description from '@components/ui/description';
import Input from '@components/ui/input';
import { CREATE_TAG, UPDATE_TAG } from '@graphql/tag';
import { yupResolver } from '@hookform/resolvers/yup';
import { useGetUser } from '@hooks/index';
import { useErrorLogger } from '@hooks/useErrorLogger';
import { notify } from '@lib/notify';
import { Tag } from '@ts-types/generated';
import { ROUTES } from '@utils/routes';
import isEmpty from 'lodash/isEmpty';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { tagValidationSchema } from './tag-validation-schema';

type FormValues = {
  name: string;
};

const defaultValues = {
  name: ''
};

type IProps = {
  initialValues?: Tag | any;
};

export default function CreateOrUpdateTagForm({ initialValues }: IProps) {
  const router = useRouter();
  const { t } = useTranslation();

  const [error, setError] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<FormValues>({
    //@ts-ignore
    defaultValues: initialValues ? initialValues : defaultValues,
    resolver: yupResolver(tagValidationSchema)
  });

  const { userInfo } = useGetUser();
  const csrfToken = userInfo?.csrfToken;

  const [createTag, { loading: creating }] = useMutation(CREATE_TAG, {
    context: {
      headers: {
        'x-csrf-token': csrfToken
      }
    },
    onCompleted: (data: { createTag: Tag }) => {
      if (!isEmpty(data)) {
        notify(t('common:successfully-created'), 'success');
        reset();
        router.push(ROUTES.TAG);
      }
    }
  });

  const [updateTag, { loading: updating }] = useMutation(UPDATE_TAG, {
    context: {
      headers: {
        'x-csrf-token': csrfToken
      }
    },
    onCompleted: (data: { updateTag: Tag }) => {
      if (!isEmpty(data)) {
        notify(t('common:successfully-updated'), 'success');
        router.push(ROUTES.TAG);
      }
    }
  });

  useErrorLogger(error);

  const onSubmit = async (values: FormValues) => {
    const input = {
      name: values.name
    };

    if (isEmpty(initialValues)) {
      createTag({ variables: input }).catch((err) => {
        setError(err);
      });
    } else {
      updateTag({ variables: { id: initialValues.id, ...input } }).catch(
        (err) => {
          setError(err);
        }
      );
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-wrap my-5 sm:my-8">
        <Description
          title={t('form:input-label-description')}
          details={`${
            initialValues
              ? t('form:item-description-edit')
              : t('form:item-description-add')
          } ${t('form:tag-description-helper-text')}`}
          className="w-full px-0 sm:pe-4 md:pe-5 pb-5 sm:w-4/12 md:w-1/3 sm:py-8 "
        />

        <Card className="w-full sm:w-8/12 md:w-2/3">
          <Input
            label={t('form:input-label-name')}
            isRequiredLabel
            {...register('name')}
            error={t(errors.name?.message!)}
            variant="outline"
            className="mb-5"
          />
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
