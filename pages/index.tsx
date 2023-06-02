import Image from 'next/image';

const HomePage = () => {
  return (
    <div
      className="h-screen pb-14 bg-right bg-cover"
      style={{ backgroundImage: "url('/bg.svg')" }}
    >
      <div className="w-full container mx-auto p-6">
        <div className="w-full flex items-center justify-between">
          <div className="flex justify-between content-end w-full">
            <div className="leading-normal text-gray-800 text-2xl font-semibold">
              Dropgala
            </div>
            <div className="flex justify-center items-center">
              <a
                className="inline-block text-white bg-green-600 mx-3 no-underline rounded hover:text-underline text-center py-3 px-8"
                href="https://dropgala.com/login"
              >
                Login
              </a>
              <a
                className="inline-block text-white bg-green-600 no-underline rounded hover:text-underline text-center py-3 px-8"
                href="https://dropgala.com/signup"
              >
                Sign up
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* <!--Main--> */}
      <div className="container pt-12 md:pt-12 px-6 mx-auto flex flex-wrap flex-col md:flex-row items-center">
        {/* <!--Left Col--> */}
        <div className="flex flex-col w-full xl:w-2/5 justify-center lg:items-start overflow-y-hidden">
          <h1 className="my-4 text-3xl md:text-5xl text-green-600 font-bold leading-tight text-center md:text-left slide-in-bottom-h1">
            Coming soon
          </h1>
          <p className="leading-normal text-gray-800 pb-8 md:text-2xl text-center md:text-left slide-in-bottom-subtitle">
            The Fastest, Easiest Way to Launch Your Online Store.
          </p>
          <div className="flex items-center w-full">
            <div className="text-blue-400 font-bold whitespace-nowrap pr-1">
              More info:
            </div>
            <div className="flex w-full justify-center md:justify-start pb-24 lg:pb-0 fade-in px-2">
              larbisahli1905@gmail.com
            </div>
          </div>
        </div>

        {/* <!--Right Col--> */}
        <div className="w-full xl:w-3/5 py-6 overflow-y-hidden">
          {/* <img src=""/> */}
          <Image
            alt=""
            src="/scandi.webp"
            className="w-5/6 mx-auto lg:mr-0 slide-in-bottom"
            width={800}
            height={500}
          />
        </div>

        {/* <!--Footer--> */}
        <div className="w-full pt-16 pb-6 text-sm text-center md:text-left fade-in">
          <a className="text-gray-500 no-underline hover:no-underline" href="#">
            &copy; Dropgala 2023
          </a>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
