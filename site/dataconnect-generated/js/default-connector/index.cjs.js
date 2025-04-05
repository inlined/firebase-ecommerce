const { queryRef, executeQuery, mutationRef, executeMutation, validateArgs } = require('firebase/data-connect');

const connectorConfig = {
  connector: 'default',
  service: 'firebase-ecommerce',
  location: 'us-central1'
};
exports.connectorConfig = connectorConfig;

exports.upsertCustomerRef = function upsertCustomerRef(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpsertCustomer', inputVars);
}

exports.upsertCustomer = function upsertCustomer(dcOrVars, vars) {
  return executeMutation(upsertCustomerRef(dcOrVars, vars));
};

exports.createProductReviewRef = function createProductReviewRef(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateProductReview', inputVars);
}

exports.createProductReview = function createProductReview(dcOrVars, vars) {
  return executeMutation(createProductReviewRef(dcOrVars, vars));
};

exports.createOrderRef = function createOrderRef(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateOrder', inputVars);
}

exports.createOrder = function createOrder(dcOrVars, vars) {
  return executeMutation(createOrderRef(dcOrVars, vars));
};

exports.createOrderItemRef = function createOrderItemRef(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateOrderItem', inputVars);
}

exports.createOrderItem = function createOrderItem(dcOrVars, vars) {
  return executeMutation(createOrderItemRef(dcOrVars, vars));
};

exports.updateOrderByPaymentIntentIdRef = function updateOrderByPaymentIntentIdRef(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateOrderByPaymentIntentId', inputVars);
}

exports.updateOrderByPaymentIntentId = function updateOrderByPaymentIntentId(dcOrVars, vars) {
  return executeMutation(updateOrderByPaymentIntentIdRef(dcOrVars, vars));
};

exports.updateOrderByChargeIdRef = function updateOrderByChargeIdRef(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateOrderByChargeId', inputVars);
}

exports.updateOrderByChargeId = function updateOrderByChargeId(dcOrVars, vars) {
  return executeMutation(updateOrderByChargeIdRef(dcOrVars, vars));
};

exports.getProductRef = function getProductRef(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetProduct', inputVars);
}

exports.getProduct = function getProduct(dcOrVars, vars) {
  return executeQuery(getProductRef(dcOrVars, vars));
};

exports.getProductReviewsRef = function getProductReviewsRef(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetProductReviews', inputVars);
}

exports.getProductReviews = function getProductReviews(dcOrVars, vars) {
  return executeQuery(getProductReviewsRef(dcOrVars, vars));
};

exports.getCollectionRef = function getCollectionRef(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetCollection', inputVars);
}

exports.getCollection = function getCollection(dcOrVars, vars) {
  return executeQuery(getCollectionRef(dcOrVars, vars));
};

exports.getCollectionsByPageRef = function getCollectionsByPageRef(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetCollectionsByPage', inputVars);
}

exports.getCollectionsByPage = function getCollectionsByPage(dcOrVars, vars) {
  return executeQuery(getCollectionsByPageRef(dcOrVars, vars));
};

exports.searchRef = function searchRef(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'Search', inputVars);
}

exports.search = function search(dcOrVars, vars) {
  return executeQuery(searchRef(dcOrVars, vars));
};

exports.getCurrentUserOrdersRef = function getCurrentUserOrdersRef(dc) {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetCurrentUserOrders');
}

exports.getCurrentUserOrders = function getCurrentUserOrders(dc) {
  return executeQuery(getCurrentUserOrdersRef(dc));
};

exports.getOrderRef = function getOrderRef(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetOrder', inputVars);
}

exports.getOrder = function getOrder(dcOrVars, vars) {
  return executeQuery(getOrderRef(dcOrVars, vars));
};

exports.getAllOrdersRef = function getAllOrdersRef(dc) {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetAllOrders');
}

exports.getAllOrders = function getAllOrders(dc) {
  return executeQuery(getAllOrdersRef(dc));
};

exports.listAllCustomersRef = function listAllCustomersRef(dc) {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListAllCustomers');
}

exports.listAllCustomers = function listAllCustomers(dc) {
  return executeQuery(listAllCustomersRef(dc));
};
