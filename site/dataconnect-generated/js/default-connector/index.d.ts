import { ConnectorConfig, DataConnect, QueryRef, QueryPromise, MutationRef, MutationPromise } from 'firebase/data-connect';

export const connectorConfig: ConnectorConfig;

export type TimestampString = string;
export type UUIDString = string;
export type Int64String = string;
export type DateString = string;


export interface Collection_Key {
  id: UUIDString;
  __typename?: 'Collection_Key';
}

export interface CreateOrderData {
  order_insert: Order_Key;
}

export interface CreateOrderItemData {
  orderItem_insert: OrderItem_Key;
}

export interface CreateOrderItemVariables {
  orderId: UUIDString;
  productId: UUIDString;
  quantity: number;
  price: number;
}

export interface CreateOrderVariables {
  customerId: string;
  chargeId?: string | null;
  paymentIntentId?: string | null;
  receiptUrl?: string | null;
  subtotalPrice: number;
  totalTax: number;
  totalShippingPrice: number;
  totalPrice: number;
  financialStatus: string;
  fulfillmentStatus: string;
}

export interface CreateProductReviewData {
  productReview_insert: ProductReview_Key;
}

export interface CreateProductReviewVariables {
  productId: UUIDString;
  rating: number;
  content: string;
}

export interface Customer_Key {
  id: string;
  __typename?: 'Customer_Key';
}

export interface GetAllOrdersData {
  orders: ({
    id: UUIDString;
    customerId: string;
    processedAt: TimestampString;
    receiptUrl?: string | null;
    totalPrice: number;
    financialStatus: string;
    fulfillmentStatus: string;
    items: ({
      id: UUIDString;
      price: number;
      product: {
        id: UUIDString;
        title: string;
        handle: string;
      } & Product_Key;
    } & OrderItem_Key)[];
  } & Order_Key)[];
}

export interface GetCollectionByHandleData {
  collections: ({
    id: UUIDString;
    name: string;
    description?: string | null;
    page?: string | null;
    featuredImage?: {
      url: string;
      width: number;
      height: number;
      altText?: string | null;
    };
      seo?: {
        title: string;
        description: string;
        keywords: string;
      };
        products_via_ProductCollection: ({
          id: UUIDString;
          title: string;
          handle: string;
          description?: string | null;
          availableForSale: boolean;
          createdAt: TimestampString;
          updatedAt: TimestampString;
          productVariants_on_product: ({
            id: UUIDString;
            price: number;
            availableForSale: boolean;
            inventoryQuantity: number;
            selectedOptions_on_productVariant: ({
              name?: string | null;
              value?: string | null;
            })[];
          } & ProductVariant_Key)[];
            productImages_on_product: ({
              id: UUIDString;
              url: string;
              altText?: string | null;
              width: number;
              height: number;
              displayPosition: number;
            } & ProductImage_Key)[];
        } & Product_Key)[];
  } & Collection_Key)[];
}

export interface GetCollectionByHandleVariables {
  handle: string;
  page?: string | null;
}

export interface GetCollectionsByPageData {
  collections: ({
    id: UUIDString;
    name: string;
    description?: string | null;
    handle: string;
    page?: string | null;
    featuredImage?: {
      url: string;
      width: number;
      height: number;
      altText?: string | null;
    };
      products: ({
        id: UUIDString;
        title: string;
        handle: string;
        description?: string | null;
        variants: ({
          id: UUIDString;
          price: number;
          selectedOptions_on_productVariant: ({
            name?: string | null;
            value?: string | null;
          })[];
        } & ProductVariant_Key)[];
          images: ({
            id: UUIDString;
            url: string;
            altText?: string | null;
            width: number;
            height: number;
            displayPosition: number;
          } & ProductImage_Key)[];
      } & Product_Key)[];
  } & Collection_Key)[];
}

export interface GetCollectionsByPageVariables {
  page?: string | null;
}

