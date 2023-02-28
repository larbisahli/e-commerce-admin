import Accordion from '@components/ui/accordion';
import { Product, ProductType } from '@ts-types/generated';
import { useTranslation } from 'next-i18next';
import React from 'react';

import { useForm } from '../context/form.context';
import ProductSimpleForm from '../product-simple-form';
import ProductVariableForm from '../product-variable-form';

type Props = {
  initialValues: Product | any;
};

const ProductTypeFormComponent = ({ initialValues }: Props) => {
  const { t } = useTranslation();

  const {
    state: {
      type: { id: productType }
    }
  } = useForm();

  const renderSimpleForm = () => {
    if (productType === ProductType.Simple) {
      return <ProductSimpleForm initialValues={initialValues} />;
    }
    return null;
  };

  const renderVariationForm = () => {
    if (productType === ProductType.Variable) {
      return <ProductVariableForm initialValues={initialValues} />;
    }
    return null;
  };

  const renderTitle = () => {
    if (productType === ProductType.Variable) {
      return <>{t('form:form-title-variation-product-info')}</>;
    }
    return <>{t('form:form-title-simple-product-info')}</>;
  };

  return (
    <Accordion Title={() => renderTitle()}>
      {renderSimpleForm()}
      {renderVariationForm()}
    </Accordion>
  );
};

export default ProductTypeFormComponent;
