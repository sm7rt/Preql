import { useState } from 'react';
import { AuthForm } from 'src/components/authPage';

import Step1 from './step1';
import Step2 from './step2';

export type TSignup = {
  company_name: string;
  company_role: string;
  industry: string;
  company_size: string;
  email: string;
  first_name: string;
  last_name: string;
  password: string;
};

function SignupForm() {
  const [step, setStep] = useState(0);
  const [signupBody, setSignupBody] = useState<TSignup>({
    company_name: '',
    company_role: '',
    company_size: '',
    email: '',
    first_name: '',
    industry: '',
    last_name: '',
    password: '',
  });

  const onNextStep = (values) => {
    setStep(step + 1);
    setSignupBody({
      ...signupBody,
      ...values,
    });
  };

  return (
    <AuthForm>
      {step === 0 ? (
        <Step1 onNextStep={onNextStep} signupBody={signupBody} />
      ) : (
        <Step2 signupBody={signupBody} />
      )}
    </AuthForm>
  );
}

export default SignupForm;
