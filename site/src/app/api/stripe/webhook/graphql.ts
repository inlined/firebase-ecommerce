import {
  connectorConfig,
} from '@firebasegen/default-connector'
import { initializeApp } from 'firebase-admin/app';
import { DataConnect, getDataConnect } from 'firebase-admin/data-connect'

// Because we are in a webhook, we do not have user context and cannot use
// the client SDK. Let's have fun with the Admin SDK.

// This fun little helper lets us do type inferencing from both sides so that we don't need
// to spell out long types in the executeGraphql side!
let fdcCache: DataConnect | null = null;
async function run<Response, Request>(query: string, req: Request): Promise<Response> {
    if (!fdcCache) {
        const app = initializeApp();
        // N.B. For consistency I'm loading connectorConfig from the generated
        // codebase, but admin and client use slighly different config IDs.
        let emulatorHost = process.env.DATA_CONNECT_EMULATOR_HOST;
        if (emulatorHost?.startsWith("http://")) {
            console.log("Stripping http prefix to fix FDC admin emulator bug");
            emulatorHost = emulatorHost.substring("http://".length);
            (process.env as any).DATA_CONNECT_EMULATOR_HOST = emulatorHost;
        }
        fdcCache = getDataConnect({...connectorConfig, serviceId: connectorConfig.service}, app);
    }
    const { data } = await fdcCache.executeGraphql<Response, Request>(query, { variables: req });
  return data
}

export interface CreateOrderRequest {
    customerId: string
    chargeId?: String
    paymentIntentId?: string
    receiptUrl?: string
    subtotalPrice: number;
    totalTax: number;
    totalShippingPrice: number;
    totalPrice: number;
    financialStatus: string;
    fulfillmentStatus: string;
}

export interface CreateOrderResponse {
  order_insert: {
    id: string;
  }
}

export function createOrder(req: CreateOrderRequest): Promise<CreateOrderResponse> {
    const query = `
    mutation CreateOrder(
        $customerId: String!
        $chargeId: String
        $paymentIntentId: String
        $receiptUrl: String
        $subtotalPrice: Float!
        $totalTax: Float!
        $totalShippingPrice: Float!
        $totalPrice: Float!
        $financialStatus: String!
        $fulfillmentStatus: String!
    ) @auth(level: NO_ACCESS) {
        order_insert(
            data: {
            customerId_expr: "auth.uid"
            chargeId: $chargeId
            paymentIntentId: $paymentIntentId
            receiptUrl: $receiptUrl
            subtotalPrice: $subtotalPrice
            totalTax: $totalTax
            totalShippingPrice: $totalShippingPrice
            totalPrice: $totalPrice
            financialStatus: $financialStatus
            fulfillmentStatus: $fulfillmentStatus
            }
        )
    }`;
    return run(query, req);
}

export interface UpdateOrderByPaymentIntentIdRequest {
  paymentIntentId: string,
  financialStatus?: string,
  fulfillmentStatus?: string,
  receiptUrl?: string,
  processedAt?: string,
  chargeId?: string,
}

export interface UpdateOrderByPaymentIntentIdResponse {};

export async function updateOrderByPaymentIntentId(req: UpdateOrderByPaymentIntentIdRequest): Promise<UpdateOrderByPaymentIntentIdResponse> {
    const query = `
        mutation UpdateOrderByPaymentIntentId(
            $paymentIntentId: String!
            $financialStatus: String
            $fulfillmentStatus: String
            $receiptUrl: String
            $processedAt: Timestamp
            $chargeId: String
        ) @auth(level: NO_ACCESS) {
            order_update(
            first: { where: { paymentIntentId: { eq: $paymentIntentId } } }
            data: {
                financialStatus: $financialStatus
                fulfillmentStatus: $fulfillmentStatus
                receiptUrl: $receiptUrl
                processedAt: $processedAt
                chargeId: $chargeId
            }
            )
        }`;
    return run(query, req);
}

export interface CreateOrderItemRequest {
  orderId: string;
  productId: string;
  quantity: number;
  price: number;
}

export interface CreateOrderItemResponse {};

export function createOrderItem(req: CreateOrderItemRequest): Promise<CreateOrderItemResponse> {
    const query = `
        mutation CreateOrderItem(
            $orderId: UUID!,
            $productId: UUID!,
            $quantity: Int!,
            $price: Float!
        ) @auth(level: NO_ACCESS) {
        orderItem_insert(
            data: {
            order: { id: $orderId }
            product: { id: $productId }
            quantity: $quantity
            price: $price
            }
        )
    }`;
    return run(query, req);
}
