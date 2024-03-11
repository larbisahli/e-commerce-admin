import Footer from '@components/dropgala/Footer';
import Navigation from '@components/dropgala/Navigation';
import Head from 'next/head';

const HomePage = () => {
  return (
    <div
      className="h-screen bg-cover bg-right pb-14"
      // style={{ backgroundImage: "url('/bg.svg')" }}
    >
      <Head>
        <title>Policy | Dropgala</title>
        <meta
          name="description"
          content="Dropgala is an all-in-one e-commerce platform designed to meet the needs of merchants and entrepreneurs."
        />
        <link rel="canonical" href="https://www.dropgala.com/policy" />
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

      {/* <!--Main--> */}
      <main className="pt-20">
        {/* ------------------ About us section ------------------ */}
        <section className="container mx-auto mt-22 mb-60  flex max-w-2xl flex-col-reverse flex-wrap items-center justify-between px-6 md:flex-row">
          {/* <!--Left Col--> */}
          <div className="w-full overflow-y-hidden">
            <h2 className="slide-in-bottom-h1 my-4  text-xl font-bold leading-tight text-gray-800 md:text-3xl">
              Privacy Policy
            </h2>
            <p className="slide-in-bottom-subtitle max-w-[1000px] pb-8 text-base leading-normal text-gray-800">
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
            <h2 className="slide-in-bottom-h1 my-4  text-xl font-bold leading-tight text-gray-800 md:text-3xl">
              PERSONAL DATA
            </h2>
            <ul>
              <ol className="slide-in-bottom-subtitle max-w-[1000px] pb-8 text-base leading-normal text-gray-800">
                1. As used in this Notice: “customer” means an individual who
                (a) has contacted us through any means to find out more about
                any goods or services we provide, or (b) may, or has, entered
                into a contract with us for the supply of any goods or services
                by us; and “personal data” means data, whether true or not,
                about a customer who can be identified: (a) from that data; or
                (b) from that data and other information to which we have or are
                likely to have access.
              </ol>
              <ol className="slide-in-bottom-subtitle max-w-[1000px] pb-8 text-base leading-normal text-gray-800">
                2. Depending on the nature of your interaction with us, some
                examples of personal data which we may collect from you include
                name, residential address, email address, telephone number and
                financial information.
              </ol>
              <ol className="slide-in-bottom-subtitle max-w-[1000px] pb-8 text-base leading-normal text-gray-800">
                3. Other terms used in this Notice shall have the meanings given
                to them in the PDPA (where the context so permits).
              </ol>
            </ul>
          </div>
          <div className="w-full overflow-y-hidden">
            <h2 className="slide-in-bottom-h1 my-4  text-xl font-bold leading-tight text-gray-800 md:text-3xl">
              COLLECTION, USE AND DISCLOSURE OF PERSONAL DATA
            </h2>
            <ul>
              <ol className="slide-in-bottom-subtitle max-w-[1000px] pb-8 text-base leading-normal text-gray-800">
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
              <ol className="slide-in-bottom-subtitle max-w-[1000px] pb-8 text-base leading-normal text-gray-800">
                5. We may collect and use your personal data for any or all of
                the following purposes: (a) performing obligations in the course
                of or in connection with our provision of the goods and/or
                services requested by you;
              </ol>
              <ol className="slide-in-bottom-subtitle max-w-[1000px] pb-8 text-base leading-normal text-gray-800">
                (b) verifying your identity;
              </ol>
              <ol className="slide-in-bottom-subtitle max-w-[1000px] pb-8 text-base leading-normal text-gray-800">
                (c) responding to, handling, and processing queries, requests,
                applications, complaints, and feedback from you;
              </ol>
              <ol className="slide-in-bottom-subtitle max-w-[1000px] pb-8 text-base leading-normal text-gray-800">
                (d) managing your relationship with us;
              </ol>
              <ol className="slide-in-bottom-subtitle max-w-[1000px] pb-8 text-base leading-normal text-gray-800">
                (e) processing payment or credit transactions;
              </ol>
              <ol className="slide-in-bottom-subtitle max-w-[1000px] pb-8 text-base leading-normal text-gray-800">
                (f) complying with any applicable laws, regulations, codes of
                practice, guidelines, or rules, or to assist in law enforcement
                and investigations conducted by any governmental and/or
                regulatory authority;
              </ol>
              <ol className="slide-in-bottom-subtitle max-w-[1000px] pb-8 text-base leading-normal text-gray-800">
                (g) any other purposes for which you have provided the
                information;
              </ol>
              <ol className="slide-in-bottom-subtitle max-w-[1000px] pb-8 text-base leading-normal text-gray-800">
                (h) transmitting to any unaffiliated third parties including our
                third party service providers and agents, and relevant
                governmental and/or regulatory authorities, whether in Singapore
                or abroad, for the aforementioned purposes; and
              </ol>
              <ol className="slide-in-bottom-subtitle max-w-[1000px] pb-8 text-base leading-normal text-gray-800">
                (i) any other incidental business purposes related to or in
                connection with the above.
              </ol>
              <ol className="slide-in-bottom-subtitle max-w-[1000px] pb-8 text-base leading-normal text-gray-800">
                6. We may disclose your personal data: (a) where such disclosure
                is required for performing obligations in the course of or in
                connection with our provision of the goods and services
                requested by you; or
              </ol>
              <ol className="slide-in-bottom-subtitle max-w-[1000px] pb-8 text-base leading-normal text-gray-800">
                (b) to third party service providers, agents and other
                organisations we have engaged to perform any of the functions
                with reference to the above mentioned purposes.
              </ol>
              <ol className="slide-in-bottom-subtitle max-w-[1000px] pb-8 text-base leading-normal text-gray-800">
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
        <Footer />
      </main>
    </div>
  );
};

export default HomePage;
