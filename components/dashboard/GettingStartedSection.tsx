import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import { useMutation } from '@apollo/client';
import AlertIcon from '@components/icons/alert';
import { CheckMark } from '@components/icons/checkmark';
import { CloseIcon } from '@components/icons/close-icon';
import ExternalLinkIcon from '@components/icons/external-link';
import ResendEmail from '@components/icons/resend-email';
import { UpgradeIcon } from '@components/icons/sidebar/upgrade';
import Button from '@components/ui/button';
import { RESEND_VERIFICATION_LINK } from '@graphql/settings';
import { useErrorLogger } from '@hooks/useErrorLogger';
import { useGetClient } from '@hooks/useGetClient';
import { useSettings } from '@hooks/useSettings';
import { notify } from '@lib/notify';
import { ROUTES } from '@utils/routes';
import cn from 'classnames';
import classNames from 'classnames';
import Link from 'next/link';
import { useState } from 'react';

function UpgradeIconComponent() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      className="ng-scope"
      viewBox="0 0 176 176"
      width={125}
      height={125}
    >
      <g fillRule="evenodd" clipPath="url(#clip0)" clipRule="evenodd">
        <path
          fill="url(#paint0_linear)"
          d="M58.384 123.667L39.592 161h96.652l-19.475-37.333H58.384z"
        ></path>
        <path
          fill="#F6F7F9"
          d="M0 136.5h69.868V16.333H0V136.5zm107.131 0h69.868V16.333h-69.868V136.5z"
        ></path>
        <path
          fill="#DBDFE7"
          d="M9.316 40.833h51.237v-10.5H9.316v10.5zm107.131 0h51.237v-10.5h-51.237v10.5zm-107.131 70h51.237V53.667H9.316v57.166zm107.131 0h51.237V53.667h-51.237v57.166z"
        ></path>
        <path fill="url(#paint1_linear)" d="M47 147h82V0H47v147z"></path>
        <path
          fill="#34313F"
          fillOpacity="0.06"
          d="M39.592 16.333h6.987V136.5h-6.987V16.333zm89.664 0h6.987V136.5h-6.987V16.333z"
        ></path>
        <path
          fill="#fff"
          d="M129 0H47v147h82V0zM63.166 104c-.643 0-1.166.522-1.166 1.167v17.5c0 .644.523 1.166 1.166 1.166h48.904c.644 0 1.167-.522 1.167-1.166v-17.5c0-.645-.523-1.167-1.167-1.167H63.167zm2.044-38.667c0-12.54 10.167-22.75 22.708-22.75 12.54 0 22.707 10.21 22.707 22.75 0 12.541-10.167 22.75-22.707 22.75-12.541 0-22.708-10.209-22.708-22.75zm56.536-38.5H54.73v-10.5h67.016v10.5z"
        ></path>
        <path
          fill="#121118"
          d="M47 0h82v65h-18.377c-.179-12.388-10.276-22.417-22.706-22.417-12.429 0-22.526 10.03-22.704 22.417H47V0zm7.73 26.833h67.016v-10.5H54.731v10.5z"
        ></path>
      </g>
      <defs>
        <linearGradient
          id="paint0_linear"
          x1="87.918"
          x2="87.918"
          y1="161"
          y2="149.425"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FBFCFD" stopOpacity="0.01"></stop>
          <stop offset="1" stopColor="#F6F7F9"></stop>
        </linearGradient>
        <linearGradient
          id="paint1_linear"
          x1="129"
          x2="47"
          y1="65.5"
          y2="61"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#0041a3"></stop>
          <stop offset="1" stopColor="#3e74fc"></stop>
        </linearGradient>
        <clipPath id="clip0">
          <path fill="#fff" d="M0 0h176v176H0z"></path>
        </clipPath>
      </defs>
    </svg>
  );
}

