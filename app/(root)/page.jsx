
import HomeModule from "@/modules/home";
import LoadingWrapper from "@/components/loading-wrapper";

export default function Home() {
  return (
      <LoadingWrapper>
        <HomeModule />
      </LoadingWrapper>
  );
}


