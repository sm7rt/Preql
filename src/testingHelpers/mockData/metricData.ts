// noinspection DuplicatedCode

export default {
  data: [
    {
      company_id: 'fea204b1-b0e8-4c81-ad90-fd67ea30ca4a',
      created_at: '2022-08-31T17:49:46.601Z',
      description:
        'Count of distinct customer id where their first_order_date is in the selected date range',
      dimensions: [
        {
          expr: 'line_item_created_at::date',
          name: 'created_at',
          type: 'time',
          type_params: {
            is_primary: true,
            time_granularity: 'day',
          },
        },
        {
          expr: "case when customer_order_number = 1 THEN 'new' ELSE 'returning' END",
          name: 'is_new_customer',
          type: 'categorical',
        },
        {
          name: 'line_item_has_been_returned',
          type: 'categorical',
        },
        {
          expr: 'line_item_processed_at::date',
          name: 'line_item_processed_at',
          type: 'time',
          type_params: {
            is_primary: false,
            time_granularity: 'day',
          },
        },
        {
          expr: 'line_item_return_created_at::date',
          name: 'line_item_return_created_at',
          type: 'time',
          type_params: {
            is_primary: false,
            time_granularity: 'day',
          },
        },
        {
          expr: 'DAYNAME(line_item_created_at)',
          name: 'order_day_of_week',
          type: 'categorical',
        },
        {
          name: 'order_discount_code',
          type: 'categorical',
        },
        {
          expr: 'MONTHNAME(line_item_created_at)',
          name: 'order_month',
          type: 'categorical',
        },
        {
          expr: 'date(date_trunc(week, line_item_created_at))',
          name: 'order_week_start_date',
          type: 'categorical',
        },
        {
          expr: 'year(line_item_created_at)',
          name: 'order_year',
          type: 'categorical',
        },
        {
          name: 'product_name',
          type: 'categorical',
        },
        {
          name: 'product_sku',
          type: 'categorical',
        },
        {
          name: 'product_title',
          type: 'categorical',
        },
        {
          name: 'shipping_address_city',
          type: 'categorical',
        },
        {
          name: 'shipping_address_country',
          type: 'categorical',
        },
        {
          name: 'shipping_address_state',
          type: 'categorical',
        },
        {
          name: 'shipping_address_zipcode',
          type: 'categorical',
        },
        {
          name: 'tags',
          type: 'categorical',
        },
      ],
      display_name: 'New Customers',
      filters: [],
      id: '821395ee-507c-4a7c-b8d9-161a7dacbe4b',
      key: 'new_customers',
      metrics: [
        {
          agg: 'count_distinct',
          create_metric: true,
          description: 'All unique customers who placed an order',
          expr: 'customer_id',
          name: 'total_customers',
        },
      ],
      type: 'measure_proxy',
      updated_at: '2022-09-01T09:23:28.828Z',
      value: null,
    },
    {
      company_id: 'fea204b1-b0e8-4c81-ad90-fd67ea30ca4a',
      created_at: '2022-08-31T17:49:46.601Z',
      description: 'Sum of the total discount amount on orders',
      dimensions: [
        {
          expr: 'line_item_created_at::date',
          name: 'created_at',
          type: 'time',
          type_params: {
            is_primary: true,
            time_granularity: 'day',
          },
        },
        {
          expr: "case when customer_order_number = 1 THEN 'new' ELSE 'returning' END",
          name: 'is_new_customer',
          type: 'categorical',
        },
        {
          name: 'line_item_has_been_returned',
          type: 'categorical',
        },
        {
          expr: 'line_item_processed_at::date',
          name: 'line_item_processed_at',
          type: 'time',
          type_params: {
            is_primary: false,
            time_granularity: 'day',
          },
        },
        {
          expr: 'line_item_return_created_at::date',
          name: 'line_item_return_created_at',
          type: 'time',
          type_params: {
            is_primary: false,
            time_granularity: 'day',
          },
        },
        {
          expr: 'DAYNAME(line_item_created_at)',
          name: 'order_day_of_week',
          type: 'categorical',
        },
        {
          name: 'order_discount_code',
          type: 'categorical',
        },
        {
          expr: 'MONTHNAME(line_item_created_at)',
          name: 'order_month',
          type: 'categorical',
        },
        {
          expr: 'date(date_trunc(week, line_item_created_at))',
          name: 'order_week_start_date',
          type: 'categorical',
        },
        {
          expr: 'year(line_item_created_at)',
          name: 'order_year',
          type: 'categorical',
        },
        {
          name: 'product_name',
          type: 'categorical',
        },
        {
          name: 'product_sku',
          type: 'categorical',
        },
        {
          name: 'product_title',
          type: 'categorical',
        },
        {
          name: 'shipping_address_city',
          type: 'categorical',
        },
        {
          name: 'shipping_address_country',
          type: 'categorical',
        },
        {
          name: 'shipping_address_state',
          type: 'categorical',
        },
        {
          name: 'shipping_address_zipcode',
          type: 'categorical',
        },
        {
          name: 'tags',
          type: 'categorical',
        },
      ],
      display_name: 'Total Discount Amount',
      filters: [
        [
          {
            label: 'created_at',
            type: 'time',
            value: 'created_at',
          },
          {
            label: 'Date is',
            type: '',
            value: '=',
          },
          '2022-05-01T04:00:00.000Z',
        ],
        [
          {
            label: 'is_new_customer',
            type: 'categorical',
            value: 'is_new_customer',
          },
          {
            label: 'Do not include',
            type: '',
            value: '!=',
          },
          {
            label: 'False',
            type: 'boolean',
            value: 'FALSE',
          },
        ],
        [
          {
            label: 'is_new_customer',
            type: 'categorical',
            value: 'is_new_customer',
          },
          {
            label: 'Do not include',
            type: '',
            value: '!=',
          },
          {
            label: 'False',
            type: 'boolean',
            value: 'FALSE',
          },
        ],
      ],
      id: '317d4cff-743a-4c63-952a-ab004875b62e',
      key: 'total_discount_amount',
      metrics: [
        {
          agg: 'SUM',
          create_metric: false,
          description:
            'The total amount of a discount that was applied to an order which can be attributed to this order line. If the line_item_price was 80 and the customer used a 25% coupon, then this would be 20',
          expr: 'order_discount_attributed_to_order_line',
          name: 'order_discount_attributed_to_order_line',
        },
        {
          agg: 'SUM',
          create_metric: false,
          description:
            'Total discount off for line item. If I purchase 2 items and each are discounted 10 then line_item_discount = 20',
          expr: 'line_item_discount',
          name: 'line_item_discount',
        },
      ],
      type: 'expr',
      updated_at: '2022-09-10T03:35:44.739Z',
      value: null,
    },
    {
      company_id: 'fea204b1-b0e8-4c81-ad90-fd67ea30ca4a',
      created_at: '2022-08-31T17:49:46.601Z',
      description: 'Sum of all order totals net of discounts and net of COGS',
      dimensions: [
        {
          expr: 'line_item_created_at::date',
          name: 'created_at',
          type: 'time',
          type_params: {
            is_primary: true,
            time_granularity: 'day',
          },
        },
        {
          expr: "case when customer_order_number = 1 THEN 'new' ELSE 'returning' END",
          name: 'is_new_customer',
          type: 'categorical',
        },
        {
          name: 'line_item_has_been_returned',
          type: 'categorical',
        },
        {
          expr: 'line_item_processed_at::date',
          name: 'line_item_processed_at',
          type: 'time',
          type_params: {
            is_primary: false,
            time_granularity: 'day',
          },
        },
        {
          expr: 'line_item_return_created_at::date',
          name: 'line_item_return_created_at',
          type: 'time',
          type_params: {
            is_primary: false,
            time_granularity: 'day',
          },
        },
        {
          expr: 'DAYNAME(line_item_created_at)',
          name: 'order_day_of_week',
          type: 'categorical',
        },
        {
          name: 'order_discount_code',
          type: 'categorical',
        },
        {
          expr: 'MONTHNAME(line_item_created_at)',
          name: 'order_month',
          type: 'categorical',
        },
        {
          expr: 'date(date_trunc(week, line_item_created_at))',
          name: 'order_week_start_date',
          type: 'categorical',
        },
        {
          expr: 'year(line_item_created_at)',
          name: 'order_year',
          type: 'categorical',
        },
        {
          name: 'product_name',
          type: 'categorical',
        },
        {
          name: 'product_sku',
          type: 'categorical',
        },
        {
          name: 'product_title',
          type: 'categorical',
        },
        {
          name: 'shipping_address_city',
          type: 'categorical',
        },
        {
          name: 'shipping_address_country',
          type: 'categorical',
        },
        {
          name: 'shipping_address_state',
          type: 'categorical',
        },
        {
          name: 'shipping_address_zipcode',
          type: 'categorical',
        },
        {
          name: 'tags',
          type: 'categorical',
        },
      ],
      display_name: 'Gross Profit',
      filters: null,
      id: '006bdb63-1dff-4644-a848-02209ffffafb',
      key: 'gross_profit',
      metrics: [
        {
          agg: 'SUM',
          create_metric: true,
          description:
            'line_item_price - line_item_discount - order_discount_attributed_to_order_line',
          expr: 'line_item_price_net_of_all_discounts',
          name: 'net_revenue',
        },
        {
          agg: 'SUM',
          create_metric: true,
          description: 'Cost of Goods Sold * line_item_quantity_ordered',
          expr: 'cogs_ordered',
          name: 'total_cogs_ordered',
        },
      ],
      type: 'expr',
      updated_at: '2022-08-31T17:49:46.601Z',
      value: null,
    },
    {
      company_id: 'fea204b1-b0e8-4c81-ad90-fd67ea30ca4a',
      created_at: '2022-08-31T17:49:46.601Z',
      description: '(Net Revenue - COGS)/(Net Revenue)',
      dimensions: [
        {
          expr: 'line_item_created_at::date',
          name: 'created_at',
          type: 'time',
          type_params: {
            is_primary: true,
            time_granularity: 'day',
          },
        },
        {
          expr: "case when customer_order_number = 1 THEN 'new' ELSE 'returning' END",
          name: 'is_new_customer',
          type: 'categorical',
        },
        {
          name: 'line_item_has_been_returned',
          type: 'categorical',
        },
        {
          expr: 'line_item_processed_at::date',
          name: 'line_item_processed_at',
          type: 'time',
          type_params: {
            is_primary: false,
            time_granularity: 'day',
          },
        },
        {
          expr: 'line_item_return_created_at::date',
          name: 'line_item_return_created_at',
          type: 'time',
          type_params: {
            is_primary: false,
            time_granularity: 'day',
          },
        },
        {
          expr: 'DAYNAME(line_item_created_at)',
          name: 'order_day_of_week',
          type: 'categorical',
        },
        {
          name: 'order_discount_code',
          type: 'categorical',
        },
        {
          expr: 'MONTHNAME(line_item_created_at)',
          name: 'order_month',
          type: 'categorical',
        },
        {
          expr: 'date(date_trunc(week, line_item_created_at))',
          name: 'order_week_start_date',
          type: 'categorical',
        },
        {
          expr: 'year(line_item_created_at)',
          name: 'order_year',
          type: 'categorical',
        },
        {
          name: 'product_name',
          type: 'categorical',
        },
        {
          name: 'product_sku',
          type: 'categorical',
        },
        {
          name: 'product_title',
          type: 'categorical',
        },
        {
          name: 'shipping_address_city',
          type: 'categorical',
        },
        {
          name: 'shipping_address_country',
          type: 'categorical',
        },
        {
          name: 'shipping_address_state',
          type: 'categorical',
        },
        {
          name: 'shipping_address_zipcode',
          type: 'categorical',
        },
        {
          name: 'tags',
          type: 'categorical',
        },
      ],
      display_name: 'Gross Margin',
      filters: null,
      id: '5875cb46-f976-4e35-8f4d-f9f9774f03fb',
      key: 'gross_margin',
      metrics: [
        {
          agg: 'SUM',
          create_metric: true,
          description:
            'line_item_price - line_item_discount - order_discount_attributed_to_order_line',
          expr: 'line_item_price_net_of_all_discounts',
          name: 'net_revenue',
        },
        {
          agg: 'SUM',
          create_metric: true,
          description: 'Cost of Goods Sold * line_item_quantity_ordered',
          expr: 'cogs_ordered',
          name: 'total_cogs_ordered',
        },
      ],
      type: 'expr',
      updated_at: '2022-08-31T17:49:46.601Z',
      value: null,
    },
    {
      company_id: 'fea204b1-b0e8-4c81-ad90-fd67ea30ca4a',
      created_at: '2022-08-31T17:49:46.601Z',
      description: 'Distinct count of orders/distinct count of customers',
      dimensions: [
        {
          expr: 'line_item_created_at::date',
          name: 'created_at',
          type: 'time',
          type_params: {
            is_primary: true,
            time_granularity: 'day',
          },
        },
        {
          expr: "case when customer_order_number = 1 THEN 'new' ELSE 'returning' END",
          name: 'is_new_customer',
          type: 'categorical',
        },
        {
          name: 'line_item_has_been_returned',
          type: 'categorical',
        },
        {
          expr: 'line_item_processed_at::date',
          name: 'line_item_processed_at',
          type: 'time',
          type_params: {
            is_primary: false,
            time_granularity: 'day',
          },
        },
        {
          expr: 'line_item_return_created_at::date',
          name: 'line_item_return_created_at',
          type: 'time',
          type_params: {
            is_primary: false,
            time_granularity: 'day',
          },
        },
        {
          expr: 'DAYNAME(line_item_created_at)',
          name: 'order_day_of_week',
          type: 'categorical',
        },
        {
          name: 'order_discount_code',
          type: 'categorical',
        },
        {
          expr: 'MONTHNAME(line_item_created_at)',
          name: 'order_month',
          type: 'categorical',
        },
        {
          expr: 'date(date_trunc(week, line_item_created_at))',
          name: 'order_week_start_date',
          type: 'categorical',
        },
        {
          expr: 'year(line_item_created_at)',
          name: 'order_year',
          type: 'categorical',
        },
        {
          name: 'product_name',
          type: 'categorical',
        },
        {
          name: 'product_sku',
          type: 'categorical',
        },
        {
          name: 'product_title',
          type: 'categorical',
        },
        {
          name: 'shipping_address_city',
          type: 'categorical',
        },
        {
          name: 'shipping_address_country',
          type: 'categorical',
        },
        {
          name: 'shipping_address_state',
          type: 'categorical',
        },
        {
          name: 'shipping_address_zipcode',
          type: 'categorical',
        },
        {
          name: 'tags',
          type: 'categorical',
        },
      ],
      display_name: 'Orders per Customer',
      filters: null,
      id: 'd77ec98b-19f0-4e32-883d-7455d83815ed',
      key: 'orders_per_customer',
      metrics: [
        {
          agg: 'count_distinct',
          create_metric: true,
          description:
            'all distinct orders. If a single order contained multiple items this would still be 1',
          expr: 'order_id',
          name: 'total_orders',
        },
        {
          agg: 'count_distinct',
          create_metric: true,
          description: 'All unique customers who placed an order',
          expr: 'customer_id',
          name: 'total_customers',
        },
      ],
      type: 'ratio',
      updated_at: '2022-08-31T17:49:46.601Z',
      value: null,
    },
    {
      company_id: 'fea204b1-b0e8-4c81-ad90-fd67ea30ca4a',
      created_at: '2022-08-31T17:49:46.601Z',
      description: 'Sum of individual units sold as part of all orders',
      dimensions: [
        {
          expr: 'line_item_created_at::date',
          name: 'created_at',
          type: 'time',
          type_params: {
            is_primary: true,
            time_granularity: 'day',
          },
        },
        {
          expr: "case when customer_order_number = 1 THEN 'new' ELSE 'returning' END",
          name: 'is_new_customer',
          type: 'categorical',
        },
        {
          name: 'line_item_has_been_returned',
          type: 'categorical',
        },
        {
          expr: 'line_item_processed_at::date',
          name: 'line_item_processed_at',
          type: 'time',
          type_params: {
            is_primary: false,
            time_granularity: 'day',
          },
        },
        {
          expr: 'line_item_return_created_at::date',
          name: 'line_item_return_created_at',
          type: 'time',
          type_params: {
            is_primary: false,
            time_granularity: 'day',
          },
        },
        {
          expr: 'DAYNAME(line_item_created_at)',
          name: 'order_day_of_week',
          type: 'categorical',
        },
        {
          name: 'order_discount_code',
          type: 'categorical',
        },
        {
          expr: 'MONTHNAME(line_item_created_at)',
          name: 'order_month',
          type: 'categorical',
        },
        {
          expr: 'date(date_trunc(week, line_item_created_at))',
          name: 'order_week_start_date',
          type: 'categorical',
        },
        {
          expr: 'year(line_item_created_at)',
          name: 'order_year',
          type: 'categorical',
        },
        {
          name: 'product_name',
          type: 'categorical',
        },
        {
          name: 'product_sku',
          type: 'categorical',
        },
        {
          name: 'product_title',
          type: 'categorical',
        },
        {
          name: 'shipping_address_city',
          type: 'categorical',
        },
        {
          name: 'shipping_address_country',
          type: 'categorical',
        },
        {
          name: 'shipping_address_state',
          type: 'categorical',
        },
        {
          name: 'shipping_address_zipcode',
          type: 'categorical',
        },
        {
          name: 'tags',
          type: 'categorical',
        },
      ],
      display_name: 'Total Units Sold',
      filters: null,
      id: 'cdd7788d-178f-4eea-9e31-a8bd64a0f0e5',
      key: 'total_units_sold',
      metrics: [
        {
          agg: 'SUM',
          create_metric: true,
          description:
            'Quantity purchased for each line item. Example is buying 2 of the same shirt',
          expr: 'line_item_quantity_ordered',
          name: 'total_units_sold',
        },
      ],
      type: 'measure_proxy',
      updated_at: '2022-08-31T17:49:46.601Z',
      value: null,
    },
    {
      company_id: 'fea204b1-b0e8-4c81-ad90-fd67ea30ca4a',
      created_at: '2022-08-31T17:49:46.601Z',
      description: 'Sum of all order totals',
      dimensions: [
        {
          expr: 'line_item_created_at::date',
          name: 'created_at',
          type: 'time',
          type_params: {
            is_primary: true,
            time_granularity: 'day',
          },
        },
        {
          expr: "case when customer_order_number = 1 THEN 'new' ELSE 'returning' END",
          name: 'is_new_customer',
          type: 'categorical',
        },
        {
          name: 'line_item_has_been_returned',
          type: 'categorical',
        },
        {
          expr: 'line_item_processed_at::date',
          name: 'line_item_processed_at',
          type: 'time',
          type_params: {
            is_primary: false,
            time_granularity: 'day',
          },
        },
        {
          expr: 'line_item_return_created_at::date',
          name: 'line_item_return_created_at',
          type: 'time',
          type_params: {
            is_primary: false,
            time_granularity: 'day',
          },
        },
        {
          expr: 'DAYNAME(line_item_created_at)',
          name: 'order_day_of_week',
          type: 'categorical',
        },
        {
          name: 'order_discount_code',
          type: 'categorical',
        },
        {
          expr: 'MONTHNAME(line_item_created_at)',
          name: 'order_month',
          type: 'categorical',
        },
        {
          expr: 'date(date_trunc(week, line_item_created_at))',
          name: 'order_week_start_date',
          type: 'categorical',
        },
        {
          expr: 'year(line_item_created_at)',
          name: 'order_year',
          type: 'categorical',
        },
        {
          name: 'product_name',
          type: 'categorical',
        },
        {
          name: 'product_sku',
          type: 'categorical',
        },
        {
          name: 'product_title',
          type: 'categorical',
        },
        {
          name: 'shipping_address_city',
          type: 'categorical',
        },
        {
          name: 'shipping_address_country',
          type: 'categorical',
        },
        {
          name: 'shipping_address_state',
          type: 'categorical',
        },
        {
          name: 'shipping_address_zipcode',
          type: 'categorical',
        },
        {
          name: 'tags',
          type: 'categorical',
        },
      ],
      display_name: 'Total Sales ($)',
      filters: null,
      id: 'd6db99ad-6385-4893-91dc-501c1a358040',
      key: 'total_sales',
      metrics: [
        {
          agg: 'SUM',
          create_metric: true,
          description:
            'Quantity purchased x unit price. If I buy 2 shirts at 25 each then line_item_price is 50',
          expr: 'line_item_price',
          name: 'total_sales',
        },
      ],
      type: 'measure_proxy',
      updated_at: '2022-08-31T17:49:46.601Z',
      value: null,
    },
    {
      company_id: 'fea204b1-b0e8-4c81-ad90-fd67ea30ca4a',
      created_at: '2022-08-31T17:49:46.601Z',
      description: 'Sum of the sku cost for all skus sold',
      dimensions: [
        {
          expr: 'line_item_created_at::date',
          name: 'created_at',
          type: 'time',
          type_params: {
            is_primary: true,
            time_granularity: 'day',
          },
        },
        {
          expr: "case when customer_order_number = 1 THEN 'new' ELSE 'returning' END",
          name: 'is_new_customer',
          type: 'categorical',
        },
        {
          name: 'line_item_has_been_returned',
          type: 'categorical',
        },
        {
          expr: 'line_item_processed_at::date',
          name: 'line_item_processed_at',
          type: 'time',
          type_params: {
            is_primary: false,
            time_granularity: 'day',
          },
        },
        {
          expr: 'line_item_return_created_at::date',
          name: 'line_item_return_created_at',
          type: 'time',
          type_params: {
            is_primary: false,
            time_granularity: 'day',
          },
        },
        {
          expr: 'DAYNAME(line_item_created_at)',
          name: 'order_day_of_week',
          type: 'categorical',
        },
        {
          name: 'order_discount_code',
          type: 'categorical',
        },
        {
          expr: 'MONTHNAME(line_item_created_at)',
          name: 'order_month',
          type: 'categorical',
        },
        {
          expr: 'date(date_trunc(week, line_item_created_at))',
          name: 'order_week_start_date',
          type: 'categorical',
        },
        {
          expr: 'year(line_item_created_at)',
          name: 'order_year',
          type: 'categorical',
        },
        {
          name: 'product_name',
          type: 'categorical',
        },
        {
          name: 'product_sku',
          type: 'categorical',
        },
        {
          name: 'product_title',
          type: 'categorical',
        },
        {
          name: 'shipping_address_city',
          type: 'categorical',
        },
        {
          name: 'shipping_address_country',
          type: 'categorical',
        },
        {
          name: 'shipping_address_state',
          type: 'categorical',
        },
        {
          name: 'shipping_address_zipcode',
          type: 'categorical',
        },
        {
          name: 'tags',
          type: 'categorical',
        },
      ],
      display_name: 'Total COGS',
      filters: null,
      id: 'c5cb218b-6139-4fb0-b76f-2f0a8d756945',
      key: 'total_cogs_ordered',
      metrics: [
        {
          agg: 'SUM',
          create_metric: true,
          description: 'Cost of Goods Sold * line_item_quantity_ordered',
          expr: 'cogs_ordered',
          name: 'total_cogs_ordered',
        },
      ],
      type: 'measure_proxy',
      updated_at: '2022-08-31T17:49:46.601Z',
      value: null,
    },
    {
      company_id: 'fea204b1-b0e8-4c81-ad90-fd67ea30ca4a',
      created_at: '2022-08-31T17:49:46.601Z',
      description: '???',
      dimensions: [
        {
          expr: 'line_item_created_at::date',
          name: 'created_at',
          type: 'time',
          type_params: {
            is_primary: true,
            time_granularity: 'day',
          },
        },
        {
          expr: "case when customer_order_number = 1 THEN 'new' ELSE 'returning' END",
          name: 'is_new_customer',
          type: 'categorical',
        },
        {
          name: 'line_item_has_been_returned',
          type: 'categorical',
        },
        {
          expr: 'line_item_processed_at::date',
          name: 'line_item_processed_at',
          type: 'time',
          type_params: {
            is_primary: false,
            time_granularity: 'day',
          },
        },
        {
          expr: 'line_item_return_created_at::date',
          name: 'line_item_return_created_at',
          type: 'time',
          type_params: {
            is_primary: false,
            time_granularity: 'day',
          },
        },
        {
          expr: 'DAYNAME(line_item_created_at)',
          name: 'order_day_of_week',
          type: 'categorical',
        },
        {
          name: 'order_discount_code',
          type: 'categorical',
        },
        {
          expr: 'MONTHNAME(line_item_created_at)',
          name: 'order_month',
          type: 'categorical',
        },
        {
          expr: 'date(date_trunc(week, line_item_created_at))',
          name: 'order_week_start_date',
          type: 'categorical',
        },
        {
          expr: 'year(line_item_created_at)',
          name: 'order_year',
          type: 'categorical',
        },
        {
          name: 'product_name',
          type: 'categorical',
        },
        {
          name: 'product_sku',
          type: 'categorical',
        },
        {
          name: 'product_title',
          type: 'categorical',
        },
        {
          name: 'shipping_address_city',
          type: 'categorical',
        },
        {
          name: 'shipping_address_country',
          type: 'categorical',
        },
        {
          name: 'shipping_address_state',
          type: 'categorical',
        },
        {
          name: 'shipping_address_zipcode',
          type: 'categorical',
        },
        {
          name: 'tags',
          type: 'categorical',
        },
      ],
      display_name: 'Net Quantity',
      filters: null,
      id: 'cfca0fc6-0453-4182-80b3-7922724eef6e',
      key: 'net_quantity',
      metrics: [
        {
          agg: 'SUM',
          create_metric: true,
          description:
            '(line_item_quantity_ordered - line_item_quantity_returned)',
          expr: '(line_item_quantity_ordered - line_item_quantity_returned)',
          name: 'net_quantity',
        },
      ],
      type: 'measure_proxy',
      updated_at: '2022-08-31T17:49:46.601Z',
      value: null,
    },
    {
      company_id: 'fea204b1-b0e8-4c81-ad90-fd67ea30ca4a',
      created_at: '2022-08-31T17:49:46.601Z',
      description: 'Sum of all order totals net of discounts on the order',
      dimensions: [
        {
          expr: 'line_item_created_at::date',
          name: 'created_at',
          type: 'time',
          type_params: {
            is_primary: true,
            time_granularity: 'day',
          },
        },
        {
          expr: "case when customer_order_number = 1 THEN 'new' ELSE 'returning' END",
          name: 'is_new_customer',
          type: 'categorical',
        },
        {
          name: 'line_item_has_been_returned',
          type: 'categorical',
        },
        {
          expr: 'line_item_processed_at::date',
          name: 'line_item_processed_at',
          type: 'time',
          type_params: {
            is_primary: false,
            time_granularity: 'day',
          },
        },
        {
          expr: 'line_item_return_created_at::date',
          name: 'line_item_return_created_at',
          type: 'time',
          type_params: {
            is_primary: false,
            time_granularity: 'day',
          },
        },
        {
          expr: 'DAYNAME(line_item_created_at)',
          name: 'order_day_of_week',
          type: 'categorical',
        },
        {
          name: 'order_discount_code',
          type: 'categorical',
        },
        {
          expr: 'MONTHNAME(line_item_created_at)',
          name: 'order_month',
          type: 'categorical',
        },
        {
          expr: 'date(date_trunc(week, line_item_created_at))',
          name: 'order_week_start_date',
          type: 'categorical',
        },
        {
          expr: 'year(line_item_created_at)',
          name: 'order_year',
          type: 'categorical',
        },
        {
          name: 'product_name',
          type: 'categorical',
        },
        {
          name: 'product_sku',
          type: 'categorical',
        },
        {
          name: 'product_title',
          type: 'categorical',
        },
        {
          name: 'shipping_address_city',
          type: 'categorical',
        },
        {
          name: 'shipping_address_country',
          type: 'categorical',
        },
        {
          name: 'shipping_address_state',
          type: 'categorical',
        },
        {
          name: 'shipping_address_zipcode',
          type: 'categorical',
        },
        {
          name: 'tags',
          type: 'categorical',
        },
      ],
      display_name: 'Net Revenue',
      filters: null,
      id: 'b547bd7c-37f9-41c7-b416-3efc1d87df2c',
      key: 'net_revenue',
      metrics: [
        {
          agg: 'SUM',
          create_metric: true,
          description:
            'line_item_price - line_item_discount - order_discount_attributed_to_order_line',
          expr: 'line_item_price_net_of_all_discounts',
          name: 'net_revenue',
        },
      ],
      type: 'measure_proxy',
      updated_at: '2022-08-31T17:49:46.601Z',
      value: null,
    },
    {
      company_id: 'fea204b1-b0e8-4c81-ad90-fd67ea30ca4a',
      created_at: '2022-08-31T17:49:46.601Z',
      description: 'Count of distinct customer id',
      dimensions: [
        {
          expr: 'line_item_created_at::date',
          name: 'created_at',
          type: 'time',
          type_params: {
            is_primary: true,
            time_granularity: 'day',
          },
        },
        {
          expr: "case when customer_order_number = 1 THEN 'new' ELSE 'returning' END",
          name: 'is_new_customer',
          type: 'categorical',
        },
        {
          name: 'line_item_has_been_returned',
          type: 'categorical',
        },
        {
          expr: 'line_item_processed_at::date',
          name: 'line_item_processed_at',
          type: 'time',
          type_params: {
            is_primary: false,
            time_granularity: 'day',
          },
        },
        {
          expr: 'line_item_return_created_at::date',
          name: 'line_item_return_created_at',
          type: 'time',
          type_params: {
            is_primary: false,
            time_granularity: 'day',
          },
        },
        {
          expr: 'DAYNAME(line_item_created_at)',
          name: 'order_day_of_week',
          type: 'categorical',
        },
        {
          name: 'order_discount_code',
          type: 'categorical',
        },
        {
          expr: 'MONTHNAME(line_item_created_at)',
          name: 'order_month',
          type: 'categorical',
        },
        {
          expr: 'date(date_trunc(week, line_item_created_at))',
          name: 'order_week_start_date',
          type: 'categorical',
        },
        {
          expr: 'year(line_item_created_at)',
          name: 'order_year',
          type: 'categorical',
        },
        {
          name: 'product_name',
          type: 'categorical',
        },
        {
          name: 'product_sku',
          type: 'categorical',
        },
        {
          name: 'product_title',
          type: 'categorical',
        },
        {
          name: 'shipping_address_city',
          type: 'categorical',
        },
        {
          name: 'shipping_address_country',
          type: 'categorical',
        },
        {
          name: 'shipping_address_state',
          type: 'categorical',
        },
        {
          name: 'shipping_address_zipcode',
          type: 'categorical',
        },
        {
          name: 'tags',
          type: 'categorical',
        },
      ],
      display_name: 'Total Customers',
      filters: null,
      id: '9112775a-066b-4970-b17b-0acc92bf28af',
      key: 'total_customers',
      metrics: [
        {
          agg: 'count_distinct',
          create_metric: true,
          description: 'All unique customers who placed an order',
          expr: 'customer_id',
          name: 'total_customers',
        },
      ],
      type: 'measure_proxy',
      updated_at: '2022-08-31T17:49:46.601Z',
      value: null,
    },
    {
      company_id: 'fea204b1-b0e8-4c81-ad90-fd67ea30ca4a',
      created_at: '2022-08-31T17:49:46.601Z',
      description: 'Total number of orders',
      dimensions: [
        {
          expr: 'line_item_created_at::date',
          name: 'created_at',
          type: 'time',
          type_params: {
            is_primary: true,
            time_granularity: 'day',
          },
        },
        {
          expr: "case when customer_order_number = 1 THEN 'new' ELSE 'returning' END",
          name: 'is_new_customer',
          type: 'categorical',
        },
        {
          name: 'line_item_has_been_returned',
          type: 'categorical',
        },
        {
          expr: 'line_item_processed_at::date',
          name: 'line_item_processed_at',
          type: 'time',
          type_params: {
            is_primary: false,
            time_granularity: 'day',
          },
        },
        {
          expr: 'line_item_return_created_at::date',
          name: 'line_item_return_created_at',
          type: 'time',
          type_params: {
            is_primary: false,
            time_granularity: 'day',
          },
        },
        {
          expr: 'DAYNAME(line_item_created_at)',
          name: 'order_day_of_week',
          type: 'categorical',
        },
        {
          name: 'order_discount_code',
          type: 'categorical',
        },
        {
          expr: 'MONTHNAME(line_item_created_at)',
          name: 'order_month',
          type: 'categorical',
        },
        {
          expr: 'date(date_trunc(week, line_item_created_at))',
          name: 'order_week_start_date',
          type: 'categorical',
        },
        {
          expr: 'year(line_item_created_at)',
          name: 'order_year',
          type: 'categorical',
        },
        {
          name: 'product_name',
          type: 'categorical',
        },
        {
          name: 'product_sku',
          type: 'categorical',
        },
        {
          name: 'product_title',
          type: 'categorical',
        },
        {
          name: 'shipping_address_city',
          type: 'categorical',
        },
        {
          name: 'shipping_address_country',
          type: 'categorical',
        },
        {
          name: 'shipping_address_state',
          type: 'categorical',
        },
        {
          name: 'shipping_address_zipcode',
          type: 'categorical',
        },
        {
          name: 'tags',
          type: 'categorical',
        },
      ],
      display_name: 'Total Orders',
      filters: null,
      id: 'b24777fb-102d-413c-ba89-47867bbf2012',
      key: 'total_orders',
      metrics: [
        {
          agg: 'count_distinct',
          create_metric: true,
          description:
            'all distinct orders. If a single order contained multiple items this would still be 1',
          expr: 'order_id',
          name: 'total_orders',
        },
      ],
      type: 'measure_proxy',
      updated_at: '2022-08-31T17:49:46.601Z',
      value: null,
    },
    {
      company_id: 'fea204b1-b0e8-4c81-ad90-fd67ea30ca4a',
      created_at: '2022-08-31T17:49:46.601Z',
      description: 'Count distinct sku (shopify sku)',
      dimensions: [
        {
          expr: 'line_item_created_at::date',
          name: 'created_at',
          type: 'time',
          type_params: {
            is_primary: true,
            time_granularity: 'day',
          },
        },
        {
          expr: "case when customer_order_number = 1 THEN 'new' ELSE 'returning' END",
          name: 'is_new_customer',
          type: 'categorical',
        },
        {
          name: 'line_item_has_been_returned',
          type: 'categorical',
        },
        {
          expr: 'line_item_processed_at::date',
          name: 'line_item_processed_at',
          type: 'time',
          type_params: {
            is_primary: false,
            time_granularity: 'day',
          },
        },
        {
          expr: 'line_item_return_created_at::date',
          name: 'line_item_return_created_at',
          type: 'time',
          type_params: {
            is_primary: false,
            time_granularity: 'day',
          },
        },
        {
          expr: 'DAYNAME(line_item_created_at)',
          name: 'order_day_of_week',
          type: 'categorical',
        },
        {
          name: 'order_discount_code',
          type: 'categorical',
        },
        {
          expr: 'MONTHNAME(line_item_created_at)',
          name: 'order_month',
          type: 'categorical',
        },
        {
          expr: 'date(date_trunc(week, line_item_created_at))',
          name: 'order_week_start_date',
          type: 'categorical',
        },
        {
          expr: 'year(line_item_created_at)',
          name: 'order_year',
          type: 'categorical',
        },
        {
          name: 'product_name',
          type: 'categorical',
        },
        {
          name: 'product_sku',
          type: 'categorical',
        },
        {
          name: 'product_title',
          type: 'categorical',
        },
        {
          name: 'shipping_address_city',
          type: 'categorical',
        },
        {
          name: 'shipping_address_country',
          type: 'categorical',
        },
        {
          name: 'shipping_address_state',
          type: 'categorical',
        },
        {
          name: 'shipping_address_zipcode',
          type: 'categorical',
        },
        {
          name: 'tags',
          type: 'categorical',
        },
      ],
      display_name: 'Number of SKUs',
      filters: null,
      id: 'a8302fe8-f15e-407c-8e9d-af5768e38883',
      key: 'number_of_skus',
      metrics: [
        {
          agg: 'count_distinct',
          create_metric: true,
          description: 'discount skus ordered',
          expr: 'product_sku',
          name: 'number_of_skus',
        },
      ],
      type: 'measure_proxy',
      updated_at: '2022-08-31T17:49:46.601Z',
      value: null,
    },
    {
      company_id: 'fea204b1-b0e8-4c81-ad90-fd67ea30ca4a',
      created_at: '2022-08-31T17:49:46.601Z',
      description: 'Total sum of money from all returned items',
      dimensions: [
        {
          expr: 'line_item_created_at::date',
          name: 'created_at',
          type: 'time',
          type_params: {
            is_primary: true,
            time_granularity: 'day',
          },
        },
        {
          expr: "case when customer_order_number = 1 THEN 'new' ELSE 'returning' END",
          name: 'is_new_customer',
          type: 'categorical',
        },
        {
          name: 'line_item_has_been_returned',
          type: 'categorical',
        },
        {
          expr: 'line_item_processed_at::date',
          name: 'line_item_processed_at',
          type: 'time',
          type_params: {
            is_primary: false,
            time_granularity: 'day',
          },
        },
        {
          expr: 'line_item_return_created_at::date',
          name: 'line_item_return_created_at',
          type: 'time',
          type_params: {
            is_primary: false,
            time_granularity: 'day',
          },
        },
        {
          expr: 'DAYNAME(line_item_created_at)',
          name: 'order_day_of_week',
          type: 'categorical',
        },
        {
          name: 'order_discount_code',
          type: 'categorical',
        },
        {
          expr: 'MONTHNAME(line_item_created_at)',
          name: 'order_month',
          type: 'categorical',
        },
        {
          expr: 'date(date_trunc(week, line_item_created_at))',
          name: 'order_week_start_date',
          type: 'categorical',
        },
        {
          expr: 'year(line_item_created_at)',
          name: 'order_year',
          type: 'categorical',
        },
        {
          name: 'product_name',
          type: 'categorical',
        },
        {
          name: 'product_sku',
          type: 'categorical',
        },
        {
          name: 'product_title',
          type: 'categorical',
        },
        {
          name: 'shipping_address_city',
          type: 'categorical',
        },
        {
          name: 'shipping_address_country',
          type: 'categorical',
        },
        {
          name: 'shipping_address_state',
          type: 'categorical',
        },
        {
          name: 'shipping_address_zipcode',
          type: 'categorical',
        },
        {
          name: 'tags',
          type: 'categorical',
        },
      ],
      display_name: 'Total Returned Amount',
      filters: null,
      id: 'e5ba7072-255a-4ce2-bd45-158de1b9b4e4',
      key: 'total_returned_amount',
      metrics: [
        {
          agg: 'SUM',
          create_metric: true,
          description:
            'line_item_price_net_of_all_discounts * (line_item_quantity_returned / line_item_quantity_ordered). If the original purchase was 100 (net of discounts) and they returned everything this will be 100',
          expr: 'line_item_price_net_of_all_discounts * (line_item_quantity_returned / line_item_quantity_ordered)',
          name: 'total_returned_amount',
        },
      ],
      type: 'measure_proxy',
      updated_at: '2022-08-31T17:49:46.601Z',
      value: null,
    },
    {
      company_id: 'fea204b1-b0e8-4c81-ad90-fd67ea30ca4a',
      created_at: '2022-08-31T17:49:46.601Z',
      description: 'Total sum of all returned items',
      dimensions: [
        {
          expr: 'line_item_created_at::date',
          name: 'created_at',
          type: 'time',
          type_params: {
            is_primary: true,
            time_granularity: 'day',
          },
        },
        {
          expr: "case when customer_order_number = 1 THEN 'new' ELSE 'returning' END",
          name: 'is_new_customer',
          type: 'categorical',
        },
        {
          name: 'line_item_has_been_returned',
          type: 'categorical',
        },
        {
          expr: 'line_item_processed_at::date',
          name: 'line_item_processed_at',
          type: 'time',
          type_params: {
            is_primary: false,
            time_granularity: 'day',
          },
        },
        {
          expr: 'line_item_return_created_at::date',
          name: 'line_item_return_created_at',
          type: 'time',
          type_params: {
            is_primary: false,
            time_granularity: 'day',
          },
        },
        {
          expr: 'DAYNAME(line_item_created_at)',
          name: 'order_day_of_week',
          type: 'categorical',
        },
        {
          name: 'order_discount_code',
          type: 'categorical',
        },
        {
          expr: 'MONTHNAME(line_item_created_at)',
          name: 'order_month',
          type: 'categorical',
        },
        {
          expr: 'date(date_trunc(week, line_item_created_at))',
          name: 'order_week_start_date',
          type: 'categorical',
        },
        {
          expr: 'year(line_item_created_at)',
          name: 'order_year',
          type: 'categorical',
        },
        {
          name: 'product_name',
          type: 'categorical',
        },
        {
          name: 'product_sku',
          type: 'categorical',
        },
        {
          name: 'product_title',
          type: 'categorical',
        },
        {
          name: 'shipping_address_city',
          type: 'categorical',
        },
        {
          name: 'shipping_address_country',
          type: 'categorical',
        },
        {
          name: 'shipping_address_state',
          type: 'categorical',
        },
        {
          name: 'shipping_address_zipcode',
          type: 'categorical',
        },
        {
          name: 'tags',
          type: 'categorical',
        },
      ],
      display_name: 'Total Returned Orders',
      filters: null,
      id: 'bb164741-975a-4e87-ab29-0c0cd0f6a721',
      key: 'total_returned_orders',
      metrics: [
        {
          agg: 'count_distinct',
          create_metric: true,
          description: 'total orders that have a return',
          expr: 'CASE WHEN line_item_has_been_returned is not null then order_id else NULL end',
          name: 'total_returned_orders',
        },
      ],
      type: 'measure_proxy',
      updated_at: '2022-08-31T17:49:46.601Z',
      value: null,
    },
    {
      company_id: 'fea204b1-b0e8-4c81-ad90-fd67ea30ca4a',
      created_at: '2022-08-31T17:49:46.601Z',
      description:
        'Total sum of all order totals divided by the number of distinct orders',
      dimensions: [
        {
          expr: 'line_item_created_at::date',
          name: 'created_at',
          type: 'time',
          type_params: {
            is_primary: true,
            time_granularity: 'day',
          },
        },
        {
          expr: "case when customer_order_number = 1 THEN 'new' ELSE 'returning' END",
          name: 'is_new_customer',
          type: 'categorical',
        },
        {
          name: 'line_item_has_been_returned',
          type: 'categorical',
        },
        {
          expr: 'line_item_processed_at::date',
          name: 'line_item_processed_at',
          type: 'time',
          type_params: {
            is_primary: false,
            time_granularity: 'day',
          },
        },
        {
          expr: 'line_item_return_created_at::date',
          name: 'line_item_return_created_at',
          type: 'time',
          type_params: {
            is_primary: false,
            time_granularity: 'day',
          },
        },
        {
          expr: 'DAYNAME(line_item_created_at)',
          name: 'order_day_of_week',
          type: 'categorical',
        },
        {
          name: 'order_discount_code',
          type: 'categorical',
        },
        {
          expr: 'MONTHNAME(line_item_created_at)',
          name: 'order_month',
          type: 'categorical',
        },
        {
          expr: 'date(date_trunc(week, line_item_created_at))',
          name: 'order_week_start_date',
          type: 'categorical',
        },
        {
          expr: 'year(line_item_created_at)',
          name: 'order_year',
          type: 'categorical',
        },
        {
          name: 'product_name',
          type: 'categorical',
        },
        {
          name: 'product_sku',
          type: 'categorical',
        },
        {
          name: 'product_title',
          type: 'categorical',
        },
        {
          name: 'shipping_address_city',
          type: 'categorical',
        },
        {
          name: 'shipping_address_country',
          type: 'categorical',
        },
        {
          name: 'shipping_address_state',
          type: 'categorical',
        },
        {
          name: 'shipping_address_zipcode',
          type: 'categorical',
        },
        {
          name: 'tags',
          type: 'categorical',
        },
      ],
      display_name: 'Average Order Value ($)',
      filters: [],
      id: 'cd6155d6-cf10-455c-bf14-8f70cd67383c',
      key: 'average_order_value',
      metrics: [
        {
          agg: 'SUM',
          create_metric: true,
          description:
            'Quantity purchased x unit price. If I buy 2 shirts at 25 each then line_item_price is 50',
          expr: 'line_item_price',
          name: 'total_sales',
        },
        {
          agg: 'count_distinct',
          create_metric: true,
          description:
            'all distinct orders. If a single order contained multiple items this would still be 1',
          expr: 'order_id',
          name: 'total_orders',
        },
      ],
      type: 'ratio',
      updated_at: '2022-09-01T08:57:42.208Z',
      value: null,
    },
    {
      company_id: 'fea204b1-b0e8-4c81-ad90-fd67ea30ca4a',
      created_at: '2022-08-31T17:49:46.601Z',
      description:
        'Count of distinct customer id where their first_order_date is previous to the selected date range',
      dimensions: [
        {
          expr: 'line_item_created_at::date',
          name: 'created_at',
          type: 'time',
          type_params: {
            is_primary: true,
            time_granularity: 'day',
          },
        },
        {
          expr: "case when customer_order_number = 1 THEN 'new' ELSE 'returning' END",
          name: 'is_new_customer',
          type: 'categorical',
        },
        {
          name: 'line_item_has_been_returned',
          type: 'categorical',
        },
        {
          expr: 'line_item_processed_at::date',
          name: 'line_item_processed_at',
          type: 'time',
          type_params: {
            is_primary: false,
            time_granularity: 'day',
          },
        },
        {
          expr: 'line_item_return_created_at::date',
          name: 'line_item_return_created_at',
          type: 'time',
          type_params: {
            is_primary: false,
            time_granularity: 'day',
          },
        },
        {
          expr: 'DAYNAME(line_item_created_at)',
          name: 'order_day_of_week',
          type: 'categorical',
        },
        {
          name: 'order_discount_code',
          type: 'categorical',
        },
        {
          expr: 'MONTHNAME(line_item_created_at)',
          name: 'order_month',
          type: 'categorical',
        },
        {
          expr: 'date(date_trunc(week, line_item_created_at))',
          name: 'order_week_start_date',
          type: 'categorical',
        },
        {
          expr: 'year(line_item_created_at)',
          name: 'order_year',
          type: 'categorical',
        },
        {
          name: 'product_name',
          type: 'categorical',
        },
        {
          name: 'product_sku',
          type: 'categorical',
        },
        {
          name: 'product_title',
          type: 'categorical',
        },
        {
          name: 'shipping_address_city',
          type: 'categorical',
        },
        {
          name: 'shipping_address_country',
          type: 'categorical',
        },
        {
          name: 'shipping_address_state',
          type: 'categorical',
        },
        {
          name: 'shipping_address_zipcode',
          type: 'categorical',
        },
        {
          name: 'tags',
          type: 'categorical',
        },
      ],
      display_name: 'Returning Customers',
      filters: [],
      id: 'f03b4d1c-d230-4f77-900d-0915c48e0cf7',
      key: 'returning_customers',
      metrics: [
        {
          agg: 'count_distinct',
          create_metric: true,
          description: 'All unique customers who placed an order',
          expr: 'customer_id',
          name: 'total_customers',
        },
      ],
      type: 'measure_proxy',
      updated_at: '2022-09-01T19:52:48.254Z',
      value: null,
    },
    {
      company_id: 'fea204b1-b0e8-4c81-ad90-fd67ea30ca4a',
      created_at: '2022-08-31T17:49:46.601Z',
      description:
        'Total sum of all items divided by the number of distinct orders',
      dimensions: [
        {
          expr: 'line_item_created_at::date',
          name: 'created_at',
          type: 'time',
          type_params: {
            is_primary: true,
            time_granularity: 'day',
          },
        },
        {
          expr: "case when customer_order_number = 1 THEN 'new' ELSE 'returning' END",
          name: 'is_new_customer',
          type: 'categorical',
        },
        {
          name: 'line_item_has_been_returned',
          type: 'categorical',
        },
        {
          expr: 'line_item_processed_at::date',
          name: 'line_item_processed_at',
          type: 'time',
          type_params: {
            is_primary: false,
            time_granularity: 'day',
          },
        },
        {
          expr: 'line_item_return_created_at::date',
          name: 'line_item_return_created_at',
          type: 'time',
          type_params: {
            is_primary: false,
            time_granularity: 'day',
          },
        },
        {
          expr: 'DAYNAME(line_item_created_at)',
          name: 'order_day_of_week',
          type: 'categorical',
        },
        {
          name: 'order_discount_code',
          type: 'categorical',
        },
        {
          expr: 'MONTHNAME(line_item_created_at)',
          name: 'order_month',
          type: 'categorical',
        },
        {
          expr: 'date(date_trunc(week, line_item_created_at))',
          name: 'order_week_start_date',
          type: 'categorical',
        },
        {
          expr: 'year(line_item_created_at)',
          name: 'order_year',
          type: 'categorical',
        },
        {
          name: 'product_name',
          type: 'categorical',
        },
        {
          name: 'product_sku',
          type: 'categorical',
        },
        {
          name: 'product_title',
          type: 'categorical',
        },
        {
          name: 'shipping_address_city',
          type: 'categorical',
        },
        {
          name: 'shipping_address_country',
          type: 'categorical',
        },
        {
          name: 'shipping_address_state',
          type: 'categorical',
        },
        {
          name: 'shipping_address_zipcode',
          type: 'categorical',
        },
        {
          name: 'tags',
          type: 'categorical',
        },
      ],
      display_name: 'Average Units per Order',
      filters: [
        [
          {
            label: 'created_at',
            type: 'time',
            value: 'created_at',
          },
          {
            label: 'Date is',
            type: '',
            value: '=',
          },
          {
            label: '',
            type: '',
            value: '',
          },
        ],
      ],
      id: 'f6aaf8fd-6aa5-402b-a00a-ca9eab3cd6d6',
      key: 'average_units_per_order',
      metrics: [
        {
          agg: 'SUM',
          create_metric: true,
          description:
            'Quantity purchased for each line item. Example is buying 2 of the same shirt',
          expr: 'line_item_quantity_ordered',
          name: 'total_units_sold',
        },
        {
          agg: 'count_distinct',
          create_metric: true,
          description:
            'all distinct orders. If a single order contained multiple items this would still be 1',
          expr: 'order_id',
          name: 'total_orders',
        },
      ],
      type: 'ratio',
      updated_at: '2022-09-01T19:53:56.118Z',
      value: null,
    },
  ],
  message: 'success',
};
