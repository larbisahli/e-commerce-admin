import Input from '@components/ui/input';
import Description from '@components/ui/description';
import Card from '@components/common/card';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'next-i18next';

type IProps = {
  initialValues: any;
};

export default function ProductInfoForm({ initialValues }: IProps) {
  const {
    register,
    formState: { errors }
  } = useFormContext();
  const { t } = useTranslation();

  return (
    <div className="flex flex-wrap pb-8 border-b border-dashed border-border-base my-5 sm:my-8">
      <Description
        title={t('form:form-title-simple-product-info')}
        details={`${
          initialValues
            ? t('form:item-description-edit')
            : t('form:item-description-add')
        } ${t('form:form-description-simple-product-info')}`}
        className="w-full px-0 sm:pe-4 md:pe-5 pb-5 sm:w-4/12 md:w-1/3 sm:py-8"
      />

      <Card className="w-full sm:w-8/12 md:w-2/3">
        <Input
          label={`${t('form:input-label-name')}*`}
          {...register('name')}
          error={t(errors.name?.message!)}
          variant="outline"
          className="mb-5"
        />

        <Input
          label={`${t('form:input-label-sale-price')}*`}
          type="number"
          {...register('sale_price')}
          error={t(errors.sale_price?.message!)}
          variant="outline"
          className="mb-5"
        />
        <Input
          label={`${t('form:input-label-compare-price')}*`}
          {...register('compare_price')}
          type="number"
          error={t(errors.compare_price?.message!)}
          variant="outline"
          className="mb-5"
        />
        <Input
          label={`${t('form:input-label-buying-price')}`}
          {...register('buying_price')}
          type="number"
          error={t(errors.buying_price?.message!)}
          variant="outline"
          className="mb-5"
        />
        <Input
          label={`${t('form:input-label-quantity')}*`}
          type="number"
          {...register('quantity')}
          error={t(errors.quantity?.message!)}
          variant="outline"
          className="mb-5"
        />

        <Input
          label={`${t('form:input-label-sku')}`}
          {...register('sku')}
          error={t(errors.sku?.message!)}
          variant="outline"
          className="mb-5"
        />
      </Card>
    </div>
  );
}
