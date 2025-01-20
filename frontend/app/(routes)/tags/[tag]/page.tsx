import { Metadata } from "next";
import { FaGlobe, FaJs, FaReact } from "react-icons/fa";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

// タグ情報の型定義
interface TagData {
  name: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  color: string;
  description: string;
  content: JSX.Element;
}

// タグ情報の一元管理
const tags: TagData[] = [
  {
    name: "javascript",
    icon: FaJs,
    color: "text-yellow-500",
    description: "JavaScriptに関する情報",
    content: (
      <>
        <h1 className="flex-grow">JavaScriptのページです!</h1>
        <h2 className="text-2xl font-bold mt-4 mb-2">JavaScriptの基本</h2>
        <p>
          JavaScriptはウェブページに動的な機能を追加するためのプログラミング言語です。
        </p>
        <p>JavaScriptは奥が深い言語ですね</p>
      </>
    ),
  },
  {
    name: "react",
    icon: FaReact,
    color: "text-blue-500",
    description: "Reactに関する情報",
    content: (
      <>
        <h2 className="text-2xl font-bold mt-4 mb-2">Reactとは</h2>
        <p>
          Reactはユーザーインターフェースを構築するためのJavaScriptライブラリです。
        </p>
        <p>コンポーネントベースで開発できます</p>
      </>
    ),
  },
  {
    name: "webdev",
    icon: FaGlobe,
    color: "text-green-500",
    description: "Web開発に関する情報",
    content: (
      <>
        <h2 className="text-2xl font-bold mt-4 mb-2">Web開発全般</h2>
        <p>Web開発に関するさまざまな情報を提供します。</p>
        <p>フロントエンド、バックエンド、インフラなど</p>
      </>
    ),
  },
  {
    name: "typescript",
    icon: FaJs,
    color: "text-blue-700",
    description: "TypeScriptに関する情報",
    content: (
      <>
        <h2 className="text-2xl font-bold mt-4 mb-2">TypeScript</h2>
        <p>TypeScriptはJavaScriptに静的型付けを追加した言語です。</p>
        <p>大規模開発で役立ちますね</p>
      </>
    ),
  },
  {
    name: "nextjs",
    icon: FaReact,
    color: "text-gray-900",
    description: "Next.jsに関する情報",
    content: (
      <>
        <h2 className="text-2xl font-bold mt-4 mb-2">Next.js</h2>
        <p>Next.jsはReactベースのフレームワークです。</p>
        <p>サーバーサイドレンダリングなどが容易です</p>
      </>
    ),
  },
];

// メタデータ生成関数
export async function generateMetadata({
  params,
}: {
  params: { tag: string };
}): Promise<Metadata> {
  const currentTag = tags.find((t) => t.name === params.tag);
  if (!currentTag) {
    return { title: "Tag Not Found" };
  }
  return {
    title: currentTag.name + "に関するページ",
    description: currentTag.description,
  };
}

async function getTagData(tag: string): Promise<TagData | null> {
  const currentTag = tags.find((t) => t.name === tag);
  return currentTag || null;
}

// 動的ルートセグメントの静的パラメータを生成
export async function generateStaticParams() {
  return tags.map((tag) => ({ tag: tag.name }));
}

// Server Componentとして定義
export default async function TagPage({ params }: { params: { tag: string } }) {
  const tag = await getTagData(params.tag);

  if (!tag) {
    return <div>Tag Not Found</div>; // または適切なエラーページ
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow p-4">
        <div className="grid grid-cols-10 gap-4">
          <div className="col-span-3 border rounded p-4 flex flex-col items-center">
            {/* flexとflex-col、items-centerを追加 */}
            <tag.icon className={`text-6xl ${tag.color} mb-2`} />
            {/* アイコンの下に余白を追加 */}
            <h1 className="text-2xl font-bold mb-1 text-center">
              {/* h1のフォントサイズを調整、marginBottomを追加、テキストを中央寄せ */}
              {tag.name}
            </h1>
            <p className="text-center">{tag.description}</p>
            {/* 説明文も中央寄せ */}
          </div>
          <div className="col-span-7 border rounded p-4">{tag.content}</div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
