import OrderSummary from '@/components/sections/order-summary'
import { getOrderById } from '../../../../dataconnect-generated/js/default-connector'
import getDataConnect from '@/lib/firebase/getDataConnect'
import getServerApp from '@/lib/firebase/getServerApp'
import getAuth from '@/lib/firebase/getAuth'

export default async function OrderSummaryPage({ params }: { params: Promise<{ id: string }> }) {
  const id = (await params).id
  console.log("Getting server app");
  const app = await getServerApp();
  console.log("Got server app");
  const auth = getAuth(app);
  await auth.authStateReady();
  console.log("Logged in as user", auth.currentUser?.uid);

  const { data } = await getOrderById(getDataConnect(app), { id })

  return <OrderSummary order={data?.order} />
}
