import AnalyticsIcon from '@components/icons/analytics';
import CurrencyConvertIcon from '@components/icons/currency-convert';
import ExpressCheckoutIcon from '@components/icons/express-checkout';
import PluginIcon from '@components/icons/plugin';
import SheetsIcon from '@components/icons/sheets';
import ShipIcon from '@components/icons/ship';
import ThumbUpIcon from '@components/icons/thumb-up';
import UpSellIcon from '@components/icons/upsell';

const FeatureSection = () => {
  return (
    <section
      id="features"
      className="container mx-auto mt-32 w-full rounded p-5 px-11"
    >
      <div className="flex flex-col items-center">
        <h2 className="slide-in-bottom-h1 my-5 text-center text-3xl font-bold leading-tight text-gray-800 md:text-left">
          Features
        </h2>
        <p>
          Tons of free tools, features, and services to set you up for success
        </p>
      </div>
      <div className="mt-8 grid grid-cols-1 gap-5 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        {/*  */}
        <div className="h-[280px] rounded-lg border bg-white shadow">
          <div className=" flex flex-col items-center justify-center p-4">
            <div className="py-3 text-gray-700">
              <ShipIcon />
            </div>
            <div className="pt-1 font-medium">Seamless COD Management</div>
            <div className="pt-5 text-center text-gray-700">
              <p>
                Manage your Cash on Delivery orders in one place, from leads
                management to order confirmation and shipping.
              </p>
            </div>
          </div>
        </div>
        {/*  */}
        <div className="h-[280px] rounded-lg border bg-white shadow">
          <div className=" flex flex-col items-center justify-center p-4">
            <div className="py-3 text-gray-800">
              <SheetsIcon />
            </div>
            <div className="pt-1 font-medium">Google Sheet Integration</div>
            <div className="pt-5 text-center text-gray-700">
              <p>
                Supercharge your business operations with our seamless Google
                Sheet integration for enhanced scalability and accelerated
                processes.
              </p>
            </div>
          </div>
        </div>
        {/*  */}
        <div className="h-[280px] rounded-lg border bg-white shadow">
          <div className=" flex flex-col items-center justify-center p-4">
            <div className="py-3 text-gray-500">
              <CurrencyConvertIcon />
            </div>
            <div className="pt-1 font-medium">Multi Currency Converter</div>
            <div className="pt-5 text-center text-gray-700">
              <p>
                Offer seamless customer experiences with automatic currency
                conversion based on their location. Customize your store's
                currency to cater to each customer effortlessly.
              </p>
            </div>
          </div>
        </div>
        {/*  */}
        <div className="h-[280px] rounded-lg border bg-white shadow">
          <div className=" flex flex-col items-center justify-center p-4">
            <div className="py-3 text-gray-800">
              <ExpressCheckoutIcon />
            </div>
            <div className="pt-1 font-medium">Express checkout form</div>
            <div className="pt-5 text-center text-gray-700">
              <p>
                Boost conversions with a streamlined shopping experience—let
                visitors order products directly on the same page, eliminating
                extra steps.
              </p>
            </div>
          </div>
        </div>
        {/*  */}
        <div className="h-[280px] rounded-lg border bg-white shadow">
          <div className=" flex flex-col items-center justify-center p-4">
            <div className="py-3 text-gray-700">
              <UpSellIcon />
            </div>
            <div className="pt-1 font-medium">One Click UpSell</div>
            <div className="pt-5 text-center text-gray-700">
              <p>
                Effortlessly increase sales with post-purchase upsell,
                cross-sell, and related products. Delight customers with
                attractive offers, driving additional revenue and enhancing
                their shopping experience.
              </p>
            </div>
          </div>
        </div>
        {/*  */}
        <div className="h-[280px] rounded-lg border bg-white shadow">
          <div className=" flex flex-col items-center justify-center p-4">
            <div className="py-3 text-gray-700">
              <AnalyticsIcon />
            </div>
            <div className="pt-1 font-medium">SEO Support</div>
            <div className="pt-5 text-center text-gray-700">
              <p>
                Boost your product page rankings in search results. Unlock free
                access to powerful tools that drive organic traffic and elevate
                your store's visibility.
              </p>
            </div>
          </div>
        </div>
        {/*  */}
        <div className="h-[270px] rounded-lg border bg-white shadow">
          <div className=" flex flex-col items-center justify-center p-4">
            <div className="py-3 text-gray-700">
              <PluginIcon />
            </div>
            <div className="pt-1 font-medium">Pixels Integration</div>
            <div className="pt-5 text-center text-gray-700">
              <p>
                Attract high-quality leads to your store effortlessly with our
                seamless pixel integration across popular advertising platforms.
              </p>
            </div>
          </div>
        </div>
        {/*  */}
        <div className="h-[270px] rounded-lg border bg-white shadow">
          <div className=" flex flex-col items-center justify-center p-4">
            <div className="py-3 text-gray-700">
              <ThumbUpIcon />
            </div>
            <div className="pt-1 font-medium">Products Reviews</div>
            <div className="pt-5 text-center text-gray-700">
              <p>
                {`Increase your store's conversion by up to 50% by adding real
              reviews from your happy past customers.`}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
