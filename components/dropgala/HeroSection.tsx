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
      <div className="container mx-auto flex flex-col flex-wrap items-center justify-between px-6 pt-12 md:flex-row md:pt-12">
        {/* <!--Left Col--> */}
        <div className="flex w-full flex-col justify-center overflow-y-hidden lg:items-start xl:w-2/5">
          <h1 className="slide-in-bottom-h1 my-4 text-center text-2xl font-bold leading-tight text-blue-500 md:text-4xl xl:text-left">
            Start your online store and kickstart your e-commerce business today
          </h1>
          <p className="slide-in-bottom-subtitle w-full pb-8 text-center text-base leading-normal text-gray-700 xl:text-left">
            Be the first to know when our revolutionary new site goes live!
          </p>
          <div className="flex w-full justify-center">
            <div className="w-fit min-w-[400px] xl:w-full">
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
        <div className="w-fit max-w-[800px] overflow-y-hidden py-6 xl:w-3/5">
          {/* <img src=""/> */}
          <Image
            alt=""
            src="/scandi.webp"
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
