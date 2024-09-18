import 'animate.css/animate.compat.css';

import FaqSection from '@components/dropgala/FaqSection';
import FeatureSection from '@components/dropgala/FeatureSection';
import Footer from '@components/dropgala/Footer';
import HeroSection from '@components/dropgala/HeroSection';
import HowItWorksSection from '@components/dropgala/HowItworksSection';
import LatestBlogsCarousel from '@components/dropgala/LatestBlogsCarousel';
import Navigation from '@components/dropgala/Navigation';
import PricingSection from '@components/dropgala/PricingSection';
import Subscribe from '@components/dropgala/Subscripe';
// import { ArrowNext } from '@components/icons/arrow-next';
import { getAllFilesFrontMatter } from '@lib/mdx';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const MAX_DISPLAY = 4;

const HomePage = ({ posts }) => {
  return (
    <div className="h-screen pb-14">
      <Head>
        <title>Dropgala</title>
        <meta
          name="description"
          content="Dropgala is an all-in-one e-commerce platform designed to meet the needs of merchants and entrepreneurs."
        />
        <link rel="canonical" href="https://www.dropgala.com" />
        <meta name="twitter:image" content="/image/logo-color.png" />
        <meta
          property="og:image"
          content="https://dropgala.com/image/logo-color.png"
        />
        <meta
          property="og:image:secure_url"
          content="https://dropgala.com/image/logo-color.png"
        />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:width" content="400" />
        <meta property="og:image:height" content="300" />
        <meta
          property="og:image:alt"
          content="Dropgala is an all-in-one e-commerce platform designed to meet the needs of merchants and entrepreneurs."
        />
      </Head>
      {/* NAVIGATION */}
      <Navigation />
      <main className="pt-16 lg:pt-20">
        {/* HERO SECTION */}
        <HeroSection />
        <HowItWorksSection />
        <section className="container my-20 mx-auto px-1 md:flex-row lg:px-4">
          <h2 className="text-center text-4xl font-semibold">
            The all-in-one homebase for your brand
          </h2>
          <p className="text-md mt-3 text-center">
            Create a fully-custom shop for your brand to deliver exceptional
            quality for your community
          </p>
          <div className="container my-16 mx-auto flex flex-col-reverse flex-wrap justify-between px-0 md:flex-row lg:px-4">
            {/* <!--Right Col--> */}
            <div className="flex w-full flex-col items-center justify-center overflow-y-hidden lg:items-start xl:w-1/2">
              <h2 className="slide-in-bottom-h1 my-4 text-center text-xl font-bold leading-tight text-gray-800 md:text-left md:text-3xl">
                Custom Store Builder
              </h2>
              <p className="slide-in-bottom-subtitle pb-8 text-center text-base leading-normal text-gray-700 md:text-left">
                Dropgala gives you full control of your online store with a
                no-code custom website builder. launch a beautiful shop that is
                as unique as you are.
              </p>
            </div>
            {/* <!--Left Col--> */}
            <div className="w-fit max-w-[600px] overflow-y-hidden py-6 xl:w-1/2">
              <Image
                alt="store-site"
                src="/store-builder.png"
                className="slide-in-bottom mx-auto rounded-md border shadow lg:mr-0"
                width={600}
                height={300}
              />
            </div>
          </div>
        </section>
        <section className="container my-16 mx-auto flex flex-col-reverse flex-wrap items-start justify-between px-1 md:flex-row lg:px-4">
          {/* <!--Right Col--> */}
          <div className="w-fit max-w-[600px] overflow-y-hidden py-6 xl:w-1/2">
            <Image
              alt="store-site"
              src="/landing.webp"
              className="slide-in-bottom mx-auto lg:mr-0"
              width={600}
              height={300}
            />
          </div>
          {/* <!--Left Col--> */}
          <div className="flex w-full flex-col items-center justify-center overflow-y-hidden lg:items-start xl:w-1/2">
            <h2 className="slide-in-bottom-h1 my-4 text-center text-xl font-bold leading-tight text-gray-800 md:text-left md:text-3xl">
              Launch your online store on a platform you can trust!
            </h2>
            <div className="slide-in-bottom-subtitle w-full pb-8 text-center text-base leading-normal text-gray-700 xl:text-left">
              <p className="w-fit py-2 xl:w-full">
                <span className="font-semibold ">Secure</span>. Your data
                belongs to you and no one else. We don't use, sell or share your
                data with anyone. Dropgala takes many steps to protect your data
                from others so you can stay on top.
              </p>
              <p className="w-fit py-2 xl:w-full">
                <span className="font-semibold">Fast and Reliable</span>. No one
                wants to pay real money only to discover that their website is
                slow or has been down for hours! Dropgala’s technical team works
                24/7 to guarantee your website remains fast and live no matter
                the technical issue or size of traffic.
              </p>
              <p className="w-fit py-2 xl:w-full">
                <span className="font-semibold">
                  Everything you need at your fingertips
                </span>
                . Dropgala provides you with all the tools, features, and
                services you need to grow and scale your ecommerce business.
              </p>
            </div>
            <Link href={'#features'}>
              <div className="w-[115px] rounded border border-gray-300 px-3 py-2">
                Learn more
              </div>
            </Link>
          </div>
        </section>
        {/* ----------------- Features ------------------- */}
        <FeatureSection />
        {/* ----------------- Blog section ---------------------- */}
        <section className="container mx-auto mt-16 px-1">
          <LatestBlogsCarousel posts={posts} MAX_DISPLAY={MAX_DISPLAY} />
          <div className="mt-4 flex justify-center text-base font-medium leading-6 sm:justify-end">
            <Link href="/blog">
              <div className="flex items-center justify-center font-semibold text-blue-600 hover:text-blue-500">
                <span>All Posts</span>
                <span className="mx-1 text-lg">&rarr;</span>
              </div>
            </Link>
          </div>
        </section>
        {/* ----------------- Pricing ------------------- */}
        <PricingSection />
        {/* ------------- FAQ ----------------- */}
        <FaqSection />
        {/* ------------------ Join us section ------------------ */}
        <Subscribe />
        {/* ------------- Footer ---------------- */}
        <Footer />
      </main>
    </div>
  );
};

export async function getStaticProps({ locale }) {
  const posts = await getAllFilesFrontMatter('blog');

  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
      posts
    }
  };
}

export default HomePage;
