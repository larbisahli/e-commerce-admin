import { useQuery } from '@apollo/client';
import AppLayout from '@components/layouts/app';
import ErrorMessage from '@components/ui/error-message';
import Loader from '@components/ui/loader/loader';
import { MEDIA } from '@graphql/media';
import { useErrorLogger, useGetUser } from '@hooks/index';
import { verifyAuth, XSRFHandler } from '@middleware/utils';
import { SSRProps } from '@ts-types/custom.types';
import { MediaType } from '@ts-types/generated';
import { ROUTES } from '@utils/routes';
import { isEmpty } from 'lodash';
import type { GetServerSideProps } from 'next';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const MediaList = dynamic(() => import('@components/media'), {
  ssr: true,
  loading: () => <Loader text={'Loading'} />
});

interface TMedia {
  media: {
    parent: MediaType;
    children: MediaType[];
    mediaTotalCount: { count: number };
  };
}

interface OptionsVariable {
  id: string;
  page: number;
  limit: number;
}

export default function Files({ client }: SSRProps) {
  const { query } = useRouter();

  const id = query.id as string;

  const { data, loading, error, refetch } = useQuery<TMedia, OptionsVariable>(
    MEDIA,
    {
      variables: {
        id,
        page: 1,
        limit: 10
      },
      fetchPolicy: 'cache-and-network'
    }
  );

  const { media } = data ?? {};

  useGetUser(client);
  useErrorLogger(error);

  if (!isEmpty(error)) {
    return <ErrorMessage message={error.message} />;
  }

  return (
    <>
      <Head>
        {/* Media name here */}
        <title>Media | Dropgala</title>
        <link rel="icon" type="image/svg" sizes="32x32" href="/svg/media.svg" />
      </Head>
      <MediaList
        media={media}
        refetch={refetch}
        loading={loading && isEmpty(media)}
      />
    </>
  );
}

Files.Layout = AppLayout;

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
      ...(await serverSideTranslations(locale, [
        'form',
        'common',
        'table',
        'error'
      ])),
      client: { ...(client ?? {}), csrfToken, csrfError }
    }
  };
};