export interface GetOrderByIdData {
  order?: {
    id: UUIDString;
    customerId: string;
    processedAt: TimestampString;
    receiptUrl?: string | null;
    totalPrice: number;
    financialStatus: string;
    fulfillmentStatus: string;
    items: ({
      id: UUIDString;
      quantity: number;
      price: number;
      product: {
        id: UUIDString;
        title: string;
        handle: string;
        images: ({
          url: string;
          altText?: string | null;
          width: number;
          height: number;
        })[];
      } & Product_Key;
    } & OrderItem_Key)[];
  } & Order_Key;
}

export interface GetOrderByIdVariables {
  id: UUIDString;
}

export interface GetOrdersByCustomerIdData {
  orders: ({
    id: UUIDString;
    customerId: string;
    processedAt: TimestampString;
    chargeId?: string | null;
    paymentIntentId?: string | null;
    receiptUrl?: string | null;
    subtotalPrice: number;
    totalPrice: number;
    financialStatus: string;
    fulfillmentStatus: string;
    items: ({
      id: UUIDString;
      quantity: number;
      price: number;
      product: {
        id: UUIDString;
        title: string;
        handle: string;
        images: ({
          url: string;
          altText?: string | null;
          width: number;
          height: number;
        })[];
      } & Product_Key;
    } & OrderItem_Key)[];
  } & Order_Key)[];
}

export interface GetProductByHandleData {
  product?: {
    id: UUIDString;
    title: string;
    description?: string | null;
    handle: string;
    availableForSale: boolean;
    createdAt: TimestampString;
    updatedAt: TimestampString;
    featuredImage?: {
      url: string;
      width: number;
      height: number;
      altText?: string | null;
    };
      seo?: {
        title: string;
        description: string;
        keywords: string;
      };
        productVariants_on_product: ({
          id: UUIDString;
          price: number;
          availableForSale: boolean;
          inventoryQuantity: number;
          selectedOptions_on_productVariant: ({
            name?: string | null;
            value?: string | null;
          })[];
        } & ProductVariant_Key)[];
          productImages_on_product: ({
            id: UUIDString;
            url: string;
            altText?: string | null;
            width: number;
            height: number;
            displayPosition: number;
          } & ProductImage_Key)[];
  } & Product_Key;
}

export interface GetProductByHandleVariables {
  handle: string;
}

export interface GetReviewsByHandleData {
  products: ({
    productReviews_on_product: ({
      id: UUIDString;
      rating: number;
      content: string;
      date: TimestampString;
      customer: {
        id: string;
        firstName: string;
        lastName: string;
      } & Customer_Key;
    })[];
  })[];
}

export interface GetReviewsByHandleVariables {
  handle: string;
}

export interface ListCustomersData {
  customers: ({
    id: string;
    firstName: string;
    lastName: string;
    email: string;
  } & Customer_Key)[];
}

export interface OrderItem_Key {
  id: UUIDString;
  __typename?: 'OrderItem_Key';
}

export interface Order_Key {
  id: UUIDString;
  __typename?: 'Order_Key';
}

export interface ProductCollection_Key {
  collectionId: UUIDString;
  productId: UUIDString;
  __typename?: 'ProductCollection_Key';
}

export interface ProductImage_Key {
  id: UUIDString;
  __typename?: 'ProductImage_Key';
}

export interface ProductOption_Key {
  id: UUIDString;
  __typename?: 'ProductOption_Key';
}

export interface ProductReview_Key {
  productId: UUIDString;
  customerId: string;
  __typename?: 'ProductReview_Key';
}

export interface ProductVariant_Key {
  id: UUIDString;
  __typename?: 'ProductVariant_Key';
}

export interface Product_Key {
  id: UUIDString;
  __typename?: 'Product_Key';
}

export interface SEO_Key {
  id: UUIDString;
  __typename?: 'SEO_Key';
}

