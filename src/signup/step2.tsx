import { Box, LinearProgress } from '@mui/material';
import { Form, Formik, FormikHelpers } from 'formik';
import { useState } from 'react';
import { useMutation } from 'react-query';
import { FormButton, FormStyle } from 'src/components/authPage';
import FormikField, { ErrorMessage } from 'src/components/formikField';
import { getApiClient } from 'src/helpers/apiConfig';
import * as Yup from 'yup';

import { useAuth } from '../hooks/useAuth';
import { TSignup } from './signupForm';

const SignupSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  first_name: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  last_name: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  password: Yup.string().required('Password is required'),
  password_confirmation: Yup.string()
    .required('Confirm password is required')
    .oneOf([Yup.ref('password'), null], 'Passwords must match'),
});

export interface FormValues {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

type Step2Props = {
  signupBody: TSignup;
};

function Step2({ signupBody }: Step2Props) {
  const [formError, setFormError] = useState<string | null>(null);
  const { onLoginSuccess } = useAuth();

  const signupMutation = useMutation(
    ({
      body,
      setFormSubmitting,
    }: {
      body: object;
      setFormSubmitting: (isSubmitting: boolean) => void;
    }) => {
      setFormError(null);
      return getApiClient().post('auth/signup', body);
    },
    {
      onError: (err: any, variables, context) => {
        setFormError(err.response.data.message);
        console.log(err, variables, context);
      },
      onSettled: (data, error, variables, context) => {
        variables.setFormSubmitting(false);
      },
      onSuccess: (data) => {
        const authToken = data.data.data;
        onLoginSuccess(authToken);
      },
    }
  );

  const onSubmitForm = (
    values: FormValues,
    { setSubmitting }: FormikHelpers<FormValues>
  ) => {
    signupMutation.mutate({
      body: {
        ...signupBody,
        ...values,
      },
      setFormSubmitting: setSubmitting,
    });
  };

  return (
    <div>
      <Formik
        initialValues={{
          email: signupBody.email,
          first_name: signupBody.first_name,
          last_name: signupBody.last_name,
          password: signupBody.password,
          password_confirmation: signupBody.password,
        }}
        onSubmit={onSubmitForm}
        validationSchema={SignupSchema}
      >
        {({ submitForm, isSubmitting, touched, errors }) => (
          <Form className={FormStyle}>
            <FormikField
              error={touched.first_name ? Boolean(errors.first_name) : null}
              fieldName="first_name"
              helperText={touched.first_name ? errors.first_name : null}
              label="First Name *"
              type="text"
            />
            <FormikField
              error={touched.last_name ? Boolean(errors.last_name) : null}
              fieldName="last_name"
              helperText={touched.last_name ? errors.last_name : null}
              label="Last Name *"
              type="text"
            />
            <FormikField
              error={touched.email ? Boolean(errors.email) : null}
              fieldName="email"
              helperText={touched.email ? errors.email : null}
              label="Email *"
              type="email"
            />
            <FormikField
              error={touched.password ? Boolean(errors.password) : null}
              fieldName="password"
              helperText={touched.password ? errors.password : null}
              label="Password *"
              type="password"
            />
            <FormikField
              error={
                touched.password_confirmation
                  ? Boolean(errors.password_confirmation)
                  : null
              }
              fieldName="password_confirmation"
              helperText={
                touched.password_confirmation
                  ? errors.password_confirmation
                  : null
              }
              label="Confirm password *"
              type="password"
            />

            {signupMutation.isLoading ? <LinearProgress /> : null}
            {formError ? (
              <Box pt={2}>
                <ErrorMessage color="error">{formError}</ErrorMessage>
              </Box>
            ) : null}
            <FormButton
              color="primary"
              //   disabled={signupMutation.isLoading}
              onClick={submitForm}
              type="submit"
              variant="contained"
            >
              Sign up
            </FormButton>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default Step2;
