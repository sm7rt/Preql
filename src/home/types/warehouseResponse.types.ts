export interface IWarehouseResponse {
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
  manifest_json: ManifestJSON;
  created_by: string;
  updated_by: string;
  created_at: Date;
  updated_at: Date;
}

export interface ManifestJSON {
  fields: Expr;
  metadata: Metadata;
  expr: Expr;
}

export interface Expr {
  created_at: string;
  line_item_return_created_at: string;
  line_item_processed_at: string;
  product_name: string;
  product_title: string;
  product_sku: string;
  shipping_address_zipcode: string;
  shipping_address_city: string;
  shipping_address_country: string;
  shipping_address_state: string;
  order_discount_code: string;
  tags: string;
  is_new_customer: string;
  order_day_of_week: string;
  order_week_start_date: string;
  order_month: string;
  order_year: string;
  line_item_has_a_return: string;
}

export interface Metadata {
  created_at: CreatedAt;
  line_item_return_created_at: CreatedAt;
  line_item_processed_at: CreatedAt;
  product_name: IsNewCustomer;
  product_title: IsNewCustomer;
  product_sku: IsNewCustomer;
  shipping_address_zipcode: OrderDiscountCode;
  shipping_address_city: OrderDiscountCode;
  shipping_address_country: OrderDiscountCode;
  shipping_address_state: OrderDiscountCode;
  order_discount_code: OrderDiscountCode;
  tags: OrderDiscountCode;
  is_new_customer: IsNewCustomer;
  order_day_of_week: IsNewCustomer;
  order_week_start_date: CreatedAt;
  order_month: IsNewCustomer;
  order_year: CreatedAt;
}

export interface CreatedAt {
  max: string;
  min: string;
}

export interface IsNewCustomer {
  distinct: string[];
}

export interface OrderDiscountCode {
  distinct: Array<null | string>;
}
