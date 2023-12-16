import Image from 'next/image';

const HeroSection = () => {
  return (
    <section className="hero-container">
      <div className="container mx-auto flex flex-col flex-wrap items-center justify-between px-6 pt-12 md:flex-row md:pt-12">
        {/* <!--Left Col--> */}
        <div className="flex w-full flex-col justify-center overflow-y-hidden lg:items-start xl:w-2/5">
          <h1 className="slide-in-bottom-h1 mb-5 text-center text-3xl font-bold leading-tight text-blue-500 md:text-4xl xl:text-left">
            Launch your online store on a platform you can trust!
          </h1>
          <div className="slide-in-bottom-subtitle w-full pb-8 text-center text-base leading-normal text-gray-700 xl:text-left">
            <p className="w-fit py-2 xl:w-full">
              <span className="font-semibold ">Secure</span>. Your data belongs
              to you and no one else. We don't use, sell or share your data with
              anyone. DropGala takes many steps to protect your data from others
              so you can stay on top.
            </p>
            <p className="w-fit py-2 xl:w-full">
              <span className="font-semibold">Fast and Reliable</span>. No one
              wants to pay real money only to discover that their website is
              slow or has been down for hours! DropGala’s technical team works
              24/7 to guarantee your website remains fast and live no matter the
              technical issue or size of traffic.
            </p>
            <p className="w-fit py-2 xl:w-full">
              <span className="font-semibold">
                Everything you need at your fingertips
              </span>
              . DropGala provides you with all the tools, features, and services
              you need to grow and scale your ecommerce business.
            </p>
          </div>
        </div>

        {/* <!--Right Col--> */}
        <div className="w-fit max-w-[800px] overflow-y-hidden py-6 xl:w-3/5">
          {/* <img src=""/> */}
          <Image
            alt=""
            src="/landing.webp"
            className="slide-in-bottom mx-auto w-5/6 lg:mr-0"
            width={800}
            height={500}
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
