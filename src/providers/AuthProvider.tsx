import identity from 'lodash/identity';
import { useRouter } from 'next/router';
import {
  createContext,
  PropsWithChildren,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { Maybe } from 'yup/es/types';

import { getApiClient } from '../helpers/apiConfig';

export type AuthState = {
  loggedIn: boolean;
  authToken?: Maybe<string>;
  confirm: boolean;
};
export type AuthContextType = AuthState & {
  sessionLoaded: boolean;
  onLoginSuccess: (authToken: string) => void;
  onConfirm: (confirm: boolean) => void;
  onLogOut: () => void;
};
export const AuthContext = createContext<AuthContextType>(null);
export type AuthProviderProps = PropsWithChildren<{
  initialAuthState?: AuthState;
}>;
const defaultAuthState: AuthState = {
  authToken: null,
  confirm: false,
  loggedIn: false,
};
const authKey = 'authState';
export default function AuthProvider({
  initialAuthState = defaultAuthState,
  children,
}: AuthProviderProps) {
  const router = useRouter();
  const [authState, setAuthState] = useState<AuthState>(initialAuthState);
  const [sessionLoaded, setSessionLoaded] = useState<boolean>(false);
  useEffect(() => {
    // Sync local storage once session is loaded
    if (sessionLoaded) {
      localStorage.setItem(authKey, JSON.stringify(authState));
    }
  }, [authState, sessionLoaded]);
  useEffect(() => {
    // Load session from local storage
    const authLocalStorage = localStorage.getItem(authKey);
    try {
      const parsedState = JSON.parse(authLocalStorage) as AuthState | null;
      if (parsedState) {
        setAuthState(parsedState);
      }
      setSessionLoaded(true);
    } catch (_e) {
      //
    }
  }, [router]);
  useEffect(() => {
    const client = getApiClient();
    client.interceptors.response.use(identity, (error) => {
      if (error.response?.status === 401) {
        router.push('/');
      }

      return Promise.reject(error);
    });
  }, [router]);
  useEffect(() => {
    const authToken = authState.authToken;
    const client = getApiClient();
    if (authToken) {
      client.defaults.headers.common['Authorization'] = `Bearer ${authToken}`;
    } else {
      delete client.defaults.headers.common['Authorization'];
    }
  }, [authState]);
  const onLoginSuccess = useCallback(
    (authToken) => {
      setAuthState((prevState) => ({
        ...prevState,
        authToken,
        loggedIn: true,
      }));
      if (router.pathname.includes('dashboard')) {
        router.replace('/');
      }
    },
    [router]
  );
  const onConfirm = useCallback((confirm) => {
    setAuthState((prevState) => ({
      ...prevState,
      confirm,
    }));
  }, []);
  const onLogOut = useCallback(() => {
    setAuthState({
      authToken: null,
      confirm: false,
      loggedIn: false,
    });
    router.replace('/');
  }, [router]);
  const contextValue = useMemo<AuthContextType>(
    () => ({
      ...authState,
      onConfirm,
      onLogOut,
      onLoginSuccess,
      sessionLoaded,
    }),
    [authState, onConfirm, onLogOut, onLoginSuccess, sessionLoaded]
  );
  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}
