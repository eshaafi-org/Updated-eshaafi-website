import { NextApiRequest, NextApiResponse } from "next";
import crypto from "crypto";
import base64url from "base64url";

// Encryption key (this is longer than 32 bytes)
const encryptionKey = 'WThxTGd6M1FURmNLRnNYNGJZWWZtSXR4eGFMX3ZZWlVwT0dBMzlaNloyZz0=';

// Decode the base64url-encoded key
let key = base64url.toBuffer(encryptionKey);

// Trim the key to 32 bytes if it's longer
key = key.slice(0, 32);

// Ensure the key is exactly 32 bytes (AES-256 key size)
if (key.length !== 32) {
    throw new Error(`Invalid key length: ${key.length} bytes. Expected 32 bytes.`);
}

// API route to encrypt data
export default async function handler(req, res) {
    if (req.method === "POST") {
        const data = req.body; // Data sent from the client
        const iv = crypto.randomBytes(12); // AES-GCM requires a 12-byte IV
        const cipher = crypto.createCipheriv("aes-256-gcm", key, iv);

        let encrypted = cipher.update(JSON.stringify(data), "utf8", "base64");
        encrypted += cipher.final("base64");

        const authTag = cipher.getAuthTag(); // Get the authentication tag

        // Combine IV, encrypted data, and auth tag, then return base64url-encoded string
        const encryptedData = base64url.encode(Buffer.concat([iv, Buffer.from(encrypted, "base64"), authTag]));

        return res.status(200).json({ encryptedData });
    } else {
        res.status(405).json({ message: "Method not allowed" });
    }
}
