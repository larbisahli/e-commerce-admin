import * as yup from 'yup';

export const shippingValidationSchema = yup.object().shape({
  name: yup.string().required('form:error-name-required'),
  display_name: yup.string().required('form:error-display-name-required')
});
