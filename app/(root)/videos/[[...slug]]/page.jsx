import VideosModule from "@/modules/videos";


export default function Videos({params,searchParams}) {
  return (
    <>
      <VideosModule params={params} searchParams={searchParams}/>
    </>
  );
}