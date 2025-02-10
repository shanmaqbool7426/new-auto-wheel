import BrowseVideos from "@/components/videos/browse-videos"
import BrowseBlogCarousel from "@/components/blog/browse-blogs-carousel"
import VehicleDetail from "./vehicle-detail"
import FAQ from "./faqs";
import CardsCarousel from "@/components/sections/CardsCarousel"
import SectionTopComparison from "@/components/sections/SectionTopComparison"

import Comments from "@/components/sections/Comments"

const mockData = [
  {
    "_id": "67977c987c0db87256d94bbb",
    "make": "Honda",
    "model": "Civic",
    "variant": "VTI Oriel",
    "type": "car",
    "year": 2025,
    "minPrice": 637000,
    "maxPrice": 8110000,
    "defaultImage": "https://res.cloudinary.com/dcfpazr4b/image/upload/v1737981222/b82kwuay3dmmlf3wxax6.png",
    "views": 0,
    "slug": "honda-civic-vti-oriel-2025",
    "averageRating": 0,
    "reviewCount": 0
  },
  {
    "_id": "67977c987c0db8dsd7256d94bbb",
    "make": "Honda",
    "model": "Civic",
    "variant": "VTI Oriel",
    "type": "car",
    "year": 2025,
    "minPrice": 637000,
    "maxPrice": 8110000,
    "defaultImage": "https://res.cloudinary.com/dcfpazr4b/image/upload/v1737981222/b82kwuay3dmmlf3wxax6.png",
    "views": 0,
    "slug": "honda-civic-vti-oriel-2025",
    "averageRating": 0,
    "reviewCount": 0
  },
  {
    "_id": "67977c987c0db8dsd7256d94bbb",
    "make": "Honda",
    "model": "Civic",
    "variant": "VTI Oriel",
    "type": "car",
    "year": 2025,
    "minPrice": 637000,
    "maxPrice": 8110000,
    "defaultImage": "https://res.cloudinary.com/dcfpazr4b/image/upload/v1737981024/wm2t5rmyl5fpkt4hvdqb.png",
    "views": 0,
    "slug": "honda-civic-vti-oriel-2025",
    "averageRating": 0,
    "reviewCount": 0
  },
  {
    "_id": "67977c987c0db8dsd7256d94bbb",
    "make": "Honda",
    "model": "Civic",
    "variant": "VTI Oriel",
    "type": "car",
    "year": 2025,
    "minPrice": 637000,
    "maxPrice": 8110000,
    "defaultImage": "https://res.cloudinary.com/dcfpazr4b/image/upload/v1737981222/b82kwuay3dmmlf3wxax6.png",
    "views": 0,
    "slug": "honda-civic-vti-oriel-2025",
    "averageRating": 0,
    "reviewCount": 0
  },
  {
    "_id": "67977c987c0db8dsd7256d94bbb",
    "make": "Honda",
    "model": "Civic",
    "variant": "VTI Oriel",
    "type": "car",
    "year": 2025,
    "minPrice": 637000,
    "maxPrice": 8110000,
    "defaultImage": "https://res.cloudinary.com/dcfpazr4b/image/upload/v1737981024/wm2t5rmyl5fpkt4hvdqb.png",
    "views": 0,
    "slug": "honda-civic-vti-oriel-2025",
    "averageRating": 0,
    "reviewCount": 0
  },
  {
    "_id": "67977c987c0db8dsd7256d94bbb",
    "make": "Honda",
    "model": "Civic",
    "variant": "VTI Oriel",
    "type": "car",
    "year": 2025,
    "minPrice": 637000,
    "maxPrice": 8110000,
    "defaultImage": "https://res.cloudinary.com/dcfpazr4b/image/upload/v1737981024/wm2t5rmyl5fpkt4hvdqb.png",
    "views": 0,
    "slug": "honda-civic-vti-oriel-2025",
    "averageRating": 0,
    "reviewCount": 0
  },
  {
    "_id": "67977c987c0db8dsd7256d94bbb",
    "make": "Honda",
    "model": "Civic",
    "variant": "VTI Oriel",
    "type": "car",
    "year": 2025,
    "minPrice": 637000,
    "maxPrice": 8110000,
    "defaultImage": "https://res.cloudinary.com/dcfpazr4b/image/upload/v1737981024/wm2t5rmyl5fpkt4hvdqb.png",
    "views": 0,
    "slug": "honda-civic-vti-oriel-2025",
    "averageRating": 0,
    "reviewCount": 0
  },
  {
    "_id": "67977c987c0db8dsd7256d94bbb",
    "make": "Honda",
    "model": "Civic",
    "variant": "VTI Oriel",
    "type": "car",
    "year": 2025,
    "minPrice": 637000,
    "maxPrice": 8110000,
    "defaultImage": "https://res.cloudinary.com/dcfpazr4b/image/upload/v1737981024/wm2t5rmyl5fpkt4hvdqb.png",
    "views": 0,
    "slug": "honda-civic-vti-oriel-2025",
    "averageRating": 0,
    "reviewCount": 0
  },
  {
    "_id": "67977c987c0db8dsd7256d94bbb",
    "make": "Honda",
    "model": "Civic",
    "variant": "VTI Oriel",
    "type": "car",
    "year": 2025,
    "minPrice": 637000,
    "maxPrice": 8110000,
    "defaultImage": "https://res.cloudinary.com/dcfpazr4b/image/upload/v1737981222/b82kwuay3dmmlf3wxax6.png",
    "views": 0,
    "slug": "honda-civic-vti-oriel-2025",
    "averageRating": 0,
    "reviewCount": 0
  },
]

const NewVehicleDetailModule = ({ vehicle, variantsVehicles }) => {
  return (
    <div>
      <VehicleDetail vehicle={vehicle} variantsVehicles={variantsVehicles} />
      <BrowseVideos type="car" />
      <Comments bg="#F3F3F3" />
      <CardsCarousel
        title={'Toyota Corolla 2023'}
        primaryTitle={'Competitors'}
        data={mockData}
      />
      <SectionTopComparison />
      <CardsCarousel
        title={'Used Toyota Corolla 2023 for'}
        primaryTitle={'Sale in Pakistan'}
        data={mockData}
        isRating={false}
      />
      <BrowseBlogCarousel type={"car"} title={`${vehicle?.vehicleDetails?.make} ${vehicle?.vehicleDetails?.model} ${vehicle?.vehicleDetails?.year}`} />
      {/* Faq's */}
      {vehicle?.vehicleDetails?.faqs?.length > 0 && <FAQ title={`${vehicle?.vehicleDetails?.make} ${vehicle?.vehicleDetails?.model} ${vehicle?.vehicleDetails?.variant} ${vehicle?.vehicleDetails?.year}`} titleSpan="FAQs" faqs={vehicle?.vehicleDetails?.faqs} />}
    </div>
  )
}

export default NewVehicleDetailModule
