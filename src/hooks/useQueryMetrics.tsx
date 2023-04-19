import { useQuery } from 'react-query';

import { getApiClient } from '../helpers/apiConfig';

export interface MetricResponse {
  message: string;
  data: MetricModel[];
}
export interface MetricModel {
  id: string;
  company_id: string;
  type: string;
  display_name: string;
  description: string;
  key: string;
  value?: unknown;
  dimensions: Dimension[];
  metrics: Metric[];
  filters?: (Filter | string)[][];
  created_at: string;
  updated_at: string;
}

export interface Filter {
  label: string;
  value: string;
  type: string;
}

export interface Metric {
  agg: string;
  create_metric: boolean;
  description: string;
  expr: string;
  name: string;
}

export interface Dimension {
  expr?: string;
  name: string;
  type: string;
  type_params?: Typeparams;
}

interface Typeparams {
  is_primary: boolean;
  time_granularity: string;
}

export const fetchMetrics = async (): Promise<MetricResponse['data']> => {
  return await (
    await getApiClient().get<MetricResponse>('metrics')
  ).data.data;
};
export const METRICS_CACHE_KEY = '/metrics';
export const useQueryMetrics = () => useQuery(METRICS_CACHE_KEY, fetchMetrics);
