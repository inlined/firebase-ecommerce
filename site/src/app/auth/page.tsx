import { getAuthToken } from '@/lib/firebase/getServerApp'
import Authentication from './authentication'
import { redirect } from 'next/navigation'

console.log("In auth page");
export default async function AuthPage() {
  if (await getAuthToken()) {
    return redirect('/orders')
  }

  return <Authentication />
}
