import ResetPassword from '@components/auth/reset-password';
import { useGetClient } from '@hooks/index';
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

  useGetClient(client);

  return (
    <Fragment>
      <div className="flex  h-screen items-center justify-center">
        <div className="h-full flex-1 border border-gray-100">
          <div className="m-2 mx-12 mt-5">
            <Link href={'/'}>
              <div className="pt-2 text-center leading-normal text-blue-600">
                <Image src={'/logo.svg'} alt="logo" width={120} height={30} />
              </div>
            </Link>
          </div>
          <div className="mx-auto max-w-[570px] bg-white p-5 sm:p-8">
            <div className="mt-4 mb-10 flex flex-col items-center justify-center">
              <h3 className="text-center text-xl font-medium ">
                {t('form:text-reset-your-password')}
              </h3>
              <p className="py-2 text-sm text-gray-600">
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
