// import Script from 'next/script';
// import { fetchBlogsPageData } from "@/services/blogs";

// export async function generateMetadata({ params }) {
//   const slugSegments = params?.slug || [];
//   const path = slugSegments.join('/');
  
//   // Try to fetch actual blog data for better metadata
//   let blogData = null;
//   try {
//     if (slugSegments.length > 0) {
//       const response = await fetchBlogsPageData({ slug: slugSegments });
//       if (response?.data) {
//         blogData = response.data;
//       }
//     }
//   } catch (error) {
//     console.error('Error fetching blog data for metadata:', error);
//   }
  
//   // Format title from slug for SEO
//   const formatTitle = (slug) => {
//     if (!slug || slugSegments.length === 0) {
//       return "Automotive Blog & Car News";
//     }
    
//     // If we have actual blog data, use its title
//     if (blogData?.title) {
//       return blogData.title;
//     }
    
//     // Use the last segment of the path for the title
//     const titleSlug = slugSegments[slugSegments.length - 1];
    
//     // Remove any numbers or special chars at the end (like -1, -2, etc.)
//     const cleanSlug = titleSlug.replace(/(-\d+)$/, '');
    
//     // Replace dashes with spaces and capitalize each word
//     return cleanSlug
//       .split('-')
//       .map(word => word.charAt(0).toUpperCase() + word.slice(1))
//       .join(' ');
//   };
  
//   // Generate title and description
//   const title = formatTitle(path);
  
//   // Use actual blog description if available, otherwise generate one
//   let description = blogData?.description || `Read about ${title} and other automotive topics on Australia's premier automotive site.`;
  
//   // If no blog data available and not on index page, check for specific content types to enhance description
//   if (!blogData && slugSegments.length > 0) {
//     if (path.includes('review')) {
//       description = `Read our expert review of the ${title}. Get specifications, features, and insights on Australia's premier automotive site.`;
//     } else if (path.includes('comparison')) {
//       description = `Compare ${title} with other vehicles. Find out which one suits your needs best on Australia's premier automotive site.`;
//     } else if (path.includes('guide')) {
//       description = `Our comprehensive guide to ${title}. Learn everything you need to know on Australia's premier automotive site.`;
//     } else if (path.includes('news')) {
//       description = `Get the latest news about ${title}. Stay updated with automotive developments on Australia's premier automotive site.`;
//     }
//   }
  
//   // For blog index page
//   if (slugSegments.length === 0) {
//     return {
//       title: "Automotive Blog & Car News | aussiemotor",
//       description: "Read the latest automotive news, expert car blogs, maintenance tips, buying guides, and industry insights. Stay updated with aussiemotor's comprehensive automotive content.",
//       keywords: "car blog, automotive news, car buying guide, vehicle maintenance tips, car reviews, automotive industry news, car tips and tricks, Australia car news",
//       openGraph: {
//         title: "Automotive Blog & Car News | aussiemotor",
//         description: "Read the latest automotive news, expert car blogs, maintenance tips, buying guides, and industry insights from Australia's #1 automotive marketplace.",
//         url: "https://www.aussiemotor.com/blog/",
//         siteName: "aussiemotor",
//         locale: "en_AU",
//         type: "website",
//         images: [
//           {
//             url: "https://auto-wheels.s3.eu-north-1.amazonaws.com/uploads/1745263672528_f1804554-b4ad-45a4-baca-8f1a7a31dbaf_removalai_preview.png",
//             width: 1200,
//             height: 630,
//             alt: "aussiemotor Automotive Blog",
//           },
//         ],
//       },
//       twitter: {
//         card: "summary_large_image",
//         title: "Automotive Blog & Car News | aussiemotor",
//         description: "Read the latest automotive news, expert car blogs, maintenance tips, and industry insights from Australia's leading automotive experts.",
//         images: ["https://auto-wheels.s3.eu-north-1.amazonaws.com/uploads/1745263672528_f1804554-b4ad-45a4-baca-8f1a7a31dbaf_removalai_preview.png"],
//       },
//       alternates: {
//         canonical: "https://www.aussiemotor.com/blog/",
//       },
//     };
//   }
  
