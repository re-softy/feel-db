import { Metadata } from "next";
import { SEOData } from "@/types/types";

/**
 * Generates Next.js metadata from SEO data
 * @param seoData - The SEO data from the API
 * @param fallbackTitle - Fallback title if SEO data is not available
 * @param fallbackDescription - Fallback description if SEO data is not available
 * @returns Next.js Metadata object
 */
export function generateSEOMetadata(
  seoData: SEOData | null,
  fallbackTitle: string = "Media Details - FeelDB",
  fallbackDescription: string = "Discover media by emotions on FeelDB"
): Metadata {
  if (!seoData) {
    return {
      title: fallbackTitle,
      description: fallbackDescription,
    };
  }

  return {
    title: seoData.title,
    description: seoData.description,
    openGraph: {
      title: seoData.og_title,
      description: seoData.og_description,
      images: [
        {
          url: seoData.og_image,
          width: 1200,
          height: 630,
          alt: seoData.og_title,
        },
      ],
    },
    alternates: {
      canonical: seoData.canonical,
    },
    other: {
      'application/ld+json': JSON.stringify(seoData.json_ld),
    },
  };
}
