import ErrorMessage from '@components/ui/error-message';
import Loader from '@components/ui/loader/loader';
import { useErrorLogger } from '@hooks/useErrorLogger';
import { ROUTES } from '@utils/routes';
import { apiURL } from '@utils/utils';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useCallback, useEffect, useState } from 'react';

export default function ProfilePage() {
  const { t } = useTranslation();
  const { query } = useRouter();

  const [successMessage, setSuccessMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const token = query['token'] as string;

  useErrorLogger(error);

  const verifyAccessToken = useCallback(() => {
    setLoading(true);
    fetch(`${apiURL}/store/verification?token=${token}`)
      .then((response) => response.json())
      .then((data) => {
        console.log({ data });
        if (data?.success) {
          setSuccessMessage(true);
        } else if (data.message) {
          setError(data);
        }
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, [token]);

  useEffect(() => {
    // Get current country code
    if (token) {
      verifyAccessToken();
    }
  }, [token, verifyAccessToken]);

  if (loading) return <Loader text={t('common:text-loading')} />;
  if (error) return <ErrorMessage message={error.message} />;
  return (
    <>
      <div className="flex h-screen w-screen items-center justify-center border-b border-dashed border-border-base py-5 sm:py-8">
        {successMessage && (
          <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-white py-6 sm:py-12">
            <div className="max-w-2xl px-5 text-center">
              <h2 className="mb-2 text-[42px] font-bold text-zinc-800">
                Your account has been verified
              </h2>
              <p className="mb-2 text-lg text-zinc-500">
                We are glad, that you’re with us. You can now login and start
                your e-commerce journey.
              </p>
              <Link
                href={ROUTES.LOGIN}
                className="mt-3 inline-block w-96 rounded bg-blue-600 px-5 py-3 font-medium text-white shadow-md shadow-indigo-500/20 hover:bg-blue-700"
              >
                Login
              </Link>
            </div>
          </div>
        )}
        {successMessage === false && (
          <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-white py-6 sm:py-12">
            <div className="max-w-2xl px-5 text-center">
              <h2 className="mb-2 text-[42px] font-bold text-zinc-800">
                Something Happened
              </h2>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export const getStaticProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ['form', 'common']))
  }
});
