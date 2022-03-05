import * as yup from 'yup';

export const shippingValidationSchema = yup.object().shape({
  shipper_name: yup.string().required('form:error-name-required')
});
