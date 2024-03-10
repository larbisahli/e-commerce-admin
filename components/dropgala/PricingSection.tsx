import { CheckMark } from '@components/icons/checkmark';
import Link from 'next/link';

// https://www.dropship.io/pricing
const PricingSection = () => {
  return (
    <section
      id="pricing"
      className="container mx-auto mt-32 w-full rounded p-5 sm:px-11"
    >
      <div className="flex flex-col items-center">
        <h2 className="slide-in-bottom-h1 my-5 text-center text-3xl font-bold leading-tight text-gray-800 md:text-left">
          Pricing
        </h2>
        <p className="text-center">
          Offering the most competitive rates to entrepreneurs:
        </p>
      </div>
      <div className="w-full pt-8">
        <div className="mx-auto mt-8 grid w-fit grid-cols-1 gap-8 lg:grid-cols-2 xl:grid-cols-3">
          {/* STARTUP */}
          <div className="mt-11 h-[800px] min-w-[300px] rounded-xl border-2 bg-white shadow sm:w-[400px]">
            <div className="p-5">
              <div className="pt-1 text-2xl font-semibold">Basic</div>
              <div className="pt-5">
                <span className="text-5xl font-bold text-black">FREE</span>
              </div>
              <div className="pt-5">
                <Link href="#subscription">
                  <div className="hover:text-underline inline-block w-full rounded-[10px] border border-black py-2 px-8 text-center font-medium text-black no-underline hover:bg-gray-900 hover:text-white">
                    Get Started
                  </div>
                </Link>
              </div>
              <div className="my-3 pt-5 text-center text-gray-700">
                {/* ------------ */}
                <div className="mt-3 flex items-center">
                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-black text-white">
                    <CheckMark width={11} height={11} />
                  </div>
                  <span className="mx-2 font-medium text-gray-800">
                    1 store
                  </span>
                </div>
                {/* ------------- */}
                <div className="mt-3 flex items-center">
                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-black text-white">
                    <CheckMark width={11} height={11} />
                  </div>
                  <span className="mx-2 font-medium text-gray-800">1 user</span>
                </div>
                {/* ------------- */}
                <div className="mt-3 flex items-center">
                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-black text-white">
                    <CheckMark width={11} height={11} />
                  </div>
                  <span className="mx-2 font-medium text-gray-800">
                    20 images upload
                  </span>
                </div>
              </div>
            </div>
          </div>
          {/* PREMIUM */}
          <div className="h-[900px] min-w-[300px] rounded-xl border-2 border-gray-600 bg-white shadow sm:w-[400px]">
            <div className="p-5">
              <div className="pt-1 text-3xl font-semibold">Premium</div>
              <div className="pt-5">
                <span className="text-5xl font-bold text-black">$15</span>
                <span className="ml-1 text-gray-500">/month</span>
              </div>
              <div className="pt-5">
                <Link href="#subscription">
                  <div className="hover:text-underline inline-block  w-full rounded-[10px] bg-black py-2 px-8 text-center font-medium text-white no-underline hover:bg-gray-900">
                    Get Started
                  </div>
                </Link>
              </div>
              <div className="my-3 pt-5 text-center text-gray-700">
                {/* ------------ */}
                <div className="mt-3 flex items-center">
                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-black text-white">
                    <CheckMark width={11} height={11} />
                  </div>
                  <span className="mx-2 font-semibold text-black">
                    All Basic Features
                  </span>
                </div>
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
                    5 users
                  </span>
                </div>
                {/* ------------- */}
                <div className="mt-3 flex items-center">
                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-black text-white">
                    <CheckMark width={11} height={11} />
                  </div>
                  <span className="mx-2 font-medium text-gray-800">
                    5 Roles and permissions
                  </span>
                </div>
                {/* ------------- */}
                <div className="mt-3 flex items-center">
                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-black text-white">
                    <CheckMark width={11} height={11} />
                  </div>
                  <span className="mx-2 font-medium text-gray-800">
                    9 Blog Posts
                  </span>
                </div>
                {/* ------------- */}
                <div className="mt-3 flex items-center">
                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-black text-white">
                    <CheckMark width={11} height={11} />
                  </div>
                  <span className="mx-2 font-medium text-gray-800">
                    3 Roles and permissions
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
          {/* BUSINESS */}
          <div className="mt-11 h-[800px] min-w-[300px] rounded-xl border-2 bg-white  shadow sm:w-[400px]">
            <div className="p-5">
              <div className="pt-1 text-3xl font-semibold">Business</div>
              <div className="pt-5">
                <span className="text-5xl font-bold text-black">$50</span>
                <span className="ml-1 text-gray-500">/month</span>
              </div>
              <div className="pt-5">
                <Link href="#subscription">
                  <div className="hover:text-underline inline-block w-full rounded-[10px] border border-black py-2 px-8 text-center font-medium text-black no-underline hover:bg-gray-900 hover:text-white">
                    Get Started
                  </div>
                </Link>
              </div>
              <div className="my-3 pt-5 text-center text-gray-700">
                {/* ------------ */}
                <div className="mt-3 flex items-center">
                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-black text-white">
                    <CheckMark width={11} height={11} />
                  </div>
                  <span className="mx-2 font-semibold text-black">
                    All Premium Features
                  </span>
                </div>
                {/* ------------- */}
                <div className="mt-3 flex items-center">
                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-black text-white">
                    <CheckMark width={11} height={11} />
                  </div>
                  <span className="mx-2 font-medium text-gray-800">
                    Unlimited users
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
                    VIP Support
                  </span>
                </div>
                {/* ------------- */}
                <div className="mt-3 flex items-center">
                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-black text-white">
                    <CheckMark width={11} height={11} />
                  </div>
                  <span className="mx-2 font-medium text-gray-800">
                    Unlimited Blog Posts
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
