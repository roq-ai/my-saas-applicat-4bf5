import AppLayout from 'layout/app-layout';
import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberInputField,
  NumberIncrementStepper,
  NumberInput,
} from '@chakra-ui/react';
import { useFormik, FormikHelpers } from 'formik';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { FiEdit3 } from 'react-icons/fi';
import { useRouter } from 'next/router';
import { createHeadcountRequest } from 'apiSdk/headcount-requests';
import { Error } from 'components/error';
import { headcountRequestValidationSchema } from 'validationSchema/headcount-requests';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, withAuthorization } from '@roq/nextjs';
import { RoleInterface } from 'interfaces/role';
import { StakeholderInterface } from 'interfaces/stakeholder';
import { getRoles } from 'apiSdk/roles';
import { getStakeholders } from 'apiSdk/stakeholders';
import { HeadcountRequestInterface } from 'interfaces/headcount-request';

function HeadcountRequestCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: HeadcountRequestInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createHeadcountRequest(values);
      resetForm();
      router.push('/headcount-requests');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<HeadcountRequestInterface>({
    initialValues: {
      status: '',
      role_id: (router.query.role_id as string) ?? null,
      stakeholder_id: (router.query.stakeholder_id as string) ?? null,
    },
    validationSchema: headcountRequestValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout>
      <Box bg="white" p={4} rounded="md" shadow="md">
        <Box mb={4}>
          <Text as="h1" fontSize="2xl" fontWeight="bold">
            Create Headcount Request
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <form onSubmit={formik.handleSubmit}>
          <FormControl id="status" mb="4" isInvalid={!!formik.errors?.status}>
            <FormLabel>Status</FormLabel>
            <Input type="text" name="status" value={formik.values?.status} onChange={formik.handleChange} />
            {formik.errors.status && <FormErrorMessage>{formik.errors?.status}</FormErrorMessage>}
          </FormControl>
          <AsyncSelect<RoleInterface>
            formik={formik}
            name={'role_id'}
            label={'Select Role'}
            placeholder={'Select Role'}
            fetcher={getRoles}
            renderOption={(record) => (
              <option key={record.id} value={record.id}>
                {record?.title}
              </option>
            )}
          />
          <AsyncSelect<StakeholderInterface>
            formik={formik}
            name={'stakeholder_id'}
            label={'Select Stakeholder'}
            placeholder={'Select Stakeholder'}
            fetcher={getStakeholders}
            renderOption={(record) => (
              <option key={record.id} value={record.id}>
                {record?.id}
              </option>
            )}
          />
          <Button isDisabled={formik?.isSubmitting} colorScheme="blue" type="submit" mr="4">
            Submit
          </Button>
        </form>
      </Box>
    </AppLayout>
  );
}

export default withAuthorization({
  service: AccessServiceEnum.PROJECT,
  entity: 'headcount_request',
  operation: AccessOperationEnum.CREATE,
})(HeadcountRequestCreatePage);
