import { renderHook } from '@testing-library/react-hooks';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import metricData from 'src/testingHelpers/mockData/metricData';
import MockQueryClientProvider from 'src/testingHelpers/MockQueryClientProvider';

import { useQueryMetrics } from './useQueryMetrics';

const server = setupServer(
  rest.get(`${process.env.API_URL ?? '/'}metrics`, (_req, res, ctx) => {
    return res(ctx.json(metricData));
  })
);
describe('useQueryMetrics', () => {
  // Establish API mocking before all tests.
  beforeAll(() => server.listen());
  // Reset any request handlers that we may add during the tests,
  // so they don't affect other tests.
  afterEach(() => server.resetHandlers());
  // Clean up after the tests are finished.
  afterAll(() => server.close());
  it('should have a test', () => {
    const { result, waitFor } = renderHook(() => useQueryMetrics(), {
      wrapper: MockQueryClientProvider,
    });
    expect(result.current.isLoading).toBeTruthy();
  });
});