function RocketIconComponent() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      className="ng-scope"
      viewBox="0 0 80 80"
      width={65}
      height={65}
    >
      <defs>
        <linearGradient
          id="a"
          x1="40"
          x2="40"
          y1="70.13"
          y2="64.26"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#0041a3"></stop>
          <stop offset="1" stopColor="#3e74fc"></stop>
        </linearGradient>
        <linearGradient
          id="b"
          x1="16.82"
          x2="16.82"
          y1="41.66"
          y2="60.13"
          xlinkHref="#a"
        ></linearGradient>
        <linearGradient
          id="c"
          x1="63.18"
          x2="63.18"
          y1="41.66"
          y2="60.13"
          xlinkHref="#a"
        ></linearGradient>
      </defs>
      <g data-name="Layer 1">
        <path
          fill="url(#a)"
          d="M48.64 64.14l-.25 3.36a3 3 0 01-3 2.77H34.61a3 3 0 01-3-2.77l-.25-3.36z"
        ></path>
        <path
          fill="url(#b)"
          d="M23.66 58.27a109.19 109.19 0 00-11.8 2.13 1.49 1.49 0 01-1.63-2.25A103.73 103.73 0 0122.43 42z"
        ></path>
        <path
          fill="url(#c)"
          d="M68.14 60.4a110.07 110.07 0 00-11.8-2.13L57.57 42a103.73 103.73 0 0112.2 16.14 1.49 1.49 0 01-1.63 2.26z"
        ></path>
        <path
          fill="#333"
          d="M49.41 18.61l-7.19-7.91a3 3 0 00-4.44 0l-7.19 7.91a22.07 22.07 0 00-5.66 16.46l.3 4L26.64 58v.39a3 3 0 003 2.8h20.7a3 3 0 003-2.8V58l1.43-19 .3-4a22.07 22.07 0 00-5.66-16.39zm-6.68 21.75a6 6 0 01-5.46 0 6.14 6.14 0 115.46 0z"
        ></path>
      </g>
    </svg>
  );
}

function StoreSettingsIconComponent() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="65"
      height="65"
      viewBox="0 0 24 24"
    >
      <path
        fill="currentColor"
        d="M20 6H4V4h16zm-1 6c-1.91 0-3.63.76-4.89 2H14v.11c-1.24 1.26-2 2.98-2 4.89 0 .34.03.67.08 1H4v-6H3v-2l1-5h16l1 5v.3c-.63-.19-1.3-.3-2-.3m-7 2H6v4h6zm11.8 6.4c.1 0 .1.1 0 .2l-1 1.7c-.1.1-.2.1-.3.1l-1.2-.4c-.3.2-.5.3-.8.5l-.2 1.3c0 .1-.1.2-.2.2h-2c-.1 0-.2-.1-.3-.2l-.2-1.3c-.3-.1-.6-.3-.8-.5l-1.2.5c-.1 0-.2 0-.3-.1l-1-1.7c-.1-.1 0-.2.1-.3l1.1-.8v-1l-1.1-.8c-.1-.1-.1-.2-.1-.3l1-1.7c.1-.1.2-.1.3-.1l1.2.5c.3-.2.5-.3.8-.5l.2-1.3c0-.1.1-.2.3-.2h2c.1 0 .2.1.2.2l.2 1.3c.3.1.6.3.9.5l1.2-.5c.1 0 .3 0 .3.1l1 1.7c.1.1 0 .2-.1.3l-1.1.8v1zM20.5 19c0-.8-.7-1.5-1.5-1.5s-1.5.7-1.5 1.5.7 1.5 1.5 1.5 1.5-.7 1.5-1.5"
      ></path>
    </svg>
  );
}

function StoreInfoIconComponent() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="65"
      height="65"
      viewBox="0 0 24 24"
    >
      <path
        fill="currentColor"
        d="M20 6H4V4h16zm-6 10.13l-3 3V20H4v-6H3v-2l1-5h16l.61 3.07c-.45.1-.88.33-1.22.67L16.13 14H14zM12 14H6v4h6zm10.85-.53l-1.32-1.32c-.2-.2-.53-.2-.72 0l-.98.98 2.04 2.04.98-.98c.2-.19.2-.52 0-.72M13 19.96V22h2.04l6.13-6.12-2.04-2.05z"
      ></path>
    </svg>
  );
}

