import { useMutation, useQuery } from '@apollo/client';
import Card from '@components/common/card';
import { ArrowPrev } from '@components/icons/arrow-prev';
import { DownloadFileIcon } from '@components/icons/download-file-icon';
import AppLayout from '@components/layouts/app';
import InvoicePdf from '@components/order/invoice-pdf';
import Button from '@components/ui/button';
import ErrorMessage from '@components/ui/error-message';
import Label from '@components/ui/label';
import Loader from '@components/ui/loader/loader';
import SelectInput from '@components/ui/select-input';
import { ORDER, STORE_INFO_ORDER, UPDATE_STATUS_ORDER } from '@graphql/order';
import { ORDER_STATUSES_FOR_SELECT } from '@graphql/order-status';
import { useErrorLogger } from '@hooks/useErrorLogger';
import { useGetClient } from '@hooks/useGetClient';
import { useSettings } from '@hooks/useSettings';
import { notify } from '@lib/notify';
import { verifyAuth, XSRFHandler } from '@middleware/utils';
import { SSRProps } from '@ts-types/custom.types';
import { OrderBy, SortOrder } from '@ts-types/enums';
import {
  CustomerAddressType,
  CustomerType,
  OrderStatus,
  OrderType,
  Product,
  SettingsType
} from '@ts-types/generated';
import { formatAddress } from '@utils/format-address';
import { ROUTES } from '@utils/routes';
import usePrice from '@utils/use-price';
import dayjs from 'dayjs';
import { isEmpty } from 'lodash';
import { GetServerSideProps } from 'next';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

const Table = dynamic(
  () => import('@components/ui/table').then((mod) => mod.Table),
  { ssr: false, loading: () => <Loader text={'Loading'} /> }
);

const PDFDownloadLink = dynamic(
  () => import('@react-pdf/renderer').then((mod) => mod.PDFDownloadLink),
  { ssr: false, loading: () => <Loader text={'Loading'} /> }
);

type FormValues = OrderType;

interface TOrder {
  order: OrderType;
  customer: CustomerType;
  products: Product[];
}

interface TStoreInfoOrder {
  storeInfoOrder: SettingsType;
}

interface OrderVariable {
  orderId: string;
  etag: string;
}

export interface QueryVariables {
  page: number;
  limit: number;
  orderBy: OrderBy;
  sortedBy: SortOrder;
  etag: string;
}