//   // Generate keywords from the slug and blog data
//   const keywords = [
//     ...(blogData?.keywords?.split(',') || []),
//     ...slugSegments.flatMap(segment => segment.split('-')),
//     'automotive', 'blog', 'cars', 'vehicles', 'australia', 'news'
//   ].filter(Boolean).join(', ');
  
//   // Get featured image if available
//   const featuredImage = blogData?.featuredImage || "https://auto-wheels.s3.eu-north-1.amazonaws.com/uploads/1745263672528_f1804554-b4ad-45a4-baca-8f1a7a31dbaf_removalai_preview.png";
  
//   // Get published/updated date if available
//   const publishDate = blogData?.publishedAt ? new Date(blogData.publishedAt) : new Date();
  
//   // Build and return the metadata
//   return {
//     title: `${title} | aussiemotor`,
//     description,
//     keywords,
//     openGraph: {
//       title: `${title} | aussiemotor`,
//       description,
//       url: `https://www.aussiemotor.com/blog/${path}`,
//       siteName: "aussiemotor",
//       locale: "en_AU",
//       type: "article",
//       publishedTime: publishDate.toISOString(),
//       authors: blogData?.author ? [blogData.author] : ["aussiemotor"],
//       images: [
//         {
//           url: featuredImage,
//           width: 1200,
//           height: 630,
//           alt: `${title} - aussiemotor`,
//         },
//       ],
//     },
//     twitter: {
//       card: "summary_large_image",
//       title: `${title} | aussiemotor`,
//       description,
//       images: [featuredImage],
//     },
//     alternates: {
//       canonical: `https://www.aussiemotor.com/blog/${path}`,
//     },
//   };
// }

// export default function BlogLayout({ children, params }) {
//   // Extract title from params for structured data
//   const slugSegments = params?.slug || [];
//   let pageTitle = "Automotive Blog";
  
//   if (slugSegments.length > 0) {
//     const lastSegment = slugSegments[slugSegments.length - 1];
//     pageTitle = lastSegment
//       .split('-')
//       .map(word => word.charAt(0).toUpperCase() + word.slice(1))
//       .join(' ');
//   }
  
//   const path = slugSegments.join('/');
//   const blogUrl = `https://www.aussiemotor.com/blog/${path}`;
  
//   return (
//     <>
//       {/* BreadcrumbList Schema.org structured data */}
//       <Script
//         id="blog-breadcrumb-data"
//         type="application/ld+json"
//         dangerouslySetInnerHTML={{
//           __html: JSON.stringify({
//             "@context": "https://schema.org",
//             "@type": "BreadcrumbList",
//             "itemListElement": [
//               {
//                 "@type": "ListItem",
//                 "position": 1,
//                 "name": "Home",
//                 "item": "https://www.aussiemotor.com/"
//               },
//               {
//                 "@type": "ListItem",
//                 "position": 2,
//                 "name": "Blog",
//                 "item": "https://www.aussiemotor.com/blog/"
//               },
//               ...(slugSegments.length > 0 ? [{
//                 "@type": "ListItem",
//                 "position": 3,
//                 "name": pageTitle,
//                 "item": blogUrl
//               }] : [])
//             ]
//           })
//         }}
//       />
      
