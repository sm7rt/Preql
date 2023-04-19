import { useRouter } from 'next/router';
import AuthPage from 'src/components/authPage';
import InviteSignupForm from 'src/signup/inviteSignupForm';
import SignupForm from 'src/signup/signupForm';

function Signup() {
  const router = useRouter();
  const { query } = router;

  return (
    <AuthPage>{query.token ? <InviteSignupForm /> : <SignupForm />}</AuthPage>
  );
}

export default Signup;
