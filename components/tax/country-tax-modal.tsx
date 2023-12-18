import 'rc-pagination/assets/index.css';

import Button from '@components/ui/button';
import Input from '@components/ui/input';
import Label from '@components/ui/label';
import Modal from '@components/ui/modal/modal';
import {
  useModalAction,
  useModalState
} from '@components/ui/modal/modal.context';
import Select from '@components/ui/select/select';
import { notify } from '@lib/notify';
import { PRODUCT_MODAL, TAX_MODAL } from '@ts-types/constants';
import { isEmpty } from 'lodash';
import { useTranslation } from 'next-i18next';
import { ChangeEvent, useEffect, useState } from 'react';

const CountryTaxModal = ({ state, setState, countries }) => {
  const { t } = useTranslation();

  const [rate, setRate] = useState({
    name: null,
    iso2: null,
    rate: 0
  });

  const { closeModal } = useModalAction();
  const { isOpen, id, meta } = useModalState();

  const open = id === TAX_MODAL && isOpen;

  useEffect(() => {
    if (!isEmpty(meta)) {
      const updateRate = state?.countries?.find((c) => c.iso2 === meta?.iso2);
      setRate(updateRate);
    }
  }, [meta, state?.countries]);

  const onCloseSave = () => {
    if (!rate.iso2) {
      closeModal(PRODUCT_MODAL, id);
      return;
    }
    if (isEmpty(meta)) {
      const exists = state.countries?.find((v) => v?.iso2 === rate?.iso2);
      if (exists) {
        notify(`"${rate?.name}" already selected!`, 'warning');
        return;
      }
      setState((prev) => {
        return {
          ...prev,
          countries: [
            ...prev.countries,
            {
              ...rate,
              appliesTo: {
                zipCode: null,
                zipCodeRange: null,
                entireCountry: true,
                state: null
              }
            }
          ]
        };
      });
    } else {
      setState((prev) => {
        return {
          ...prev,
          countries: prev.countries?.map((v) => {
            if (v.iso2 === meta?.iso2) {
              return rate;
            }
            return v;
          })
        };
      });
    }
    setRate({
      name: null,
      iso2: null,
      rate: 0
    });
    closeModal(PRODUCT_MODAL, id, {});
  };

  const onClose = () => {
    setRate({
      name: null,
      iso2: null,
      rate: 0
    });
    closeModal(PRODUCT_MODAL, id);
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { value } = e.target;
    setRate((prev) => {
      return {
        ...prev,
        rate: Number(value)
      };
    });
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
            <Select
              value={rate}
              name="country"
              getOptionLabel={(option: any) => option.name}
              getOptionValue={(option: any) => option.iso2}
              onChange={(country: any) => {
                setRate((prev) => {
                  return {
                    ...prev,
                    ...(country ?? {})
                  };
                });
              }}
              options={countries}
              isLoading={isEmpty(countries)}
            />
          </div>
          <div>
            <Input
              label={`${t('form:input-label-tax-rate')} (%)`}
              isRequiredLabel
              name="rate"
              type="number"
              value={rate.rate}
              min={0}
              max={100}
              onChange={handleChange}
              variant="outline"
            />
          </div>
        </div>
        <div className="m-3 mb-16 flex items-end justify-end p-5 md:mb-0">
          <div>
            <Button onClick={onClose}>Cancel</Button>
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
