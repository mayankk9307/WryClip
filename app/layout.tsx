import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import CustomCursor from "./components/CustomCursor";
import PremiumBackground from "./components/PremiumBackground";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "WryClip | Short Video, Writers & Casting Hub",
    template: "%s | WryClip"
  },
  description: "The premium ecosystem linking creators, actors, poets, writers, and casting directors. Stream vertical reels for free, apply to auditions, and monetize written content (scripts, poetry, stories, ghazals) via Pay-To-Unlock.",
  metadataBase: new URL("https://wryclip.in"),
  keywords: ["WryClip", "Short Video", "Casting Call", "Acting Jobs", "Film Auditions", "Creator Economy", "Pay-To-Unlock", "UPI Payouts", "Poetry Platform", "Monetize Poetry", "Scriptwriting", "Ghazals", "Screenplays", "Story Writing", "Writers Hub", "Free Reels"],
  openGraph: {
    title: "WryClip - From Story to Screen",
    description: "The premium ecosystem linking creators, actors, poets, writers, and casting directors.",
    url: "https://wryclip.in",
    siteName: "WryClip",
    images: [
      {
        url: "/bg-logo.jpeg",
        width: 1200,
        height: 630,
        alt: "WryClip Brand Banner Logo"
      }
    ],
    locale: "en_IN",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "WryClip - From Story to Screen",
    description: "The premium ecosystem linking creators, actors, poets, writers, and casting directors.",
    images: ["/bg-logo.jpeg"]
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`} suppressHydrationWarning>
      <body className="relative min-h-full flex flex-col bg-transparent text-white overflow-x-hidden">

        {/* Cursor */}
        <CustomCursor />

        {/* Premium Animated Background */}
        <PremiumBackground />

        {/* Structured Data (Organization Schema) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "WryClip",
              "url": "https://wryclip.in",
              "logo": "https://wryclip.in/bg-logo.jpeg",
              "sameAs": [
                "https://www.instagram.com/wryclip?igsh=MWo2b2Y5emo5aWNsdA==",
                "https://www.linkedin.com/in/wryclip-504b03400?utm_source=share_via&utm_content=profile&utm_medium=member_android"
              ],
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+918766231150",
                "contactType": "customer service",
                "email": "support.wryclip@gmail.com",
                "availableLanguage": ["en", "hi"]
              },
              "founder": [
                {
                  "@type": "Person",
                  "name": "Kunj Shukla",
                  "jobTitle": "Chief Executive Officer"
                },
                {
                  "@type": "Person",
                  "name": "Mayank Kumar",
                  "jobTitle": "Chief Technology Officer"
                },
                {
                  "@type": "Person",
                  "name": "Anhad Satsangi",
                  "jobTitle": "Chief Marketing Officer"
                }
              ]
            })
          }}
        />

        {children}
      </body>
    </html>
  );
}