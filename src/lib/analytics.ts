// Analytics utility for tracking user interactions
// Works with both Google Analytics 4 and Vercel Analytics

// Declare gtag for TypeScript
declare global {
  interface Window {
    gtag?: (
      command: string,
      action: string,
      params?: Record<string, unknown>
    ) => void;
    dataLayer?: unknown[];
  }
}

// Track page views (for SPA navigation)
export function trackPageView(pagePath: string, pageTitle?: string) {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", "page_view", {
      page_path: pagePath,
      page_title: pageTitle || document.title,
      page_location: window.location.href,
    });
  }
}

// Track section views (when user scrolls to a section)
export function trackSectionView(sectionId: string, sectionName: string) {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", "section_view", {
      section_id: sectionId,
      section_name: sectionName,
      event_category: "engagement",
    });
  }
}

// Track 3D tree interactions
export function trackTreeInteraction(
  part: string,
  action: "click" | "hover"
) {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", "tree_interaction", {
      tree_part: part,
      interaction_type: action,
      event_category: "3d_model",
    });
  }
}

// Track quiz events
export function trackQuizEvent(
  action: "start" | "answer" | "complete",
  details?: {
    questionNumber?: number;
    isCorrect?: boolean;
    score?: number;
    totalQuestions?: number;
  }
) {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", `quiz_${action}`, {
      event_category: "quiz",
      ...details,
    });
  }
}

// Track CTA clicks
export function trackCTAClick(buttonName: string, location: string) {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", "cta_click", {
      button_name: buttonName,
      click_location: location,
      event_category: "engagement",
    });
  }
}

// Track scroll depth
export function trackScrollDepth(percentage: 25 | 50 | 75 | 100) {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", "scroll_depth", {
      scroll_percentage: percentage,
      event_category: "engagement",
    });
  }
}

// Track outbound links
export function trackOutboundLink(url: string) {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", "outbound_click", {
      link_url: url,
      event_category: "engagement",
    });
  }
}

// Track time on page (call when user leaves)
export function trackTimeOnPage(seconds: number) {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", "time_on_page", {
      engagement_time_seconds: seconds,
      event_category: "engagement",
    });
  }
}
