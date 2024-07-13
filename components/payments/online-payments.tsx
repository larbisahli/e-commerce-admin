import Button from '@components/ui/button';
import SwitchInput from '@components/ui/switch-input';
import { ROUTES } from '@utils/routes';
import { isEmpty } from 'lodash';
import { useTranslation } from 'next-i18next';
import Image from 'next/image';
import Link from 'next/link';
import { useForm } from 'react-hook-form';

type FormValues = any;

const defaultValues = null;

const OnlinePayments = ({ initialValues }) => {
  const { t } = useTranslation();

  const {
    control,
    formState: { errors }
  } = useForm<FormValues>({
    defaultValues: isEmpty(initialValues) ? defaultValues : initialValues
  });

  const checkOfflineAvailability = (name) => {
    return initialValues[name] && initialValues[name].id;
  };

  return (
    <section className="mt-20 rounded-md border bg-white p-5 shadow-sm">
      <div className="flex items-center border-b pb-5">
        <h2 className="text-lg font-medium text-gray-700">
          Online Payment Methods
        </h2>
        <span className="mx-2 font-medium uppercase text-blue-600">
          Coming soon
        </span>
      </div>
      <div className="relative flex items-center justify-between py-5 pb-2 opacity-50">
        <div className="absolute top-0 left-0 right-0 bottom-0"></div>
        <Image
          alt="paypal-logo"
          src={'/static/images/paypal_logo.svg'}
          width={100}
          height={100}
        />
        <div className="flex items-center justify-center">
          {checkOfflineAvailability('paypal') && (
            <div className="mr-3">
              <SwitchInput
                name="paypal.active"
                label=""
                control={control}
                size="large"
              />
            </div>
          )}
          <Link href={`${ROUTES.PAYMENT}/paypal`}>
            <Button
              variant="outline"
              type="button"
              className="!rounded-md !border-blue-600 !text-blue-600 hover:!text-white"
            >
              {checkOfflineAvailability('bankDeposit') ? (
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

export default OnlinePayments;
