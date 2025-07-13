import { google } from "googleapis";
import dotenv from "dotenv";
import { Buffer } from "buffer";

dotenv.config();

export async function POST(req) {
  try {
    const body = await req.json(); // Parse request body
    const { name, phone, email, message, propertyName, url, attachment } = body;

    // Validate required fields
    if (!name || !phone || !email || !message || !propertyName || !url) {
      return new Response(
        JSON.stringify({ error: "All fields are required!" }),
        { status: 400 }
      );
    }

    // Decode Base64 credentials from environment variable
    if (!process.env.SERVICE_ACCOUNT) {
      throw new Error("Missing SERVICE_ACCOUNT credentials");
    }

    const decodedCredentials = Buffer.from(
      process.env.SERVICE_ACCOUNT,
      "base64"
    ).toString("utf-8");
    const credentials = JSON.parse(decodedCredentials);

    // Authenticate with Google Sheets API
    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const sheets = google.sheets({ version: "v4", auth: await auth.getClient() });

    const spreadsheetId = process.env.GOOGLE_SHEETS_ID;
    const range = "PropertyAttachmentRequest!A:Z";

    // Prepare data for Google Sheet
    const attachmentDetails = attachment
      ? `${attachment.name} (ID: ${attachment.id}, Type: ${attachment.type})`
      : "No specific attachment requested";

    // Append data to Google Sheet
    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range,
      valueInputOption: "USER_ENTERED",
      resource: {
        values: [
          [
            name,
            phone,
            email,
            message,
            propertyName,
            url,
            attachmentDetails, // Add attachment details
            new Date().toISOString(),
          ],
        ],
      },
    });

    return new Response(
      JSON.stringify({ message: "Data added successfully!" }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error adding data to Google Sheets:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}