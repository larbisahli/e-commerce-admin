/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useMutation } from '@apollo/client';
import Card from '@components/common/card';
import { LanguageDefaultDescInfo } from '@components/common/commonComponents';
import FormActions from '@components/common/FormActions';
import Alert from '@components/ui/alert';
import Button from '@components/ui/button';
import Description from '@components/ui/description';
import Input from '@components/ui/input';
import Label from '@components/ui/label';
import SelectInput from '@components/ui/select-input';
import {
  CREATE_ATTRIBUTE,
  DELETE_ATTRIBUTE_VALUE,
  UPDATE_ATTRIBUTE
} from '@graphql/attribute';
import { useErrorLogger } from '@hooks/useErrorLogger';
import { useGetUser } from '@hooks/useGetUser';
import { useSettings } from '@hooks/useSettings';
import { notify } from '@lib/index';
import { AttributeTypes } from '@ts-types/enums';
import { Attribute, AttributeValue } from '@ts-types/generated';
import { ROUTES } from '@utils/routes';
import { translationFallback } from '@utils/utils';
import cn from 'classnames';
import isEmpty from 'lodash/isEmpty';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { useState } from 'react';
import React, { InputHTMLAttributes, useEffect } from 'react';
import { ChromePicker } from 'react-color';
import { Controller, useFieldArray, useForm } from 'react-hook-form';

interface FormValues extends Attribute {}

type IProps = {
  initialValues?: Attribute | any;
};

const attributeTypeOptions = [
  { label: 'Color', id: AttributeTypes.COLOR },
  { label: 'Text', id: AttributeTypes.TEXT }
];

