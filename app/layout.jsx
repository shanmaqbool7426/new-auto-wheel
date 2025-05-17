"use client";
import { GoogleAnalytics } from '@next/third-parties/google'
import { Inter, Poppins, Roboto } from "next/font/google";
import "@/styles/globals.scss";
import "@mantine/notifications/styles.css";
import AnalyticsProvider from "@/contexts/AnalyticsProvider"
import NextTopLoader from "nextjs-toploader";
import Head from 'next/head';
import { usePathname } from 'next/navigation';

import { ColorSchemeScript, MantineProvider } from "@mantine/core";
import { SessionProvider } from "next-auth/react";
import {UserProvider} from "@/contexts/user"
import "@mantine/core/styles.css";
import StoreProvider from "@/redux/StoreProvider";
import "@mantine/carousel/styles.css";
import Script from "next/script";
import { Notifications } from "@mantine/notifications";
import "@mantine/notifications/styles.css";
import "@mantine/carousel/styles.css";
import AuthWrapper from "@/components/AuthWrapper";

import ReduxProvider from '@/redux/StoreProvider';
import { ComparisonProvider } from '@/contexts/comparison';

// Font configurations
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});
const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

// Theme configuration
const theme = {
  fontFamily: inter.style.fontFamily,
  fontSmoothing: true,
  headings: {
    fontFamily: poppins.style.fontFamily,
  },
};

export default function RootLayout({ children }) {
  const pathname = '/';
  const isHomePage = pathname === '/' || pathname === '';
  
  // Base URL for the site
  const baseUrl = "https://www.aussiemotor.com.au";
  
  // Define metadata based on path
  const pageTitle = isHomePage 
    ? "AussieMotor - Buy & Sell Cars, Bikes & Trucks in Australia"
    : "AussieMotor";
  
  const pageDescription = isHomePage
    ? "Australia's premier automotive marketplace. Buy and sell new & used cars, bikes, and trucks in Australia. Find your perfect vehicle with easy search, view detailed listings, and connect with dealers."
    : "Find new & used cars, bikes and trucks for sale in Australia at AussieMotor.";
  
  const canonicalUrl = `${baseUrl}${pathname}`;
  
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
        <ColorSchemeScript defaultColorScheme="auto" />
        
        {/* Basic Meta Tags */}
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content={pageDescription} />
        <meta name="keywords" content="cars, used cars, new cars, cars for sale, buy cars, sell cars, car prices, auto parts, bikes, motorcycles, trucks, australia, aussiemotor, vehicle listings" />
        <link rel="canonical" href={canonicalUrl} />
        
        {/* Favicon */}
        <link rel="icon" href="https://auto-wheels.s3.eu-north-1.amazonaws.com/uploads/1745263672528_f1804554-b4ad-45a4-baca-8f1a7a31dbaf_removalai_preview.png" />
        <link rel="apple-touch-icon" href="https://auto-wheels.s3.eu-north-1.amazonaws.com/uploads/1745263672528_f1804554-b4ad-45a4-baca-8f1a7a31dbaf_removalai_preview.png" />
        <link rel="shortcut icon" href="https://auto-wheels.s3.eu-north-1.amazonaws.com/uploads/1745263672528_f1804554-b4ad-45a4-baca-8f1a7a31dbaf_removalai_preview.png" />
        <meta name="msapplication-TileImage" content="https://auto-wheels.s3.eu-north-1.amazonaws.com/uploads/1745263672528_f1804554-b4ad-45a4-baca-8f1a7a31dbaf_removalai_preview.png" />
        <meta name="msapplication-TileColor" content="#e90808" />
        <meta name="theme-color" content="#e90808" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:image" content="https://auto-wheels.s3.eu-north-1.amazonaws.com/uploads/1745263672528_f1804554-b4ad-45a4-baca-8f1a7a31dbaf_removalai_preview.png" />
        <meta property="og:site_name" content="AussieMotor" />
        <meta property="og:locale" content="en_AU" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content={canonicalUrl} />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        <meta name="twitter:image" content="https://auto-wheels.s3.eu-north-1.amazonaws.com/uploads/1745263672528_f1804554-b4ad-45a4-baca-8f1a7a31dbaf_removalai_preview.png" />
        
        {/* Structured Data - Organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "AussieMotor",
              "url": baseUrl,
              "logo": "https://auto-wheels.s3.eu-north-1.amazonaws.com/uploads/1745263672528_f1804554-b4ad-45a4-baca-8f1a7a31dbaf_removalai_preview.png",
              "sameAs": [
                "https://www.facebook.com/aussiemotor",
                "https://twitter.com/aussiemotor",
                "https://www.instagram.com/aussiemotors"
              ]
            })
          }}
        />
        
        {/* Structured Data - WebSite (only on homepage) */}
        {isHomePage && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "WebSite",
                "url": baseUrl,
                "name": "AussieMotor",
                "description": "Australia's premier automotive marketplace for cars, bikes, and trucks",
                "potentialAction": {
                  "@type": "SearchAction",
                  "target": `${baseUrl}/search?q={search_term_string}`,
                  "query-input": "required name=search_term_string"
                }
              })
            }}
          />
        )}
        
        <Script
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"
          strategy="beforeInteractive"
        />
        <Script
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
        />
        <title>{pageTitle}</title>
      </head>
      <body>
        <ReduxProvider>
          <SessionProvider>
            <MantineProvider theme={theme}>
              <Notifications />
              <AuthWrapper>
                <ComparisonProvider>
                <UserProvider>
                  <NextTopLoader
                    color="#E90808"
                    initialPosition={0.08}
                    crawlSpeed={200}
                    height={3}
                    crawl={true}
                    showSpinner={false}
                    easing="ease"
                    speed={200}
                    shadow="0 0 10px #E90808,0 0 5px #E90808"
                  />
                  {children}
                </UserProvider>
                </ComparisonProvider>
              </AuthWrapper>
            </MantineProvider>
          </SessionProvider>
        </ReduxProvider>
      </body>
      <GoogleAnalytics gaId="G-1SXSFH77HW" />
    </html>
  );
}
