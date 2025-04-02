import { DataConnect, getDataConnect as rawGetDataConnect } from "firebase-admin/data-connect";
import { connectorConfig } from "@firebasegen/default-connector";
import getApp from "@/lib/firebase/admin/getApp";


let fdc: DataConnect | null = null;

export default function getDataConnect(): DataConnect {
    if (!fdc) {
        // N.B. For consistency I'm loading connectorConfig from the generated
        // codebase, but admin and client use slighly different config IDs.
        let emulatorHost = process.env.DATA_CONNECT_EMULATOR_HOST;
        if (emulatorHost?.startsWith("http://")) {
            console.log("Stripping http prefix to fix FDC admin emulator bug");
            emulatorHost = emulatorHost.substring("http://".length);
            (process.env as any).DATA_CONNECT_EMULATOR_HOST = emulatorHost;
        }
        fdc = rawGetDataConnect({...connectorConfig, serviceId: connectorConfig.service}, getApp());
    }
    return fdc;
}

export async function executeGQL<Response, Request>(query: string, req: Request): Promise<Response> {
    const { data } =  await getDataConnect().executeGraphql<Response, Request>(query, { variables: req });
    return data;
}