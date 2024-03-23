import { useQuery } from '@apollo/client';
import Card from '@components/common/card';
import AppLayout from '@components/layouts/app';
import Button from '@components/ui/button';
import ErrorMessage from '@components/ui/error-message';
import ValidationError from '@components/ui/form-validation-error';
import Loader from '@components/ui/loader/loader';
import ProgressBox from '@components/ui/progress-box/progress-box';
import SelectInput from '@components/ui/select-input';
import { ORDER, ORDERS } from '@graphql/order';
import { useErrorLogger } from '@hooks/useErrorLogger';
import { siteSettings } from '@settings/site.settings';
import {
  Attachment,
  CustomerType,
  OrderType,
  Product
} from '@ts-types/generated';
import { formatAddress } from '@utils/format-address';
import { useIsRTL } from '@utils/locals';
import { ROUTES } from '@utils/routes';
import usePrice from '@utils/use-price';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useForm } from 'react-hook-form';

const Table = dynamic(
  () => import('@components/ui/table').then((mod) => mod.Table),
  { ssr: false, loading: () => <Loader text={'Loading'} /> }
);

type FormValues = {
  order_status: any;
};

interface TOrder {
  order: OrderType;
  customer: CustomerType;
  products: Product[];
}

interface OrderVariable {
  orderId: string;
}

export default function OrderDetailsPage() {
  const { t } = useTranslation();
  const { query } = useRouter();
  const { alignLeft, alignRight } = useIsRTL();
  const orderId = query.orderId as string;

  const { data, loading, error } = useQuery<TOrder, OrderVariable>(ORDER, {
    variables: {
      orderId
    },
    fetchPolicy: 'cache-and-network'
  });

  const { order } = data ?? {};

  useErrorLogger(error);

  const orderStatusData = [];
  const updating = false;

  const {
    handleSubmit,
    control,
    formState: { errors }
  } = useForm<FormValues>({
    defaultValues: { order_status: data?.order?.status?.id ?? '' }
  });

  const ChangeStatus = ({ order_status }: FormValues) => {
    // updateOrder({
    //   variables: {
    //     id: data?.order?.id as string,
    //     input: {
    //       status: order_status?.id as string,
    //     },
    //   },
    // });
  };
  const { price: subtotal } = usePrice(
    data && {
      amount: 3342 //data?.order?.amount!,
    }
  );

  if (loading) return <Loader text={t('common:text-loading')} />;
  if (error) return <ErrorMessage message={error.message} />;

  const columns = [
    {
      dataIndex: 'image',
      key: 'image',
      width: 70,
      render: (image: Attachment) => (
        <Image
          src={image?.thumbnail ?? siteSettings.product.placeholder}
          alt="alt text"
          layout="fixed"
          width={50}
          height={50}
        />
      )
    },
    {
      title: t('table:table-item-products'),
      dataIndex: 'name',
      key: 'name',
      align: alignLeft,
      render: (name: string, item: any) => (
        <div>
          <span>{name}</span>
          <span className="mx-2">x</span>
          <span className="font-semibold text-heading">
            {item.pivot.order_quantity}
          </span>
        </div>
      )
    },
    {
      title: t('table:table-item-total'),
      dataIndex: 'price',
      key: 'price',
      align: alignRight,
      render: (_: any, item: any) => {
        // const { price } = usePrice({
        //   amount: parseFloat(item.pivot.subtotal),
        // });
        // return <span>{price}</span>;
        return <span>{12}</span>;
      }
    }
  ];

  return (
    <Card>
      <div className="flex flex-col items-center lg:flex-row">
        <h3 className="mb-8 w-full whitespace-nowrap text-center text-2xl font-semibold text-heading lg:mb-0 lg:w-1/3 lg:text-start">
          {t('form:input-label-order-id')} - {order?.orderNumber}
        </h3>

        <form
          onSubmit={handleSubmit(ChangeStatus)}
          className="flex w-full items-start ms-auto lg:w-2/4"
        >
          <div className="z-20 w-full me-5">
            <SelectInput
              name="order_status"
              control={control}
              getOptionLabel={(option: any) => option.name}
              getOptionValue={(option: any) => option.id}
              options={orderStatusData?.order_statuses?.data}
              placeholder={t('form:input-placeholder-order-status')}
            />

            <ValidationError message={t(errors?.order_status?.message)} />
          </div>
          <Button loading={updating}>
            <span className="hidden sm:block">
              {t('form:button-label-change-status')}
            </span>
            <span className="block sm:hidden">
              {t('form:form:button-label-change')}
            </span>
          </Button>
        </form>
      </div>

      <div className="my-5 flex items-center justify-center lg:my-10">
        {/* <ProgressBox
          data={orderStatusData?.order_statuses?.data}
          status={data?.order?.status?.serial!}
        /> */}
      </div>

      <div className="mb-10">
        {!data?.order ? (
          <Table
            //@ts-ignore
            columns={columns}
            emptyText={t('table:empty-table-data')}
            data={data?.order?.products! ?? []}
            rowKey="id"
            scroll={{ x: 300 }}
          />
        ) : (
          <span>{t('common:no-order-found')}</span>
        )}

        <div className="mt-2 flex w-full flex-col space-y-2 border-t-4 border-double border-border-200 px-4 py-4 ms-auto sm:w-1/2 md:w-1/3">
          <div className="flex items-center justify-between text-sm text-body">
            <span>{t('common:order-sub-total')}</span>
            <span>{subtotal}</span>
          </div>
          <div className="flex items-center justify-between text-sm text-body">
            <span>{t('common:order-tax')}</span>
            <span>{subtotal}</span>
          </div>
          <div className="flex items-center justify-between text-sm text-body">
            <span>{t('common:order-delivery-fee')}</span>
            <span>{subtotal}</span>
          </div>
          <div className="flex items-center justify-between text-sm text-body">
            <span>{t('common:order-discount')}</span>
            <span>{subtotal}</span>
          </div>
          <div className="flex items-center justify-between text-base font-semibold text-heading">
            <span>{t('common:order-total')}</span>
            <span>{subtotal}</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between">
        <div className="mb-10 w-full sm:mb-0 sm:w-1/2 sm:pe-8">
          <h3 className="mb-3 border-b border-border-200 pb-2 font-semibold text-heading">
            {t('common:billing-address')}
          </h3>

          <div className="text-md flex flex-col items-start space-y-1 text-gray-700">
            <Link href={`${ROUTES.CUSTOMER}/${order?.customer?.id}`}>
              <div className="underline">{order?.customer?.fullName}</div>
            </Link>
            {order?.customer?.address && (
              <span>{formatAddress(order?.customer?.address)}</span>
            )}
            {order?.customer?.address?.phoneNumber && (
              <span>{order?.customer?.address?.phoneNumber}</span>
            )}
          </div>
        </div>

        <div className="w-full sm:w-1/2 sm:ps-8">
          <h3 className="mb-3 border-b border-border-200 pb-2 text-start font-semibold text-heading sm:text-end">
            {t('common:shipping-address')}
          </h3>

          <div className="text-md flex flex-col items-end space-y-1 text-gray-700">
            <Link href={`${ROUTES.CUSTOMER}/${order?.customer?.id}`}>
              <div className="underline">{order?.customer?.fullName}</div>
            </Link>
            {order?.customer?.address && (
              <span>{formatAddress(order?.customer?.address)}</span>
            )}
            {order?.customer?.address?.phoneNumber && (
              <span>{order?.customer?.address?.phoneNumber}</span>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}

OrderDetailsPage.Layout = AppLayout;

export const getServerSideProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common', 'form', 'table']))
  }
});
