
import BrowseVideos from "@/components/videos/browse-videos"
import BrowseBlogCarousel from "@/components/blog/browse-blogs-carousel"
import VehicleDetail from "./vehicle-detail"
import FAQ from "./faqs";
import CardsCarousel from "@/components/sections/CardsCarousel"
import SectionTopComparison from "@/components/sections/SectionTopComparison"

import Comments from "@/components/sections/Comments"
import ComparisonProducts from "../home/ComparisonProducts";
import { fetchVehiclsData } from "@/services/vehicles";
import { reorderSlug } from "@/utils";

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

const NewVehicleDetailModule =async ({ vehicle, variantsVehicles }) => {
    const reorderedSlug = reorderSlug([`cars`, `mk_${vehicle?.vehicleDetails?.make}`, `md_${vehicle?.vehicleDetails?.model}`]);
  
    const dataofVehcles = await fetchVehiclsData(reorderedSlug);
  


    console.log('shan',vehicle)
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
      {/* <SectionTopComparison /> */}
        <ComparisonProducts type={"car"}/>
      <CardsCarousel
        title={`Used ${vehicle?.vehicleDetails?.make} ${vehicle?.vehicleDetails?.model} for`}
        primaryTitle={'Sale in Pakistan'}
        data={dataofVehcles?.data?.results}
        isRating={false}
      />
      <BrowseBlogCarousel type={vehicle?.type} title={`${vehicle?.vehicleDetails?.make} ${vehicle?.vehicleDetails?.model} ${vehicle?.vehicleDetails?.year}`} />
      {/* Faq's */}
      {<FAQ title={`${vehicle?.vehicleDetails?.make} ${vehicle?.vehicleDetails?.model} ${vehicle?.vehicleDetails?.variant} ${vehicle?.vehicleDetails?.year}`} titleSpan="FAQs" faqs={vehicle?.vehicleDetails?.faqs} />}
    </div>
  )
}

export default NewVehicleDetailModule
