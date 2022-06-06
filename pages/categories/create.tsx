import CreateOrUpdateCategoriesForm from '@components/category/category-form';
import AppLayout from '@components/layouts/app';
import { useGetStaff } from '@hooks/index';
import { verifyAuth, XSRFHandler } from '@middleware/utils';
import { SSRProps } from '@ts-types/custom.types';
import { ROUTES } from '@utils/routes';
import type { GetServerSideProps } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export default function CreateCategoriesPage({
  client,
  csrfToken,
  csrfError
}: SSRProps) {
  const { t } = useTranslation();
  useGetStaff(client?.staff_id, { csrfToken, csrfError });

  return (
    <>
      <div className="py-5 sm:py-8 flex border-b border-dashed border-border-base">
        <h1 className="text-lg font-semibold text-heading">
          {t('form:form-title-create-category')}
        </h1>
      </div>
      <CreateOrUpdateCategoriesForm />
    </>
  );
}

CreateCategoriesPage.Layout = AppLayout;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { locale } = context;
  const { client } = verifyAuth(context);

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
      ...(await serverSideTranslations(locale!, ['form', 'common', 'error'])),
      client,
      csrfToken,
      csrfError
    }
  };
};
