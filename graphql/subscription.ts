import { gql } from '@apollo/client';

export const GET_SUBSCRIPTION_PLANS = gql`
  query GetSubscriptionPlans {
    getSubscriptionPlans {
      id
      name
      description
      image
      prices {
        id
        currency
        interval
        intervalCount
        trialPeriodDays
        type
        unitAmount
      }
    }
  }
`;

export const GET_STORE_SUBSCRIPTION = gql`
  query GetStoreSubscription {
    getStoreSubscription {
      id
      status
      cancel_at_period_end
      created
      current_period_start
      current_period_end
      ended_at
      cancel_at
      canceled_at
      trial_start
      trial_end
      price {
        id
        currency
        interval
        intervalCount
        trialPeriodDays
        type
        unitAmount
        product {
          id
          name
        }
      }
    }
  }
`;

export const GET_STORE_SUBSCRIPTIONS = gql`
  query GetStoreSubscriptions {
    getStoreSubscriptions {
      id
      status
      cancel_at_period_end
      created
      current_period_start
      current_period_end
      ended_at
      cancel_at
      canceled_at
      trial_start
      trial_end
      price {
        id
        currency
        interval
        intervalCount
        trialPeriodDays
        type
        unitAmount
        product {
          id
          name
        }
      }
      user {
        id
        firstName
        lastName
      }
    }
  }
`;

export const CHECKOUT_WITH_STRIPE = gql`
  mutation CheckoutWithStripe($priceId: String!, $priceType: String!) {
    checkoutWithStripe(priceId: $priceId, priceType: $priceType) {
      sessionId
    }
  }
`;

export const CREATE_STRIPE_PORTAL = gql`
  mutation CreateStripePortal {
    createStripePortal {
      redirectUrl
    }
  }
`;
