import { CheckMark } from '@components/icons/checkmark';
import Link from 'next/link';

// https://www.dropship.io/pricing
const PricingSection = () => {
  return (
    <section
      id="pricing"
      className="container mx-auto mt-22 w-full rounded p-5 sm:px-11"
    >
      <div className="flex flex-col items-center">
        <h2 className="slide-in-bottom-h1 mt-5 text-center text-5xl font-bold leading-tight text-gray-800 md:text-left">
          Pricing
        </h2>
        <p className="text-center">
          Offering the most competitive rates to entrepreneurs
        </p>
      </div>
      <div className="w-full pt-8">
        <div className="mt-8 flex w-full items-start justify-center">
          {/* PREMIUM */}
          <div className="bg-whites h-fit w-fit rounded-xl border shadow">
            <div className="p-5">
              <div className="pt-1 text-3xl font-semibold text-blue-600">
                Premium
              </div>
              <div className="text-gray-500">
                Everything you need to start a successful business!
              </div>
              <div className="flex items-end justify-between">
                <div className="flex-1 pt-5">
                  <div>
                    <span className="text-4xl font-bold text-black">$10</span>
                    <span className="ml-1 text-gray-500">USD</span>
                  </div>
                  <div className="text-sm font-medium text-gray-400">
                    per month
                  </div>
                </div>
                <div className="rounded border border-blue-300 bg-blue-50 px-3 py-[2px] text-sm font-medium text-blue-500 shadow">
                  <span>$100 / year</span>
                  <span className="mx-1 text-xs">(-16%)</span>
                </div>
              </div>

              <div className="my-3 grid grid-cols-1 gap-3 border-t pt-5 text-center text-gray-700 lg:grid-cols-3">
                {/* ------------- */}
                <div className="mt-3 flex items-center">
                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-500 text-white">
                    <CheckMark width={11} height={11} />
                  </div>
                  <span className="mx-2 font-medium text-gray-800">
                    Unlimited products
                  </span>
                </div>
                {/* ------------- */}
                <div className="mt-3 flex items-center">
                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-500 text-white">
                    <CheckMark width={11} height={11} />
                  </div>
                  <span className="mx-2 font-medium text-gray-800">
                    Analytics
                  </span>
                </div>
                {/* ------------- */}
                <div className="mt-3 flex items-center">
                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-500 text-white">
                    <CheckMark width={11} height={11} />
                  </div>
                  <span className="mx-2 font-medium text-gray-800">
                    Unlimited images upload
                  </span>
                </div>
                {/* ------------- */}
                <div className="mt-3 flex items-center">
                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-500 text-white">
                    <CheckMark width={11} height={11} />
                  </div>
                  <span className="mx-2 font-medium text-gray-800">
                    Order managements
                  </span>
                </div>
                {/* ------------- */}
                <div className="mt-3 flex items-center">
                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-500 text-white">
                    <CheckMark width={11} height={11} />
                  </div>
                  <span className="mx-2 font-medium text-gray-800">
                    Custom domain
                  </span>
                </div>
                {/* ------------- */}
                <div className="mt-3 flex items-center">
                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-500 text-white">
                    <CheckMark width={11} height={11} />
                  </div>
                  <span className="mx-2 font-medium text-gray-800">
                    Store Builder
                  </span>
                </div>
                {/* ------------- */}
                <div className="mt-3 flex items-center">
                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-500 text-white">
                    <CheckMark width={11} height={11} />
                  </div>
                  <span className="mx-2 font-medium text-gray-800">
                    Unlimited staff accounts
                  </span>
                </div>
                {/* ------------- */}
                <div className="mt-3 flex items-center">
                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-500 text-white">
                    <CheckMark width={11} height={11} />
                  </div>
                  <span className="mx-2 font-medium text-gray-800">
                    Unlimited Roles and permissions
                  </span>
                </div>
                {/* ------------- */}
                <div className="mt-3 flex items-center">
                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-500 text-white">
                    <CheckMark width={11} height={11} />
                  </div>
                  <span className="mx-2 font-medium text-gray-800">
                    Unlimited monthly sales
                  </span>
                </div>
                {/* ------------- */}
                <div className="mt-3 flex items-center">
                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-500 text-white">
                    <CheckMark width={11} height={11} />
                  </div>
                  <span className="mx-2 font-medium text-gray-800">
                    Multicurrencies
                  </span>
                </div>
                {/* ------------- */}
                <div className="mt-3 flex items-center">
                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-500 text-white">
                    <CheckMark width={11} height={11} />
                  </div>
                  <span className="mx-2 font-medium text-gray-800">
                    Customer support 24/7
                  </span>
                </div>
                {/* ------------- */}
                <div className="mt-3 flex items-center">
                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-500 text-white">
                    <CheckMark width={11} height={11} />
                  </div>
                  <span className="mx-2 font-medium text-gray-800">
                    Google Sheets
                  </span>
                </div>
                {/* ------------- */}
                <div className="mt-3 flex items-center">
                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-500 text-white">
                    <CheckMark width={11} height={11} />
                  </div>
                  <span className="mx-2 font-medium text-gray-800">
                    Multiple templates
                  </span>
                </div>
                {/* ------------- */}
                <div className="mt-3 flex items-center">
                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-500 text-white">
                    <CheckMark width={11} height={11} />
                  </div>
                  <span className="mx-2 font-medium text-gray-800">
                    Multilanguages store
                  </span>
                </div>
                {/* ------------- */}
                <div className="mt-3 flex items-center">
                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-500 text-white">
                    <CheckMark width={11} height={11} />
                  </div>
                  <span className="mx-2 font-medium text-gray-800">
                    Multinational store
                  </span>
                </div>
                {/* ------------- */}
                <div className="mt-3 flex items-center">
                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-500 text-white">
                    <CheckMark width={11} height={11} />
                  </div>
                  <span className="mx-2 font-medium text-gray-800">
                    Unlimited customer reviews
                  </span>
                </div>
                {/* ------------- */}
                <div className="mt-3 flex items-center">
                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-500 text-white">
                    <CheckMark width={11} height={11} />
                  </div>
                  <span className="mx-2 font-medium text-gray-800">
                    Payments
                  </span>
                </div>
                {/* ------------- */}
                <div className="mt-3 flex items-center">
                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-500 text-white">
                    <CheckMark width={11} height={11} />
                  </div>
                  <span className="mx-2 font-medium text-gray-800">
                    Advanced SEO
                  </span>
                </div>
              </div>
              {/* CTA */}
              <div>
                <div className="pt-5">
                  <Link href="#subscription">
                    <div className="hover:text-underline inline-block w-full cursor-pointer rounded-[4px] bg-[#1b91f2] py-2 px-8 text-center font-medium text-white no-underline hover:bg-[#38a4fc]">
                      Get started with 14 days trial
                    </div>
                  </Link>
                </div>
                <div className="w-full pt-2 text-center text-xs text-gray-500">
                  Cancel any time
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
