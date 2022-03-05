import RegistrationForm from '@components/auth/registration-form';
import { GetStaticProps } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale!, ['common', 'form']))
  }
});

export default function RegisterPage() {
  const { t } = useTranslation('common');
  return (
    <div className="flex items-center justify-center h-screen bg-white sm:bg-gray-100">
      <div className="m-auto max-w-md w-full bg-white sm:shadow p-5 sm:p-8 rounded">
        {/* <div className="flex justify-center mb-2">
          <Logo />
        </div> */}
        <h3 className="text-center text-base italic text-gray-500 mb-6 mt-4">
          {t('admin-register-title')}
        </h3>
        <RegistrationForm />
      </div>
    </div>
  );
}
