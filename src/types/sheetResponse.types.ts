export interface SheetResponse {
  message: string;
  data: Data;
}

export interface Data {
  report_id: any;
  company_id: string;
  key: string;
  display_name: string;
  description: string;
  sheets: Sheet[];
  id: string;
}

export interface Sheet {
  id: string;
  display_name: string;
  records: Record[];
}

export interface Record {
  TOTAL_ORDERS: number;
  CREATED_AT__WEEK: Date;
}
