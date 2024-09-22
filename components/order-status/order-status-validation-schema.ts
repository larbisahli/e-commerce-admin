import * as yup from 'yup';
export const orderStatusValidationSchema = yup.object().shape({
  status: yup.string().required('form:error-label-required')
});
