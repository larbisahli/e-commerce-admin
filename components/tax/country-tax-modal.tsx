/* eslint-disable jsx-a11y/no-noninteractive-element-to-interactive-role */
import 'rc-pagination/assets/index.css';

import Button from '@components/ui/button';
import Input from '@components/ui/input';
import Label from '@components/ui/label';
import Modal from '@components/ui/modal/modal';
import {
  useModalAction,
  useModalState
} from '@components/ui/modal/modal.context';
import SelectInput from '@components/ui/select-input';
import { PRODUCT_MODAL, TAX_MODAL } from '@ts-types/constants';
import { isEmpty } from 'lodash';
import { useTranslation } from 'next-i18next';
import { useEffect, useState } from 'react';

const CountryTaxModal = ({ countries, control, register }) => {
  const { t } = useTranslation();

  const { closeModal } = useModalAction();
  const { isOpen, id, meta } = useModalState();
  console.log({ isOpen, id, meta });

  const [selectedProducts, setSelectedProducts] = useState<{ id: string }[]>(
    []
  );

  useEffect(() => {
    setSelectedProducts(meta?.selectedProducts ?? []);
  }, [meta]);

  const open = id === TAX_MODAL && isOpen;

  const onCloseSave = () => {
    closeModal(PRODUCT_MODAL, id, { selectedProducts });
  };

  const onClose = () => {
    closeModal(PRODUCT_MODAL, id);
  };

  return (
    <Modal open={open} onClose={onClose}>
      <div
        className="flex h-[100vh] max-h-screen min-h-[500px] w-[100vw]
      flex-col overflow-y-auto bg-white md:h-fit md:w-[60vw] 2xl:w-[50vw]"
      >
        <div
          className="border-b border-gray-200 bg-gray-100 p-4 text-lg font-semibold capitalize
           text-gray-800 shadow"
        >
          Country
        </div>
        <div className="flex flex-1 flex-col p-5 pb-14">
          <div className="mb-5">
            <Label>{t('form:input-label-country')}</Label>
            <SelectInput
              name="country"
              control={control}
              getOptionLabel={(option: any) => option.name}
              getOptionValue={(option: any) => option.id}
              options={countries}
              isLoading={isEmpty(countries)}
            />
          </div>
          <div>
            <Input
              label={`${t('form:input-label-tax-rate')} (%)`}
              isRequiredLabel
              type="number"
              min={0}
              max={100}
              {...register('rate')}
              variant="outline"
            />
          </div>
        </div>
        <div className="m-3 mb-16 flex items-end justify-end p-5 md:mb-0">
          <div>
            <Button onClick={onCloseSave}>Cancel</Button>
            <Button className="ml-4" onClick={onCloseSave}>
              Save
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default CountryTaxModal;
