import React, { useEffect } from 'react';
import MailchimpSubscribe from 'react-mailchimp-subscribe';

const Subscribe = () => {
  useEffect(() => {
    const btn = document.getElementById('mailchimp');
    btn.childNodes[0].lastChild.textContent = 'Subscribe';
  }, []);

  return (
    <section id="subscription" className="w-full">
      <div className="mx-auto w-fit">
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
