import { Suspense } from "react";
import HomeModule from "@/modules/home";
import LoadingWrapper from "@/components/loading-wrapper";
import { Metadata } from "next";

export const metadata = {
  title: "AussieMotor - Australia's #1 Automotive Marketplace",
  description: "Find, buy & sell cars, bikes & auto parts at Australia's leading automotive marketplace. Browse 50,000+ listings, compare vehicles, read expert reviews, and discover the best automotive deals nationwide.",
  keywords: "cars, used cars, new cars, cars for sale, buy cars, sell cars, car prices, auto parts, bikes, motorcycles, auto loans, car insurance, Australia cars, Toyota, Honda, Mazda, BMW, Ford, Hyundai, Kia, Volkswagen, car dealer, car marketplace, private car sale",
  openGraph: {
    title: "AussieMotor - Australia's #1 Automotive Marketplace",
    description: "Find, buy & sell cars, bikes & auto parts at Australia's leading automotive marketplace. Browse 50,000+ listings, compare vehicles, read expert reviews, and discover the best automotive deals nationwide.",
    url: "https://www.aussiemotor.com/",
    siteName: "AussieMotor",
    locale: "en_AU",
    type: "website",
    images: [
      {
        url: "https://auto-wheels.s3.eu-north-1.amazonaws.com/uploads/1745263672528_f1804554-b4ad-45a4-baca-8f1a7a31dbaf_removalai_preview.png",
        width: 1200,
        height: 630,
        alt: "AussieMotor - Australia's #1 Automotive Marketplace",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AussieMotor - Australia's #1 Automotive Marketplace",
    description: "Find, buy & sell cars, bikes & auto parts at Australia's leading automotive marketplace.",
    images: ["https://auto-wheels.s3.eu-north-1.amazonaws.com/uploads/1745263672528_f1804554-b4ad-45a4-baca-8f1a7a31dbaf_removalai_preview.png"],
  },
  alternates: {
    canonical: "https://www.aussiemotor.com/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
};

export default function Home() {
  return (
    <LoadingWrapper>


      hhh
      {/* <Suspense fallback={<div>Loading...</div>}>
      <HomeModule />
      </Suspense> */}
    </LoadingWrapper>
  );
}


