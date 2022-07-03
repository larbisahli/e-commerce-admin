/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useMutation } from '@apollo/client';
import Card from '@components/common/card';
import { SaveIcon } from '@components/icons/save-icon';
import Alert from '@components/ui/alert';
import Button from '@components/ui/button';
import Description from '@components/ui/description';
import Input from '@components/ui/input';
import {
  CREATE_ATTRIBUTE,
  DELETE_ATTRIBUTE_VALUE,
  UPDATE_ATTRIBUTE
} from '@graphql/attribute';
import { useErrorLogger } from '@hooks/useErrorLogger';
import { notify } from '@lib/index';
import { Nullable } from '@ts-types/custom.types';
import { Attribute, AttributeValue } from '@ts-types/generated';
import { ROUTES } from '@utils/routes';
import cn from 'classnames';
import isEmpty from 'lodash/isEmpty';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { useState } from 'react';
import React, { InputHTMLAttributes } from 'react';
import { ChromePicker } from 'react-color';
import { Controller, useFieldArray, useForm } from 'react-hook-form';

type FormValues = {
  attribute_name?: Nullable<string>;
  attribute_values: AttributeValue[];
};

type IProps = {
  initialValues?: Nullable<Attribute>;
};

export default function CreateOrUpdateAttributeForm({ initialValues }: IProps) {
  const { t } = useTranslation();

  const router = useRouter();

  const [error, setError] = useState(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [deletedIndex, setDeletedIndex] = useState<number | null>(null);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors }
  } = useForm<FormValues>({
    defaultValues: initialValues
      ? initialValues
      : { attribute_name: null, attribute_values: [] }
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'attribute_values',
    keyName: 'key'
  });

  const [createAttribute, { loading: creating }] = useMutation(
    CREATE_ATTRIBUTE,
    {
      onCompleted: (data: { createAttribute: Attribute }) => {
        if (!isEmpty(data)) {
          notify(t('common:successfully-created'), 'success');
          reset();
          router.push(ROUTES.ATTRIBUTES);
        }
      }
    }
  );

  const [updateAttribute, { loading: updating }] = useMutation(
    UPDATE_ATTRIBUTE,
    {
      onCompleted: (data: { updateAttribute: Attribute }) => {
        if (!isEmpty(data)) {
          notify(t('common:successfully-updated'), 'success');
          router.push(ROUTES.ATTRIBUTES);
        }
      }
    }
  );

  const [deleteAttributeValue, { loading: deleteAttributeLoading }] =
    useMutation(DELETE_ATTRIBUTE_VALUE);

  useErrorLogger(error);

  const onSubmit = (values: FormValues) => {
    if (!isEmpty(values?.attribute_values)) {
      const hasEmptyField = values?.attribute_values.find(
        (value) => value.attribute_value === ''
      );
      if (hasEmptyField) {
        notify(t('common:value-required'), 'warning');
        return;
      }
    }

    if (isEmpty(initialValues)) {
      createAttribute({ variables: values }).catch((err) => {
        setError(err);
      });
    } else {
      const changes = initialValues?.attribute_values
        ?.map((att_value_init: AttributeValue) =>
          values?.attribute_values.find((att_value) => {
            return (
              att_value.id === att_value_init.id &&
              (att_value.attribute_value != att_value_init.attribute_value ||
                att_value.color != att_value_init.color)
            );
          })
        )
        .filter(function (x) {
          return x !== undefined;
        });

      const variables = {
        id: initialValues.id,
        attribute_name: values?.attribute_name,
        attribute_values: [
          ...changes,
          ...(values?.attribute_values.filter(function (value) {
            return !value.id;
          }) ?? [])
        ]
      };

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
          const attribute_value = data?.deleteAttributeValue?.attribute_value;

          if (!isEmpty(attribute_value)) {
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
        <div className="flex flex-wrap pb-8 border-b border-dashed border-border-base my-5 sm:my-8">
          <Description
            title={t('common:attribute')}
            details={`${
              initialValues
                ? t('form:item-description-update')
                : t('form:item-description-add')
            } ${t('form:form-description-attribute-name')}`}
            className="w-full px-0 sm:pe-4 md:pe-5 pb-5 sm:w-4/12 md:w-1/3 sm:py-8"
          />

          <Card className="w-full sm:w-8/12 md:w-2/3">
            <Input
              label={t('form:input-label-name')}
              {...register('attribute_name', { required: 'Name is required' })}
              error={t(errors.attribute_name?.message!)}
              variant="outline"
              className="mb-5"
            />
          </Card>
        </div>

        <div className="flex flex-wrap my-5 sm:my-8">
          <Description
            title={t('common:attribute-values')}
            details={`${
              initialValues
                ? t('form:item-description-update')
                : t('form:item-description-add')
            } ${t('form:form-description-attribute-value')}`}
            className="w-full px-0 sm:pe-4 md:pe-5 pb-5 sm:w-4/12 md:w-1/3 sm:py-8"
          />

          <Card className="w-full sm:w-8/12 md:w-2/3">
            <div>
              {fields.map((item, index) => (
                <div
                  className="border-b border-dashed border-border-200 last:border-0 py-5 md:py-8"
                  key={index}
                >
                  <div className="flex justify-between">
                    <Input
                      className="sm:col-span-2"
                      label={t('form:input-label-value')}
                      variant="outline"
                      {...register(
                        `attribute_values.${index}.attribute_value` as const
                      )}
                      defaultValue={item.attribute_value}
                    />
                    <ColorPicker
                      control={control}
                      color={item.color}
                      {...register(`attribute_values.${index}.color` as const)}
                    ></ColorPicker>
                    <button
                      onClick={() => removeAttributeValue(item, index)}
                      type="button"
                      className="text-sm text-red-500 hover:text-red-700 transition-colors duration-200 focus:outline-none sm:mt-4 sm:col-span-1"
                    >
                      {t('form:button-label-remove')}
                      {deleteAttributeLoading && deletedIndex === index && (
                        <span
                          className="absolute h-4 w-4 ms-2 rounded-full border-2 border-transparent border-t-2 animate-spin"
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
              onClick={() => append({ attribute_value: '', color: '' })}
              className="w-full sm:w-auto"
            >
              {t('form:button-label-add-value')}
            </Button>
          </Card>
        </div>

        <div className="mb-4 text-end">
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

          <Button
            loading={creating || updating}
            disabled={creating || updating}
          >
            <div className="mr-1">
              <SaveIcon width="1.3rem" height="1.3rem" />
            </div>
            <div>{t('form:button-label-save')}</div>
          </Button>
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
    const [currentColor, setCurrentColor] = useState(color ?? '');

    const handleClick = (e) => {
      e.preventDefault();
      setDisplayColorPicker((prev) => !prev);
    };

    const handleClose = (e) => {
      e.preventDefault();
      setDisplayColorPicker(false);
    };

    return (
      <div className="flex items-end relative">
        <button
          style={{ fontSize: '.8rem' }}
          className="bg-white hover:bg-gray-100 text w-full font-semibold p-3 border border-gray-200 rounded shadow"
          onClick={handleClick}
        >
          <span>Pick Color</span>
          <span
            style={{ background: currentColor, width: '15px', height: '15px' }}
            className={cn('absolute top-0 left-0 rounded-full', {
              shadow: !isEmpty(currentColor),
              'border-gray-400': !isEmpty(currentColor),
              border: !isEmpty(currentColor)
            })}
          ></span>
        </button>
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
