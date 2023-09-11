import * as yup from 'yup';

export const deliveryValidationSchema = yup.object().shape({
  name: yup.string().required('form:error-name-required'),
  unit: yup.object().typeError('Unit is required').required('Unit is required'),
  min: yup
    .number()
    .typeError('form:error-amount-must-number')
    .positive('form:error-price-must-positive')
    .required('Minimum value is required'),
  max: yup
    .number()
    .typeError('form:error-amount-must-number')
    .positive('form:error-price-must-positive')
    .required('Maximum value is required')
});
