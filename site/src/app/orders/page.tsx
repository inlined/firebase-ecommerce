import OrderHistory from '@/components/sections/order-history'
import { getOrdersByCustomerId } from '@firebasegen/default-connector'
import getServerApp from '@/lib/firebase/getServerApp'
import { getAuth } from 'firebase/auth';
import getDataConnect from '@/lib/firebase/getDataConnect';

export default async function OrdersPage() {
  const app = await getServerApp();
  const auth = getAuth(app);
  const customerId = auth.currentUser?.uid ?? ''
  
  const { data } = await getOrdersByCustomerId(getDataConnect(app), { customerId })

  console.log(`getOrdersByCustomerId(${customerId}): ${JSON.stringify(data, null, 2)}`);
  return (
    <section className="text-foreground bg-background">
      <div className="container pt-20 pb-10 lg:pt-48 lg:pb-20 space-y-10">
        <OrderHistory orders={data.orders} />
      </div>
    </section>
  )
}
