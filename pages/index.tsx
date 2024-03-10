import 'animate.css/animate.compat.css';

import FaqSection from '@components/dropgala/FaqSection';
import FeatureSection from '@components/dropgala/FeatureSection';
import Footer from '@components/dropgala/Footer';
import HeroSection from '@components/dropgala/HeroSection';
import LatestBlogsCarousel from '@components/dropgala/LatestBlogsCarousel';
import Navigation from '@components/dropgala/Navigation';
import PricingSection from '@components/dropgala/PricingSection';
import Subscribe from '@components/dropgala/Subscripe';
// import { ArrowNext } from '@components/icons/arrow-next';
import { getAllFilesFrontMatter } from '@lib/mdx';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

const MAX_DISPLAY = 4;

const HomePage = ({ posts }) => {
  return (
    <div className="h-screen pb-14">
      <Head>
        <title>Dropgala</title>
        <meta
          name="description"
          content="Dropgala is an online platform that provides accessible and user-friendly services for creating and managing online stores."
        />
        <link rel="canonical" href="https://dropgala.com" />
      </Head>
      {/* NAVIGATION */}
      <Navigation />
      <main className="pt-16 lg:pt-20">
        {/* HERO SECTION */}
        <HeroSection />
        <section className="container my-28 mx-auto flex flex-col-reverse flex-wrap items-center justify-between px-0 md:flex-row lg:px-4">
          {/* <!--Right Col--> */}
          <div className="w-fit max-w-[500px] overflow-y-hidden py-6 xl:w-3/5">
            <Image
              alt=""
              src="/store-setup.png"
              className="slide-in-bottom mx-auto lg:mr-0"
              width={530}
              height={300}
            />
          </div>
          {/* <!--Left Col--> */}
          <div className="flex w-full flex-col items-center justify-center overflow-y-hidden lg:items-start xl:w-2/5">
            <h2 className="slide-in-bottom-h1 my-4 text-center text-xl font-bold leading-tight text-gray-800 md:text-left md:text-3xl">
              Begin your Journey of Ecommerce Success
            </h2>
            <p className="slide-in-bottom-subtitle pb-8 text-center text-base leading-normal text-gray-700 md:text-left">
              DropGala gives you all the tools, features, and services you need
              to achieve your ecommerce success.
            </p>
            {/* <Link href={'#features'}>
              <div className="w-[115px] rounded border border-gray-300 px-3 py-2">
                Learn more
              </div>
            </Link> */}
            <Link href="#subscription">
              <div className="hover:text-underline inline-block rounded-sm border-blue-300 bg-blue-600 py-3 px-8 text-center text-lg font-medium text-white no-underline">
                Join Our Waitlist!
              </div>
            </Link>
          </div>
        </section>

        {/* ----------------- Features ------------------- */}

        <FeatureSection />

        {/* ----------------- Pricing ------------------- */}
        {/* <PricingSection /> */}

        {/* ----------------- Blog section ---------------------- */}
        <section className="container mx-auto mt-22">
          <LatestBlogsCarousel posts={posts} MAX_DISPLAY={MAX_DISPLAY} />
          <div className="mt-3 flex justify-end text-base font-medium leading-6">
            <Link href="/blog">
              <div className="flex items-center justify-center font-semibold text-blue-600 hover:text-blue-500">
                <span>All Posts</span>
                <span className="mx-1 text-lg">&rarr;</span>
              </div>
            </Link>
          </div>
        </section>
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

export async function getStaticProps() {
  const posts = await getAllFilesFrontMatter('blog');

  return { props: { posts } };
}

export default HomePage;
