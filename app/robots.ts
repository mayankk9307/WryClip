import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/dashboard/private/", "/api/"],
      },
      {
        userAgent: "Googlebot-Image",
        allow: "/",
        disallow: [],
      }
    ],
    sitemap: "https://wryclip.in/sitemap.xml",
  };
}


