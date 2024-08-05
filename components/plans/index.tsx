import { useMutation } from '@apollo/client';
import Card from '@components/common/card';
import PricingSection from '@components/dropgala/PricingSection';
import { CheckMark } from '@components/icons/checkmark';
import { SendIcon } from '@components/icons/send-icon';
import { DotIcon } from '@components/icons/sidebar/dot';
import { UpgradeIcon } from '@components/icons/sidebar/upgrade';
import Alert from '@components/ui/alert';
import Button from '@components/ui/button';
import Input from '@components/ui/input';
import TextArea from '@components/ui/text-area';
import { CREATE_SUPPLIER } from '@graphql/supplier';
import { useGetClient } from '@hooks/index';
import { useErrorLogger } from '@hooks/useErrorLogger';
import { notify } from '@lib/index';
import type { Suppliers } from '@ts-types/generated';
import { ROUTES } from '@utils/routes';
import cn from 'classnames';
import isEmpty from 'lodash/isEmpty';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { useState } from 'react';
import React from 'react';
import { useForm } from 'react-hook-form';

type FormValues = {
  subject: string;
  content: string;
};

type IProps = {
  initialValues?: Suppliers | any;
};

const defaultValues = {
  subject: '',
  content: null
};

export default function PlansComponents({ initialValues }: IProps) {
  const router = useRouter();

  const [error, setError] = useState(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<FormValues>({
    defaultValues: initialValues ? { ...initialValues } : defaultValues
  });

  const { userInfo } = useGetClient();
  const csrfToken = userInfo?.csrfToken;

  const [createSupplier, { loading }] = useMutation(CREATE_SUPPLIER, {
    context: {
      headers: {
        'x-csrf-token': csrfToken
      }
    },
    onCompleted: (data: { createSupplier: Suppliers }) => {
      if (!isEmpty(data)) {
        notify(t('common:successfully-created'), 'success');
        reset();
        router.push(ROUTES.SUPPLIER);
      }
    }
  });

  useErrorLogger(error);

  const onSubmit = (values: FormValues) => {
    const variables = {
      ...values
    };

    if (isEmpty(initialValues)) {
      createSupplier({ variables }).catch((err) => {
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
      <div className="text-2xl font-semibold">Subscription</div>
      <div className="my-5 flex flex-wrap sm:my-8">
        <div className="w-full px-0 !pt-0 pb-5 sm:w-4/12 sm:py-8 sm:pe-4 md:w-1/3 md:pe-5">
          <Card className="pr-2 pb-2">
            <div className="text-gray-800">Free Trial</div>
            <div className="mb-4 mt-2 flex items-center">
              <span className="text-3xl font-semibold">$0.00</span>
              <span className="mx-2 font-normal text-gray-400">
                USD / month
              </span>
            </div>
            <div className="text-xs text-gray-400">
              Billing ID: cus_PD5YHf16eQhyQe
            </div>
          </Card>
          {/* <div className="mt-5">
            <Image
              src={'/static/images/timedeal.png'}
              alt="logo"
              width={500}
              height={200}
            />
          </div> */}
        </div>
        <Card className="w-full sm:w-8/12 md:w-2/3">
          <div className="mb-6 text-2xl font-semibold">Plans</div>
          <div className="grid grid-cols-1">
            {/* PREMIUM */}
            <div className="h-[900px] w-full rounded-xl border bg-white shadow">
              <div className="p-5">
                <div className="flex items-center justify-between">
                  <div className="pt-1 text-3xl font-semibold">💎 Premium</div>
                  <div className="text-gray-500">For professionals</div>
                </div>
                <div className="pt-5">
                  <span className="text-5xl font-bold text-black">$15</span>
                  <span className="ml-1 text-gray-700">/month</span>
                </div>
                <div className="pt-5">
                  <Link href="#subscription">
                    <div className="hover:text-underline inline-block w-full  rounded-[10px] bg-blue-600 py-2 px-8 text-center text-lg font-medium text-white no-underline hover:bg-gray-900">
                      Upgrade plan
                    </div>
                  </Link>
                </div>
                <div className="my-3 pt-5 text-center text-gray-700">
                  {/* ------------ */}
                  <div className="mt-3 flex items-center">
                    <div className="flex h-5 w-5 items-center justify-center text-gray-800">
                      <CheckMark width={11} height={11} />
                    </div>
                    <span className="mx-2 text-gray-700">
                      All Basic Features
                    </span>
                  </div>
                  {/* ------------- */}
                  <div className="mt-3 flex items-center">
                    <div className="flex h-5 w-5 items-center justify-center text-gray-800">
                      <CheckMark width={11} height={11} />
                    </div>
                    <span className="mx-2 text-gray-700">
                      Unlimited products
                    </span>
                  </div>
                  {/* ------------- */}
                  <div className="mt-3 flex items-center">
                    <div className="flex h-5 w-5 items-center justify-center text-gray-800">
                      <CheckMark width={11} height={11} />
                    </div>
                    <span className="mx-2 text-gray-700">
                      Unlimited images upload
                    </span>
                  </div>
                  {/* ------------- */}
                  <div className="mt-3 flex items-center">
                    <div className="flex h-5 w-5 items-center justify-center text-gray-800">
                      <CheckMark width={11} height={11} />
                    </div>
                    <span className="mx-2 text-gray-700">Custom domain</span>
                  </div>
                  {/* ------------- */}
                  <div className="mt-3 flex items-center">
                    <div className="flex h-5 w-5 items-center justify-center text-gray-800">
                      <CheckMark width={11} height={11} />
                    </div>
                    <span className="mx-2 text-gray-700">Unlimited users</span>
                  </div>
                  {/* ------------- */}
                  <div className="mt-3 flex items-center">
                    <div className="flex h-5 w-5 items-center justify-center text-gray-800">
                      <CheckMark width={11} height={11} />
                    </div>
                    <span className="mx-2 text-gray-700">
                      Unlimited Roles and permissions
                    </span>
                  </div>
                  {/* ------------- */}
                  <div className="mt-3 flex items-center">
                    <div className="flex h-5 w-5 items-center justify-center text-gray-800">
                      <CheckMark width={11} height={11} />
                    </div>
                    <span className="mx-2 text-gray-700">Store Builder</span>
                  </div>
                  {/* ------------- */}
                  <div className="mt-3 flex items-center">
                    <div className="flex h-5 w-5 items-center justify-center text-gray-800">
                      <CheckMark width={11} height={11} />
                    </div>
                    <span className="mx-2 text-gray-700">
                      Unlimited monthly sales
                    </span>
                  </div>
                  {/* ------------- */}
                  <div className="mt-3 flex items-center">
                    <div className="flex h-5 w-5 items-center justify-center text-gray-800">
                      <CheckMark width={11} height={11} />
                    </div>
                    <span className="mx-2 text-gray-700">Multicurrencies</span>
                  </div>
                  {/* ------------- */}
                  <div className="mt-3 flex items-center">
                    <div className="flex h-5 w-5 items-center justify-center text-gray-800">
                      <CheckMark width={11} height={11} />
                    </div>
                    <span className="mx-2 text-gray-700">
                      Customer support 24/7
                    </span>
                  </div>
                  {/* ------------- */}
                  <div className="mt-3 flex items-center">
                    <div className="flex h-5 w-5 items-center justify-center text-gray-800">
                      <CheckMark width={11} height={11} />
                    </div>
                    <span className="mx-2 text-gray-700">Google Sheets</span>
                  </div>
                  {/* ------------- */}
                  <div className="mt-3 flex items-center">
                    <div className="flex h-5 w-5 items-center justify-center text-gray-800">
                      <CheckMark width={11} height={11} />
                    </div>
                    <span className="mx-2 text-gray-700">
                      Multiple templates
                    </span>
                  </div>
                  {/* ------------- */}
                  <div className="mt-3 flex items-center">
                    <div className="flex h-5 w-5 items-center justify-center text-gray-800">
                      <CheckMark width={11} height={11} />
                    </div>
                    <span className="mx-2 text-gray-700">
                      Multilanguages store
                    </span>
                  </div>
                  {/* ------------- */}
                  <div className="mt-3 flex items-center">
                    <div className="flex h-5 w-5 items-center justify-center text-gray-800">
                      <CheckMark width={11} height={11} />
                    </div>
                    <span className="mx-2 text-gray-700">
                      Multinational store
                    </span>
                  </div>
                  {/* ------------- */}
                  <div className="mt-3 flex items-center">
                    <div className="flex h-5 w-5 items-center justify-center text-gray-800">
                      <CheckMark width={11} height={11} />
                    </div>
                    <span className="mx-2 text-gray-700">
                      Unlimited customer reviews
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </>
  );
}
