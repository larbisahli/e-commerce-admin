import { useMutation } from '@apollo/client';
import Card from '@components/common/card';
import FormActions from '@components/common/FormActions';
import Description from '@components/ui/description';
import Input from '@components/ui/input';
import Label from '@components/ui/label';
import Select from '@components/ui/select/select';
import TextArea from '@components/ui/text-area';
import { UPDATE_OFFLINE_PAYMENT } from '@graphql/payment';
import {
  useErrorLogger,
  useGetClient,
  useWarnIfUnsavedChanges
} from '@hooks/index';
import { useAppDispatch } from '@hooks/useGetClient';
import { notify } from '@lib/index';
import { setEtag } from '@store/client';
import { offlinePaymentCodes } from '@ts-types/enums';
import type { EtagGroupsType, TaxType } from '@ts-types/generated';
import { ROUTES } from '@utils/routes';
import isEmpty from 'lodash/isEmpty';
import { useTranslation } from 'next-i18next';
import { ChangeEvent, useEffect, useState } from 'react';
import React from 'react';

type IProps = {
  initialValues?: TaxType | any;
};

export default function CodForm({ initialValues }: IProps) {
  const { t } = useTranslation();

  const [error, setError] = useState(null);
  const [unsavedChanges, setUnsavedChanges] = useState(true);
  const [countries, setCountries] = useState([]);

  const [state, setState] = useState({
    name: 'Cash on Delivery',
    description: `Type your cash on delivery instructions in here.`,
    countries: [
      {
        iso2: 'XX',
        name: '-- All Countries --'
      }
    ]
  });

  const { userInfo } = useGetClient();
  const csrfToken = userInfo?.csrfToken;

  useEffect(() => {
    if (!isEmpty(initialValues?.data)) {
      setState(initialValues.data);
    }
  }, [initialValues]);

  const dispatch = useAppDispatch();

  const [updatePayment, { loading: updating }] = useMutation(
    UPDATE_OFFLINE_PAYMENT,
    {
      context: {
        headers: {
          'x-csrf-token': csrfToken
        }
      },
      onCompleted: (data: {
        updateOfflinePayment: { code: string; etag: EtagGroupsType };
      }) => {
        if (!isEmpty(data.updateOfflinePayment.code)) {
          notify(t('common:successfully-updated'), 'success');
          const { etag: newEtag } = data.updateOfflinePayment ?? {};
          dispatch(setEtag({ etag: newEtag }));
        }
      }
    }
  );

  useErrorLogger(error);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!state.name) {
      notify('Please provide the payment display name', 'error');
      return;
    }
    const variables = {
      code: offlinePaymentCodes.cod,
      data: {
        ...state,
        countries: state?.countries?.map((country) => {
          return {
            iso2: country.iso2,
            name: country.name
          };
        })
      }
    };

    setUnsavedChanges(false);
    updatePayment({
      variables
    }).catch((err) => {
      setError(err);
    });
  };

  useWarnIfUnsavedChanges(unsavedChanges, () => {
    return confirm(t('common:UNSAVED_CHANGES'));
  });

  // Get Countries
  useEffect(() => {
    async function getCountries() {
      const { Countries } = await import('@utils/countries');
      setCountries(Countries);
    }
    getCountries();
  }, []);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setState((prev) => {
      return {
        ...prev,
        [name]: value
      };
    });
  };

  return (
    <form onSubmit={onSubmit}>
      <FormActions
        backLink={ROUTES.PAYMENT}
        showSelectLanguage={false}
        title={'Cash on Delivery'}
        loading={updating}
        disabled={updating}
      />
      <div className="my-5 flex flex-wrap sm:my-8">
        <Description
          title={t('form:input-label-description')}
          details={
            "To integrate Cash on Delivery into your store simply complete the form below and click the 'Save' button."
          }
          className="w-full px-0 pb-5 sm:w-4/12 sm:py-8 sm:pe-4 md:w-1/3 md:pe-5"
        />

        <Card className="w-full sm:w-8/12 md:w-2/3">
          <Input
            label="Display Name"
            isRequiredLabel
            name="name"
            value={state.name}
            onChange={handleChange}
            variant="outline"
            className="mb-5"
            placeholder={'Bank Deposit'}
            note="The text in this box will be used to describe this payment method on your site."
          />
          <div className="mb-5">
            <Label>Available Countries</Label>
            <Select
              value={state.countries}
              name="countries"
              placeholder="Choose countries"
              isMulti
              getOptionLabel={(option: any) => option.name}
              getOptionValue={(option: any) => option.iso2}
              onChange={(countries: any) => {
                setState((prev) => {
                  return {
                    ...prev,
                    countries
                  };
                });
              }}
              options={[
                {
                  iso2: 'XX',
                  name: '-- All Countries --'
                },
                ...countries
              ]}
              isLoading={isEmpty(countries)}
            />
            <p className="my-2 text-xs text-gray-500">
              Which countries do you want to offer Cash on Delivery to? If the
              customers billing country matches any of the selected countries
              then they will have the option to pay by Cash on Delivery.
            </p>
          </div>
          <TextArea
            label="Account Information"
            onChange={handleChange}
            value={state.description}
            name="description"
            variant="outline"
            className="mb-6"
            rows={7}
            note="If a customer chooses to pay via COD, then he will be shown the text you type into this box once he completes his order. You should include your payment terms and other information here so the customer can pay for his order by cash on delivery. The amount of the order will automatically be displayed."
          />
        </Card>
      </div>
    </form>
  );
}
