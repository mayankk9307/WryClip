import { MetadataRoute } from "next";
import fs from "fs";
import path from "path";

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

export default function sitemap(): MetadataRoute.Sitemap {
  // Read routes from the 'app' directory at build time
  const appDirectory = path.join(process.cwd(), "app");
  const routes = getRoutesDynamically(appDirectory);

  // De-duplicate in case of any duplicate route mapping issues
  const uniqueRoutes = Array.from(new Set(routes));

  return uniqueRoutes.map((route) => {
    const isHome = route === "";
    return {
      url: `${BASE_URL}${route}`,
      lastModified: new Date(),
      changeFrequency: isHome ? "daily" : "weekly",
      priority: isHome ? 1.0 : 0.8,
    };
  });
}

