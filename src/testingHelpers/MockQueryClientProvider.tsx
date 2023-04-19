import { ReactNode, useMemo } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

import AuthProvider from '../providers/AuthProvider';

export default function MockQueryClientProvider({
  children,
}: {
  children: ReactNode;
}): JSX.Element {
  const queryClient = useMemo(
    () =>
      new QueryClient({
        defaultOptions: { queries: { retry: false } },
      }),
    []
  );
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </AuthProvider>
  );
}
