/// <reference types="node" />
import { Buffer } from "buffer";
export declare const cidTypeEncrypted = 174;
export declare const mhashBlake3Default = 31;
export declare const encryptionAlgorithmXChaCha20Poly1305 = 166;
/**
 * Decodes a Base64 URL-encoded string into a Buffer object.
 * @param input - The Base64 URL-encoded string to decode.
 * @returns A Buffer object containing the decoded binary data.
 */
export declare function decodeBase64URL(input: string): Buffer;
/**
 * Converts a hash Buffer to a URL-safe Base64 string.
 * @param mHash The mHash Buffer to be converted.
 * @returns The URL-safe Base64 string representation of the mHash.
 */
export declare function convertMHashToB64url(mHash: Buffer): string;
/**
 * Calculates the BLAKE3 hash of a file.
 * @param file - The file to calculate the hash from.
 * @returns A promise that resolves to a Buffer containing the BLAKE3 hash.
 */
export declare function calculateB3hashFromFile(file: File): Promise<Buffer>;
//# sourceMappingURL=tools.d.ts.map