import { EmailIcon } from '@components/icons/sidebar';
import Button from '@components/ui/button';
import Loader from '@components/ui/loader/loader';
import { SignupMethods } from '@ts-types/enums';
import { ROUTES } from '@utils/routes';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import React from 'react';

import bgImage from '../../../public/no-revisions.jpg';
import FormFooter from '../form-footer';

const RegistrationChoice = ({ loading, setSignupMethod }: any) => {
  const { t } = useTranslation('common');
  return (
    <div className="relative flex h-screen items-center justify-center">
      {/* --------- */}

      <div className="hidden flex-1 md:block">
        <div className="relative h-screen overflow-hidden">
          <Image
            alt="bgImage-bg"
            src={bgImage}
            placeholder="blur"
            layout="fill"
            objectFit="cover"
            quality={100}
          />
        </div>
      </div>
      {/* --------- */}
      <div className="flex h-full flex-1 flex-col ">
        <div className="m-2 mx-12 mt-8 flex justify-end">
          <Link href={ROUTES.LOGIN}>
            <div className="text-lg font-medium text-black hover:underline">
              Log in
            </div>
          </Link>
        </div>
        <div className="relative mx-auto mt-8 max-w-[450px] bg-white p-4">
          {loading && (
            <div className="absolute inset-0 z-50 flex items-end justify-center">
              <div className="absolute bottom-[-100px]">
                <Loader special />
              </div>
            </div>
          )}
          <div className="mb-1 flex flex-col">
            <h3 className="text-left text-4xl font-semibold">Start now</h3>
            <div className="py-1 text-xs text-gray-500">
              <span className="w-fit">By joining you agree to</span>
              <Link
                href={'/conditions'}
                target="_blank"
                className="mx-1 underline"
              >
                Terms of service
              </Link>
              <span className="w-fit">and have read and understood the</span>
              <Link
                href={'/privacy'}
                target="_blank"
                className="mx-1 underline"
              >
                Privacy policy.
              </Link>
            </div>
          </div>
          <div className="mt-8 flex w-[400px] flex-col items-center px-5">
            <div
              id="signUpDiv"
              data-text="signup_with"
              className="flex items-center justify-center"
            ></div>
            <div>
              <div className="relative flex items-center justify-center py-5">
                <div className="absolute h-[1px] w-full bg-gray-300"></div>
                <div className="z-10 bg-white px-3 text-xs uppercase text-gray-500">
                  or
                </div>
              </div>
              <Button
                className="h-[40px] w-[400px] rounded-[4px] !py-5"
                renderIcon={<EmailIcon width="1.3rem" height="1.3rem" />}
                onClick={() => setSignupMethod(SignupMethods.EMAIL)}
              >
                Sign up with email
              </Button>
            </div>
          </div>
        </div>
        <div className="flex flex-1 items-end justify-center pb-7">
          <FormFooter links={false} />
        </div>
      </div>
    </div>
  );
};

export default RegistrationChoice;
