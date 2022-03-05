import { useQuery } from '@apollo/client';
import CouponCreateOrUpdateForm from '@components/coupon/coupon-form';
import AppLayout from '@components/layouts/app';
import ErrorMessage from '@components/ui/error-message';
import Loader from '@components/ui/loader/loader';
import { COUPON } from '@graphql/coupons';
import { useErrorLogger, useGetStaff } from '@hooks/index';
import { getClientToken, verifyAuth } from '@middleware/utils';
import { SSRProps } from '@ts-types/custom.types';
import { Coupon } from '@ts-types/generated';
import { ROUTES } from '@utils/routes';
import type { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

interface TCoupon {
  couponForAdmin: Coupon;
}

interface OptionsVariable {
  id: string | string[];
}

export default function UpdateCouponPage({ client }: SSRProps) {
  const { query } = useRouter();
  const { t } = useTranslation();

  const { couponId } = query;

  const { data, loading, error } = useQuery<TCoupon, OptionsVariable>(COUPON, {
    variables: { id: couponId },
    fetchPolicy: 'cache-and-network'
  });

  const coupon = data?.couponForAdmin;

  useGetStaff(client?.staff_id);
  useErrorLogger(error);

  if (loading) {
    return <Loader text={t('common:text-loading')} />;
  }
  if (error) {
    return <ErrorMessage message={t('common:MESSAGE_SOMETHING_WENT_WRONG')} />;
  }

  return (
    <>
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
  const { token }: { token: string } = getClientToken(context);
  const { client } = verifyAuth(token);

  if (!client) {
    return {
      redirect: {
        permanent: false,
        destination: ROUTES.LOGIN
      }
    };
  }

  return {
    props: {
      ...(await serverSideTranslations(locale, ['form', 'common', 'error'])),
      client
    }
  };
};