//       {/* Blog/Article Schema.org structured data */}
//       <Script
//         id="blog-data"
//         type="application/ld+json"
//         dangerouslySetInnerHTML={{
//           __html: JSON.stringify(
//             slugSegments.length > 0 
//             ? {
//                 "@context": "https://schema.org",
//                 "@type": "BlogPosting",
//                 "headline": pageTitle,
//                 "description": `Read about ${pageTitle} on aussiemotor's automotive blog.`,
//                 "image": "https://auto-wheels.s3.eu-north-1.amazonaws.com/uploads/1745263672528_f1804554-b4ad-45a4-baca-8f1a7a31dbaf_removalai_preview.png",
//                 "datePublished": new Date().toISOString(),
//                 "dateModified": new Date().toISOString(),
//                 "author": {
//                   "@type": "Organization",
//                   "name": "aussiemotor",
//                   "url": "https://www.aussiemotor.com"
//                 },
//                 "publisher": {
//                   "@type": "Organization",
//                   "name": "aussiemotor",
//                   "logo": {
//                     "@type": "ImageObject",
//                     "url": "https://auto-wheels.s3.eu-north-1.amazonaws.com/uploads/1745263672528_f1804554-b4ad-45a4-baca-8f1a7a31dbaf_removalai_preview.png"
//                   }
//                 },
//                 "mainEntityOfPage": {
//                   "@type": "WebPage",
//                   "@id": blogUrl
//                 }
//               }
//             : {
//                 "@context": "https://schema.org",
//                 "@type": "Blog",
//                 "headline": "aussiemotor Automotive Blog",
//                 "description": "Latest automotive news, car reviews, buying guides, and maintenance tips from Australia's leading automotive experts.",
//                 "publisher": {
//                   "@type": "Organization",
//                   "name": "aussiemotor",
//                   "logo": {
//                     "@type": "ImageObject",
//                     "url": "https://auto-wheels.s3.eu-north-1.amazonaws.com/uploads/1745263672528_f1804554-b4ad-45a4-baca-8f1a7a31dbaf_removalai_preview.png"
//                   }
//                 },
//                 "url": "https://www.aussiemotor.com/blog/"
//               }
//           )
//         }}
//       />
      
//       {children}
//     </>
//   );
// }



import Script from 'next/script';

export const metadata = {
  title: "Automotive Blog & Car News | AussieMotor",
  description: "Read the latest automotive news, expert car blogs, maintenance tips, buying guides, and industry insights. Stay updated with AussieMotor's comprehensive automotive content.",
  keywords: "car blog, automotive news, car buying guide, vehicle maintenance tips, car reviews, automotive industry news, car tips and tricks, Australia car news",
  openGraph: {
    title: "Automotive Blog & Car News | AussieMotor",
    description: "Read the latest automotive news, expert car blogs, maintenance tips, buying guides, and industry insights from Australia's #1 automotive marketplace.",
    url: "https://www.aussiemotor.com/blog/",
    siteName: "AussieMotor",
    locale: "en_AU",
    type: "website",
    images: [
      {
        url: "https://auto-wheels.s3.eu-north-1.amazonaws.com/uploads/1745263672528_f1804554-b4ad-45a4-baca-8f1a7a31dbaf_removalai_preview.png",
        width: 1200,
        height: 630,
        alt: "AussieMotor Automotive Blog",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Automotive Blog & Car News | AussieMotor",
    description: "Read the latest automotive news, expert car blogs, maintenance tips, and industry insights from Australia's leading automotive experts.",
    images: ["https://auto-wheels.s3.eu-north-1.amazonaws.com/uploads/1745263672528_f1804554-b4ad-45a4-baca-8f1a7a31dbaf_removalai_preview.png"],
  },
  alternates: {
    canonical: "https://www.aussiemotor.com/blog/",
  },
};

export default function RootLayout({ children }) {
  return (
    <>
      {/* BreadcrumbList Schema.org structured data */}
      <Script
        id="blog-breadcrumb-data"
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
                "name": "Blog",
                "item": "https://www.aussiemotor.com/blog/"
              }
            ]
          })
        }}
      />
      
      {/* Blog Schema.org structured data */}
      <Script
        id="blog-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Blog",
            "headline": "AussieMotor Automotive Blog",
            "description": "Latest automotive news, car reviews, buying guides, and maintenance tips from Australia's leading automotive experts.",
            "publisher": {
              "@type": "Organization",
              "name": "AussieMotor",
              "logo": {
                "@type": "ImageObject",
                "url": "https://auto-wheels.s3.eu-north-1.amazonaws.com/uploads/1745263672528_f1804554-b4ad-45a4-baca-8f1a7a31dbaf_removalai_preview.png"
              }
            },
            "url": "https://www.aussiemotor.com/blog/"
          })
        }}
      />
      
      {children}
    </>
  );
}