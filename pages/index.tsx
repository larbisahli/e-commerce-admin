import FaqSection from '@components/dropgala/FaqSection';
import FeatureSection from '@components/dropgala/FeatureSection';
import Footer from '@components/dropgala/Footer';
import HeroSection from '@components/dropgala/HeroSection';
import LatestBlogsCarousel from '@components/dropgala/LatestBlogsCarousel';
import Navigation from '@components/dropgala/Navigation';
import PricingSection from '@components/dropgala/PricingSection';
import { ArrowNext } from '@components/icons/arrow-next';
import { getAllFilesFrontMatter } from '@lib/mdx';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

const MAX_DISPLAY = 4;

const HomePage = ({ posts }) => {
  return (
    <div
      className="h-screen bg-cover bg-right pb-14"
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
        <section className="container my-14 mx-auto flex flex-col-reverse flex-wrap items-center justify-between px-6 md:flex-row">
          {/* <!--Right Col--> */}
          <div className="mx-auto w-fit max-w-[800px] overflow-y-hidden py-6 xl:w-3/5">
            {/* <img src=""/> */}
            <Image
              alt=""
              src="/store-setup.png"
              className="slide-in-bottom mx-auto w-5/6 lg:mr-0"
              width={530}
              height={300}
            />
          </div>

          {/* <!--Left Col--> */}
          <div className="flex w-full flex-col items-center justify-center overflow-y-hidden lg:items-start xl:w-2/5">
            <h2 className="slide-in-bottom-h1 my-4 text-center text-xl font-bold leading-tight text-gray-800 md:text-left md:text-3xl">
              All the e-commerce tools you need in one place.
            </h2>
            <p className="slide-in-bottom-subtitle pb-8 text-center text-base leading-normal text-gray-700 md:text-left">
              Get all the design, fulfillment, payment, and analytics tools you
              need to manage your business seamlessly
            </p>
            <Link href={'#features'}>
              <a className="w-[115px] rounded border border-gray-300 px-3 py-2">
                Learn more
              </a>
            </Link>
          </div>
        </section>

        {/* ------------------ Free section ------------------ */}
        <section className="container my-24 mx-auto flex flex-col-reverse flex-wrap items-center justify-between px-6 md:flex-row">
          {/* <!--Left Col--> */}
          <div className="flex w-full flex-col items-center justify-center overflow-y-hidden">
            <h2 className="slide-in-bottom-h1 my-4 text-center text-xl font-bold leading-tight text-gray-800 md:text-3xl">
              Create your online store. It’s free.
            </h2>
            <p className="slide-in-bottom-subtitle max-w-[700px] pb-8 text-center text-lg leading-normal text-gray-800">
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
              <a className="hover:text-underline inline-block rounded-xl border-blue-300 bg-blue-600 py-3 px-8 text-center text-lg font-medium text-white no-underline">
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
        <section className="container my-22 mx-auto flex flex-col-reverse flex-wrap items-center justify-between px-6 md:flex-row">
          {/* <!--Left Col--> */}
          <div className="flex w-full flex-col items-center justify-center overflow-y-hidden">
            <h2 className="slide-in-bottom-h1 my-4 text-center text-xl font-bold leading-tight text-gray-800 md:text-3xl">
              Join us
            </h2>
            <p className="slide-in-bottom-subtitle max-w-5xl pb-4 text-center leading-normal text-gray-800">
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
              <a className="hover:text-underline inline-block rounded-full border-blue-300 bg-blue-600 py-3 px-8 text-center text-lg font-medium text-white no-underline">
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
