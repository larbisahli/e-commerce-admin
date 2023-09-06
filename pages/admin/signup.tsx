import RegistrationForm from '@components/auth/registration/registration-form';
import { useGetUser } from '@hooks/index';
import { XSRFHandler } from '@middleware/utils';
import { SSRProps } from '@ts-types/custom.types';
import type { GetServerSideProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export default function SignUp({ client }: SSRProps) {
  useGetUser(client);
  return (
    <div className="flex h-fit min-h-screen items-center justify-center">
      <div className="mx-auto h-fit min-h-screen w-full max-w-xl p-5 sm:p-8">
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
