import DashboardLayout from "@/app/(home)/DashboardLayout";
import SingleMediaDescription from "@/components/singlemedia/SingleMediaDescription";
import EmojiChart from "@/components/singlemedia/EmojiChart";
import { fetchSingleMedia, fetchSEOData } from "@/lib/api";
import { generateSEOMetadata } from "@/lib/seo";
import { Metadata } from "next";

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const seoResponse = await fetchSEOData(params.id);
  const seoData = seoResponse?.success ? seoResponse.data : null;
  
  return generateSEOMetadata(
    seoData,
    "Popular Media Details - FeelDB",
    "Discover popular media by emotions on FeelDB"
  );
}

async function SingleTvSeries({ params }: { params: { id: string } }) {
  const mediaData = await fetchSingleMedia(params.id);

  return (
    <DashboardLayout>
      <main className="w-[96%] md:w-[94%] lg:w-[90%] flex flex-col mx-auto px-[1vw] pb-8">
        <SingleMediaDescription media={mediaData} />
        <EmojiChart className="w-full mt-10 lg:mt-24" media={mediaData} />
      </main>
    </DashboardLayout>
  );
}

export default SingleTvSeries;
