import * as yup from 'yup';

export const productValidationSchema = yup.object().shape({
  // thumbnail
  // gallery
  product_name: yup.string().required('form:error-product-name-required'),
  short_description: yup
    .string()
    .test(
      'len',
      'Description Must be less than 160 characters',
      (val) => val.length < 160
    )
    .required('form:error-short-description-required'),
  product_description: yup
    .string()
    .required('form:error-product-description-required'),
  sale_price: yup
    .number()
    .typeError('form:error-amount-must-number')
    .positive('form:error-price-must-positive')
    .required('form:error-sale-price-required'),
  compare_price: yup
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
    .required('form:error-quantity-required'),
  variation_options: yup.array().of(
    yup.object().shape({
      sale_price: yup
        .number()
        .typeError('form:error-amount-must-number')
        .positive('form:error-price-must-positive')
        .required('form:error-price-required'),
      compare_price: yup
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
  product_shipping_info: yup.object().shape({
    weight: yup.number().typeError('form:error-amount-must-number'),
    volume: yup.number().typeError('form:error-amount-must-number'),
    dimension_width: yup.number().typeError('form:error-amount-must-number'),
    dimension_height: yup.number().typeError('form:error-amount-must-number'),
    dimension_depth: yup.number().typeError('form:error-amount-must-number')
  })
});
