import Script from 'next/script';

export const metadata = {
  title: "My Messages | AussieMotor User Dashboard",
  description: "View and manage your conversations with buyers and sellers on AussieMotor. Stay connected and respond to inquiries about vehicles and listings in your message center.",
  keywords: "user messages, car inquiries, vehicle messages, buyer seller chat, automotive messaging, car listing messages, AussieMotor inbox, vehicle inquiry response",
  openGraph: {
    title: "My Messages | AussieMotor User Dashboard",
    description: "View and manage your conversations with buyers and sellers on AussieMotor. Stay connected and respond to inquiries about vehicles and listings in your message center.",
    url: "https://www.aussiemotor.com/user/chat/",
    siteName: "AussieMotor",
    locale: "en_AU",
    type: "website",
    images: [
      {
        url: "https://auto-wheels.s3.eu-north-1.amazonaws.com/uploads/1745263672528_f1804554-b4ad-45a4-baca-8f1a7a31dbaf_removalai_preview.png",
        width: 1200,
        height: 630,
        alt: "AussieMotor User Messages",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "My Messages | AussieMotor User Dashboard",
    description: "View and manage your conversations with buyers and sellers on AussieMotor. Stay connected and respond to inquiries about vehicles.",
    images: ["https://auto-wheels.s3.eu-north-1.amazonaws.com/uploads/1745263672528_f1804554-b4ad-45a4-baca-8f1a7a31dbaf_removalai_preview.png"],
  },
  alternates: {
    canonical: "https://www.aussiemotor.com/user/chat/",
  },
};

export default function ChatLayout({ children }) {
  return (
    <>
      {/* BreadcrumbList Schema.org structured data */}
      <Script
        id="user-chat-breadcrumb-data"
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
                "name": "Messages",
                "item": "https://www.aussiemotor.com/user/chat/"
              }
            ]
          })
        }}
      />
      
      {/* WebPage Schema.org structured data */}
      <Script
        id="user-chat-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "My Messages",
            "description": "View and manage your conversations with buyers and sellers on AussieMotor. Stay connected and respond to inquiries about vehicles and listings in your message center.",
            "url": "https://www.aussiemotor.com/user/chat/",
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