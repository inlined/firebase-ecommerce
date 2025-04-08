import { executeGQL } from "@/lib/firebase/admin/getDataConnect";

// Because we are in a webhook, we do not have user context and cannot use
// the client SDK. Let's have fun with the Admin SDK.

export interface CreateOrderRequest {
    customerId: string
    shippingStreet1: string
    shippingStreet2?: string
    shippingCity: string
    shippingState: string
    shippingZip: string
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
            $chargeId: String
            $customerId: String
            $shippingStreet1: String!
            $shippingStreet2: String
            $shippingCity: String!
            $shippingState: String!
            $shippingZip: String!
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
                    customerId: $customerId
                    shippingStreet1: $shippingStreet1
                    shippingStreet2: $shippingStreet2
                    shippingCity: $shippingCity
                    shippingState: $shippingState
                    shippingZip: $shippingZip
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
    return executeGQL(query, req);
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
    return executeGQL(query, req);
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
            $productId: String!,
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
    return executeGQL(query, req);
}
