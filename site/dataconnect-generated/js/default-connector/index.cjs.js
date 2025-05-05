const { queryRef, executeQuery, mutationRef, executeMutation, validateArgs } = require('firebase/data-connect');

const connectorConfig = {
  connector: 'default',
  service: 'firebase-ecommerce',
  location: 'us-central1'
};
exports.connectorConfig = connectorConfig;

const upsertCustomerRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpsertCustomer', inputVars);
}
upsertCustomerRef.operationName = 'UpsertCustomer';
exports.upsertCustomerRef = upsertCustomerRef;

exports.upsertCustomer = function upsertCustomer(dcOrVars, vars) {
  return executeMutation(upsertCustomerRef(dcOrVars, vars));
};

const createProductReviewRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateProductReview', inputVars);
}
createProductReviewRef.operationName = 'CreateProductReview';
exports.createProductReviewRef = createProductReviewRef;

exports.createProductReview = function createProductReview(dcOrVars, vars) {
  return executeMutation(createProductReviewRef(dcOrVars, vars));
};

const createOrderRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateOrder', inputVars);
}
createOrderRef.operationName = 'CreateOrder';
exports.createOrderRef = createOrderRef;

exports.createOrder = function createOrder(dcOrVars, vars) {
  return executeMutation(createOrderRef(dcOrVars, vars));
};

const createOrderItemRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateOrderItem', inputVars);
}
createOrderItemRef.operationName = 'CreateOrderItem';
exports.createOrderItemRef = createOrderItemRef;

exports.createOrderItem = function createOrderItem(dcOrVars, vars) {
  return executeMutation(createOrderItemRef(dcOrVars, vars));
};

const updateOrderByPaymentIntentIdRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateOrderByPaymentIntentId', inputVars);
}
updateOrderByPaymentIntentIdRef.operationName = 'UpdateOrderByPaymentIntentId';
exports.updateOrderByPaymentIntentIdRef = updateOrderByPaymentIntentIdRef;

exports.updateOrderByPaymentIntentId = function updateOrderByPaymentIntentId(dcOrVars, vars) {
  return executeMutation(updateOrderByPaymentIntentIdRef(dcOrVars, vars));
};

const updateOrderByChargeIdRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateOrderByChargeId', inputVars);
}
updateOrderByChargeIdRef.operationName = 'UpdateOrderByChargeId';
exports.updateOrderByChargeIdRef = updateOrderByChargeIdRef;

exports.updateOrderByChargeId = function updateOrderByChargeId(dcOrVars, vars) {
  return executeMutation(updateOrderByChargeIdRef(dcOrVars, vars));
};

const getProductRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetProduct', inputVars);
}
getProductRef.operationName = 'GetProduct';
exports.getProductRef = getProductRef;

exports.getProduct = function getProduct(dcOrVars, vars) {
  return executeQuery(getProductRef(dcOrVars, vars));
};

const getProductReviewsRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetProductReviews', inputVars);
}
getProductReviewsRef.operationName = 'GetProductReviews';
exports.getProductReviewsRef = getProductReviewsRef;

exports.getProductReviews = function getProductReviews(dcOrVars, vars) {
  return executeQuery(getProductReviewsRef(dcOrVars, vars));
};

const getCollectionRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetCollection', inputVars);
}
getCollectionRef.operationName = 'GetCollection';
exports.getCollectionRef = getCollectionRef;

exports.getCollection = function getCollection(dcOrVars, vars) {
  return executeQuery(getCollectionRef(dcOrVars, vars));
};

const getCollectionsByPageRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetCollectionsByPage', inputVars);
}
getCollectionsByPageRef.operationName = 'GetCollectionsByPage';
exports.getCollectionsByPageRef = getCollectionsByPageRef;

exports.getCollectionsByPage = function getCollectionsByPage(dcOrVars, vars) {
  return executeQuery(getCollectionsByPageRef(dcOrVars, vars));
};

const searchRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'Search', inputVars);
}
searchRef.operationName = 'Search';
exports.searchRef = searchRef;

exports.search = function search(dcOrVars, vars) {
  return executeQuery(searchRef(dcOrVars, vars));
};

const getCurrentUserOrdersRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetCurrentUserOrders');
}
getCurrentUserOrdersRef.operationName = 'GetCurrentUserOrders';
exports.getCurrentUserOrdersRef = getCurrentUserOrdersRef;

exports.getCurrentUserOrders = function getCurrentUserOrders(dc) {
  return executeQuery(getCurrentUserOrdersRef(dc));
};

const getOrderRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetOrder', inputVars);
}
getOrderRef.operationName = 'GetOrder';
exports.getOrderRef = getOrderRef;

exports.getOrder = function getOrder(dcOrVars, vars) {
  return executeQuery(getOrderRef(dcOrVars, vars));
};

const getAllOrdersRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetAllOrders');
}
getAllOrdersRef.operationName = 'GetAllOrders';
exports.getAllOrdersRef = getAllOrdersRef;

exports.getAllOrders = function getAllOrders(dc) {
  return executeQuery(getAllOrdersRef(dc));
};

const listAllCustomersRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListAllCustomers');
}
listAllCustomersRef.operationName = 'ListAllCustomers';
exports.listAllCustomersRef = listAllCustomersRef;

exports.listAllCustomers = function listAllCustomers(dc) {
  return executeQuery(listAllCustomersRef(dc));
};
