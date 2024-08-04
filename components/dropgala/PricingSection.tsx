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
          <div className="h-[900px] w-[500px] rounded-xl border bg-white shadow">
            <div className="p-5">
              <div className="pt-1 text-3xl font-semibold">Premium</div>
              <div className="text-gray-500">For solo entrepreneurs</div>
              <div className="pt-5">
                <span className="text-5xl font-bold text-black">$15</span>
                <span className="ml-1 text-gray-500">/month</span>
              </div>
              <div className="pt-5">
                <Link href="#subscription">
                  <div className="hover:text-underline inline-block w-full cursor-pointer rounded-[10px] bg-black py-2 px-8 text-center font-medium text-white no-underline hover:bg-gray-900">
                    Get started with 7 days trial
                  </div>
                </Link>
              </div>
              <div className="w-full pt-1 text-center">Cancel any time</div>
              <div className="my-3 border-t pt-5 text-center text-gray-700">
                {/* ------------- */}
                <div className="mt-3 flex items-center">
                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-black text-white">
                    <CheckMark width={11} height={11} />
                  </div>
                  <span className="mx-2 font-medium text-gray-800">
                    Unlimited products
                  </span>
                </div>
                {/* ------------- */}
                <div className="mt-3 flex items-center">
                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-black text-white">
                    <CheckMark width={11} height={11} />
                  </div>
                  <span className="mx-2 font-medium text-gray-800">
                    Analytics
                  </span>
                </div>
                {/* ------------- */}
                <div className="mt-3 flex items-center">
                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-black text-white">
                    <CheckMark width={11} height={11} />
                  </div>
                  <span className="mx-2 font-medium text-gray-800">
                    Unlimited images upload
                  </span>
                </div>
                {/* ------------- */}
                <div className="mt-3 flex items-center">
                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-black text-white">
                    <CheckMark width={11} height={11} />
                  </div>
                  <span className="mx-2 font-medium text-gray-800">
                    Custom domain
                  </span>
                </div>
                {/* ------------- */}
                <div className="mt-3 flex items-center">
                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-black text-white">
                    <CheckMark width={11} height={11} />
                  </div>
                  <span className="mx-2 font-medium text-gray-800">
                    Store Builder
                  </span>
                </div>
                {/* ------------- */}
                <div className="mt-3 flex items-center">
                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-black text-white">
                    <CheckMark width={11} height={11} />
                  </div>
                  <span className="mx-2 font-medium text-gray-800">
                    Unlimited staff accounts
                  </span>
                </div>
                {/* ------------- */}
                <div className="mt-3 flex items-center">
                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-black text-white">
                    <CheckMark width={11} height={11} />
                  </div>
                  <span className="mx-2 font-medium text-gray-800">
                    Unlimited Roles and permissions
                  </span>
                </div>
                {/* ------------- */}
                <div className="mt-3 flex items-center">
                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-black text-white">
                    <CheckMark width={11} height={11} />
                  </div>
                  <span className="mx-2 font-medium text-gray-800">
                    Unlimited monthly sales
                  </span>
                </div>
                {/* ------------- */}
                <div className="mt-3 flex items-center">
                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-black text-white">
                    <CheckMark width={11} height={11} />
                  </div>
                  <span className="mx-2 font-medium text-gray-800">
                    Multicurrencies
                  </span>
                </div>
                {/* ------------- */}
                <div className="mt-3 flex items-center">
                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-black text-white">
                    <CheckMark width={11} height={11} />
                  </div>
                  <span className="mx-2 font-medium text-gray-800">
                    Customer support 24/7
                  </span>
                </div>
                {/* ------------- */}
                <div className="mt-3 flex items-center">
                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-black text-white">
                    <CheckMark width={11} height={11} />
                  </div>
                  <span className="mx-2 font-medium text-gray-800">
                    Google Sheets
                  </span>
                </div>
                {/* ------------- */}
                <div className="mt-3 flex items-center">
                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-black text-white">
                    <CheckMark width={11} height={11} />
                  </div>
                  <span className="mx-2 font-medium text-gray-800">
                    Multiple templates
                  </span>
                </div>
                {/* ------------- */}
                <div className="mt-3 flex items-center">
                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-black text-white">
                    <CheckMark width={11} height={11} />
                  </div>
                  <span className="mx-2 font-medium text-gray-800">
                    Multilanguages store
                  </span>
                </div>
                {/* ------------- */}
                <div className="mt-3 flex items-center">
                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-black text-white">
                    <CheckMark width={11} height={11} />
                  </div>
                  <span className="mx-2 font-medium text-gray-800">
                    Multinational store
                  </span>
                </div>
                {/* ------------- */}
                <div className="mt-3 flex items-center">
                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-black text-white">
                    <CheckMark width={11} height={11} />
                  </div>
                  <span className="mx-2 font-medium text-gray-800">
                    Unlimited customer reviews
                  </span>
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
