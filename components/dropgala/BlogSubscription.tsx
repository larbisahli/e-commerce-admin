import React, { useEffect } from 'react';
import MailchimpSubscribe from 'react-mailchimp-subscribe';

const BlogSubscription = () => {
  useEffect(() => {
    const btn = document.getElementById('mailchimp');
    btn.childNodes[0].lastChild.textContent = 'Subscribe';
  }, []);

  return (
    <section
      style={{ background: 'linear-gradient(93.64deg, #f5fbff, #f5f7ff)' }}
      className="w-full pb-16 pt-44"
    >
      <div className="flex justify-center ">
        <h1 className="mb-6 max-w-[95%] text-center text-xl font-bold leading-[1.5] sm:max-w-[80%] md:text-3xl xl:text-4xl">
          Dropgala stands as the singular, comprehensive solution essential for
          constructing your online business.
        </h1>
      </div>
      <div className="flex justify-center ">
        <p className="px-3 text-center text-sm text-gray-600 sm:text-lg">
          Boost your business with essential tips, tricks, and the latest news
          in ecommerce, marketing, and technology.
        </p>
      </div>
      <div className="mx-auto w-[300px] sm:w-[500px]">
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
                  <div className="mt-4" style={{ color: 'blue' }}>
                    sending...
                  </div>
                )}
                {status === 'error' && (
                  <div
                    style={{ color: 'red' }}
                    className="mt-4"
                    dangerouslySetInnerHTML={{ __html: message }}
                  />
                )}
                {status === 'success' && (
                  <div
                    className="mt-4"
                    style={{ color: 'green', top: '84px', width: '600px' }}
                  >
                    Subscribed !
                  </div>
                )}
              </div>
            )}
          />
        </div>
      </div>
      <div className="flex justify-center">
        <p className="text-center text-sm text-gray-600 sm:text-base">
          Join our Newsletter to be the first to know about our latest updates
        </p>
      </div>
    </section>
  );
};

export default BlogSubscription;
