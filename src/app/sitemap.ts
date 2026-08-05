import { MetadataRoute } from "next";
import { getProperties } from "@/lib/supabase";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://zerobrokertn.com";

  // Base public URLs
  const staticRoutes = [
    "",
    "/properties",
    "/submit",
    "/about",
    "/contact",
    "/privacy",
    "/terms",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "daily" as const,
    priority: route === "" ? 1.0 : 0.8,
  }));

  // Dynamic property URLs
  try {
    const properties = await getProperties();
    const dynamicRoutes = properties.map((prop) => ({
      url: `${baseUrl}/properties/${prop.id}`,
      lastModified: new Date(prop.created_at),
      changeFrequency: "weekly" as const,
      priority: 0.6,
    }));

    return [...staticRoutes, ...dynamicRoutes];
  } catch (e) {
    console.error("Sitemap generation database query error:", e);
    return staticRoutes;
  }
}
