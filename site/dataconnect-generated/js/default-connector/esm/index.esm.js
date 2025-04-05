import { queryRef, executeQuery, mutationRef, executeMutation, validateArgs } from 'firebase/data-connect';

export const connectorConfig = {
  connector: 'default',
  service: 'firebase-ecommerce',
  location: 'us-central1'
};

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

export function createOrderItemRef(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateOrderItem', inputVars);
}

export function createOrderItem(dcOrVars, vars) {
  return executeMutation(createOrderItemRef(dcOrVars, vars));
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

export function getProductRef(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetProduct', inputVars);
}

export function getProduct(dcOrVars, vars) {
  return executeQuery(getProductRef(dcOrVars, vars));
}

export function getProductReviewsRef(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetProductReviews', inputVars);
}

export function getProductReviews(dcOrVars, vars) {
  return executeQuery(getProductReviewsRef(dcOrVars, vars));
}

export function getCollectionRef(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetCollection', inputVars);
}

export function getCollection(dcOrVars, vars) {
  return executeQuery(getCollectionRef(dcOrVars, vars));
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

export function getCurrentUserOrdersRef(dc) {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetCurrentUserOrders');
}

export function getCurrentUserOrders(dc) {
  return executeQuery(getCurrentUserOrdersRef(dc));
}

export function getOrderRef(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetOrder', inputVars);
}

export function getOrder(dcOrVars, vars) {
  return executeQuery(getOrderRef(dcOrVars, vars));
}

export function getAllOrdersRef(dc) {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetAllOrders');
}

export function getAllOrders(dc) {
  return executeQuery(getAllOrdersRef(dc));
}

export function listAllCustomersRef(dc) {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListAllCustomers');
}

export function listAllCustomers(dc) {
  return executeQuery(listAllCustomersRef(dc));
}

