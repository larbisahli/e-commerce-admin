import Card from '@components/common/card';
import Description from '@components/ui/description';
import Input from '@components/ui/input';
import TextArea from '@components/ui/text-area';
import { useTranslation } from 'next-i18next';
import { useFormContext } from 'react-hook-form';

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
        title={t('form:form-title-product-info')}
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
          placeholder="My product title"
          variant="outline"
          className="mb-5"
        />

        <Input
          label={t('form:input-label-sale-price')}
          {...register('sale_price')}
          type="number"
          min={0}
          error={t(errors.sale_price?.message!)}
          variant="outline"
          className="mb-5"
        />
        <Input
          label={t('form:input-label-compare-price')}
          {...register('compare_price')}
          type="number"
          min={0}
          error={t(errors.compare_price?.message!)}
          variant="outline"
          className="mb-5"
        />
        <Input
          label={t('form:input-label-buying-price')}
          {...register('buying_price')}
          type="number"
          min={0}
          error={t(errors.buying_price?.message!)}
          variant="outline"
          className="mb-5"
        />
        <Input
          label={`${t('form:input-label-quantity')}*`}
          type="number"
          min={0}
          {...register('quantity')}
          error={t(errors.quantity?.message!)}
          variant="outline"
          className="mb-5"
        />

        <Input
          label={t('form:input-label-sku')}
          {...register('sku')}
          placeholder="LEV-JN-BL-WM"
          error={t(errors.sku?.message!)}
          variant="outline"
          className="mb-5"
        />
        <TextArea
          label={t('form:item-hidden-note')}
          {...register('note')}
          placeholder="My hidden note"
          error={t(errors.note?.message!)}
          variant="outline"
          className="mb-5"
        />
      </Card>
    </div>
  );
}
