import * as yup from 'yup';
export const orderStatusValidationSchema = yup.object().shape({
  label: yup.string().required('form:error-label-required'),
  status: yup.object().shape({
    value: yup.string().required('form:error-status-required')
  })
});
