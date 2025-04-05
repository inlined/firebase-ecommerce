import { UpsertCustomerData, UpsertCustomerVariables, CreateProductReviewData, CreateProductReviewVariables, CreateOrderData, CreateOrderVariables, CreateOrderItemData, CreateOrderItemVariables, UpdateOrderByPaymentIntentIdData, UpdateOrderByPaymentIntentIdVariables, UpdateOrderByChargeIdData, UpdateOrderByChargeIdVariables, GetProductData, GetProductVariables, GetProductReviewsData, GetProductReviewsVariables, GetCollectionData, GetCollectionVariables, GetCollectionsByPageData, GetCollectionsByPageVariables, SearchData, SearchVariables, GetCurrentUserOrdersData, GetOrderData, GetOrderVariables, GetAllOrdersData, ListAllCustomersData } from '../';
import { UseDataConnectQueryResult, useDataConnectQueryOptions, UseDataConnectMutationResult, useDataConnectMutationOptions} from '@tanstack-query-firebase/react/data-connect';
import { UseQueryResult, UseMutationResult} from '@tanstack/react-query';
import { DataConnect } from 'firebase/data-connect';
import { FirebaseError } from 'firebase/app';


export function useUpsertCustomer(options?: useDataConnectMutationOptions<UpsertCustomerData, FirebaseError, UpsertCustomerVariables>): UseDataConnectMutationResult<UpsertCustomerData, UpsertCustomerVariables>;
export function useUpsertCustomer(dc: DataConnect, options?: useDataConnectMutationOptions<UpsertCustomerData, FirebaseError, UpsertCustomerVariables>): UseDataConnectMutationResult<UpsertCustomerData, UpsertCustomerVariables>;

export function useCreateProductReview(options?: useDataConnectMutationOptions<CreateProductReviewData, FirebaseError, CreateProductReviewVariables>): UseDataConnectMutationResult<CreateProductReviewData, CreateProductReviewVariables>;
export function useCreateProductReview(dc: DataConnect, options?: useDataConnectMutationOptions<CreateProductReviewData, FirebaseError, CreateProductReviewVariables>): UseDataConnectMutationResult<CreateProductReviewData, CreateProductReviewVariables>;

export function useCreateOrder(options?: useDataConnectMutationOptions<CreateOrderData, FirebaseError, CreateOrderVariables>): UseDataConnectMutationResult<CreateOrderData, CreateOrderVariables>;
export function useCreateOrder(dc: DataConnect, options?: useDataConnectMutationOptions<CreateOrderData, FirebaseError, CreateOrderVariables>): UseDataConnectMutationResult<CreateOrderData, CreateOrderVariables>;

export function useCreateOrderItem(options?: useDataConnectMutationOptions<CreateOrderItemData, FirebaseError, CreateOrderItemVariables>): UseDataConnectMutationResult<CreateOrderItemData, CreateOrderItemVariables>;
export function useCreateOrderItem(dc: DataConnect, options?: useDataConnectMutationOptions<CreateOrderItemData, FirebaseError, CreateOrderItemVariables>): UseDataConnectMutationResult<CreateOrderItemData, CreateOrderItemVariables>;

export function useUpdateOrderByPaymentIntentId(options?: useDataConnectMutationOptions<UpdateOrderByPaymentIntentIdData, FirebaseError, UpdateOrderByPaymentIntentIdVariables>): UseDataConnectMutationResult<UpdateOrderByPaymentIntentIdData, UpdateOrderByPaymentIntentIdVariables>;
export function useUpdateOrderByPaymentIntentId(dc: DataConnect, options?: useDataConnectMutationOptions<UpdateOrderByPaymentIntentIdData, FirebaseError, UpdateOrderByPaymentIntentIdVariables>): UseDataConnectMutationResult<UpdateOrderByPaymentIntentIdData, UpdateOrderByPaymentIntentIdVariables>;

