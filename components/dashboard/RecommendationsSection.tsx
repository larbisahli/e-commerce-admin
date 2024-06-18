import { useGetClient } from '@hooks/useGetClient';
import { ROUTES } from '@utils/routes';
import Image from 'next/image';
import Link from 'next/link';

const RecommendationsSection = () => {
  const {
    userInfo: { store: { alias = '' } = {} }
  } = useGetClient();
  return (
    <div className="mb-12 w-full">
      <div className="mb-2 flex flex-1 items-end text-lg font-medium">
        Recommendations
      </div>
      <div className="border border-b-0 border-gray-300">
        {/* ------------ */}
        <div className="flex border-b border-gray-300 sm:h-[180px]">
          <div className="flex flex-col items-center justify-center sm:flex-row">
            <div className="relative mx-2 flex w-fit max-w-[250px] items-center justify-center">
              <Image
                alt={'image'}
                src={'/static/images/988ffeb65f33bba4e0a0.png'}
                className="object-cover object-center"
                width={500}
                height={180}
              />
            </div>
            <div className="mx-3 flex w-full max-w-screen-sm flex-col items-center pb-4 sm:items-start sm:pb-0">
              <h2 className="cut-line-1 mb-2 text-xl font-semibold leading-7 tracking-tight">
                Create a new product
              </h2>
              <p className="cut-line-3 max-3-lines prose mb-1 max-w-none text-sm leading-5 text-gray-500">
                {'Design a new product or list something you own'}
              </p>
              <div>
                <Link href={`${ROUTES.PRODUCT}/create`}>
                  <div className="mt-4 w-fit rounded-sm border bg-gray-200 px-4 py-2 font-semibold text-black hover:bg-gray-300">
                    Create a new product
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
        {/* ------------ */}
        <div className="flex border-b border-gray-300 sm:h-[180px]">
          <div className="flex flex-col items-center justify-center sm:flex-row">
            <div className="relative mx-2 flex w-fit max-w-[250px] items-center justify-center">
              <Image
                alt={'image'}
                src={'/static/images/2ac8f2b4e4129b40607a.png'}
                className="object-cover object-center"
                width={500}
                height={180}
              />
            </div>
            <div className="mx-3 flex w-full max-w-screen-sm flex-col  items-center px-2 pb-4 sm:items-start sm:px-0 sm:pb-0">
              <h2 className="text-wrap mb-2 text-center text-xl font-semibold leading-7 tracking-tight">
                Refer up to 3 of your friends to Dropgala
              </h2>
              <span className="text-sm leading-5 text-gray-600">
                <strong className="text-black">
                  {'Give 1 month free, Get $10 '}
                </strong>
                {
                  'Get $10 off your next billing for every friends who use your invite link to sign up for a paid account. Your friends will also get 1 month free subscription.'
                }
              </span>
              <div className="mt-4 flex w-full">
                <input
                  className="flex-1 rounded-sm border border-gray-400 px-2 py-2 text-lg font-light text-black outline-none"
                  readOnly
                  value={`https://link.drogala.com/${alias}`}
                />
                <button className="mx-2 rounded-sm bg-gray-200 px-4 font-semibold text-black hover:bg-gray-300">
                  Copy link
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* ------------ */}
        <div className="flex border-b border-gray-300 sm:h-[180px]">
          <div className="flex flex-col items-center justify-center sm:flex-row">
            <div className="relative mx-2 flex w-fit max-w-[250px] items-center justify-center">
              <Image
                alt={'image'}
                src={'/static/images/af6630cbebafa3fb0b00.png'}
                className="object-cover object-center"
                width={500}
                height={180}
              />
            </div>
            <div className="mx-3 flex w-full max-w-screen-sm flex-col items-center pb-4 sm:items-start sm:pb-0">
              <h2 className="cut-line-1 mb-2 text-xl font-semibold leading-7 tracking-tight">
                Set up a custom domain
              </h2>
              <p className="cut-line-3 max-3-lines prose mb-1 max-w-none text-sm leading-5 text-gray-500">
                {'Give your site a custom domain (ex: storename.com)'}
              </p>
              <div>
                <Link href={`${ROUTES.PRODUCT}/create`}>
                  <div className="mt-4 w-fit rounded-sm border bg-gray-200 px-4 py-2 font-semibold text-black hover:bg-gray-300">
                    Connect a new domain
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
        {/* ------------ */}
        <div className="flex border-b border-gray-300 sm:h-[180px]">
          <div className="flex flex-col items-center justify-center sm:flex-row">
            <div className="relative mx-2 flex w-fit max-w-[250px] items-center justify-center">
              <Image
                alt={'image'}
                src={'/static/images/a72de64bdf8787fc9c43.png'}
                className="object-cover object-center"
                width={500}
                height={180}
              />
            </div>
            <div className="mx-3 flex w-full max-w-screen-sm flex-col items-center px-2 pb-4 sm:items-start sm:px-0 sm:pb-0">
              <h2 className="cut-line-1 mb-2 text-xl font-semibold leading-7 tracking-tight">
                Invite team members
              </h2>
              <p className="cut-line-3 max-3-lines prose mb-1 max-w-none text-center text-sm leading-5 text-gray-500">
                {'Add additional team members to help you manage your account'}
              </p>
              <div>
                <Link href={`${ROUTES.PRODUCT}/create`}>
                  <div className="mt-4 w-fit rounded-sm border bg-gray-200 px-4 py-2 font-semibold text-black hover:bg-gray-300">
                    Invite team members
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecommendationsSection;