export default function CreateOrUpdateAttributeForm({
  initialValues = {}
}: IProps) {
  const { t } = useTranslation();

  const router = useRouter();

  const [error, setError] = useState(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [deletedIndex, setDeletedIndex] = useState<number | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors }
  } = useForm<FormValues>({
    defaultValues: isEmpty(initialValues)
      ? {
          name: null,
          type: { label: 'Text', id: AttributeTypes.TEXT },
          values: []
        }
      : {
          ...initialValues,
          type: attributeTypeOptions?.find(
            (op) => op.id === initialValues?.type
          )
        }
  });

  const { userInfo } = useGetUser();
  const csrfToken = userInfo?.csrfToken;

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'values',
    keyName: 'key'
  });

  const { selectedLanguage } = useSettings();

  const [createAttribute, { loading: creating }] = useMutation(
    CREATE_ATTRIBUTE,
    {
      context: {
        headers: {
          'x-csrf-token': csrfToken
        }
      },
      onCompleted: (data: { createAttribute: Attribute }) => {
        const { id } = data.createAttribute;
        if (id) {
          notify(t('common:successfully-created'), 'success');
          router.push(`${ROUTES.ATTRIBUTE}/edit/${id}`);
        }
      }
    }
  );

  const [updateAttribute, { loading: updating }] = useMutation(
    UPDATE_ATTRIBUTE,
    {
      context: {
        headers: {
          'x-csrf-token': csrfToken
        }
      },
      onCompleted: (data: { updateAttribute: Attribute }) => {
        if (!isEmpty(data)) {
          notify(t('common:successfully-updated'), 'success');
        }
      }
    }
  );

  const [deleteAttributeValue, { loading: deleteAttributeLoading }] =
    useMutation(DELETE_ATTRIBUTE_VALUE, {
      context: {
        headers: {
          'x-csrf-token': csrfToken
        }
      }
    });

  useErrorLogger(error);

  const onSubmit = (fields: FormValues) => {
    console.log({ fields });

    const type = (fields?.type as { label: string; id: string })?.id;

    if (!isEmpty(fields?.values)) {
      const hasEmptyValue = fields?.values.find(({ value }) => isEmpty(value));
      if (hasEmptyValue) {
        notify(t('common:value-required'), 'warning');
        return;
      }

      if (type === AttributeTypes.COLOR) {
        const hasEmptyField = fields?.values.find(({ name }) => isEmpty(name));
        if (hasEmptyField) {
          notify(t('common:color-name-required'), 'warning');
          return;
        }
      }
    }

    if (isEmpty(initialValues)) {
      console.log({ ...fields, type, language: selectedLanguage });
      createAttribute({
        variables: { ...fields, type, language: selectedLanguage }
      }).catch((err) => {
        setError(err);
      });
    } else {
      const changes = initialValues?.values
        ?.map((att_value_init: AttributeValue) => {
          const value = fields?.values.find((att_value: AttributeValue) => {
            return (
              att_value.id === att_value_init.id &&
              (att_value.name !== att_value_init.name ||
                att_value.value !== att_value_init.value)
            );
          });
          if (isEmpty(value)) {
            return undefined;
          }
          return { id: value?.id, name: value?.name, value: value?.value };
        })
        .filter(function (x) {
          return x !== undefined;
        });

      const variables = {
        id: initialValues.id,
        name: fields?.name,
        type,
        language: selectedLanguage,
        values: [
          ...changes,
          ...(fields?.values.filter(function (value: AttributeValue) {
            return !value.id;
          }) ?? [])
        ]
      };

      console.log({ variables });

      updateAttribute({ variables }).catch((err) => {
        setError(err);
      });
    }
  };

  const removeAttributeValue = (item: AttributeValue, index: number) => {
    setDeletedIndex(index);
    if (item?.id) {
      deleteAttributeValue({
        variables: { id: item?.id },
        onCompleted: (data: { deleteAttributeValue: AttributeValue }) => {
          const value = data?.deleteAttributeValue?.value;

          if (!isEmpty(value)) {
            notify(t('common:successfully-deleted'), 'success');
            remove(index);
          }
        }
      }).catch((err) => {
        setError(err);
      });
    } else {
      remove(index);
    }
  };

  const type = watch('type') as { label: string; id: string };

  useEffect(() => {
    if (!isEmpty(type) && initialValues?.type !== type?.id) {
      remove();
    }
  }, [initialValues?.type, remove, type]);

  const { values = [], type: initType } = initialValues;

  return (
    <>
      {errorMessage ? (
        <Alert
          message={t(`common:${errorMessage}`)}
          variant="error"
          closeable={true}
          className="mt-5"
          onClose={() => setErrorMessage(null)}
        />
      ) : null}
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormActions
          backLink={ROUTES.ATTRIBUTE}
          forceSystemLang={isEmpty(initialValues)}
          title={
            isEmpty(initialValues)
              ? t('form:form-title-new-attribute')
              : t('form:form-title-edit-attribute')
          }
          loading={creating || updating}
          disabled={creating || updating}
        />
        <LanguageDefaultDescInfo
          label="New Attribute"
          isVisible={isEmpty(initialValues)}
        />
        <div className="my-5 flex flex-wrap border-b border-dashed border-border-base pb-8 sm:my-8">
          <Description
            title={t('common:attribute')}
            details={`${
              initialValues
                ? t('form:item-description-update')
                : t('form:item-description-add')
            } ${t('form:form-description-attribute-name')}`}
            className="w-full px-0 pb-5 sm:w-4/12 sm:py-8 sm:pe-4 md:w-1/3 md:pe-5"
          />

          <Card className="w-full sm:w-8/12 md:w-2/3">
            <Input
              label={t('form:input-label-name')}
              isRequiredLabel
              {...register('name', { required: 'Name is required' })}
              error={t(errors.name?.message!)}
              placeholder={translationFallback(
                initialValues,
                'name',
                'Enter attribute name'
              )}
              variant="outline"
              className="mb-5"
            />
            <div>
              <Label>{t('form:input-label-type')}</Label>
              <SelectInput
                name="type"
                control={control}
                getOptionLabel={(option: { label: string }) => option.label}
                getOptionValue={(option: { id: string }) => option.id}
                options={attributeTypeOptions}
              />
            </div>
          </Card>
        </div>

        <div className="my-5 flex flex-wrap sm:my-8">
          <Description
            title={t('common:attribute-values')}
            details={`${
              initialValues
                ? t('form:item-description-update')
                : t('form:item-description-add')
            } ${t('form:form-description-attribute-value')}`}
            className="w-full px-0 pb-5 sm:w-4/12 sm:py-8 sm:pe-4 md:w-1/3 md:pe-5"
          />

          <Card className="w-full sm:w-8/12 md:w-2/3">
            <div>
              {fields.map((item, index) => (
                <div
                  className="border-b border-dashed border-border-200 py-5 last:border-0 md:py-8"
                  key={index}
                >
                  <div className="flex justify-between">
                    {type?.id === AttributeTypes.COLOR && (
                      <Input
                        className="sm:col-span-2"
                        isRequiredLabel
                        label={t('form:input-label-color-name')}
                        variant="outline"
                        {...register(`values.${index}.name` as const)}
                        placeholder={translationFallback(
                          values[index],
                          'name',
                          'Enter color name'
                        )}
                        defaultValue={item.value}
                      />
                    )}
                    {type?.id === AttributeTypes.TEXT && (
                      <Input
                        className="sm:col-span-2"
                        isRequiredLabel
                        label={t('form:input-label-value')}
                        variant="outline"
                        {...register(`values.${index}.value` as const)}
                        placeholder={
                          initType === AttributeTypes.COLOR
                            ? 'Enter value'
                            : translationFallback(
                                values[index],
                                'value',
                                'Enter value'
                              )
                        }
                        defaultValue={item.value}
                      />
                    )}
                    {type?.id === AttributeTypes.COLOR && (
                      <ColorPicker
                        control={control}
                        color={item.value}
                        {...register(`values.${index}.value` as const)}
                      ></ColorPicker>
                    )}

                    <button
                      onClick={() => removeAttributeValue(item, index)}
                      type="button"
                      className="text-sm text-red-500 transition-colors duration-200
                      hover:text-red-700 focus:outline-none sm:col-span-1 sm:mt-4"
                    >
                      {t('form:button-label-remove')}
                      {deleteAttributeLoading && deletedIndex === index && (
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
                </div>
              ))}
            </div>
            <Button
              type="button"
              onClick={() =>
                append({
                  name: '',
                  value: type?.id === AttributeTypes.COLOR ? '#fff' : ''
                })
              }
              className="w-full sm:w-auto"
            >
              {type?.id === AttributeTypes.COLOR &&
                t('form:button-label-add-color')}
              {type?.id === AttributeTypes.TEXT &&
                t('form:button-label-add-value')}
            </Button>
          </Card>
        </div>
      </form>
    </>
  );
}

export interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  name: string;
  control: any;
  color: string;
}

