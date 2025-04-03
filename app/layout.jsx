"use client";
import { GoogleAnalytics } from '@next/third-parties/google'
import { Inter, Poppins, Roboto } from "next/font/google";
import "@/styles/globals.scss";
import "@mantine/notifications/styles.css";
import AnalyticsProvider from "@/contexts/AnalyticsProvider"
import NextTopLoader from "nextjs-toploader";

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
        <Script
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"
          strategy="beforeInteractive"
        />
         <Script
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
        />
          {/* <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}', {
                page_path: window.location.pathname,
              });
            `,
          }}
        /> */}
      </head>
      <body>
        <ReduxProvider>
        {/* <AnalyticsProvider/> */}
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
