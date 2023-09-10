import { useQuery } from '@apollo/client';
import PageMainAction from '@components/common/PageMainAction';
import AppLayout from '@components/layouts/app';
import ErrorMessage from '@components/ui/error-message';
import Loader from '@components/ui/loader/loader';
import { PROMO_SLIDER } from '@graphql/promo-slide';
import { useErrorLogger, useGetUser } from '@hooks/index';
import { useSettings } from '@hooks/useSettings';
import { verifyAuth, XSRFHandler } from '@middleware/utils';
import type { LanguageProps, SSRProps } from '@ts-types/custom.types';
import type { PromoBannerType } from '@ts-types/generated';
import { ROUTES } from '@utils/routes';
import cn from 'classnames';
import isEmpty from 'lodash/isEmpty';
import type { GetServerSideProps } from 'next';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const CreateOrUpdatePromoSlideForm = dynamic(
  () => import('@components/promo-banner/promo-slide-form'),
  { ssr: true }
);

interface THeroBanner {
  promoSlide: PromoBannerType;
}

export default function PromoSliders({ client }: SSRProps) {
  const { t } = useTranslation();

  const { selectedLanguage } = useSettings();

  const { data, loading, error } = useQuery<THeroBanner, LanguageProps>(
    PROMO_SLIDER,
    {
      variables: {
        language: selectedLanguage
      },
      fetchPolicy: 'cache-and-network',
      skip: isEmpty(selectedLanguage)
    }
  );

  const { promoSlide = {} } = data ?? {};

  useGetUser(client);
  useErrorLogger(error);

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
      {loading && <Loader text={t('common:text-loading')} />}
      <PageMainAction title={t('form:input-label-promo-banner')} label="" />
      <div className={cn({ hidden: loading })}>
        <CreateOrUpdatePromoSlideForm initialValues={promoSlide} />
      </div>
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
