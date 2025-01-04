import { getPayload, type Payload } from "payload";
import config from "@payload-config";

/**
 * Custom error class for Payload client initialization failures
 */
class PayloadInitializationError extends Error {
    constructor(
        message: string,
        public readonly cause?: unknown,
    ) {
        super(message);
        this.name = "PayloadInitializationError";
    }
}

let payloadClient: Payload | null = null;

/**
 * Returns an initialized instance of the Payload client.
 * Initializes the client if it hasn't been initialized yet.
 *
 * @returns Promise resolving to the Payload client instance
 * @throws {PayloadInitializationError} If initialization fails
 */
export const getPayloadClient = async (): Promise<Payload> => {
    if (payloadClient) {
        return payloadClient;
    }

    try {
        payloadClient = await getPayload({ config });

        if (!payloadClient) {
            throw new PayloadInitializationError("payload client initialization returned null");
        }

        return payloadClient;
    } catch (error: unknown) {
        payloadClient = null;
        throw new PayloadInitializationError("failed to initialize Payload client", error);
    }
};
