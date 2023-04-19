import { useMutation } from 'react-query';

import { getApiClient } from '../helpers/apiConfig';
import { useAuth } from './useAuth';

export const useSignIn = () => {
  const { onLoginSuccess } = useAuth();
  return useMutation(
    ({ email, password }: { email: string; password: string }) => {
      return getApiClient().post<{
        message: string;
        data: string;
      }>('auth/signin', {
        email,
        password,
      });
    },
    {
      onSuccess: (data) => {
        const authToken = data.data.data;
        onLoginSuccess(authToken);
      },
    }
  );
};
