import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { success: false, error: "Email is required" },
        { status: 400 }
      );
    }

    const sheetUrl = process.env.SUBSCRIBERS_SHEET_URL || process.env.NEXT_PUBLIC_SUBSCRIBERS_SHEET_URL;

    if (!sheetUrl || sheetUrl === "YOUR_GOOGLE_SHEET_SCRIPT_URL") {
      console.error("Google Sheets Script URL is not configured on the server.");
      return NextResponse.json(
        { success: false, error: "Subscription URL is not configured." },
        { status: 500 }
      );
    }

    const response = await fetch(sheetUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        timestamp: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
        source: "WryClip Footer Alerts"
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Google Sheets submit error response:", errorText);
      return NextResponse.json(
        { success: false, error: "Failed to write to Google Sheets." },
        { status: response.status }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Subscription API route error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}
