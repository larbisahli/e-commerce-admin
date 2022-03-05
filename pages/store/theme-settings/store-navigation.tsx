import { useQuery } from '@apollo/client';
import Card from '@components/common/card';
import SortForm from '@components/common/sort-form';
import { Add } from '@components/icons/add';
import AppLayout from '@components/layouts/app';
import TagList from '@components/tag/tag-list';
import ErrorMessage from '@components/ui/error-message';
import LinkButton from '@components/ui/link-button';
import Loader from '@components/ui/loader/loader';
import { TAGS } from '@graphql/tag';
import { useErrorLogger, useGetStaff } from '@hooks/index';
import { getClientToken, verifyAuth } from '@middleware/utils';
import { SSRProps } from '@ts-types/custom.types';
import { OrderBy, SortOrder, Tag } from '@ts-types/generated';
import { ROUTES } from '@utils/routes';
import isEmpty from 'lodash/isEmpty';
import type { GetServerSideProps } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useEffect, useState } from 'react';

export default function StoreNavigation({ client }: SSRProps) {
  const { t } = useTranslation();

  useGetStaff(client?.staff_id);

  // if (loading) {
  //   return <Loader text={t('common:text-loading')} />;
  // }
  // if (!isEmpty(error)) {
  //   return <ErrorMessage message={t('common:MESSAGE_SOMETHING_WENT_WRONG')} />;
  // }

  return (
    <>
      <Card className="flex flex-col xl:flex-row items-center mb-8 flex-1">
        <div className="md:w-1/4 mb-4 xl:mb-0">
          <h1 className="text-xl font-semibold text-heading">
            {t('common:sidebar-nav-item-tags')}
          </h1>
        </div>
      </Card>
    </>
  );
}

StoreNavigation.Layout = AppLayout;

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
      ...(await serverSideTranslations(locale, [
        'form',
        'common',
        'table',
        'error'
      ])),
      client
    }
  };
};
