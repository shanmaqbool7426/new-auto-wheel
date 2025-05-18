import NewsModule from "@/modules/news";

export default function Blog({ params, searchParams }) {
  return (
    <>
      <NewsModule params={params} searchParams={searchParams} />
    </>
  );
}
