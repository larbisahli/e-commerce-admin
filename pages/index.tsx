import Image from 'next/image';
import { useEffect } from 'react';
import MailchimpSubscribe from 'react-mailchimp-subscribe';

const HomePage = () => {
  useEffect(() => {
    const btn = document.getElementById('mailchimp');
    btn.childNodes[0].lastChild.textContent = 'Subscribe';
  }, []);

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
              {/* <a
                className="inline-block text-white bg-green-600 no-underline rounded hover:text-underline text-center py-3 px-8"
                href="https://dropgala.com/signup"
              >
                Sign up
              </a> */}
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
          <p className="leading-normal text-gray-800 pb-8 md:text-xl text-center md:text-left slide-in-bottom-subtitle">
            Be the first to know when our revolutionary new site goes live!
          </p>
          <div className="w-full">
            <MailchimpSubscribe
              url={process.env.NEXT_PUBLIC_MAILCHIMP_URL}
              render={({ subscribe, status, message }) => (
                <div className="mailchimp" id="mailchimp">
                  <MailchimpSubscribe
                    url={process.env.NEXT_PUBLIC_MAILCHIMP_URL}
                    onSubmitted={(formData) => subscribe(formData)}
                  />
                  {status === 'sending' && (
                    <div style={{ color: 'blue' }}>sending...</div>
                  )}
                  {status === 'error' && (
                    <div
                      style={{ color: 'red' }}
                      dangerouslySetInnerHTML={{ __html: message }}
                    />
                  )}
                  {status === 'success' && (
                    <div style={{ color: 'green' }}>Subscribed !</div>
                  )}
                </div>
              )}
            />
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
        <div className="flex flex-col items-center justify-center w-full">
          <div className="leading-normal text-gray-800 text-center mt-6 slide-in-bottom-subtitle max-w-5xl">
            A game-changing SaaS platform for creating stunning online stores.
            Our mission is to empower entrepreneurs, like you, with the tools
            and features needed to build remarkable e-commerce experiences that
            captivate and convert. With Dropgala, you can easily customize your
            store, effortlessly drag and drop components, and unleash your
            creativity without any coding knowledge required.
          </div>
          <p className="leading-normal text-gray-800 my-2 text-center slide-in-bottom-subtitle max-w-5xl">
            Join us on this exciting journey and unlock the potential of your
            online business. Together, let's revolutionize the way we build and
            scale e-commerce stores!
          </p>
        </div>
        {/* <!--Footer--> */}
        <div className="w-full mt-16 pt-8 pb-6 text-sm text-center md:text-left fade-in border-t border-dotted border-gray-300">
          <p className="italic m-3 text-gray-700 text-center">
            Create Your Dream Online Store Effortlessly with Dropgala!
          </p>
          <p className="text-gray-500 no-underline hover:no-underline">
            &copy; Dropgala 2023 All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
