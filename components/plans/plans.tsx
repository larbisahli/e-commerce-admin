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
      {/* ------------------------- */}
      <div
        className="heroCardIllustration ng-scope"
        ng-include="heroCardCtrl.getCardIllustration()"
        ng-className="{ illustrationWithIcon: heroCardCtrl.shouldShowStatusIcon() }"
        ng-click="!heroCardCtrl.isMultiCtaCard() ? heroCardCtrl.cardAction(heroCardCtrl.card, $event) : null"
      >
        <svg
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 176 176"
          className="ng-scope"
        >
          <g clip-path="url(#clip0)" fill-rule="evenodd" clip-rule="evenodd">
            <path
              d="M58.384 123.667L39.592 161h96.652l-19.475-37.333H58.384z"
              fill="url(#paint0_linear)"
            ></path>
            <path
              d="M0 136.5h69.868V16.333H0V136.5zM107.131 136.5h69.868V16.333h-69.868V136.5z"
              fill="#F6F7F9"
            ></path>
            <path
              d="M9.316 40.833h51.237v-10.5H9.316v10.5zM116.447 40.833h51.237v-10.5h-51.237v10.5zM9.316 110.833h51.237V53.667H9.316v57.166zM116.447 110.833h51.237V53.667h-51.237v57.166z"
              fill="#DBDFE7"
            ></path>
            <path d="M47 147h82V0H47v147z" fill="url(#paint1_linear)"></path>
            <path
              d="M39.592 16.333h6.987V136.5h-6.987V16.333zM129.256 16.333h6.987V136.5h-6.987V16.333z"
              fill="#34313F"
              fill-opacity=".06"
            ></path>
            <path
              d="M129 0H47v147h82V0zM63.166 104c-.643 0-1.166.522-1.166 1.167v17.5c0 .644.523 1.166 1.166 1.166h48.904c.644 0 1.167-.522 1.167-1.166v-17.5c0-.645-.523-1.167-1.167-1.167H63.167zm2.044-38.667c0-12.54 10.167-22.75 22.708-22.75 12.54 0 22.707 10.21 22.707 22.75 0 12.541-10.167 22.75-22.707 22.75-12.541 0-22.708-10.209-22.708-22.75zm56.536-38.5H54.73v-10.5h67.016v10.5z"
              fill="#fff"
            ></path>
            <path
              d="M47 0h82v65h-18.377c-.179-12.388-10.276-22.417-22.706-22.417-12.429 0-22.526 10.03-22.704 22.417H47V0zm7.73 26.833h67.016v-10.5H54.731v10.5z"
              fill="#121118"
            ></path>
          </g>
          <defs>
            <linearGradient
              id="paint0_linear"
              x1="87.918"
              y1="161"
              x2="87.918"
              y2="149.425"
              gradientUnits="userSpaceOnUse"
            >
              <stop stop-color="#FBFCFD" stop-opacity=".01"></stop>
              <stop offset="1" stop-color="#F6F7F9"></stop>
            </linearGradient>
            <linearGradient
              id="paint1_linear"
              x1="129"
              y1="65.5"
              x2="47"
              y2="61"
              gradientUnits="userSpaceOnUse"
            >
              <stop stop-color="#4100A3"></stop>
              <stop offset="1" stop-color="#0D52FF"></stop>
            </linearGradient>
            <clipPath id="clip0">
              <path fill="#fff" d="M0 0h176v176H0z"></path>
            </clipPath>
          </defs>
        </svg>
      </div>
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
                      ? 'relative w-1/2 border-zinc-800 bg-zinc-700 text-white shadow-sm'
                      : 'relative ml-0.5 w-1/2 border border-transparent text-zinc-400'
                  } m-1 whitespace-nowrap rounded-md py-2 text-sm font-medium focus:z-10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 sm:w-auto sm:px-8`}
                >
                  Monthly billing
                </button>
              )}
              {intervals.includes('year') && (
                <button
                  onClick={() => setBillingInterval('year')}
                  type="button"
                  className={`${
                    billingInterval === 'year'
                      ? 'relative w-1/2 border-zinc-800 bg-zinc-700 text-white shadow-sm'
                      : 'relative ml-0.5 w-1/2 border border-transparent text-zinc-400'
                  } m-1 whitespace-nowrap rounded-md py-2 text-sm font-medium focus:z-10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 sm:w-auto sm:px-8`}
                >
                  Yearly billing
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
