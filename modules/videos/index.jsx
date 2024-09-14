import Header from './Header'
import CategoryVideos from './CategoryVideos'
import BreadCrumb from './BreadCrumb'
import BrowseVideos from '@/components/videos/browse-videos'
import YoutubePlayer from '@/components/videos/youtube-player'
import VideoPagination from '@/components/videos/pagination'

import { fetchVideosPageData } from "@/services/videos";
const VideosModule = async ({ params }) => {
  const [videosData] = await Promise.all([fetchVideosPageData(params)]);
  const { data } = videosData || {};
  const isMainPage = data?.type === 'videos';
  const isCategoryPage = data?.type === 'category';
  const isSearchPage = data?.type === 'search';
  const isSingleVideo = data?.type === 'video';
  return (
    <div>
      {!isMainPage && data?.breadcrumb && <BreadCrumb breadcrumb={data?.breadcrumb} />}
      {isMainPage &&
        <>
          <Header isMainPage={isMainPage} />
          <BrowseVideos hideViewAll={true} title="Today's Feature"/>
          {data?.categories?.map((category, index) => (
            <section className="category-section container my-5" key={index}>
              <CategoryVideos category={category} />
            </section>
          ))}
        </>
      }
      {isCategoryPage&&
        <>
          <section className="category-section container my-5">
            <CategoryVideos category={data} breadcrumb={data?.breadcrumb} />
            {data?.videos?.length > 0 &&
              <div className="mt-3">
                <VideoPagination count={data?.count} />
              </div>
            }
          </section>
        </>

      }
      {isSearchPage&&
        <>
          <section className="category-section container my-5">
            <CategoryVideos category={data} breadcrumb={data?.breadcrumb} />
            {data?.videos?.length > 0 &&
              <div className="mt-3">
                <VideoPagination count={data?.count} />
              </div>
            }
          </section>
        </>

      }
      {
        isSingleVideo &&
        <>
          <section className="category-section container my-5">
            <YoutubePlayer video={data?.video} />
          </section>
        </>
      }
    </div>
  )
}

export default VideosModule
