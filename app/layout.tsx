import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import CustomCursor from "./components/CustomCursor";
import PremiumBackground from "./components/PremiumBackground";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "WryClip – Creator Ecosystem for Actors, Writers, Creators & Filmmakers",
    template: "%s | WryClip"
  },
  description: "WryClip connects actors, writers, creators, filmmakers and casting professionals. Discover auditions, collaborations and creative opportunities in one ecosystem.",
  metadataBase: new URL("https://wryclip.in"),
  alternates: {
    canonical: "https://wryclip.in",
  },
  keywords: ["WryClip", "Creator Ecosystem", "Actors", "Writers", "Filmmakers", "Casting Directors", "Content Creators", "Auditions", "Creative Collaborations", "Entertainment Industry Network", "Short Video", "Casting Call", "Poetry Platform", "Monetize Poetry", "Writers Hub"],
  openGraph: {
    title: "WryClip – Creator Ecosystem for Actors, Writers, Creators & Filmmakers",
    description: "WryClip connects actors, writers, creators, filmmakers and casting professionals. Discover auditions, collaborations and creative opportunities in one ecosystem.",
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
    title: "WryClip – Creator Ecosystem for Actors, Writers, Creators & Filmmakers",
    description: "WryClip connects actors, writers, creators, filmmakers and casting professionals. Discover auditions, collaborations and creative opportunities in one ecosystem.",
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

        {/* Structured Data (Organization & Website Schema) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              {
                "@context": "https://schema.org",
                "@type": "Organization",
                "@id": "https://wryclip.in/#organization",
                "name": "WryClip",
                "url": "https://wryclip.in",
                "logo": "https://wryclip.in/bg-logo.jpeg",
                "description": "WryClip connects actors, writers, creators, filmmakers and casting professionals. Discover auditions, collaborations and creative opportunities in one ecosystem.",
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
                  { "@type": "Person", "@id": "https://wryclip.in/#kunj-shukla" },
                  { "@type": "Person", "@id": "https://wryclip.in/#mayank-kumar" },
                  { "@type": "Person", "@id": "https://wryclip.in/#anhad-satsangi" }
                ],
                "employee": [
                  { "@type": "Person", "@id": "https://wryclip.in/#kunj-shukla" },
                  { "@type": "Person", "@id": "https://wryclip.in/#mayank-kumar" },
                  { "@type": "Person", "@id": "https://wryclip.in/#anhad-satsangi" }
                ]
              },
              {
                "@context": "https://schema.org",
                "@type": "Person",
                "@id": "https://wryclip.in/#kunj-shukla",
                "name": "Kunj Shukla",
                "jobTitle": "Chief Executive Officer",
                "email": "shriikunj@gmail.com",
                "image": "https://wryclip.in/ceo-profile.png",
                "url": "https://wryclip.in/about",
                "sameAs": [
                  "https://www.linkedin.com/in/kunj-shukla-742493342?utm_source=share_via&utm_content=profile&utm_medium=member_android"
                ],
                "worksFor": {
                  "@type": "Organization",
                  "@id": "https://wryclip.in/#organization"
                }
              },
              {
                "@context": "https://schema.org",
                "@type": "Person",
                "@id": "https://wryclip.in/#mayank-kumar",
                "name": "Mayank Kumar",
                "jobTitle": "Chief Technology Officer",
                "email": "mayank0522.s@gmail.com",
                "image": "https://wryclip.in/cto-profile.png",
                "url": "https://wryclip.in/about",
                "sameAs": [
                  "https://www.linkedin.com/in/mayank-kumar-850255381?utm_source=share_via&utm_content=profile&utm_medium=member_android"
                ],
                "worksFor": {
                  "@type": "Organization",
                  "@id": "https://wryclip.in/#organization"
                }
              },
              {
                "@context": "https://schema.org",
                "@type": "Person",
                "@id": "https://wryclip.in/#anhad-satsangi",
                "name": "Anhad Satsangi",
                "jobTitle": "Chief Marketing Officer",
                "email": "anhadsatsangi05@gmail.com",
                "image": "https://wryclip.in/cmo-profile.png",
                "url": "https://wryclip.in/about",
                "sameAs": [
                  "https://www.linkedin.com/in/anhadsatsangi?utm_source=share_via&utm_content=profile&utm_medium=member_android"
                ],
                "worksFor": {
                  "@type": "Organization",
                  "@id": "https://wryclip.in/#organization"
                }
              },
              {
                "@context": "https://schema.org",
                "@type": "WebSite",
                "name": "WryClip",
                "url": "https://wryclip.in",
                "potentialAction": {
                  "@type": "SearchAction",
                  "target": "https://wryclip.in/?s={search_term_string}",
                  "query-input": "required name=search_term_string"
                }
              }
            ])
          }}
        />

        {children}
      </body>
    </html>
  );
}