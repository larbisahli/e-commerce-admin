import AppLayout from '@components/layouts/app';
import { useGetStaff } from '@hooks/index';
import { getClientToken, verifyAuth } from '@middleware/utils';
import { SSRProps } from '@ts-types/custom.types';
import { ROUTES } from '@utils/routes';
import type { GetServerSideProps } from 'next';
import dynamic from 'next/dynamic';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const AdminDashboard = dynamic(() => import('@components/dashboard/admin'));
// const OwnerDashboard = dynamic(() => import("@components/dashboard/owner"));

export default function Dashboard({ client }: SSRProps) {
  //   if (userPermissions?.includes(SUPER_ADMIN)) {
  //     return <AdminDashboard />;
  //   }
  // return <OwnerDashboard />;

  const { staffInfo } = useGetStaff(client?.staff_id);

  console.log(`client`, { client, staffInfo });

  return <AdminDashboard />;
}

Dashboard.Layout = AppLayout;

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
      ...(await serverSideTranslations(locale!, [
        'common',
        'table',
        'widgets'
      ])),
      client,
      token
    }
  };
};
