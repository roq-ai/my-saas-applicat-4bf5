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
  Center,
} from '@chakra-ui/react';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { FiEdit3 } from 'react-icons/fi';
import { useFormik, FormikHelpers } from 'formik';
import { getHeadcountRequestById, updateHeadcountRequestById } from 'apiSdk/headcount-requests';
import { Error } from 'components/error';
import { headcountRequestValidationSchema } from 'validationSchema/headcount-requests';
import { HeadcountRequestInterface } from 'interfaces/headcount-request';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, withAuthorization } from '@roq/nextjs';
import { RoleInterface } from 'interfaces/role';
import { StakeholderInterface } from 'interfaces/stakeholder';
import { getRoles } from 'apiSdk/roles';
import { getStakeholders } from 'apiSdk/stakeholders';

function HeadcountRequestEditPage() {
  const router = useRouter();
  const id = router.query.id as string;
  const { data, error, isLoading, mutate } = useSWR<HeadcountRequestInterface>(
    () => (id ? `/headcount-requests/${id}` : null),
    () => getHeadcountRequestById(id),
  );
  const [formError, setFormError] = useState(null);

  const handleSubmit = async (values: HeadcountRequestInterface, { resetForm }: FormikHelpers<any>) => {
    setFormError(null);
    try {
      const updated = await updateHeadcountRequestById(id, values);
      mutate(updated);
      resetForm();
      router.push('/headcount-requests');
    } catch (error) {
      setFormError(error);
    }
  };

  const formik = useFormik<HeadcountRequestInterface>({
    initialValues: data,
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
            Edit Headcount Request
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        {formError && (
          <Box mb={4}>
            <Error error={formError} />
          </Box>
        )}
        {isLoading || (!formik.values && !error) ? (
          <Center>
            <Spinner />
          </Center>
        ) : (
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
        )}
      </Box>
    </AppLayout>
  );
}

export default withAuthorization({
  service: AccessServiceEnum.PROJECT,
  entity: 'headcount_request',
  operation: AccessOperationEnum.UPDATE,
})(HeadcountRequestEditPage);
