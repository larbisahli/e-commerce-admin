import AdminLineIcon from '@components/icons/admin-line';
import AnalyticsIcon from '@components/icons/analytics';
import CurrencyConvertIcon from '@components/icons/currency-convert';
import ExpressCheckoutIcon from '@components/icons/express-checkout';
import LanguagesIcon from '@components/icons/languages';
import PluginIcon from '@components/icons/plugin';
import PwaIcon from '@components/icons/pwa';
import ThemeIcon from '@components/icons/pwa copy';
import SheetsIcon from '@components/icons/sheets';
import ShipIcon from '@components/icons/ship';
import ThumbUpIcon from '@components/icons/thumb-up';
import UpSellIcon from '@components/icons/upsell';

const FeatureSection = () => {
  return (
    <section
      id="features"
      className="container mx-auto mt-0 w-full rounded p-4 lg:mt-32 lg:px-0"
    >
      <div className="flex flex-col items-center">
        <h2 className="slide-in-bottom-h1 my-5 text-center text-3xl font-bold leading-tight text-gray-800 md:text-left">
          Tools
        </h2>
        <p className="text-center">
          All the tools and features you need to succeed
        </p>
      </div>
      <div className="mt-8 grid grid-cols-1 gap-5 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        {/*  */}
        <div className="min-h-[280px] rounded-lg border bg-white shadow">
          <div className=" flex flex-col items-center justify-center p-4">
            <div className="py-3 text-gray-700">
              <ShipIcon />
            </div>
            <div className="pt-1 text-center font-medium">
              Pain-free COD Management
            </div>
            <div className="pt-5 text-center text-gray-700">
              <p>
                Manage your leads, order confirmations, and shippings, all in
                one place.
              </p>
            </div>
          </div>
        </div>
        {/*  */}
        <div className="min-h-[270px] rounded-lg border bg-white shadow">
          <div className=" flex flex-col items-center justify-center p-4">
            <div className="py-3 text-gray-700">
              <LanguagesIcon />
            </div>
            <div className="pt-1 text-center font-medium">
              Multilingual support
            </div>
            <div className="pt-5 text-center text-gray-700">
              <p>
                Translate your products and content into multiple languages to
                reach a global audience worldwide.
              </p>
            </div>
          </div>
        </div>
        {/*  */}
        <div className="min-h-[270px] rounded-lg border bg-white shadow">
          <div className=" flex flex-col items-center justify-center p-4">
            <div className="py-3 text-gray-800">
              <SheetsIcon />
            </div>
            <div className="pt-1 text-center font-medium">
              Google Sheet Integration
            </div>
            <div className="pt-5 text-center text-gray-700">
              <p>
                Keep track of everything with Google Sheet integration to
                accelerate your handling of business operations.
              </p>
            </div>
          </div>
        </div>
        {/*  */}
        <div className="min-h-[270px] rounded-lg border bg-white shadow">
          <div className=" flex flex-col items-center justify-center p-4">
            <div className="py-3 text-gray-500">
              <CurrencyConvertIcon />
            </div>
            <div className="pt-1 text-center font-medium">
              Multi-Currency Conversion
            </div>
            <div className="pt-5 text-center text-gray-700">
              <p>
                Enhance your customers’ experience with our automatic currency
                conversion that shows your price in the currency of your
                customers.
              </p>
            </div>
          </div>
        </div>
        {/*  */}
        <div className="min-h-[270px] rounded-lg border bg-white shadow">
          <div className=" flex flex-col items-center justify-center p-4">
            <div className="py-3 text-gray-800">
              <ExpressCheckoutIcon />
            </div>
            <div className="pt-1 text-center font-medium">
              Express Checkout Form
            </div>
            <div className="pt-5 text-center text-gray-700">
              <p>
                Eliminate extra steps and see your customers order directly from
                the same page.
              </p>
            </div>
          </div>
        </div>
        {/*  */}
        <div className="min-h-[270px] rounded-lg border bg-white shadow">
          <div className=" flex flex-col items-center justify-center p-4">
            <div className="py-3 text-gray-800">
              <PwaIcon />
            </div>
            <div className="pt-1 text-center font-medium">
              Progressive Web App Integration
            </div>
            <div className="pt-5 text-center text-gray-700">
              <p>
                Install your store directly, skip app stores. Enjoy a
                mobile-app-like experience with a user-friendly interface.
              </p>
            </div>
          </div>
        </div>
        {/*  */}
        <div className="min-h-[270px] rounded-lg border bg-white shadow">
          <div className=" flex flex-col items-center justify-center p-4">
            <div className="py-3 text-gray-800">
              <ThemeIcon />
            </div>
            <div className="pt-1 text-center font-medium">
              Multiple Storefront Themes
            </div>
            <div className="pt-5 text-center text-gray-700">
              <p>
                Select a theme for your store and tailor it to suit your
                business requirements with customizable options.
              </p>
            </div>
          </div>
        </div>
        {/*  */}
        <div className="min-h-[270px] rounded-lg border bg-white shadow">
          <div className=" flex flex-col items-center justify-center p-4">
            <div className="py-3 text-gray-700">
              <UpSellIcon />
            </div>
            <div className="pt-1 text-center font-medium">One Click UpSell</div>
            <div className="pt-5 text-center text-gray-700">
              <p>
                Up-sell and cross-sell with a single click to drive more revenue
                and enhance your customers’ shopping experience.
              </p>
            </div>
          </div>
        </div>
        {/*  */}
        <div className="min-h-[270px] rounded-lg border bg-white shadow">
          <div className=" flex flex-col items-center justify-center p-4">
            <div className="py-3 text-gray-700">
              <AnalyticsIcon />
            </div>
            <div className="pt-1 text-center font-medium">SEO Support</div>
            <div className="pt-5 text-center text-gray-700">
              <p>
                Boost your rankings and analyze your traffic with powerful tools
                to quickly scale your ecommerce business.
              </p>
            </div>
          </div>
        </div>
        {/*  */}
        <div className="min-h-[270px] rounded-lg border bg-white shadow">
          <div className=" flex flex-col items-center justify-center p-4">
            <div className="py-3 text-gray-700">
              <PluginIcon />
            </div>
            <div className="pt-1 text-center font-medium">
              Pixels Integration
            </div>
            <div className="pt-5 text-center text-gray-700">
              <p>
                Effortless pixel integration across all popular advertising
                platforms to attract more quality leads to your store.
              </p>
            </div>
          </div>
        </div>
        {/*  */}
        <div className="min-h-[270px] rounded-lg border bg-white shadow">
          <div className=" flex flex-col items-center justify-center p-4">
            <div className="py-3 text-gray-700">
              <ThumbUpIcon />
            </div>
            <div className="pt-1 text-center font-medium">Products Reviews</div>
            <div className="pt-5 text-center text-gray-700">
              <p>
                Showcase your happy customers’ reviews to increase your
                conversion by up to 50%.
              </p>
            </div>
          </div>
        </div>
        {/*  */}
        <div className="min-h-[270px] rounded-lg border bg-white shadow">
          <div className=" flex flex-col items-center justify-center p-4">
            <div className="py-3 text-gray-800">
              <AdminLineIcon />
            </div>
            <div className="pt-1 text-center font-medium">
              Multi-User Support
            </div>
            <div className="pt-5 text-center text-gray-700">
              <p>
                Expand your admin dashboard by effortlessly adding staff members
                and managing their roles and permissions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
