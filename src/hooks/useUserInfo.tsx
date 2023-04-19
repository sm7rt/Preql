import jwt_decode from 'jwt-decode';
import { useMemo } from 'react';

import { useAuth } from './useAuth';

export type UserInfo = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  role: string;
  company: {
    id: string;
    name: string;
    created_at: string;
    updated_at: string;
  };
  iat: number;
  exp: number;
};
export const useUserInfo = (): UserInfo | null => {
  const { authToken } = useAuth();
  return useMemo<UserInfo | null>(() => {
    if (!authToken) {
      return null;
    }
    return jwt_decode<UserInfo>(authToken);
  }, [authToken]);
};
