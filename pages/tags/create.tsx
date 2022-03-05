import AppLayout from '@components/layouts/app';
import CreateOrUpdateTagForm from '@components/tag/tag-form';
import { useGetStaff } from '@hooks/index';
import { getClientToken, verifyAuth } from '@middleware/utils';
import { SSRProps } from '@ts-types/custom.types';
import { ROUTES } from '@utils/routes';
import type { GetServerSideProps } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export default function CreateCategoriesPage({ client }: SSRProps) {
  const { t } = useTranslation();
  useGetStaff(client?.staff_id);

  return (
    <>
      <div className="py-5 sm:py-8 flex border-b border-dashed border-gray-300">
        <h1 className="text-lg font-semibold text-heading">
          {t('form:button-label-add-tag')}
        </h1>
      </div>
      <CreateOrUpdateTagForm />
    </>
  );
}

CreateCategoriesPage.Layout = AppLayout;

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
      ...(await serverSideTranslations(locale, ['form', 'common', 'error'])),
      client
    }
  };
};
