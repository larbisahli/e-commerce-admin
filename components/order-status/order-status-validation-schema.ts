import * as yup from 'yup';
export const orderStatusValidationSchema = yup.object().shape({
  status_name: yup.string().required('form:error-name-required')
});
