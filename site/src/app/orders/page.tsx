import OrderHistory from '@/components/sections/order-history'
import { getCurrentUserOrders, GetCurrentUserOrdersData } from '@firebasegen/default-connector'
import getServerApp from '@/lib/firebase/getServerApp'
import getAuth from '@/lib/firebase/getAuth';
import getDataConnect from '@/lib/firebase/getDataConnect';

export default async function OrdersPage() {
  const app = await getServerApp();
  const auth = getAuth(app);
  await auth.authStateReady();
  
  let orders: GetCurrentUserOrdersData["orders"] = [];
  if (auth.currentUser) {
    ({ data: { orders }} = await getCurrentUserOrders(getDataConnect(app)));
  }

  return (
    <section className="text-foreground bg-background">
      <div className="container pt-20 pb-10 lg:pt-48 lg:pb-20 space-y-10">
        <OrderHistory orders={orders} />
      </div>
    </section>
  )
}
