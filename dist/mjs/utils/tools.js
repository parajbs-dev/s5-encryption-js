import { blake3 } from "@noble/hashes/blake3";
import { Buffer } from "buffer";
export const cidTypeEncrypted = 0xae;
export const mhashBlake3Default = 0x1f;
export const encryptionAlgorithmXChaCha20Poly1305 = 0xa6;
/**
 * Decodes a Base64 URL-encoded string into a Buffer object.
 * @param input - The Base64 URL-encoded string to decode.
 * @returns A Buffer object containing the decoded binary data.
 */
export function decodeBase64URL(input) {
    // Replace characters '-' with '+' and '_' with '/' in the input string
    input = input.replace(/-/g, "+").replace(/_/g, "/");
    // Calculate the padding length
    const paddingLength = input.length % 4;
    // Append necessary padding characters to the input string
    if (paddingLength > 0) {
        input += "=".repeat(4 - paddingLength);
    }
    // Decode the modified Base64 string using the built-in atob function
    const base64 = atob(input);
    // Create a new Buffer object with the same length as the decoded Base64 string
    const output = Buffer.alloc(base64.length);
    // Convert each character in the decoded Base64 string to its character code
    // and store it in the corresponding index of the output Buffer
    for (let i = 0; i < base64.length; i++) {
        output[i] = base64.charCodeAt(i);
    }
    // Return the resulting Buffer object
    return output;
}
/**
 * Converts a hash Buffer to a URL-safe Base64 string.
 * @param mHash The mHash Buffer to be converted.
 * @returns The URL-safe Base64 string representation of the mHash.
 */
export function convertMHashToB64url(mHash) {
    // Convert the hash Buffer to a Base64 string
    const hashBase64 = mHash.toString("base64");
    // Make the Base64 string URL-safe
    const hashBase64url = hashBase64.replace(/\+/g, "-").replace(/\//g, "_").replace("=", "");
    return hashBase64url;
}
/**
 * Calculates the BLAKE3 hash of a file.
 * @param file - The file to calculate the hash from.
 * @returns A promise that resolves to a Buffer containing the BLAKE3 hash.
 */
export async function calculateB3hashFromFile(file) {
    // Create a hash object
    const hasher = await blake3.create({});
    // Define the chunk size (1 MB)
    const chunkSize = 1024 * 1024;
    // Initialize the position to 0
    let position = 0;
    // Process the file in chunks
    while (position <= file.size) {
        // Slice the file to extract a chunk
        const chunk = file.slice(position, position + chunkSize);
        const chunkArrayBuffer = await chunk.arrayBuffer();
        // Update the hash with the chunk's data
        hasher.update(Buffer.from(chunkArrayBuffer));
        // Move to the next position
        position += chunkSize;
    }
    // Obtain the final hash value
    const b3hash = hasher.digest();
    // Return the hash value as a Promise resolved to a Buffer
    return Buffer.from(b3hash);
}
