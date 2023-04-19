export type ICreateSheetBody = {
  dimensions: string;
  metrics: string;
  order: Order[] | '';
  time_granularity: TimeGranularity[] | '';
  where: string[];
};

export type ICreateReportSheetBody = {
  report_display_name: string;
  report_description: string;
  sheet_display_name: string;
  dimensions: string;
  metrics: string;
  order: Order[] | '';
  time_granularity: TimeGranularity[] | '';
  where: string[];
};

export type ISheet = {
  id: string;
  display_name: string;
  company_id?: string;
  report_id?: string;
  key?: string;
  s3_bucket?: string;
  s3_key?: string;
  sql_text?: string;
  metric_service_api_value?: MetricServiceAPIValue;
  google_worksheet_id?: null;
  google_worksheet_title?: null;
  google_worksheet_last_updated?: null;
  created_at?: Date;
  updated_at?: Date;
  updated_by_id?: string;
  updated_by_full_name?: string;
};

export type MetricServiceAPIValue = {
  company_id: string;
  table_id: string;
  dimensions: string;
  metrics: string;
  order: Order[];
  time_granularity: TimeGranularity[];
  // Seems this type can be a string or string[]
  where: string[] | string;
};

export type Order = {
  created_at: string;
};

export type TimeGranularity = {
  created_at: string;
};

export type ICreateSheetRequest = {
  reportId: string;
  body: ICreateSheetBody;
};

export type ISaveSheetRequest = {
  reportId: string;
  sheetId: string;
  body: ICreateSheetBody;
};
