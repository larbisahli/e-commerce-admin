import { useMutation } from '@apollo/client';
import Card from '@components/common/card';
import { SendIcon } from '@components/icons/send-icon';
import Alert from '@components/ui/alert';
import Button from '@components/ui/button';
import Input from '@components/ui/input';
import TextArea from '@components/ui/text-area';
import { useGetClient } from '@hooks/index';
import { useErrorLogger } from '@hooks/useErrorLogger';
import { notify } from '@lib/index';
import type { Suppliers } from '@ts-types/generated';
import cn from 'classnames';
import isEmpty from 'lodash/isEmpty';
import { useTranslation } from 'next-i18next';
import { useState } from 'react';
import React from 'react';
import { useForm } from 'react-hook-form';
import { CREATE_SUPPORT_TICKETS } from '@graphql/support';
import SelectInput from '@components/ui/select-input';
import Label from '@components/ui/label';

type FormValues = {
  subject: string;
  content: string;
  category: { value: string; id: string };
};

type IProps = {
  initialValues?: Suppliers | any;
};

const defaultValues = {
  subject: '',
  content: null,
  category: { value: 'Technical', id: 'technical' }
};

const categories = [
  { value: 'Technical', id: 'technical' },
  { value: 'Billing', id: 'billing' },
  { value: 'General Inquiry', id: 'general_inquiry' }
];

export default function SupportForm({ initialValues }: IProps) {
  const [error, setError] = useState(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors }
  } = useForm<FormValues>({
    defaultValues: initialValues ? { ...initialValues } : defaultValues
  });

  const { userInfo } = useGetClient();
  const csrfToken = userInfo?.csrfToken;

  const [createTicket, { loading }] = useMutation(CREATE_SUPPORT_TICKETS, {
    context: {
      headers: {
        'x-csrf-token': csrfToken
      }
    },
    onCompleted: (data: { createSupportTicket: { id: string } }) => {
      if (!isEmpty(data?.createSupportTicket)) {
        notify(t('common:successfully-sent'), 'success');
        reset();
      }
    }
  });

  useErrorLogger(error);

  const onSubmit = (values: FormValues) => {
    const variables = {
      subject: values.subject,
      category: values.category?.id ?? 'general_inquiry',
      content: values.content
    };

    if (isEmpty(initialValues)) {
      createTicket({ variables }).catch((err) => {
        setError(err);
      });
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
      <div className="text-xl font-semibold">Help & Support</div>
      <p className="text-sm text-gray-600">
        Facing a problem or can’t find what you’re looking for? Then, please
        contact us to assist you
      </p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex items-center justify-center border-b border-dashed border-border-base pb-8 sm:my-8">
          <Card className="w-full">
            <div className="mb-8 border-b pb-2">Create ticket</div>
            <div className="">
              <Input
                label={'Subject'}
                isRequiredLabel
                {...register('subject', { required: 'Subject is required' })}
                error={t(errors.subject?.message!)}
                variant="outline"
                className="mb-5"
                placeholder="Subject"
              />
            </div>
            <div className="">
              <Label isRequiredLabel>{t('form:input-label-category')}</Label>
              <SelectInput
                name="category"
                control={control}
                getOptionLabel={(option: { value: string }) => option.value}
                getOptionValue={(option: { id: string }) => option.id}
                options={categories}
              />
            </div>
            <TextArea
              isRequiredLabel
              label={'Content'}
              {...register('content', { required: 'Content is required' })}
              error={t(errors.content?.message!)}
              variant="outline"
              className="mt-5"
              placeholder="Ask your question"
            />
          </Card>
        </div>
        <div className={cn('relative flex justify-end ms-4 md:ms-6')}>
          <Button
            loading={loading}
            disabled={loading}
            renderIcon={<SendIcon width="1.3rem" height="1.3rem" />}
          >
            <div className="text-lg">{t('form:button-label-send')}</div>
          </Button>
        </div>
      </form>
    </>
  );
}
