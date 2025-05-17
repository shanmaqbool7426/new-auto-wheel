import React from 'react'
import Header from "@/components/Header.jsx"
import Footer from "@/components/Footer.jsx"
import { UserProvider } from '@/contexts/user';
import QueryProvider from '@/providers/query-provider';
import { AuthModalProvider } from '@/contexts/auth-modal';
import { metadata as siteMetadata } from './metadata';
import Script from 'next/script';

export const metadata = siteMetadata;

const Rootlayout = ({ children }) => {
  return (
    <>
      <AuthModalProvider>
        <Header />
        <QueryProvider>
          <UserProvider>
            {/* JSON-LD structured data for SEO */}
            <Script
              id="schema-org-data"
              type="application/ld+json"
              dangerouslySetInnerHTML={{
                __html: JSON.stringify({
                  "@context": "https://schema.org",
                  "@type": "WebSite",
                  name: "AussieMotor",
                  url: "https://www.aussiemotor.com",
                  potentialAction: {
                    "@type": "SearchAction",
                    target: {
                      "@type": "EntryPoint",
                      urlTemplate: "https://www.aussiemotor.com/used-cars/search?q={search_term_string}"
                    },
                    "query-input": "required name=search_term_string"
                  },
                  sameAs: [
                    "https://www.facebook.com/aussiemotor",
                    "https://twitter.com/aussiemotor",
                    "https://www.instagram.com/aussiemotor"
                  ],
                  description: "Australia's #1 automotive marketplace for buying & selling cars, bikes & auto parts."
                })
              }}
            />
            
            {/* Organization structured data */}
            <Script
              id="organization-data"
              type="application/ld+json"
              dangerouslySetInnerHTML={{
                __html: JSON.stringify({
                  "@context": "https://schema.org",
                  "@type": "Organization",
                  name: "AussieMotor",
                  url: "https://www.aussiemotor.com",
                  logo: "https://auto-wheels.s3.eu-north-1.amazonaws.com/uploads/1745263672528_f1804554-b4ad-45a4-baca-8f1a7a31dbaf_removalai_preview.png",
                  contactPoint: {
                    "@type": "ContactPoint",
                    telephone: "+61-123-456-789",
                    contactType: "customer service",
                    areaServed: "AU",
                    availableLanguage: "English"
                  },
                  sameAs: [
                    "https://www.facebook.com/aussiemotor",
                    "https://twitter.com/aussiemotor",
                    "https://www.instagram.com/aussiemotor",
                    "https://www.linkedin.com/company/aussiemotor"
                  ]
                })
              }}
            />
            
            {children}
          </UserProvider>
        </QueryProvider>
        <Footer />
      </AuthModalProvider>
    </>
  )
}

export default Rootlayout