import Image from 'next/image';

const HowItWorksSection = () => {
  return (
    <section className="!container mx-auto mt-0 lg:mt-20">
      <div
        // style={{ background: '#69b3ff2e' }}
        className="rounded px-2 pb-8 md:flex-row md:pt-12 lg:px-4"
      >
        <h2 className="slide-in-bottom-h1 flex w-full items-center justify-center text-center text-3xl font-bold leading-tight text-gray-800 md:text-left">
          How does it work?
        </h2>
        <div className="mx-auto mt-12 grid grid-cols-1 gap-5 md:grid-cols-2  lg:grid-cols-3 xl:grid-cols-4">
          {/* 1 */}
          <div className="flex min-h-[150px] min-w-[250px] flex-col items-center justify-center rounded-lg border bg-white hover:shadow">
            <Image
              alt="feature-1"
              src="/svg/feature-1.svg"
              className="h-[80px]"
              width={54}
              height={45}
            />
            <span className="text-gray-600">1. Setup your store</span>
          </div>
          {/* 2 */}
          <div className="shad flex min-h-[150px] min-w-[250px] flex-col items-center justify-center rounded-lg border bg-white hover:shadow">
            <Image
              alt="feature-2"
              src="/svg/feature-2.svg"
              className="h-[80px]"
              width={54}
              height={45}
            />
            <span className="text-gray-600">2. List your products</span>
          </div>
          {/* 3 */}
          <div className="shad flex min-h-[150px] min-w-[250px] flex-col items-center justify-center rounded-lg border bg-white hover:shadow">
            <Image
              alt="feature-3"
              src="/svg/feature-3.svg"
              className="h-[80px]"
              width={54}
              height={45}
            />
            <span className="text-gray-600">3. Drive traffic and sales</span>
          </div>
          {/* 4 */}
          <div className="shad flex min-h-[150px] min-w-[250px] flex-col items-center justify-center rounded-lg border bg-white hover:shadow">
            <Image
              alt="feature-4"
              src="/svg/feature-4.svg"
              className="h-[80px]"
              width={54}
              height={45}
            />
            <span className="text-gray-600">4. Get paid</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
