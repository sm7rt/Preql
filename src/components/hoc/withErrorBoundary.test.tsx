import '@testing-library/jest-dom';

import { render, screen } from '@testing-library/react';
import { FC } from 'react';

import { errorMsg } from '../ErrorBoundary';
import withErrorBoundary from './withErrorBoundary';

const BadCmp: FC = () => {
  const obj: any = {};
  return <div>{obj.not.present}</div>;
};
const GoodCmp: FC = () => <div>Good Cmp</div>;

describe('withErrorBoundary', () => {
  let error: jest.SpyInstance;
  let WrappedBadCmp: FC;
  let WrappedGoodCmp: FC;
  beforeEach(() => {
    jest.clearAllMocks();
    WrappedBadCmp = withErrorBoundary(BadCmp);
    WrappedGoodCmp = withErrorBoundary(GoodCmp, 'GoodCmp');
    error = jest.spyOn(console, 'error').mockImplementation(() => {
      // Keep console.error out of the test
    });
  });
  test('ErrorBoundary will render like normal when no error', () => {
    expect(error).not.toHaveBeenCalled();
    render(<WrappedGoodCmp />);
    expect(error).not.toHaveBeenCalled();
    expect(screen.queryByText('Something went wrong.')).toBeNull();
    expect(screen.getByText('Good Cmp')).toBeVisible();
  });
  test('Error Boundary will catch poorly rendered component', () => {
    expect(error).not.toHaveBeenCalled();
    render(<WrappedBadCmp />);
    expect(error).toHaveBeenCalled();
    expect(screen.getByText(errorMsg)).toBeVisible();
  });
});
