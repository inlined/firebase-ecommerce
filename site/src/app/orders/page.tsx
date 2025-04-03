import OrderHistory from '@/components/sections/order-history'
import { getCurrentUsersOrders, GetCurrentUsersOrdersData } from '@firebasegen/default-connector'
import getServerApp from '@/lib/firebase/getServerApp'
import getAuth from '@/lib/firebase/getAuth';
import getDataConnect from '@/lib/firebase/getDataConnect';
import { cookies } from 'next/headers';

export default async function OrdersPage() {
  const app = await getServerApp();
  const auth = getAuth(app);
  await auth.authStateReady();
  
  let orders: GetCurrentUsersOrdersData["orders"] = [];
  if (auth.currentUser) {
    ({ data: { orders }} = await getCurrentUsersOrders(getDataConnect(app)));
  } else {
    console.log("Not logged in");
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
