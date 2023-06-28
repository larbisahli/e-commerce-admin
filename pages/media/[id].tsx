import { useQuery } from '@apollo/client';
import PageMainHeader from '@components/common/page-main-header';
import PageMainAction from '@components/common/PageMainAction';
import AppLayout from '@components/layouts/app';
import MediaList from '@components/media';
import Button from '@components/ui/button';
import ErrorMessage from '@components/ui/error-message';
import Loader from '@components/ui/loader/loader';
import { MEDIA } from '@graphql/media';
import { useErrorLogger, useGetUser } from '@hooks/index';
import { verifyAuth, XSRFHandler } from '@middleware/utils';
import { SSRProps } from '@ts-types/custom.types';
import { MediaType, OrderBy, SortOrder } from '@ts-types/generated';
import { ROUTES } from '@utils/routes';
import { isEmpty } from 'lodash';
import type { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useState } from 'react';

interface TMedia {
  media: {
    parent: MediaType;
    children: MediaType[];
  };
}

interface OptionsVariable {
  id: string;
  page: number;
  limit: number;
}

export default function Files({ client }: SSRProps) {
  const { t } = useTranslation();
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

  if (loading) {
    return <Loader text={t('common:text-loading')} />;
  }
  if (!isEmpty(error)) {
    return <ErrorMessage message={t('common:MESSAGE_SOMETHING_WENT_WRONG')} />;
  }

  const onImageUpload = (e) => {
    e.preventDefault();
    console.log('LOL');
  };

  return (
    <>
      <PageMainAction
        href="#"
        onClick={onImageUpload}
        title={t('form:input-label-media')}
        label={t('form:button-label-upload-image')}
      />
      <MediaList refetch={refetch} media={media} />
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
