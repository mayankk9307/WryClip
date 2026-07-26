import { MetadataRoute } from "next";
import fs from "fs";
import path from "path";
import { supabase } from "./lib/supabase";

// Base URL for the production website
const BASE_URL = "https://wryclip.in";

// Fallback routes in case filesystem reading fails
const FALLBACK_ROUTES = [
  "",
  "/about",
  "/contact",
  "/privacy-policy",
  "/terms-and-conditions",
  "/community-guidelines",
  "/copyright-policy",
  "/download",
  "/refund-policy",
  "/delete-account",
];

const STATIC_PRESETS: Record<string, string[]> = {
  "": [
    "https://wryclip.in/bg-logo.jpeg",
    "https://wryclip.in/reel-page.jpeg",
    "https://wryclip.in/writer-page.jpeg",
    "https://wryclip.in/studio-page.jpeg",
    "https://wryclip.in/wallet-page.jpeg"
  ],
  "/about": [
    "https://wryclip.in/bg-logo.jpeg",
    "https://wryclip.in/ceo-profile.png",
    "https://wryclip.in/cto-profile.png",
    "https://wryclip.in/cmo-profile.png"
  ],
  "default": [
    "https://wryclip.in/bg-logo.jpeg"
  ]
};

/**
 * Recursively scans the next.js 'app' directory to find public pages.
 * Filters out internal folders, components, API routes, and private/dashboard sections.
 */
function getRoutesDynamically(dir: string, baseDir: string = dir): string[] {
  try {
    const routes: string[] = [];
    if (!fs.existsSync(dir)) return [];

    const files = fs.readdirSync(dir);
    for (const file of files) {
      const fullPath = path.join(dir, file);
      const stat = fs.statSync(fullPath);

      if (stat.isDirectory()) {
        // Exclude internal/private directories
        const isExcluded =
          ["api", "components", "dashboard"].includes(file) ||
          file.startsWith("_") ||
          file.startsWith("["); // Skip dynamic routes without data sources

        if (!isExcluded) {
          routes.push(...getRoutesDynamically(fullPath, baseDir));
        }
      } else if (file.match(/^page\.(tsx|ts|js|jsx)$/)) {
        const relativePath = path.relative(baseDir, dir);
        let routePath = relativePath.replace(/\\/g, "/");

        // Remove Next.js route groups like (auth) or (marketing) from the URL path
        routePath = routePath
          .split("/")
          .filter((segment) => !(segment.startsWith("(") && segment.endsWith(")")))
          .join("/");

        if (routePath === "." || routePath === "") {
          routes.push("");
        } else {
          routes.push("/" + routePath);
        }
      }
    }
    return routes;
  } catch (error) {
    console.error("Error reading routes dynamically for sitemap:", error);
    return FALLBACK_ROUTES;
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Read routes from the 'app' directory at build time
  const appDirectory = path.join(process.cwd(), "app");
  const routes = getRoutesDynamically(appDirectory);

  // De-duplicate in case of any duplicate route mapping issues
  const uniqueRoutes = Array.from(new Set(routes));

  const sitemapEntries: MetadataRoute.Sitemap = [];

  // 1. Generate entries for static routes
  for (const route of uniqueRoutes) {
    const isHome = route === "";
    const images = STATIC_PRESETS[route] || STATIC_PRESETS["default"];

    sitemapEntries.push({
      url: `${BASE_URL}${route}`,
      lastModified: new Date(),
      changeFrequency: isHome ? "daily" : "weekly",
      priority: isHome ? 1.0 : 0.8,
      images: images,
    });
  }

  // 2. Fetch profiles and posts from Supabase for dynamic portfolios
  let fetchedProfiles: { username: string; avatar_url?: string; posts: string[] }[] = [];

  if (supabase) {
    try {
      const { data: profiles, error: profileError } = await supabase
        .from("profiles")
        .select("id, username, avatar_url");

      if (!profileError && profiles) {
        const { data: posts, error: postError } = await supabase
          .from("posts")
          .select("user_id, cover_url")
          .eq("status", "published")
          .eq("visibility", "public");

        const postsByUser: Record<string, string[]> = {};
        if (!postError && posts) {
          for (const post of posts) {
            if (post.user_id && post.cover_url) {
              if (!postsByUser[post.user_id]) {
                postsByUser[post.user_id] = [];
              }
              // Avoid duplicate cover URLs and limit to 10 images per portfolio
              if (!postsByUser[post.user_id].includes(post.cover_url) && postsByUser[post.user_id].length < 10) {
                postsByUser[post.user_id].push(post.cover_url);
              }
            }
          }
        }

        for (const p of profiles) {
          if (p.username) {
            fetchedProfiles.push({
              username: p.username,
              avatar_url: p.avatar_url || undefined,
              posts: postsByUser[p.id] || [],
            });
          }
        }
      }
    } catch (e) {
      console.error("Error generating dynamic portfolio sitemap:", e);
    }
  }

  // If Supabase fetch failed or returned nothing, populate fallback default profiles
  if (fetchedProfiles.length === 0) {
    fetchedProfiles = [
      { username: "mayank9307", avatar_url: "https://wryclip.in/cto-profile.png", posts: [] },
      { username: "kunjshukla", avatar_url: "https://wryclip.in/ceo-profile.png", posts: [] },
      { username: "anhad_satsangi", avatar_url: "https://wryclip.in/cmo-profile.png", posts: [] },
    ];
  }

  // 3. Add dynamic portfolio entries to sitemap
  for (const profile of fetchedProfiles) {
    const route = `/?writer=${encodeURIComponent(profile.username)}`;
    const images = ["https://wryclip.in/bg-logo.jpeg"]; // Start with the brand logo

    if (profile.avatar_url) {
      const avatarUrl = profile.avatar_url.startsWith("http")
        ? profile.avatar_url
        : `${BASE_URL}${profile.avatar_url.startsWith("/") ? "" : "/"}${profile.avatar_url}`;
      images.push(avatarUrl);
    }

    for (const postCover of profile.posts) {
      const coverUrl = postCover.startsWith("http")
        ? postCover
        : `${BASE_URL}${postCover.startsWith("/") ? "" : "/"}${postCover}`;
      images.push(coverUrl);
    }

    sitemapEntries.push({
      url: `${BASE_URL}${route}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
      images: images,
    });
  }

  return sitemapEntries;
}


