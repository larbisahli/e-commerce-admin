import RegistrationForm from '@components/auth/registration-form';
import { useGetStaff } from '@hooks/useGetStaff';
import { XSRFHandler } from '@middleware/utils';
import { SSRProps } from '@ts-types/custom.types';
import type { GetServerSideProps } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';


export default function SignUp({ client }: SSRProps) {
  const { t } = useTranslation('common');
  useGetStaff(client);
  return (
    <div className="flex items-center justify-center bg-white sm:bg-gray-100 h-fit">
      <div className="m-auto max-w-xl w-full bg-white sm:shadow p-5 sm:p-8 rounded">
        {/* <div className="flex justify-center mb-2">
          <Logo />
        </div> */}
        <h3 className="text-center font-medium text-lg mb-6 mt-4">
          {t('sign-up')}
        </h3>
        <RegistrationForm />
      </div>
    </div>
  );
}


export const getServerSideProps: GetServerSideProps = async (context) => {
    const { locale } = context;
    const { csrfToken, csrfError } = await XSRFHandler(context);
    return {
      props: {
        ...(await serverSideTranslations(locale, ['form', 'common', 'error'])),
        client: { csrfToken, csrfError }
      }
    };
  };