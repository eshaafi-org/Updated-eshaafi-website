import crypto from "crypto";
import base64url from "base64url";
import axios from "axios";
import { BASE_URL } from "@/helper/CONST";

// Encryption key (this is longer than 32 bytes)
const encryptionKey = 'WThxTGd6M1FURmNLRnNYNGJZWWZtSXR4eGFMX3ZZWlVwT0dBMzlaNloyZz0=';

let key = base64url.toBuffer(encryptionKey);
key = key.slice(0, 32);

if (key.length !== 32) {
    throw new Error(`Invalid key length: ${key.length} bytes. Expected 32 bytes.`);
}

export default async function handler(req, res) {
    if (req.method === "POST") {
        try {
            console.log("Handling POST request...");

            // Log the incoming data
            const data = req.body;
            console.log("Incoming data:", data);

            // Encryption process
            const iv = crypto.randomBytes(12); // AES-GCM requires a 12-byte IV
            const cipher = crypto.createCipheriv("aes-256-gcm", key, iv);

            let encrypted = cipher.update(JSON.stringify(data), "utf8", "base64");
            encrypted += cipher.final("base64");

            const authTag = cipher.getAuthTag();
            const encryptedData = base64url.encode(Buffer.concat([iv, Buffer.from(encrypted, "base64"), authTag]));

            console.log("Encrypted data:", encryptedData);

            // Log the URL to confirm BASE_URL is correct
            console.log("BASE_URL:", BASE_URL);
            console.log(`Full URL: ${BASE_URL}/new/patients/payfast/payments`);

            // Data to send to the external API
            const payload = { data: encryptedData };

            // Make the API request
            const response = await axios.post(
                `${BASE_URL}/new/patients/payfast/payments`,
                payload,
                {
                    headers: { 'Content-Type': 'application/json' },
                    timeout: 5000,  // Add timeout of 5 seconds
                }
            );

            // Log the external API response
            console.log("External API response status:", response.status);
            console.log("External API response data:", response.data);

            // Respond to the client
            res.status(200).json({
                message: "Data encrypted and sent successfully",
                externalApiResponse: response.data,
            });

        } catch (error) {
            console.error("Error encrypting and sending data:", error.message);
            console.error("Axios error response:", error.response ? error.response.data : "No response");
            console.error("Axios error status code:", error.response ? error.response.status : "No status");

            res.status(500).json({
                message: "Failed to encrypt and send data",
                error: error.message,
                details: error.response ? error.response.data : "No response data",
            });
        }
    } else {
        res.status(405).json({ message: "Method not allowed" });
    }
}
