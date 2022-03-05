import * as yup from 'yup';
export const tagValidationSchema = yup.object().shape({
  tag_name: yup.string().required('form:error-name-required')
});
