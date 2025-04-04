# Table of Contents
- [**Overview**](#generated-react-readme)
- [**TanStack Query Firebase & TanStack React Query**](#tanstack-query-firebase-tanstack-react-query)
  - [*Package Installation*](#installing-tanstack-query-firebase-and-tanstack-react-query-packages)
  - [*Configuring TanStack Query*](#configuring-tanstack-query)
- [**Accessing the connector**](#accessing-the-connector)
  - [*Connecting to the local Emulator*](#connecting-to-the-local-emulator)
- [**Queries**](#queries)
  - [*ListCustomers*](#listcustomers)
  - [*GetReviewsByProductId*](#getreviewsbyproductid)
  - [*GetReviewsByProductHandle*](#getreviewsbyproducthandle)
  - [*GetProductByHandle*](#getproductbyhandle)
  - [*GetCollectionByHandle*](#getcollectionbyhandle)
  - [*GetCollectionsByPage*](#getcollectionsbypage)
  - [*Search*](#search)
  - [*GetCurrentUsersOrders*](#getcurrentusersorders)
  - [*GetOrderById*](#getorderbyid)
  - [*GetAllOrders*](#getallorders)
- [**Mutations**](#mutations)
  - [*UpsertCustomer*](#upsertcustomer)
  - [*CreateProductReview*](#createproductreview)
  - [*CreateOrder*](#createorder)
  - [*UpdateOrderByPaymentIntentId*](#updateorderbypaymentintentid)
  - [*UpdateOrderByChargeId*](#updateorderbychargeid)
  - [*CreateOrderItem*](#createorderitem)

# Generated React README
This README will guide you through the process of using the generated React SDK package for the connector `default`. It will also provide examples on how to use your generated SDK to call your Data Connect queries and mutations.

***NOTE:** This README is generated alongside the generated SDK. If you make changes to this file, they will be overwritten when the SDK is regenerated.*

You can use this generated SDK by importing from the package `@firebasegen/default-connector/react` as shown below. Both CommonJS and ESM imports are supported.

You can also follow the instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#react).

# TanStack Query Firebase & TanStack React Query
This SDK provides [React](https://react.dev/) hooks generated specific to your application, for the operations found in the connector `default`. These hooks are generated using [TanStack Query Firebase](https://react-query-firebase.invertase.dev/) by our partners at Invertase, a library built on top of [TanStack React Query v5](https://tanstack.com/query/v5/docs/framework/react/overview).

***You do not need to be familiar with Tanstack Query or Tanstack Query Firebase to use this SDK.*** However, you may find it useful to learn more about them, as they will empower you as a user of this Generated React SDK.

## Installing TanStack Query Firebase and TanStack React Query Packages
In order to use the React generated SDK, you must install the `TanStack React Query` and `TanStack Query Firebase` packages.
```bash
npm i --save @tanstack/react-query @tanstack-query-firebase/react
```
```bash
npm i --save firebase@latest # Note: React has a peer dependency on ^11.3.0
```

You can also follow the installation instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#install_tanstack_query_firebase_packages), or the [TanStack Query Firebase documentation](https://react-query-firebase.invertase.dev/react) and [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/installation).

## Configuring TanStack Query
In order to use the React generated SDK in your application, you must wrap your application's component tree in a `QueryClientProvider` component from TanStack React Query. None of your generated React SDK hooks will work without this provider.

```javascript
import { QueryClientProvider } from '@tanstack/react-query';

// Create a TanStack Query client instance
const queryClient = new QueryClient()

function App() {
  return (
    // Provide the client to your App
    <QueryClientProvider client={queryClient}>
      <MyApplication />
    </QueryClientProvider>
  )
}
```

To learn more about `QueryClientProvider`, see the [TanStack React Query documentation](https://tanstack.com/query/latest/docs/framework/react/quick-start) and the [TanStack Query Firebase documentation](https://invertase.docs.page/tanstack-query-firebase/react#usage).

# Accessing the connector
A connector is a collection of Queries and Mutations. One SDK is generated for each connector - this SDK is generated for the connector `default`.

You can find more information about connectors in the [Data Connect documentation](https://firebase.google.com/docs/data-connect#how-does).

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@firebasegen/default-connector';

const dataConnect = getDataConnect(connectorConfig);
```

## Connecting to the local Emulator
By default, the connector will connect to the production service.

To connect to the emulator, you can use the following code.
You can also follow the emulator instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#emulator-react).

```javascript
import { connectDataConnectEmulator, getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@firebasegen/default-connector';

const dataConnect = getDataConnect(connectorConfig);
connectDataConnectEmulator(dataConnect, 'localhost', 9399);
```

After it's initialized, you can call your Data Connect [queries](#queries) and [mutations](#mutations) using the hooks provided from your generated React SDK.

# Queries

The React generated SDK provides Query hook functions that call and return [`useDataConnectQuery`](https://react-query-firebase.invertase.dev/react/data-connect/querying) hooks from TanStack Query Firebase.

Calling these hook functions will return a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and the most recent data returned by the Query, among other things. To learn more about these hooks and how to use them, see the [TanStack Query Firebase documentation](https://react-query-firebase.invertase.dev/react/data-connect/querying).

TanStack React Query caches the results of your Queries, so using the same Query hook function in multiple places in your application allows the entire application to automatically see updates to that Query's data.

Query hooks execute their Queries automatically when called, and periodically refresh, unless you change the `queryOptions` for the Query. To learn how to stop a Query from automatically executing, including how to make a query "lazy", see the [TanStack React Query documentation](https://tanstack.com/query/latest/docs/framework/react/guides/disabling-queries).

To learn more about TanStack React Query's Queries, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/guides/queries).

## Using Query Hooks
Here's a general overview of how to use the generated Query hooks in your code:

- If the Query has no variables, the Query hook function does not require arguments.
- If the Query has any required variables, the Query hook function will require at least one argument: an object that contains all the required variables for the Query.
- If the Query has some required and some optional variables, only required variables are necessary in the variables argument object, and optional variables may be provided as well.
- If all of the Query's variables are optional, the Query hook function does not require any arguments.
- Query hook functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.
- Query hooks functions can be called with or without passing in an `options` argument of type `useDataConnectQueryOptions`. To learn more about the `options` argument, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/guides/query-options).
  - ***Special case:***  If the Query has all optional variables and you would like to provide an `options` argument to the Query hook function without providing any variables, you must pass `undefined` where you would normally pass the Query's variables, and then may provide the `options` argument.

Below are examples of how to use the `default` connector's generated Query hook functions to execute each Query. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#use_queries_and_mutations_in_your_react_client).

## ListCustomers
You can execute the `ListCustomers` Query using the following Query hook function, which is defined in [default-connector/react/index.d.ts](./index.d.ts):

```javascript
useListCustomers(dc: DataConnect, options?: useDataConnectQueryOptions<ListCustomersData>): UseDataConnectQueryResult<ListCustomersData, undefined>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useListCustomers(options?: useDataConnectQueryOptions<ListCustomersData>): UseDataConnectQueryResult<ListCustomersData, undefined>;
```

### Variables
The `ListCustomers` Query has no variables.
### Return Type
Recall that calling the `ListCustomers` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `ListCustomers` Query is of type `ListCustomersData`, which is defined in [default-connector/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface ListCustomersData {
  customers: ({
    id: string;
    firstName: string;
    lastName: string;
    email: string;
  } & Customer_Key)[];
}
```

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `ListCustomers`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@firebasegen/default-connector';
import { useListCustomers } from '@firebasegen/default-connector/react'

export default function ListCustomersComponent() {


  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useListCustomers();

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useListCustomers(dataConnect);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useListCustomers(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useListCustomers(dataConnect, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.customers);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## GetReviewsByProductId
You can execute the `GetReviewsByProductId` Query using the following Query hook function, which is defined in [default-connector/react/index.d.ts](./index.d.ts):

```javascript
useGetReviewsByProductId(dc: DataConnect, vars: GetReviewsByProductIdVariables, options?: useDataConnectQueryOptions<GetReviewsByProductIdData>): UseDataConnectQueryResult<GetReviewsByProductIdData, GetReviewsByProductIdVariables>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useGetReviewsByProductId(vars: GetReviewsByProductIdVariables, options?: useDataConnectQueryOptions<GetReviewsByProductIdData>): UseDataConnectQueryResult<GetReviewsByProductIdData, GetReviewsByProductIdVariables>;
```

### Variables
The `GetReviewsByProductId` Query requires an argument of type `GetReviewsByProductIdVariables`, which is defined in [default-connector/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface GetReviewsByProductIdVariables {
  productId: UUIDString;
}
```
### Return Type
Recall that calling the `GetReviewsByProductId` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `GetReviewsByProductId` Query is of type `GetReviewsByProductIdData`, which is defined in [default-connector/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface GetReviewsByProductIdData {
  productReviews: ({
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

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `GetReviewsByProductId`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, GetReviewsByProductIdVariables } from '@firebasegen/default-connector';
import { useGetReviewsByProductId } from '@firebasegen/default-connector/react'

export default function GetReviewsByProductIdComponent() {

  // The `useGetReviewsByProductId` Query hook requires an argument of type `GetReviewsByProductIdVariables`:
  const getReviewsByProductIdVars: GetReviewsByProductIdVariables = {
    productId: ..., 
  };

  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useGetReviewsByProductId(getReviewsByProductIdVars);
  // Variables can be defined inline as well.
  const query = useGetReviewsByProductId({ productId: ..., });

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useGetReviewsByProductId(dataConnect, getReviewsByProductIdVars);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useGetReviewsByProductId(getReviewsByProductIdVars, options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useGetReviewsByProductId(dataConnect, getReviewsByProductIdVars, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.productReviews);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## GetReviewsByProductHandle
You can execute the `GetReviewsByProductHandle` Query using the following Query hook function, which is defined in [default-connector/react/index.d.ts](./index.d.ts):

```javascript
useGetReviewsByProductHandle(dc: DataConnect, vars: GetReviewsByProductHandleVariables, options?: useDataConnectQueryOptions<GetReviewsByProductHandleData>): UseDataConnectQueryResult<GetReviewsByProductHandleData, GetReviewsByProductHandleVariables>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useGetReviewsByProductHandle(vars: GetReviewsByProductHandleVariables, options?: useDataConnectQueryOptions<GetReviewsByProductHandleData>): UseDataConnectQueryResult<GetReviewsByProductHandleData, GetReviewsByProductHandleVariables>;
```

### Variables
The `GetReviewsByProductHandle` Query requires an argument of type `GetReviewsByProductHandleVariables`, which is defined in [default-connector/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface GetReviewsByProductHandleVariables {
  handle: string;
}
```
### Return Type
Recall that calling the `GetReviewsByProductHandle` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `GetReviewsByProductHandle` Query is of type `GetReviewsByProductHandleData`, which is defined in [default-connector/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface GetReviewsByProductHandleData {
  productReviews: ({
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

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `GetReviewsByProductHandle`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, GetReviewsByProductHandleVariables } from '@firebasegen/default-connector';
import { useGetReviewsByProductHandle } from '@firebasegen/default-connector/react'

export default function GetReviewsByProductHandleComponent() {

  // The `useGetReviewsByProductHandle` Query hook requires an argument of type `GetReviewsByProductHandleVariables`:
  const getReviewsByProductHandleVars: GetReviewsByProductHandleVariables = {
    handle: ..., 
  };

  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useGetReviewsByProductHandle(getReviewsByProductHandleVars);
  // Variables can be defined inline as well.
  const query = useGetReviewsByProductHandle({ handle: ..., });

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useGetReviewsByProductHandle(dataConnect, getReviewsByProductHandleVars);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useGetReviewsByProductHandle(getReviewsByProductHandleVars, options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useGetReviewsByProductHandle(dataConnect, getReviewsByProductHandleVars, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.productReviews);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## GetProductByHandle
You can execute the `GetProductByHandle` Query using the following Query hook function, which is defined in [default-connector/react/index.d.ts](./index.d.ts):

```javascript
useGetProductByHandle(dc: DataConnect, vars: GetProductByHandleVariables, options?: useDataConnectQueryOptions<GetProductByHandleData>): UseDataConnectQueryResult<GetProductByHandleData, GetProductByHandleVariables>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useGetProductByHandle(vars: GetProductByHandleVariables, options?: useDataConnectQueryOptions<GetProductByHandleData>): UseDataConnectQueryResult<GetProductByHandleData, GetProductByHandleVariables>;
```

### Variables
The `GetProductByHandle` Query requires an argument of type `GetProductByHandleVariables`, which is defined in [default-connector/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface GetProductByHandleVariables {
  handle: string;
}
```
### Return Type
Recall that calling the `GetProductByHandle` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `GetProductByHandle` Query is of type `GetProductByHandleData`, which is defined in [default-connector/index.d.ts](../index.d.ts). It has the following fields:
```javascript
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
```

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `GetProductByHandle`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, GetProductByHandleVariables } from '@firebasegen/default-connector';
import { useGetProductByHandle } from '@firebasegen/default-connector/react'

export default function GetProductByHandleComponent() {

  // The `useGetProductByHandle` Query hook requires an argument of type `GetProductByHandleVariables`:
  const getProductByHandleVars: GetProductByHandleVariables = {
    handle: ..., 
  };

  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useGetProductByHandle(getProductByHandleVars);
  // Variables can be defined inline as well.
  const query = useGetProductByHandle({ handle: ..., });

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useGetProductByHandle(dataConnect, getProductByHandleVars);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useGetProductByHandle(getProductByHandleVars, options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useGetProductByHandle(dataConnect, getProductByHandleVars, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.product);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## GetCollectionByHandle
You can execute the `GetCollectionByHandle` Query using the following Query hook function, which is defined in [default-connector/react/index.d.ts](./index.d.ts):

```javascript
useGetCollectionByHandle(dc: DataConnect, vars: GetCollectionByHandleVariables, options?: useDataConnectQueryOptions<GetCollectionByHandleData>): UseDataConnectQueryResult<GetCollectionByHandleData, GetCollectionByHandleVariables>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useGetCollectionByHandle(vars: GetCollectionByHandleVariables, options?: useDataConnectQueryOptions<GetCollectionByHandleData>): UseDataConnectQueryResult<GetCollectionByHandleData, GetCollectionByHandleVariables>;
```

### Variables
The `GetCollectionByHandle` Query requires an argument of type `GetCollectionByHandleVariables`, which is defined in [default-connector/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface GetCollectionByHandleVariables {
  handle: string;
  page?: string | null;
}
```
### Return Type
Recall that calling the `GetCollectionByHandle` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `GetCollectionByHandle` Query is of type `GetCollectionByHandleData`, which is defined in [default-connector/index.d.ts](../index.d.ts). It has the following fields:
```javascript
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
```

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `GetCollectionByHandle`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, GetCollectionByHandleVariables } from '@firebasegen/default-connector';
import { useGetCollectionByHandle } from '@firebasegen/default-connector/react'

export default function GetCollectionByHandleComponent() {

  // The `useGetCollectionByHandle` Query hook requires an argument of type `GetCollectionByHandleVariables`:
  const getCollectionByHandleVars: GetCollectionByHandleVariables = {
    handle: ..., 
    page: ..., // optional
  };

  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useGetCollectionByHandle(getCollectionByHandleVars);
  // Variables can be defined inline as well.
  const query = useGetCollectionByHandle({ handle: ..., page: ..., });

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useGetCollectionByHandle(dataConnect, getCollectionByHandleVars);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useGetCollectionByHandle(getCollectionByHandleVars, options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useGetCollectionByHandle(dataConnect, getCollectionByHandleVars, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.collections);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## GetCollectionsByPage
You can execute the `GetCollectionsByPage` Query using the following Query hook function, which is defined in [default-connector/react/index.d.ts](./index.d.ts):

```javascript
useGetCollectionsByPage(dc: DataConnect, vars?: GetCollectionsByPageVariables, options?: useDataConnectQueryOptions<GetCollectionsByPageData>): UseDataConnectQueryResult<GetCollectionsByPageData, GetCollectionsByPageVariables>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useGetCollectionsByPage(vars?: GetCollectionsByPageVariables, options?: useDataConnectQueryOptions<GetCollectionsByPageData>): UseDataConnectQueryResult<GetCollectionsByPageData, GetCollectionsByPageVariables>;
```

### Variables
The `GetCollectionsByPage` Query has an optional argument of type `GetCollectionsByPageVariables`, which is defined in [default-connector/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface GetCollectionsByPageVariables {
  page?: string | null;
}
```
### Return Type
Recall that calling the `GetCollectionsByPage` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `GetCollectionsByPage` Query is of type `GetCollectionsByPageData`, which is defined in [default-connector/index.d.ts](../index.d.ts). It has the following fields:
```javascript
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
```

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `GetCollectionsByPage`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, GetCollectionsByPageVariables } from '@firebasegen/default-connector';
import { useGetCollectionsByPage } from '@firebasegen/default-connector/react'

export default function GetCollectionsByPageComponent() {

  // The `useGetCollectionsByPage` Query hook has an optional argument of type `GetCollectionsByPageVariables`:
  const getCollectionsByPageVars: GetCollectionsByPageVariables = {
    page: ..., // optional
  };

  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useGetCollectionsByPage(getCollectionsByPageVars);
  // Variables can be defined inline as well.
  const query = useGetCollectionsByPage({ page: ..., });
  // Since all variables are optional for this Query, you can omit the `GetCollectionsByPageVariables` argument.
  // (as long as you don't want to provide any `options`!)
  const query = useGetCollectionsByPage();

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useGetCollectionsByPage(dataConnect, getCollectionsByPageVars);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useGetCollectionsByPage(getCollectionsByPageVars, options);
  // If you'd like to provide options without providing any variables, you must 
  // pass `undefined` where you would normally pass the variables.
  const query = useGetCollectionsByPage(undefined, options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useGetCollectionsByPage(dataConnect, getCollectionsByPageVars /** or undefined */, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.collections);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## Search
You can execute the `Search` Query using the following Query hook function, which is defined in [default-connector/react/index.d.ts](./index.d.ts):

```javascript
useSearch(dc: DataConnect, vars: SearchVariables, options?: useDataConnectQueryOptions<SearchData>): UseDataConnectQueryResult<SearchData, SearchVariables>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useSearch(vars: SearchVariables, options?: useDataConnectQueryOptions<SearchData>): UseDataConnectQueryResult<SearchData, SearchVariables>;
```

### Variables
The `Search` Query requires an argument of type `SearchVariables`, which is defined in [default-connector/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface SearchVariables {
  query: string;
}
```
### Return Type
Recall that calling the `Search` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `Search` Query is of type `SearchData`, which is defined in [default-connector/index.d.ts](../index.d.ts). It has the following fields:
```javascript
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
```

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `Search`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, SearchVariables } from '@firebasegen/default-connector';
import { useSearch } from '@firebasegen/default-connector/react'

export default function SearchComponent() {

  // The `useSearch` Query hook requires an argument of type `SearchVariables`:
  const searchVars: SearchVariables = {
    query: ..., 
  };

  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useSearch(searchVars);
  // Variables can be defined inline as well.
  const query = useSearch({ query: ..., });

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useSearch(dataConnect, searchVars);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useSearch(searchVars, options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useSearch(dataConnect, searchVars, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.productsByDescription);
    console.log(query.data.productsByTitle);
    console.log(query.data.reviews);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## GetCurrentUsersOrders
You can execute the `GetCurrentUsersOrders` Query using the following Query hook function, which is defined in [default-connector/react/index.d.ts](./index.d.ts):

```javascript
useGetCurrentUsersOrders(dc: DataConnect, options?: useDataConnectQueryOptions<GetCurrentUsersOrdersData>): UseDataConnectQueryResult<GetCurrentUsersOrdersData, undefined>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useGetCurrentUsersOrders(options?: useDataConnectQueryOptions<GetCurrentUsersOrdersData>): UseDataConnectQueryResult<GetCurrentUsersOrdersData, undefined>;
```

### Variables
The `GetCurrentUsersOrders` Query has no variables.
### Return Type
Recall that calling the `GetCurrentUsersOrders` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `GetCurrentUsersOrders` Query is of type `GetCurrentUsersOrdersData`, which is defined in [default-connector/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface GetCurrentUsersOrdersData {
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
```

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `GetCurrentUsersOrders`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@firebasegen/default-connector';
import { useGetCurrentUsersOrders } from '@firebasegen/default-connector/react'

export default function GetCurrentUsersOrdersComponent() {


  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useGetCurrentUsersOrders();

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useGetCurrentUsersOrders(dataConnect);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useGetCurrentUsersOrders(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useGetCurrentUsersOrders(dataConnect, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.orders);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## GetOrderById
You can execute the `GetOrderById` Query using the following Query hook function, which is defined in [default-connector/react/index.d.ts](./index.d.ts):

```javascript
useGetOrderById(dc: DataConnect, vars: GetOrderByIdVariables, options?: useDataConnectQueryOptions<GetOrderByIdData>): UseDataConnectQueryResult<GetOrderByIdData, GetOrderByIdVariables>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useGetOrderById(vars: GetOrderByIdVariables, options?: useDataConnectQueryOptions<GetOrderByIdData>): UseDataConnectQueryResult<GetOrderByIdData, GetOrderByIdVariables>;
```

### Variables
The `GetOrderById` Query requires an argument of type `GetOrderByIdVariables`, which is defined in [default-connector/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface GetOrderByIdVariables {
  id: UUIDString;
}
```
### Return Type
Recall that calling the `GetOrderById` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `GetOrderById` Query is of type `GetOrderByIdData`, which is defined in [default-connector/index.d.ts](../index.d.ts). It has the following fields:
```javascript
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
```

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `GetOrderById`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, GetOrderByIdVariables } from '@firebasegen/default-connector';
import { useGetOrderById } from '@firebasegen/default-connector/react'

export default function GetOrderByIdComponent() {

  // The `useGetOrderById` Query hook requires an argument of type `GetOrderByIdVariables`:
  const getOrderByIdVars: GetOrderByIdVariables = {
    id: ..., 
  };

  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useGetOrderById(getOrderByIdVars);
  // Variables can be defined inline as well.
  const query = useGetOrderById({ id: ..., });

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useGetOrderById(dataConnect, getOrderByIdVars);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useGetOrderById(getOrderByIdVars, options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useGetOrderById(dataConnect, getOrderByIdVars, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.order);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## GetAllOrders
You can execute the `GetAllOrders` Query using the following Query hook function, which is defined in [default-connector/react/index.d.ts](./index.d.ts):

```javascript
useGetAllOrders(dc: DataConnect, options?: useDataConnectQueryOptions<GetAllOrdersData>): UseDataConnectQueryResult<GetAllOrdersData, undefined>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useGetAllOrders(options?: useDataConnectQueryOptions<GetAllOrdersData>): UseDataConnectQueryResult<GetAllOrdersData, undefined>;
```

### Variables
The `GetAllOrders` Query has no variables.
### Return Type
Recall that calling the `GetAllOrders` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `GetAllOrders` Query is of type `GetAllOrdersData`, which is defined in [default-connector/index.d.ts](../index.d.ts). It has the following fields:
```javascript
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
```

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `GetAllOrders`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@firebasegen/default-connector';
import { useGetAllOrders } from '@firebasegen/default-connector/react'

export default function GetAllOrdersComponent() {


  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useGetAllOrders();

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useGetAllOrders(dataConnect);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useGetAllOrders(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useGetAllOrders(dataConnect, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.orders);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

# Mutations

The React generated SDK provides Mutations hook functions that call and return [`useDataConnectMutation`](https://react-query-firebase.invertase.dev/react/data-connect/mutations) hooks from TanStack Query Firebase.

Calling these hook functions will return a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, and the most recent data returned by the Mutation, among other things. To learn more about these hooks and how to use them, see the [TanStack Query Firebase documentation](https://react-query-firebase.invertase.dev/react/data-connect/mutations).

Mutation hooks do not execute their Mutations automatically when called. Rather, after calling the Mutation hook function and getting a `UseMutationResult` object, you must call the `UseMutationResult.mutate()` function to execute the Mutation.

To learn more about TanStack React Query's Mutations, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/guides/mutations).

## Using Mutation Hooks
Here's a general overview of how to use the generated Mutation hooks in your code:

- Mutation hook functions are not called with the arguments to the Mutation. Instead, arguments are passed to `UseMutationResult.mutate()`.
- If the Mutation has no variables, the `mutate()` function does not require arguments.
- If the Mutation has any required variables, the `mutate()` function will require at least one argument: an object that contains all the required variables for the Mutation.
- If the Mutation has some required and some optional variables, only required variables are necessary in the variables argument object, and optional variables may be provided as well.
- If all of the Mutation's variables are optional, the Mutation hook function does not require any arguments.
- Mutation hook functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.
- Mutation hooks also accept an `options` argument of type `useDataConnectMutationOptions`. To learn more about the `options` argument, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/guides/mutations#mutation-side-effects).
  - `UseMutationResult.mutate()` also accepts an `options` argument of type `useDataConnectMutationOptions`.
  - ***Special case:*** If the Mutation has no arguments (or all optional arguments and you wish to provide none), and you want to pass `options` to `UseMutationResult.mutate()`, you must pass `undefined` where you would normally pass the Mutation's arguments, and then may provide the options argument.

Below are examples of how to use the `default` connector's generated Mutation hook functions to execute each Mutation. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#use_queries_and_mutations_in_your_react_client).

## UpsertCustomer
You can execute the `UpsertCustomer` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [default-connector/react/index.d.ts](./index.d.ts)):
```javascript
useUpsertCustomer(options?: useDataConnectMutationOptions<UpsertCustomerData, FirebaseError, UpsertCustomerVariables>): UseDataConnectMutationResult<UpsertCustomerData, UpsertCustomerVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useUpsertCustomer(dc: DataConnect, options?: useDataConnectMutationOptions<UpsertCustomerData, FirebaseError, UpsertCustomerVariables>): UseDataConnectMutationResult<UpsertCustomerData, UpsertCustomerVariables>;
```

### Variables
The `UpsertCustomer` Mutation requires an argument of type `UpsertCustomerVariables`, which is defined in [default-connector/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface UpsertCustomerVariables {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  acceptsMarketing: boolean;
}
```
### Return Type
Recall that calling the `UpsertCustomer` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `UpsertCustomer` Mutation is of type `UpsertCustomerData`, which is defined in [default-connector/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface UpsertCustomerData {
  customer_upsert: Customer_Key;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `UpsertCustomer`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, UpsertCustomerVariables } from '@firebasegen/default-connector';
import { useUpsertCustomer } from '@firebasegen/default-connector/react'

export default function UpsertCustomerComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useUpsertCustomer();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useUpsertCustomer(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useUpsertCustomer(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useUpsertCustomer(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useUpsertCustomer` Mutation requires an argument of type `UpsertCustomerVariables`:
  const upsertCustomerVars: UpsertCustomerVariables = {
    firstName: ..., 
    lastName: ..., 
    email: ..., 
    phone: ..., 
    acceptsMarketing: ..., 
  };
  mutation.mutate(upsertCustomerVars);
  // Variables can be defined inline as well.
  mutation.mutate({ firstName: ..., lastName: ..., email: ..., phone: ..., acceptsMarketing: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(upsertCustomerVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.customer_upsert);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## CreateProductReview
You can execute the `CreateProductReview` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [default-connector/react/index.d.ts](./index.d.ts)):
```javascript
useCreateProductReview(options?: useDataConnectMutationOptions<CreateProductReviewData, FirebaseError, CreateProductReviewVariables>): UseDataConnectMutationResult<CreateProductReviewData, CreateProductReviewVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useCreateProductReview(dc: DataConnect, options?: useDataConnectMutationOptions<CreateProductReviewData, FirebaseError, CreateProductReviewVariables>): UseDataConnectMutationResult<CreateProductReviewData, CreateProductReviewVariables>;
```

### Variables
The `CreateProductReview` Mutation requires an argument of type `CreateProductReviewVariables`, which is defined in [default-connector/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface CreateProductReviewVariables {
  productId: UUIDString;
  rating: number;
  content: string;
}
```
### Return Type
Recall that calling the `CreateProductReview` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `CreateProductReview` Mutation is of type `CreateProductReviewData`, which is defined in [default-connector/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface CreateProductReviewData {
  productReview_insert: ProductReview_Key;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `CreateProductReview`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, CreateProductReviewVariables } from '@firebasegen/default-connector';
import { useCreateProductReview } from '@firebasegen/default-connector/react'

export default function CreateProductReviewComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useCreateProductReview();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useCreateProductReview(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useCreateProductReview(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useCreateProductReview(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useCreateProductReview` Mutation requires an argument of type `CreateProductReviewVariables`:
  const createProductReviewVars: CreateProductReviewVariables = {
    productId: ..., 
    rating: ..., 
    content: ..., 
  };
  mutation.mutate(createProductReviewVars);
  // Variables can be defined inline as well.
  mutation.mutate({ productId: ..., rating: ..., content: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(createProductReviewVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.productReview_insert);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## CreateOrder
You can execute the `CreateOrder` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [default-connector/react/index.d.ts](./index.d.ts)):
```javascript
useCreateOrder(options?: useDataConnectMutationOptions<CreateOrderData, FirebaseError, CreateOrderVariables>): UseDataConnectMutationResult<CreateOrderData, CreateOrderVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useCreateOrder(dc: DataConnect, options?: useDataConnectMutationOptions<CreateOrderData, FirebaseError, CreateOrderVariables>): UseDataConnectMutationResult<CreateOrderData, CreateOrderVariables>;
```

### Variables
The `CreateOrder` Mutation requires an argument of type `CreateOrderVariables`, which is defined in [default-connector/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface CreateOrderVariables {
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
```
### Return Type
Recall that calling the `CreateOrder` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `CreateOrder` Mutation is of type `CreateOrderData`, which is defined in [default-connector/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface CreateOrderData {
  order_insert: Order_Key;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `CreateOrder`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, CreateOrderVariables } from '@firebasegen/default-connector';
import { useCreateOrder } from '@firebasegen/default-connector/react'

export default function CreateOrderComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useCreateOrder();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useCreateOrder(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useCreateOrder(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useCreateOrder(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useCreateOrder` Mutation requires an argument of type `CreateOrderVariables`:
  const createOrderVars: CreateOrderVariables = {
    chargeId: ..., // optional
    paymentIntentId: ..., // optional
    receiptUrl: ..., // optional
    subtotalPrice: ..., 
    totalTax: ..., 
    totalShippingPrice: ..., 
    totalPrice: ..., 
    financialStatus: ..., 
    fulfillmentStatus: ..., 
  };
  mutation.mutate(createOrderVars);
  // Variables can be defined inline as well.
  mutation.mutate({ chargeId: ..., paymentIntentId: ..., receiptUrl: ..., subtotalPrice: ..., totalTax: ..., totalShippingPrice: ..., totalPrice: ..., financialStatus: ..., fulfillmentStatus: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(createOrderVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.order_insert);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## UpdateOrderByPaymentIntentId
You can execute the `UpdateOrderByPaymentIntentId` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [default-connector/react/index.d.ts](./index.d.ts)):
```javascript
useUpdateOrderByPaymentIntentId(options?: useDataConnectMutationOptions<UpdateOrderByPaymentIntentIdData, FirebaseError, UpdateOrderByPaymentIntentIdVariables>): UseDataConnectMutationResult<UpdateOrderByPaymentIntentIdData, UpdateOrderByPaymentIntentIdVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useUpdateOrderByPaymentIntentId(dc: DataConnect, options?: useDataConnectMutationOptions<UpdateOrderByPaymentIntentIdData, FirebaseError, UpdateOrderByPaymentIntentIdVariables>): UseDataConnectMutationResult<UpdateOrderByPaymentIntentIdData, UpdateOrderByPaymentIntentIdVariables>;
```

### Variables
The `UpdateOrderByPaymentIntentId` Mutation requires an argument of type `UpdateOrderByPaymentIntentIdVariables`, which is defined in [default-connector/index.d.ts](../index.d.ts). It has the following fields:

```javascript
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
Recall that calling the `UpdateOrderByPaymentIntentId` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `UpdateOrderByPaymentIntentId` Mutation is of type `UpdateOrderByPaymentIntentIdData`, which is defined in [default-connector/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface UpdateOrderByPaymentIntentIdData {
  order_update?: Order_Key | null;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `UpdateOrderByPaymentIntentId`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, UpdateOrderByPaymentIntentIdVariables } from '@firebasegen/default-connector';
import { useUpdateOrderByPaymentIntentId } from '@firebasegen/default-connector/react'

export default function UpdateOrderByPaymentIntentIdComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useUpdateOrderByPaymentIntentId();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useUpdateOrderByPaymentIntentId(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useUpdateOrderByPaymentIntentId(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useUpdateOrderByPaymentIntentId(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useUpdateOrderByPaymentIntentId` Mutation requires an argument of type `UpdateOrderByPaymentIntentIdVariables`:
  const updateOrderByPaymentIntentIdVars: UpdateOrderByPaymentIntentIdVariables = {
    paymentIntentId: ..., 
    financialStatus: ..., // optional
    fulfillmentStatus: ..., // optional
    receiptUrl: ..., // optional
    processedAt: ..., // optional
    chargeId: ..., // optional
  };
  mutation.mutate(updateOrderByPaymentIntentIdVars);
  // Variables can be defined inline as well.
  mutation.mutate({ paymentIntentId: ..., financialStatus: ..., fulfillmentStatus: ..., receiptUrl: ..., processedAt: ..., chargeId: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(updateOrderByPaymentIntentIdVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.order_update);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## UpdateOrderByChargeId
You can execute the `UpdateOrderByChargeId` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [default-connector/react/index.d.ts](./index.d.ts)):
```javascript
useUpdateOrderByChargeId(options?: useDataConnectMutationOptions<UpdateOrderByChargeIdData, FirebaseError, UpdateOrderByChargeIdVariables | void>): UseDataConnectMutationResult<UpdateOrderByChargeIdData, UpdateOrderByChargeIdVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useUpdateOrderByChargeId(dc: DataConnect, options?: useDataConnectMutationOptions<UpdateOrderByChargeIdData, FirebaseError, UpdateOrderByChargeIdVariables | void>): UseDataConnectMutationResult<UpdateOrderByChargeIdData, UpdateOrderByChargeIdVariables>;
```

### Variables
The `UpdateOrderByChargeId` Mutation has an optional argument of type `UpdateOrderByChargeIdVariables`, which is defined in [default-connector/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface UpdateOrderByChargeIdVariables {
  financialStatus?: string | null;
  fulfillmentStatus?: string | null;
  receiptUrl?: string | null;
  processedAt?: TimestampString | null;
  chargeId?: string | null;
}
```
### Return Type
Recall that calling the `UpdateOrderByChargeId` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `UpdateOrderByChargeId` Mutation is of type `UpdateOrderByChargeIdData`, which is defined in [default-connector/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface UpdateOrderByChargeIdData {
  order_update?: Order_Key | null;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `UpdateOrderByChargeId`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, UpdateOrderByChargeIdVariables } from '@firebasegen/default-connector';
import { useUpdateOrderByChargeId } from '@firebasegen/default-connector/react'

export default function UpdateOrderByChargeIdComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useUpdateOrderByChargeId();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useUpdateOrderByChargeId(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useUpdateOrderByChargeId(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useUpdateOrderByChargeId(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useUpdateOrderByChargeId` Mutation has an optional argument of type `UpdateOrderByChargeIdVariables`:
  const updateOrderByChargeIdVars: UpdateOrderByChargeIdVariables = {
    financialStatus: ..., // optional
    fulfillmentStatus: ..., // optional
    receiptUrl: ..., // optional
    processedAt: ..., // optional
    chargeId: ..., // optional
  };
  mutation.mutate(updateOrderByChargeIdVars);
  // Variables can be defined inline as well.
  mutation.mutate({ financialStatus: ..., fulfillmentStatus: ..., receiptUrl: ..., processedAt: ..., chargeId: ..., });
  // Since all variables are optional for this Mutation, you can omit the `UpdateOrderByChargeIdVariables` argument.
  mutation.mutate();

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  // Since all variables are optional for this Mutation, you can provide options without providing any variables.
  // To do so, you must pass `undefined` where you would normally pass the variables.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(updateOrderByChargeIdVars /** or undefined */, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.order_update);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## CreateOrderItem
You can execute the `CreateOrderItem` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [default-connector/react/index.d.ts](./index.d.ts)):
```javascript
useCreateOrderItem(options?: useDataConnectMutationOptions<CreateOrderItemData, FirebaseError, CreateOrderItemVariables>): UseDataConnectMutationResult<CreateOrderItemData, CreateOrderItemVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useCreateOrderItem(dc: DataConnect, options?: useDataConnectMutationOptions<CreateOrderItemData, FirebaseError, CreateOrderItemVariables>): UseDataConnectMutationResult<CreateOrderItemData, CreateOrderItemVariables>;
```

### Variables
The `CreateOrderItem` Mutation requires an argument of type `CreateOrderItemVariables`, which is defined in [default-connector/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface CreateOrderItemVariables {
  orderId: UUIDString;
  productId: UUIDString;
  quantity: number;
  price: number;
}
```
### Return Type
Recall that calling the `CreateOrderItem` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `CreateOrderItem` Mutation is of type `CreateOrderItemData`, which is defined in [default-connector/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface CreateOrderItemData {
  orderItem_insert: OrderItem_Key;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `CreateOrderItem`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, CreateOrderItemVariables } from '@firebasegen/default-connector';
import { useCreateOrderItem } from '@firebasegen/default-connector/react'

export default function CreateOrderItemComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useCreateOrderItem();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useCreateOrderItem(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useCreateOrderItem(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useCreateOrderItem(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useCreateOrderItem` Mutation requires an argument of type `CreateOrderItemVariables`:
  const createOrderItemVars: CreateOrderItemVariables = {
    orderId: ..., 
    productId: ..., 
    quantity: ..., 
    price: ..., 
  };
  mutation.mutate(createOrderItemVars);
  // Variables can be defined inline as well.
  mutation.mutate({ orderId: ..., productId: ..., quantity: ..., price: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(createOrderItemVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.orderItem_insert);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

