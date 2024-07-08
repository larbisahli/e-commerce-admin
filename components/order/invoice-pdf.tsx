import {
  Document,
  Font,
  Page,
  StyleSheet,
  Text,
  View
} from '@react-pdf/renderer';
import { siteSettings } from '@settings/site.settings';
import {
  CustomerAddressType,
  OrderType,
  SettingsType
} from '@ts-types/generated';
import { formatAddress } from '@utils/format-address';
import { formatPrice, formatVariantPrice } from '@utils/use-price';
import dayjs from 'dayjs';
import { useMemo } from 'react';

type PriceProps = {
  amount: number;
  baseAmount?: number;
  currencyCode?: string;
};

function usePrice(data: PriceProps | null, systemCurrency: any) {
  const { amount, baseAmount } = data ?? {};
  const currencyCode = systemCurrency.code;
  const locale = siteSettings.defaultLanguage;
  const value = useMemo(() => {
    if (typeof amount !== 'number' || !currencyCode) return '';

    return baseAmount
      ? formatVariantPrice({ amount, baseAmount, currencyCode, locale })
      : formatPrice({ amount, currencyCode, locale });
  }, [amount, baseAmount, currencyCode, locale]);

  return typeof value === 'string'
    ? { price: value, basePrice: null, discount: null }
    : value;
}

