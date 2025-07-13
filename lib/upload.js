// lib/upload.js
import { Storage } from "@google-cloud/storage";

/**
 * Converts a Base64 image to a File object
 */
export async function dataURLtoFile(dataurl, filename) {
    var arr = dataurl.split(','),
        mime = arr[0].match(/:(.*?);/)?.[1],
        bstr = atob(arr[arr.length - 1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);

    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
}

/**
 * Validates a given URL
 */
export function isValidURL(string) {
    var res = string.match(
        /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi
    );
    return res !== null;
}

/**
 * Uploads a file to Google Cloud Storage and returns the public URL
 */
export const uploadFileToGCS = async (file) => {
    try {
        if (!file) throw new Error("No file uploaded.");
        if (file.size < 1) throw new Error("File is empty.");

        const timestamp = new Date().toISOString();
        const uniqueFileName = `${file.name}-${timestamp}`;

        // Load Google Service Account from ENV
        const base64EncodedServiceAccount = process.env.SERVICE_ACCOUNT;
        if (!base64EncodedServiceAccount) {
            throw new Error("SERVICE_ACCOUNT is not set in environment variables.");
        }

        const decodedServiceAccount = Buffer.from(base64EncodedServiceAccount, "base64").toString("utf-8");
        const serviceAccount = JSON.parse(decodedServiceAccount);

        // Initialize Google Cloud Storage
        const storage = new Storage({
            projectId: serviceAccount.project_id,
            credentials: {
                client_email: serviceAccount.client_email,
                private_key: serviceAccount.private_key,
            },
        });

        const bucketName = "makemhomez";
        const bucket = storage.bucket(bucketName);
        const fileUpload = bucket.file(uniqueFileName);

        // Convert file to Buffer
        const buffer = await file.arrayBuffer();

        // Upload file to GCS
        await fileUpload.save(Buffer.from(buffer), {
            metadata: {
                contentType: file.type,
            }
             // Make file publicly accessible
        });

        // Return public URL
        return `https://storage.googleapis.com/${bucketName}/${uniqueFileName}`;
    } catch (error) {
        console.error("File upload error:", error);
        return null;
    }
};
