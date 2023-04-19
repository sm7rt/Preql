import { useRouter } from 'next/router';
import { ComponentClass, FC, useEffect, useState } from 'react';

import { useAuth } from '../hooks/useAuth';

export default function protectedRoute<T = unknown>(
  Component: FC<T> | ComponentClass<T>,
  options: {
    pathAfterFailure?: string;
  }
): FC<T> {
  return function ProtectedRoute(props) {
    const router = useRouter();
    const { loggedIn, sessionLoaded } = useAuth();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      if (sessionLoaded) {
        setLoading(false);
      }
      if (!loggedIn && sessionLoaded) {
        router.push(options.pathAfterFailure || '/');
      }
    }, [loggedIn, router, sessionLoaded]);

    return loading ? <div>Loading</div> : <Component {...props} />;
  };
}
