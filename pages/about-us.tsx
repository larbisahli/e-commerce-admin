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
        <section className="container mx-auto mt-22  mb-60 flex flex-col-reverse flex-wrap items-center justify-between px-6 md:flex-row">
          {/* <!--Left Col--> */}
          <div className="flex w-full flex-col items-center justify-center overflow-y-hidden">
            <h2 className="slide-in-bottom-h1 my-4 text-center text-xl font-bold leading-tight text-gray-800 md:text-3xl">
              About us
            </h2>
            <p className="slide-in-bottom-subtitle max-w-[1000px] pb-8 text-center text-base leading-normal text-gray-700">
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
        <Footer />
      </main>
    </div>
  );
};

export default HomePage;
