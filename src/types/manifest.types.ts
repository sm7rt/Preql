export interface Manifest {
  expr: Expr;
  fields: Expr;
  metadata: Metadata;
}

export interface Expr {
  created_at: string;
  is_new_customer: string;
  line_item_has_a_return: string;
  line_item_processed_at: string;
  line_item_return_created_at: string;
  order_day_of_week: string;
  order_discount_code: string;
  order_month: string;
  order_week_start_date: string;
  order_year: string;
  product_name: string;
  product_sku: string;
  product_title: string;
  shipping_address_city: string;
  shipping_address_country: string;
  shipping_address_state: string;
  shipping_address_zipcode: string;
  tags: string;
}

export interface Metadata {
  created_at: CreatedAt;
  is_new_customer: IsNewCustomer;
  line_item_processed_at: CreatedAt;
  line_item_return_created_at: CreatedAt;
  order_day_of_week: IsNewCustomer;
  order_discount_code: OrderDiscountCode;
  order_month: IsNewCustomer;
  order_week_start_date: CreatedAt;
  order_year: CreatedAt;
  product_name: IsNewCustomer;
  product_sku: IsNewCustomer;
  product_title: IsNewCustomer;
  shipping_address_city: OrderDiscountCode;
  shipping_address_country: OrderDiscountCode;
  shipping_address_state: OrderDiscountCode;
  shipping_address_zipcode: OrderDiscountCode;
  tags: OrderDiscountCode;
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
