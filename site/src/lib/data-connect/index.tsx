import { connectorConfig } from '@firebasegen/default-connector'
import { type FirebaseApp } from 'firebase/app'
import { DataConnect, getDataConnect as get } from 'firebase/data-connect'

export function getDataConnect(app: FirebaseApp): DataConnect {
  return get(app, connectorConfig)
}