import * as yup from 'yup';

export const categoryValidationSchema = yup.object().shape({
  name: yup.string().required('form:error-name-required'),
  description: yup
    .string()
    .required('Description required')
    .typeError('Description required'),
  categorySeo: yup.object().shape({
    metaTitle: yup.string().required('Meta Title is required'),
    urlKey: yup
      .string()
      .typeError('Url Key is required')
      .required('Url Key is required'),
    metaDescription: yup
      .string()
      .nullable(true)
      .test(
        'len',
        'Description Must be less than 160 characters',
        (val) => val?.length < 160
      )
  })
});
