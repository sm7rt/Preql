import { Box, LinearProgress } from '@mui/material';
import { Form, Formik, FormikHelpers } from 'formik';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useMutation } from 'react-query';
import {
  AuthForm,
  FormButton,
  FormLabel,
  FormStyle,
} from 'src/components/authPage';
import FormikField, { ErrorMessage } from 'src/components/formikField';
import { getApiClient } from 'src/helpers/apiConfig';
import * as Yup from 'yup';

import { useAuth } from '../hooks/useAuth';

export interface InvitationFormValues {
  email: string;
  password: string;
  password_confirmation: string;
}

// Move to new file
const InviteSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().required('Password is required'),
  password_confirmation: Yup.string()
    .required('Confirm password is required')
    .oneOf([Yup.ref('password'), null], 'Passwords must match'),
});

function InviteSignupForm() {
  const router = useRouter();
  const { query } = router;
  const { onLoginSuccess } = useAuth();
  const [formError, setFormError] = useState<string | null>(null);

  // move to new file
  const invitationMutation = useMutation(
    ({
      body,
      setFormSubmitting,
    }: {
      body: object;
      setFormSubmitting: (isSubmitting: boolean) => void;
    }) => {
      setFormError(null);
      return getApiClient().post('users/onboarding', body, {
        headers: {
          Authorization: `Bearer ${query.token}`,
        },
      });
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

  const onSubmitInvitationForm = (
    values: InvitationFormValues,
    { setSubmitting }: FormikHelpers<InvitationFormValues>
  ) => {
    invitationMutation.mutate({
      body: values,
      setFormSubmitting: setSubmitting,
    });
  };

  function parseJwt(token) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      window
        .atob(base64)
        .split('')
        .map((c) => {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join('')
    );

    return JSON.parse(jsonPayload);
  }

  return (
    <AuthForm>
      <div className="logo">
        <Image alt="Logo" height={24} src="/Logo.svg" width={88} />
      </div>
      <FormLabel>Set up your Preql account</FormLabel>
      <Formik
        initialValues={{
          email: parseJwt(query.token).email as string,
          password: '',
          password_confirmation: '',
        }}
        onSubmit={onSubmitInvitationForm}
        validationSchema={InviteSchema}
      >
        {({ submitForm, isSubmitting, touched, errors }) => (
          <Form className={FormStyle}>
            <FormikField
              disabled
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

            {invitationMutation.isLoading ? <LinearProgress /> : null}
            {formError ? (
              <Box pt={2}>
                <ErrorMessage color="error">{formError}</ErrorMessage>
              </Box>
            ) : null}
            <FormButton
              color="primary"
              disabled={invitationMutation.isLoading}
              onClick={submitForm}
              type="submit"
              variant="contained"
            >
              Create account
            </FormButton>
          </Form>
        )}
      </Formik>
    </AuthForm>
  );
}

export default InviteSignupForm;
