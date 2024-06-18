import { useQuery } from '@apollo/client';
import { PageFormPlaceholder } from '@components/common/commonComponents';
import AppLayout from '@components/layouts/app';
import ErrorMessage from '@components/ui/error-message';
import { COUPON } from '@graphql/coupons';
import { useErrorLogger, useGetClient } from '@hooks/index';
import { verifyAuth, XSRFHandler } from '@middleware/utils';
import { SSRProps } from '@ts-types/custom.types';
import { Coupon } from '@ts-types/generated';
import { ROUTES } from '@utils/routes';
import isEmpty from 'lodash/isEmpty';
import type { GetServerSideProps } from 'next';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const CouponCreateOrUpdateForm = dynamic(
  () => import('@components/coupon/coupon-form'),
  { ssr: true, loading: () => <PageFormPlaceholder /> }
);

interface TCoupon {
  coupon: Coupon;
}

interface OptionsVariable {
  id: number;
  etag: string;
}

export default function UpdateCouponPage({ client }: SSRProps) {
  const { query } = useRouter();

  const couponId = parseInt(query.couponId as string, 10);

  const {
    userInfo: { store: { etag } = {} }
  } = useGetClient(client);

  const { data, loading, error } = useQuery<TCoupon, OptionsVariable>(COUPON, {
    variables: {
      id: couponId,
      etag: etag?.couponEtag
    },
    fetchPolicy: 'cache-and-network',
    skip: isEmpty(etag)
  });

  const { coupon = [] } = data ?? {};

  useErrorLogger(error);

  if (isEmpty(coupon) || loading) {
    return <PageFormPlaceholder />;
  }
  if (error) {
    return <ErrorMessage message={error.message} />;
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