export interface SearchData {
  productsByDescription: ({
    id: UUIDString;
    handle: string;
    title: string;
  } & Product_Key)[];
    productsByTitle: ({
      id: UUIDString;
      handle: string;
      title: string;
    } & Product_Key)[];
      reviews: ({
        product: {
          id: UUIDString;
          title: string;
          handle: string;
        } & Product_Key;
      })[];
}

export interface SearchVariables {
  query: string;
}

export interface SelectedOption_Key {
  id: UUIDString;
  __typename?: 'SelectedOption_Key';
}

export interface UpdateOrderByChargeIdData {
  order_update?: Order_Key | null;
}

export interface UpdateOrderByChargeIdVariables {
  financialStatus?: string | null;
  fulfillmentStatus?: string | null;
  receiptUrl?: string | null;
  processedAt?: TimestampString | null;
  chargeId?: string | null;
}

export interface UpdateOrderByPaymentIntentIdData {
  order_update?: Order_Key | null;
}

export interface UpdateOrderByPaymentIntentIdVariables {
  paymentIntentId: string;
  financialStatus?: string | null;
  fulfillmentStatus?: string | null;
  receiptUrl?: string | null;
  processedAt?: TimestampString | null;
  chargeId?: string | null;
}

export interface UpsertCustomerData {
  customer_upsert: Customer_Key;
}

export interface UpsertCustomerVariables {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  acceptsMarketing: boolean;
}

/* Allow users to create refs without passing in DataConnect */
export function listCustomersRef(): QueryRef<ListCustomersData, undefined>;
/* Allow users to pass in custom DataConnect instances */
export function listCustomersRef(dc: DataConnect): QueryRef<ListCustomersData, undefined>;

export function listCustomers(): QueryPromise<ListCustomersData, undefined>;
export function listCustomers(dc: DataConnect): QueryPromise<ListCustomersData, undefined>;

/* Allow users to create refs without passing in DataConnect */
export function getReviewsByHandleRef(vars: GetReviewsByHandleVariables): QueryRef<GetReviewsByHandleData, GetReviewsByHandleVariables>;
/* Allow users to pass in custom DataConnect instances */
export function getReviewsByHandleRef(dc: DataConnect, vars: GetReviewsByHandleVariables): QueryRef<GetReviewsByHandleData, GetReviewsByHandleVariables>;

export function getReviewsByHandle(vars: GetReviewsByHandleVariables): QueryPromise<GetReviewsByHandleData, GetReviewsByHandleVariables>;
export function getReviewsByHandle(dc: DataConnect, vars: GetReviewsByHandleVariables): QueryPromise<GetReviewsByHandleData, GetReviewsByHandleVariables>;

/* Allow users to create refs without passing in DataConnect */
export function getProductByHandleRef(vars: GetProductByHandleVariables): QueryRef<GetProductByHandleData, GetProductByHandleVariables>;
/* Allow users to pass in custom DataConnect instances */
export function getProductByHandleRef(dc: DataConnect, vars: GetProductByHandleVariables): QueryRef<GetProductByHandleData, GetProductByHandleVariables>;

export function getProductByHandle(vars: GetProductByHandleVariables): QueryPromise<GetProductByHandleData, GetProductByHandleVariables>;
export function getProductByHandle(dc: DataConnect, vars: GetProductByHandleVariables): QueryPromise<GetProductByHandleData, GetProductByHandleVariables>;

/* Allow users to create refs without passing in DataConnect */
export function getCollectionByHandleRef(vars: GetCollectionByHandleVariables): QueryRef<GetCollectionByHandleData, GetCollectionByHandleVariables>;
/* Allow users to pass in custom DataConnect instances */
export function getCollectionByHandleRef(dc: DataConnect, vars: GetCollectionByHandleVariables): QueryRef<GetCollectionByHandleData, GetCollectionByHandleVariables>;

export function getCollectionByHandle(vars: GetCollectionByHandleVariables): QueryPromise<GetCollectionByHandleData, GetCollectionByHandleVariables>;
export function getCollectionByHandle(dc: DataConnect, vars: GetCollectionByHandleVariables): QueryPromise<GetCollectionByHandleData, GetCollectionByHandleVariables>;

