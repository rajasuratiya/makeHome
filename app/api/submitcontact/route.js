import { google } from "googleapis";
import dotenv from "dotenv";
import { Buffer } from "buffer";

dotenv.config();

export async function POST(req) {
  try {
    // Parse JSON request body
    const body = await req.json();
    const { name, email, phone, subject, message } = body;

    // Decode Base64 credentials from environment variable
    const decodedCredentials = Buffer.from(
      process.env.SERVICE_ACCOUNT, "base64"
    ).toString("utf-8");
    const credentials = JSON.parse(decodedCredentials);

    // Authenticate using the decoded credentials
    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const sheets = google.sheets({
      version: "v4",
      auth: await auth.getClient(),
    });

    // Read Google Sheet ID from env variable
    const spreadsheetId = process.env.GOOGLE_SHEETS_ID;
    const range = "ContactResponse!A:Z"; // Adjust as needed

    // Append the new row of data along with a timestamp
    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range,
      valueInputOption: "USER_ENTERED",
      resource: {
        values: [[name, email, phone, subject, message, new Date().toISOString()]],
      },
    });

    return new Response(
      JSON.stringify({ message: "Data added successfully!" }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500 }
    );
  }
}
