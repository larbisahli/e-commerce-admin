import Image from 'next/image';
import { useEffect } from 'react';
import MailchimpSubscribe from 'react-mailchimp-subscribe';

const HeroSection = () => {
  useEffect(() => {
    const btn = document.getElementById('mailchimp');
    btn.childNodes[0].lastChild.textContent = 'Subscribe';
  }, []);

  return (
    <section id="subscription" className="bg-slate-100">
      <div className="container pt-12 md:pt-12 px-6 mx-auto flex flex-wrap flex-col md:flex-row items-center justify-between">
        {/* <!--Left Col--> */}
        <div className="flex flex-col w-full xl:w-2/5 justify-center lg:items-start overflow-y-hidden">
          <h1 className="my-4 text-center text-2xl md:text-4xl text-blue-500 font-bold leading-tight xl:text-left slide-in-bottom-h1">
            Start your online store and kickstart your e-commerce business today
          </h1>
          <p className="leading-normal text-gray-700 pb-8 text-base w-full text-center xl:text-left slide-in-bottom-subtitle">
            Be the first to know when our revolutionary new site goes live!
          </p>
          <div className="w-full flex justify-center">
            <div className="w-fit xl:w-full min-w-[400px]">
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
        </div>

        {/* <!--Right Col--> */}
        <div className="max-w-[800px] xl:w-3/5 py-6 overflow-y-hidden w-fit">
          {/* <img src=""/> */}
          <Image
            alt=""
            src="/scandi.webp"
            className="w-5/6 mx-auto lg:mr-0 slide-in-bottom"
            width={800}
            height={500}
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
