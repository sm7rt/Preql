import '@testing-library/jest-dom';

import { render, screen } from '@testing-library/react';
import { FC } from 'react';

import { ErrorBoundary, errorMsg } from './ErrorBoundary';

const BadCmp: FC = () => {
  const obj: any = {};
  return <div>{obj.not.present}</div>;
};
const GoodCmp: FC = () => <div>Good Cmp</div>;

describe('Error Boundary', () => {
  let error: jest.SpyInstance;
  beforeEach(() => {
    error = jest.spyOn(console, 'error').mockImplementation(() => {
      // Keep console.error out of the test
    });
  });
  test('ErrorBoundary will render like normal when no error', () => {
    expect(error).not.toHaveBeenCalled();
    render(
      <ErrorBoundary>
        <GoodCmp />
      </ErrorBoundary>
    );
    expect(error).not.toHaveBeenCalled();
    expect(screen.queryByText('Something went wrong.')).toBeNull();
    expect(screen.getByText('Good Cmp')).toBeVisible();
  });
  test('Error Boundary will catch poorly rendered component', () => {
    expect(error).not.toHaveBeenCalled();
    render(
      <ErrorBoundary>
        <BadCmp />
      </ErrorBoundary>
    );
    expect(error).toHaveBeenCalled();
    expect(screen.getByText(errorMsg)).toBeVisible();
  });
});