export default function InvoicePdf({
  storeInfoOrder,
  order,
  systemCurrency
}: {
  storeInfoOrder: SettingsType;
  order: OrderType;
  systemCurrency: SettingsType['systemCurrency'];
}) {
  const { price: subTotalInclTax } = usePrice(
    order && {
      amount: order?.subTotalInclTax!
    },
    systemCurrency
  );
  const { price: discountAmount } = usePrice(
    order && {
      amount: order?.discountAmount!
    },
    systemCurrency
  );
  const { price: grandTotalInclTax } = usePrice(
    order && {
      amount: order?.grandTotalInclTax!
    },
    systemCurrency
  );
  const { price: shipmentTotalInclTax } = usePrice(
    order && {
      amount: order?.orderShipment?.totalInclTax ?? 0
    },
    systemCurrency
  );

  const { price: totalTax } = usePrice(
    {
      amount: order?.subTotalInclTax - order?.subTotalExclTax
    },
    systemCurrency
  );

  const customerAddress =
    order?.customer?.address[0] ?? ({} as CustomerAddressType);

  return (
    <Document>
      <Page size="A4">
        <View style={styles.container}>
          <View style={styles.addressWrapper}>
            {/* CUSTOMER ADDRESS */}
            <View style={styles.section}>
              <Text style={[styles.addressText, { marginBottom: 20 }]}>
                Invoice No:
                <Text style={{ color: '#374151', fontFamily: 'Lato Bold' }}>
                  {order?.orderNumber}
                </Text>
              </Text>
              <Text
                style={[
                  styles.addressText,
                  { color: '#374151', fontFamily: 'Lato Bold', fontSize: 12 }
                ]}
              >
                {order?.customer?.fullName}
              </Text>
              <Text style={styles.addressText}>{customerAddress?.email}</Text>
              <Text style={styles.addressText}>
                {customerAddress?.phoneNumber}
              </Text>
              <Text style={styles.addressText}>
                {formatAddress(customerAddress)}
              </Text>
            </View>
            {/* STORE ADDRESS */}
            <View style={[styles.section]}>
              <Text style={[styles.addressTextRight, { marginBottom: 20 }]}>
                Date: {dayjs().format('D MMMM, YYYY')}
              </Text>
              <Text
                style={[
                  styles.addressTextRight,
                  { color: '#374151', fontFamily: 'Lato Bold', fontSize: 12 }
                ]}
              >
                {storeInfoOrder?.storeName}
              </Text>
              <Text style={styles.addressTextRight}>
                {storeInfoOrder?.storeEmail}
              </Text>
              <Text style={styles.addressTextRight}>
                {`+${storeInfoOrder?.storeNumber}`}
              </Text>
              <Text style={styles.addressTextRight}>
                {storeInfoOrder?.addressLine1}
              </Text>
            </View>
          </View>
          {/* PRODUCT TABLE */}
          <View style={styles.orderTable}>
            {order?.items?.map((item, index) => (
              <View key={index} style={styles.tbody}>
                <View style={styles.tr}>
                  <Text style={[styles.td, { flex: 1 }]}>
                    {item.product?.name}
                  </Text>
                  <Text style={[styles.td, { flex: 1 }]}>
                    x {item?.totalQuantity ?? 0}
                  </Text>
                  <Text style={[styles.td, { width: 100, textAlign: 'right' }]}>
                    {`${systemCurrency?.symbol} ${item?.totalInclTax}`}
                  </Text>
                </View>
              </View>
            ))}
          </View>
          {/* Border */}
          <View style={styles.singleBorder} />

          {/* Total */}
          <View style={styles.totalCountWrapper}>
            <View style={styles.totalCountRow}>
              <Text style={styles.totalCountCell}>Sub total</Text>
              <Text style={styles.totalCountCell}>{subTotalInclTax}</Text>
            </View>
            <View style={styles.totalCountRow}>
              <Text style={styles.totalCountCell}>Discount</Text>
              <Text style={styles.totalCountCell}>{`-${discountAmount}`}</Text>
            </View>
            <View style={styles.totalCountRow}>
              <Text style={styles.totalCountCell}>Tax</Text>
              <Text
                style={styles.totalCountCell}
              >{`${order?.tax?.rate}%`}</Text>
            </View>
            <View style={styles.totalCountRow}>
              <Text style={styles.totalCountCell}>Tax amount</Text>
              <Text style={styles.totalCountCell}>{totalTax}</Text>
            </View>
            <View style={styles.totalCountRow}>
              <Text style={styles.totalCountCell}>Delivery fee</Text>
              <Text style={styles.totalCountCell}>{shipmentTotalInclTax}</Text>
            </View>
            <View style={styles.totalCountRow}>
              <Text
                style={[
                  styles.totalCountCell,
                  { fontSize: 12, fontFamily: 'Lato Bold' }
                ]}
              >
                Total
              </Text>
              <Text
                style={[
                  styles.totalCountCell,
                  { fontSize: 12, fontFamily: 'Lato Bold' }
                ]}
              >
                {grandTotalInclTax}
              </Text>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
}

Font.register({
  family: 'Lato',
  src: `https://fonts.gstatic.com/s/lato/v16/S6uyw4BMUTPHjx4wWw.ttf`
});

Font.register({
  family: 'Lato Bold',
  src: `https://fonts.gstatic.com/s/lato/v16/S6u9w4BMUTPHh6UVSwiPHA.ttf`
});

const styles = StyleSheet.create({
  container: {
    maxWidth: 600,
    flex: 1,
    margin: '50pt',
    fontFamily: 'Lato'
  },

  addressWrapper: {
    display: 'flex',
    width: '100%',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: 30
  },

  section: {
    width: '40%',
    display: 'flex',
    flexDirection: 'column'
  },

  addressText: {
    fontSize: 11,
    color: '#6B7280',
    fontWeight: 400,
    marginBottom: 5
  },
  addressTextRight: {
    fontSize: 11,
    color: '#6B7280',
    fontWeight: 400,
    marginBottom: 5,
    textAlign: 'right'
  },

  orderTable: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column'
  },

  thead: {
    width: '100%',
    backgroundColor: '#F3F4F6',
    display: 'flex',
    flexDirection: 'row'
  },

  th: {
    fontSize: 11,
    fontFamily: 'Lato Bold',
    color: '#374151',
    padding: '12pt 16pt',
    borderRightWidth: 1,
    borderRightColor: '#ffffff',
    borderRightStyle: 'solid'
  },

  tbody: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column'
  },

  tr: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row'
  },

  td: {
    fontSize: 11,
    color: '#6B7280',
    padding: '12pt 16pt',
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
    borderTopStyle: 'solid',
    borderRightWidth: 1,
    borderRightColor: '#ffffff',
    borderRightStyle: 'solid'
  },

  singleBorder: {
    width: '50%',
    display: 'flex',
    marginLeft: 'auto',
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
    borderTopStyle: 'solid',
    marginBottom: 2
  },

  totalCountWrapper: {
    width: '50%',
    display: 'flex',
    flexDirection: 'column',
    marginLeft: 'auto',
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
    borderTopStyle: 'solid'
  },

  totalCountRow: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },

  totalCountCell: {
    fontSize: 11,
    color: '#6B7280',
    padding: '8pt 16pt 2pt'
  }
});
