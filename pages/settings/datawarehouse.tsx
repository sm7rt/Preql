import styled from '@emotion/styled';
import CachedIcon from '@mui/icons-material/Cached';
import { Box, Button, Grid, LinearProgress, Typography } from '@mui/material';
import { Form, Formik, FormikHelpers } from 'formik';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useMutation } from 'react-query';
import FormikField, { ErrorMessage } from 'src/components/formikField';
import protectedRoute from 'src/components/protectedRoute';
import DashboardWrapper from 'src/dashboard/wrapper';
import { getApiClient } from 'src/helpers/apiConfig';
import SettingsHeader from 'src/settings/header';
import * as Yup from 'yup';

const FormButton = styled(Button)(({ theme }) => ({
  height: theme.spacing(5),
  marginTop: theme.spacing(5),
  textTransform: 'initial',
}));

const SnowflakeFormSchema = Yup.object().shape({
  database: Yup.string().required('Required'),
  dialect: Yup.string().required('Required'),
  host: Yup.string().required('Required'),
  password: Yup.string().required('Required'),
  schema: Yup.string().required('Required'),
  type: Yup.string().required('Required'),
  user_name: Yup.string().required('Required'),
  warehouse: Yup.string().required('Required'),
});

interface FormValues {
  host: string;
  user_name: string;
  database: string;
  password: string;
  dialect: string;
  schema: string;
  warehouse: string;
  type: string;
  port: string;
}

function Datawarehouse() {
  const router = useRouter();
  const [formError, setFormError] = useState<string | null>(null);

  const createDatawarehouseMutation = useMutation(
    ({
      body,
    }: {
      body: object;
      setFormSubmitting: (isSubmitting: boolean) => void;
    }) => {
      setFormError(null);
      return getApiClient().post('/datawarehouse', body);
    },
    {
      onError: (err: any, variables, context) => {
        setFormError(err.response.data.message);
        console.log(err, variables, context);
      },
      onSettled: (data, error, variables) => {
        variables.setFormSubmitting(false);
      },
      onSuccess: () => {
        console.log('success');
        router.push('/dashboard/metrics');
      },
    }
  );

  const onSubmitForm = (
    values: FormValues,
    { setSubmitting }: FormikHelpers<FormValues>
  ) => {
    createDatawarehouseMutation.mutate({
      body: values,
      setFormSubmitting: setSubmitting,
    });
  };

  return (
    <DashboardWrapper>
      <SettingsHeader />
      {/*<Box mb={2}>
        <LinearProgress variant="determinate" value={progress} />
      </Box>

       <Box display="flex" mb={4} alignItems="center">
        <Image src="/icons/check.svg" width={16} height={16} />
        <Typography variant="body2" ml={1}>
          Company profile created
        </Typography>
      </Box> */}

      <Typography mb={2} variant="h1">
        Connect PREQL to your data
      </Typography>
      <Typography mb={3} variant="body1">
        Before you can review your metrics and analyze your data, you must first
        connect PREQL to a Snowflake data warehouse.
        <br />
        Don’t have Snowflake? Contact support and we’ll help you create an
        account.
      </Typography>

      <Formik
        initialValues={{
          database: '',
          dialect: '',
          host: '',
          password: '',
          port: '',
          schema: '',
          type: 'snowflake',
          user_name: '',
          warehouse: '',
        }}
        onSubmit={onSubmitForm}
        validationSchema={SnowflakeFormSchema}
      >
        {({ submitForm, touched, errors }) => (
          <Form>
            <Grid container spacing={4}>
              <Grid item xs={12}>
                <FormikField
                  error={touched.host ? Boolean(errors.host) : null}
                  fieldName="host"
                  helperText={touched.host ? errors.host : null}
                  label="Host *"
                  type="text"
                />
              </Grid>
              <Grid item xs={12}>
                <FormikField
                  error={touched.database ? Boolean(errors.database) : null}
                  fieldName="database"
                  helperText={touched.database ? errors.database : null}
                  label="Database name *"
                  type="text"
                />
              </Grid>
              <Grid item xs={12}>
                <FormikField
                  error={touched.dialect ? Boolean(errors.dialect) : null}
                  fieldName="dialect"
                  helperText={touched.dialect ? errors.dialect : null}
                  label="Dialect *"
                  type="text"
                />
              </Grid>
              <Grid item xs={6}>
                <FormikField
                  error={touched.schema ? Boolean(errors.schema) : null}
                  fieldName="schema"
                  helperText={touched.schema ? errors.schema : null}
                  label="Schema *"
                  type="text"
                />
              </Grid>
              <Grid item xs={6}>
                <FormikField
                  error={touched.warehouse ? Boolean(errors.warehouse) : null}
                  fieldName="warehouse"
                  helperText={touched.warehouse ? errors.warehouse : null}
                  label="Warehouse *"
                  type="text"
                />
              </Grid>
              <Grid item xs={6}>
                <FormikField
                  error={touched.type ? Boolean(errors.type) : null}
                  fieldName="type"
                  helperText={touched.type ? errors.type : null}
                  label="Type *"
                  options={[
                    {
                      label: 'Snowflake',
                      value: 'snowflake',
                    },
                  ]}
                  type="select"
                />
              </Grid>
              <Grid item xs={6}>
                <FormikField
                  error={touched.port ? Boolean(errors.port) : null}
                  fieldName="port"
                  helperText={touched.port ? errors.port : null}
                  label="Port"
                  type="text"
                />
              </Grid>
              <Grid item xs={6}>
                <FormikField
                  error={touched.user_name ? Boolean(errors.user_name) : null}
                  fieldName="user_name"
                  helperText={touched.user_name ? errors.user_name : null}
                  label="Snowflake username *"
                  type="text"
                />
              </Grid>
              <Grid item xs={6}>
                <FormikField
                  error={touched.password ? Boolean(errors.password) : null}
                  fieldName="password"
                  helperText={touched.password ? errors.password : null}
                  label="Snowflake password *"
                  type="password"
                />
              </Grid>
            </Grid>

            {createDatawarehouseMutation.isLoading ? <LinearProgress /> : null}
            {formError ? (
              <Box pt={2}>
                <ErrorMessage color="error">{formError}</ErrorMessage>
              </Box>
            ) : null}
            <FormButton
              color="primary"
              disabled={createDatawarehouseMutation.isLoading}
              fullWidth
              onClick={submitForm}
              startIcon={<CachedIcon />}
              type="submit"
              variant="contained"
            >
              Connect to Snowflake
            </FormButton>
          </Form>
        )}
      </Formik>
    </DashboardWrapper>
  );
}

export default protectedRoute(Datawarehouse, { pathAfterFailure: '/' });
