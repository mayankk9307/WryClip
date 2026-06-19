import { NextResponse } from "next/server";

export async function GET() {
  const subscribersUrl = process.env.SUBSCRIBERS_SHEET_URL || process.env.NEXT_PUBLIC_SUBSCRIBERS_SHEET_URL;
  const web3formsKey = process.env.WEB3FORMS_KEY || process.env.NEXT_PUBLIC_WEB3FORMS_KEY;
  const web3formsLegalKey = process.env.WEB3FORMS_LEGAL_KEY || process.env.NEXT_PUBLIC_WEB3FORMS_LEGAL_KEY;

  const mask = (val: string | undefined) => {
    if (!val) return "undefined/missing";
    if (val === "YOUR_GOOGLE_SHEET_SCRIPT_URL" || val === "YOUR_WEB3FORMS_ACCESS_KEY") return "default/placeholder";
    if (val.length < 8) return `too-short (length: ${val.length})`;
    return `${val.substring(0, 4)}...${val.substring(val.length - 4)} (length: ${val.length})`;
  };

  return NextResponse.json({
    NEXT_PUBLIC_SUBSCRIBERS_SHEET_URL: mask(subscribersUrl),
    NEXT_PUBLIC_WEB3FORMS_KEY: mask(web3formsKey),
    NEXT_PUBLIC_WEB3FORMS_LEGAL_KEY: mask(web3formsLegalKey)
  });
}