interface TOrderStatus {
  orderStatusForSelect: OrderStatus[];
}
export default function OrderDetailsPage({ client }: SSRProps) {
  const { t } = useTranslation();
  const { query, back } = useRouter();

  const orderId = query.orderId as string;

  const [error, setError] = useState(null);
  const [displayBillAdds, setDisplayBillAdds] = useState(false);
  const [displayShipAdds, setDisplayShipAdds] = useState(false);

  const {
    userInfo: { csrfToken, store: { etag } = {} }
  } = useGetClient(client);

  const {
    data: orderStatusData,
    loading: orderStatusLoading,
    error: orderStatusError
  } = useQuery<TOrderStatus, QueryVariables>(ORDER_STATUSES_FOR_SELECT, {
    variables: {
      page: 1,
      limit: 999,
      orderBy: OrderBy.CREATED_AT,
      sortedBy: SortOrder.Desc,
      etag: etag?.orderStatusEtag
    },
    fetchPolicy: 'cache-and-network',
    skip: isEmpty(etag)
  });

  const {
    data: orderData,
    loading,
    error: orderError
  } = useQuery<TOrder, OrderVariable>(ORDER, {
    variables: {
      orderId,
      etag: etag?.orderEtag
    },
    fetchPolicy: 'cache-and-network',
    skip: isEmpty(etag)
  });

  const { data: storeInfoOrderData, error: storeInfoOrderError } = useQuery<
    TStoreInfoOrder,
    { etag: string }
  >(STORE_INFO_ORDER, {
    variables: {
      etag: etag?.configEtag
    },
    fetchPolicy: 'cache-and-network',
    skip: isEmpty(etag)
  });

  const [updateOrderStatus, { loading: updatingStatus }] = useMutation(
    UPDATE_STATUS_ORDER,
    {
      context: {
        headers: {
          'x-csrf-token': csrfToken
        }
      },
      onCompleted: (data: { updateStatusOrder: OrderStatus }) => {
        const { updateStatusOrder } = data;
        if (updateStatusOrder?.id) {
          notify(t('common:successfully-updated'), 'success');
        }
      }
    }
  );

  const { order } = orderData ?? {};
  const { storeInfoOrder } = storeInfoOrderData ?? {};
  const { orderStatusForSelect } = orderStatusData ?? {};

  const { handleSubmit, control, setValue } = useForm<FormValues>({
    defaultValues: {}
  });

  const { systemCurrency } = useSettings();

  useEffect(() => {
    const { deliveryStatus, orderStatus, paymentStatus } = (order ??
      {}) as OrderType;
    deliveryStatus && setValue('deliveryStatus', deliveryStatus);
    orderStatus && setValue('orderStatus', orderStatus);
    paymentStatus && setValue('paymentStatus', paymentStatus);
  }, [order, setValue]);

  const ChangeStatus = ({
    orderStatus,
    deliveryStatus,
    paymentStatus
  }: FormValues) => {
    updateOrderStatus({
      variables: {
        id: order.id,
        orderStatus: { id: orderStatus?.id },
        deliveryStatus: { id: deliveryStatus?.id },
        paymentStatus: { id: paymentStatus?.id }
      }
    }).catch((err) => {
      setError(err);
    });
  };

  useErrorLogger(error);
  useErrorLogger(orderError);
  useErrorLogger(orderStatusError);
  useErrorLogger(storeInfoOrderError);

  const { price: subTotalExclTax } = usePrice(
    order && {
      amount: order?.subTotalExclTax!
    }
  );
  const { price: subTotalInclTax } = usePrice(
    order && {
      amount: order?.subTotalInclTax!
    }
  );
  const { price: discountAmount } = usePrice(
    order && {
      amount: order?.discountAmount!
    }
  );
  const { price: grandTotalExclTax } = usePrice(
    order && {
      amount: order?.grandTotalExclTax!
    }
  );
  const { price: grandTotalInclTax } = usePrice(
    order && {
      amount: order?.grandTotalInclTax!
    }
  );
  const { price: shipmentTotalExclTax } = usePrice(
    order && {
      amount: order?.orderShipment?.totalExclTax ?? 0
    }
  );
  const { price: shipmentTotalInclTax } = usePrice(
    order && {
      amount: order?.orderShipment?.totalInclTax ?? 0
    }
  );

  const { price: totalTax } = usePrice({
    amount: order?.subTotalInclTax - order?.subTotalExclTax
  });

  if (loading) return <Loader text={t('common:text-loading')} />;
  if (error) return <ErrorMessage message={error.message} />;

  const columns = [
    {
      title: t('table:table-item-name'),
      dataIndex: 'product',
      key: 'product',
      align: 'left',
      render: (product: Product) => (
        <Link target="_blank" href={`${ROUTES.PRODUCT}/edit/${product.id}`}>
          <span className="font-medium text-accent underline">
            {product?.name}
          </span>
        </Link>
      )
    },
    {
      title: t('table:table-item-sku'),
      dataIndex: 'product',
      key: 'product',
      align: 'center',
      render: (product: Product) => <span>{product?.sku}</span>
    },
    {
      title: t('table:table-item-quantity'),
      dataIndex: 'totalQuantity',
      key: 'totalQuantity',
      align: 'center',
      render: (totalQuantity: number) => (
        <div>
          <span className="">{totalQuantity}</span>
        </div>
      )
    },
    {
      title: t('table:table-item-total'),
      dataIndex: 'totalInclTax',
      key: 'totalInclTax',
      align: 'center',
      render: (totalInclTax: number) => {
        return (
          <span className="text-base font-semibold text-heading">{`${systemCurrency?.symbol} ${totalInclTax}`}</span>
        );
      }
    }
  ];

  const renderDetailAddress = (address: CustomerAddressType) => {
    return (
      <div className="w-full max-w-[400px] border shadow">
        <div className="flex border-b px-2 py-1">
          <span className="font-medium text-black">Address:</span>
          <span className="text-md px-1">{address?.addressLine1}</span>
        </div>
        <div className="flex border-b px-2 py-1">
          <span className="font-medium text-black">Country:</span>
          <span className="text-md px-1">{address?.country?.name}</span>
        </div>
        <div className="flex border-b px-2 py-1">
          <span className="font-medium text-black">City:</span>
          <span className="text-md px-1">{address?.city}</span>
        </div>
        <div className="flex border-b px-2 py-1">
          <span className="font-medium text-black">State:</span>
          <span className="text-md px-1">{address?.state}</span>
        </div>
        <div className="flex border-b px-2 py-1">
          <span className="font-medium text-black">Postal code:</span>
          <span className="text-md px-1">{address?.postalCode}</span>
        </div>
      </div>
    );
  };

  const address = order?.customer?.address[0] ?? ({} as CustomerAddressType);

  return (
    <>
      <div className="mb-5 flex items-center justify-between">
        <Button variant="outline" onClick={() => back()} type="button">
          <span>
            <ArrowPrev />
          </span>
          <span className="text-base font-semibold">Back</span>
        </Button>
        <PDFDownloadLink
          document={
            <InvoicePdf
              storeInfoOrder={storeInfoOrder}
              order={order}
              systemCurrency={systemCurrency}
            />
          }
          fileName={`invoice-${order?.orderNumber}.pdf`}
        >
          {({ loading }: any) => (
            <Button
              loading={loading}
              disabled={loading}
              renderIcon={<DownloadFileIcon width="1.3rem" height="1.3rem" />}
            >
              Download Invoice
            </Button>
          )}
        </PDFDownloadLink>
      </div>
      <Card>
        <div className="mb-8">
          <h3 className="mb-8 w-full whitespace-nowrap text-center text-2xl font-semibold text-heading lg:mb-0 lg:w-1/3 lg:text-start">
            {t('form:input-label-order-id')} - {order?.orderNumber}
          </h3>
        </div>
        <form
          onSubmit={handleSubmit(ChangeStatus)}
          className="flex w-full flex-col items-center justify-center lg:flex-row"
        >
          <div className="z-30 mb-3 w-full lg:mb-0 lg:me-5">
            <Label>{t('form:input-label-order-status')}</Label>
            <SelectInput
              name="orderStatus"
              control={control}
              getOptionLabel={(option: any) => option.label}
              getOptionValue={(option: any) => option.id}
              options={orderStatusForSelect}
              loading={orderStatusLoading || loading}
              placeholder={t('form:input-placeholder-order-status')}
            />
          </div>
          <div className="z-20 mb-3 w-full lg:mb-0 lg:me-5">
            <Label>{t('form:input-label-payment-status')}</Label>
            <SelectInput
              name="paymentStatus"
              control={control}
              getOptionLabel={(option: any) => option.label}
              getOptionValue={(option: any) => option.id}
              options={orderStatusForSelect}
              loading={orderStatusLoading || loading}
              placeholder={t('form:input-placeholder-order-status')}
            />
          </div>
          <div className="z-10 mb-3 w-full lg:mb-0 lg:me-5">
            <Label>{t('form:input-label-delivery-status')}</Label>
            <SelectInput
              name="deliveryStatus"
              control={control}
              getOptionLabel={(option: any) => option.label}
              getOptionValue={(option: any) => option.id}
              options={orderStatusForSelect}
              loading={orderStatusLoading || loading}
              placeholder={t('form:input-placeholder-order-status')}
            />
          </div>
          <Button loading={updatingStatus} className="mt-5">
            {t('form:button-label-update-status')}
          </Button>
        </form>
        <div className="my-10 flex flex-col justify-between lg:flex-row">
          {order?.items?.length > 0 ? (
            <div className="mb-4 w-full lg:w-[65%]">
              <h3 className="mb-3 font-semibold text-heading">
                {t('table:table-item-products')}
              </h3>
              <Table
                //@ts-ignore
                columns={columns}
                emptyText={t('table:empty-table-data')}
                data={order?.items! ?? []}
                rowKey={(record) => record?.product?.id}
                scroll={{ x: 300 }}
                className="rounded-sm border"
              />
            </div>
          ) : (
            <span>{t('common:no-order-found')}</span>
          )}

          <div className="w-full lg:w-[33%]">
            <h3 className="mb-3 font-semibold text-heading">
              {t('table:table-item-summary')}
            </h3>
            {/* Section 1 */}
            <section className="flex w-full flex-col rounded-md border border-border-200 px-4 py-2 shadow-sm ms-auto">
              <div className="flex items-center justify-between border-b border-dashed py-2 text-sm text-body">
                <span className="text-base text-gray-900">
                  {t('common:order-sub-total')}
                </span>
                <div className="flex flex-col items-end">
                  <span className="text-base font-medium text-gray-700">
                    {subTotalInclTax}
                  </span>
                  <div className="flex items-center justify-center text-xs text-gray-800">
                    <span>{t('common:order-excl-tax')}</span>
                    <span>{subTotalExclTax}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between border-b border-dashed py-2 text-sm text-body">
                <div className="flex items-center text-base text-gray-900">
                  <div>{t('common:order-discount')}</div>
                  {order?.coupon?.id && (
                    <Link
                      target="_blank"
                      href={`${ROUTES.COUPON}/edit/${order?.coupon?.id}`}
                    >
                      <div className="mx-1 text-xs text-accent hover:underline">
                        [{order?.coupon?.code}]
                      </div>
                    </Link>
                  )}
                </div>
                <span className="text-base font-medium text-gray-800">{`- ${discountAmount}`}</span>
              </div>
              <div className="flex items-center justify-between border-b border-dashed py-2 text-sm text-body">
                <span className="text-base text-gray-900">
                  {t('common:order-tax-rate')}
                </span>
                <div className="flex flex-col items-end">
                  <span className="text-base font-medium text-gray-800">{`${order?.tax?.rate}%`}</span>
                </div>
              </div>
              <div className="flex items-center justify-between border-b border-dashed py-2 text-sm text-body">
                <span className="text-base text-gray-900">
                  {t('common:order-tax-amount')}
                </span>
                <div className="flex flex-col items-end">
                  <span className="text-base font-medium text-gray-800">
                    {totalTax}
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between py-2 text-base font-semibold">
                <span className="text-lg text-black">
                  {t('common:order-total')}
                </span>
                <div className="flex flex-col items-end">
                  <span className="text-lg font-semibold text-black">
                    {grandTotalInclTax}
                  </span>
                  <div className="flex items-center justify-center text-xs text-gray-800">
                    <span>{t('common:order-excl-tax')}</span>
                    <span>{grandTotalExclTax}</span>
                  </div>
                </div>
              </div>
            </section>
            {/* Section 2 */}
            <section className="mt-5 flex w-full flex-col rounded-md border border-border-200 px-4 py-2 shadow-sm ms-auto">
              <div className="flex items-center justify-between border-b border-dashed py-2 text-sm text-body">
                <span className="text-md text-gray-900">Payment method</span>
                <span className="text-md font-medium text-gray-700">
                  {order?.payment?.code}
                </span>
              </div>
              <div className="flex items-center justify-between border-b border-dashed py-2 text-sm text-body">
                <span className="text-md text-gray-900">Shipment method</span>
                <Link
                  target="_blank"
                  href={`${ROUTES.SHIPPING_ZONE}/edit/${order?.orderShipment?.shipment?.id}`}
                >
                  <div className="text-md text-accent hover:underline">
                    {order?.orderShipment?.shipment?.name}
                  </div>
                </Link>
              </div>
              <div className="flex items-center justify-between border-b border-dashed py-2 text-sm text-body">
                <span className="text-md text-gray-900">Total weight</span>
                <span className="text-md font-medium text-gray-700">
                  {order?.orderShipment?.totalWeight
                    ? `${order?.orderShipment?.totalWeight / 1000} kg`
                    : 'N/A'}
                </span>
              </div>
              <div className="flex items-center justify-between border-dashed py-2 text-sm text-body">
                <span className="text-md font-semibold text-black">
                  Shipment total
                </span>
                <div className="flex flex-col items-end">
                  <span className="text-md font-semibold text-black">
                    {shipmentTotalInclTax}
                  </span>
                  <div className="flex items-center justify-center text-xs font-semibold text-gray-800">
                    <span>{t('common:order-excl-tax')}</span>
                    <span>{shipmentTotalExclTax}</span>
                  </div>
                </div>
              </div>
            </section>
            {/* Section 3 */}
            <section className="mt-5 flex w-full flex-col rounded-md border border-border-200 px-4 py-2 shadow-sm ms-auto">
              <div className="flex items-center justify-between border-b border-dashed py-2 text-sm text-body">
                <span className="text-md text-gray-900">
                  {t('form:input-label-currency')}
                </span>
                <span className="text-md text-gray-600">
                  {order?.currency?.code}
                </span>
              </div>
              <div className="flex items-center justify-between border-b border-dashed py-2 text-sm text-body">
                <span className="text-md text-gray-900">Placed from IP</span>
                <div className="flex items-center justify-center">
                  {order?.orderGeo?.ip?.length !== 0 ? <Link href={`https://whatismyipaddress.com/ip/${order?.orderGeo?.ip}`} target='_blank'>
                    <span className="text-md text-blue-500 hover:underline">
                      {order?.orderGeo?.ip?.length !== 0
                        ? order?.orderGeo?.ip
                        : 'N/A'}
                    </span>
                  </Link> : <span className="text-md text-gray-600">N/A</span>}
                </div>
              </div>
              <div className="flex items-center justify-between border-b border-dashed py-2 text-sm text-body">
                <span className="text-md text-gray-900">IP geo info</span>
                <div className="flex items-center justify-center">
                  {order?.orderGeo?.geo ? (
                    <>
                      <span title="Country" className="text-md text-gray-600">
                        {order?.orderGeo?.geo?.country}
                      </span>
                      <span className="mx-2 h-[10px] w-[2px] bg-gray-300"></span>
                      <span title="City" className="text-md text-gray-600">
                        {order?.orderGeo?.geo?.city}
                      </span>
                      <span className="mx-2 h-[10px] w-[2px] bg-gray-300"></span>
                      <span title="TimeZone" className="text-md text-gray-600">
                        {order?.orderGeo?.geo?.timezone}
                      </span>
                    </>
                  ) : (
                    <span className="text-md text-gray-600">N/A</span>
                  )}
                </div>
              </div>
              <div className="flex items-center justify-between border-dashed py-2 text-sm text-body">
                <span className="text-md text-gray-900">Order Date</span>
                <span className="text-md text-gray-600">
                  {`${dayjs(order?.createdAt).format('MMM D, YYYY')} at ${dayjs(
                    order?.createdAt
                  ).format('h:mm A')}`}
                </span>
              </div>
            </section>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between">
          <div className="mb-10 w-full sm:mb-0 sm:w-1/2 sm:pe-8">
            <h3 className="mb-3 border-b border-border-200 pb-2 font-semibold text-heading">
              {t('common:billing-address')}
            </h3>
            <div className="text-md flex flex-col items-start space-y-1 text-gray-700">
              <Link href={`${ROUTES.CUSTOMER}/edit/${order?.customer?.id}`}>
                <div className="text-accent hover:underline">
                  {order?.customer?.fullName}
                </div>
              </Link>
              {address && (
                <button
                  className="text-start hover:text-black"
                  onClick={() => setDisplayShipAdds((v) => !v)}
                >
                  <span>{formatAddress(address)}</span>
                </button>
              )}
              {address?.phoneNumber && <span>T: {address?.phoneNumber}</span>}
              {address?.email && <span>{address?.email}</span>}
              {displayShipAdds && renderDetailAddress(address)}
            </div>
          </div>

          <div className="w-full sm:w-1/2 sm:ps-8">
            <h3 className="mb-3 border-b border-border-200 pb-2 text-start font-semibold text-heading sm:text-end">
              {t('common:shipping-address')}
            </h3>
            <div className="text-md flex flex-col items-end space-y-1 text-gray-700">
              <Link href={`${ROUTES.CUSTOMER}/edit/${order?.customer?.id}`}>
                <div className="text-accent hover:underline">
                  {order?.customer?.fullName}
                </div>
              </Link>
              {address && (
                <button
                  className="text-end hover:text-black"
                  onClick={() => setDisplayBillAdds((v) => !v)}
                >
                  <span>{formatAddress(address)}</span>
                </button>
              )}
              {address?.phoneNumber && <span>T: {address?.phoneNumber}</span>}
              {address?.email && <span>{address?.email}</span>}
              {displayBillAdds && renderDetailAddress(address)}
            </div>
          </div>
        </div>
      </Card>
    </>
  );
}

OrderDetailsPage.Layout = AppLayout;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { locale } = context;
  const { client } = await verifyAuth(context);

  if (!client) {
    return {
      redirect: {
        permanent: false,
        destination: ROUTES.LOGIN
      }
    };
  }

  const { csrfToken, csrfError } = await XSRFHandler(context);

  return {
    props: {
      ...(await serverSideTranslations(locale!, [
        'table',
        'common',
        'form',
        'error'
      ])),
      client: { ...(client ?? {}), csrfToken, csrfError }
    }
  };
};
