"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { pageview } from "@/lib/googleConfig";

export default function AnalyticsProvider() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (pathname) {
      // Get the complete URL
      const baseUrl = window.location.origin;
      const fullUrl = `${baseUrl}${pathname}${
        searchParams.size > 0 ? `?${searchParams.toString()}` : ''
      }`;
      
      // Get page title
      const pageTitle = document.title || 'Aussie Motors';

      // Track the page view with full URL and title
      pageview(fullUrl, {
        page_title: pageTitle,
        page_path: pathname,
        page_location: fullUrl
      });


    }
  }, [pathname, searchParams]);

  return null;
}
