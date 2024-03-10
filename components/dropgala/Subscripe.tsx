import React, { useEffect } from 'react';
import MailchimpSubscribe from 'react-mailchimp-subscribe';

const Subscribe = () => {
  useEffect(() => {
    const btn = document.getElementById('mailchimp');
    btn.childNodes[0].lastChild.textContent = 'Subscribe';
  }, []);

  return (
    <section
      id="subscription"
      style={{ background: 'linear-gradient(93.64deg, #f5fbff, #f5f7ff)' }}
      className="mt-14 w-full py-10"
    >
      <div className="flex w-full flex-col items-center justify-center overflow-y-hidden">
        <h2 className="slide-in-bottom-h1 my-4 text-center text-xl font-bold leading-tight text-gray-800 md:text-3xl">
          Begin your Journey of Ecommerce Success
        </h2>
        <p className="text-center">
          Sign up for our Waitlist and move one step closer to achieving your
          dream!
        </p>
      </div>
      <div className="mx-auto w-fit sm:w-[500px]">
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
    </section>
  );
};

export default Subscribe;
