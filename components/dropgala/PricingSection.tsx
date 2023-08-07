import { CheckMark } from '@components/icons/checkmark';
import Link from 'next/link';

// https://www.dropship.io/pricing
const PricingSection = () => {
  return (
    <section
      id="pricing"
      className="p-5 sm:px-11 mt-32 container mx-auto rounded w-full"
    >
      <div className="flex flex-col items-center">
        <h2 className="my-5 text-3xl text-gray-800 font-bold leading-tight text-center md:text-left slide-in-bottom-h1">
          Pricing
        </h2>
        <p className="text-center">
          Offering the most competitive rates to entrepreneurs:
        </p>
      </div>
      <div className="w-full pt-8">
        <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2 xl:grid-cols-3 mx-auto w-fit">
          {/* STARTUP */}
          <div className="shadow h-[800px] mt-11 border-2 bg-white rounded-xl min-w-[300px] sm:w-[400px]">
            <div className="p-5">
              <div className="font-semibold text-2xl pt-1">Basic</div>
              <div className="pt-5">
                <span className="text-black font-bold text-5xl">FREE</span>
              </div>
              <div className="pt-5">
                <Link href="#subscription">
                  <a className="inline-block text-black hover:text-white hover:bg-gray-900 font-medium rounded-[10px] border-black border no-underline w-full hover:text-underline text-center py-2 px-8">
                    Get Started
                  </a>
                </Link>
              </div>
              <div className="pt-5 text-center text-gray-700 my-3">
                {/* ------------ */}
                <div className="flex items-center mt-3">
                  <div className="rounded-full flex items-center justify-center text-white bg-black w-5 h-5">
                    <CheckMark width={11} height={11} />
                  </div>
                  <span className="mx-2 text-gray-800 font-medium">
                    1 store
                  </span>
                </div>
                {/* ------------- */}
                <div className="flex items-center mt-3">
                  <div className="rounded-full flex items-center justify-center text-white bg-black w-5 h-5">
                    <CheckMark width={11} height={11} />
                  </div>
                  <span className="mx-2 text-gray-800 font-medium">1 user</span>
                </div>
                {/* ------------- */}
                <div className="flex items-center mt-3">
                  <div className="rounded-full flex items-center justify-center text-white bg-black w-5 h-5">
                    <CheckMark width={11} height={11} />
                  </div>
                  <span className="mx-2 text-gray-800 font-medium">
                    20 images upload
                  </span>
                </div>
              </div>
            </div>
          </div>
          {/* PREMIUM */}
          <div className="shadow h-[900px] border-2 bg-white rounded-xl border-gray-600 min-w-[300px] sm:w-[400px]">
            <div className="p-5">
              <div className="font-semibold text-3xl pt-1">Premium</div>
              <div className="pt-5">
                <span className="text-black font-bold text-5xl">$15</span>
                <span className="text-gray-500 ml-1">/month</span>
              </div>
              <div className="pt-5">
                <Link href="#subscription">
                  <a className="inline-block font-medium  text-white rounded-[10px] bg-black hover:bg-gray-900 no-underline w-full hover:text-underline text-center py-2 px-8">
                    Get Started
                  </a>
                </Link>
              </div>
              <div className="pt-5 text-center text-gray-700 my-3">
                {/* ------------ */}
                <div className="flex items-center mt-3">
                  <div className="rounded-full flex items-center justify-center text-white bg-black w-5 h-5">
                    <CheckMark width={11} height={11} />
                  </div>
                  <span className="mx-2 text-black font-semibold">
                    All Basic Features
                  </span>
                </div>
                {/* ------------- */}
                <div className="flex items-center mt-3">
                  <div className="rounded-full flex items-center justify-center text-white bg-black w-5 h-5">
                    <CheckMark width={11} height={11} />
                  </div>
                  <span className="mx-2 text-gray-800 font-medium">
                    Unlimited products
                  </span>
                </div>
                {/* ------------- */}
                <div className="flex items-center mt-3">
                  <div className="rounded-full flex items-center justify-center text-white bg-black w-5 h-5">
                    <CheckMark width={11} height={11} />
                  </div>
                  <span className="mx-2 text-gray-800 font-medium">
                    Unlimited images upload
                  </span>
                </div>
                {/* ------------- */}
                <div className="flex items-center mt-3">
                  <div className="rounded-full flex items-center justify-center text-white bg-black w-5 h-5">
                    <CheckMark width={11} height={11} />
                  </div>
                  <span className="mx-2 text-gray-800 font-medium">
                    Custom domain
                  </span>
                </div>
                {/* ------------- */}
                <div className="flex items-center mt-3">
                  <div className="rounded-full flex items-center justify-center text-white bg-black w-5 h-5">
                    <CheckMark width={11} height={11} />
                  </div>
                  <span className="mx-2 text-gray-800 font-medium">
                    5 users
                  </span>
                </div>
                {/* ------------- */}
                <div className="flex items-center mt-3">
                  <div className="rounded-full flex items-center justify-center text-white bg-black w-5 h-5">
                    <CheckMark width={11} height={11} />
                  </div>
                  <span className="mx-2 text-gray-800 font-medium">
                    5 Roles and permissions
                  </span>
                </div>
                {/* ------------- */}
                <div className="flex items-center mt-3">
                  <div className="rounded-full flex items-center justify-center text-white bg-black w-5 h-5">
                    <CheckMark width={11} height={11} />
                  </div>
                  <span className="mx-2 text-gray-800 font-medium">
                    9 Blog Posts
                  </span>
                </div>
                {/* ------------- */}
                <div className="flex items-center mt-3">
                  <div className="rounded-full flex items-center justify-center text-white bg-black w-5 h-5">
                    <CheckMark width={11} height={11} />
                  </div>
                  <span className="mx-2 text-gray-800 font-medium">
                    3 Roles and permissions
                  </span>
                </div>
                {/* ------------- */}
                <div className="flex items-center mt-3">
                  <div className="rounded-full flex items-center justify-center text-white bg-black w-5 h-5">
                    <CheckMark width={11} height={11} />
                  </div>
                  <span className="mx-2 text-gray-800 font-medium">
                    Unlimited monthly sales
                  </span>
                </div>
                {/* ------------- */}
                <div className="flex items-center mt-3">
                  <div className="rounded-full flex items-center justify-center text-white bg-black w-5 h-5">
                    <CheckMark width={11} height={11} />
                  </div>
                  <span className="mx-2 text-gray-800 font-medium">
                    Multicurrencies
                  </span>
                </div>
                {/* ------------- */}
                <div className="flex items-center mt-3">
                  <div className="rounded-full flex items-center justify-center text-white bg-black w-5 h-5">
                    <CheckMark width={11} height={11} />
                  </div>
                  <span className="mx-2 text-gray-800 font-medium">
                    Customer support 24/7
                  </span>
                </div>
                {/* ------------- */}
                <div className="flex items-center mt-3">
                  <div className="rounded-full flex items-center justify-center text-white bg-black w-5 h-5">
                    <CheckMark width={11} height={11} />
                  </div>
                  <span className="mx-2 text-gray-800 font-medium">
                    Google Sheets
                  </span>
                </div>
                {/* ------------- */}
                <div className="flex items-center mt-3">
                  <div className="rounded-full flex items-center justify-center text-white bg-black w-5 h-5">
                    <CheckMark width={11} height={11} />
                  </div>
                  <span className="mx-2 text-gray-800 font-medium">
                    Multiple templates
                  </span>
                </div>
                {/* ------------- */}
                <div className="flex items-center mt-3">
                  <div className="rounded-full flex items-center justify-center text-white bg-black w-5 h-5">
                    <CheckMark width={11} height={11} />
                  </div>
                  <span className="mx-2 text-gray-800 font-medium">
                    Multilanguages store
                  </span>
                </div>
                {/* ------------- */}
                <div className="flex items-center mt-3">
                  <div className="rounded-full flex items-center justify-center text-white bg-black w-5 h-5">
                    <CheckMark width={11} height={11} />
                  </div>
                  <span className="mx-2 text-gray-800 font-medium">
                    Multinational store
                  </span>
                </div>
                {/* ------------- */}
                <div className="flex items-center mt-3">
                  <div className="rounded-full flex items-center justify-center text-white bg-black w-5 h-5">
                    <CheckMark width={11} height={11} />
                  </div>
                  <span className="mx-2 text-gray-800 font-medium">
                    Unlimited customer reviews
                  </span>
                </div>
              </div>
            </div>
          </div>
          {/* BUSINESS */}
          <div className="shadow border-2 mt-11 h-[800px] bg-white rounded-xl  min-w-[300px] sm:w-[400px]">
            <div className="p-5">
              <div className="font-semibold text-3xl pt-1">Business</div>
              <div className="pt-5">
                <span className="text-black font-bold text-5xl">$50</span>
                <span className="text-gray-500 ml-1">/month</span>
              </div>
              <div className="pt-5">
                <Link href="#subscription">
                  <a className="inline-block text-black hover:text-white hover:bg-gray-900 font-medium rounded-[10px] border-black border no-underline w-full hover:text-underline text-center py-2 px-8">
                    Get Started
                  </a>
                </Link>
              </div>
              <div className="pt-5 text-center text-gray-700 my-3">
                {/* ------------ */}
                <div className="flex items-center mt-3">
                  <div className="rounded-full flex items-center justify-center text-white bg-black w-5 h-5">
                    <CheckMark width={11} height={11} />
                  </div>
                  <span className="mx-2 text-black font-semibold">
                    All Premium Features
                  </span>
                </div>
                {/* ------------- */}
                <div className="flex items-center mt-3">
                  <div className="rounded-full flex items-center justify-center text-white bg-black w-5 h-5">
                    <CheckMark width={11} height={11} />
                  </div>
                  <span className="mx-2 text-gray-800 font-medium">
                    Unlimited users
                  </span>
                </div>
                {/* ------------- */}
                <div className="flex items-center mt-3">
                  <div className="rounded-full flex items-center justify-center text-white bg-black w-5 h-5">
                    <CheckMark width={11} height={11} />
                  </div>
                  <span className="mx-2 text-gray-800 font-medium">
                    Unlimited Roles and permissions
                  </span>
                </div>
                {/* ------------- */}
                <div className="flex items-center mt-3">
                  <div className="rounded-full flex items-center justify-center text-white bg-black w-5 h-5">
                    <CheckMark width={11} height={11} />
                  </div>
                  <span className="mx-2 text-gray-800 font-medium">
                    VIP Support
                  </span>
                </div>
                {/* ------------- */}
                <div className="flex items-center mt-3">
                  <div className="rounded-full flex items-center justify-center text-white bg-black w-5 h-5">
                    <CheckMark width={11} height={11} />
                  </div>
                  <span className="mx-2 text-gray-800 font-medium">
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
