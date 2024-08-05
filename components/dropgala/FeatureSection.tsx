import AdminLineIcon from '@components/icons/admin-line';
import AnalyticsIcon from '@components/icons/analytics';
import AbandonedCartIcon from '@components/icons/cart';
import { CouponSvgIcon } from '@components/icons/coupon';
import { CouponIcon } from '@components/icons/coupon-icon';
import CurrencyConvertIcon from '@components/icons/currency-convert';
import { CustomerCheckout } from '@components/icons/custom-checkout';
import DataLockIcon from '@components/icons/data-lock';
import CustomDesignIcon from '@components/icons/design';
import ExpressCheckoutIcon from '@components/icons/express-checkout';
import GoogleAnalyticsIcon from '@components/icons/google-analytics';
import LanguagesIcon from '@components/icons/languages';
import MediaIcon from '@components/icons/media';
import PluginIcon from '@components/icons/plugin';
import PwaIcon from '@components/icons/pwa';
import SalesAnalyticsIcon from '@components/icons/sales-analytics';
import SheetsIcon from '@components/icons/sheets';
import ShipIcon from '@components/icons/ship';
import { DesignIcon } from '@components/icons/sidebar';
import ThemeIcon from '@components/icons/theme';
import ThumbUpIcon from '@components/icons/thumb-up';
import UpSellIcon from '@components/icons/upsell';

const FeatureSection = () => {
  return (
    <section
      id="features"
      className="container mx-auto mt-0 w-full rounded p-4 lg:mt-24 lg:px-0"
    >
      <div className="flex flex-col items-center">
        <h2 className="slide-in-bottom-h1 my-5 mb-2 text-center text-4xl font-bold leading-tight text-blue-600 md:text-left">
          Features
        </h2>
        <p className="text-center text-lg text-gray-600">
          All the tools and features you need to succeed
        </p>
      </div>
      <div className="mt-12 grid grid-cols-1 gap-5 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        {/*  */}
        <div className="min-h-[280px] rounded-lg border bg-white shadow">
          <div className=" flex flex-col items-center justify-center p-4">
            <div className="py-3 text-blue-600">
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
            <div className="py-3 text-blue-600">
              <LanguagesIcon width={45} height={45} />
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
            <div className="py-3 text-blue-600">
              <CustomerCheckout />
            </div>
            <div className="pt-1 text-center font-medium">
              Customize your checkout
            </div>
            <div className="pt-5 text-center text-gray-700">
              <p>
                Make it easier for your customers to complete the checkout.
                Customize the fields and request only the necessary information.
              </p>
            </div>
          </div>
        </div>
        {/*  */}
        <div className="min-h-[270px] rounded-lg border bg-white shadow">
          <div className=" flex flex-col items-center justify-center p-4">
            <div className="py-3 text-blue-600">
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
            <div className="py-3 text-blue-600">
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
            <div className="py-3 text-blue-600">
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
            <div className="py-3 text-blue-600">
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
            <div className="py-3 text-blue-600">
              <CustomDesignIcon />
            </div>
            <div className="pt-1 text-center font-medium">Store Builder</div>
            <div className="pt-5 text-center text-gray-700">
              <p>
                Build your own custom store with a no-code website builder to
                suit your business requirements with customizable options and
                advanced cms integration.
              </p>
            </div>
          </div>
        </div>
        {/*  */}
        {/* <div className="min-h-[270px] rounded-lg border bg-white shadow">
          <div className=" flex flex-col items-center justify-center p-4">
            <div className="py-3 text-blue-600">
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
        </div> */}
        {/*  */}
        <div className="min-h-[270px] rounded-lg border bg-white shadow">
          <div className=" flex flex-col items-center justify-center p-4">
            <div className="py-3 text-blue-600">
              <MediaIcon />
            </div>
            <div className="pt-1 text-center font-medium">Managing Media</div>
            <div className="pt-5 text-center text-gray-700">
              <p>
                Organize your product media by creating a folder hierarchy for
                professional picture management, allowing easy reuse across your
                store.
              </p>
            </div>
          </div>
        </div>
        {/*  */}
        {/* <div className="min-h-[270px] rounded-lg border bg-white shadow">
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
        </div> */}
        {/*  */}
        <div className="min-h-[270px] rounded-lg border bg-white shadow">
          <div className=" flex flex-col items-center justify-center p-4">
            <div className="py-3 text-blue-600">
              <CouponSvgIcon />
            </div>
            <div className="pt-1 text-center font-medium">
              Custom promo codes
            </div>
            <div className="pt-5 text-center text-gray-700">
              <p>
                Offer custom promo codes, giveaway links, and discounts to your
                customers
              </p>
            </div>
          </div>
        </div>
        {/*  */}
        <div className="min-h-[270px] rounded-lg border bg-white shadow">
          <div className=" flex flex-col items-center justify-center p-4">
            <div className="py-3 text-blue-600">
              <AbandonedCartIcon />
            </div>
            <div className="pt-1 text-center font-medium">Abandoned Carts</div>
            <div className="pt-5 text-center text-gray-700">
              <p>
                Recover lost sales by reaching out to customers who've abandoned
                their carts. Remind them what's in their cart and take them back
                to the checkout page.
              </p>
            </div>
          </div>
        </div>
        {/*  */}
        <div className="min-h-[270px] rounded-lg border bg-white shadow">
          <div className=" flex flex-col items-center justify-center p-4">
            <div className="py-3 text-blue-600">
              <SalesAnalyticsIcon />
            </div>
            <div className="pt-1 text-center font-medium">Sales analytics</div>
            <div className="pt-5 text-center text-gray-700">
              <p>
                Gain insights about your customers and the types of products
                that they love
              </p>
            </div>
          </div>
        </div>
        {/*  */}
        <div className="min-h-[270px] rounded-lg border bg-white shadow">
          <div className=" flex flex-col items-center justify-center p-4">
            <div className="py-3 text-blue-600">
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
            <div className="py-3 text-blue-600">
              <GoogleAnalyticsIcon />
            </div>
            <div className="pt-1 text-center font-medium">
              Integrate Advanced Google Analytics
            </div>
            <div className="pt-5 text-center text-gray-700">
              <p>
                By incorporating Google Analytics into your store, you can
                monitor visitor interactions, orders, checkout, products, and
                beyond.
              </p>
            </div>
          </div>
        </div>
        {/*  */}
        <div className="min-h-[270px] rounded-lg border bg-white shadow">
          <div className=" flex flex-col items-center justify-center p-4">
            <div className="py-3 text-blue-600">
              <DataLockIcon />
            </div>
            <div className="pt-1 text-center font-medium">
              Full ownership of data
            </div>
            <div className="pt-5 text-center text-gray-700">
              <p>
                We believe your customers and your data belongs to you, not the
                platform you're using
              </p>
            </div>
          </div>
        </div>
        {/*  */}
        <div className="min-h-[270px] rounded-lg border bg-white shadow">
          <div className=" flex flex-col items-center justify-center p-4">
            <div className="py-3 text-blue-600">
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
            <div className="py-3 text-blue-600">
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
            <div className="py-3 text-blue-600">
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
