import { ArrowDown } from '@components/icons/arrow-down';
import cn from 'classnames';
import { useState } from 'react';

const FaqSection = () => {
  const [openFAQ, setOpenFAQ] = useState(null);

  const handleFaq = (num) => {
    setOpenFAQ((prev) => {
      if (prev === num) return null;
      return num;
    });
  };
  return (
    <section className="p-5 sm:px-11 mt-32 container mx-auto flex flex-col rounded bg-gray-100 w-full">
      <div className="flex items-center justify-center flex-col my-7">
        <h2 className="text-2xl text-gray-800 font-bold leading-tight text-center md:text-left slide-in-bottom-h1">
          Frequently asked questions
        </h2>
        <p className="text-gray-600 self-center text-sm">
          Find answers to the most frequently asked questions
        </p>
      </div>
      {/* 1 */}
      <button
        className="bg-white shadow p-4 rounded my-3"
        onClick={() => handleFaq(1)}
      >
        <div className="flex items-center justify-between">
          <span className="text-gray-900 font-medium leading-tight text-center md:text-left slide-in-bottom-h1">
            Is there a trial period?
          </span>
          <ArrowDown width={20} height={20} />
        </div>
        <div
          className={cn('pt-5 text-gray-800 text-left hidden max-w-4xl', {
            '!block': openFAQ === 1
          })}
        >
          <p>
            You have a 14-day free trial period without adding card information.
          </p>
        </div>
      </button>
      {/* 2 */}
      <button
        className="bg-white shadow p-4 rounded my-3"
        onClick={() => handleFaq(2)}
      >
        <div className="flex items-center justify-between">
          <span className="text-gray-900 font-medium leading-tight text-center md:text-left slide-in-bottom-h1">
            Can I use Dropgala for dropshipping?
          </span>
          <ArrowDown width={20} height={20} />
        </div>
        <div
          className={cn('pt-5 text-gray-800 text-left hidden max-w-4xl', {
            '!block': openFAQ === 2
          })}
        >
          <p>
            Dropgala is fully equipped to support dropshipping, providing you
            with all the necessary tools for seamless integration. We encourage
            you to review our terms and conditions to ensure compliance with any
            specific restrictions regarding dropshipping.
          </p>
        </div>
      </button>
      {/* 3 */}
      <button
        className="bg-white shadow p-4 rounded my-3"
        onClick={() => handleFaq(3)}
      >
        <div className="flex items-center justify-between">
          <span className="text-gray-900 font-medium leading-tight text-center md:text-left slide-in-bottom-h1">
            I created my online store last week but have not received any orders
            yet. Why??
          </span>
          <ArrowDown width={20} height={20} />
        </div>
        <div
          className={cn('pt-5 text-gray-800 text-left hidden max-w-4xl', {
            '!block': openFAQ === 3
          })}
        >
          <p>
            {`Creating an online store is just the first step. You need to
          drive traffic to your store to receive orders. Share your
          store's link or QR code with your existing customers and on your
          social media to start receiving orders.`}
          </p>
        </div>
      </button>
      {/* 4 */}
      <button
        className="bg-white shadow p-4 rounded my-3"
        onClick={() => handleFaq(4)}
      >
        <div className="flex items-center justify-between">
          <span className="text-gray-900 font-medium leading-tight text-center md:text-left slide-in-bottom-h1">
            Is my store secure?
          </span>
          <ArrowDown width={20} height={20} />
        </div>
        <div
          className={cn('pt-5 text-gray-800 text-left hidden max-w-4xl', {
            '!block': openFAQ === 4
          })}
        >
          <p>
            Yes of course, Data protection is a priority for dropgala, we assure
            you a security and protection of all the data of your store
          </p>
        </div>
      </button>
      {/* 5 */}
      <button
        className="bg-white shadow p-4 rounded my-3"
        onClick={() => handleFaq(5)}
      >
        <div className="flex items-center justify-between">
          <span className="text-gray-900 font-medium leading-tight text-center md:text-left slide-in-bottom-h1">
            I have my own domain name, can I use it?
          </span>
          <ArrowDown width={20} height={20} />
        </div>
        <div
          className={cn('pt-5 text-gray-800 text-left hidden max-w-4xl', {
            '!block': openFAQ === 5
          })}
        >
          <p>
            Yes, you can link it to your store on dropgala by putting these DNS:
            ns1.dropgala.com , ns2.dropgala.com
          </p>
        </div>
      </button>
      {/* 6 */}
      <button
        className="bg-white shadow p-4 rounded my-3"
        onClick={() => handleFaq(6)}
      >
        <div className="flex items-center justify-between">
          <span className="text-gray-900 font-medium leading-tight text-center md:text-left slide-in-bottom-h1">
            Do you take sales charges?
          </span>
          <ArrowDown width={20} height={20} />
        </div>
        <div
          className={cn('pt-5 text-gray-800 text-left hidden max-w-4xl', {
            '!block': openFAQ === 6
          })}
        >
          <p>
            No, you only pay for your subscriptions we do not take any fees from
            sales.
          </p>
        </div>
      </button>
      {/* 7 */}
      <button
        className="bg-white shadow p-4 rounded my-3"
        onClick={() => handleFaq(7)}
      >
        <div className="flex items-center justify-between">
          <span className="text-gray-900 font-medium leading-tight text-center md:text-left slide-in-bottom-h1">
            Does Dropgala take care of storage and shipping of my products?
          </span>
          <ArrowDown width={20} height={20} />
        </div>
        <div
          className={cn('pt-5 text-gray-800 text-left hidden max-w-4xl', {
            '!block': openFAQ === 7
          })}
        >
          <p>We do not currently support storage and shipping</p>
        </div>
      </button>
    </section>
  );
};

export default FaqSection;
