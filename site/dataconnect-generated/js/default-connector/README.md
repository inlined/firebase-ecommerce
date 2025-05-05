# Table of Contents
- [**Overview**](#generated-javascript-readme)
- [**Accessing the connector**](#accessing-the-connector)
  - [*Connecting to the local Emulator*](#connecting-to-the-local-emulator)
- [**Queries**](#queries)
  - [*GetProduct*](#getproduct)
  - [*GetProductReviews*](#getproductreviews)
  - [*GetCollection*](#getcollection)
  - [*GetCollectionsByPage*](#getcollectionsbypage)
  - [*Search*](#search)
  - [*GetCurrentUserOrders*](#getcurrentuserorders)
  - [*GetOrder*](#getorder)
  - [*GetAllOrders*](#getallorders)
  - [*ListAllCustomers*](#listallcustomers)
- [**Mutations**](#mutations)
  - [*UpsertCustomer*](#upsertcustomer)
  - [*CreateProductReview*](#createproductreview)
  - [*CreateOrder*](#createorder)
  - [*CreateOrderItem*](#createorderitem)
  - [*UpdateOrderByPaymentIntentId*](#updateorderbypaymentintentid)
  - [*UpdateOrderByChargeId*](#updateorderbychargeid)

# Generated TypeScript README
This README will guide you through the process of using the generated JavaScript SDK package for the connector `default`. It will also provide examples on how to use your generated SDK to call your Data Connect queries and mutations.

***NOTE:** This README is generated alongside the generated SDK. If you make changes to this file, they will be overwritten when the SDK is regenerated.*

You can use this generated SDK by importing from the package `@firebasegen/default-connector` as shown below. Both CommonJS and ESM imports are supported.

You can also follow the instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#set-client).

# Accessing the connector
A connector is a collection of Queries and Mutations. One SDK is generated for each connector - this SDK is generated for the connector `default`.

You can find more information about connectors in the [Data Connect documentation](https://firebase.google.com/docs/data-connect#how-does).

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@firebasegen/default-connector';

const dataConnect = getDataConnect(connectorConfig);
```

## Connecting to the local Emulator
By default, the connector will connect to the production service.

To connect to the emulator, you can use the following code.
You can also follow the emulator instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#instrument-clients).

```typescript
import { connectDataConnectEmulator, getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@firebasegen/default-connector';

const dataConnect = getDataConnect(connectorConfig);
connectDataConnectEmulator(dataConnect, 'localhost', 9399);
```

After it's initialized, you can call your Data Connect [queries](#queries) and [mutations](#mutations) from your generated SDK.

# Queries

There are two ways to execute a Data Connect Query using the generated Web SDK:
- Using a Query Reference function, which returns a `QueryRef`
  - The `QueryRef` can be used as an argument to `executeQuery()`, which will execute the Query and return a `QueryPromise`
- Using an action shortcut function, which returns a `QueryPromise`
  - Calling the action shortcut function will execute the Query and return a `QueryPromise`

The following is true for both the action shortcut function and the `QueryRef` function:
- The `QueryPromise` returned will resolve to the result of the Query once it has finished executing
- If the Query accepts arguments, both the action shortcut function and the `QueryRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Query
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `default` connector's generated functions to execute each query. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-queries).

## GetProduct
You can execute the `GetProduct` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [default-connector/index.d.ts](./index.d.ts):
```typescript
getProduct(vars: GetProductVariables): QueryPromise<GetProductData, GetProductVariables>;

interface GetProductRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetProductVariables): QueryRef<GetProductData, GetProductVariables>;
}
export const getProductRef: GetProductRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getProduct(dc: DataConnect, vars: GetProductVariables): QueryPromise<GetProductData, GetProductVariables>;

interface GetProductRef {
  ...
  (dc: DataConnect, vars: GetProductVariables): QueryRef<GetProductData, GetProductVariables>;
}
export const getProductRef: GetProductRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getProductRef:
```typescript
const name = getProductRef.operationName;
console.log(name);
```

### Variables
The `GetProduct` query requires an argument of type `GetProductVariables`, which is defined in [default-connector/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetProductVariables {
  id: string;
}
```
### Return Type
Recall that executing the `GetProduct` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetProductData`, which is defined in [default-connector/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `GetProduct`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getProduct, GetProductVariables } from '@firebasegen/default-connector';

// The `GetProduct` query requires an argument of type `GetProductVariables`:
const getProductVars: GetProductVariables = {
  id: ..., 
};

// Call the `getProduct()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getProduct(getProductVars);
// Variables can be defined inline as well.
const { data } = await getProduct({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getProduct(dataConnect, getProductVars);

console.log(data.product);

// Or, you can use the `Promise` API.
getProduct(getProductVars).then((response) => {
  const data = response.data;
  console.log(data.product);
});
```

### Using `GetProduct`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getProductRef, GetProductVariables } from '@firebasegen/default-connector';

// The `GetProduct` query requires an argument of type `GetProductVariables`:
const getProductVars: GetProductVariables = {
  id: ..., 
};

// Call the `getProductRef()` function to get a reference to the query.
const ref = getProductRef(getProductVars);
// Variables can be defined inline as well.
const ref = getProductRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getProductRef(dataConnect, getProductVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.product);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.product);
});
```

## GetProductReviews
You can execute the `GetProductReviews` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [default-connector/index.d.ts](./index.d.ts):
```typescript
getProductReviews(vars: GetProductReviewsVariables): QueryPromise<GetProductReviewsData, GetProductReviewsVariables>;

interface GetProductReviewsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetProductReviewsVariables): QueryRef<GetProductReviewsData, GetProductReviewsVariables>;
}
export const getProductReviewsRef: GetProductReviewsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getProductReviews(dc: DataConnect, vars: GetProductReviewsVariables): QueryPromise<GetProductReviewsData, GetProductReviewsVariables>;

interface GetProductReviewsRef {
  ...
  (dc: DataConnect, vars: GetProductReviewsVariables): QueryRef<GetProductReviewsData, GetProductReviewsVariables>;
}
export const getProductReviewsRef: GetProductReviewsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getProductReviewsRef:
```typescript
const name = getProductReviewsRef.operationName;
console.log(name);
```

### Variables
The `GetProductReviews` query requires an argument of type `GetProductReviewsVariables`, which is defined in [default-connector/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetProductReviewsVariables {
  productId: string;
}
```
### Return Type
Recall that executing the `GetProductReviews` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetProductReviewsData`, which is defined in [default-connector/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `GetProductReviews`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getProductReviews, GetProductReviewsVariables } from '@firebasegen/default-connector';

// The `GetProductReviews` query requires an argument of type `GetProductReviewsVariables`:
const getProductReviewsVars: GetProductReviewsVariables = {
  productId: ..., 
};

// Call the `getProductReviews()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getProductReviews(getProductReviewsVars);
// Variables can be defined inline as well.
const { data } = await getProductReviews({ productId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getProductReviews(dataConnect, getProductReviewsVars);

console.log(data.reviews);

// Or, you can use the `Promise` API.
getProductReviews(getProductReviewsVars).then((response) => {
  const data = response.data;
  console.log(data.reviews);
});
```

### Using `GetProductReviews`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getProductReviewsRef, GetProductReviewsVariables } from '@firebasegen/default-connector';

// The `GetProductReviews` query requires an argument of type `GetProductReviewsVariables`:
const getProductReviewsVars: GetProductReviewsVariables = {
  productId: ..., 
};

// Call the `getProductReviewsRef()` function to get a reference to the query.
const ref = getProductReviewsRef(getProductReviewsVars);
// Variables can be defined inline as well.
const ref = getProductReviewsRef({ productId: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getProductReviewsRef(dataConnect, getProductReviewsVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.reviews);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.reviews);
});
```

## GetCollection
You can execute the `GetCollection` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [default-connector/index.d.ts](./index.d.ts):
```typescript
getCollection(vars: GetCollectionVariables): QueryPromise<GetCollectionData, GetCollectionVariables>;

interface GetCollectionRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetCollectionVariables): QueryRef<GetCollectionData, GetCollectionVariables>;
}
export const getCollectionRef: GetCollectionRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getCollection(dc: DataConnect, vars: GetCollectionVariables): QueryPromise<GetCollectionData, GetCollectionVariables>;

interface GetCollectionRef {
  ...
  (dc: DataConnect, vars: GetCollectionVariables): QueryRef<GetCollectionData, GetCollectionVariables>;
}
export const getCollectionRef: GetCollectionRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getCollectionRef:
```typescript
const name = getCollectionRef.operationName;
console.log(name);
```

### Variables
The `GetCollection` query requires an argument of type `GetCollectionVariables`, which is defined in [default-connector/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetCollectionVariables {
  id: string;
}
```
### Return Type
Recall that executing the `GetCollection` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetCollectionData`, which is defined in [default-connector/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `GetCollection`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getCollection, GetCollectionVariables } from '@firebasegen/default-connector';

// The `GetCollection` query requires an argument of type `GetCollectionVariables`:
const getCollectionVars: GetCollectionVariables = {
  id: ..., 
};

// Call the `getCollection()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getCollection(getCollectionVars);
// Variables can be defined inline as well.
const { data } = await getCollection({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getCollection(dataConnect, getCollectionVars);

console.log(data.collection);

// Or, you can use the `Promise` API.
getCollection(getCollectionVars).then((response) => {
  const data = response.data;
  console.log(data.collection);
});
```

### Using `GetCollection`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getCollectionRef, GetCollectionVariables } from '@firebasegen/default-connector';

// The `GetCollection` query requires an argument of type `GetCollectionVariables`:
const getCollectionVars: GetCollectionVariables = {
  id: ..., 
};

// Call the `getCollectionRef()` function to get a reference to the query.
const ref = getCollectionRef(getCollectionVars);
// Variables can be defined inline as well.
const ref = getCollectionRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getCollectionRef(dataConnect, getCollectionVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.collection);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.collection);
});
```

## GetCollectionsByPage
You can execute the `GetCollectionsByPage` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [default-connector/index.d.ts](./index.d.ts):
```typescript
getCollectionsByPage(vars?: GetCollectionsByPageVariables): QueryPromise<GetCollectionsByPageData, GetCollectionsByPageVariables>;

interface GetCollectionsByPageRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars?: GetCollectionsByPageVariables): QueryRef<GetCollectionsByPageData, GetCollectionsByPageVariables>;
}
export const getCollectionsByPageRef: GetCollectionsByPageRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getCollectionsByPage(dc: DataConnect, vars?: GetCollectionsByPageVariables): QueryPromise<GetCollectionsByPageData, GetCollectionsByPageVariables>;

interface GetCollectionsByPageRef {
  ...
  (dc: DataConnect, vars?: GetCollectionsByPageVariables): QueryRef<GetCollectionsByPageData, GetCollectionsByPageVariables>;
}
export const getCollectionsByPageRef: GetCollectionsByPageRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getCollectionsByPageRef:
```typescript
const name = getCollectionsByPageRef.operationName;
console.log(name);
```

### Variables
The `GetCollectionsByPage` query has an optional argument of type `GetCollectionsByPageVariables`, which is defined in [default-connector/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetCollectionsByPageVariables {
  page?: string | null;
}
```
### Return Type
Recall that executing the `GetCollectionsByPage` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetCollectionsByPageData`, which is defined in [default-connector/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `GetCollectionsByPage`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getCollectionsByPage, GetCollectionsByPageVariables } from '@firebasegen/default-connector';

// The `GetCollectionsByPage` query has an optional argument of type `GetCollectionsByPageVariables`:
const getCollectionsByPageVars: GetCollectionsByPageVariables = {
  page: ..., // optional
};

// Call the `getCollectionsByPage()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getCollectionsByPage(getCollectionsByPageVars);
// Variables can be defined inline as well.
const { data } = await getCollectionsByPage({ page: ..., });
// Since all variables are optional for this query, you can omit the `GetCollectionsByPageVariables` argument.
const { data } = await getCollectionsByPage();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getCollectionsByPage(dataConnect, getCollectionsByPageVars);

console.log(data.collections);

// Or, you can use the `Promise` API.
getCollectionsByPage(getCollectionsByPageVars).then((response) => {
  const data = response.data;
  console.log(data.collections);
});
```

### Using `GetCollectionsByPage`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getCollectionsByPageRef, GetCollectionsByPageVariables } from '@firebasegen/default-connector';

// The `GetCollectionsByPage` query has an optional argument of type `GetCollectionsByPageVariables`:
const getCollectionsByPageVars: GetCollectionsByPageVariables = {
  page: ..., // optional
};

// Call the `getCollectionsByPageRef()` function to get a reference to the query.
const ref = getCollectionsByPageRef(getCollectionsByPageVars);
// Variables can be defined inline as well.
const ref = getCollectionsByPageRef({ page: ..., });
// Since all variables are optional for this query, you can omit the `GetCollectionsByPageVariables` argument.
const ref = getCollectionsByPageRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getCollectionsByPageRef(dataConnect, getCollectionsByPageVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.collections);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.collections);
});
```

## Search
You can execute the `Search` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [default-connector/index.d.ts](./index.d.ts):
```typescript
search(vars: SearchVariables): QueryPromise<SearchData, SearchVariables>;

interface SearchRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: SearchVariables): QueryRef<SearchData, SearchVariables>;
}
export const searchRef: SearchRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
search(dc: DataConnect, vars: SearchVariables): QueryPromise<SearchData, SearchVariables>;

interface SearchRef {
  ...
  (dc: DataConnect, vars: SearchVariables): QueryRef<SearchData, SearchVariables>;
}
export const searchRef: SearchRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the searchRef:
```typescript
const name = searchRef.operationName;
console.log(name);
```

### Variables
The `Search` query requires an argument of type `SearchVariables`, which is defined in [default-connector/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface SearchVariables {
  query: string;
}
```
### Return Type
Recall that executing the `Search` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `SearchData`, which is defined in [default-connector/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface SearchData {
  productsByDescription: ({
    id: string;
    title: string;
    _metadata?: {
      distance?: number | null;
    };
  } & Product_Key)[];
    productsByTitle: ({
      id: string;
      title: string;
      _metadata?: {
        distance?: number | null;
      };
    } & Product_Key)[];
      reviews: ({
        product: {
          id: string;
          title: string;
          _metadata?: {
            distance?: number | null;
          };
        } & Product_Key;
      })[];
}
```
### Using `Search`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, search, SearchVariables } from '@firebasegen/default-connector';

// The `Search` query requires an argument of type `SearchVariables`:
const searchVars: SearchVariables = {
  query: ..., 
};

// Call the `search()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await search(searchVars);
// Variables can be defined inline as well.
const { data } = await search({ query: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await search(dataConnect, searchVars);

console.log(data.productsByDescription);
console.log(data.productsByTitle);
console.log(data.reviews);

// Or, you can use the `Promise` API.
search(searchVars).then((response) => {
  const data = response.data;
  console.log(data.productsByDescription);
  console.log(data.productsByTitle);
  console.log(data.reviews);
});
```

### Using `Search`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, searchRef, SearchVariables } from '@firebasegen/default-connector';

// The `Search` query requires an argument of type `SearchVariables`:
const searchVars: SearchVariables = {
  query: ..., 
};

// Call the `searchRef()` function to get a reference to the query.
const ref = searchRef(searchVars);
// Variables can be defined inline as well.
const ref = searchRef({ query: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = searchRef(dataConnect, searchVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.productsByDescription);
console.log(data.productsByTitle);
console.log(data.reviews);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.productsByDescription);
  console.log(data.productsByTitle);
  console.log(data.reviews);
});
```

## GetCurrentUserOrders
You can execute the `GetCurrentUserOrders` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [default-connector/index.d.ts](./index.d.ts):
```typescript
getCurrentUserOrders(): QueryPromise<GetCurrentUserOrdersData, undefined>;

interface GetCurrentUserOrdersRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetCurrentUserOrdersData, undefined>;
}
export const getCurrentUserOrdersRef: GetCurrentUserOrdersRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getCurrentUserOrders(dc: DataConnect): QueryPromise<GetCurrentUserOrdersData, undefined>;

interface GetCurrentUserOrdersRef {
  ...
  (dc: DataConnect): QueryRef<GetCurrentUserOrdersData, undefined>;
}
export const getCurrentUserOrdersRef: GetCurrentUserOrdersRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getCurrentUserOrdersRef:
```typescript
const name = getCurrentUserOrdersRef.operationName;
console.log(name);
```

### Variables
The `GetCurrentUserOrders` query has no variables.
### Return Type
Recall that executing the `GetCurrentUserOrders` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetCurrentUserOrdersData`, which is defined in [default-connector/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `GetCurrentUserOrders`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getCurrentUserOrders } from '@firebasegen/default-connector';


// Call the `getCurrentUserOrders()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getCurrentUserOrders();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getCurrentUserOrders(dataConnect);

console.log(data.orders);

// Or, you can use the `Promise` API.
getCurrentUserOrders().then((response) => {
  const data = response.data;
  console.log(data.orders);
});
```

### Using `GetCurrentUserOrders`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getCurrentUserOrdersRef } from '@firebasegen/default-connector';


// Call the `getCurrentUserOrdersRef()` function to get a reference to the query.
const ref = getCurrentUserOrdersRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getCurrentUserOrdersRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.orders);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.orders);
});
```

## GetOrder
You can execute the `GetOrder` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [default-connector/index.d.ts](./index.d.ts):
```typescript
getOrder(vars: GetOrderVariables): QueryPromise<GetOrderData, GetOrderVariables>;

interface GetOrderRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetOrderVariables): QueryRef<GetOrderData, GetOrderVariables>;
}
export const getOrderRef: GetOrderRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getOrder(dc: DataConnect, vars: GetOrderVariables): QueryPromise<GetOrderData, GetOrderVariables>;

interface GetOrderRef {
  ...
  (dc: DataConnect, vars: GetOrderVariables): QueryRef<GetOrderData, GetOrderVariables>;
}
export const getOrderRef: GetOrderRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getOrderRef:
```typescript
const name = getOrderRef.operationName;
console.log(name);
```

### Variables
The `GetOrder` query requires an argument of type `GetOrderVariables`, which is defined in [default-connector/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetOrderVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `GetOrder` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetOrderData`, which is defined in [default-connector/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `GetOrder`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getOrder, GetOrderVariables } from '@firebasegen/default-connector';

// The `GetOrder` query requires an argument of type `GetOrderVariables`:
const getOrderVars: GetOrderVariables = {
  id: ..., 
};

// Call the `getOrder()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getOrder(getOrderVars);
// Variables can be defined inline as well.
const { data } = await getOrder({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getOrder(dataConnect, getOrderVars);

console.log(data.order);

// Or, you can use the `Promise` API.
getOrder(getOrderVars).then((response) => {
  const data = response.data;
  console.log(data.order);
});
```

### Using `GetOrder`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getOrderRef, GetOrderVariables } from '@firebasegen/default-connector';

// The `GetOrder` query requires an argument of type `GetOrderVariables`:
const getOrderVars: GetOrderVariables = {
  id: ..., 
};

// Call the `getOrderRef()` function to get a reference to the query.
const ref = getOrderRef(getOrderVars);
// Variables can be defined inline as well.
const ref = getOrderRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getOrderRef(dataConnect, getOrderVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.order);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.order);
});
```

## GetAllOrders
You can execute the `GetAllOrders` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [default-connector/index.d.ts](./index.d.ts):
```typescript
getAllOrders(): QueryPromise<GetAllOrdersData, undefined>;

interface GetAllOrdersRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetAllOrdersData, undefined>;
}
export const getAllOrdersRef: GetAllOrdersRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getAllOrders(dc: DataConnect): QueryPromise<GetAllOrdersData, undefined>;

interface GetAllOrdersRef {
  ...
  (dc: DataConnect): QueryRef<GetAllOrdersData, undefined>;
}
export const getAllOrdersRef: GetAllOrdersRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getAllOrdersRef:
```typescript
const name = getAllOrdersRef.operationName;
console.log(name);
```

### Variables
The `GetAllOrders` query has no variables.
### Return Type
Recall that executing the `GetAllOrders` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetAllOrdersData`, which is defined in [default-connector/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `GetAllOrders`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getAllOrders } from '@firebasegen/default-connector';


// Call the `getAllOrders()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getAllOrders();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getAllOrders(dataConnect);

console.log(data.orders);

// Or, you can use the `Promise` API.
getAllOrders().then((response) => {
  const data = response.data;
  console.log(data.orders);
});
```

### Using `GetAllOrders`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getAllOrdersRef } from '@firebasegen/default-connector';


// Call the `getAllOrdersRef()` function to get a reference to the query.
const ref = getAllOrdersRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getAllOrdersRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.orders);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.orders);
});
```

## ListAllCustomers
You can execute the `ListAllCustomers` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [default-connector/index.d.ts](./index.d.ts):
```typescript
listAllCustomers(): QueryPromise<ListAllCustomersData, undefined>;

interface ListAllCustomersRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListAllCustomersData, undefined>;
}
export const listAllCustomersRef: ListAllCustomersRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listAllCustomers(dc: DataConnect): QueryPromise<ListAllCustomersData, undefined>;

interface ListAllCustomersRef {
  ...
  (dc: DataConnect): QueryRef<ListAllCustomersData, undefined>;
}
export const listAllCustomersRef: ListAllCustomersRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listAllCustomersRef:
```typescript
const name = listAllCustomersRef.operationName;
console.log(name);
```

### Variables
The `ListAllCustomers` query has no variables.
### Return Type
Recall that executing the `ListAllCustomers` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListAllCustomersData`, which is defined in [default-connector/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListAllCustomersData {
  customers: ({
    id: string;
    firstName: string;
    lastName: string;
    email: string;
  } & Customer_Key)[];
}
```
### Using `ListAllCustomers`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listAllCustomers } from '@firebasegen/default-connector';


// Call the `listAllCustomers()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listAllCustomers();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listAllCustomers(dataConnect);

console.log(data.customers);

// Or, you can use the `Promise` API.
listAllCustomers().then((response) => {
  const data = response.data;
  console.log(data.customers);
});
```

### Using `ListAllCustomers`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listAllCustomersRef } from '@firebasegen/default-connector';


// Call the `listAllCustomersRef()` function to get a reference to the query.
const ref = listAllCustomersRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listAllCustomersRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.customers);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.customers);
});
```

# Mutations

There are two ways to execute a Data Connect Mutation using the generated Web SDK:
- Using a Mutation Reference function, which returns a `MutationRef`
  - The `MutationRef` can be used as an argument to `executeMutation()`, which will execute the Mutation and return a `MutationPromise`
- Using an action shortcut function, which returns a `MutationPromise`
  - Calling the action shortcut function will execute the Mutation and return a `MutationPromise`

The following is true for both the action shortcut function and the `MutationRef` function:
- The `MutationPromise` returned will resolve to the result of the Mutation once it has finished executing
- If the Mutation accepts arguments, both the action shortcut function and the `MutationRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Mutation
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `default` connector's generated functions to execute each mutation. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-mutations).

## UpsertCustomer
You can execute the `UpsertCustomer` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [default-connector/index.d.ts](./index.d.ts):
```typescript
upsertCustomer(vars: UpsertCustomerVariables): MutationPromise<UpsertCustomerData, UpsertCustomerVariables>;

interface UpsertCustomerRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpsertCustomerVariables): MutationRef<UpsertCustomerData, UpsertCustomerVariables>;
}
export const upsertCustomerRef: UpsertCustomerRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
upsertCustomer(dc: DataConnect, vars: UpsertCustomerVariables): MutationPromise<UpsertCustomerData, UpsertCustomerVariables>;

interface UpsertCustomerRef {
  ...
  (dc: DataConnect, vars: UpsertCustomerVariables): MutationRef<UpsertCustomerData, UpsertCustomerVariables>;
}
export const upsertCustomerRef: UpsertCustomerRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the upsertCustomerRef:
```typescript
const name = upsertCustomerRef.operationName;
console.log(name);
```

### Variables
The `UpsertCustomer` mutation requires an argument of type `UpsertCustomerVariables`, which is defined in [default-connector/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpsertCustomerVariables {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  acceptsMarketing: boolean;
}
```
### Return Type
Recall that executing the `UpsertCustomer` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpsertCustomerData`, which is defined in [default-connector/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpsertCustomerData {
  customer_upsert: Customer_Key;
}
```
### Using `UpsertCustomer`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, upsertCustomer, UpsertCustomerVariables } from '@firebasegen/default-connector';

// The `UpsertCustomer` mutation requires an argument of type `UpsertCustomerVariables`:
const upsertCustomerVars: UpsertCustomerVariables = {
  firstName: ..., 
  lastName: ..., 
  email: ..., 
  phone: ..., 
  acceptsMarketing: ..., 
};

// Call the `upsertCustomer()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await upsertCustomer(upsertCustomerVars);
// Variables can be defined inline as well.
const { data } = await upsertCustomer({ firstName: ..., lastName: ..., email: ..., phone: ..., acceptsMarketing: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await upsertCustomer(dataConnect, upsertCustomerVars);

console.log(data.customer_upsert);

// Or, you can use the `Promise` API.
upsertCustomer(upsertCustomerVars).then((response) => {
  const data = response.data;
  console.log(data.customer_upsert);
});
```

### Using `UpsertCustomer`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, upsertCustomerRef, UpsertCustomerVariables } from '@firebasegen/default-connector';

// The `UpsertCustomer` mutation requires an argument of type `UpsertCustomerVariables`:
const upsertCustomerVars: UpsertCustomerVariables = {
  firstName: ..., 
  lastName: ..., 
  email: ..., 
  phone: ..., 
  acceptsMarketing: ..., 
};

// Call the `upsertCustomerRef()` function to get a reference to the mutation.
const ref = upsertCustomerRef(upsertCustomerVars);
// Variables can be defined inline as well.
const ref = upsertCustomerRef({ firstName: ..., lastName: ..., email: ..., phone: ..., acceptsMarketing: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = upsertCustomerRef(dataConnect, upsertCustomerVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.customer_upsert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.customer_upsert);
});
```

## CreateProductReview
You can execute the `CreateProductReview` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [default-connector/index.d.ts](./index.d.ts):
```typescript
createProductReview(vars: CreateProductReviewVariables): MutationPromise<CreateProductReviewData, CreateProductReviewVariables>;

interface CreateProductReviewRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateProductReviewVariables): MutationRef<CreateProductReviewData, CreateProductReviewVariables>;
}
export const createProductReviewRef: CreateProductReviewRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createProductReview(dc: DataConnect, vars: CreateProductReviewVariables): MutationPromise<CreateProductReviewData, CreateProductReviewVariables>;

interface CreateProductReviewRef {
  ...
  (dc: DataConnect, vars: CreateProductReviewVariables): MutationRef<CreateProductReviewData, CreateProductReviewVariables>;
}
export const createProductReviewRef: CreateProductReviewRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createProductReviewRef:
```typescript
const name = createProductReviewRef.operationName;
console.log(name);
```

### Variables
The `CreateProductReview` mutation requires an argument of type `CreateProductReviewVariables`, which is defined in [default-connector/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateProductReviewVariables {
  productId: string;
  rating: number;
  content: string;
}
```
### Return Type
Recall that executing the `CreateProductReview` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateProductReviewData`, which is defined in [default-connector/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateProductReviewData {
  productReview_insert: ProductReview_Key;
}
```
### Using `CreateProductReview`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createProductReview, CreateProductReviewVariables } from '@firebasegen/default-connector';

// The `CreateProductReview` mutation requires an argument of type `CreateProductReviewVariables`:
const createProductReviewVars: CreateProductReviewVariables = {
  productId: ..., 
  rating: ..., 
  content: ..., 
};

// Call the `createProductReview()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createProductReview(createProductReviewVars);
// Variables can be defined inline as well.
const { data } = await createProductReview({ productId: ..., rating: ..., content: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createProductReview(dataConnect, createProductReviewVars);

console.log(data.productReview_insert);

// Or, you can use the `Promise` API.
createProductReview(createProductReviewVars).then((response) => {
  const data = response.data;
  console.log(data.productReview_insert);
});
```

### Using `CreateProductReview`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createProductReviewRef, CreateProductReviewVariables } from '@firebasegen/default-connector';

// The `CreateProductReview` mutation requires an argument of type `CreateProductReviewVariables`:
const createProductReviewVars: CreateProductReviewVariables = {
  productId: ..., 
  rating: ..., 
  content: ..., 
};

// Call the `createProductReviewRef()` function to get a reference to the mutation.
const ref = createProductReviewRef(createProductReviewVars);
// Variables can be defined inline as well.
const ref = createProductReviewRef({ productId: ..., rating: ..., content: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createProductReviewRef(dataConnect, createProductReviewVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.productReview_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.productReview_insert);
});
```

## CreateOrder
You can execute the `CreateOrder` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [default-connector/index.d.ts](./index.d.ts):
```typescript
createOrder(vars: CreateOrderVariables): MutationPromise<CreateOrderData, CreateOrderVariables>;

interface CreateOrderRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateOrderVariables): MutationRef<CreateOrderData, CreateOrderVariables>;
}
export const createOrderRef: CreateOrderRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createOrder(dc: DataConnect, vars: CreateOrderVariables): MutationPromise<CreateOrderData, CreateOrderVariables>;

interface CreateOrderRef {
  ...
  (dc: DataConnect, vars: CreateOrderVariables): MutationRef<CreateOrderData, CreateOrderVariables>;
}
export const createOrderRef: CreateOrderRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createOrderRef:
```typescript
const name = createOrderRef.operationName;
console.log(name);
```

### Variables
The `CreateOrder` mutation requires an argument of type `CreateOrderVariables`, which is defined in [default-connector/index.d.ts](./index.d.ts). It has the following fields:

```typescript
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
```
### Return Type
Recall that executing the `CreateOrder` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateOrderData`, which is defined in [default-connector/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateOrderData {
  order_insert: Order_Key;
}
```
### Using `CreateOrder`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createOrder, CreateOrderVariables } from '@firebasegen/default-connector';

// The `CreateOrder` mutation requires an argument of type `CreateOrderVariables`:
const createOrderVars: CreateOrderVariables = {
  chargeId: ..., // optional
  customerId: ..., // optional
  shippingStreet1: ..., 
  shippingStreet2: ..., // optional
  shippingCity: ..., 
  shippingState: ..., 
  shippingZip: ..., 
  paymentIntentId: ..., // optional
  receiptUrl: ..., // optional
  subtotalPrice: ..., 
  totalTax: ..., 
  totalShippingPrice: ..., 
  totalPrice: ..., 
  financialStatus: ..., 
  fulfillmentStatus: ..., 
};

// Call the `createOrder()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createOrder(createOrderVars);
// Variables can be defined inline as well.
const { data } = await createOrder({ chargeId: ..., customerId: ..., shippingStreet1: ..., shippingStreet2: ..., shippingCity: ..., shippingState: ..., shippingZip: ..., paymentIntentId: ..., receiptUrl: ..., subtotalPrice: ..., totalTax: ..., totalShippingPrice: ..., totalPrice: ..., financialStatus: ..., fulfillmentStatus: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createOrder(dataConnect, createOrderVars);

console.log(data.order_insert);

// Or, you can use the `Promise` API.
createOrder(createOrderVars).then((response) => {
  const data = response.data;
  console.log(data.order_insert);
});
```

### Using `CreateOrder`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createOrderRef, CreateOrderVariables } from '@firebasegen/default-connector';

// The `CreateOrder` mutation requires an argument of type `CreateOrderVariables`:
const createOrderVars: CreateOrderVariables = {
  chargeId: ..., // optional
  customerId: ..., // optional
  shippingStreet1: ..., 
  shippingStreet2: ..., // optional
  shippingCity: ..., 
  shippingState: ..., 
  shippingZip: ..., 
  paymentIntentId: ..., // optional
  receiptUrl: ..., // optional
  subtotalPrice: ..., 
  totalTax: ..., 
  totalShippingPrice: ..., 
  totalPrice: ..., 
  financialStatus: ..., 
  fulfillmentStatus: ..., 
};

// Call the `createOrderRef()` function to get a reference to the mutation.
const ref = createOrderRef(createOrderVars);
// Variables can be defined inline as well.
const ref = createOrderRef({ chargeId: ..., customerId: ..., shippingStreet1: ..., shippingStreet2: ..., shippingCity: ..., shippingState: ..., shippingZip: ..., paymentIntentId: ..., receiptUrl: ..., subtotalPrice: ..., totalTax: ..., totalShippingPrice: ..., totalPrice: ..., financialStatus: ..., fulfillmentStatus: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createOrderRef(dataConnect, createOrderVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.order_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.order_insert);
});
```

## CreateOrderItem
You can execute the `CreateOrderItem` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [default-connector/index.d.ts](./index.d.ts):
```typescript
createOrderItem(vars: CreateOrderItemVariables): MutationPromise<CreateOrderItemData, CreateOrderItemVariables>;

interface CreateOrderItemRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateOrderItemVariables): MutationRef<CreateOrderItemData, CreateOrderItemVariables>;
}
export const createOrderItemRef: CreateOrderItemRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createOrderItem(dc: DataConnect, vars: CreateOrderItemVariables): MutationPromise<CreateOrderItemData, CreateOrderItemVariables>;

interface CreateOrderItemRef {
  ...
  (dc: DataConnect, vars: CreateOrderItemVariables): MutationRef<CreateOrderItemData, CreateOrderItemVariables>;
}
export const createOrderItemRef: CreateOrderItemRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createOrderItemRef:
```typescript
const name = createOrderItemRef.operationName;
console.log(name);
```

### Variables
The `CreateOrderItem` mutation requires an argument of type `CreateOrderItemVariables`, which is defined in [default-connector/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateOrderItemVariables {
  orderId: UUIDString;
  productId: string;
  quantity: number;
  price: number;
}
```
### Return Type
Recall that executing the `CreateOrderItem` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateOrderItemData`, which is defined in [default-connector/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateOrderItemData {
  orderItem_insert: OrderItem_Key;
}
```
### Using `CreateOrderItem`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createOrderItem, CreateOrderItemVariables } from '@firebasegen/default-connector';

// The `CreateOrderItem` mutation requires an argument of type `CreateOrderItemVariables`:
const createOrderItemVars: CreateOrderItemVariables = {
  orderId: ..., 
  productId: ..., 
  quantity: ..., 
  price: ..., 
};

// Call the `createOrderItem()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createOrderItem(createOrderItemVars);
// Variables can be defined inline as well.
const { data } = await createOrderItem({ orderId: ..., productId: ..., quantity: ..., price: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createOrderItem(dataConnect, createOrderItemVars);

console.log(data.orderItem_insert);

// Or, you can use the `Promise` API.
createOrderItem(createOrderItemVars).then((response) => {
  const data = response.data;
  console.log(data.orderItem_insert);
});
```

### Using `CreateOrderItem`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createOrderItemRef, CreateOrderItemVariables } from '@firebasegen/default-connector';

// The `CreateOrderItem` mutation requires an argument of type `CreateOrderItemVariables`:
const createOrderItemVars: CreateOrderItemVariables = {
  orderId: ..., 
  productId: ..., 
  quantity: ..., 
  price: ..., 
};

// Call the `createOrderItemRef()` function to get a reference to the mutation.
const ref = createOrderItemRef(createOrderItemVars);
// Variables can be defined inline as well.
const ref = createOrderItemRef({ orderId: ..., productId: ..., quantity: ..., price: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createOrderItemRef(dataConnect, createOrderItemVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.orderItem_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.orderItem_insert);
});
```

## UpdateOrderByPaymentIntentId
You can execute the `UpdateOrderByPaymentIntentId` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [default-connector/index.d.ts](./index.d.ts):
```typescript
updateOrderByPaymentIntentId(vars: UpdateOrderByPaymentIntentIdVariables): MutationPromise<UpdateOrderByPaymentIntentIdData, UpdateOrderByPaymentIntentIdVariables>;

interface UpdateOrderByPaymentIntentIdRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateOrderByPaymentIntentIdVariables): MutationRef<UpdateOrderByPaymentIntentIdData, UpdateOrderByPaymentIntentIdVariables>;
}
export const updateOrderByPaymentIntentIdRef: UpdateOrderByPaymentIntentIdRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateOrderByPaymentIntentId(dc: DataConnect, vars: UpdateOrderByPaymentIntentIdVariables): MutationPromise<UpdateOrderByPaymentIntentIdData, UpdateOrderByPaymentIntentIdVariables>;

interface UpdateOrderByPaymentIntentIdRef {
  ...
  (dc: DataConnect, vars: UpdateOrderByPaymentIntentIdVariables): MutationRef<UpdateOrderByPaymentIntentIdData, UpdateOrderByPaymentIntentIdVariables>;
}
export const updateOrderByPaymentIntentIdRef: UpdateOrderByPaymentIntentIdRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateOrderByPaymentIntentIdRef:
```typescript
const name = updateOrderByPaymentIntentIdRef.operationName;
console.log(name);
```

### Variables
The `UpdateOrderByPaymentIntentId` mutation requires an argument of type `UpdateOrderByPaymentIntentIdVariables`, which is defined in [default-connector/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdateOrderByPaymentIntentIdVariables {
  paymentIntentId: string;
  financialStatus?: string | null;
  fulfillmentStatus?: string | null;
  receiptUrl?: string | null;
  processedAt?: TimestampString | null;
  chargeId?: string | null;
}
```
### Return Type
Recall that executing the `UpdateOrderByPaymentIntentId` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateOrderByPaymentIntentIdData`, which is defined in [default-connector/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateOrderByPaymentIntentIdData {
  order_update?: Order_Key | null;
}
```
### Using `UpdateOrderByPaymentIntentId`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateOrderByPaymentIntentId, UpdateOrderByPaymentIntentIdVariables } from '@firebasegen/default-connector';

// The `UpdateOrderByPaymentIntentId` mutation requires an argument of type `UpdateOrderByPaymentIntentIdVariables`:
const updateOrderByPaymentIntentIdVars: UpdateOrderByPaymentIntentIdVariables = {
  paymentIntentId: ..., 
  financialStatus: ..., // optional
  fulfillmentStatus: ..., // optional
  receiptUrl: ..., // optional
  processedAt: ..., // optional
  chargeId: ..., // optional
};

// Call the `updateOrderByPaymentIntentId()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateOrderByPaymentIntentId(updateOrderByPaymentIntentIdVars);
// Variables can be defined inline as well.
const { data } = await updateOrderByPaymentIntentId({ paymentIntentId: ..., financialStatus: ..., fulfillmentStatus: ..., receiptUrl: ..., processedAt: ..., chargeId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateOrderByPaymentIntentId(dataConnect, updateOrderByPaymentIntentIdVars);

console.log(data.order_update);

// Or, you can use the `Promise` API.
updateOrderByPaymentIntentId(updateOrderByPaymentIntentIdVars).then((response) => {
  const data = response.data;
  console.log(data.order_update);
});
```

### Using `UpdateOrderByPaymentIntentId`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateOrderByPaymentIntentIdRef, UpdateOrderByPaymentIntentIdVariables } from '@firebasegen/default-connector';

// The `UpdateOrderByPaymentIntentId` mutation requires an argument of type `UpdateOrderByPaymentIntentIdVariables`:
const updateOrderByPaymentIntentIdVars: UpdateOrderByPaymentIntentIdVariables = {
  paymentIntentId: ..., 
  financialStatus: ..., // optional
  fulfillmentStatus: ..., // optional
  receiptUrl: ..., // optional
  processedAt: ..., // optional
  chargeId: ..., // optional
};

// Call the `updateOrderByPaymentIntentIdRef()` function to get a reference to the mutation.
const ref = updateOrderByPaymentIntentIdRef(updateOrderByPaymentIntentIdVars);
// Variables can be defined inline as well.
const ref = updateOrderByPaymentIntentIdRef({ paymentIntentId: ..., financialStatus: ..., fulfillmentStatus: ..., receiptUrl: ..., processedAt: ..., chargeId: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateOrderByPaymentIntentIdRef(dataConnect, updateOrderByPaymentIntentIdVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.order_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.order_update);
});
```

## UpdateOrderByChargeId
You can execute the `UpdateOrderByChargeId` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [default-connector/index.d.ts](./index.d.ts):
```typescript
updateOrderByChargeId(vars?: UpdateOrderByChargeIdVariables): MutationPromise<UpdateOrderByChargeIdData, UpdateOrderByChargeIdVariables>;

interface UpdateOrderByChargeIdRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars?: UpdateOrderByChargeIdVariables): MutationRef<UpdateOrderByChargeIdData, UpdateOrderByChargeIdVariables>;
}
export const updateOrderByChargeIdRef: UpdateOrderByChargeIdRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateOrderByChargeId(dc: DataConnect, vars?: UpdateOrderByChargeIdVariables): MutationPromise<UpdateOrderByChargeIdData, UpdateOrderByChargeIdVariables>;

interface UpdateOrderByChargeIdRef {
  ...
  (dc: DataConnect, vars?: UpdateOrderByChargeIdVariables): MutationRef<UpdateOrderByChargeIdData, UpdateOrderByChargeIdVariables>;
}
export const updateOrderByChargeIdRef: UpdateOrderByChargeIdRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateOrderByChargeIdRef:
```typescript
const name = updateOrderByChargeIdRef.operationName;
console.log(name);
```

### Variables
The `UpdateOrderByChargeId` mutation has an optional argument of type `UpdateOrderByChargeIdVariables`, which is defined in [default-connector/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdateOrderByChargeIdVariables {
  financialStatus?: string | null;
  fulfillmentStatus?: string | null;
  receiptUrl?: string | null;
  processedAt?: TimestampString | null;
  chargeId?: string | null;
}
```
### Return Type
Recall that executing the `UpdateOrderByChargeId` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateOrderByChargeIdData`, which is defined in [default-connector/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateOrderByChargeIdData {
  order_update?: Order_Key | null;
}
```
### Using `UpdateOrderByChargeId`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateOrderByChargeId, UpdateOrderByChargeIdVariables } from '@firebasegen/default-connector';

// The `UpdateOrderByChargeId` mutation has an optional argument of type `UpdateOrderByChargeIdVariables`:
const updateOrderByChargeIdVars: UpdateOrderByChargeIdVariables = {
  financialStatus: ..., // optional
  fulfillmentStatus: ..., // optional
  receiptUrl: ..., // optional
  processedAt: ..., // optional
  chargeId: ..., // optional
};

// Call the `updateOrderByChargeId()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateOrderByChargeId(updateOrderByChargeIdVars);
// Variables can be defined inline as well.
const { data } = await updateOrderByChargeId({ financialStatus: ..., fulfillmentStatus: ..., receiptUrl: ..., processedAt: ..., chargeId: ..., });
// Since all variables are optional for this mutation, you can omit the `UpdateOrderByChargeIdVariables` argument.
const { data } = await updateOrderByChargeId();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateOrderByChargeId(dataConnect, updateOrderByChargeIdVars);

console.log(data.order_update);

// Or, you can use the `Promise` API.
updateOrderByChargeId(updateOrderByChargeIdVars).then((response) => {
  const data = response.data;
  console.log(data.order_update);
});
```

### Using `UpdateOrderByChargeId`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateOrderByChargeIdRef, UpdateOrderByChargeIdVariables } from '@firebasegen/default-connector';

// The `UpdateOrderByChargeId` mutation has an optional argument of type `UpdateOrderByChargeIdVariables`:
const updateOrderByChargeIdVars: UpdateOrderByChargeIdVariables = {
  financialStatus: ..., // optional
  fulfillmentStatus: ..., // optional
  receiptUrl: ..., // optional
  processedAt: ..., // optional
  chargeId: ..., // optional
};

// Call the `updateOrderByChargeIdRef()` function to get a reference to the mutation.
const ref = updateOrderByChargeIdRef(updateOrderByChargeIdVars);
// Variables can be defined inline as well.
const ref = updateOrderByChargeIdRef({ financialStatus: ..., fulfillmentStatus: ..., receiptUrl: ..., processedAt: ..., chargeId: ..., });
// Since all variables are optional for this mutation, you can omit the `UpdateOrderByChargeIdVariables` argument.
const ref = updateOrderByChargeIdRef();

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateOrderByChargeIdRef(dataConnect, updateOrderByChargeIdVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.order_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.order_update);
});
```

