import type { Payload } from "payload";
import configPromise from "@payload-config";
import payload from "payload";

let cached = (global as any).payload;

if (!cached) {
    cached = (global as any).payload = {
        client: null,
        promise: null,
    };
}

export const getPayloadClient = async (): Promise<Payload> => {
    if (cached.client) {
        return cached.client;
    }

    if (!cached.promise) {
        const config = await configPromise;
        cached.promise = payload.init({
            config,
        });
    }

    try {
        cached.client = await cached.promise;
    } catch (e: unknown) {
        cached.promise = null;
        throw e;
    }

    return cached.client;
};
