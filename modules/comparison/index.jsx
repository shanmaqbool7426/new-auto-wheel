import BrowseBlogs from "@/components/blog/browse-blogs";
import Header from "./Header"
import QuickLinks from "@/components/QuickLinks";
import TopComaprison from "@/components/comparison/top-comparison";

const ComparisonModule = async ({ params, type }) => {
    console.log(params,type)

    return (
        <section className="find-cars">
            <Header type={type}/>
            <TopComaprison type={type}/>
            <BrowseBlogs />
            <QuickLinks />
        </section>
    )
}

export default ComparisonModule
