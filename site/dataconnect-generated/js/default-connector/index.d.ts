import { ConnectorConfig, DataConnect, QueryRef, QueryPromise, MutationRef, MutationPromise } from 'firebase/data-connect';

export const connectorConfig: ConnectorConfig;

export type TimestampString = string;
export type UUIDString = string;
export type Int64String = string;
export type DateString = string;


export interface Collection_Key {
  id: string;
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
  productId: string;
  quantity: number;
  price: number;
}

export interface CreateOrderVariables {
  chargeId?: string | null;
  customerId?: string | null;
  shippingStreet1: string;
  shippingStreet2?: string | null;
  shippingCity: string;
  shippingState: string;
  shippingZip: string;
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
  productId: string;
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
    paymentIntentId?: string | null;
    items: ({
      id: UUIDString;
      price: number;
      product: {
        id: string;
        title: string;
      } & Product_Key;
    } & OrderItem_Key)[];
  } & Order_Key)[];
}

export interface GetCollectionData {
  collection?: {
    id: string;
    name: string;
    description?: string | null;
    page?: string | null;
    featuredImage: {
      url: string;
      width: number;
      height: number;
      altText: string;
    };
      seo?: {
        title: string;
        description: string;
        keywords: string;
      };
        products: ({
          id: string;
          title: string;
          description?: string | null;
          availableForSale: boolean;
          createdAt: TimestampString;
          updatedAt: TimestampString;
          featuredImage: {
            url: string;
            width: number;
            height: number;
            altText: string;
          };
            variants: ({
              sku: string;
              price: number;
              availableForSale: boolean;
              inventoryQuantity: number;
              selectedOptions: ({
                name: string;
                value: string;
              })[];
            } & ProductVariant_Key)[];
        } & Product_Key)[];
  } & Collection_Key;
}

export interface GetCollectionVariables {
  id: string;
}

export interface GetCollectionsByPageData {
  collections: ({
    id: string;
    name: string;
    description?: string | null;
    page?: string | null;
    featuredImage: {
      url: string;
      width: number;
      height: number;
      altText: string;
    };
      products: ({
        id: string;
        title: string;
        description?: string | null;
        featuredImage: {
          url: string;
          width: number;
          height: number;
          altText: string;
        };
          variants: ({
            sku: string;
            price: number;
            title: string;
            selectedOptions: ({
              name: string;
              value: string;
            })[];
          } & ProductVariant_Key)[];
      } & Product_Key)[];
  } & Collection_Key)[];
}

export interface GetCollectionsByPageVariables {
  page?: string | null;
}

export interface GetCurrentUserOrdersData {
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
        id: string;
        title: string;
        featuredImage: {
          url: string;
        };
      } & Product_Key;
    } & OrderItem_Key)[];
  } & Order_Key)[];
}

export interface GetOrderData {
  order?: {
    id: UUIDString;
    customerId: string;
    shippingStreet1: string;
    shippingStreet2?: string | null;
    shippingCity: string;
    shippingState: string;
    shippingZip: string;
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
        id: string;
        title: string;
        featuredImage: {
          url: string;
          width: number;
          height: number;
          altText: string;
        };
      } & Product_Key;
    } & OrderItem_Key)[];
  } & Order_Key;
}

export interface GetOrderVariables {
  id: UUIDString;
}

export interface GetProductData {
  product?: {
    id: string;
    title: string;
    description?: string | null;
    availableForSale: boolean;
    createdAt: TimestampString;
    updatedAt: TimestampString;
    featuredImage: {
      url: string;
      width: number;
      height: number;
      altText: string;
    };
      seo?: {
        title: string;
        description: string;
        keywords: string;
      };
        variants: ({
          sku: string;
          price: number;
          availableForSale: boolean;
          inventoryQuantity: number;
          selectedOptions_on_productVariant: ({
            name: string;
            value: string;
          })[];
        } & ProductVariant_Key)[];
  } & Product_Key;
}

