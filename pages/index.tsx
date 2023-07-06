import AnalyticsIcon from '@components/icons/analytics';
import { ArrowDown } from '@components/icons/arrow-down';
import { CheckMark } from '@components/icons/checkmark';
import CurrencyConvertIcon from '@components/icons/currency-convert';
import ExpressCheckoutIcon from '@components/icons/express-checkout';
import PluginIcon from '@components/icons/plugin';
import SheetsIcon from '@components/icons/sheets';
import ShipIcon from '@components/icons/ship';
import ThumbUpIcon from '@components/icons/thumb-up';
import UpSellIcon from '@components/icons/upsell';
import cn from 'classnames';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import MailchimpSubscribe from 'react-mailchimp-subscribe';

const HomePage = () => {
  useEffect(() => {
    const btn = document.getElementById('mailchimp');
    btn.childNodes[0].lastChild.textContent = 'Subscribe';
  }, []);

  const [show, setShow] = useState(false);
  const [openFAQ, setOpenFAQ] = useState(null);

  const controlNavbar = () => {
    console.log({ x: window.scrollY });
    if (typeof window !== 'undefined') {
      if (window.scrollY > 50) {
        setShow(true);
      } else {
        setShow(false);
      }
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', controlNavbar);

      // cleanup function
      return () => {
        window.removeEventListener('scroll', controlNavbar);
      };
    }
  }, []);

  const handleFaq = (num) => {
    setOpenFAQ((prev) => {
      if (prev) return null;
      return num;
    });
  };

  return (
    <div
      className="h-screen pb-14 bg-right bg-cover"
      // style={{ backgroundImage: "url('/bg.svg')" }}
    >
      <Head>
        <title>Dropgala</title>
        <meta
          name="description"
          content="Dropgala is an online platform that provides accessible and user-friendly services for creating and managing online stores."
        />
        <link rel="canonical" href="https://dropgala.com" />
      </Head>
      {/* NAVIGATION */}
      <nav
        className={cn('w-full px-6 py-3 fixed z-50 transition-all', {
          'bg-white shadow': show
        })}
      >
        <div className="w-full mx-auto container flex items-center justify-between">
          <div className="flex justify-between content-end w-full">
            <div className="flex items-center">
              <div className="leading-normal text-center text-blue-600 text-2xl font-bold">
                Dropgala
              </div>
              <Link href="#features">
                <a className="px-8 text-gray-800 md:block hidden">Features</a>
              </Link>
              <Link href="#pricing">
                <a className="text-gray-800 md:block hidden">Pricing</a>
              </Link>
            </div>
            <div className="flex font-medium justify-center items-center">
              {/* <Link href="https://dropgala.com/login">
                <a className="inline-block border text-gray-800 border-gray-300 mx-3 no-underline rounded-sm hover:text-underline text-center py-3 px-8">
                  Login
                </a>
              </Link>
              <Link href="https://dropgala.com/signup">
                <a className="inline-block text-white bg-blue-600 no-underline rounded-sm hover:text-underline text-center py-3 px-8">
                  Sign up
                </a>
              </Link> */}
              <Link href="#subscription">
                <a className="inline-block text-white bg-blue-600 no-underline rounded-full border-blue-300 font-medium hover:text-underline text-center py-2 px-5">
                  Join Our Waitlist!
                </a>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* <!--Main--> */}
      <main className="pt-20">
        {/* HERO SECTION */}
        <section id="subscription" className="bg-slate-100">
          <div className="container pt-12 md:pt-12 px-6 mx-auto flex flex-wrap flex-col md:flex-row items-center justify-between">
            {/* <!--Left Col--> */}
            <div className="flex flex-col w-full xl:w-2/5 justify-center lg:items-start overflow-y-hidden">
              <h1 className="my-4 text-center text-2xl md:text-4xl text-blue-500 font-bold leading-tight xl:text-left slide-in-bottom-h1">
                Start your online store and kickstart your e-commerce business
                today
              </h1>
              <p className="leading-normal text-gray-700 pb-8 text-base w-full text-center xl:text-left slide-in-bottom-subtitle">
                Be the first to know when our revolutionary new site goes live!
              </p>
              <div className="w-full flex justify-center">
                <MailchimpSubscribe
                  url={process.env.NEXT_PUBLIC_MAILCHIMP_URL}
                  render={({ subscribe, status, message }) => (
                    <div className="mailchimp" id="mailchimp">
                      <MailchimpSubscribe
                        url={process.env.NEXT_PUBLIC_MAILCHIMP_URL}
                        onSubmitted={(formData) => subscribe(formData)}
                      />
                      {status === 'sending' && (
                        <div style={{ color: 'blue' }}>sending...</div>
                      )}
                      {status === 'error' && (
                        <div
                          style={{ color: 'red' }}
                          dangerouslySetInnerHTML={{ __html: message }}
                        />
                      )}
                      {status === 'success' && (
                        <div style={{ color: 'green' }}>Subscribed !</div>
                      )}
                    </div>
                  )}
                />
              </div>
            </div>

            {/* <!--Right Col--> */}
            <div className="max-w-[800px] xl:w-3/5 py-6 overflow-y-hidden w-fit">
              {/* <img src=""/> */}
              <Image
                alt=""
                src="/scandi.webp"
                className="w-5/6 mx-auto lg:mr-0 slide-in-bottom"
                width={800}
                height={500}
              />
            </div>
          </div>
        </section>

        {/* ------------------ e-commerce tools section ------------------ */}
        <section className="container my-14 px-6 mx-auto flex flex-wrap flex-col-reverse md:flex-row items-center justify-between">
          {/* <!--Right Col--> */}
          <div className="max-w-[800px] mx-auto xl:w-3/5 py-6 overflow-y-hidden w-fit">
            {/* <img src=""/> */}
            <Image
              alt=""
              src="/store-setup.png"
              className="w-5/6 mx-auto lg:mr-0 slide-in-bottom"
              width={530}
              height={300}
            />
          </div>

          {/* <!--Left Col--> */}
          <div className="flex flex-col w-full xl:w-2/5 justify-center items-center lg:items-start overflow-y-hidden">
            <h2 className="my-4 text-xl md:text-3xl text-gray-800 font-bold leading-tight text-center md:text-left slide-in-bottom-h1">
              All the e-commerce tools you need in one place.
            </h2>
            <p className="leading-normal text-gray-700 pb-8 text-base text-center md:text-left slide-in-bottom-subtitle">
              Get all the design, fulfillment, payment, and analytics tools you
              need to manage your business seamlessly
            </p>
            <Link href={'#features'}>
              <a className="px-3 w-[115px] py-2 border border-gray-300 rounded">
                Learn more
              </a>
            </Link>
          </div>
        </section>

        {/* ------------------ Trial section ------------------ */}
        <section className="container my-22 px-6 mx-auto flex flex-wrap flex-col-reverse md:flex-row items-center justify-between">
          {/* <!--Left Col--> */}
          <div className="w-full flex flex-col justify-center items-center overflow-y-hidden">
            <h2 className="my-4 text-xl md:text-3xl text-gray-800 font-bold leading-tight text-center slide-in-bottom-h1">
              Get free 7 days trial
            </h2>
            <p className="leading-normal max-w-[700px] text-gray-800 pb-8 text-lg text-center slide-in-bottom-subtitle">
              Get started today with a free 7-day trial! Dropgala provides you
              with all the services, tools, support, and competitive advantages
              you need to launch your online business. Take your first steps
              towards achieving your dream project and start selling online with
              ease and confidence.
            </p>
            {/* <Link href="https://dropgala.com/signup">
             <a
                className="inline-block text-white bg-blue-600 no-underline rounded-full border-blue-300 text-lg font-medium hover:text-underline text-center py-3 px-8"
              >
                Create your store for free!
              </a>
          </Link> */}
            <Link href="#subscription">
              <a className="inline-block text-white bg-blue-600 no-underline rounded-full border-blue-300 text-lg font-medium hover:text-underline text-center py-3 px-8">
                Join Our Waitlist!
              </a>
            </Link>
          </div>
        </section>

        {/* ----------------- Features ------------------- */}
        <section
          id="features"
          className="p-5 px-11 mt-32 container mx-auto rounded w-full"
        >
          <div className="flex flex-col items-center">
            <h2 className="my-5 text-3xl text-gray-800 font-bold leading-tight text-center md:text-left slide-in-bottom-h1">
              Features
            </h2>
            <p>
              Tons of free tools, features, and services to set you up for
              success
            </p>
          </div>
          <div className="mt-8 grid grid-cols-1 gap-5 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
            {/*  */}
            <div className="shadow h-[280px] border bg-white rounded-lg">
              <div className=" flex justify-center items-center flex-col p-4">
                <div className="py-3 text-gray-700">
                  <ShipIcon />
                </div>
                <div className="font-medium pt-1">Seamless COD Management</div>
                <div className="pt-5 text-center text-gray-700">
                  <p>
                    Manage your Cash on Delivery orders in one place, from leads
                    management to order confirmation and shipping.
                  </p>
                </div>
              </div>
            </div>
            {/*  */}
            <div className="shadow h-[280px] border bg-white rounded-lg">
              <div className=" flex justify-center items-center flex-col p-4">
                <div className="py-3 text-gray-800">
                  <SheetsIcon />
                </div>
                <div className="font-medium pt-1">Google Sheet Integration</div>
                <div className="pt-5 text-center text-gray-700">
                  <p>
                    Supercharge your business operations with our seamless
                    Google Sheet integration for enhanced scalability and
                    accelerated processes.
                  </p>
                </div>
              </div>
            </div>
            {/*  */}
            <div className="shadow h-[280px] border bg-white rounded-lg">
              <div className=" flex justify-center items-center flex-col p-4">
                <div className="py-3 text-gray-500">
                  <CurrencyConvertIcon />
                </div>
                <div className="font-medium pt-1">Multi Currency Converter</div>
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
            <div className="shadow h-[280px] border bg-white rounded-lg">
              <div className=" flex justify-center items-center flex-col p-4">
                <div className="py-3 text-gray-800">
                  <ExpressCheckoutIcon />
                </div>
                <div className="font-medium pt-1">Express checkout form</div>
                <div className="pt-5 text-center text-gray-700">
                  <p>
                    Boost conversions with a streamlined shopping experience—let
                    visitors order products directly on the same page,
                    eliminating extra steps.
                  </p>
                </div>
              </div>
            </div>
            {/*  */}
            <div className="shadow h-[280px] border bg-white rounded-lg">
              <div className=" flex justify-center items-center flex-col p-4">
                <div className="py-3 text-gray-700">
                  <UpSellIcon />
                </div>
                <div className="font-medium pt-1">One Click UpSell</div>
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
            <div className="shadow h-[280px] border bg-white rounded-lg">
              <div className=" flex justify-center items-center flex-col p-4">
                <div className="py-3 text-gray-700">
                  <AnalyticsIcon />
                </div>
                <div className="font-medium pt-1">SEO Support</div>
                <div className="pt-5 text-center text-gray-700">
                  <p>
                    Boost your product page rankings in search results. Unlock
                    free access to powerful tools that drive organic traffic and
                    elevate your store's visibility.
                  </p>
                </div>
              </div>
            </div>
            {/*  */}
            <div className="shadow h-[270px] border bg-white rounded-lg">
              <div className=" flex justify-center items-center flex-col p-4">
                <div className="py-3 text-gray-700">
                  <PluginIcon />
                </div>
                <div className="font-medium pt-1">Pixels Integration</div>
                <div className="pt-5 text-center text-gray-700">
                  <p>
                    Attract high-quality leads to your store effortlessly with
                    our seamless pixel integration across popular advertising
                    platforms.
                  </p>
                </div>
              </div>
            </div>
            {/*  */}
            <div className="shadow h-[270px] border bg-white rounded-lg">
              <div className=" flex justify-center items-center flex-col p-4">
                <div className="py-3 text-gray-700">
                  <ThumbUpIcon />
                </div>
                <div className="font-medium pt-1">Products Reviews</div>
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

        {/* ----------------- Pricing ------------------- */}
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
                  <div className="font-semibold text-2xl pt-1">Startup</div>
                  <div className="pt-5">
                    <span className="text-black font-bold text-5xl">$10</span>
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
                      <span className="mx-2 text-gray-800 font-medium">
                        Online store
                      </span>
                    </div>
                    {/* ------------- */}
                    <div className="flex items-center mt-3">
                      <div className="rounded-full flex items-center justify-center text-white bg-black w-5 h-5">
                        <CheckMark width={11} height={11} />
                      </div>
                      <span className="mx-2 text-gray-800 font-medium">
                        100 products
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
                        1 User
                      </span>
                    </div>
                    {/* ------------- */}
                    <div className="flex items-center mt-3">
                      <div className="rounded-full flex items-center justify-center text-white bg-black w-5 h-5">
                        <CheckMark width={11} height={11} />
                      </div>
                      <span className="mx-2 text-gray-800 font-medium">
                        500 images upload
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
                        Unlimited customer Reviews
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
                  </div>
                </div>
              </div>
              {/* PRO */}
              <div className="shadow h-[900px] border-2 bg-white rounded-xl border-gray-600 min-w-[300px] sm:w-[400px]">
                <div className="p-5">
                  <div className="font-semibold text-3xl pt-1">Pro</div>
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
                        All Startup Features
                      </span>
                    </div>
                    {/* ------------- */}
                    <div className="flex items-center mt-3">
                      <div className="rounded-full flex items-center justify-center text-white bg-black w-5 h-5">
                        <CheckMark width={11} height={11} />
                      </div>
                      <span className="mx-2 text-gray-800 font-medium">
                        1000 products
                      </span>
                    </div>
                    {/* ------------- */}
                    <div className="flex items-center mt-3">
                      <div className="rounded-full flex items-center justify-center text-white bg-black w-5 h-5">
                        <CheckMark width={11} height={11} />
                      </div>
                      <span className="mx-2 text-gray-800 font-medium">
                        1000 images upload
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
                  </div>
                </div>
              </div>
              {/* BUSINESS */}
              <div className="shadow border-2 mt-11 h-[800px] bg-white rounded-xl  min-w-[300px] sm:w-[400px]">
                <div className="p-5">
                  <div className="font-semibold text-3xl pt-1">Business</div>
                  <div className="pt-5">
                    <span className="text-black font-bold text-5xl">$25</span>
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
                        All Professional Features
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

        {/* ------------- FAQ ----------------- */}
        <section className="p-5 sm:px-11 mt-32 container mx-auto flex flex-col rounded bg-gray-100 w-full">
          <div className="flex items-center justify-center flex-col my-7">
            <h2 className="text-2xl text-gray-800 font-bold leading-tight text-center md:text-left slide-in-bottom-h1">
              Frequently asked questions
            </h2>
            <p className="text-gray-600 self-center text-sm">
              Find answers to the most frequently asked questions
            </p>
          </div>
          {/* 1 */}
          <button
            className="bg-white shadow p-4 rounded my-3"
            onClick={() => handleFaq(1)}
          >
            <div className="flex items-center justify-between">
              <span className="text-gray-900 font-medium leading-tight text-center md:text-left slide-in-bottom-h1">
                Is there a trial period?
              </span>
              <ArrowDown width={20} height={20} />
            </div>
            <div
              className={cn('pt-5 text-gray-800 text-left hidden max-w-4xl', {
                '!block': openFAQ === 1
              })}
            >
              <p>
                You have a 14-day free trial period without adding card
                information.
              </p>
            </div>
          </button>
          {/* 2 */}
          <button
            className="bg-white shadow p-4 rounded my-3"
            onClick={() => handleFaq(2)}
          >
            <div className="flex items-center justify-between">
              <span className="text-gray-900 font-medium leading-tight text-center md:text-left slide-in-bottom-h1">
                Can I use Dropgala for dropshipping?
              </span>
              <ArrowDown width={20} height={20} />
            </div>
            <div
              className={cn('pt-5 text-gray-800 text-left hidden max-w-4xl', {
                '!block': openFAQ === 2
              })}
            >
              <p>
                Dropgala is fully equipped to support dropshipping, providing
                you with all the necessary tools for seamless integration. We
                encourage you to review our terms and conditions to ensure
                compliance with any specific restrictions regarding
                dropshipping.
              </p>
            </div>
          </button>
          {/* 3 */}
          <button
            className="bg-white shadow p-4 rounded my-3"
            onClick={() => handleFaq(3)}
          >
            <div className="flex items-center justify-between">
              <span className="text-gray-900 font-medium leading-tight text-center md:text-left slide-in-bottom-h1">
                I created my online store last week but have not received any
                orders yet. Why??
              </span>
              <ArrowDown width={20} height={20} />
            </div>
            <div
              className={cn('pt-5 text-gray-800 text-left hidden max-w-4xl', {
                '!block': openFAQ === 3
              })}
            >
              <p>
                {`Creating an online store is just the first step. You need to
                drive traffic to your store to receive orders. Share your
                store's link or QR code with your existing customers and on your
                social media to start receiving orders.`}
              </p>
            </div>
          </button>
          {/* 4 */}
          <button
            className="bg-white shadow p-4 rounded my-3"
            onClick={() => handleFaq(4)}
          >
            <div className="flex items-center justify-between">
              <span className="text-gray-900 font-medium leading-tight text-center md:text-left slide-in-bottom-h1">
                Is my store secure?
              </span>
              <ArrowDown width={20} height={20} />
            </div>
            <div
              className={cn('pt-5 text-gray-800 text-left hidden max-w-4xl', {
                '!block': openFAQ === 4
              })}
            >
              <p>
                Yes of course, Data protection is a priority for dropgala, we
                assure you a security and protection of all the data of your
                store
              </p>
            </div>
          </button>
          {/* 5 */}
          <button
            className="bg-white shadow p-4 rounded my-3"
            onClick={() => handleFaq(5)}
          >
            <div className="flex items-center justify-between">
              <span className="text-gray-900 font-medium leading-tight text-center md:text-left slide-in-bottom-h1">
                I have my own domain name, can I use it?
              </span>
              <ArrowDown width={20} height={20} />
            </div>
            <div
              className={cn('pt-5 text-gray-800 text-left hidden max-w-4xl', {
                '!block': openFAQ === 5
              })}
            >
              <p>
                Yes, you can link it to your store on dropgala by putting these
                DNS: ns1.dropgala.com , ns2.dropgala.com
              </p>
            </div>
          </button>
          {/* 6 */}
          <button
            className="bg-white shadow p-4 rounded my-3"
            onClick={() => handleFaq(6)}
          >
            <div className="flex items-center justify-between">
              <span className="text-gray-900 font-medium leading-tight text-center md:text-left slide-in-bottom-h1">
                Do you take sales charges?
              </span>
              <ArrowDown width={20} height={20} />
            </div>
            <div
              className={cn('pt-5 text-gray-800 text-left hidden max-w-4xl', {
                '!block': openFAQ === 6
              })}
            >
              <p>
                No, you only pay for your subscriptions we do not take any fees
                from sales.
              </p>
            </div>
          </button>
          {/* 7 */}
          <button
            className="bg-white shadow p-4 rounded my-3"
            onClick={() => handleFaq(7)}
          >
            <div className="flex items-center justify-between">
              <span className="text-gray-900 font-medium leading-tight text-center md:text-left slide-in-bottom-h1">
                Does Dropgala take care of storage and shipping of my products?
              </span>
              <ArrowDown width={20} height={20} />
            </div>
            <div
              className={cn('pt-5 text-gray-800 text-left hidden max-w-4xl', {
                '!block': openFAQ === 7
              })}
            >
              <p>We do not currently support storage and shipping</p>
            </div>
          </button>
        </section>

        {/* ------------------ About us section ------------------ */}
        <section className="container my-22 px-6 mx-auto flex flex-wrap flex-col-reverse md:flex-row items-center justify-between">
          {/* <!--Left Col--> */}
          <div className="w-full flex flex-col justify-center items-center overflow-y-hidden">
            <h2 className="my-4 text-xl md:text-3xl text-gray-800 font-bold leading-tight text-center slide-in-bottom-h1">
              About us
            </h2>
            <p className="leading-normal max-w-[1000px] text-gray-700 pb-8 text-base text-center slide-in-bottom-subtitle">
              Dropgala is an online platform that provides accessible and
              user-friendly services for creating and managing online stores.
              With a strong focus on merchant and entrepreneur needs, Dropgala
              offers a comprehensive range of services, including the creation
              of professional online stores, extensive support, and valuable
              business development resources. Their all-in-one solution empowers
              individuals of all backgrounds to effortlessly establish their
              online presence and succeed in the digital marketplace.
            </p>
            <p className="leading-normal text-gray-800 pb-4 text-center slide-in-bottom-subtitle max-w-5xl">
              {`Join us on this exciting journey and unlock the potential of your
            online business. Together, let's revolutionize the way we build and
            scale e-commerce stores!`}
            </p>
            {/* <Link href="https://dropgala.com/signup">
             <a
                className="inline-block text-white bg-blue-600 no-underline rounded-full border-blue-300 text-lg font-medium hover:text-underline text-center py-3 px-8"
              >
                Create your store for free!
              </a>
          </Link> */}
            <Link href="#subscription">
              <a className="inline-block text-white bg-blue-600 no-underline rounded-full border-blue-300 text-lg font-medium hover:text-underline text-center py-3 px-8">
                Join Our Waitlist!
              </a>
            </Link>
          </div>
        </section>
        {/* <!--Footer--> */}
        <div className="container mx-auto w-full mt-16 pt-8 pb-6 text-sm text-center md:text-left fade-in border-t border-dotted border-gray-300">
          <p className="italic m-3 text-gray-700 text-center">
            Create Your Dream Online Store Effortlessly with Dropgala!
          </p>
          <p className="text-gray-500 no-underline hover:no-underline">
            &copy; Dropgala 2023 All rights reserved.
          </p>
        </div>
      </main>
    </div>
  );
};

export default HomePage;
