import * as yup from 'yup';
export const tagValidationSchema = yup.object().shape({
  locale: yup.object().required('form:error-locale-required'),
  direction: yup.object().required('form:error-direction-required')
});
