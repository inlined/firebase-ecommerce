import { queryRef, executeQuery, mutationRef, executeMutation, validateArgs } from 'firebase/data-connect';

export const connectorConfig = {
  connector: 'default',
  service: 'firebase-ecommerce',
  location: 'us-central1'
};

export function listCustomersRef(dc) {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListCustomers');
}

export function listCustomers(dc) {
  return executeQuery(listCustomersRef(dc));
}

export function getReviewsByHandleRef(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetReviewsByHandle', inputVars);
}

export function getReviewsByHandle(dcOrVars, vars) {
  return executeQuery(getReviewsByHandleRef(dcOrVars, vars));
}

export function getProductByHandleRef(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetProductByHandle', inputVars);
}

export function getProductByHandle(dcOrVars, vars) {
  return executeQuery(getProductByHandleRef(dcOrVars, vars));
}

export function getCollectionByHandleRef(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetCollectionByHandle', inputVars);
}

export function getCollectionByHandle(dcOrVars, vars) {
  return executeQuery(getCollectionByHandleRef(dcOrVars, vars));
}

export function getCollectionsByPageRef(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetCollectionsByPage', inputVars);
}

export function getCollectionsByPage(dcOrVars, vars) {
  return executeQuery(getCollectionsByPageRef(dcOrVars, vars));
}

export function searchRef(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'Search', inputVars);
}

export function search(dcOrVars, vars) {
  return executeQuery(searchRef(dcOrVars, vars));
}

export function getCurrentUsersOrdersRef(dc) {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetCurrentUsersOrders');
}

export function getCurrentUsersOrders(dc) {
  return executeQuery(getCurrentUsersOrdersRef(dc));
}

export function getOrderByIdRef(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetOrderById', inputVars);
}

export function getOrderById(dcOrVars, vars) {
  return executeQuery(getOrderByIdRef(dcOrVars, vars));
}

export function getAllOrdersRef(dc) {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetAllOrders');
}

export function getAllOrders(dc) {
  return executeQuery(getAllOrdersRef(dc));
}

export function upsertCustomerRef(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpsertCustomer', inputVars);
}

export function upsertCustomer(dcOrVars, vars) {
  return executeMutation(upsertCustomerRef(dcOrVars, vars));
}

export function createProductReviewRef(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateProductReview', inputVars);
}

export function createProductReview(dcOrVars, vars) {
  return executeMutation(createProductReviewRef(dcOrVars, vars));
}

export function createOrderRef(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateOrder', inputVars);
}

export function createOrder(dcOrVars, vars) {
  return executeMutation(createOrderRef(dcOrVars, vars));
}

export function updateOrderByPaymentIntentIdRef(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateOrderByPaymentIntentId', inputVars);
}

export function updateOrderByPaymentIntentId(dcOrVars, vars) {
  return executeMutation(updateOrderByPaymentIntentIdRef(dcOrVars, vars));
}

export function updateOrderByChargeIdRef(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateOrderByChargeId', inputVars);
}

export function updateOrderByChargeId(dcOrVars, vars) {
  return executeMutation(updateOrderByChargeIdRef(dcOrVars, vars));
}

export function createOrderItemRef(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateOrderItem', inputVars);
}

export function createOrderItem(dcOrVars, vars) {
  return executeMutation(createOrderItemRef(dcOrVars, vars));
}

