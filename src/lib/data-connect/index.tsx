import { connectorConfig } from '@firebasegen/default-connector'
import { getDataConnect } from 'firebase/data-connect'
import { firebaseApp } from '@/lib/firebase';

export const dc = getDataConnect(firebaseApp, connectorConfig)
