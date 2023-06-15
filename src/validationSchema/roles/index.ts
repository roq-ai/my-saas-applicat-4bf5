import * as yup from 'yup';
import { headcountRequestValidationSchema } from 'validationSchema/headcount-requests';
import { stakeholderValidationSchema } from 'validationSchema/stakeholders';

export const roleValidationSchema = yup.object().shape({
  title: yup.string().required(),
  company_id: yup.string().nullable().required(),
  headcount_request: yup.array().of(headcountRequestValidationSchema),
  stakeholder: yup.array().of(stakeholderValidationSchema),
});
