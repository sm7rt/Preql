import { Field, Form, Formik, FormikHelpers } from 'formik';
import {
  AuthForm,
  FormButton,
  FormLabel,
  FormStyle,
} from 'src/components/authPage';
import SelectField from 'src/components/form/select';
import FormikField, { ErrorMessage } from 'src/components/formikField';
import { companyRoles, companySizes, industries } from 'src/helpers/constants';
import * as Yup from 'yup';

import { TSignup } from './signupForm';

const SignupStep1Schema = Yup.object().shape({
  company_name: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  company_role: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  company_size: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  industry: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
});

export interface FormValues {
  company_name: string;
  company_role: string;
  industry: string;
  company_size: string;
}

type Step1Props = {
  onNextStep: (values: FormValues) => void;
  signupBody: TSignup;
};

function Step1({ onNextStep, signupBody }: Step1Props) {
  const onSubmitForm = (
    values: FormValues,
    { setSubmitting }: FormikHelpers<FormValues>
  ) => {
    onNextStep(values);
    // signupMutation.mutate({ body: values, setFormSubmitting: setSubmitting });
  };

  const industryOptions = industries.map((x) => ({ label: x, value: x }));
  const companyRoleOptions = companyRoles.map((x) => ({ label: x, value: x }));
  const companySizeOptions = companySizes.map((x) => ({ label: x, value: x }));

  return (
    <div>
      <Formik
        initialValues={{
          company_name: signupBody.company_name,
          company_role: signupBody.company_role,
          company_size: signupBody.company_size,
          industry: signupBody.industry,
        }}
        onSubmit={onSubmitForm}
        validationSchema={SignupStep1Schema}
      >
        {({ submitForm, isSubmitting, touched, errors }) => (
          <Form className={FormStyle}>
            <FormikField
              error={touched.company_name ? Boolean(errors.company_name) : null}
              fieldName="company_name"
              helperText={touched.company_name ? errors.company_name : null}
              label="Company Name *"
              type="text"
            />

            <SelectField
              label="Which best describes your role?"
              name="company_role"
              options={companyRoleOptions}
            />

            <SelectField
              label="Industry"
              name="industry"
              options={industryOptions}
            />

            <SelectField
              label="Company size"
              name="company_size"
              options={companySizeOptions}
            />

            {/* {signupMutation.isLoading ? <LinearProgress /> : null} */}
            {/* {formError ? (
              <Box pt={2}>
                <ErrorMessage color="error">{formError}</ErrorMessage>
              </Box>
            ) : null} */}
            <FormButton
              color="primary"
              //   disabled={signupMutation.isLoading}
              onClick={submitForm}
              type="submit"
              variant="contained"
            >
              Continue
            </FormButton>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default Step1;
