import Hero from "./Hero";
import BrowseByCategory from "./BrowseByCategory";
import BrowseByType from "./BrowseByType";
import ComparisonProducts from "./ComparisonProducts";
import SearchByLocations from "./SearchByLocations";
import BrowseVideos from "@/components/videos/browse-videos";
import BrowseBlogs from "@/components/blog/browse-blogs";
import { fetchBanner, fetcHomeData } from "../../services/home";

export default async function HomeModule() {
  const res = await fetcHomeData();
  const banner = await fetchBanner();

  return (
    <>
      <Hero banner={banner?.data} />
      <BrowseByCategory makes={res?.makes} bodies={res?.bodies} />
      <BrowseByType vehicles={res?.vehiclesTypes} />
      <ComparisonProducts type="car"/>
      <SearchByLocations />
      <BrowseVideos />
      <BrowseBlogs />
    </>
  );
}
