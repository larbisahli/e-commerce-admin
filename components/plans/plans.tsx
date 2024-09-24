import { useMutation } from '@apollo/client';
import Card from '@components/common/card';
import { CheckMark } from '@components/icons/checkmark';
import Alert from '@components/ui/alert';
import { useGetClient } from '@hooks/index';
import { useErrorLogger } from '@hooks/useErrorLogger';
import { notify } from '@lib/index';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { useMemo, useState } from 'react';
import React from 'react';
import Button from '@components/ui/button';
import { getStripe } from '@lib/stripe-client';
import { CHECKOUT_WITH_STRIPE } from '@graphql/subscription';
import { UpgradeIcon } from '@components/icons/sidebar/upgrade';
import SubscriptionHistory from './subscription-history';
import { Subscriptions } from '@ts-types/generated';

type IProps = {
  products?: Subscriptions[];
  clientSubscriptions?: any[];
};

type BillingInterval = 'year' | 'month';

export default function PlansComponents({
  products = [],
  clientSubscriptions
}: IProps) {
  const router = useRouter();

  const [error, setError] = useState(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [billingInterval, setBillingInterval] =
    useState<BillingInterval>('month');

  const intervals = useMemo(() => {
    return Array.from(
      new Set(
        products.flatMap(
          (product) => product?.prices?.map((price) => price?.interval)
        )
      )
    );
  }, [products]);

  const { t } = useTranslation();

  const { userInfo } = useGetClient();
  const csrfToken = userInfo?.csrfToken;

  const [checkoutWithStripe, { loading }] = useMutation(CHECKOUT_WITH_STRIPE, {
    context: {
      headers: {
        'x-csrf-token': csrfToken
      }
    },
    onCompleted: async (data: {
      checkoutWithStripe: { sessionId: string };
    }) => {
      const { sessionId } = data.checkoutWithStripe;
      if (sessionId) {
        const stripe = await getStripe();
        stripe?.redirectToCheckout({ sessionId });
        return;
      }
      notify(
        'Please try again later or contact a system administrator.',
        'error'
      );
    }
  });

  useErrorLogger(error);

  const handleStripeCheckout = async (price) => {
    if (!userInfo.email) {
      return router.push('/signin/signup');
    }
    checkoutWithStripe({
      variables: {
        priceId: price.id,
        priceType: price.type
      }
    }).catch((err) => {
      setError(err);
    });
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
      <p>Start your free 14-day trial, no credit card required.</p>
      {/* ------------------------- */}
      <div className="my-5 flex flex-wrap sm:my-8">
        <div className="w-full px-0 !pt-0 pb-5 sm:w-[35%] sm:py-8 sm:pe-4 md:w-[35%] md:pe-5">
          <Card className="pr-2 pb-2">
            <div className="text-gray-800">Free Trial</div>
            <div className="mb-4 mt-2 flex items-center">
              <span className="text-3xl font-semibold">$0.00</span>
              <span className="mx-1 font-normal text-gray-400">
                USD / month
              </span>
            </div>
          </Card>
          <div className="mb-4 mt-2">
            <SubscriptionHistory clientSubscriptions={clientSubscriptions} />
          </div>
          {/* <div className="mt-5">
            <Image
              src={'/static/images/timedeal.png'}
              alt="logo"
              width={500}
              height={200}
            />
          </div> */}
        </div>
        <Card className="w-full sm:w-[65%] md:w-[65%]">
          <div className="mb-6 flex justify-between border-b pb-2">
            <div>
              <div className="text-2xl font-semibold">Subscription Plans</div>
              <p className="text-sm text-gray-500">
                Pricing built for all businesses.
              </p>
            </div>
            <div className="relative flex self-center rounded-lg border border-gray-300 p-0.5">
              {intervals.includes('month') && (
                <button
                  onClick={() => setBillingInterval('month')}
                  type="button"
                  className={`${
                    billingInterval === 'month'
                      ? 'relative w-1/2 border-blue-300 bg-blue-100 text-blue-600 shadow'
                      : 'relative ml-0.5 w-1/2 border text-zinc-500 shadow'
                  } m-1 whitespace-nowrap rounded-md py-2 text-sm font-medium focus:z-10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 sm:w-auto sm:px-8`}
                >
                  Monthly Billing
                </button>
              )}
              {intervals.includes('year') && (
                <button
                  onClick={() => setBillingInterval('year')}
                  type="button"
                  className={`${
                    billingInterval === 'year'
                      ? 'relative w-1/2 border-blue-300 bg-blue-100 text-blue-600 shadow'
                      : 'relative ml-0.5 w-1/2 border text-zinc-500 shadow'
                  } m-1 whitespace-nowrap rounded-md py-2 text-sm font-medium focus:z-10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 sm:w-auto sm:px-8`}
                >
                  <span>Yearly Billing</span>
                  <span className="mx-1 text-xs">(-16%)</span>
                </button>
              )}
            </div>
          </div>
          {products.map((product) => {
            const price = product?.prices?.find(
              (price) => price.interval === billingInterval
            );
            if (!price) return null;
            const priceString = new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: price.currency!,
              minimumFractionDigits: 0
            }).format((price?.unitAmount || 0) / 100);
            return (
              <div key={product.id}>
                <div className="flex flex-col-reverse">
                  <div className="mt-4 grid grid-cols-1 text-center text-gray-700 lg:grid-cols-2">
                    {/* ------------- */}
                    <div className="mt-3 flex items-center">
                      <div className="flex h-5 w-5 items-center justify-center rounded-full bg-green-500 text-white">
                        <CheckMark width={11} height={11} />
                      </div>
                      <span className="mx-2 text-gray-700">
                        Unlimited products
                      </span>
                    </div>
                    {/* ------------- */}
                    <div className="mt-3 flex items-center">
                      <div className="flex h-5 w-5 items-center justify-center rounded-full bg-green-500 text-white">
                        <CheckMark width={11} height={11} />
                      </div>
                      <span className="mx-2 text-gray-700">
                        Unlimited images upload
                      </span>
                    </div>
                    {/* ------------- */}
                    <div className="mt-3 flex items-center">
                      <div className="flex h-5 w-5 items-center justify-center rounded-full bg-green-500 text-white">
                        <CheckMark width={11} height={11} />
                      </div>
                      <span className="mx-2 text-gray-700">Custom domain</span>
                    </div>
                    {/* ------------- */}
                    <div className="mt-3 flex items-center">
                      <div className="flex h-5 w-5 items-center justify-center rounded-full bg-green-500 text-white">
                        <CheckMark width={11} height={11} />
                      </div>
                      <span className="mx-2 text-gray-700">
                        Unlimited users
                      </span>
                    </div>
                    {/* ------------- */}
                    <div className="mt-3 flex items-center">
                      <div className="flex h-5 w-5 items-center justify-center rounded-full bg-green-500 text-white">
                        <CheckMark width={11} height={11} />
                      </div>
                      <span className="mx-2 text-gray-700">
                        Unlimited Roles & permissions
                      </span>
                    </div>
                    {/* ------------- */}
                    <div className="mt-3 flex items-center">
                      <div className="flex h-5 w-5 items-center justify-center rounded-full bg-green-500 text-white">
                        <CheckMark width={11} height={11} />
                      </div>
                      <span className="mx-2 text-gray-700">Store Builder</span>
                    </div>
                    {/* ------------- */}
                    <div className="mt-3 flex items-center">
                      <div className="flex h-5 w-5 items-center justify-center rounded-full bg-green-500 text-white">
                        <CheckMark width={11} height={11} />
                      </div>
                      <span className="mx-2 text-gray-700">
                        Unlimited monthly sales
                      </span>
                    </div>
                    {/* ------------- */}
                    <div className="mt-3 flex items-center">
                      <div className="flex h-5 w-5 items-center justify-center rounded-full bg-green-500 text-white">
                        <CheckMark width={11} height={11} />
                      </div>
                      <span className="mx-2 text-gray-700">
                        Multicurrencies
                      </span>
                    </div>
                    {/* ------------- */}
                    <div className="mt-3 flex items-center">
                      <div className="flex h-5 w-5 items-center justify-center rounded-full bg-green-500 text-white">
                        <CheckMark width={11} height={11} />
                      </div>
                      <span className="mx-2 text-gray-700">
                        Customer support 24/7
                      </span>
                    </div>
                    {/* ------------- */}
                    <div className="mt-3 flex items-center">
                      <div className="flex h-5 w-5 items-center justify-center rounded-full bg-green-500 text-white">
                        <CheckMark width={11} height={11} />
                      </div>
                      <span className="mx-2 text-gray-700">Google Sheets</span>
                    </div>
                    {/* ------------- */}
                    <div className="mt-3 flex items-center">
                      <div className="flex h-5 w-5 items-center justify-center rounded-full bg-green-500 text-white">
                        <CheckMark width={11} height={11} />
                      </div>
                      <span className="mx-2 text-gray-700">
                        Multiple templates
                      </span>
                    </div>
                    {/* ------------- */}
                    <div className="mt-3 flex items-center">
                      <div className="flex h-5 w-5 items-center justify-center rounded-full bg-green-500 text-white">
                        <CheckMark width={11} height={11} />
                      </div>
                      <span className="mx-2 text-gray-700">
                        Multilanguages store
                      </span>
                    </div>
                    {/* ------------- */}
                    <div className="mt-3 flex items-center">
                      <div className="flex h-5 w-5 items-center justify-center rounded-full bg-green-500 text-white">
                        <CheckMark width={11} height={11} />
                      </div>
                      <span className="mx-2 text-gray-700">
                        Multinational store
                      </span>
                    </div>
                    {/* ------------- */}
                    <div className="mt-3 flex items-center">
                      <div className="flex h-5 w-5 items-center justify-center rounded-full bg-green-500 text-white">
                        <CheckMark width={11} height={11} />
                      </div>
                      <span className="mx-2 text-gray-700">
                        Unlimited customer reviews
                      </span>
                    </div>
                  </div>
                  {/* PREMIUM */}
                  <div className="h-fit w-full rounded-md border-2 border-blue-300 bg-white shadow shadow-blue-300">
                    <div className="p-5">
                      <div className="flex items-center justify-between">
                        <div className="pt-1 text-3xl font-semibold">
                          💎 {product.name}
                        </div>
                        <div className="rounded-sm border border-blue-400 bg-blue-200 px-2 py-1 capitalize text-blue-900">
                          For professionals
                        </div>
                      </div>
                      <div className="mt-4">
                        <p className="text-md text-gray-700">
                          {product.description}
                        </p>
                      </div>
                      <div className="pt-5">
                        <span className="font-bosld text-5xl font-extrabold text-black">
                          {priceString}
                        </span>
                        <span className="ml-1 text-gray-800">
                          /{billingInterval}
                        </span>
                      </div>
                      <div className="pt-6">
                        <Button
                          className="hover:text-underline inline-block w-full cursor-pointer rounded-[2px] bg-black !py-5 px-8 text-center text-lg font-medium text-white no-underline hover:bg-gray-900"
                          loading={loading}
                          disabled={loading}
                          renderIcon={<UpgradeIcon width={25} height={25} />}
                          onClick={() => handleStripeCheckout(price)}
                        >
                          Subscribe
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </Card>
      </div>
    </>
  );
}
