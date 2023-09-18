import { useQuery } from '@apollo/client';
import { PageFormPlaceholder } from '@components/common/commonComponents';
import AppLayout from '@components/layouts/app';
import ErrorMessage from '@components/ui/error-message';
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
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const CreateOrUpdateSlideForm = dynamic(
  () => import('@components/hero-banner/hero-slide-form'),
  { ssr: true, loading: () => <PageFormPlaceholder /> }
);

interface THeroSlider {
  heroSlide: HeroBannerType;
}
interface OptionsVariable extends LanguageProps {
  id: number;
}

export default function UpdateHeroSliderPage({ client }: SSRProps) {
  const { query } = useRouter();

  const sliderId = parseInt(query.sliderId as string, 10);

  const { selectedLanguage } = useSettings();

  const { data, loading, error } = useQuery<THeroSlider, OptionsVariable>(
    HERO_SLIDE,
    {
      variables: { id: sliderId, language: selectedLanguage },
      fetchPolicy: 'cache-and-network',
      skip: isEmpty(selectedLanguage)
    }
  );

  const { heroSlide = [] } = data ?? {};

  useGetUser(client);
  useErrorLogger(error);

  if (isEmpty(heroSlide) || loading) {
    return <PageFormPlaceholder />;
  }

  if (error) {
    return <ErrorMessage message={error.message} />;
  }

  return (
    <>
      <Head>
        <title>Edit hero slider | Dropgala</title>
        <link
          rel="icon"
          type="image/svg"
          sizes="32x32"
          href="/svg/slider.svg"
        />
      </Head>
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
