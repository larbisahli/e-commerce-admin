import { useMutation } from '@apollo/client';
import Button from '@components/ui/button';
import { UPDATE_OFFLINE_PAYMENT_AVAILABILITY } from '@graphql/payment';
import { Switch } from '@headlessui/react';
import { notify } from '@lib/notify';
import { offlinePaymentCodes } from '@ts-types/enums';
import { EtagGroupsType } from '@ts-types/generated';
import { ROUTES } from '@utils/routes';
import classNames from 'classnames';
import { isEmpty } from 'lodash';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import { useState } from 'react';
import { setEtag } from '@store/client';
import { useAppDispatch, useGetClient } from '@hooks/useGetClient';
import { useErrorLogger } from '@hooks/useErrorLogger';
import Loader from '@components/ui/loader/loader';

const OfflinePayments = ({ initialValues, loading }) => {
  const { t } = useTranslation();

  const [error, setError] = useState(null);

  const checkOfflineAvailability = (code) => {
    return initialValues[code] && initialValues[code].code;
  };

  const paymentLen = Object.keys(initialValues);

  const dispatch = useAppDispatch();

  const { userInfo } = useGetClient();
  const csrfToken = userInfo?.csrfToken;

  const [updatePaymentAvailability] = useMutation(
    UPDATE_OFFLINE_PAYMENT_AVAILABILITY,
    {
      context: {
        headers: {
          'x-csrf-token': csrfToken
        }
      },
      onCompleted: (data: {
        updateOfflinePaymentAvailability: {
          code: string;
          etag: EtagGroupsType;
        };
      }) => {
        if (!isEmpty(data.updateOfflinePaymentAvailability.code)) {
          notify(t('common:successfully-updated'), 'success');
          const { etag: newEtag } = data.updateOfflinePaymentAvailability ?? {};
          dispatch(setEtag({ etag: newEtag }));
        }
      }
    }
  );

  useErrorLogger(error);

  const onPaymentChange = (checked, code) => {
    updatePaymentAvailability({
      variables: {
        code,
        active: checked
      }
    }).catch((err) => {
      setError(err);
    });
  };

  return (
    <section className="relative mt-20 rounded-md border bg-white p-5 shadow-sm">
      {loading && (
        <div className="absolute top-0 right-0 left-0 bottom-0 z-10 flex items-center justify-center">
          <div
            style={{ backdropFilter: 'blur(1px)' }}
            className="absolute inset-0 h-full w-full"
          ></div>
          <div className="z-10">
            <Loader special />
          </div>
        </div>
      )}
      <div className="flex items-center border-b pb-5">
        <h2 className="text-lg font-medium text-gray-700">
          Offline Payment Methods
        </h2>
        {paymentLen.length > 0 && (
          <span className="mx-2 font-medium text-blue-600">{`${paymentLen.length} visible on storefront`}</span>
        )}
      </div>
      <div className="flex items-center justify-between border-b py-5">
        <h3 className="font-heading font-semibold">
          {t('common:form-title-bank-deposit')}
        </h3>
        <div className="relative flex items-center justify-center">
          {checkOfflineAvailability(offlinePaymentCodes.bankDeposit) && (
            <div className="mr-3">
              <SwitchComponent
                value={initialValues[offlinePaymentCodes.bankDeposit]?.active}
                onChange={(checked) =>
                  onPaymentChange(checked, offlinePaymentCodes.bankDeposit)
                }
              />
            </div>
          )}
          <Link href={`${ROUTES.PAYMENT}/${offlinePaymentCodes.bankDeposit}`}>
            <Button
              variant="outline"
              type="button"
              className="!rounded-md !border-blue-600 !text-blue-600 hover:!text-white"
            >
              {checkOfflineAvailability(offlinePaymentCodes.bankDeposit) ? (
                <span>Edit</span>
              ) : (
                <span>Set up</span>
              )}
            </Button>
          </Link>
        </div>
      </div>
      <div className="flex items-center justify-between border-b py-5">
        <h3 className="font-heading font-semibold">
          {t('common:form-title-cod')}
        </h3>
        <div className="relative flex items-center justify-center">
          {checkOfflineAvailability(offlinePaymentCodes.cod) && (
            <div className="mr-3">
              <SwitchComponent
                value={initialValues[offlinePaymentCodes.cod]?.active}
                onChange={(checked) =>
                  onPaymentChange(checked, offlinePaymentCodes.cod)
                }
              />
            </div>
          )}
          <Link href={`${ROUTES.PAYMENT}/${offlinePaymentCodes.cod}`}>
            <Button
              variant="outline"
              type="button"
              className="!rounded-md !border-blue-600 !text-blue-600 hover:!text-white"
            >
              {checkOfflineAvailability(offlinePaymentCodes.cod) ? (
                <span>Edit</span>
              ) : (
                <span>Set up</span>
              )}
            </Button>
          </Link>
        </div>
      </div>
      <div className="flex items-center justify-between border-b py-5">
        <h3 className="font-heading font-semibold">
          {t('common:form-title-check')}
        </h3>
        <div className="relative flex items-center justify-center">
          {checkOfflineAvailability(offlinePaymentCodes.cheque) && (
            <div className="mr-3">
              <SwitchComponent
                value={initialValues[offlinePaymentCodes.cheque]?.active}
                onChange={(checked) =>
                  onPaymentChange(checked, offlinePaymentCodes.cheque)
                }
              />
            </div>
          )}
          <Link href={`${ROUTES.PAYMENT}/${offlinePaymentCodes.cheque}`}>
            <Button
              variant="outline"
              type="button"
              className="!rounded-md !border-blue-600 !text-blue-600 hover:!text-white"
            >
              {checkOfflineAvailability(offlinePaymentCodes.cheque) ? (
                <span>Edit</span>
              ) : (
                <span>Set up</span>
              )}
            </Button>
          </Link>
        </div>
      </div>
      <div className="flex items-center justify-between border-b py-5">
        <h3 className="font-heading font-semibold">
          {t('common:form-title-money-order')}
        </h3>
        <div className="relative flex items-center justify-center">
          {checkOfflineAvailability(offlinePaymentCodes.moneyOrder) && (
            <div className="mr-3">
              <SwitchComponent
                value={initialValues[offlinePaymentCodes.moneyOrder]?.active}
                onChange={(checked) =>
                  onPaymentChange(checked, offlinePaymentCodes.moneyOrder)
                }
              />
            </div>
          )}
          <Link href={`${ROUTES.PAYMENT}/${offlinePaymentCodes.moneyOrder}`}>
            <Button
              variant="outline"
              type="button"
              className="!rounded-md !border-blue-600 !text-blue-600 hover:!text-white"
            >
              {checkOfflineAvailability(offlinePaymentCodes.moneyOrder) ? (
                <span>Edit</span>
              ) : (
                <span>Set up</span>
              )}
            </Button>
          </Link>
        </div>
      </div>
      <div className="flex items-center justify-between py-5 pb-3">
        <h3 className="font-heading font-semibold">
          {t('common:form-title-pay-in-store')}
        </h3>
        <div className="relative flex items-center justify-center">
          {checkOfflineAvailability(offlinePaymentCodes.inStore) && (
            <div className="mr-3">
              <SwitchComponent
                value={initialValues[offlinePaymentCodes.inStore]?.active}
                onChange={(checked) =>
                  onPaymentChange(checked, offlinePaymentCodes.inStore)
                }
              />
            </div>
          )}
          <Link href={`${ROUTES.PAYMENT}/${offlinePaymentCodes.inStore}`}>
            <Button
              variant="outline"
              type="button"
              className="!rounded-md !border-blue-600 !text-blue-600 hover:!text-white"
            >
              {checkOfflineAvailability(offlinePaymentCodes.inStore) ? (
                <span>Edit</span>
              ) : (
                <span>Set up</span>
              )}
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

const SwitchComponent = ({ onChange, value }) => {
  return (
    <Switch
      checked={value}
      onChange={onChange}
      className={classNames(
        'h-[25px] w-[50px]',
        'relative inline-flex items-center rounded-full border',
        value ? 'bg-blue-500' : 'bg-gray-300'
      )}
    >
      <span
        className={classNames(
          'h-[25px] w-[25px]',
          value ? 'translate-x-6' : 'translate-x-0',
          'inline-block transform rounded-full border bg-light'
        )}
      />
    </Switch>
  );
};

export default OfflinePayments;