export interface GetProductReviewsData {
  reviews: ({
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
}

export interface GetProductReviewsVariables {
  productId: string;
}

export interface GetProductVariables {
  id: string;
}

export interface Image_Key {
  id: string;
  __typename?: 'Image_Key';
}

export interface ListAllCustomersData {
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
  collectionId: string;
  productId: string;
  __typename?: 'ProductCollection_Key';
}

export interface ProductReview_Key {
  productId: string;
  customerId: string;
  __typename?: 'ProductReview_Key';
}

export interface ProductVariant_Key {
  sku: string;
  __typename?: 'ProductVariant_Key';
}

export interface Product_Key {
  id: string;
  __typename?: 'Product_Key';
}

export interface SearchData {
  productsByDescription: ({
    id: string;
    title: string;
  } & Product_Key)[];
    productsByTitle: ({
      id: string;
      title: string;
    } & Product_Key)[];
      reviews: ({
        product: {
          id: string;
          title: string;
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

export interface Seo_Key {
  id: string;
  __typename?: 'Seo_Key';
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
export function createOrderItemRef(vars: CreateOrderItemVariables): MutationRef<CreateOrderItemData, CreateOrderItemVariables>;
/* Allow users to pass in custom DataConnect instances */
export function createOrderItemRef(dc: DataConnect, vars: CreateOrderItemVariables): MutationRef<CreateOrderItemData, CreateOrderItemVariables>;

export function createOrderItem(vars: CreateOrderItemVariables): MutationPromise<CreateOrderItemData, CreateOrderItemVariables>;
export function createOrderItem(dc: DataConnect, vars: CreateOrderItemVariables): MutationPromise<CreateOrderItemData, CreateOrderItemVariables>;

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
export function getProductRef(vars: GetProductVariables): QueryRef<GetProductData, GetProductVariables>;
/* Allow users to pass in custom DataConnect instances */
export function getProductRef(dc: DataConnect, vars: GetProductVariables): QueryRef<GetProductData, GetProductVariables>;

export function getProduct(vars: GetProductVariables): QueryPromise<GetProductData, GetProductVariables>;
export function getProduct(dc: DataConnect, vars: GetProductVariables): QueryPromise<GetProductData, GetProductVariables>;

/* Allow users to create refs without passing in DataConnect */
export function getProductReviewsRef(vars: GetProductReviewsVariables): QueryRef<GetProductReviewsData, GetProductReviewsVariables>;
/* Allow users to pass in custom DataConnect instances */
export function getProductReviewsRef(dc: DataConnect, vars: GetProductReviewsVariables): QueryRef<GetProductReviewsData, GetProductReviewsVariables>;

export function getProductReviews(vars: GetProductReviewsVariables): QueryPromise<GetProductReviewsData, GetProductReviewsVariables>;
export function getProductReviews(dc: DataConnect, vars: GetProductReviewsVariables): QueryPromise<GetProductReviewsData, GetProductReviewsVariables>;

/* Allow users to create refs without passing in DataConnect */
export function getCollectionRef(vars: GetCollectionVariables): QueryRef<GetCollectionData, GetCollectionVariables>;
/* Allow users to pass in custom DataConnect instances */
export function getCollectionRef(dc: DataConnect, vars: GetCollectionVariables): QueryRef<GetCollectionData, GetCollectionVariables>;

export function getCollection(vars: GetCollectionVariables): QueryPromise<GetCollectionData, GetCollectionVariables>;
export function getCollection(dc: DataConnect, vars: GetCollectionVariables): QueryPromise<GetCollectionData, GetCollectionVariables>;

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
export function getCurrentUserOrdersRef(): QueryRef<GetCurrentUserOrdersData, undefined>;
/* Allow users to pass in custom DataConnect instances */
export function getCurrentUserOrdersRef(dc: DataConnect): QueryRef<GetCurrentUserOrdersData, undefined>;

export function getCurrentUserOrders(): QueryPromise<GetCurrentUserOrdersData, undefined>;
export function getCurrentUserOrders(dc: DataConnect): QueryPromise<GetCurrentUserOrdersData, undefined>;

/* Allow users to create refs without passing in DataConnect */
export function getOrderRef(vars: GetOrderVariables): QueryRef<GetOrderData, GetOrderVariables>;
/* Allow users to pass in custom DataConnect instances */
export function getOrderRef(dc: DataConnect, vars: GetOrderVariables): QueryRef<GetOrderData, GetOrderVariables>;

export function getOrder(vars: GetOrderVariables): QueryPromise<GetOrderData, GetOrderVariables>;
export function getOrder(dc: DataConnect, vars: GetOrderVariables): QueryPromise<GetOrderData, GetOrderVariables>;

/* Allow users to create refs without passing in DataConnect */
export function getAllOrdersRef(): QueryRef<GetAllOrdersData, undefined>;
/* Allow users to pass in custom DataConnect instances */
export function getAllOrdersRef(dc: DataConnect): QueryRef<GetAllOrdersData, undefined>;

export function getAllOrders(): QueryPromise<GetAllOrdersData, undefined>;
export function getAllOrders(dc: DataConnect): QueryPromise<GetAllOrdersData, undefined>;

/* Allow users to create refs without passing in DataConnect */
export function listAllCustomersRef(): QueryRef<ListAllCustomersData, undefined>;
/* Allow users to pass in custom DataConnect instances */
export function listAllCustomersRef(dc: DataConnect): QueryRef<ListAllCustomersData, undefined>;

export function listAllCustomers(): QueryPromise<ListAllCustomersData, undefined>;
export function listAllCustomers(dc: DataConnect): QueryPromise<ListAllCustomersData, undefined>;

