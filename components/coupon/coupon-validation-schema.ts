import * as yup from 'yup';
export const couponValidationSchema = yup.object().shape({
  code: yup.string().required('form:error-coupon-code-required'),
  discount_value: yup
    .number()
    .nullable(true)
    .typeError('form:error-amount-number')
    .required('form:error-amount-required'),
  max_usage: yup
    .number()
    .nullable(true)
    .typeError('form:error-max-usage-number')
    .required('form:error-max-usage-required'),
  discount_type: yup.object().required('form:error-coupon-type-required'),
  coupon_end_date: yup.string().required('form:error-expire-date-required'),
  coupon_start_date: yup.string().required('form:error-active-date-required')
});
