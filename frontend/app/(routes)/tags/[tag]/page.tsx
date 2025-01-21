import { Metadata } from "next";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import { TagData, getTagsData } from "../data"; // 正しいインポートパス
import TagContent from "@/app/components/TagContent"; // 正しいインポートパス

// メタデータ生成関数
export async function generateMetadata({
  params,
}: {
  params: { tag: string };
}): Promise<Metadata> {
  const allTags = await getTagsData();
  const currentTag = allTags.find((t: TagData) => t.name.toLowerCase() === params.tag.toLowerCase());
  if (!currentTag) {
    return { title: "Tag Not Found" };
  }
  return {
    title: currentTag.name + "に関するページ",
    description: currentTag.description,
  };
}

// 動的ルートセグメントの静的パラメータを生成
export async function generateStaticParams() {
  const tags = await getTagsData();
  return tags.map((tag: TagData) => ({ tag: tag.name }));
}

// Server Component
export default async function TagPage({ params }: { params: { tag: string } }) {
  const allTags = await getTagsData();
  const tag = allTags.find((t: TagData) => t.name.toLowerCase() === params.tag.toLowerCase());

  if (!tag) {
    return <div>Tag Not Found</div>;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow p-4">
        <TagContent tag={tag} /> {/* TagContent コンポーネントに tag props を渡す */}
      </main>
      <Footer />
    </div>
  );
}