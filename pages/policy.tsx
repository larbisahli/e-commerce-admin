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
        <title>Policy | Dropgala</title>
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
        <section className="max-w-2xl container mt-22 mb-60  px-6 mx-auto flex flex-wrap flex-col-reverse md:flex-row items-center justify-between">
          {/* <!--Left Col--> */}
          <div className="w-full overflow-y-hidden">
            <h2 className="my-4 text-xl  md:text-3xl text-gray-800 font-bold leading-tight slide-in-bottom-h1">
              Privacy Policy
            </h2>
            <p className="leading-normal max-w-[1000px] text-gray-800 pb-8 text-base slide-in-bottom-subtitle">
              This Data Protection Notice (“Notice”) sets out the basis which
              Dropgala Pte Ltd (“we”, “us”, or “our”) may collect, use, disclose
              or otherwise process personal data of our customers in accordance
              with the Personal Data Protection Act (“PDPA”). This Notice
              applies to personal data in our possession or under our control,
              including personal data in the possession of organisations which
              we have engaged to collect, use, disclose or process personal data
              for our purposes.
            </p>
          </div>
          <div className="w-full overflow-y-hidden">
            <h2 className="my-4 text-xl  md:text-3xl text-gray-800 font-bold leading-tight slide-in-bottom-h1">
              PERSONAL DATA
            </h2>
            <ul>
              <ol className="leading-normal max-w-[1000px] text-gray-800 pb-8 text-base slide-in-bottom-subtitle">
                1. As used in this Notice: “customer” means an individual who
                (a) has contacted us through any means to find out more about
                any goods or services we provide, or (b) may, or has, entered
                into a contract with us for the supply of any goods or services
                by us; and “personal data” means data, whether true or not,
                about a customer who can be identified: (a) from that data; or
                (b) from that data and other information to which we have or are
                likely to have access.
              </ol>
              <ol className="leading-normal max-w-[1000px] text-gray-800 pb-8 text-base slide-in-bottom-subtitle">
                2. Depending on the nature of your interaction with us, some
                examples of personal data which we may collect from you include
                name, residential address, email address, telephone number and
                financial information.
              </ol>
              <ol className="leading-normal max-w-[1000px] text-gray-800 pb-8 text-base slide-in-bottom-subtitle">
                3. Other terms used in this Notice shall have the meanings given
                to them in the PDPA (where the context so permits).
              </ol>
            </ul>
          </div>
          <div className="w-full overflow-y-hidden">
            <h2 className="my-4 text-xl  md:text-3xl text-gray-800 font-bold leading-tight slide-in-bottom-h1">
              COLLECTION, USE AND DISCLOSURE OF PERSONAL DATA
            </h2>
            <ul>
              <ol className="leading-normal max-w-[1000px] text-gray-800 pb-8 text-base slide-in-bottom-subtitle">
                4. We generally do not collect your personal data unless (a) it
                is provided to us voluntarily by you directly or via a third
                party who has been duly authorised by you to disclose your
                personal data to us (your “authorised representative”) after (i)
                you (or your authorised representative) have been notified of
                the purposes for which the data is collected, and (ii) you (or
                your authorised representative) have provided written consent to
                the collection and usage of your personal data for those
                purposes, or (b) collection and use of personal data without
                consent is permitted or required by the PDPA or other laws. We
                shall seek your consent before collecting any additional
                personal data and before using your personal data for a purpose
                which has not been notified to you (except where permitted or
                authorised by law).
              </ol>
              <ol className="leading-normal max-w-[1000px] text-gray-800 pb-8 text-base slide-in-bottom-subtitle">
                5. We may collect and use your personal data for any or all of
                the following purposes: (a) performing obligations in the course
                of or in connection with our provision of the goods and/or
                services requested by you;
              </ol>
              <ol className="leading-normal max-w-[1000px] text-gray-800 pb-8 text-base slide-in-bottom-subtitle">
                (b) verifying your identity;
              </ol>
              <ol className="leading-normal max-w-[1000px] text-gray-800 pb-8 text-base slide-in-bottom-subtitle">
                (c) responding to, handling, and processing queries, requests,
                applications, complaints, and feedback from you;
              </ol>
              <ol className="leading-normal max-w-[1000px] text-gray-800 pb-8 text-base slide-in-bottom-subtitle">
                (d) managing your relationship with us;
              </ol>
              <ol className="leading-normal max-w-[1000px] text-gray-800 pb-8 text-base slide-in-bottom-subtitle">
                (e) processing payment or credit transactions;
              </ol>
              <ol className="leading-normal max-w-[1000px] text-gray-800 pb-8 text-base slide-in-bottom-subtitle">
                (f) complying with any applicable laws, regulations, codes of
                practice, guidelines, or rules, or to assist in law enforcement
                and investigations conducted by any governmental and/or
                regulatory authority;
              </ol>
              <ol className="leading-normal max-w-[1000px] text-gray-800 pb-8 text-base slide-in-bottom-subtitle">
                (g) any other purposes for which you have provided the
                information;
              </ol>
              <ol className="leading-normal max-w-[1000px] text-gray-800 pb-8 text-base slide-in-bottom-subtitle">
                (h) transmitting to any unaffiliated third parties including our
                third party service providers and agents, and relevant
                governmental and/or regulatory authorities, whether in Singapore
                or abroad, for the aforementioned purposes; and
              </ol>
              <ol className="leading-normal max-w-[1000px] text-gray-800 pb-8 text-base slide-in-bottom-subtitle">
                (i) any other incidental business purposes related to or in
                connection with the above.
              </ol>
              <ol className="leading-normal max-w-[1000px] text-gray-800 pb-8 text-base slide-in-bottom-subtitle">
                6. We may disclose your personal data: (a) where such disclosure
                is required for performing obligations in the course of or in
                connection with our provision of the goods and services
                requested by you; or
              </ol>
              <ol className="leading-normal max-w-[1000px] text-gray-800 pb-8 text-base slide-in-bottom-subtitle">
                (b) to third party service providers, agents and other
                organisations we have engaged to perform any of the functions
                with reference to the above mentioned purposes.
              </ol>
              <ol className="leading-normal max-w-[1000px] text-gray-800 pb-8 text-base slide-in-bottom-subtitle">
                7. The purposes listed in the above clauses may continue to
                apply even in situations where your relationship with us (for
                example, pursuant to a contract) has been terminated or altered
                in any way, for a reasonable period thereafter (including, where
                applicable, a period to enable us to enforce our rights under a
                contract with you).
              </ol>
            </ul>
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
