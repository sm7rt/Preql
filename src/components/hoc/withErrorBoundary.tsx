import type { ComponentClass, FC } from 'react';

import { ErrorBoundary } from '../ErrorBoundary';

export function withErrorBoundary<T = unknown>(
  WrappedComponent: FC<T> | ComponentClass<T>,
  displayName?: string
): FC<T> {
  const WithErrorBoundary: FC<T> = (props) => {
    return (
      <ErrorBoundary>
        <WrappedComponent {...props} />
      </ErrorBoundary>
    );
  };
  if (displayName) {
    WithErrorBoundary.displayName = `WithErrorBoundary${displayName}`;
  }
  return WithErrorBoundary;
}
export default withErrorBoundary;
