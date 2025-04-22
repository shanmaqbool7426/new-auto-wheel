export const metadata = {
  title: "Compare Cars Side by Side | AussieMotor",
  description: "Compare cars side by side on specs, features, performance, fuel economy and prices. Find the best car for your needs with AussieMotor's detailed comparison tool.",
  keywords: "car comparison, compare vehicles, car specs comparison, car features, compare car prices, Toyota vs Honda, side by side comparison, Australia car comparison",
  openGraph: {
    title: "Compare Cars Side by Side | AussieMotor",
    description: "Compare cars side by side on specs, performance, features and prices. Our detailed comparison tool helps you find the perfect car for your needs and budget.",
    url: "https://www.aussiemotor.com/comparison/",
    siteName: "AussieMotor",
    locale: "en_AU",
    type: "website",
    images: [
      {
        url: "https://auto-wheels.s3.eu-north-1.amazonaws.com/uploads/1745263672528_f1804554-b4ad-45a4-baca-8f1a7a31dbaf_removalai_preview.png",
        width: 1200,
        height: 630,
        alt: "Car Comparison Tool",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Compare Cars Side by Side | AussieMotor",
    description: "Compare cars side by side on specs, performance, features and prices at AussieMotor. Find your perfect vehicle match.",
    images: ["https://auto-wheels.s3.eu-north-1.amazonaws.com/uploads/1745263672528_f1804554-b4ad-45a4-baca-8f1a7a31dbaf_removalai_preview.png"],
  },
  alternates: {
    canonical: "https://www.aussiemotor.com/comparison/",
  },
};

export default function RootLayout({ children }) {
  return <>{children}</>;
}
