import { useQuery } from '@apollo/client';
import AppLayout from '@components/layouts/app';
import ErrorMessage from '@components/ui/error-message';
import Loader from '@components/ui/loader/loader';
import { HERO_SLIDE } from '@graphql/hero-banner';
import { useErrorLogger, useGetUser } from '@hooks/index';
import { useSettings } from '@hooks/useSettings';
import { verifyAuth, XSRFHandler } from '@middleware/utils';
import { LanguageProps, SSRProps } from '@ts-types/custom.types';
import { HeroBannerType } from '@ts-types/generated';
import { ROUTES } from '@utils/routes';
import { isEmpty } from 'lodash';
import type { GetServerSideProps } from 'next';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const CreateOrUpdateSlideForm = dynamic(
  () => import('@components/hero-banner/hero-slide-form'),
  { ssr: true }
);

interface THeroSlider {
  heroSlide: HeroBannerType;
}
interface OptionsVariable extends LanguageProps {
  id: number;
}

export default function UpdateHeroSliderPage({ client }: SSRProps) {
  const { query } = useRouter();
  const { t } = useTranslation();

  const sliderId = parseInt(query.sliderId as string, 10);

  const { defaultLanguage, selectedLanguage } = useSettings();

  const { data, loading, error } = useQuery<THeroSlider, OptionsVariable>(
    HERO_SLIDE,
    {
      variables: { id: sliderId, language: selectedLanguage, defaultLanguage },
      fetchPolicy: 'cache-and-network',
      skip: isEmpty(selectedLanguage)
    }
  );

  const { heroSlide = [] } = data ?? {};

  useGetUser(client);
  useErrorLogger(error);

  if (loading) {
    return <Loader text={t('common:text-loading')} />;
  }
  if (error) {
    return <ErrorMessage message={error.message} />;
  }

  return (
    <>
      <Head>
        <title>Edit Hero slider | Dropgala</title>
        <link
          rel="icon"
          type="image/svg"
          sizes="32x32"
          href="/svg/slider.svg"
        />
      </Head>
      <div className="flex border-b border-dashed border-border-base py-5 sm:py-8">
        <h1 className="text-lg font-semibold text-heading">
          {t('form:form-title-edit-hero-slider')}
        </h1>
      </div>
      <CreateOrUpdateSlideForm initialValues={heroSlide} />
    </>
  );
}

UpdateHeroSliderPage.Layout = AppLayout;

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
