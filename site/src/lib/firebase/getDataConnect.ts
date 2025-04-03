import { connectorConfig } from '@firebasegen/default-connector'
import getApp from '@/lib/firebase/getApp';
import { connectDataConnectEmulator, DataConnect, getDataConnect as rawGetDataConnect } from '@firebase/data-connect'
import { type FirebaseApp } from '@firebase/app';

export default function getDataConnect(app?: FirebaseApp): DataConnect {
  const dc = rawGetDataConnect(app || getApp(), connectorConfig);
  // Client-side intialization of the emulators is coming but is not avialable yet.
  if (process.env.NEXT_PUBLIC_FIREBASE_DATACONNECT_EMULATOR_HOST) {
    connectDataConnectEmulator(dc, process.env.NEXT_PUBLIC_FIREBASE_DATACONNECT_EMULATOR_HOST);
  }
  return dc;
}