export function useUpdateOrderByChargeId(options?: useDataConnectMutationOptions<UpdateOrderByChargeIdData, FirebaseError, UpdateOrderByChargeIdVariables | void>): UseDataConnectMutationResult<UpdateOrderByChargeIdData, UpdateOrderByChargeIdVariables>;
export function useUpdateOrderByChargeId(dc: DataConnect, options?: useDataConnectMutationOptions<UpdateOrderByChargeIdData, FirebaseError, UpdateOrderByChargeIdVariables | void>): UseDataConnectMutationResult<UpdateOrderByChargeIdData, UpdateOrderByChargeIdVariables>;

export function useGetProduct(vars: GetProductVariables, options?: useDataConnectQueryOptions<GetProductData>): UseDataConnectQueryResult<GetProductData, GetProductVariables>;
export function useGetProduct(dc: DataConnect, vars: GetProductVariables, options?: useDataConnectQueryOptions<GetProductData>): UseDataConnectQueryResult<GetProductData, GetProductVariables>;

export function useGetProductReviews(vars: GetProductReviewsVariables, options?: useDataConnectQueryOptions<GetProductReviewsData>): UseDataConnectQueryResult<GetProductReviewsData, GetProductReviewsVariables>;
export function useGetProductReviews(dc: DataConnect, vars: GetProductReviewsVariables, options?: useDataConnectQueryOptions<GetProductReviewsData>): UseDataConnectQueryResult<GetProductReviewsData, GetProductReviewsVariables>;

export function useGetCollection(vars: GetCollectionVariables, options?: useDataConnectQueryOptions<GetCollectionData>): UseDataConnectQueryResult<GetCollectionData, GetCollectionVariables>;
export function useGetCollection(dc: DataConnect, vars: GetCollectionVariables, options?: useDataConnectQueryOptions<GetCollectionData>): UseDataConnectQueryResult<GetCollectionData, GetCollectionVariables>;

export function useGetCollectionsByPage(vars?: GetCollectionsByPageVariables, options?: useDataConnectQueryOptions<GetCollectionsByPageData>): UseDataConnectQueryResult<GetCollectionsByPageData, GetCollectionsByPageVariables>;
export function useGetCollectionsByPage(dc: DataConnect, vars?: GetCollectionsByPageVariables, options?: useDataConnectQueryOptions<GetCollectionsByPageData>): UseDataConnectQueryResult<GetCollectionsByPageData, GetCollectionsByPageVariables>;

export function useSearch(vars: SearchVariables, options?: useDataConnectQueryOptions<SearchData>): UseDataConnectQueryResult<SearchData, SearchVariables>;
export function useSearch(dc: DataConnect, vars: SearchVariables, options?: useDataConnectQueryOptions<SearchData>): UseDataConnectQueryResult<SearchData, SearchVariables>;

export function useGetCurrentUserOrders(options?: useDataConnectQueryOptions<GetCurrentUserOrdersData>): UseDataConnectQueryResult<GetCurrentUserOrdersData, undefined>;
export function useGetCurrentUserOrders(dc: DataConnect, options?: useDataConnectQueryOptions<GetCurrentUserOrdersData>): UseDataConnectQueryResult<GetCurrentUserOrdersData, undefined>;

export function useGetOrder(vars: GetOrderVariables, options?: useDataConnectQueryOptions<GetOrderData>): UseDataConnectQueryResult<GetOrderData, GetOrderVariables>;
export function useGetOrder(dc: DataConnect, vars: GetOrderVariables, options?: useDataConnectQueryOptions<GetOrderData>): UseDataConnectQueryResult<GetOrderData, GetOrderVariables>;

export function useGetAllOrders(options?: useDataConnectQueryOptions<GetAllOrdersData>): UseDataConnectQueryResult<GetAllOrdersData, undefined>;
export function useGetAllOrders(dc: DataConnect, options?: useDataConnectQueryOptions<GetAllOrdersData>): UseDataConnectQueryResult<GetAllOrdersData, undefined>;

export function useListAllCustomers(options?: useDataConnectQueryOptions<ListAllCustomersData>): UseDataConnectQueryResult<ListAllCustomersData, undefined>;
export function useListAllCustomers(dc: DataConnect, options?: useDataConnectQueryOptions<ListAllCustomersData>): UseDataConnectQueryResult<ListAllCustomersData, undefined>;
