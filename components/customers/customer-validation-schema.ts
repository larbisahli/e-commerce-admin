import * as yup from 'yup';

export const categoryValidationSchema = yup.object().shape({
  fullName: yup.string().required('form:error-name-required'),
  email: yup.string().required('form:error-email-required')
});
