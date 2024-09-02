import { loadStripe, Stripe } from '@stripe/stripe-js';
import { isEmpty } from 'lodash';

let stripePromise: Promise<Stripe | null>;

const NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY_LIVE = !isEmpty(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY_LIVE
)
  ? process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY_LIVE
  : process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;

export const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY_LIVE);
  }
  return stripePromise;
};
