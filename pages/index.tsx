import styled from '@emotion/styled';
import { Box, LinearProgress } from '@mui/material';
import { Link as MUILink } from '@mui/material';
import { Form, Formik, FormikHelpers } from 'formik';
import NextLink from 'next/link';
import { useState } from 'react';
import { useMutation } from 'react-query';
import AuthPage, {
  AuthForm,
  FormButton,
  FormLabel,
  FormStyle,
} from 'src/components/authPage';
import FormikField, { ErrorMessage } from 'src/components/formikField';
import { useSignIn } from 'src/hooks/useSignIn';
import * as Yup from 'yup';

export interface FormValues {
  email: string;
  password: string;
}

const LoginFooter = styled(Box)`
  margin-top: 40px;
  display: flex;
  justify-content: center;
  gap: 0.5rem;
`;

const FooterLink = styled(MUILink)`
  text-decoration: none;
`;

const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().required('Password is required'),
});

function Login() {
  const [formError, setFormError] = useState<string | null>(null);
  const loginMutation = useSignIn();

  const onSubmitForm = (
    values: FormValues,
    { setSubmitting }: FormikHelpers<FormValues>
  ) => {
    setFormError(null);
    setSubmitting(true);
    loginMutation.mutate(values, {
      onError: (err: any) => {
        setFormError(err.response.data.message);
        console.log(err);
      },
      onSettled: () => {
        setSubmitting(false);
      },
    });
  };

  return (
    <AuthPage>
      <AuthForm>
        <FormLabel>Log in</FormLabel>
        <Formik
          initialValues={{
            email: '',
            password: '',
          }}
          onSubmit={onSubmitForm}
          validationSchema={LoginSchema}
        >
          {({ submitForm, touched, errors }) => (
            <Form className={FormStyle}>
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

              {loginMutation.isLoading ? <LinearProgress /> : null}
              {formError ? (
                <Box pt={2}>
                  <ErrorMessage color="error">{formError}</ErrorMessage>
                </Box>
              ) : null}
              <FormButton
                color="primary"
                disabled={loginMutation.isLoading}
                onClick={submitForm}
                type="submit"
                variant="contained"
              >
                Log in
              </FormButton>
            </Form>
          )}
        </Formik>
      </AuthForm>
      <LoginFooter>
        <NextLink
          href="https://v4rz52mbydt.typeform.com/preqlbeta?typeform-source=www.preql.com"
          passHref
        >
          <FooterLink variant="body2">Get help logging in</FooterLink>
        </NextLink>
        {/*<Typography color="primary" variant="body2">
          |
        </Typography>
         <NextLink href="/signup" passHref>
          <FooterLink variant="body2">Sign up</FooterLink>
        </NextLink> */}
      </LoginFooter>
    </AuthPage>
  );
}

export default Login;
