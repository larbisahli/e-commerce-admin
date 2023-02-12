import Card from '@components/common/card';
import { SaveIcon } from '@components/icons/save-icon';
import Button from '@components/ui/button';
import Description from '@components/ui/description';
import Input from '@components/ui/input';
import { useSettings } from '@hooks/useSettings';
import isEmpty from 'lodash/isEmpty';
import { useTranslation } from 'next-i18next';
import { memo } from 'react';
import { useFormContext } from 'react-hook-form';

type IProps = {
  initialValues: any;
};

function ProductSimpleForm({ initialValues }: IProps) {
  const {
    register,
    formState: { errors }
  } = useFormContext();
  const { t } = useTranslation();

  const { currency } = useSettings();

  return (
    <div className="flex flex-wrap pb-8 my-5 sm:my-8">
      <Description
        details={`${
          initialValues
            ? t('form:item-description-edit')
            : t('form:item-description-add')
        } ${t('form:form-description-simple-product-info')}`}
        className="w-full px-0 sm:pe-4 md:pe-5 pb-5 sm:w-4/12 md:w-1/3 sm:py-8"
      />

      <Card className="w-full sm:w-8/12 md:w-2/3">
        <Input
          label={`${t('form:input-label-sale-price')} (${currency.symbol})`}
          {...register('salePrice')}
          type="number"
          min={0}
          error={t(errors.salePrice?.message!)}
          variant="outline"
          className="mb-5"
        />
        <Input
          label={`${t('form:input-label-compare-price')} (${currency.symbol})`}
          {...register('comparePrice')}
          type="number"
          min={0}
          error={t(errors.comparePrice?.message!)}
          variant="outline"
          className="mb-5"
        />
        <Input
          label={`${t('form:input-label-buying-price')} (${currency.symbol})`}
          {...register('buyingPrice')}
          type="number"
          min={0}
          error={t(errors.buyingPrice?.message!)}
          variant="outline"
          className="mb-5"
        />
        <Input
          label={`${t('form:input-label-total-quantity')}*`}
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
        {!isEmpty(initialValues) && (
          <div className="mt-11 flex justify-end border-t pt-4">
            <Button
            // loading={updating || creating}
            // disabled={updating || creating}
            >
              <div className="mr-1">
                <SaveIcon width="1.3rem" height="1.3rem" />
              </div>
              <div>{t('form:button-label-save')}</div>
            </Button>
          </div>
        )}
      </Card>
    </div>
  );
}

export default memo(ProductSimpleForm);
