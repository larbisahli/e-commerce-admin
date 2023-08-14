import ResetPassword from '@components/auth/reset-password';
import { useGetUser } from '@hooks/index';
import { XSRFHandler } from '@middleware/utils';
import { SSRProps } from '@ts-types/custom.types';
import { GetServerSideProps } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Fragment } from 'react';

const ResetPasswordPage = ({ client }: SSRProps) => {
  const { t } = useTranslation('common');

  useGetUser(client);

  return (
    <Fragment>
      <div className="flex  h-screen items-center justify-center">
        <div className="flex-1 h-full border border-gray-100">
          <div className="m-2 mt-5 mx-12">
            <Link href={'/'}>
              <a className="leading-normal text-center text-blue-600 pt-2">
                <Image src={'/logo.svg'} alt="logo" width={120} height={30} />
              </a>
            </Link>
          </div>
          <div className="max-w-[570px] mx-auto bg-white p-5 sm:p-8">
            <div className="flex flex-col items-center justify-center mt-4 mb-10">
              <h3 className="text-center text-xl font-medium ">
                {t('form:text-reset-your-password')}
              </h3>
              <p className="text-gray-600 text-sm py-2">
                {t('form:password-help-text')}
              </p>
            </div>
            <ResetPassword />
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { locale } = context;

  const { csrfToken, csrfError } = await XSRFHandler(context);

  return {
    props: {
      ...(await serverSideTranslations(locale!, ['error', 'common', 'form'])),
      client: { csrfToken, csrfError }
    }
  };
};

export default ResetPasswordPage;
