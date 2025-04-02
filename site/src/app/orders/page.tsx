import OrderHistory from '@/components/sections/order-history'
import { getCurrentUsersOrders, GetCurrentUsersOrdersData } from '@firebasegen/default-connector'
import getServerApp from '@/lib/firebase/getServerApp'
import { getAuth } from 'firebase/auth';
import getDataConnect from '@/lib/firebase/getDataConnect';

export default async function OrdersPage() {
  const app = await getServerApp();
  
  let orders: GetCurrentUsersOrdersData["orders"] = [];
  if (getAuth(app).currentUser) {
    ({ data: { orders }} = await getCurrentUsersOrders(getDataConnect(app)));
  }

  console.log(`getCurrentUsersOrders(): ${JSON.stringify(orders, null, 2)}`);
  return (
    <section className="text-foreground bg-background">
      <div className="container pt-20 pb-10 lg:pt-48 lg:pb-20 space-y-10">
        <OrderHistory orders={orders} />
      </div>
    </section>
  )
}
