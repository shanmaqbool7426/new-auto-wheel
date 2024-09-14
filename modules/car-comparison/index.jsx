import BrowseBlogs from "@/components/blog/browse-blogs";
import Header from "./header"
import QuickLinks from "@/components/QuickLinks";
import VehicleSelector from "@/components/VehicleSelector";

// import { fetchVideosPageData } from "@/services/videos";
const CarComparisonModule = async ({ params }) => {
    //   const [videosData] = await Promise.all([fetchVideosPageData(params)]);
    //   const { data } = videosData || {};
    return (
        <section className="find-cars">
            <Header />
            <BrowseBlogs />
            <QuickLinks />
        </section>
    )
}

export default CarComparisonModule
