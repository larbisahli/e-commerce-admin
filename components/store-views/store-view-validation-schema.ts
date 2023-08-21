import * as yup from 'yup';

export const storeViewValidationSchema = yup.object().shape({
  name: yup.string().required('form:error-name-required'),
  code: yup.string().required('form:error-code-required'),
  language: yup.object().required('form:error-language-required')
});
