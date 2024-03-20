import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import AlertIcon from '@components/icons/alert';
import ExternalLinkIcon from '@components/icons/external-link';
import ResendEmail from '@components/icons/resend-email';
import { ROUTES } from '@utils/routes';
import Link from 'next/link';

const GettingStartedSection = () => {
  return (
    <div className="mb-8 w-full">
      <div className="mb-2 flex flex-1 items-end text-lg font-medium">
        Getting started
      </div>
      <div className="mt-5 flex flex-col border border-r-0 border-gray-300 sm:flex-row">
        <div className="flex h-[150px] flex-1 border-r border-b border-gray-300 sm:border-b-0">
          {/* Feedback verification section */}
          <div className="flex w-full flex-col items-center justify-center px-8 py-8 pt-4">
            <div className="mb-2 font-semibold text-gray-800">
              <AlertIcon />
            </div>
            <p className="text-center text-sm font-medium text-gray-600">
              {`Verify your email address to activate your online store.`}
            </p>
            <button className="mt-3 flex items-center rounded-sm border border-gray-300 px-4 py-1 text-gray-500">
              <span className="pr-2 font-medium text-blue-500">
                {`Resend verification link`}
              </span>
              <div className="mb-1 text-blue-500">
                <ResendEmail width={18} height={18} />
              </div>
            </button>
          </div>
        </div>
        <div className="flex h-[150px] flex-1 border-r border-gray-300">
          {/* Feedback verification section */}
          <div className="flex w-full flex-col items-center justify-center px-8 py-8 pt-4">
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

export default GettingStartedSection;
