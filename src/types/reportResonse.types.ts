import { ISheet as Sheet } from 'src/types/sheet.types';

export interface ReportResponse {
  message: string;
  data: Report;
}

export interface Report {
  id: string;
  company_id: string;
  display_name: string;
  description: string;
  key: string;
  base_s3_bucket: string;
  base_s3_key: string;
  base_sql_text: string;
  google_spreadsheet_id: null;
  google_spreadsheet_title: null;
  google_spreadsheet_last_updated: null;
  integration_id: null;
  created_at: Date;
  updated_at: Date;
  company: Company;
  sheets: Sheet[];
}

export interface Company {
  id: string;
  name: string;
  company_size: null;
  industry: null;
  created_at: Date;
  updated_at: Date;
  datawarehouses: Datawarehouse[];
}

export interface Datawarehouse {
  id: string;
  company_id: string;
  database: string;
  dialect: string;
  host: string;
  user_name: string;
  password: string;
  schema: string;
  warehouse: string;
  type: string;
  port: number;
  confirm: boolean;
  manifest_json: null;
  created_by: string;
  updated_by: string;
  created_at: Date;
  updated_at: Date;
}

export interface MetricServiceAPIValue {
  dimensions: string;
  metrics: string;
  order: string;
  table_id: string;
  time_granularity: TimeGranularity[];
  where: string;
}

export interface TimeGranularity {
  created_at: string;
}
