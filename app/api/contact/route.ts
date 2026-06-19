import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { isLegal, name, email, subject, message, replyto, from_name } = body;

    if (!email || !message || !name) {
      return NextResponse.json(
        { success: false, error: "Name, email, and message are required" },
        { status: 400 }
      );
    }

    // Determine the Web3Forms access key to use
    let accessKey = "";
    if (isLegal) {
      accessKey =
        process.env.WEB3FORMS_LEGAL_KEY ||
        process.env.NEXT_PUBLIC_WEB3FORMS_LEGAL_KEY ||
        process.env.WEB3FORMS_KEY ||
        process.env.NEXT_PUBLIC_WEB3FORMS_KEY ||
        "";
    } else {
      accessKey =
        process.env.WEB3FORMS_KEY ||
        process.env.NEXT_PUBLIC_WEB3FORMS_KEY ||
        "";
    }

    if (!accessKey || accessKey === "YOUR_WEB3FORMS_ACCESS_KEY") {
      console.error("Web3Forms access key is not configured.");
      return NextResponse.json(
        { success: false, error: "Mail access key is not configured on the server." },
        { status: 500 }
      );
    }

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        access_key: accessKey,
        name,
        email,
        subject,
        message,
        replyto,
        from_name,
      }),
    });

    const result = await response.json();

    if (!response.ok || !result.success) {
      console.error("Web3Forms API error response:", result);
      return NextResponse.json(
        { success: false, error: result.message || "Failed to submit message to Web3Forms." },
        { status: response.status || 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Contact API route error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}
