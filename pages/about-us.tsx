import Navigation from '@components/dropgala/Navigation';
import Head from 'next/head';
import Link from 'next/link';

const HomePage = () => {
  return (
    <div
      className="h-screen pb-14 bg-right bg-cover"
      // style={{ backgroundImage: "url('/bg.svg')" }}
    >
      <Head>
        <title>About us | Dropgala</title>
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
        {/* ------------------ About us section ------------------ */}
        <section className="container mt-22 mb-60  px-6 mx-auto flex flex-wrap flex-col-reverse md:flex-row items-center justify-between">
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
          </div>
        </section>
        {/* <!--Footer--> */}
        <div className="container mx-auto w-full mt-16 pt-8 pb-6 text-sm text-center md:text-left fade-in border-t border-dotted border-gray-300">
          <div className="flex justify-center items-center">
            <Link href="/about-us">
              <a className="text-gray-600 text-lg mx-3 hover:text-blue-500">
                About us
              </a>
            </Link>
            <Link href="/policy">
              <a className="text-gray-600 text-lg mx-3 hover:text-blue-500">
                Policy
              </a>
            </Link>
            <Link href="/support">
              <a className="text-gray-600 text-lg mx-3 hover:text-blue-500">
                Support
              </a>
            </Link>
            <Link href="/signup">
              <a className="text-gray-600 text-lg mx-3 hover:text-blue-500">
                Sign up
              </a>
            </Link>
            <Link href="/login">
              <a className="text-gray-600 text-lg mx-3 hover:text-blue-500">
                Login
              </a>
            </Link>
          </div>
          <div className="flex justify-center items-center mb-12 mt-4">
            <span className="text-xl font-bold text-gray-400">dropgala</span>
          </div>
          <p className="text-gray-500 no-underline hover:no-underline">
            &copy; Dropgala 2023 All rights reserved.
          </p>
        </div>
      </main>
    </div>
  );
};

export default HomePage;
