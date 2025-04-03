import { UpsertCustomerData, UpsertCustomerVariables, CreateProductReviewData, CreateProductReviewVariables, CreateOrderData, CreateOrderVariables, UpdateOrderByPaymentIntentIdData, UpdateOrderByPaymentIntentIdVariables, UpdateOrderByChargeIdData, UpdateOrderByChargeIdVariables, CreateOrderItemData, CreateOrderItemVariables, ListCustomersData, GetReviewsByProductIdData, GetReviewsByProductIdVariables, GetProductByHandleData, GetProductByHandleVariables, GetCollectionByHandleData, GetCollectionByHandleVariables, GetCollectionsByPageData, GetCollectionsByPageVariables, SearchData, SearchVariables, GetCurrentUsersOrdersData, GetOrderByIdData, GetOrderByIdVariables, GetAllOrdersData } from '../';
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

export function useUpdateOrderByPaymentIntentId(options?: useDataConnectMutationOptions<UpdateOrderByPaymentIntentIdData, FirebaseError, UpdateOrderByPaymentIntentIdVariables>): UseDataConnectMutationResult<UpdateOrderByPaymentIntentIdData, UpdateOrderByPaymentIntentIdVariables>;
export function useUpdateOrderByPaymentIntentId(dc: DataConnect, options?: useDataConnectMutationOptions<UpdateOrderByPaymentIntentIdData, FirebaseError, UpdateOrderByPaymentIntentIdVariables>): UseDataConnectMutationResult<UpdateOrderByPaymentIntentIdData, UpdateOrderByPaymentIntentIdVariables>;

export function useUpdateOrderByChargeId(options?: useDataConnectMutationOptions<UpdateOrderByChargeIdData, FirebaseError, UpdateOrderByChargeIdVariables | void>): UseDataConnectMutationResult<UpdateOrderByChargeIdData, UpdateOrderByChargeIdVariables>;
export function useUpdateOrderByChargeId(dc: DataConnect, options?: useDataConnectMutationOptions<UpdateOrderByChargeIdData, FirebaseError, UpdateOrderByChargeIdVariables | void>): UseDataConnectMutationResult<UpdateOrderByChargeIdData, UpdateOrderByChargeIdVariables>;

export function useCreateOrderItem(options?: useDataConnectMutationOptions<CreateOrderItemData, FirebaseError, CreateOrderItemVariables>): UseDataConnectMutationResult<CreateOrderItemData, CreateOrderItemVariables>;
export function useCreateOrderItem(dc: DataConnect, options?: useDataConnectMutationOptions<CreateOrderItemData, FirebaseError, CreateOrderItemVariables>): UseDataConnectMutationResult<CreateOrderItemData, CreateOrderItemVariables>;

export function useListCustomers(options?: useDataConnectQueryOptions<ListCustomersData>): UseDataConnectQueryResult<ListCustomersData, undefined>;
export function useListCustomers(dc: DataConnect, options?: useDataConnectQueryOptions<ListCustomersData>): UseDataConnectQueryResult<ListCustomersData, undefined>;

export function useGetReviewsByProductId(vars: GetReviewsByProductIdVariables, options?: useDataConnectQueryOptions<GetReviewsByProductIdData>): UseDataConnectQueryResult<GetReviewsByProductIdData, GetReviewsByProductIdVariables>;
export function useGetReviewsByProductId(dc: DataConnect, vars: GetReviewsByProductIdVariables, options?: useDataConnectQueryOptions<GetReviewsByProductIdData>): UseDataConnectQueryResult<GetReviewsByProductIdData, GetReviewsByProductIdVariables>;

export function useGetProductByHandle(vars: GetProductByHandleVariables, options?: useDataConnectQueryOptions<GetProductByHandleData>): UseDataConnectQueryResult<GetProductByHandleData, GetProductByHandleVariables>;
export function useGetProductByHandle(dc: DataConnect, vars: GetProductByHandleVariables, options?: useDataConnectQueryOptions<GetProductByHandleData>): UseDataConnectQueryResult<GetProductByHandleData, GetProductByHandleVariables>;

export function useGetCollectionByHandle(vars: GetCollectionByHandleVariables, options?: useDataConnectQueryOptions<GetCollectionByHandleData>): UseDataConnectQueryResult<GetCollectionByHandleData, GetCollectionByHandleVariables>;
export function useGetCollectionByHandle(dc: DataConnect, vars: GetCollectionByHandleVariables, options?: useDataConnectQueryOptions<GetCollectionByHandleData>): UseDataConnectQueryResult<GetCollectionByHandleData, GetCollectionByHandleVariables>;

export function useGetCollectionsByPage(vars?: GetCollectionsByPageVariables, options?: useDataConnectQueryOptions<GetCollectionsByPageData>): UseDataConnectQueryResult<GetCollectionsByPageData, GetCollectionsByPageVariables>;
export function useGetCollectionsByPage(dc: DataConnect, vars?: GetCollectionsByPageVariables, options?: useDataConnectQueryOptions<GetCollectionsByPageData>): UseDataConnectQueryResult<GetCollectionsByPageData, GetCollectionsByPageVariables>;

export function useSearch(vars: SearchVariables, options?: useDataConnectQueryOptions<SearchData>): UseDataConnectQueryResult<SearchData, SearchVariables>;
export function useSearch(dc: DataConnect, vars: SearchVariables, options?: useDataConnectQueryOptions<SearchData>): UseDataConnectQueryResult<SearchData, SearchVariables>;

export function useGetCurrentUsersOrders(options?: useDataConnectQueryOptions<GetCurrentUsersOrdersData>): UseDataConnectQueryResult<GetCurrentUsersOrdersData, undefined>;
export function useGetCurrentUsersOrders(dc: DataConnect, options?: useDataConnectQueryOptions<GetCurrentUsersOrdersData>): UseDataConnectQueryResult<GetCurrentUsersOrdersData, undefined>;

export function useGetOrderById(vars: GetOrderByIdVariables, options?: useDataConnectQueryOptions<GetOrderByIdData>): UseDataConnectQueryResult<GetOrderByIdData, GetOrderByIdVariables>;
export function useGetOrderById(dc: DataConnect, vars: GetOrderByIdVariables, options?: useDataConnectQueryOptions<GetOrderByIdData>): UseDataConnectQueryResult<GetOrderByIdData, GetOrderByIdVariables>;

export function useGetAllOrders(options?: useDataConnectQueryOptions<GetAllOrdersData>): UseDataConnectQueryResult<GetAllOrdersData, undefined>;
export function useGetAllOrders(dc: DataConnect, options?: useDataConnectQueryOptions<GetAllOrdersData>): UseDataConnectQueryResult<GetAllOrdersData, undefined>;
