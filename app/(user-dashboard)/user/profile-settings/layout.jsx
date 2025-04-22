import Script from 'next/script';

export const metadata = {
  title: "Account Settings | AussieMotor User Dashboard",
  description: "Manage your AussieMotor account settings. Update your profile information, contact details, notification preferences, and security settings in your user dashboard.",
  keywords: "account settings, user profile, personal details, notification preferences, password settings, profile management, account security, AussieMotor user profile, user settings",
  openGraph: {
    title: "Account Settings | AussieMotor User Dashboard",
    description: "Manage your AussieMotor account settings. Update your profile information, contact details, notification preferences, and security settings in your user dashboard.",
    url: "https://www.aussiemotor.com/user/profile-settings/",
    siteName: "AussieMotor",
    locale: "en_AU",
    type: "website",
    images: [
      {
        url: "https://auto-wheels.s3.eu-north-1.amazonaws.com/uploads/1745263672528_f1804554-b4ad-45a4-baca-8f1a7a31dbaf_removalai_preview.png",
        width: 1200,
        height: 630,
        alt: "AussieMotor Account Settings",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Account Settings | AussieMotor User Dashboard",
    description: "Manage your AussieMotor account settings. Update your profile information, contact details, and preferences.",
    images: ["https://auto-wheels.s3.eu-north-1.amazonaws.com/uploads/1745263672528_f1804554-b4ad-45a4-baca-8f1a7a31dbaf_removalai_preview.png"],
  },
  alternates: {
    canonical: "https://www.aussiemotor.com/user/profile-settings/",
  },
};

export default function ProfileSettingsLayout({ children }) {
  return (
    <>
      {/* BreadcrumbList Schema.org structured data */}
      <Script
        id="user-profile-settings-breadcrumb-data"
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
              },
              {
                "@type": "ListItem",
                "position": 3,
                "name": "Account Settings",
                "item": "https://www.aussiemotor.com/user/profile-settings/"
              }
            ]
          })
        }}
      />
      
      {/* WebPage Schema.org structured data */}
      <Script
        id="user-profile-settings-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ProfilePage",
            "name": "Account Settings",
            "description": "Manage your AussieMotor account settings. Update your profile information, contact details, notification preferences, and security settings.",
            "url": "https://www.aussiemotor.com/user/profile-settings/",
            "isPartOf": {
              "@type": "WebSite",
              "name": "AussieMotor",
              "url": "https://www.aussiemotor.com"
            }
          })
        }}
      />
      
      {children}
    </>
  );
} 