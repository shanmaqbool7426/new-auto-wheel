import Script from 'next/script';
import { UserProvider } from '@/contexts/user';

export const metadata = {
  title: "My Account Dashboard | AussieMotor",
  description: "Manage your AussieMotor account. View saved vehicles, messages, inventory listings, reviews, and account settings in your personalized user dashboard.",
  keywords: "user dashboard, car account, saved vehicles, my listings, user profile, messages, account settings, car inventory, seller dashboard, AussieMotor account",
  openGraph: {
    title: "My Account Dashboard | AussieMotor",
    description: "Manage your AussieMotor account. View saved vehicles, messages, inventory listings, reviews, and account settings in your personalized user dashboard.",
    url: "https://www.aussiemotor.com/user/",
    siteName: "AussieMotor",
    locale: "en_AU",
    type: "website",
    images: [
      {
        url: "https://auto-wheels.s3.eu-north-1.amazonaws.com/uploads/1745263672528_f1804554-b4ad-45a4-baca-8f1a7a31dbaf_removalai_preview.png",
        width: 1200,
        height: 630,
        alt: "AussieMotor User Dashboard",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "My Account Dashboard | AussieMotor",
    description: "Manage your AussieMotor account. View saved vehicles, messages, inventory listings, reviews, and account settings.",
    images: ["https://auto-wheels.s3.eu-north-1.amazonaws.com/uploads/1745263672528_f1804554-b4ad-45a4-baca-8f1a7a31dbaf_removalai_preview.png"],
  },
  alternates: {
    canonical: "https://www.aussiemotor.com/user/",
  },
};

export default function DashboardLayout({ children }) {
  return (
    <UserProvider>
      {/* BreadcrumbList Schema.org structured data */}
      <Script
        id="user-dashboard-breadcrumb-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://www.aussiemotor.com/"
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "My Account",
                "item": "https://www.aussiemotor.com/user/"
              }
            ]
          })
        }}
      />
      
      {/* WebPage Schema.org structured data */}
      <Script
        id="user-dashboard-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "My Account Dashboard",
            "description": "Manage your AussieMotor account. View saved vehicles, messages, inventory listings, reviews, and account settings in your personalized user dashboard.",
            "url": "https://www.aussiemotor.com/user/",
            "isPartOf": {
              "@type": "WebSite",
              "name": "AussieMotor",
              "url": "https://www.aussiemotor.com"
            },
            "speakable": {
              "@type": "SpeakableSpecification",
              "cssSelector": ["h1", "h2"]
            }
          })
        }}
      />
      
      {children}
    </UserProvider>
  );
} 