import * as yup from 'yup';

export const shippingValidationSchema = yup.object().shape({
  shippingZone: yup.object().shape({
    name: yup.string().required('form:error-name-required'),
    displayName: yup.string().required('form:error-display-name-required')
  })
});
