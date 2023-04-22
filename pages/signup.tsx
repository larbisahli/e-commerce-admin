import RegistrationForm from '@components/auth/registration-form';
import { useGetUser } from '@hooks/index';
import { XSRFHandler } from '@middleware/utils';
import { SSRProps } from '@ts-types/custom.types';
import type { GetServerSideProps } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export default function SignUp({ client }: SSRProps) {
  const { t } = useTranslation('common');
  useGetUser(client);

  console.log({ client });

  return (
    <div className="flex items-center justify-center bg-gray-100 min-h-screen h-fit">
      <div className="border border-gray-100 mx-auto max-w-xl bg-white p-5 sm:p-8 min-h-screen h-fit w-full">
        <div className="flex justify-center mb-2">Dropgala</div>
        <h3 className="text-center font-medium text-lg mt-4 mb-9">
          {t('sign-up-create-store')}
        </h3>
        <RegistrationForm />
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { locale } = context;
  const { csrfToken, csrfError, csrfSecret } = await XSRFHandler(context);
  return {
    props: {
      ...(await serverSideTranslations(locale, ['form', 'common', 'error'])),
      client: { csrfToken, csrfError, csrfSecret }
    }
  };
};
