import OrderSummary from '@/components/sections/order-summary'
import { getOrderById } from '../../../../dataconnect-generated/js/default-connector'
import getDataConnect from '@/lib/firebase/getDataConnect'
import getServerApp from '@/lib/firebase/getServerApp'
import { getAuth } from '@firebase/auth'

export default async function OrderSummaryPage({ params }: { params: Promise<{ id: string }> }) {
  const id = (await params).id
  const app = await getServerApp();
  const auth = getAuth(app);
  await auth.authStateReady();

  const { data } = await getOrderById(getDataConnect(app), { id })

  return <OrderSummary order={data?.order} />
}
