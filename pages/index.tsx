import FaqSection from '@components/dropgala/FaqSection';
import FeatureSection from '@components/dropgala/FeatureSection';
import Footer from '@components/dropgala/Footer';
import HeroSection from '@components/dropgala/HeroSection';
import LatestBlogsCarousel from '@components/dropgala/LatestBlogsCarousel';
import Navigation from '@components/dropgala/Navigation';
import PricingSection from '@components/dropgala/PricingSection';
import { ArrowNext } from '@components/icons/arrow-next';
import CountryLanguage from '@ladjs/country-language';
import { getAllFilesFrontMatter } from '@lib/mdx';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

const MAX_DISPLAY = 4;

const HomePage = ({ posts }) => {
  console.log({ CountryLanguage, languages: CountryLanguage.getCountries() });

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
      <Navigation />

      {/* <!--Main--> */}
      <main className="pt-20">
        {/* HERO SECTION */}
        <HeroSection />

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

        {/* ------------------ Free section ------------------ */}
        <section className="container my-24 px-6 mx-auto flex flex-wrap flex-col-reverse md:flex-row items-center justify-between">
          {/* <!--Left Col--> */}
          <div className="w-full flex flex-col justify-center items-center overflow-y-hidden">
            <h2 className="my-4 text-xl md:text-3xl text-gray-800 font-bold leading-tight text-center slide-in-bottom-h1">
              Create your online store. It’s free.
            </h2>
            <p className="leading-normal max-w-[700px] text-gray-800 pb-8 text-lg text-center slide-in-bottom-subtitle">
              Get started today for free! Dropgala provides you with all the
              services, tools, support, and competitive advantages you need to
              launch your online business. Take your first steps towards
              achieving your dream project and start selling online with ease
              and confidence.
            </p>
            {/* <Link href="https://dropgala.com/signup">
             <a
                className="inline-block text-white bg-blue-600 no-underline rounded-full border-blue-300 text-lg font-medium hover:text-underline text-center py-3 px-8"
              >
                Sign up
              </a>
          </Link> */}
            <Link href="#subscription">
              <a className="inline-block text-white bg-blue-600 no-underline rounded-xl border-blue-300 text-lg font-medium hover:text-underline text-center py-3 px-8">
                Join Our Waitlist!
              </a>
            </Link>
          </div>
        </section>

        {/* ----------------- Features ------------------- */}
        <FeatureSection />

        {/* ----------------- Pricing ------------------- */}
        <PricingSection />

        {/* ----------------- Blog section ---------------------- */}
        {/* <section className="mt-22 container mx-auto">
          <LatestBlogsCarousel posts={posts} MAX_DISPLAY={MAX_DISPLAY} />
          {posts.length > MAX_DISPLAY && (
            <div className="flex mt-2 justify-end text-base font-medium leading-6">
              <Link href="/blog">
                <a className="text-blue-600 font-semibold hover:text-accent-hover">
                  <span>All Posts</span>
                  <span className="text-2xl">&rarr;</span>
                </a>
              </Link>
            </div>
          )}
        </section> */}

        {/* ------------- FAQ ----------------- */}
        <FaqSection />

        {/* ------------------ Join us section ------------------ */}
        <section className="container my-22 px-6 mx-auto flex flex-wrap flex-col-reverse md:flex-row items-center justify-between">
          {/* <!--Left Col--> */}
          <div className="w-full flex flex-col justify-center items-center overflow-y-hidden">
            <h2 className="my-4 text-xl md:text-3xl text-gray-800 font-bold leading-tight text-center slide-in-bottom-h1">
              Join us
            </h2>
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
