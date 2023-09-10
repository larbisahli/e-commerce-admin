import { useMutation } from '@apollo/client';
import Card from '@components/common/card';
import FormActions from '@components/common/FormActions';
import Description from '@components/ui/description';
import Input from '@components/ui/input';
import { CREATE_TAG, UPDATE_TAG } from '@graphql/tag';
import { yupResolver } from '@hookform/resolvers/yup';
import { useGetUser } from '@hooks/index';
import { useErrorLogger } from '@hooks/useErrorLogger';
import { useSettings } from '@hooks/useSettings';
import { notify } from '@lib/notify';
import { Tag } from '@ts-types/generated';
import { ROUTES } from '@utils/routes';
import { placeholder } from '@utils/utils';
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
    formState: { errors }
  } = useForm<FormValues>({
    //@ts-ignore
    defaultValues: initialValues ? initialValues : defaultValues,
    resolver: yupResolver(tagValidationSchema)
  });

  const { selectedLanguage } = useSettings();

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
        const { id } = data.createTag;
        notify(t('common:successfully-created'), 'success');
        router.push(`${ROUTES.TAG}/edit/${id}`);
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
      language: selectedLanguage,
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

  const renderDescInfo = () => {
    if (isEmpty(initialValues)) {
      return (
        <p className="mb-12 text-sm text-gray-600">
          {`"New tag" is displayed in the system default language.
         Always maintain new data in your chosen system default language.`}
        </p>
      );
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormActions
          backLink={ROUTES.TAG}
          forceDefaultLang={isEmpty(initialValues)}
          title={
            isEmpty(initialValues)
              ? t('form:form-title-new-tag')
              : t('form:form-title-edit-tag')
          }
          loading={creating || updating}
          disabled={creating || updating}
        />
        {renderDescInfo()}
        <div className="my-5 flex flex-wrap sm:my-8">
          <Description
            title={t('form:input-label-description')}
            details={`${
              initialValues
                ? t('form:item-description-edit')
                : t('form:item-description-add')
            } ${t('form:tag-description-helper-text')}`}
            className="w-full px-0 pb-5 sm:w-4/12 sm:py-8 sm:pe-4 md:w-1/3 md:pe-5 "
          />

          <Card className="w-full sm:w-8/12 md:w-2/3">
            <Input
              label={t('form:input-label-name')}
              isRequiredLabel
              {...register('name')}
              error={t(errors.name?.message!)}
              placeholder={placeholder(initialValues, 'name', 'Enter tag name')}
              variant="outline"
              className="mb-5"
            />
          </Card>
        </div>
      </form>
    </>
  );
}
