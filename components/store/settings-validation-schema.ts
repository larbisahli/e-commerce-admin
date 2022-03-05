import * as yup from 'yup';
export const settingsValidationSchema = yup.object().shape({
  store_name: yup.string().nullable().required('form:error-currency-required'),
  store_address: yup
    .string()
    .nullable()
    .required('form:error-currency-required'),
  currency: yup.object().nullable().required('form:error-currency-required'),
  contactDetails: yup
    .object()
    .shape({
      email: yup.string().nullable().required('form:error-currency-required'),
      number: yup.string().nullable().required('form:error-currency-required')
    })
    .nullable()
    .required('form:error-currency-required'),
  max_order_amount: yup
    .number()
    .transform((value) => (isNaN(value) ? undefined : value))
    .moreThan(-1, 'form:error-sale-price-must-positive'),
  max_checkout_quantity: yup
    .number()
    .transform((value) => (isNaN(value) ? undefined : value))
    .moreThan(-1, 'form:error-sale-price-must-positive')
});
