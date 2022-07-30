import * as yup from 'yup';

export const productValidationSchema = yup.object().shape({
  // thumbnail
  // gallery
  name: yup.string().required('form:error-product-name-required'),
  shortDescription: yup
    .string()
    .test(
      'len',
      'Description Must be less than 160 characters',
      (val) => val.length < 160
    )
    .required('form:error-short-description-required'),
  description: yup.string().required('form:error-product-description-required'),
  salePrice: yup
    .number()
    .typeError('form:error-amount-must-number')
    .positive('form:error-price-must-positive')
    .required('form:error-sale-price-required'),
  comparePrice: yup
    .number()
    .typeError('form:error-amount-must-number')
    .transform((value) => (isNaN(value) ? null : value)),
  quantity: yup
    .number()
    .typeError('form:error-amount-must-number')
    .required('form:error-quantity-required'),
  variationOptions: yup.array().of(
    yup.object().shape({
      salePrice: yup
        .number()
        .typeError('form:error-amount-must-number')
        .positive('form:error-price-must-positive')
        .required('form:error-price-required'),
      comparePrice: yup
        .number()
        .typeError('form:error-amount-must-number')
        .transform((value) => (isNaN(value) ? null : value))
        .lessThan(
          yup.ref('sale_price'),
          'Compare Price should be less than ${less}'
        ),
      quantity: yup
        .number()
        .typeError('form:error-amount-must-number')
        .integer('form:error-quantity-must-integer')
        .required('form:error-quantity-required')
    })
  ),
  categories: yup.array().min(1, 'Category Required'),
  productShippingInfo: yup.object().shape({
    weight: yup.number().typeError('form:error-amount-must-number'),
    volume: yup.number().typeError('form:error-amount-must-number'),
    dimensionWidth: yup.number().typeError('form:error-amount-must-number'),
    dimensionHeight: yup.number().typeError('form:error-amount-must-number'),
    dimensionDepth: yup.number().typeError('form:error-amount-must-number')
  })
});
