import OrderSummary from '@/components/sections/order-summary'
import { getOrder } from '../../../../dataconnect-generated/js/default-connector'
import getDataConnect from '@/lib/firebase/getDataConnect'
import getServerApp from '@/lib/firebase/getServerApp'
import getAuth from '@/lib/firebase/getAuth'

export default async function OrderSummaryPage({ params }: { params: Promise<{ id: string }> }) {
  const id = (await params).id
  const app = await getServerApp();
  const auth = getAuth(app);
  await auth.authStateReady();

  const { data: { order } } = await getOrder(getDataConnect(app), { id })
  if (!order) {
    return null;
  }

  return <OrderSummary order={order} />
}
