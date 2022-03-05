import CouponCreateOrUpdateForm from '@components/coupon/coupon-form';
import AppLayout from '@components/layouts/app';
import { useGetStaff } from '@hooks/index';
import { getClientToken, verifyAuth } from '@middleware/utils';
import { SSRProps } from '@ts-types/custom.types';
import { ROUTES } from '@utils/routes';
import type { GetServerSideProps } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export default function CreateCouponPage({ client }: SSRProps) {
  const { t } = useTranslation();
  useGetStaff(client?.staff_id);

  return (
    <>
      <div className="py-5 sm:py-8 flex border-b border-dashed border-border-base">
        <h1 className="text-lg font-semibold text-heading">
          {t('form:form-title-create-coupon')}
        </h1>
      </div>
      <CouponCreateOrUpdateForm />
    </>
  );
}
CreateCouponPage.Layout = AppLayout;

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
