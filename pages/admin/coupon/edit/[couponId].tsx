import { useQuery } from '@apollo/client';
import CouponCreateOrUpdateForm from '@components/coupon/coupon-form';
import AppLayout from '@components/layouts/app';
import ErrorMessage from '@components/ui/error-message';
import Loader from '@components/ui/loader/loader';
import { COUPON } from '@graphql/coupons';
import { useErrorLogger, useGetUser } from '@hooks/index';
import { verifyAuth, XSRFHandler } from '@middleware/utils';
import { SSRProps } from '@ts-types/custom.types';
import { Coupon } from '@ts-types/generated';
import { ROUTES } from '@utils/routes';
import type { GetServerSideProps } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

interface TCoupon {
  coupon: Coupon;
}

interface OptionsVariable {
  id: number;
}

export default function UpdateCouponPage({ client }: SSRProps) {
  const { query } = useRouter();
  const { t } = useTranslation();

  const couponId = parseInt(query.couponId as string, 10);

  const { data, loading, error } = useQuery<TCoupon, OptionsVariable>(COUPON, {
    variables: { id: couponId },
    fetchPolicy: 'cache-and-network'
  });

  const { coupon = [] } = data ?? {};

  useGetUser(client);
  useErrorLogger(error);

  if (loading) {
    return <Loader text={t('common:text-loading')} />;
  }
  if (error) {
    return <ErrorMessage message={t('common:MESSAGE_SOMETHING_WENT_WRONG')} />;
  }

  return (
    <>
      <Head>
        <title>Edit Coupon | Dropgala</title>
        <link
          rel="icon"
          type="image/svg"
          sizes="32x32"
          href="/svg/coupon.svg"
        />
      </Head>
      <div className="py-5 sm:py-8 flex border-b border-dashed border-border-base">
        <h1 className="text-lg font-semibold text-heading">
          {t('form:form-title-edit-coupon')}
        </h1>
      </div>
      <CouponCreateOrUpdateForm initialValues={coupon} />
    </>
  );
}
UpdateCouponPage.Layout = AppLayout;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { locale } = context;
  const { client } = await verifyAuth(context);

  if (!client) {
    return {
      redirect: {
        permanent: false,
        destination: ROUTES.LOGIN
      }
    };
  }

  const { csrfToken, csrfError } = await XSRFHandler(context);

  return {
    props: {
      ...(await serverSideTranslations(locale, ['form', 'common', 'error'])),
      client: { ...(client ?? {}), csrfToken, csrfError }
    }
  };
};