const ColorPicker = React.forwardRef<HTMLInputElement, Props>(
  (
    { name, control, color, ...rest },
    // eslint-disable-next-line no-unused-vars
    ref
  ) => {
    const [displayColorPicker, setDisplayColorPicker] = useState(false);
    const [currentColor, setCurrentColor] = useState('');

    console.log({ color });

    const handleClick = (e) => {
      e.preventDefault();
      setDisplayColorPicker((prev) => !prev);
    };

    const handleClose = (e) => {
      e.preventDefault();
      setDisplayColorPicker(false);
    };

    useEffect(() => {
      setCurrentColor(color ?? '');
    }, [color]);

    return (
      <div className="relative flex w-fit items-end">
        <div className="flex w-full items-center">
          <button
            onClick={handleClick}
            style={{ background: currentColor }}
            className={cn('mr-2 h-11 w-11 rounded-sm shadow', {
              shadow: !isEmpty(currentColor),
              'border-gray-300': !isEmpty(currentColor),
              border: !isEmpty(currentColor)
            })}
          ></button>
          <button
            style={{ fontSize: '.8rem' }}
            className="text h-11 w-full rounded-sm border border-gray-200
                  bg-white p-3 font-semibold shadow hover:bg-gray-100"
            onClick={handleClick}
          >
            <span>Pick Color</span>
          </button>
        </div>

        {displayColorPicker ? (
          <div className="absolute z-10">
            <div
              role="button"
              className="fixed inset-0"
              onClick={handleClose}
            ></div>
            <Controller
              control={control}
              name={name}
              {...rest}
              render={({ field: { onChange, value } }) => {
                return (
                  <ChromePicker
                    color={value ?? ''}
                    onChange={(color) => {
                      onChange(color?.hex ?? '');
                      setCurrentColor(color?.hex ?? '');
                    }}
                  />
                );
              }}
            />
          </div>
        ) : null}
      </div>
    );
  }
);

ColorPicker.displayName = 'ColorPicker';
