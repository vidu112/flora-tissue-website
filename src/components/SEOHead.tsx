import { useEffect } from "react";

interface SEOProps {
  title?: string;
  description?: string;
  section?: string;
}

export function useSEO({ title, description, section }: SEOProps = {}) {
  useEffect(() => {
    // Update document title based on current section
    if (title) {
      document.title = `${title} | Flora Tissue - Plant Anatomy Education`;
    }
    
    // Update meta description
    if (description) {
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute("content", description);
      }
    }

    // Update canonical URL for section
    if (section) {
      const canonical = document.querySelector('link[rel="canonical"]');
      if (canonical) {
        canonical.setAttribute("href", `https://flora-tissue-website.vercel.app/#${section}`);
      }
    }
  }, [title, description, section]);
}

// Skip link for accessibility
export function SkipLink() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-lg focus:outline-none"
    >
      Skip to main content
    </a>
  );
}

// Structured data for individual sections
export function generateSectionSchema(sectionName: string, description: string) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPageElement",
    "name": sectionName,
    "description": description,
    "isPartOf": {
      "@type": "WebPage",
      "url": "https://flora-tissue-website.vercel.app"
    }
  };
}
