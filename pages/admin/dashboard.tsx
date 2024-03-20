import AppLayout from '@components/layouts/app';
import { useGetUser } from '@hooks/index';
import { getAllFilesFrontMatter } from '@lib/mdx';
import { verifyAuth } from '@middleware/utils';
import { SSRProps } from '@ts-types/custom.types';
import { ROUTES } from '@utils/routes';
import type { GetServerSideProps } from 'next';
import dynamic from 'next/dynamic';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const Dashboard = dynamic(() => import('@components/dashboard'));

export default function HomeDashboard({ client }: SSRProps) {
  useGetUser(client);
  return <Dashboard />;
}

HomeDashboard.Layout = AppLayout;

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

  return {
    props: {
      ...(await serverSideTranslations(locale!, [
        'common',
        'table',
        'widgets'
      ])),
      client
    }
  };
};
