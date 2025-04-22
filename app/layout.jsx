"use client";
import { GoogleAnalytics } from '@next/third-parties/google'
import { Inter, Poppins, Roboto } from "next/font/google";
import "@/styles/globals.scss";
import "@mantine/notifications/styles.css";
import AnalyticsProvider from "@/contexts/AnalyticsProvider"
import NextTopLoader from "nextjs-toploader";
import Head from 'next/head';

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
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
        <ColorSchemeScript defaultColorScheme="auto" />
        
        {/* Basic Meta Tags */}
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="Find new & used cars, bikes & auto parts for sale in Australia. Post free ads, read reviews, check prices & compare cars at AussieMotor - Australia's #1 automotive marketplace." />
        <meta name="keywords" content="cars, used cars, new cars, cars for sale, buy cars, sell cars, car prices, auto parts, bikes, motorcycles, auto loans, car insurance" />
        <link rel="canonical" href="https://www.aussiemotor.com/" />
        
        {/* Favicon */}
        <link rel="icon" href="https://auto-wheels.s3.eu-north-1.amazonaws.com/uploads/1745263672528_f1804554-b4ad-45a4-baca-8f1a7a31dbaf_removalai_preview.png" />
        <link rel="apple-touch-icon" href="https://auto-wheels.s3.eu-north-1.amazonaws.com/uploads/1745263672528_f1804554-b4ad-45a4-baca-8f1a7a31dbaf_removalai_preview.png" />
        <link rel="shortcut icon" href="https://auto-wheels.s3.eu-north-1.amazonaws.com/uploads/1745263672528_f1804554-b4ad-45a4-baca-8f1a7a31dbaf_removalai_preview.png" />
        <meta name="msapplication-TileImage" content="https://auto-wheels.s3.eu-north-1.amazonaws.com/uploads/1745263672528_f1804554-b4ad-45a4-baca-8f1a7a31dbaf_removalai_preview.png" />
        <meta name="msapplication-TileColor" content="#e90808" />
        <meta name="theme-color" content="#e90808" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.aussiemotor.com/" />
        <meta property="og:title" content="AussieMotor - Buy & Sell Cars, Bikes & Auto Parts in Australia" />
        <meta property="og:description" content="Find new & used cars, bikes & auto parts for sale in Australia. Post free ads, read reviews, check prices & compare cars at AussieMotor." />
        <meta property="og:image" content="https://auto-wheels.s3.eu-north-1.amazonaws.com/uploads/1745263672528_f1804554-b4ad-45a4-baca-8f1a7a31dbaf_removalai_preview.png" />
        
        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://www.aussiemotor.com/" />
        <meta property="twitter:title" content="AussieMotor - Buy & Sell Cars, Bikes & Auto Parts in Australia" />
        <meta property="twitter:description" content="Find new & used cars, bikes & auto parts for sale in Australia. Post free ads, read reviews & compare cars at AussieMotor." />
        <meta property="twitter:image" content="https://auto-wheels.s3.eu-north-1.amazonaws.com/uploads/1745263672528_f1804554-b4ad-45a4-baca-8f1a7a31dbaf_removalai_preview.png" />
        
        <Script
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"
          strategy="beforeInteractive"
        />
        <Script
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
        />
        <title>AussieMotor - Buy & Sell Cars, Bikes & Auto Parts in Australia</title>
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