/* Allow users to create refs without passing in DataConnect */
export function getCollectionsByPageRef(vars?: GetCollectionsByPageVariables): QueryRef<GetCollectionsByPageData, GetCollectionsByPageVariables>;
/* Allow users to pass in custom DataConnect instances */
export function getCollectionsByPageRef(dc: DataConnect, vars?: GetCollectionsByPageVariables): QueryRef<GetCollectionsByPageData, GetCollectionsByPageVariables>;

export function getCollectionsByPage(vars?: GetCollectionsByPageVariables): QueryPromise<GetCollectionsByPageData, GetCollectionsByPageVariables>;
export function getCollectionsByPage(dc: DataConnect, vars?: GetCollectionsByPageVariables): QueryPromise<GetCollectionsByPageData, GetCollectionsByPageVariables>;

/* Allow users to create refs without passing in DataConnect */
export function searchRef(vars: SearchVariables): QueryRef<SearchData, SearchVariables>;
/* Allow users to pass in custom DataConnect instances */
export function searchRef(dc: DataConnect, vars: SearchVariables): QueryRef<SearchData, SearchVariables>;

export function search(vars: SearchVariables): QueryPromise<SearchData, SearchVariables>;
export function search(dc: DataConnect, vars: SearchVariables): QueryPromise<SearchData, SearchVariables>;

/* Allow users to create refs without passing in DataConnect */
export function getOrdersByCustomerIdRef(): QueryRef<GetOrdersByCustomerIdData, undefined>;
/* Allow users to pass in custom DataConnect instances */
export function getOrdersByCustomerIdRef(dc: DataConnect): QueryRef<GetOrdersByCustomerIdData, undefined>;

export function getOrdersByCustomerId(): QueryPromise<GetOrdersByCustomerIdData, undefined>;
export function getOrdersByCustomerId(dc: DataConnect): QueryPromise<GetOrdersByCustomerIdData, undefined>;

/* Allow users to create refs without passing in DataConnect */
export function getOrderByIdRef(vars: GetOrderByIdVariables): QueryRef<GetOrderByIdData, GetOrderByIdVariables>;
/* Allow users to pass in custom DataConnect instances */
export function getOrderByIdRef(dc: DataConnect, vars: GetOrderByIdVariables): QueryRef<GetOrderByIdData, GetOrderByIdVariables>;

export function getOrderById(vars: GetOrderByIdVariables): QueryPromise<GetOrderByIdData, GetOrderByIdVariables>;
export function getOrderById(dc: DataConnect, vars: GetOrderByIdVariables): QueryPromise<GetOrderByIdData, GetOrderByIdVariables>;

/* Allow users to create refs without passing in DataConnect */
export function getAllOrdersRef(): QueryRef<GetAllOrdersData, undefined>;
/* Allow users to pass in custom DataConnect instances */
export function getAllOrdersRef(dc: DataConnect): QueryRef<GetAllOrdersData, undefined>;

export function getAllOrders(): QueryPromise<GetAllOrdersData, undefined>;
export function getAllOrders(dc: DataConnect): QueryPromise<GetAllOrdersData, undefined>;

/* Allow users to create refs without passing in DataConnect */
export function upsertCustomerRef(vars: UpsertCustomerVariables): MutationRef<UpsertCustomerData, UpsertCustomerVariables>;
/* Allow users to pass in custom DataConnect instances */
export function upsertCustomerRef(dc: DataConnect, vars: UpsertCustomerVariables): MutationRef<UpsertCustomerData, UpsertCustomerVariables>;

export function upsertCustomer(vars: UpsertCustomerVariables): MutationPromise<UpsertCustomerData, UpsertCustomerVariables>;
export function upsertCustomer(dc: DataConnect, vars: UpsertCustomerVariables): MutationPromise<UpsertCustomerData, UpsertCustomerVariables>;

