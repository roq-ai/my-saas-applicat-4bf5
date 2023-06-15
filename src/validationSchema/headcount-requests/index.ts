import * as yup from 'yup';

export const headcountRequestValidationSchema = yup.object().shape({
  status: yup.string().required(),
  role_id: yup.string().nullable().required(),
  stakeholder_id: yup.string().nullable().required(),
});
