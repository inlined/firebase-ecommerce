import { getAuthToken } from '@/lib/firebase/getServerApp'
import Authentication from './authentication'
import { redirect } from 'next/navigation'

export default async function AuthPage() {
  if (await getAuthToken()) {
    return redirect('/orders')
  }

  return <Authentication />
}
