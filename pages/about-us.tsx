import cn from 'classnames';
import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const HomePage = () => {
  const [show, setShow] = useState(false);

  const controlNavbar = () => {
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
      <nav
        className={cn('w-full px-6 py-3 fixed z-50 transition-all', {
          'bg-white shadow': show
        })}
      >
        <div className="w-full mx-auto container flex items-center justify-between">
          <div className="flex justify-between content-end w-full">
            <div className="flex items-center">
              <Link href="/">
                <a className="leading-normal text-center text-blue-600 text-2xl font-bold">
                  Dropgala
                </a>
              </Link>
              <Link href="/#features">
                <a className="px-8 text-gray-800 md:block hidden">Features</a>
              </Link>
              <Link href="/#pricing">
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
