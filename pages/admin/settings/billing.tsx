import AppLayout from '@components/layouts/app';
import { useErrorLogger, useGetClient } from '@hooks/index';
import { verifyAuth, XSRFHandler } from '@middleware/utils';
import type { SSRProps } from '@ts-types/custom.types';
import { ROUTES } from '@utils/routes';
import type { GetServerSideProps } from 'next';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useQuery } from '@apollo/client';
import {
  GET_STORE_SUBSCRIPTION,
  GET_STORE_SUBSCRIPTIONS,
  GET_SUBSCRIPTION_PLANS
} from '@graphql/subscription';
import { isEmpty } from 'lodash';
import ErrorMessage from '@components/ui/error-message';
import Loader from '@components/ui/loader/loader';
import { useEffect, useState } from 'react';

const PlansComponents = dynamic(() => import('@components/plans/plans'), {
  ssr: true
});

const SubscriptionComponents = dynamic(
  () => import('@components/plans/subscription'),
  {
    ssr: true
  }
);

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

export default function CreateSupplierPage({ client }: SSRProps) {
  useGetClient(client);

  const [skipPlans, setSkipPlans] = useState(true);

  const {
    data: subsData,
    loading: subsLoading,
    error: subsError
  } = useQuery(GET_STORE_SUBSCRIPTION, {
    variables: {},
    fetchPolicy: 'no-cache'
  });

  const {
    data: clientSubsData,
    loading: clientSubsLoading,
    error: clientSubsError
  } = useQuery(GET_STORE_SUBSCRIPTIONS, {
    variables: {},
    fetchPolicy: 'no-cache'
  });

  const { data, loading, error } = useQuery(GET_SUBSCRIPTION_PLANS, {
    variables: {},
    fetchPolicy: 'no-cache',
    skip: skipPlans
  });

  const { getSubscriptionPlans = [] } = data ?? {};
  const { getStoreSubscription = {} } = subsData ?? {};
  const { getStoreSubscriptions = [] } = clientSubsData ?? {};

  useEffect(() => {
    if (isEmpty(getStoreSubscription) && !subsLoading) {
      setSkipPlans(false);
    }
  }, [getStoreSubscription, subsLoading]);

  useErrorLogger(error);
  useErrorLogger(subsError);
  useErrorLogger(clientSubsError);

  if (!isEmpty(error) || !isEmpty(subsError) || !isEmpty(clientSubsError)) {
    return (
      <ErrorMessage
        message={(error || subsError || clientSubsError)?.message}
      />
    );
  }

  if (loading || subsLoading || clientSubsLoading) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <Loader special />
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Billing | Dropgala</title>
      </Head>
      {!isEmpty(getStoreSubscription) && (
        <SubscriptionComponents
          subscription={getStoreSubscription}
          clientSubscriptions={getStoreSubscriptions}
        />
      )}
      {!isEmpty(getSubscriptionPlans) && (
        <PlansComponents
          products={getSubscriptionPlans}
          clientSubscriptions={getStoreSubscriptions}
        />
      )}
    </>
  );
}

CreateSupplierPage.Layout = AppLayout;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { locale } = context;
  const { client } = await verifyAuth(context);

  if (!client) {
    return {
      redirect: {
        permanent: false,
        destination: ROUTES.LOGIN
      }
    };
  }

  const { csrfToken, csrfError } = await XSRFHandler(context);

  return {
    props: {
      ...(await serverSideTranslations(locale!, [
        'table',
        'common',
        'form',
        'error'
      ])),
      client: { ...(client ?? {}), csrfToken, csrfError }
    }
  };
};
