import { useMutation } from '@apollo/client';
import Card from '@components/common/card';
import Alert from '@components/ui/alert';
import { useGetClient } from '@hooks/index';
import { useErrorLogger } from '@hooks/useErrorLogger';
import { notify } from '@lib/index';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { useState } from 'react';
import React from 'react';
import Button from '@components/ui/button';
import {
  CHECKOUT_WITH_STRIPE,
  CREATE_STRIPE_PORTAL
} from '@graphql/subscription';
import Link from 'next/link';
import SubscriptionHistory from './subscription-history';

interface Subscriptions {
  id: string;
  name: string;
  description: string;
  image: string;
  prices: [SubscriptionPrice];
}

interface SubscriptionPrice {
  id: string;
  currency: string;
  interval: string;
  intervalCount: number;
  trialPeriodDays: number;
  type: string;
  unitAmount: number;
}

type IProps = {
  subscription?: any;
  clientSubscriptions: any[];
};

type BillingInterval = 'year' | 'month';

export default function SubscriptionComponents({
  subscription,
  clientSubscriptions
}: IProps) {
  const router = useRouter();
  const { t } = useTranslation();

  const [error, setError] = useState(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const { userInfo } = useGetClient();
  const csrfToken = userInfo?.csrfToken;

  const [createStripePortal, { loading }] = useMutation(CREATE_STRIPE_PORTAL, {
    context: {
      headers: {
        'x-csrf-token': csrfToken
      }
    },
    onCompleted: async (data: {
      createStripePortal: { redirectUrl: string };
    }) => {
      const { redirectUrl } = data.createStripePortal;
      if (redirectUrl) {
        return router.push(redirectUrl);
      }
      notify(
        'Please try again later or contact a system administrator.',
        'error'
      );
    }
  });

  useErrorLogger(error);

  const handleStripePortalRequest = async () => {
    if (!userInfo.email) {
      return router.push('/signin/signup');
    }
    createStripePortal().catch((err) => {
      setError(err);
    });
  };

  const subscriptionPrice =
    subscription &&
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: subscription?.price?.currency!,
      minimumFractionDigits: 0
    }).format((subscription?.price?.unitAmount || 0) / 100);

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
      <div className="my-8">
        <div className="mb-8 w-full">
          <div className="flex flex-wrap">
            <div className="m-auto w-full rounded-md border border-gray-300 shadow">
              <div className="px-5 py-4">
                <h3 className="mb-1 text-2xl font-medium">Your Plan</h3>
                <p className="text-gray-500">
                  {subscription
                    ? `You are currently on the ${subscription?.price?.product?.name} plan.`
                    : 'You are not currently subscribed to any plan.'}
                </p>
                <div className="mt-8 mb-4 text-2xl font-semibold">
                  {`${subscriptionPrice}/${subscription?.price?.interval}`}
                </div>
              </div>
              <div className="rounded-b-md border-t border-gray-300 bg-gray-100 p-4 text-gray-500">
                <div className="flex flex-col items-start justify-between sm:flex-row sm:items-center">
                  <p className="pb-4 sm:pb-0">
                    Manage your subscription on Stripe.
                  </p>
                  <Button
                    size="small"
                    onClick={handleStripePortalRequest}
                    disabled={loading}
                  >
                    Open customer portal
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full">
          <SubscriptionHistory clientSubscriptions={clientSubscriptions} />
        </div>
      </div>
    </>
  );
}
