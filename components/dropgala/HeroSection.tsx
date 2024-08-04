import Image from 'next/image';
import Link from 'next/link';

const HeroSection = () => {
  return (
    <section className="hero-container !container mx-auto mt-0 lg:mt-20">
      <div className="flex flex-col items-center justify-center px-2 pt-12 md:pt-12 lg:px-4">
        {/* <!--Left Col--> */}
        <div className="flex w-full flex-col items-center justify-center">
          <h1 className="slide-in-bottom-h1 mb-5 text-center !text-6xl font-bold italic leading-tight text-black md:text-4xl xl:text-left">
            Create Your Store Effortlessly
          </h1>
          <div className="slide-in-bottom-subtitle w-full max-w-xl pb-8 text-center text-base leading-normal text-gray-700">
            <p className="w-fit py-2 text-center xl:w-full">
              Secure, fast, and reliable. Dropgala protects your data, keeps
              your site running smoothly 24/7, and provides all the tools to
              grow your eCommerce business.
            </p>
          </div>
          <Link href="#subscription">
            <div className="hover:text-underline inline-block rounded-full bg-blue-600 py-3 px-6 text-center text-white no-underline shadow hover:bg-blue-500">
              Start for free
            </div>
          </Link>
        </div>

        {/* <!--Right Col--> */}
        <div className="mt-12 w-fit overflow-y-hidden py-6">
          <Image
            alt="admin-site"
            src="/image/dropgala-admin.png"
            className="slide-in-bottom mx-auto rounded-md border shadow lg:mr-0"
            width={1000}
            height={500}
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
