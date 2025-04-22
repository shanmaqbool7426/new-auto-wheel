import Script from 'next/script';

export const metadata = {
  title: "My Reviews | AussieMotor User Dashboard",
  description: "Manage your vehicle reviews and ratings on AussieMotor. View, edit, and respond to feedback on your listings, and see reviews you've written for other vehicles.",
  keywords: "my reviews, vehicle ratings, user feedback, car reviews, seller ratings, buyer reviews, AussieMotor reviews, vehicle testimonials, automotive ratings, dealer reviews",
  openGraph: {
    title: "My Reviews | AussieMotor User Dashboard",
    description: "Manage your vehicle reviews and ratings on AussieMotor. View, edit, and respond to feedback on your listings, and see reviews you've written for other vehicles.",
    url: "https://www.aussiemotor.com/user/reviews/",
    siteName: "AussieMotor",
    locale: "en_AU",
    type: "website",
    images: [
      {
        url: "https://auto-wheels.s3.eu-north-1.amazonaws.com/uploads/1745263672528_f1804554-b4ad-45a4-baca-8f1a7a31dbaf_removalai_preview.png",
        width: 1200,
        height: 630,
        alt: "AussieMotor User Reviews",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "My Reviews | AussieMotor User Dashboard",
    description: "Manage your vehicle reviews and ratings on AussieMotor. View, edit, and respond to feedback on your listings.",
    images: ["https://auto-wheels.s3.eu-north-1.amazonaws.com/uploads/1745263672528_f1804554-b4ad-45a4-baca-8f1a7a31dbaf_removalai_preview.png"],
  },
  alternates: {
    canonical: "https://www.aussiemotor.com/user/reviews/",
  },
};

export default function ReviewsLayout({ children }) {
  return (
    <>
      {/* BreadcrumbList Schema.org structured data */}
      <Script
        id="user-reviews-breadcrumb-data"
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
                "name": "My Reviews",
                "item": "https://www.aussiemotor.com/user/reviews/"
              }
            ]
          })
        }}
      />
      
      {/* ItemList Schema.org structured data */}
      <Script
        id="user-reviews-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            "itemListElement": [],
            "name": "My Reviews",
            "description": "Reviews and ratings I've received and given on AussieMotor vehicles and listings.",
            "url": "https://www.aussiemotor.com/user/reviews/"
          })
        }}
      />
      
      {children}
    </>
  );
} 