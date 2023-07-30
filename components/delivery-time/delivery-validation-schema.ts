import * as yup from 'yup';

export const deliveryValidationSchema = yup.object().shape({
  name: yup.string().required('form:error-name-required'),
  timeUnit: yup
    .object()
    .typeError('Unit is required')
    .required('Unit is required'),
  minValue: yup
    .number()
    .typeError('form:error-amount-must-number')
    .positive('form:error-price-must-positive')
    .required('Minimum value is required'),
  maxValue: yup
    .number()
    .typeError('form:error-amount-must-number')
    .positive('form:error-price-must-positive')
    .required('Maximum value is required')
});
