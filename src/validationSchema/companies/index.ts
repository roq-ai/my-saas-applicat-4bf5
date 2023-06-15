import * as yup from 'yup';
import { roleValidationSchema } from 'validationSchema/roles';

export const companyValidationSchema = yup.object().shape({
  description: yup.string(),
  image: yup.string(),
  name: yup.string().required(),
  user_id: yup.string().nullable().required(),
  role: yup.array().of(roleValidationSchema),
});
