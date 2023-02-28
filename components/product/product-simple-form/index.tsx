import Card from '@components/common/card';
import { SaveIcon } from '@components/icons/save-icon';
import Button from '@components/ui/button';
import Description from '@components/ui/description';
import Input from '@components/ui/input';
import { useSettings } from '@hooks/useSettings';
import isEmpty from 'lodash/isEmpty';
import { useTranslation } from 'next-i18next';
import { ChangeEvent, memo } from 'react';

import { Actions, useForm } from '../context/form.context';

type IProps = {
  initialValues: any;
};

function ProductSimpleForm({ initialValues }: IProps) {
  const { t } = useTranslation();

  const {
    state: { salePrice, comparePrice, buyingPrice, quantity, sku },
    dispatch
  } = useForm();

  const { currency } = useSettings();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;

    const inputValue =
      type === 'number' ? (Number(value) < 0 ? 0 : Number(value)) : value;

    dispatch({
      type: Actions.CONTENT,
      payload: {
        field: name,
        value: inputValue
      }
    });
  };

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
          name="salePrice"
          value={salePrice}
          onChange={handleChange}
          type="number"
          // error={t(errors.salePrice?.message!)}
          variant="outline"
          className="mb-5"
        />
        <Input
          label={`${t('form:input-label-compare-price')} (${currency.symbol})`}
          name="comparePrice"
          value={comparePrice}
          onChange={handleChange}
          type="number"
          // error={t(errors.comparePrice?.message!)}
          variant="outline"
          className="mb-5"
        />
        <Input
          label={`${t('form:input-label-buying-price')} (${currency.symbol})`}
          name="buyingPrice"
          value={buyingPrice}
          onChange={handleChange}
          type="number"
          // error={t(errors.buyingPrice?.message!)}
          variant="outline"
          className="mb-5"
        />
        <Input
          label={`${t('form:input-label-total-quantity')}*`}
          name="quantity"
          value={quantity}
          onChange={handleChange}
          type="number"
          // error={t(errors.quantity?.message!)}
          variant="outline"
          className="mb-5"
        />

        <Input
          label={t('form:input-label-sku')}
          name="sku"
          value={sku}
          onChange={handleChange}
          placeholder="LEV-JN-BL-WM"
          // error={t(errors.sku?.message!)}
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
