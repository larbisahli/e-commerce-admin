import { useMutation } from '@apollo/client';
import Alert from '@components/ui/alert';
import { CREATE_PRODUCT, UPDATE_PRODUCT } from '@graphql/product';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  useErrorLogger,
  useGetStaff,
  useWarnIfUnsavedChanges
} from '@hooks/index';
import { notify } from '@lib/index';
import type { Product } from '@ts-types/generated';
import { ProductType } from '@ts-types/generated';
import { ROUTES } from '@utils/routes';
import isEmpty from 'lodash/isEmpty';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { memo, useState } from 'react';

import { FormProvider } from './context/form.context';
import ProductForm from './product-form';
import { productValidationSchema } from './product-validation-schema';
import { creationVariable, updateVariable } from './variablesSubmission';

type IProps = {
  initialValues?: Product | any;
};

function CreateOrUpdateProductForm({ initialValues = {} }: IProps) {
  const { t } = useTranslation();

  const router = useRouter();

  const [error, setError] = useState(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [unsavedChanges, setUnsavedChanges] = useState(true);
  const [lockedSubmission, setLockedSubmission] = useState(false);

  console.log('YUP', yupResolver(productValidationSchema));

  // useEffect(()=>{
  //   !isEmpty(initialValues) ? cloneDeep({
  //     ...initialValues,
  //     status: initialValues?.published
  //       ? ProductStatus.Publish
  //       : ProductStatus.Draft,
  //     type:
  //       initialValues?.type.id === ProductType.Simple
  //         ? productTypes[0]
  //         : productTypes[1]
  //   }): defaultValues
  // }, [initialValues])

  const { staffInfo } = useGetStaff();
  const csrfToken = staffInfo?.csrfToken;

  const [createProduct, { loading: creating }] = useMutation(CREATE_PRODUCT, {
    context: {
      headers: {
        'x-csrf-token': csrfToken
      }
    },
    onCompleted: (data: { createAttribute: Product }) => {
      if (!isEmpty(data)) {
        notify(t('common:successfully-created'), 'success');
        router.push(ROUTES.PRODUCTS);
      }
    }
  });

  const [updateProduct, { loading: updating }] = useMutation(UPDATE_PRODUCT, {
    context: {
      headers: {
        'x-csrf-token': csrfToken
      }
    },
    onCompleted: (data: { updateAttribute: Product }) => {
      if (!isEmpty(data)) {
        notify(t('common:successfully-updated'), 'success');
        router.push(ROUTES.PRODUCTS);
      }
    }
  });

  useErrorLogger(error);

  const onSubmit = async () => {
    const _values = {};
    const isVariable = _values.type.id === ProductType.Variable;
    const values = {
      ..._values,
      variations: isVariable ? variationState.variations : [],
      variationOptions: isVariable ? variationState.variationOptions : []
    };

    console.log({ values });
    if (lockedSubmission) return;

    setLockedSubmission(true);
    setUnsavedChanges(false);

    if (isEmpty(initialValues)) {
      const variables = creationVariable(values);
      console.log({ _values, variables });
      createProduct({ variables }).catch((err) => {
        setError(err);
        setUnsavedChanges(true);
      });
    } else {
      const variables = updateVariable(values, initialValues);
      console.log({ variables, _values });
      // updateProduct({
      //   variables: {
      //     ...variables
      //   }
      // }).catch((err) => {
      //   setError(err);
      //   setUnsavedChanges(true);
      // });
    }
    setLockedSubmission(false);
  };

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
          isLoading={updating || creating}
          {...{ initialValues, onSubmit }}
        />
      </FormProvider>
    </>
  );
}

export default memo(CreateOrUpdateProductForm);