const GettingStartedSectionStep1 = ({ setStoredValue }) => {
  const { published, subscription } = useSettings();

  const [error, setError] = useState(null);
  const [disableRequest, setDisableRequest] = useState(false);

  const { userInfo } = useGetClient();

  const csrfToken = userInfo?.csrfToken;

  const [resendVerificationLink, { loading }] = useMutation(
    RESEND_VERIFICATION_LINK,
    {
      context: {
        headers: {
          'x-csrf-token': csrfToken
        }
      },
      onCompleted: (data: { resendVerificationLink: { success: boolean } }) => {
        if (data?.resendVerificationLink.success) {
          notify('Link has been sent to your email', 'success');
          setDisableRequest(true);
          setTimeout(
            () => {
              setDisableRequest(false);
            },
            60 * 10 * 1000
          );
        }
      }
    }
  );

  useErrorLogger(error);

  const handleResendLink = () => {
    if (disableRequest) {
      notify('Please wait for a moment...', 'info');
      return;
    }
    resendVerificationLink({ variables: {} }).catch((err) => {
      setError(err);
    });
  };

  const isSubscribed =
    !subscription?.cancel_at_period_end && subscription?.status === 'active';


  return (
    <div className="relative mb-8 w-full">
      <button
        onClick={() => setStoredValue(2)}
        className="absolute top-0 right-0 text-gray-400"
      >
        <CloseIcon width={25} height={25} />
      </button>
      <h3 className="mb-4 flex flex-1 items-end text-xl text-gray-900">
        Get started guides
      </h3>
      {!isSubscribed && <div className="border border-b-0 border-gray-300">
        <div className="flex items-center justify-center p-8">
          <div className="mx-5">
            <Link href={`${ROUTES.BILLING}`}>
              <UpgradeIconComponent />
            </Link>
          </div>
          <div className="max-w-[500px]">
            <div className="text-lg font-semibold">
              Ready to upgrade your trial and activate your store?
            </div>
            <p className="mt-1 mb-5 font-normal text-gray-700">
              Find your perfect domain or use an existing one when you choose a
              plan for your store.
            </p>
            <Link href={`${ROUTES.BILLING}`}>
              <Button>
                <div className="flex items-center">
                  <div>
                    <UpgradeIcon width={25} height={25} />
                  </div>
                  <div className="font-medium">Upgrade your trial</div>
                </div>
              </Button>
            </Link>
          </div>
        </div>
      </div>}
      <div className={classNames("grid grid-cols-1 border border-t-0 border-gray-300 lg:grid-cols-2", isSubscribed && 'border-t')}>
        {/* Left */}
        <div className="flex flex-col border border-x-0 border-b-0 border-gray-300">
          <h4 className="mx-6 border-b border-gray-300 py-3 text-lg">
            Start accepting orders
          </h4>
          <div className="flex-1 pt-3">
            {/* 1 */}
            <div className="m-5 flex">
              <div className="relative mx-5">
                <div className="h-7 w-7 rounded-full border-[3px] border-gray-300"></div>
                <span className="absolute top-1/2 left-1/2 h-22 w-[2px] -translate-x-1/2 transform bg-gray-300"></span>
              </div>
              <div className="">
                <div className="text-lg font-medium">1. Add Products</div>
                <p className="text-sm text-gray-500">
                  Populate your store with products to sell.
                </p>
                <Link href={ROUTES.PRODUCT}>
                  <button className="mt-3 flex items-center rounded-sm border border-blue-500 px-4 py-1 text-gray-500 hover:bg-blue-100">
                    <span className="pr-2 font-medium text-blue-500">
                      {`Add products`}
                    </span>
                  </button>
                </Link>
              </div>
            </div>
            {/* 2 */}
            <div className="m-5 mt-14 flex">
              <div className="relative mx-5">
                <div className="h-7 w-7 rounded-full border-[3px] border-gray-300"></div>
                <span className="absolute top-1/2 left-1/2 h-22 w-[2px] -translate-x-1/2 transform bg-gray-300"></span>
              </div>
              <div className="">
                <div className="text-lg font-medium">2. Get set to ship</div>
                <p className="text-sm text-gray-500">
                  Set up your shipping services and methods.
                </p>
                <Link href={ROUTES.SHIPPING_ZONE}>
                  <button className="mt-3 flex items-center rounded-sm border border-blue-500 px-4 py-1 text-gray-500 hover:bg-blue-100">
                    <span className="pr-2 font-medium text-blue-500">
                      {`Set up shipping`}
                    </span>
                  </button>
                </Link>
              </div>
            </div>
            {/* 3 */}
            <div className="m-5 mt-14 flex">
              <div className="relative mx-5">
                <div
                  className={cn(
                    // 'border-[3px] w-7 h-7 rounded-full border-gray-300',
                    'flex h-7 w-7 items-center justify-center rounded-full bg-green-500 text-white'
                  )}
                >
                  <CheckMark width={14} height={14} />
                </div>
                <span className="absolute top-1/2 left-1/2 h-22 w-[2px] -translate-x-1/2 transform bg-gray-300"></span>
              </div>
              <div className="">
                <div className="text-lg font-medium">
                  3. Accept cash on delivery
                </div>
                <p className="text-sm text-gray-500">
                  Your customers will be able to checkout using cash on delivery
                  (COD).
                </p>
                <Link href={ROUTES.PAYMENT}>
                  <button className="mt-3 flex items-center rounded-sm border border-blue-500 px-4 py-1 text-gray-500 hover:bg-blue-100">
                    <span className="pr-2 font-medium text-blue-500">
                      {`Edit payments`}
                    </span>
                  </button>
                </Link>
              </div>
            </div>
            {/* 4 */}
            <div className="m-5 mt-14 flex">
              <div className="relative mx-5">
                <div className="h-7 w-7 rounded-full border-[3px] border-gray-300"></div>
              </div>
              <div className="">
                <div className="text-lg font-medium">
                  4. Set up your tax rates
                </div>
                <p className="text-sm text-gray-500">
                  Automatically calculate taxes for your customers at checkout.
                </p>
                <Link href={ROUTES.TAX}>
                  <button className="mt-3 flex items-center rounded-sm border border-blue-500 px-4 py-1 text-gray-500 hover:bg-blue-100">
                    <span className="pr-2 font-medium text-blue-500">
                      {`Set up taxes`}
                    </span>
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
        {/* Right */}
        <div className="">
          {!published && (
            <div className="flex h-[180px] flex-1 border-b-0 border-t-[1px] border-gray-300 lg:h-[160px] lg:border-l-[1px]">
              {/* Feedback verification section */}
              <div className="flex w-full items-center justify-center px-8 py-8 pt-4">
                <div className="mx-5 mb-2 h-[50px] w-[50px] font-semibold text-gray-700">
                  <AlertIcon width={45} height={45} />
                </div>
                <div className="mx-5 flex-1">
                  <div className="font-medium">Email verification</div>
                  <p className=" text-sm font-medium text-gray-600">
                    {`Verify your email address to activate your online store.`}
                  </p>
                  <button
                    disabled={loading}
                    onClick={handleResendLink}
                    className="mt-3 flex items-center rounded-sm border border-blue-500 px-4 py-1 text-gray-500 hover:bg-blue-100"
                  >
                    <span className="pr-2 font-medium text-blue-500">
                      {`Resend link`}
                    </span>
                    <div className="mb-1 text-blue-500">
                      <ResendEmail width={18} height={18} />
                    </div>
                  </button>
                </div>
              </div>
            </div>
          )}
          <div className="flex h-[185px] flex-1 border-b-0 border-t-[1px] border-gray-300 lg:h-[160px] lg:border-l-[1px]">
            {/* View store */}
            <div className="flex w-full items-center justify-center px-8 py-8 pt-4">
              <Link href={`${ROUTES.BUILDER_STYLES}`} target="_blank">
                <div className="mx-5 mb-2 h-[50px] w-[50px] font-semibold text-gray-800">
                  <RocketIconComponent />
                </div>
              </Link>
              <div className="mx-5 flex-1">
                <div className="font-medium">Review & test your store</div>
                <p className="text-sm font-medium text-gray-600">
                  {`Verify your email address to activate your online store.`}
                </p>
                <Link
                  href={`https://${userInfo?.store?.alias}.dropgala.shop`}
                  target="_blank"
                >
                  <button className="mt-4 flex items-center rounded-sm border border-blue-500 px-4 py-1 text-gray-500 hover:bg-blue-100">
                    <span className="pr-2 font-medium text-blue-500">
                      {`View store`}
                    </span>
                  </button>
                </Link>
              </div>
            </div>
          </div>
          <div className="flex h-[185px] flex-1 border-b-0 border-t-[1px] border-gray-300 lg:h-[160px] lg:border-l-[1px]">
            {/* Customize Store */}
            <div className="flex w-full items-center justify-center px-8 py-8 pt-4">
              <Link href={`${ROUTES.BUILDER_STYLES}`}>
                <div className="mx-5 mb-2 h-[50px] w-[50px] font-semibold text-[#333]">
                  <StoreSettingsIconComponent />
                </div>
              </Link>
              <div className="mx-5 flex-1">
                <div className="font-medium">Customize your Online Store</div>
                <p className="text-sm font-medium text-gray-600">
                  {`Pick a theme and make it yours with your branding, logo and styles.`}
                </p>
                <Link href={`${ROUTES.BUILDER_STYLES}`}>
                  <button className="mt-4 flex items-center rounded-sm border border-blue-500 px-4 py-1 text-gray-500 hover:bg-blue-100">
                    <span className="pr-2 font-medium text-blue-500">
                      {`Customize theme`}
                    </span>
                  </button>
                </Link>
              </div>
            </div>
          </div>
          <div className="flex h-[185px] flex-1 border-b-0 border-t-[1px] border-gray-300 lg:h-[160px] lg:border-l-[1px]">
            {/* Complete store profile */}
            <div className="flex w-full items-center justify-center px-8 py-8 pt-4">
              <Link href={`${ROUTES.STORE_SETTINGS}`}>
                <div className="mx-5 mb-2 h-[50px] w-[50px] font-semibold text-[#333]">
                  <StoreInfoIconComponent />
                </div>
              </Link>
              <div className="mx-5 flex-1">
                <div className="font-medium">Complete your store profile</div>
                <p className="text-sm font-medium text-gray-600">
                  {`Stores with contact information get more sales.`}
                </p>
                <Link href={`${ROUTES.SETTINGS}`}>
                  <button className="mt-4 flex items-center rounded-sm border border-blue-500 px-4 py-1 text-gray-500 hover:bg-blue-100">
                    <span className="pr-2 font-medium text-blue-500">
                      {`Fill out profile`}
                    </span>
                  </button>
                </Link>
              </div>
            </div>
          </div>
          <div className="flex h-[185px] w-full flex-col items-center justify-center border-b-0 border-t-[1px] border-gray-300 px-8 py-8 pt-4 lg:border-l-[1px]">
            <h2 className="mb-2 font-semibold text-gray-800">
              First impression count.
            </h2>
            <p className="text-center text-sm font-medium text-gray-600">
              Share your first impression to help us improve the overall
              dropgala experience.
            </p>
            <Link href={ROUTES.DASHBOARD} target="_blank">
              <div className="mt-3 flex items-center rounded-sm border border-gray-300 px-4 py-1 text-gray-500">
                <span className="pr-2 font-medium text-gray-600">
                  Give feedback
                </span>
                <div className="mb-1">
                  <ExternalLinkIcon width={18} height={18} />
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

const GettingStartedSectionStep2 = () => {
  const { published, subscription } = useSettings();

  const [error, setError] = useState(null);
  const [disableRequest, setDisableRequest] = useState(false);

  const { userInfo } = useGetClient();

  const csrfToken = userInfo?.csrfToken;

  const [resendVerificationLink, { loading }] = useMutation(
    RESEND_VERIFICATION_LINK,
    {
      context: {
        headers: {
          'x-csrf-token': csrfToken
        }
      },
      onCompleted: (data: { resendVerificationLink: { success: boolean } }) => {
        if (data?.resendVerificationLink.success) {
          notify('Link has been sent to your email', 'success');
          setDisableRequest(true);
          setTimeout(
            () => {
              setDisableRequest(false);
            },
            60 * 10 * 1000
          );
        }
      }
    }
  );

  useErrorLogger(error);

  const handleResendLink = () => {
    if (disableRequest) {
      notify('Please wait for a moment...', 'info');
      return;
    }
    resendVerificationLink({ variables: {} }).catch((err) => {
      setError(err);
    });
  };

  const isSubscribed =
    !subscription?.cancel_at_period_end && subscription?.status === 'active';

  return (
    <div className="mb-8 w-full">
      {!published && (
        <h3 className="mb-4 flex flex-1 items-end text-xl text-gray-900">
          Get started guides
        </h3>
      )}
      {!isSubscribed && <div className="border border-gray-300">
        <div className="flex items-center justify-center p-8">
          <div className="mx-5">
            <Link href={`${ROUTES.BILLING}`}>
              <UpgradeIconComponent />
            </Link>
          </div>
          <div className="max-w-[500px]">
            <div className="text-lg font-semibold">
              Ready to upgrade your trial and activate your store?
            </div>
            <p className="mt-1 mb-5 font-normal text-gray-700">
              Find your perfect domain or use an existing one when you choose a
              plan for your store.
            </p>
            <Link href={`${ROUTES.BILLING}`}>
              <Button>
                <div className="flex items-center">
                  <div>
                    <UpgradeIcon width={25} height={25} />
                  </div>
                  <div className="font-medium">Upgrade your trial</div>
                </div>
              </Button>
            </Link>
          </div>
        </div>
      </div>}
      {!published && (
        <div
          className={classNames(
            'grid grid-cols-1 border border-t-0 border-gray-300 lg:grid-cols-2',
            isSubscribed && 'border-t'
          )}
        >
          <div className="flex h-[180px] flex-1 items-center justify-center border-b-0 border-t-0 border-gray-300 lg:h-[160px]">
            {/* Feedback verification section */}
            <div className="flex h-fit w-fit flex-col items-center justify-center px-8 lg:flex-row">
              <div className="mx-5 mb-2 h-[50px] w-[50px] font-semibold text-gray-700">
                <AlertIcon width={45} height={45} />
              </div>
              <div className="mx-5 flex flex-1 flex-col items-center justify-center lg:block">
                <div className="font-medium">Email verification</div>
                <p className=" text-sm font-medium text-gray-600">
                  {`Verify your email address to activate your online store.`}
                </p>
                <button
                  disabled={loading}
                  onClick={handleResendLink}
                  className="mt-3 flex items-center rounded-sm border border-blue-500 px-4 py-1 text-gray-500 hover:bg-blue-100"
                >
                  <span className="pr-2 font-medium text-blue-500">
                    {`Resend link`}
                  </span>
                  <div className="mb-1 text-blue-500">
                    <ResendEmail width={18} height={18} />
                  </div>
                </button>
              </div>
            </div>
          </div>
          <div className="flex w-full flex-col items-center justify-center border-t-[1px] border-b-0 border-gray-300 px-8 py-8 pt-4 lg:border-l-[1px] lg:border-t-0">
            <h2 className="mb-2 font-semibold text-gray-800">
              First impression count.
            </h2>
            <p className="text-center text-sm font-medium text-gray-600">
              Share your first impression to help us improve the overall
              dropgala experience.
            </p>
            <Link href={ROUTES.DASHBOARD} target="_blank">
              <div className="mt-3 flex items-center rounded-sm border border-gray-300 px-4 py-1 text-gray-500">
                <span className="pr-2 font-medium text-gray-600">
                  Give feedback
                </span>
                <div className="mb-1">
                  <ExternalLinkIcon width={18} height={18} />
                </div>
              </div>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export { GettingStartedSectionStep1,GettingStartedSectionStep2 };
