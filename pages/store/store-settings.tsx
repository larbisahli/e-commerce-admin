import AppLayout from '@components/layouts/app';
import StoreForm from '@components/store/store-form';
import ErrorMessage from '@components/ui/error-message';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export default function StoreSettings() {
  const { t } = useTranslation();

  const error = null;

  if (error) return <ErrorMessage message={error.message} />;
  return (
    <>
      <div className="py-5 sm:py-8 flex border-b border-dashed border-border-base">
        <h1 className="text-lg font-semibold text-heading">
          {t('form:form-title-shop-settings')}
        </h1>
      </div>
      <StoreForm settings={{}} />
    </>
  );
}

StoreSettings.Layout = AppLayout;

export const getStaticProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ['form', 'common']))
  }
});
