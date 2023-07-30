import { useQuery } from '@apollo/client';
import PageMainAction from '@components/common/PageMainAction';
import AppLayout from '@components/layouts/app';
import ErrorMessage from '@components/ui/error-message';
import Loader from '@components/ui/loader/loader';
import { PROMO_SLIDER } from '@graphql/promo-slide';
import { useErrorLogger, useGetUser } from '@hooks/index';
import { verifyAuth, XSRFHandler } from '@middleware/utils';
import type { SSRProps } from '@ts-types/custom.types';
import type { PromoCarouselType } from '@ts-types/generated';
import { ROUTES } from '@utils/routes';
import isEmpty from 'lodash/isEmpty';
import type { GetServerSideProps } from 'next';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const CreateOrUpdatePromoSlideForm = dynamic(
  () => import('@components/promo-carousel/promo-slide-form'),
  { ssr: true }
);

interface THeroCarousel {
  promoSlide: PromoCarouselType;
}

export default function PromoSliders({ client }: SSRProps) {
  const { t } = useTranslation();

  const { data, loading, error } = useQuery<THeroCarousel>(PROMO_SLIDER, {
    variables: {},
    fetchPolicy: 'cache-and-network'
  });

  const { promoSlide = {} } = data ?? {};

  useGetUser(client);
  useErrorLogger(error);

  if (loading) {
    return <Loader text={t('common:text-loading')} />;
  }
  if (!isEmpty(error)) {
    return <ErrorMessage message={error.message} />;
  }

  return (
    <>
      <Head>
        <title>Promo slider | Dropgala</title>
        <link
          rel="icon"
          type="image/svg"
          sizes="32x32"
          href="/svg/slider.svg"
        />
      </Head>
      <PageMainAction title={t('form:input-label-promo-carousel')} label="" />
      <CreateOrUpdatePromoSlideForm initialValues={promoSlide} />
    </>
  );
}

PromoSliders.Layout = AppLayout;

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
      ...(await serverSideTranslations(locale!, [
        'form',
        'common',
        'table',
        'error'
      ])),
      client: { ...(client ?? {}), csrfToken, csrfError }
    }
  };
};
