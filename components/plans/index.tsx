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
import { useGetUser } from '@hooks/index';
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

  const { userInfo } = useGetUser();
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
      <div className="text-2xl font-semibold">Find the plan for you</div>
      {/* <p className="text-sm text-gray-600">
        Facing a problem or can’t find what you’re looking for? Then, please
        contact us to assist you
      </p> */}
      <div className="my-5 flex flex-wrap sm:my-8">
        <div className="w-full px-0 !pt-0 pb-5 sm:w-4/12 sm:py-8 sm:pe-4 md:w-1/3 md:pe-5">
          <Card className="pr-2 pb-2">
            <div className="mb-5">
              <div className="flex items-center">
                <div>
                  <UpgradeIcon width={25} height={25} />
                </div>
                <div className="font-medium">Basic</div>
              </div>
            </div>
            {/*  */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="text-gray-400">
                  <DotIcon width={25} height={25} />
                </div>
                <div className="text-gray-600">Members</div>
              </div>
              <div className="text-sm font-medium text-gray-500">1 / 1</div>
            </div>
            {/*  */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="text-gray-400">
                  <DotIcon width={25} height={25} />
                </div>
                <div className="text-gray-600">Images</div>
              </div>
              <div className="text-sm font-medium text-gray-500">1 / 20</div>
            </div>
            {/*  */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="text-gray-400">
                  <DotIcon width={25} height={25} />
                </div>
                <div className="text-gray-600">Emails</div>
              </div>
              <div className="text-sm font-medium text-gray-500">0 / 50</div>
            </div>
          </Card>
          <div className="mt-5">
            <Image
              src={'/static/images/timedeal.png'}
              alt="logo"
              width={500}
              height={200}
            />
          </div>
        </div>
        <Card className="w-full sm:w-8/12 md:w-2/3">
          <div className="grid grid-cols-2 gap-2">
            {/* PREMIUM */}
            <div className="h-[900px] max-w-[350px] rounded-xl border-2 border-gray-600 bg-white shadow sm:w-[400px]">
              <div className="p-5">
                <div className="pt-1 text-3xl font-semibold">Premium</div>
                <div className="pt-5">
                  <span className="text-5xl font-bold text-black">$15</span>
                  <span className="ml-1 text-gray-700">/month</span>
                </div>
                <div className="pt-5">
                  <Link href="#subscription">
                    <div className="hover:text-underline inline-block  w-full rounded-[10px] bg-black py-2 px-8 text-center font-medium text-white no-underline hover:bg-gray-900">
                      Start first month at $1
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
                    <span className="mx-2 text-gray-700">5 users</span>
                  </div>
                  {/* ------------- */}
                  <div className="mt-3 flex items-center">
                    <div className="flex h-5 w-5 items-center justify-center text-gray-800">
                      <CheckMark width={11} height={11} />
                    </div>
                    <span className="mx-2 text-gray-700">
                      5 Roles and permissions
                    </span>
                  </div>
                  {/* ------------- */}
                  <div className="mt-3 flex items-center">
                    <div className="flex h-5 w-5 items-center justify-center text-gray-800">
                      <CheckMark width={11} height={11} />
                    </div>
                    <span className="mx-2 text-gray-700">9 Blog Posts</span>
                  </div>
                  {/* ------------- */}
                  <div className="mt-3 flex items-center">
                    <div className="flex h-5 w-5 items-center justify-center text-gray-800">
                      <CheckMark width={11} height={11} />
                    </div>
                    <span className="mx-2 text-gray-700">
                      3 Roles and permissions
                    </span>
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
            {/* BUSINESS */}
            <div className="h-[900px] max-w-[350px] rounded-xl border-2 bg-white  shadow sm:w-[400px]">
              <div className="p-5">
                <div className="pt-1 text-3xl font-semibold">Business</div>
                <div className="pt-5">
                  <span className="text-5xl font-bold text-black">$50</span>
                  <span className="ml-1 text-gray-700">/month</span>
                </div>
                <div className="pt-5">
                  <Link href="#subscription">
                    <div className="hover:text-underline inline-block w-full rounded-[10px] border border-black py-2 px-8 text-center font-medium text-black no-underline hover:bg-gray-900 hover:text-white">
                      Start first month 50% off
                    </div>
                  </Link>
                </div>
                <div className="my-3 pt-5 text-center text-gray-700">
                  {/* ------------ */}
                  <div className="mt-3 flex items-center">
                    <div className="flex h-5 w-5 items-center justify-center  text-gray-800">
                      <CheckMark width={11} height={11} />
                    </div>
                    <span className="mx-2 text-gray-700">
                      All Premium Features
                    </span>
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
                    <span className="mx-2 text-gray-700">VIP Support</span>
                  </div>
                  {/* ------------- */}
                  <div className="mt-3 flex items-center">
                    <div className="flex h-5 w-5 items-center justify-center text-gray-800">
                      <CheckMark width={11} height={11} />
                    </div>
                    <span className="mx-2 text-gray-700">
                      Unlimited Blog Posts
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