/* Allow users to create refs without passing in DataConnect */
export function createProductReviewRef(vars: CreateProductReviewVariables): MutationRef<CreateProductReviewData, CreateProductReviewVariables>;
/* Allow users to pass in custom DataConnect instances */
export function createProductReviewRef(dc: DataConnect, vars: CreateProductReviewVariables): MutationRef<CreateProductReviewData, CreateProductReviewVariables>;

export function createProductReview(vars: CreateProductReviewVariables): MutationPromise<CreateProductReviewData, CreateProductReviewVariables>;
export function createProductReview(dc: DataConnect, vars: CreateProductReviewVariables): MutationPromise<CreateProductReviewData, CreateProductReviewVariables>;

/* Allow users to create refs without passing in DataConnect */
export function createOrderRef(vars: CreateOrderVariables): MutationRef<CreateOrderData, CreateOrderVariables>;
/* Allow users to pass in custom DataConnect instances */
export function createOrderRef(dc: DataConnect, vars: CreateOrderVariables): MutationRef<CreateOrderData, CreateOrderVariables>;

export function createOrder(vars: CreateOrderVariables): MutationPromise<CreateOrderData, CreateOrderVariables>;
export function createOrder(dc: DataConnect, vars: CreateOrderVariables): MutationPromise<CreateOrderData, CreateOrderVariables>;

/* Allow users to create refs without passing in DataConnect */
export function updateOrderByPaymentIntentIdRef(vars: UpdateOrderByPaymentIntentIdVariables): MutationRef<UpdateOrderByPaymentIntentIdData, UpdateOrderByPaymentIntentIdVariables>;
/* Allow users to pass in custom DataConnect instances */
export function updateOrderByPaymentIntentIdRef(dc: DataConnect, vars: UpdateOrderByPaymentIntentIdVariables): MutationRef<UpdateOrderByPaymentIntentIdData, UpdateOrderByPaymentIntentIdVariables>;

export function updateOrderByPaymentIntentId(vars: UpdateOrderByPaymentIntentIdVariables): MutationPromise<UpdateOrderByPaymentIntentIdData, UpdateOrderByPaymentIntentIdVariables>;
export function updateOrderByPaymentIntentId(dc: DataConnect, vars: UpdateOrderByPaymentIntentIdVariables): MutationPromise<UpdateOrderByPaymentIntentIdData, UpdateOrderByPaymentIntentIdVariables>;

/* Allow users to create refs without passing in DataConnect */
export function updateOrderByChargeIdRef(vars?: UpdateOrderByChargeIdVariables): MutationRef<UpdateOrderByChargeIdData, UpdateOrderByChargeIdVariables>;
/* Allow users to pass in custom DataConnect instances */
export function updateOrderByChargeIdRef(dc: DataConnect, vars?: UpdateOrderByChargeIdVariables): MutationRef<UpdateOrderByChargeIdData, UpdateOrderByChargeIdVariables>;

export function updateOrderByChargeId(vars?: UpdateOrderByChargeIdVariables): MutationPromise<UpdateOrderByChargeIdData, UpdateOrderByChargeIdVariables>;
export function updateOrderByChargeId(dc: DataConnect, vars?: UpdateOrderByChargeIdVariables): MutationPromise<UpdateOrderByChargeIdData, UpdateOrderByChargeIdVariables>;

/* Allow users to create refs without passing in DataConnect */
export function createOrderItemRef(vars: CreateOrderItemVariables): MutationRef<CreateOrderItemData, CreateOrderItemVariables>;
/* Allow users to pass in custom DataConnect instances */
export function createOrderItemRef(dc: DataConnect, vars: CreateOrderItemVariables): MutationRef<CreateOrderItemData, CreateOrderItemVariables>;

export function createOrderItem(vars: CreateOrderItemVariables): MutationPromise<CreateOrderItemData, CreateOrderItemVariables>;
export function createOrderItem(dc: DataConnect, vars: CreateOrderItemVariables): MutationPromise<CreateOrderItemData, CreateOrderItemVariables>;

