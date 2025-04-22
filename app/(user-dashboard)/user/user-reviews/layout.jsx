import Script from 'next/script';

export const metadata = {
  title: "My User Reviews | AussieMotor User Dashboard",
  description: "Manage reviews and feedback about you as a buyer or seller on AussieMotor. View your reputation, respond to user comments, and build trust with the automotive community.",
  keywords: "user feedback, seller reputation, buyer reviews, user comments, dealer ratings, AussieMotor user reviews, seller feedback, automotive marketplace reputation, user testimonials",
  openGraph: {
    title: "My User Reviews | AussieMotor User Dashboard",
    description: "Manage reviews and feedback about you as a buyer or seller on AussieMotor. View your reputation, respond to user comments, and build trust with the automotive community.",
    url: "https://www.aussiemotor.com/user/user-reviews/",
    siteName: "AussieMotor",
    locale: "en_AU",
    type: "website",
    images: [
      {
        url: "https://auto-wheels.s3.eu-north-1.amazonaws.com/uploads/1745263672528_f1804554-b4ad-45a4-baca-8f1a7a31dbaf_removalai_preview.png",
        width: 1200,
        height: 630,
        alt: "AussieMotor User Reputation",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "My User Reviews | AussieMotor User Dashboard",
    description: "Manage reviews and feedback about you as a buyer or seller on AussieMotor. View your reputation and respond to user comments.",
    images: ["https://auto-wheels.s3.eu-north-1.amazonaws.com/uploads/1745263672528_f1804554-b4ad-45a4-baca-8f1a7a31dbaf_removalai_preview.png"],
  },
  alternates: {
    canonical: "https://www.aussiemotor.com/user/user-reviews/",
  },
};

export default function UserReviewsLayout({ children }) {
  return (
    <>
      {/* BreadcrumbList Schema.org structured data */}
      <Script
        id="user-reviews-profile-breadcrumb-data"
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
                "name": "User Reviews",
                "item": "https://www.aussiemotor.com/user/user-reviews/"
              }
            ]
          })
        }}
      />
      
      {/* Review Schema.org structured data */}
      <Script
        id="user-review-profile-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            "itemListElement": [],
            "name": "My User Reviews",
            "description": "Reviews and feedback about me as a buyer or seller on AussieMotor.",
            "url": "https://www.aussiemotor.com/user/user-reviews/"
          })
        }}
      />
      
      {children}
    </>
  );
} 