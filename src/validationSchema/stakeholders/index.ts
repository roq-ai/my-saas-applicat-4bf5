import * as yup from 'yup';
import { headcountRequestValidationSchema } from 'validationSchema/headcount-requests';

export const stakeholderValidationSchema = yup.object().shape({
  user_id: yup.string().nullable().required(),
  role_id: yup.string().nullable().required(),
  headcount_request: yup.array().of(headcountRequestValidationSchema),
});
