import Alert from '@components/ui/alert';
import { useWarnIfUnsavedChanges } from '@hooks/index';
import type { Product } from '@ts-types/generated';
import { useTranslation } from 'next-i18next';
import { memo, useState } from 'react';

import { FormProvider } from './context/form.context';
import ProductForm from './product-form';

type IProps = {
  initialValues?: Product | any;
  isFork?: boolean;
};

function CreateOrUpdateProductForm({
  initialValues = {},
  isFork = false
}: IProps) {
  const { t } = useTranslation();

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [unsavedChanges, setUnsavedChanges] = useState(true);

  useWarnIfUnsavedChanges(unsavedChanges, () => {
    return confirm(t('common:UNSAVED_CHANGES'));
  });

  return (
    <>
      {errorMessage ? (
        <Alert
          message={t(`common:${errorMessage}`)}
          variant="error"
          closeable={true}
          className="mt-5"
          onClose={() => setErrorMessage(null)}
        />
      ) : null}
      <FormProvider>
        <ProductForm
          setUnsavedChanges={setUnsavedChanges}
          initialValues={initialValues}
          isFork={isFork}
        />
      </FormProvider>
    </>
  );
}

export default memo(CreateOrUpdateProductForm);
