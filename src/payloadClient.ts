import type { Payload } from 'payload';
import configPromise from '@payload-config';
import payload from 'payload';

/**
 * Custom error class for Payload client initialization failures
 */
class PayloadInitializationError extends Error {
    constructor(message: string, public readonly cause?: unknown) {
        super(message);
        this.name = 'PayloadInitializationError';
    }
}

/**
 * Interface defining the structure of the Payload client cache
 */
interface PayloadCache {
    client: Payload | null;
    promise: Promise<Payload> | null;
}

// Using module augmentation for global types
declare global {
    // eslint-disable-next-line no-var
    var __payloadCache: PayloadCache | undefined;
}

/**
 * Get or create the global cache instance
 */
const getCache = (): PayloadCache => {
    if (!global.__payloadCache) {
        global.__payloadCache = {
            client: null,
            promise: null,
        };
    }
    return global.__payloadCache;
};

/**
 * Returns a singleton instance of the Payload client.
 * Initializes the client if it hasn't been initialized yet.
 * 
 * @returns Promise resolving to the Payload client instance
 * @throws {PayloadInitializationError} If initialization fails
 */
export const getPayloadClient = async (): Promise<Payload> => {
    const cache = getCache();
    
    if (cache.client) {
        return cache.client;
    }

    try {
        if (!cache.promise) {
            const config = await configPromise;
            cache.promise = payload.init({ config });
        }

        const client = await cache.promise;
        if (!client) {
            throw new PayloadInitializationError('Payload client initialization returned null');
        }
        
        cache.client = client;
        return client;
    } catch (error: unknown) {
        cache.promise = null;
        throw new PayloadInitializationError(
            'Failed to initialize Payload client',
            error
        );
    }
}
